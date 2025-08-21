<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\Category;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->command->error('No categories found. Please run CategorySeeder first.');
            return;
        }

        // Create 50 products distributed across categories
        foreach ($categories as $category) {
            Product::factory(random_int(5, 8))
                ->for($category)
                ->create();
        }

        // Create some featured products
        Product::factory(10)
            ->featured()
            ->for($categories->random())
            ->create();
    }
}