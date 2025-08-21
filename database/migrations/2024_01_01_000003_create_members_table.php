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
        Schema::create('members', function (Blueprint $table) {
            $table->id();
            $table->string('nama');
            $table->string('nomor_wa');
            $table->enum('status', ['active', 'inactive'])->default('active');
            $table->date('tanggal_gabung');
            $table->timestamps();

            $table->index(['status']);
            $table->index(['status', 'tanggal_gabung']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('members');
    }
};