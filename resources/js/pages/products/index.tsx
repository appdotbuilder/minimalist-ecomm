import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface Product {
    id: number;
    name: string;
    slug: string;
    price: number;
    sale_price?: number;
    images: string[];
    short_description: string;
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
}

interface Filters {
    search?: string;
    category?: number;
    min_price?: number;
    max_price?: number;
    sort?: string;
    order?: string;
}

interface Props {
    products: {
        data: Product[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: Array<{ url: string | null; label: string; active: boolean }>;
    };
    categories: Category[];
    filters: Filters;
    [key: string]: unknown;
}

export default function ProductsIndex({ products, categories, filters }: Props) {
    const [searchTerm, setSearchTerm] = React.useState(filters.search || '');
    const [selectedCategory, setSelectedCategory] = React.useState(filters.category || '');
    const [sortBy, setSortBy] = React.useState(filters.sort || 'created_at');
    const [sortOrder, setSortOrder] = React.useState(filters.order || 'desc');

    const handleSearch = () => {
        const params = {
            search: searchTerm,
            category: selectedCategory,
            sort: sortBy,
            order: sortOrder,
        };
        
        router.get('/products', params, { 
            preserveState: true,
            preserveScroll: true 
        });
    };

    const addToCart = (productId: number) => {
        router.post('/cart', {
            product_id: productId,
            quantity: 1,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <AppShell>
            <Head title="Products - StyleHub" />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-4">
                        🛍️ All Products
                    </h1>
                    <p className="text-gray-600">
                        Discover our complete collection of premium fashion items
                    </p>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                    <div className="grid md:grid-cols-4 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Search Products
                            </label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search products..."
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">All Categories</option>
                                {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Sort By
                            </label>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="created_at">Newest</option>
                                <option value="name">Name</option>
                                <option value="price">Price</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Order
                            </label>
                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="desc">Descending</option>
                                <option value="asc">Ascending</option>
                            </select>
                        </div>
                    </div>
                    
                    <Button
                        onClick={handleSearch}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg"
                    >
                        🔍 Apply Filters
                    </Button>
                </div>

                {/* Results */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing {products.data.length} of {products.total} products
                    </p>
                </div>

                {/* Products Grid */}
                {products.data.length > 0 ? (
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                        {products.data.map((product) => (
                            <div
                                key={product.id}
                                className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow"
                            >
                                <Link href={`/products/${product.slug}`}>
                                    <div className="aspect-square bg-gray-100 relative overflow-hidden">
                                        {product.images.length > 0 ? (
                                            <img
                                                src={product.images[0]}
                                                alt={product.name}
                                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
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
                                </Link>
                                
                                <div className="p-4">
                                    <Link
                                        href={`/products/${product.slug}`}
                                        className="block hover:text-blue-600"
                                    >
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    
                                    <p className="text-sm text-gray-500 mb-2">
                                        {product.category.name}
                                    </p>
                                    
                                    {product.short_description && (
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {product.short_description}
                                        </p>
                                    )}
                                    
                                    <div className="flex items-center justify-between mb-3">
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
                                    
                                    <Button
                                        onClick={() => addToCart(product.id)}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium"
                                    >
                                        🛒 Add to Cart
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            No products found
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Try adjusting your search criteria or browse all categories
                        </p>
                        <Link href="/products">
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
                                View All Products
                            </Button>
                        </Link>
                    </div>
                )}

                {/* Pagination */}
                {products.last_page > 1 && (
                    <div className="flex justify-center space-x-2">
                        {products.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => {
                                    if (link.url) {
                                        router.get(link.url);
                                    }
                                }}
                                disabled={!link.url}
                                className={`px-4 py-2 rounded-lg font-medium ${
                                    link.active
                                        ? 'bg-blue-600 text-white'
                                        : link.url
                                        ? 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                                        : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                }`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </AppShell>
    );
}