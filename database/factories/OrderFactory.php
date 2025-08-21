<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $subtotal = $this->faker->randomFloat(2, 50, 500);
        $tax = $subtotal * 0.08;
        $shipping = $subtotal > 100 ? 0 : 10;
        $total = $subtotal + $tax + $shipping;

        return [
            'order_number' => 'ORD-' . now()->timestamp . '-' . $this->faker->numberBetween(1000, 9999),
            'user_id' => User::factory(),
            'status' => $this->faker->randomElement(['pending', 'processing', 'shipped', 'delivered', 'cancelled']),
            'subtotal' => $subtotal,
            'tax_amount' => $tax,
            'shipping_amount' => $shipping,
            'total_amount' => $total,
            'currency' => 'USD',
            'billing_address' => [
                'first_name' => $this->faker->firstName(),
                'last_name' => $this->faker->lastName(),
                'email' => $this->faker->email(),
                'phone' => $this->faker->phoneNumber(),
                'address' => $this->faker->streetAddress(),
                'city' => $this->faker->city(),
                'state' => $this->faker->randomElement(['CA', 'NY', 'TX', 'FL', 'WA']),
                'zip' => $this->faker->postcode(),
            ],
            'shipping_address' => [
                'first_name' => $this->faker->firstName(),
                'last_name' => $this->faker->lastName(),
                'address' => $this->faker->streetAddress(),
                'city' => $this->faker->city(),
                'state' => $this->faker->randomElement(['CA', 'NY', 'TX', 'FL', 'WA']),
                'zip' => $this->faker->postcode(),
            ],
            'payment_status' => $this->faker->randomElement(['pending', 'paid', 'failed']),
            'payment_method' => $this->faker->randomElement(['credit_card', 'paypal', 'bank_transfer']),
            'notes' => $this->faker->optional()->sentence(),
        ];
    }
}