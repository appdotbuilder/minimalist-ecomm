import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    images: string[];
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Category {
    id: number;
    name: string;
    slug: string;
    description: string;
}

interface Props {
    canLogin: boolean;
    canRegister: boolean;
    featuredProducts: Product[];
    categories: Category[];
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister, featuredProducts, categories }: Props) {
    return (
        <>
            <Head title="👗 StyleHub - Modern Fashion Store" />
            
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            <div className="flex items-center space-x-2">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <span className="text-white font-bold">👗</span>
                                </div>
                                <h1 className="text-xl font-bold text-gray-900">StyleHub</h1>
                            </div>
                            
                            <nav className="hidden md:flex items-center space-x-6">
                                <Link href="/products" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Products
                                </Link>
                                <Link href="/categories" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Categories
                                </Link>
                                <Link href="/cart" className="text-gray-700 hover:text-blue-600 font-medium">
                                    Cart 🛒
                                </Link>
                            </nav>

                            <div className="flex items-center space-x-3">
                                {canLogin && (
                                    <Link
                                        href="/login"
                                        className="text-gray-700 hover:text-blue-600 font-medium"
                                    >
                                        Sign In
                                    </Link>
                                )}
                                {canRegister && (
                                    <Link href="/register">
                                        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium">
                                            Get Started
                                        </Button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="relative py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                            👗 <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">StyleHub</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
                            Discover the latest fashion trends with our curated collection of premium clothing, 
                            shoes, and accessories. Shop with confidence and style.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
                            <Link href="/products">
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl text-lg font-semibold">
                                    🛍️ Shop Now
                                </Button>
                            </Link>
                            <Link href="/categories">
                                <Button variant="outline" className="px-8 py-4 rounded-xl text-lg font-semibold border-2">
                                    📋 Browse Categories
                                </Button>
                            </Link>
                        </div>

                        {/* Features Grid */}
                        <div className="grid md:grid-cols-3 gap-8 mb-16">
                            <div className="bg-white rounded-2xl p-8 shadow-lg border">
                                <div className="text-4xl mb-4">🚚</div>
                                <h3 className="text-xl font-semibold mb-3">Free Shipping</h3>
                                <p className="text-gray-600">Free shipping on orders over $100. Fast and reliable delivery worldwide.</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg border">
                                <div className="text-4xl mb-4">🔒</div>
                                <h3 className="text-xl font-semibold mb-3">Secure Checkout</h3>
                                <p className="text-gray-600">Your payments are protected with industry-leading security.</p>
                            </div>
                            
                            <div className="bg-white rounded-2xl p-8 shadow-lg border">
                                <div className="text-4xl mb-4">↩️</div>
                                <h3 className="text-xl font-semibold mb-3">Easy Returns</h3>
                                <p className="text-gray-600">30-day return policy. Not satisfied? Get your money back.</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Featured Categories */}
                {categories.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    🏷️ Shop by Category
                                </h3>
                                <p className="text-gray-600 text-lg">
                                    Explore our diverse range of fashion categories
                                </p>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={`/categories/${category.slug}`}
                                        className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 border hover:border-blue-200"
                                    >
                                        <h4 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600">
                                            {category.name}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-4">{category.description}</p>
                                        <div className="text-blue-600 font-medium group-hover:text-blue-700">
                                            Shop Now →
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

                {/* Featured Products */}
                {featuredProducts.length > 0 && (
                    <section className="py-16 px-4 sm:px-6 lg:px-8">
                        <div className="max-w-7xl mx-auto">
                            <div className="text-center mb-12">
                                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                                    ⭐ Featured Products
                                </h3>
                                <p className="text-gray-600 text-lg">
                                    Handpicked items from our latest collection
                                </p>
                            </div>
                            
                            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                                {featuredProducts.map((product) => (
                                    <Link
                                        key={product.id}
                                        href={`/products/${product.slug}`}
                                        className="group bg-white rounded-2xl shadow-lg border overflow-hidden hover:shadow-xl transition-all duration-300"
                                    >
                                        <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                            {product.images.length > 0 ? (
                                                <img
                                                    src={product.images[0]}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-4xl">
                                                    👕
                                                </div>
                                            )}
                                            {product.sale_price && (
                                                <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-sm font-semibold">
                                                    Sale
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="p-4">
                                            <h4 className="font-semibold text-gray-900 mb-1 group-hover:text-blue-600">
                                                {product.name}
                                            </h4>
                                            <p className="text-sm text-gray-500 mb-2">
                                                {product.category.name}
                                            </p>
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center space-x-2">
                                                    {product.sale_price ? (
                                                        <>
                                                            <span className="font-bold text-red-600">
                                                                ${product.sale_price.toFixed(2)}
                                                            </span>
                                                            <span className="text-sm text-gray-500 line-through">
                                                                ${product.price.toFixed(2)}
                                                            </span>
                                                        </>
                                                    ) : (
                                                        <span className="font-bold text-gray-900">
                                                            ${product.price.toFixed(2)}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                            
                            <div className="text-center mt-8">
                                <Link href="/products">
                                    <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold">
                                        View All Products
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Call to Action */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-600">
                    <div className="max-w-4xl mx-auto text-center">
                        <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
                            Ready to Start Shopping? 🛒
                        </h3>
                        <p className="text-xl text-blue-100 mb-8">
                            Join thousands of satisfied customers and discover your new favorite style today.
                        </p>
                        
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            {canRegister && (
                                <Link href="/register">
                                    <Button className="bg-white text-blue-600 hover:bg-gray-50 px-8 py-4 rounded-xl text-lg font-semibold">
                                        Create Account
                                    </Button>
                                </Link>
                            )}
                            <Link href="/products">
                                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold">
                                    Browse Products
                                </Button>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="bg-gray-900 text-white py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid md:grid-cols-4 gap-8">
                            <div>
                                <div className="flex items-center space-x-2 mb-4">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                                        <span className="text-white font-bold">👗</span>
                                    </div>
                                    <h4 className="text-xl font-bold">StyleHub</h4>
                                </div>
                                <p className="text-gray-400">
                                    Your one-stop destination for the latest fashion trends and premium quality clothing.
                                </p>
                            </div>
                            
                            <div>
                                <h5 className="font-semibold mb-4">Quick Links</h5>
                                <ul className="space-y-2">
                                    <li><Link href="/products" className="text-gray-400 hover:text-white">Products</Link></li>
                                    <li><Link href="/categories" className="text-gray-400 hover:text-white">Categories</Link></li>
                                    <li><Link href="/cart" className="text-gray-400 hover:text-white">Shopping Cart</Link></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h5 className="font-semibold mb-4">Customer Service</h5>
                                <ul className="space-y-2">
                                    <li><span className="text-gray-400">📞 1-800-STYLE-HUB</span></li>
                                    <li><span className="text-gray-400">📧 support@stylehub.com</span></li>
                                    <li><span className="text-gray-400">💬 24/7 Live Chat</span></li>
                                </ul>
                            </div>
                            
                            <div>
                                <h5 className="font-semibold mb-4">Follow Us</h5>
                                <div className="flex space-x-4">
                                    <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📘</span>
                                    <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">📸</span>
                                    <span className="text-2xl cursor-pointer hover:scale-110 transition-transform">🐦</span>
                                </div>
                            </div>
                        </div>
                        
                        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
                            <p>&copy; 2024 StyleHub. All rights reserved. Made with ❤️ for fashion lovers.</p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}