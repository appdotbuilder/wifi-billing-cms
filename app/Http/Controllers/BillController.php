<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreBillRequest;
use App\Models\Bill;
use App\Models\Member;
use App\Models\Payment;
use Inertia\Inertia;
use Illuminate\Http\Request;

class BillController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $bills = Bill::latest('bulan')->paginate(10);
        
        return Inertia::render('bills/index', [
            'bills' => $bills
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('bills/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBillRequest $request)
    {
        $data = $request->validated();
        
        // Calculate cost per person based on active members
        $activeMembersCount = Member::active()->count();
        $data['biaya_per_orang'] = $activeMembersCount > 0 ? $data['biaya_total'] / $activeMembersCount : 0;
        $data['bulan_bayar'] = $data['bulan'];
        
        $bill = Bill::create($data);

        return redirect()->route('bills.show', $bill)
            ->with('success', 'Tagihan bulan berhasil dibuat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Bill $bill)
    {
        $bill->load('payments.member');
        
        // Get unpaid members
        $paidMemberIds = $bill->payments()
            ->where('nominal', '>=', $bill->biaya_per_orang)
            ->pluck('member_id')
            ->toArray();
        
        $unpaidMembers = Member::active()
            ->whereNotIn('id', $paidMemberIds)
            ->get();
        
        return Inertia::render('bills/show', [
            'bill' => $bill,
            'unpaidMembers' => $unpaidMembers
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bill $bill)
    {
        return Inertia::render('bills/edit', [
            'bill' => $bill
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Bill $bill)
    {
        $data = $request->validate([
            'biaya_total' => 'required|numeric|min:0',
            'tanggal_jatuh_tempo' => 'required|date',
        ]);
        
        // Recalculate cost per person
        $activeMembersCount = Member::active()->count();
        $data['biaya_per_orang'] = $activeMembersCount > 0 ? $data['biaya_total'] / $activeMembersCount : 0;
        
        $bill->update($data);

        return redirect()->route('bills.show', $bill)
            ->with('success', 'Tagihan berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bill $bill)
    {
        $bill->delete();

        return redirect()->route('bills.index')
            ->with('success', 'Tagihan berhasil dihapus.');
    }
}