<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePaymentRequest;
use App\Models\Payment;
use App\Models\Member;
use App\Models\Bill;
use Inertia\Inertia;

class PaymentController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $payments = Payment::with(['member', 'bill'])
            ->latest()
            ->paginate(10);
        
        return Inertia::render('payments/index', [
            'payments' => $payments
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $members = Member::active()->get();
        $bills = Bill::orderBy('bulan', 'desc')->get();
        
        return Inertia::render('payments/create', [
            'members' => $members,
            'bills' => $bills
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePaymentRequest $request)
    {
        $data = $request->validated();
        
        // Get bill and member info
        $bill = Bill::findOrFail($data['bill_id']);
        $data['bulan_bayar'] = $bill->bulan;
        
        // Calculate remaining balance if overpayment (deposit)
        $remainingAmount = $data['nominal'] - $bill->biaya_per_orang;
        $data['sisa_saldo'] = max(0, $remainingAmount);
        
        $payment = Payment::create($data);

        return redirect()->route('payments.show', $payment)
            ->with('success', 'Pembayaran berhasil dicatat.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Payment $payment)
    {
        $payment->load(['member', 'bill']);
        
        return Inertia::render('payments/show', [
            'payment' => $payment
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Payment $payment)
    {
        $members = Member::active()->get();
        $bills = Bill::orderBy('bulan', 'desc')->get();
        
        return Inertia::render('payments/edit', [
            'payment' => $payment,
            'members' => $members,
            'bills' => $bills
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(StorePaymentRequest $request, Payment $payment)
    {
        $data = $request->validated();
        
        // Get bill info
        $bill = Bill::findOrFail($data['bill_id']);
        $data['bulan_bayar'] = $bill->bulan;
        
        // Calculate remaining balance if overpayment (deposit)
        $remainingAmount = $data['nominal'] - $bill->biaya_per_orang;
        $data['sisa_saldo'] = max(0, $remainingAmount);
        
        $payment->update($data);

        return redirect()->route('payments.show', $payment)
            ->with('success', 'Pembayaran berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Payment $payment)
    {
        $payment->delete();

        return redirect()->route('payments.index')
            ->with('success', 'Pembayaran berhasil dihapus.');
    }
}