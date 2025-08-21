<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $orders = Auth::user()->orders()
            ->with('items.product')
            ->latest()
            ->paginate(10);

        return Inertia::render('orders/index', [
            'orders' => $orders
        ]);
    }

    /**
     * Show checkout form.
     */
    public function create()
    {
        $cartItems = CartItem::where('user_id', Auth::id())->get();
        
        if ($cartItems->isEmpty()) {
            return redirect()->route('cart.index')
                ->with('error', 'Your cart is empty.');
        }

        $subtotal = $cartItems->sum(fn($item) => (float)$item->price * $item->quantity);
        $tax = $subtotal * 0.08; // 8% tax
        $shipping = $subtotal > 100 ? 0 : 10; // Free shipping over $100
        $total = $subtotal + $tax + $shipping;

        return Inertia::render('checkout/index', [
            'cartItems' => $cartItems->load('product'),
            'subtotal' => $subtotal,
            'tax' => $tax,
            'shipping' => $shipping,
            'total' => $total,
        ]);
    }

    /**
     * Process checkout and create order.
     */
    public function store(Request $request)
    {
        $request->validate([
            'billing_address' => 'required|array',
            'billing_address.first_name' => 'required|string|max:255',
            'billing_address.last_name' => 'required|string|max:255',
            'billing_address.email' => 'required|email',
            'billing_address.phone' => 'required|string|max:20',
            'billing_address.address' => 'required|string',
            'billing_address.city' => 'required|string|max:255',
            'billing_address.state' => 'required|string|max:255',
            'billing_address.zip' => 'required|string|max:10',
            'shipping_address' => 'required|array',
            'payment_method' => 'required|string',
        ]);

        $cartItems = CartItem::where('user_id', Auth::id())->get();
        
        if ($cartItems->isEmpty()) {
            return back()->with('error', 'Your cart is empty.');
        }

        DB::beginTransaction();
        
        try {
            $subtotal = $cartItems->sum(fn($item) => (float)$item->price * $item->quantity);
            $tax = $subtotal * 0.08;
            $shipping = $subtotal > 100 ? 0 : 10;
            $total = $subtotal + $tax + $shipping;

            // Create order
            $order = Order::create([
                'order_number' => 'ORD-' . time() . '-' . random_int(1000, 9999),
                'user_id' => Auth::id(),
                'subtotal' => $subtotal,
                'tax_amount' => $tax,
                'shipping_amount' => $shipping,
                'total_amount' => $total,
                'billing_address' => $request->billing_address,
                'shipping_address' => $request->shipping_address,
                'payment_method' => $request->payment_method,
                'status' => 'pending',
                'payment_status' => 'pending',
            ]);

            // Create order items
            foreach ($cartItems as $cartItem) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $cartItem->product_id,
                    'product_name' => $cartItem->product->name,
                    'product_sku' => $cartItem->product->sku,
                    'quantity' => $cartItem->quantity,
                    'size' => $cartItem->size,
                    'color' => $cartItem->color,
                    'price' => $cartItem->price,
                    'total' => (float)$cartItem->price * $cartItem->quantity,
                ]);
            }

            // Clear cart
            CartItem::where('user_id', Auth::id())->delete();

            DB::commit();

            return redirect()->route('orders.show', $order)
                ->with('success', 'Order placed successfully!');

        } catch (\Exception $e) {
            DB::rollback();
            return back()->with('error', 'There was an error processing your order.');
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        // Ensure user can only view their own orders
        if ($order->user_id !== Auth::id()) {
            abort(403);
        }

        $order->load('items.product');

        return Inertia::render('orders/show', [
            'order' => $order
        ]);
    }


}