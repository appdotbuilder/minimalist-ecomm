import React from 'react';
import { Head, router } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { AppShell } from '@/components/app-shell';

interface Product {
    id: number;
    name: string;
    slug: string;
    description: string;
    short_description?: string;
    price: number;
    sale_price?: number;
    sku: string;
    stock_quantity: number;
    images: string[];
    sizes?: string[];
    colors?: string[];
    category: {
        id: number;
        name: string;
        slug: string;
    };
}

interface Props {
    product: Product;
    relatedProducts: Product[];
    [key: string]: unknown;
}

export default function ProductShow({ product, relatedProducts }: Props) {
    const [selectedSize, setSelectedSize] = React.useState(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = React.useState(product.colors?.[0] || '');
    const [quantity, setQuantity] = React.useState(1);
    const [selectedImage, setSelectedImage] = React.useState(0);

    const addToCart = () => {
        router.post('/cart', {
            product_id: product.id,
            quantity: quantity,
            size: selectedSize,
            color: selectedColor,
        }, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const isOnSale = product.sale_price && product.sale_price < product.price;

    return (
        <AppShell>
            <Head title={`${product.name} - StyleHub`} />
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Breadcrumb */}
                <nav className="mb-8">
                    <ol className="flex items-center space-x-2 text-sm text-gray-500">
                        <li><a href="/" className="hover:text-blue-600">Home</a></li>
                        <li>›</li>
                        <li><a href="/products" className="hover:text-blue-600">Products</a></li>
                        <li>›</li>
                        <li><a href={`/categories/${product.category.slug}`} className="hover:text-blue-600">{product.category.name}</a></li>
                        <li>›</li>
                        <li className="text-gray-900">{product.name}</li>
                    </ol>
                </nav>

                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Product Images */}
                    <div>
                        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                            {product.images.length > 0 ? (
                                <img
                                    src={product.images[selectedImage]}
                                    alt={product.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-6xl">
                                    👕
                                </div>
                            )}
                        </div>
                        
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 ${
                                            selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                                        }`}
                                    >
                                        <img
                                            src={image}
                                            alt={`${product.name} ${index + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            {product.name}
                        </h1>
                        
                        <div className="mb-4">
                            <span className="text-sm text-gray-500">SKU: {product.sku}</span>
                        </div>

                        <div className="flex items-center space-x-3 mb-6">
                            {isOnSale ? (
                                <>
                                    <span className="text-3xl font-bold text-red-600">
                                        ${product.sale_price!.toFixed(2)}
                                    </span>
                                    <span className="text-xl text-gray-500 line-through">
                                        ${product.price.toFixed(2)}
                                    </span>
                                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-lg text-sm font-semibold">
                                        {Math.round(((product.price - product.sale_price!) / product.price) * 100)}% OFF
                                    </span>
                                </>
                            ) : (
                                <span className="text-3xl font-bold text-gray-900">
                                    ${product.price.toFixed(2)}
                                </span>
                            )}
                        </div>

                        {product.short_description && (
                            <p className="text-lg text-gray-600 mb-6">
                                {product.short_description}
                            </p>
                        )}

                        {/* Size Selection */}
                        {product.sizes && product.sizes.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Size
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.sizes.map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border rounded-lg font-medium ${
                                                selectedSize === size
                                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Color Selection */}
                        {product.colors && product.colors.length > 0 && (
                            <div className="mb-6">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Color
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {product.colors.map((color) => (
                                        <button
                                            key={color}
                                            onClick={() => setSelectedColor(color)}
                                            className={`px-4 py-2 border rounded-lg font-medium ${
                                                selectedColor === color
                                                    ? 'border-blue-600 bg-blue-50 text-blue-600'
                                                    : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                            }`}
                                        >
                                            {color}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Quantity */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Quantity
                            </label>
                            <div className="flex items-center space-x-3">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                >
                                    -
                                </button>
                                <span className="text-lg font-semibold w-12 text-center">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                                    className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                                >
                                    +
                                </button>
                                <span className="text-sm text-gray-500">
                                    {product.stock_quantity} in stock
                                </span>
                            </div>
                        </div>

                        {/* Add to Cart */}
                        <div className="flex space-x-4 mb-8">
                            <Button
                                onClick={addToCart}
                                disabled={product.stock_quantity === 0}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg font-semibold disabled:bg-gray-300"
                            >
                                {product.stock_quantity === 0 ? '❌ Out of Stock' : '🛒 Add to Cart'}
                            </Button>
                        </div>

                        {/* Stock Status */}
                        <div className="mb-6">
                            {product.stock_quantity > 10 ? (
                                <div className="flex items-center text-green-600">
                                    <span className="text-lg">✅</span>
                                    <span className="ml-2">In Stock</span>
                                </div>
                            ) : product.stock_quantity > 0 ? (
                                <div className="flex items-center text-yellow-600">
                                    <span className="text-lg">⚠️</span>
                                    <span className="ml-2">Only {product.stock_quantity} left!</span>
                                </div>
                            ) : (
                                <div className="flex items-center text-red-600">
                                    <span className="text-lg">❌</span>
                                    <span className="ml-2">Out of Stock</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Product Description */}
                <div className="mb-16">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">
                        📝 Product Description
                    </h2>
                    <div className="prose max-w-none text-gray-700">
                        {product.description.split('\n').map((paragraph, index) => (
                            <p key={index} className="mb-4">
                                {paragraph}
                            </p>
                        ))}
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">
                            🔄 Related Products
                        </h2>
                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map((relatedProduct) => (
                                <a
                                    key={relatedProduct.id}
                                    href={`/products/${relatedProduct.slug}`}
                                    className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-lg transition-shadow"
                                >
                                    <div className="aspect-square bg-gray-100">
                                        {relatedProduct.images.length > 0 ? (
                                            <img
                                                src={relatedProduct.images[0]}
                                                alt={relatedProduct.name}
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-4xl">
                                                👕
                                            </div>
                                        )}
                                    </div>
                                    
                                    <div className="p-4">
                                        <h3 className="font-semibold text-gray-900 mb-2">
                                            {relatedProduct.name}
                                        </h3>
                                        <div className="flex items-center space-x-2">
                                            {relatedProduct.sale_price ? (
                                                <>
                                                    <span className="font-bold text-red-600">
                                                        ${relatedProduct.sale_price.toFixed(2)}
                                                    </span>
                                                    <span className="text-sm text-gray-500 line-through">
                                                        ${relatedProduct.price.toFixed(2)}
                                                    </span>
                                                </>
                                            ) : (
                                                <span className="font-bold text-gray-900">
                                                    ${relatedProduct.price.toFixed(2)}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AppShell>
    );
}