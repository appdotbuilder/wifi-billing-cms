<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Bill
 *
 * @property int $id
 * @property string $bulan
 * @property float $biaya_total
 * @property float $biaya_per_orang
 * @property string $status
 * @property \Illuminate\Support\Carbon $tanggal_jatuh_tempo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payments
 * @property-read int|null $payments_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Bill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill query()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereBulan($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereBiayaTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereBiayaPerOrang($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereTanggalJatuhTempo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill open()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill closed()
 * @method static \Database\Factories\BillFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Bill extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'bulan',
        'biaya_total',
        'biaya_per_orang',
        'status',
        'tanggal_jatuh_tempo',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'biaya_total' => 'decimal:2',
        'biaya_per_orang' => 'decimal:2',
        'tanggal_jatuh_tempo' => 'date',
    ];

    /**
     * Get all payments for this bill.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Scope a query to only include open bills.
     */
    public function scopeOpen($query)
    {
        return $query->where('status', 'open');
    }

    /**
     * Scope a query to only include closed bills.
     */
    public function scopeClosed($query)
    {
        return $query->where('status', 'closed');
    }
}