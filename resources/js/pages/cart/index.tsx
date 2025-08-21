import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    images: string[];
}

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    size?: string;
    color?: string;
    price: number;
    product: Product;
}

interface Props {
    cartItems: CartItem[];
    total: number;
    [key: string]: unknown;
}

export default function CartIndex({ cartItems, total }: Props) {
    const updateQuantity = (itemId: number, quantity: number) => {
        if (quantity < 1) return;
        
        router.put(`/cart/${itemId}`, {
            quantity: quantity,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const removeItem = (itemId: number) => {
        router.delete(`/cart/${itemId}`, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    if (cartItems.length === 0) {
        return (
            <AppShell>
                <Head title="Shopping Cart - StyleHub" />
                
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                    <div className="text-center">
                        <div className="text-8xl mb-6">🛒</div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Your Cart is Empty
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link href="/products">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-semibold">
                                🛍️ Start Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </AppShell>
        );
    }

    return (
        <AppShell>
            <Head title="Shopping Cart - StyleHub" />
            
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">
                    🛒 Shopping Cart
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Cart Items */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow-sm border">
                            {cartItems.map((item, index) => (
                                <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b' : ''}`}>
                                    <div className="flex items-center space-x-4">
                                        {/* Product Image */}
                                        <Link href={`/products/${item.product.slug}`}>
                                            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
                                                {item.product.images.length > 0 ? (
                                                    <img
                                                        src={item.product.images[0]}
                                                        alt={item.product.name}
                                                        className="w-full h-full object-cover"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center text-2xl">
                                                        👕
                                                    </div>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1">
                                            <Link
                                                href={`/products/${item.product.slug}`}
                                                className="text-lg font-semibold text-gray-900 hover:text-blue-600"
                                            >
                                                {item.product.name}
                                            </Link>
                                            
                                            <div className="flex items-center space-x-4 text-sm text-gray-500 mt-1">
                                                {item.size && <span>Size: {item.size}</span>}
                                                {item.color && <span>Color: {item.color}</span>}
                                            </div>
                                            
                                            <div className="flex items-center justify-between mt-4">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center space-x-3">
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        -
                                                    </button>
                                                    <span className="font-semibold w-8 text-center">
                                                        {item.quantity}
                                                    </span>
                                                    <button
                                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                        className="w-8 h-8 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                                    >
                                                        +
                                                    </button>
                                                </div>

                                                {/* Price and Remove */}
                                                <div className="flex items-center space-x-4">
                                                    <span className="font-bold text-gray-900">
                                                        ${(item.price * item.quantity).toFixed(2)}
                                                    </span>
                                                    <button
                                                        onClick={() => removeItem(item.id)}
                                                        className="text-red-600 hover:text-red-700 text-sm font-medium"
                                                    >
                                                        🗑️ Remove
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
                            <h2 className="text-xl font-bold text-gray-900 mb-6">
                                💰 Order Summary
                            </h2>
                            
                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between">
                                    <span>Subtotal</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Shipping</span>
                                    <span>{total > 100 ? 'Free' : '$10.00'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax</span>
                                    <span>${(total * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="border-t pt-3">
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span>${(total + (total > 100 ? 0 : 10) + (total * 0.08)).toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <Link href="/orders/create" className="block w-full">
                                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold">
                                    🚀 Proceed to Checkout
                                </Button>
                            </Link>
                            
                            <Link href="/products" className="block w-full mt-3">
                                <Button variant="outline" className="w-full py-3 rounded-lg font-medium">
                                    ← Continue Shopping
                                </Button>
                            </Link>

                            {total > 100 && (
                                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                                    <div className="flex items-center text-green-800">
                                        <span className="text-lg">🎉</span>
                                        <span className="ml-2 text-sm font-medium">
                                            You qualify for free shipping!
                                        </span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppShell>
    );
}