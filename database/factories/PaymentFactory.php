<?php

namespace Database\Factories;

use App\Models\Member;
use App\Models\Bill;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $member = Member::active()->inRandomOrder()->first();
        $bill = Bill::inRandomOrder()->first();
        
        if (!$member || !$bill) {
            // If no member or bill exists, create default values
            $member = Member::factory()->active()->create();
            $bill = Bill::factory()->create();
        }
        
        // Payment can be exact amount, less than required, or more (with deposit)
        $paymentType = $this->faker->randomElement(['exact', 'partial', 'deposit']);
        
        $nominal = match ($paymentType) {
            'exact' => $bill->biaya_per_orang,
            'partial' => $this->faker->numberBetween((int)($bill->biaya_per_orang * 0.3), (int)($bill->biaya_per_orang * 0.9)),
            'deposit' => $bill->biaya_per_orang + $this->faker->numberBetween(50000, 200000),
            default => $bill->biaya_per_orang,
        };
        
        $sisaSaldo = max(0, $nominal - $bill->biaya_per_orang);

        return [
            'member_id' => $member->id,
            'bill_id' => $bill->id,
            'nominal' => $nominal,
            'bulan_bayar' => $bill->bulan,
            'tanggal_bayar' => $this->faker->dateTimeBetween($bill->created_at, 'now')->format('Y-m-d'),
            'sisa_saldo' => $sisaSaldo,
        ];
    }
}