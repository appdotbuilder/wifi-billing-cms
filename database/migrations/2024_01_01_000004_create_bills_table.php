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
        Schema::create('bills', function (Blueprint $table) {
            $table->id();
            $table->string('bulan'); // Format: YYYY-MM
            $table->decimal('biaya_total', 15, 2);
            $table->decimal('biaya_per_orang', 15, 2);
            $table->enum('status', ['open', 'closed'])->default('open');
            $table->date('tanggal_jatuh_tempo');
            $table->timestamps();

            $table->unique(['bulan']);
            $table->index(['status']);
            $table->index(['bulan', 'status']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bills');
    }
};