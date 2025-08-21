<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description');
            $table->text('short_description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('sale_price', 10, 2)->nullable();
            $table->string('sku')->unique();
            $table->integer('stock_quantity')->default(0);
            $table->boolean('manage_stock')->default(true);
            $table->boolean('in_stock')->default(true);
            $table->json('images')->nullable();
            $table->json('sizes')->nullable();
            $table->json('colors')->nullable();
            $table->string('status')->default('active'); // active, inactive, draft
            $table->boolean('featured')->default(false);
            $table->foreignId('category_id')->constrained()->cascadeOnDelete();
            $table->timestamps();
            
            $table->index('slug');
            $table->index('status');
            $table->index('featured');
            $table->index(['category_id', 'status']);
            $table->index(['price', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};