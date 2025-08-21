<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('member_id')->constrained()->onDelete('cascade');
            $table->foreignId('bill_id')->constrained()->onDelete('cascade');
            $table->decimal('nominal', 15, 2);
            $table->string('bulan_bayar'); // Format: YYYY-MM
            $table->date('tanggal_bayar');
            $table->decimal('sisa_saldo', 15, 2)->default(0);
            $table->timestamps();

            $table->index(['member_id']);
            $table->index(['bill_id']);
            $table->index(['bulan_bayar']);
            $table->index(['tanggal_bayar']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('payments');
    }
};