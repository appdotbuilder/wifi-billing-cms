<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

/**
 * App\Models\Member
 *
 * @property int $id
 * @property string $nama
 * @property string $nomor_wa
 * @property string $status
 * @property \Illuminate\Support\Carbon $tanggal_gabung
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Payment[] $payments
 * @property-read int|null $payments_count
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Member newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Member newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Member query()
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereNama($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereNomorWa($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereTanggalGabung($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Member active()
 * @method static \Illuminate\Database\Eloquent\Builder|Member inactive()
 * @method static \Database\Factories\MemberFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Member extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'nama',
        'nomor_wa',
        'status',
        'tanggal_gabung',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'tanggal_gabung' => 'date',
    ];

    /**
     * Get all payments for this member.
     */
    public function payments(): HasMany
    {
        return $this->hasMany(Payment::class);
    }

    /**
     * Scope a query to only include active members.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include inactive members.
     */
    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }
}