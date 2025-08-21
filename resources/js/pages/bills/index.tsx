import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Bill {
    id: number;
    bulan: string;
    biaya_total: number;
    biaya_per_orang: number;
    status: 'open' | 'closed';
    tanggal_jatuh_tempo: string;
}

interface PaginatedBills {
    data: Bill[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    bills: PaginatedBills;
    [key: string]: unknown;
}

export default function BillsIndex({ bills }: Props) {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const formatMonth = (monthString: string) => {
        const [year, month] = monthString.split('-');
        const monthNames = [
            'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
            'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const handleCloseBill = (billId: number) => {
        if (confirm('Yakin ingin menutup tagihan ini? Tagihan yang sudah ditutup tidak bisa diubah lagi.')) {
            router.post(`/bills/${billId}/close`, {}, {
                preserveState: true,
                preserveScroll: true,
            });
        }
    };

    return (
        <AppShell>
            <Head title="Tagihan Bulanan - WiFi CMS" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">💳 Tagihan Bulanan</h1>
                        <p className="mt-2 text-gray-600">
                            Kelola tagihan WiFi dan pembagian biaya untuk setiap bulan
                        </p>
                    </div>
                    <Link href="/bills/create">
                        <Button size="lg">
                            ➕ Buat Tagihan Baru
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {bills.data.filter(b => b.status === 'open').length}
                                </div>
                                <p className="text-sm text-gray-500">Tagihan Terbuka</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {bills.data.filter(b => b.status === 'closed').length}
                                </div>
                                <p className="text-sm text-gray-500">Tagihan Tertutup</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {bills.total}
                                </div>
                                <p className="text-sm text-gray-500">Total Tagihan</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Bills List */}
                <Card>
                    <CardHeader>
                        <CardTitle>📋 Daftar Tagihan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {bills.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">💳</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Belum Ada Tagihan
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Buat tagihan pertama untuk memulai mengelola pembayaran WiFi
                                </p>
                                <Link href="/bills/create">
                                    <Button size="lg">
                                        ➕ Buat Tagihan Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {bills.data.map((bill) => (
                                    <div key={bill.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3 mb-3">
                                                    <h3 className="text-xl font-semibold text-gray-900">
                                                        📅 {formatMonth(bill.bulan)}
                                                    </h3>
                                                    <Badge variant={bill.status === 'open' ? 'default' : 'secondary'}>
                                                        {bill.status === 'open' ? '🔓 Terbuka' : '🔒 Tertutup'}
                                                    </Badge>
                                                </div>
                                                
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                                    <div>
                                                        <p className="text-gray-500 mb-1">Total Biaya WiFi</p>
                                                        <p className="text-lg font-semibold text-blue-600">
                                                            {formatCurrency(bill.biaya_total)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 mb-1">Biaya Per Orang</p>
                                                        <p className="text-lg font-semibold text-green-600">
                                                            {formatCurrency(bill.biaya_per_orang)}
                                                        </p>
                                                    </div>
                                                    <div>
                                                        <p className="text-gray-500 mb-1">Jatuh Tempo</p>
                                                        <p className="text-lg font-semibold text-red-600">
                                                            ⏰ {formatDate(bill.tanggal_jatuh_tempo)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                            
                                            <div className="flex flex-col space-y-2 ml-4">
                                                <Link href={`/bills/${bill.id}`}>
                                                    <Button variant="outline" size="sm" className="w-full">
                                                        👁️ Detail
                                                    </Button>
                                                </Link>
                                                
                                                {bill.status === 'open' && (
                                                    <>
                                                        <Link href={`/bills/${bill.id}/edit`}>
                                                            <Button variant="outline" size="sm" className="w-full">
                                                                ✏️ Edit
                                                            </Button>
                                                        </Link>
                                                        <Button 
                                                            variant="outline" 
                                                            size="sm" 
                                                            className="w-full"
                                                            onClick={() => handleCloseBill(bill.id)}
                                                        >
                                                            🔒 Tutup
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Progress indicator for due date */}
                                        <div className="mt-4">
                                            {new Date(bill.tanggal_jatuh_tempo) < new Date() ? (
                                                <div className="text-xs text-red-600 bg-red-50 p-2 rounded">
                                                    ⚠️ Tagihan sudah melewati jatuh tempo
                                                </div>
                                            ) : (
                                                <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                                                    ✅ Masih dalam periode pembayaran
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {bills.last_page > 1 && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">
                                    Menampilkan {((bills.current_page - 1) * bills.per_page) + 1} - {Math.min(bills.current_page * bills.per_page, bills.total)} dari {bills.total} tagihan
                                </p>
                                <div className="flex space-x-2">
                                    {bills.current_page > 1 && (
                                        <Link href={`/bills?page=${bills.current_page - 1}`}>
                                            <Button variant="outline" size="sm">
                                                ← Sebelumnya
                                            </Button>
                                        </Link>
                                    )}
                                    {bills.current_page < bills.last_page && (
                                        <Link href={`/bills?page=${bills.current_page + 1}`}>
                                            <Button variant="outline" size="sm">
                                                Selanjutnya →
                                            </Button>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppShell>
    );
}