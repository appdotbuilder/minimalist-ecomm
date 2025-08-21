<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminOrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Order::with('user');

        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        if ($request->filled('payment_status')) {
            $query->where('payment_status', $request->payment_status);
        }

        if ($request->filled('search')) {
            $query->where('order_number', 'like', '%' . $request->search . '%')
                  ->orWhereHas('user', function ($q) use ($request) {
                      $q->where('name', 'like', '%' . $request->search . '%')
                        ->orWhere('email', 'like', '%' . $request->search . '%');
                  });
        }

        $orders = $query->latest()->paginate(15);

        return Inertia::render('admin/orders/index', [
            'orders' => $orders,
            'filters' => $request->only(['status', 'payment_status', 'search']),
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        $order->load(['user', 'items.product']);

        return Inertia::render('admin/orders/show', [
            'order' => $order,
        ]);
    }

    /**
     * Update order status.
     */
    public function update(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
            'payment_status' => 'nullable|in:pending,paid,failed,refunded',
            'notes' => 'nullable|string',
        ]);

        $updateData = $request->only(['status', 'notes']);
        
        if ($request->filled('payment_status')) {
            $updateData['payment_status'] = $request->payment_status;
        }

        if ($request->status === 'shipped' && !$order->shipped_at) {
            $updateData['shipped_at'] = now();
        }

        if ($request->status === 'delivered' && !$order->delivered_at) {
            $updateData['delivered_at'] = now();
        }

        $order->update($updateData);

        return back()->with('success', 'Order updated successfully.');
    }
}