import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Member {
    id: number;
    nama: string;
    nomor_wa: string;
}

interface Bill {
    id: number;
    bulan: string;
    biaya_per_orang: number;
    tanggal_jatuh_tempo: string;
    status: string;
}

interface PaymentFormData {
    member_id: string;
    bill_id: string;
    nominal: string;
    tanggal_bayar: string;
    [key: string]: string;
}

interface Props {
    members: Member[];
    bills: Bill[];
    [key: string]: unknown;
}

export default function CreatePayment({ members, bills }: Props) {
    const { data, setData, post, processing, errors } = useForm<PaymentFormData>({
        member_id: '',
        bill_id: '',
        nominal: '',
        tanggal_bayar: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/payments');
    };

    const formatCurrency = (value: string) => {
        const num = parseInt(value.replace(/\D/g, ''));
        if (isNaN(num)) return '';
        return new Intl.NumberFormat('id-ID').format(num);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setData('nominal', rawValue);
    };

    const formatMonth = (monthString: string) => {
        const [year, month] = monthString.split('-');
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const selectedBill = bills.find(bill => bill.id.toString() === data.bill_id);
    const nominal = parseInt(data.nominal) || 0;
    const costPerPerson = selectedBill?.biaya_per_orang || 0;
    const remainder = Math.max(0, nominal - costPerPerson);

    return (
        <AppShell>
            <Head title="Catat Pembayaran - WiFi CMS" />
            
            <div className="max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">💰 Catat Pembayaran</h1>
                    <p className="mt-2 text-gray-600">
                        Catat pembayaran member untuk tagihan bulanan
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>📝 Informasi Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="member_id">Member</Label>
                                <Select value={data.member_id} onValueChange={(value) => setData('member_id', value)}>
                                    <SelectTrigger className={errors.member_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Pilih member yang membayar" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {members.length === 0 ? (
                                            <div className="p-4 text-center text-gray-500">
                                                Belum ada member aktif
                                            </div>
                                        ) : (
                                            members.map((member) => (
                                                <SelectItem key={member.id} value={member.id.toString()}>
                                                    <div className="flex items-center space-x-2">
                                                        <span>👤</span>
                                                        <span>{member.nama}</span>
                                                        <span className="text-sm text-gray-500">({member.nomor_wa})</span>
                                                    </div>
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.member_id && (
                                    <p className="text-sm text-red-600">{errors.member_id}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="bill_id">Bulan Tagihan</Label>
                                <Select value={data.bill_id} onValueChange={(value) => setData('bill_id', value)}>
                                    <SelectTrigger className={errors.bill_id ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Pilih bulan tagihan" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bills.length === 0 ? (
                                            <div className="p-4 text-center text-gray-500">
                                                Belum ada tagihan
                                            </div>
                                        ) : (
                                            bills.map((bill) => (
                                                <SelectItem key={bill.id} value={bill.id.toString()}>
                                                    <div className="flex items-center justify-between w-full">
                                                        <div>
                                                            <span>📅 {formatMonth(bill.bulan)}</span>
                                                            <span className={`ml-2 px-2 py-1 rounded text-xs ${bill.status === 'open' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                                                {bill.status === 'open' ? 'Terbuka' : 'Tertutup'}
                                                            </span>
                                                        </div>
                                                        <span className="text-sm font-semibold">
                                                            Rp {new Intl.NumberFormat('id-ID').format(bill.biaya_per_orang)}
                                                        </span>
                                                    </div>
                                                </SelectItem>
                                            ))
                                        )}
                                    </SelectContent>
                                </Select>
                                {errors.bill_id && (
                                    <p className="text-sm text-red-600">{errors.bill_id}</p>
                                )}
                                {selectedBill && (
                                    <p className="text-sm text-blue-600">
                                        💳 Tagihan per orang: Rp {new Intl.NumberFormat('id-ID').format(selectedBill.biaya_per_orang)}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nominal">Nominal Pembayaran</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        Rp
                                    </span>
                                    <Input
                                        id="nominal"
                                        type="text"
                                        value={formatCurrency(data.nominal)}
                                        onChange={handleCurrencyChange}
                                        placeholder="0"
                                        className={`pl-10 ${errors.nominal ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.nominal && (
                                    <p className="text-sm text-red-600">{errors.nominal}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Masukkan jumlah uang yang dibayarkan member
                                </p>
                                
                                {/* Payment Analysis */}
                                {selectedBill && nominal > 0 && (
                                    <div className="bg-blue-50 rounded-lg p-3 space-y-2">
                                        <h4 className="font-semibold text-blue-900 text-sm">📊 Analisis Pembayaran</h4>
                                        <div className="text-sm text-blue-800 space-y-1">
                                            <div>Tagihan per orang: Rp {new Intl.NumberFormat('id-ID').format(costPerPerson)}</div>
                                            <div>Nominal dibayar: Rp {new Intl.NumberFormat('id-ID').format(nominal)}</div>
                                            {nominal >= costPerPerson ? (
                                                <div className="text-green-700">
                                                    ✅ Status: Lunas
                                                    {remainder > 0 && (
                                                        <div>💰 Deposit untuk bulan berikutnya: Rp {new Intl.NumberFormat('id-ID').format(remainder)}</div>
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="text-red-700">
                                                    ⚠️ Status: Belum lunas (kurang Rp {new Intl.NumberFormat('id-ID').format(costPerPerson - nominal)})
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tanggal_bayar">Tanggal Pembayaran</Label>
                                <Input
                                    id="tanggal_bayar"
                                    type="date"
                                    value={data.tanggal_bayar}
                                    onChange={(e) => setData('tanggal_bayar', e.target.value)}
                                    className={errors.tanggal_bayar ? 'border-red-500' : ''}
                                />
                                {errors.tanggal_bayar && (
                                    <p className="text-sm text-red-600">{errors.tanggal_bayar}</p>
                                )}
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>⏳ Menyimpan...</>
                                    ) : (
                                        <>💾 Catat Pembayaran</>
                                    )}
                                </Button>
                                <Button type="button" variant="outline" onClick={() => window.history.back()}>
                                    ❌ Batal
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppShell>
    );
}