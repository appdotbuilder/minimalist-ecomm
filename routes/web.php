<?php

use App\Http\Controllers\ProductController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\Admin\AdminProductController;
use App\Http\Controllers\Admin\AdminOrderController;
use App\Http\Controllers\Admin\AdminUserController;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Home page - product catalog
Route::get('/', function () {
    $featuredProducts = Product::with('category')->featured()->active()->take(8)->get();
    $categories = Category::active()->take(6)->get();
    
    return Inertia::render('welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'featuredProducts' => $featuredProducts,
        'categories' => $categories,
    ]);
})->name('home');

// Products
Route::resource('products', ProductController::class)->only(['index', 'show']);

// Categories  
Route::resource('categories', CategoryController::class)->only(['index', 'show']);

// Cart routes (guest and authenticated users)
Route::controller(CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart', 'store')->name('cart.store');
    Route::put('/cart/{cartItem}', 'update')->name('cart.update');
    Route::delete('/cart/{cartItem}', 'destroy')->name('cart.destroy');
});

// Authenticated user routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    
    // Orders
    Route::resource('orders', OrderController::class)->only(['index', 'show', 'create', 'store']);
});

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', [AdminController::class, 'index'])->name('dashboard');
    
    // Admin product management
    Route::resource('products', AdminProductController::class);
    
    // Admin category management  
    Route::resource('categories', CategoryController::class);
    
    // Admin order management
    Route::resource('orders', AdminOrderController::class)->only(['index', 'show', 'update']);
    
    // Admin user management
    Route::resource('users', AdminUserController::class)->only(['index', 'show', 'update']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';