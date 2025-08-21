<?php

namespace Database\Factories;

use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = $this->faker->words(3, true);
        $price = $this->faker->randomFloat(2, 20, 200);
        $salePrice = $this->faker->boolean(30) ? $this->faker->randomFloat(2, 15, $price - 5) : null;

        return [
            'name' => ucwords($name),
            'slug' => Str::slug($name) . '-' . $this->faker->unique()->numberBetween(1000, 9999),
            'description' => $this->faker->paragraphs(3, true),
            'short_description' => $this->faker->sentence(10),
            'price' => $price,
            'sale_price' => $salePrice,
            'sku' => 'SKU-' . $this->faker->unique()->numberBetween(100000, 999999),
            'stock_quantity' => $this->faker->numberBetween(0, 100),
            'manage_stock' => true,
            'in_stock' => true,
            'images' => [
                'https://via.placeholder.com/800x800/e2e8f0/64748b?text=' . urlencode($name),
                'https://via.placeholder.com/800x800/f1f5f9/64748b?text=' . urlencode($name . ' 2'),
            ],
            'sizes' => $this->faker->randomElements(['XS', 'S', 'M', 'L', 'XL', 'XXL'], $this->faker->numberBetween(2, 4)),
            'colors' => $this->faker->randomElements(['Black', 'White', 'Blue', 'Red', 'Green', 'Gray', 'Navy', 'Brown'], $this->faker->numberBetween(2, 3)),
            'status' => 'active',
            'featured' => $this->faker->boolean(20),
            'category_id' => Category::factory(),
        ];
    }

    /**
     * Indicate that the product is featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'featured' => true,
        ]);
    }

    /**
     * Indicate that the product is out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'stock_quantity' => 0,
            'in_stock' => false,
        ]);
    }
}