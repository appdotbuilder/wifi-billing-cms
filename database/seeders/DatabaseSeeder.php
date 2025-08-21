<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Member;
use App\Models\Bill;
use App\Models\Payment;
use Illuminate\Database\Seeder;
use Carbon\Carbon;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // Create admin user
        User::factory()->create([
            'name' => 'WiFi Admin',
            'email' => 'admin@wifi.com',
            'password' => bcrypt('password'),
        ]);

        // Create members
        Member::factory(25)->active()->create();
        Member::factory(5)->inactive()->create();

        // Create bills for the last 6 months
        $months = [];
        for ($i = 5; $i >= 0; $i--) {
            $date = Carbon::now()->subMonths($i);
            $months[] = $date->format('Y-m');
        }

        foreach ($months as $month) {
            $activeMembersCount = Member::active()->count();
            $biayaTotal = random_int(1000000, 1500000); // Between 1M and 1.5M
            $biayaPerOrang = $biayaTotal / $activeMembersCount;
            
            $year = (int)substr($month, 0, 4);
            $monthNum = (int)substr($month, 5, 2);
            $dueDate = Carbon::createFromDate($year, $monthNum, random_int(5, 15));
            
            $status = $month === Carbon::now()->format('Y-m') ? 'open' : 'closed';
            
            $bill = Bill::create([
                'bulan' => $month,
                'biaya_total' => $biayaTotal,
                'biaya_per_orang' => $biayaPerOrang,
                'status' => $status,
                'tanggal_jatuh_tempo' => $dueDate->format('Y-m-d'),
            ]);

            // Create payments for each bill (not all members will pay)
            $activeMembers = Member::active()->get();
            $payingMembers = $activeMembers->random(random_int(15, $activeMembers->count()));
            
            foreach ($payingMembers as $member) {
                $paymentType = match (random_int(1, 10)) {
                    1, 2 => 'partial', // 20% partial payments
                    3, 4 => 'deposit', // 20% with deposit
                    default => 'exact'  // 60% exact payments
                };
                
                $nominal = match ($paymentType) {
                    'exact' => $bill->biaya_per_orang,
                    'partial' => random_int((int)($bill->biaya_per_orang * 0.3), (int)($bill->biaya_per_orang * 0.9)),
                    'deposit' => $bill->biaya_per_orang + random_int(50000, 200000),
                };
                
                $sisaSaldo = max(0, $nominal - $bill->biaya_per_orang);
                
                Payment::create([
                    'member_id' => $member->id,
                    'bill_id' => $bill->id,
                    'nominal' => $nominal,
                    'bulan_bayar' => $bill->bulan,
                    'tanggal_bayar' => $dueDate->subDays(random_int(1, 10))->format('Y-m-d'),
                    'sisa_saldo' => $sisaSaldo,
                ]);
            }
        }
    }
}