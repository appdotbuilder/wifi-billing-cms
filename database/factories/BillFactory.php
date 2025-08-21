<?php

namespace Database\Factories;

use App\Models\Member;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bill>
 */
class BillFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $biayaTotal = $this->faker->numberBetween(500000, 2000000);
        $activeMembersCount = Member::active()->count() ?: 1;
        $biayaPerOrang = $biayaTotal / $activeMembersCount;
        
        $month = $this->faker->dateTimeBetween('-6 months', 'now');
        $bulan = $month->format('Y-m');
        
        // Due date between 5th and 15th of the month
        $dueDay = random_int(5, 15);
        $tanggalJatuhTempo = Carbon::createFromDate((int)$month->format('Y'), (int)$month->format('m'), $dueDay);

        return [
            'bulan' => $bulan,
            'biaya_total' => $biayaTotal,
            'biaya_per_orang' => $biayaPerOrang,
            'status' => $this->faker->randomElement(['open', 'closed']),
            'tanggal_jatuh_tempo' => $tanggalJatuhTempo->format('Y-m-d'),
        ];
    }

    /**
     * Indicate that the bill is open.
     */
    public function open(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'open',
        ]);
    }

    /**
     * Indicate that the bill is closed.
     */
    public function closed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => 'closed',
        ]);
    }
}