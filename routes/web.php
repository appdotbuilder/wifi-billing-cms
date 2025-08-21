<?php

use App\Http\Controllers\BillClosureController;
use App\Http\Controllers\BillController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
    
    // Members Management
    Route::resource('members', MemberController::class);
    
    // Bills Management
    Route::resource('bills', BillController::class);
    Route::post('bills/{bill}/close', [BillClosureController::class, 'store'])->name('bills.close');
    
    // Payments Management
    Route::resource('payments', PaymentController::class);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';