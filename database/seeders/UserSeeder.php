<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create admin user
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => 'admin',
            'phone' => '+1234567890',
            'address' => '123 Admin Street, Admin City, AC 12345',
        ]);

        // Create test customer
        User::create([
            'name' => 'Test Customer',
            'email' => 'customer@example.com',
            'email_verified_at' => now(),
            'password' => Hash::make('password'),
            'role' => 'customer',
            'phone' => '+1987654321',
            'address' => '456 Customer Ave, Customer City, CC 54321',
        ]);

        // Create additional customers
        User::factory(20)->create([
            'role' => 'customer',
        ]);
    }
}