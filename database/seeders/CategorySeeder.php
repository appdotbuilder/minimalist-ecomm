<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            [
                'name' => 'T-Shirts',
                'description' => 'Comfortable and stylish t-shirts for everyday wear.',
            ],
            [
                'name' => 'Jeans',
                'description' => 'Premium denim jeans in various styles and fits.',
            ],
            [
                'name' => 'Dresses',
                'description' => 'Elegant dresses for any occasion.',
            ],
            [
                'name' => 'Jackets',
                'description' => 'Stylish jackets and outerwear for all seasons.',
            ],
            [
                'name' => 'Sneakers',
                'description' => 'Comfortable and trendy sneakers for active lifestyles.',
            ],
            [
                'name' => 'Boots',
                'description' => 'Durable and fashionable boots for any weather.',
            ],
            [
                'name' => 'Accessories',
                'description' => 'Complete your look with our range of accessories.',
            ],
            [
                'name' => 'Sweaters',
                'description' => 'Cozy sweaters and knitwear for cooler days.',
            ],
        ];

        foreach ($categories as $category) {
            Category::create([
                'name' => $category['name'],
                'slug' => Str::slug($category['name']),
                'description' => $category['description'],
                'is_active' => true,
            ]);
        }
    }
}