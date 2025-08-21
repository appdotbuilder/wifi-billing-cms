<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Payment
 *
 * @property int $id
 * @property int $member_id
 * @property int $bill_id
 * @property float $nominal
 * @property string $bulan_bayar
 * @property \Illuminate\Support\Carbon $tanggal_bayar
 * @property float $sisa_saldo
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Member $member
 * @property-read \App\Models\Bill $bill
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment query()
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereMemberId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereBillId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereNominal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereBulanBayar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereTanggalBayar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereSisaSaldo($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Payment whereUpdatedAt($value)
 * @method static \Database\Factories\PaymentFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Payment extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'member_id',
        'bill_id',
        'nominal',
        'bulan_bayar',
        'tanggal_bayar',
        'sisa_saldo',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'nominal' => 'decimal:2',
        'sisa_saldo' => 'decimal:2',
        'tanggal_bayar' => 'date',
    ];

    /**
     * Get the member that owns the payment.
     */
    public function member(): BelongsTo
    {
        return $this->belongsTo(Member::class);
    }

    /**
     * Get the bill that owns the payment.
     */
    public function bill(): BelongsTo
    {
        return $this->belongsTo(Bill::class);
    }
}