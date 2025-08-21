<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Bill;
use Illuminate\Http\Request;

class BillClosureController extends Controller
{
    /**
     * Close the bill to prevent further modifications.
     */
    public function store(Request $request, Bill $bill)
    {
        $bill->update(['status' => 'closed']);

        return redirect()->route('bills.show', $bill)
            ->with('success', 'Tagihan bulan berhasil ditutup.');
    }
}