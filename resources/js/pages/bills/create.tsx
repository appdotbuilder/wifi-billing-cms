import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface BillFormData {
    bulan: string;
    biaya_total: string;
    tanggal_jatuh_tempo: string;
    [key: string]: string;
}

export default function CreateBill() {
    const { data, setData, post, processing, errors } = useForm<BillFormData>({
        bulan: new Date().toISOString().substr(0, 7), // Current month in YYYY-MM format
        biaya_total: '',
        tanggal_jatuh_tempo: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/bills');
    };

    const formatCurrency = (value: string) => {
        const num = parseInt(value.replace(/\D/g, ''));
        if (isNaN(num)) return '';
        return new Intl.NumberFormat('id-ID').format(num);
    };

    const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const rawValue = e.target.value.replace(/\D/g, '');
        setData('biaya_total', rawValue);
    };

    const getMinDueDate = () => {
        const [year, month] = data.bulan.split('-');
        const minDate = new Date(parseInt(year), parseInt(month) - 1, 5);
        return minDate.toISOString().split('T')[0];
    };

    const getMaxDueDate = () => {
        const [year, month] = data.bulan.split('-');
        const maxDate = new Date(parseInt(year), parseInt(month) - 1, 15);
        return maxDate.toISOString().split('T')[0];
    };

    return (
        <AppShell>
            <Head title="Buat Tagihan - WiFi CMS" />
            
            <div className="max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">💳 Buat Tagihan Baru</h1>
                    <p className="mt-2 text-gray-600">
                        Buat tagihan bulanan untuk pembagian biaya WiFi
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>📝 Informasi Tagihan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="bulan">Bulan Tagihan</Label>
                                <Input
                                    id="bulan"
                                    type="month"
                                    value={data.bulan}
                                    onChange={(e) => setData('bulan', e.target.value)}
                                    className={errors.bulan ? 'border-red-500' : ''}
                                />
                                {errors.bulan && (
                                    <p className="text-sm text-red-600">{errors.bulan}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Pilih bulan untuk tagihan yang akan dibuat
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="biaya_total">Total Biaya WiFi</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                                        Rp
                                    </span>
                                    <Input
                                        id="biaya_total"
                                        type="text"
                                        value={formatCurrency(data.biaya_total)}
                                        onChange={handleCurrencyChange}
                                        placeholder="0"
                                        className={`pl-10 ${errors.biaya_total ? 'border-red-500' : ''}`}
                                    />
                                </div>
                                {errors.biaya_total && (
                                    <p className="text-sm text-red-600">{errors.biaya_total}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Masukkan total biaya WiFi untuk bulan ini (akan dibagi rata ke semua member aktif)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tanggal_jatuh_tempo">Tanggal Jatuh Tempo</Label>
                                <Input
                                    id="tanggal_jatuh_tempo"
                                    type="date"
                                    value={data.tanggal_jatuh_tempo}
                                    onChange={(e) => setData('tanggal_jatuh_tempo', e.target.value)}
                                    min={data.bulan ? getMinDueDate() : undefined}
                                    max={data.bulan ? getMaxDueDate() : undefined}
                                    className={errors.tanggal_jatuh_tempo ? 'border-red-500' : ''}
                                />
                                {errors.tanggal_jatuh_tempo && (
                                    <p className="text-sm text-red-600">{errors.tanggal_jatuh_tempo}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Tanggal jatuh tempo pembayaran (antara tanggal 5-15)
                                </p>
                            </div>

                            {/* Preview */}
                            {data.biaya_total && (
                                <div className="bg-blue-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-blue-900 mb-2">📊 Preview Tagihan</h4>
                                    <div className="text-sm text-blue-800 space-y-1">
                                        <div>Total Biaya: Rp {formatCurrency(data.biaya_total)}</div>
                                        <div className="text-xs text-blue-600">
                                            * Biaya per orang akan dihitung otomatis berdasarkan jumlah member aktif
                                        </div>
                                    </div>
                                </div>
                            )}

                            <div className="flex space-x-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>⏳ Membuat Tagihan...</>
                                    ) : (
                                        <>💾 Buat Tagihan</>
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