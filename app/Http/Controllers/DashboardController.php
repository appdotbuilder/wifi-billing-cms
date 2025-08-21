<?php

namespace App\Http\Controllers;

use App\Models\Member;
use App\Models\Bill;
use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with current month summary.
     */
    public function index()
    {
        $currentMonth = Carbon::now()->format('Y-m');
        
        // Get current month data
        $currentBill = Bill::where('bulan', $currentMonth)->first();
        $activeMembers = Member::active()->count();
        
        // Calculate stats for current month
        $totalBilled = 0;
        $totalPaid = 0;
        $totalUnpaid = 0;
        $costPerPerson = 0;
        
        if ($currentBill) {
            $totalBilled = $currentBill->biaya_total;
            $costPerPerson = $currentBill->biaya_per_orang;
            $totalPaid = Payment::where('bill_id', $currentBill->id)->sum('nominal');
            $totalUnpaid = $totalBilled - $totalPaid;
        }
        
        // Get unpaid members for current month
        $unpaidMemberIds = [];
        if ($currentBill) {
            $paidMemberIds = Payment::where('bill_id', $currentBill->id)
                ->where('nominal', '>=', $currentBill->biaya_per_orang)
                ->pluck('member_id')
                ->toArray();
            
            $unpaidMemberIds = Member::active()
                ->whereNotIn('id', $paidMemberIds)
                ->pluck('id')
                ->toArray();
        }
        
        return Inertia::render('dashboard', [
            'stats' => [
                'activeMembers' => $activeMembers,
                'costPerPerson' => $costPerPerson,
                'totalBilled' => $totalBilled,
                'totalPaid' => $totalPaid,
                'totalUnpaid' => $totalUnpaid,
                'currentMonth' => $currentMonth,
                'hasCurrentBill' => $currentBill !== null,
                'unpaidMembersCount' => count($unpaidMemberIds),
            ]
        ]);
    }
}