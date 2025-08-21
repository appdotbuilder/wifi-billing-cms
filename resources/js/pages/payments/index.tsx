import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';


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
}

interface Payment {
    id: number;
    nominal: number;
    bulan_bayar: string;
    tanggal_bayar: string;
    sisa_saldo: number;
    member: Member;
    bill: Bill;
}

interface PaginatedPayments {
    data: Payment[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    payments: PaginatedPayments;
    [key: string]: unknown;
}

export default function PaymentsIndex({ payments }: Props) {
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
            'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun',
            'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'
        ];
        return `${monthNames[parseInt(month) - 1]} ${year}`;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        });
    };

    const getPaymentStatus = (payment: Payment) => {
        if (payment.sisa_saldo > 0) {
            return { type: 'deposit', label: 'Dengan Deposit', color: 'bg-blue-100 text-blue-800' };
        } else if (payment.nominal >= payment.bill.biaya_per_orang) {
            return { type: 'full', label: 'Lunas', color: 'bg-green-100 text-green-800' };
        } else {
            return { type: 'partial', label: 'Belum Lunas', color: 'bg-yellow-100 text-yellow-800' };
        }
    };

    return (
        <AppShell>
            <Head title="Histori Pembayaran - WiFi CMS" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">💰 Histori Pembayaran</h1>
                        <p className="mt-2 text-gray-600">
                            Semua pembayaran yang telah dicatat dalam sistem
                        </p>
                    </div>
                    <Link href="/payments/create">
                        <Button size="lg">
                            ➕ Catat Pembayaran
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {payments.data.filter(p => p.nominal >= p.bill.biaya_per_orang).length}
                                </div>
                                <p className="text-sm text-gray-500">Pembayaran Lunas</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {payments.data.filter(p => p.sisa_saldo > 0).length}
                                </div>
                                <p className="text-sm text-gray-500">Dengan Deposit</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {formatCurrency(payments.data.reduce((sum, p) => sum + p.nominal, 0))}
                                </div>
                                <p className="text-sm text-gray-500">Total Diterima</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-orange-600">
                                    {payments.total}
                                </div>
                                <p className="text-sm text-gray-500">Total Transaksi</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Payments List */}
                <Card>
                    <CardHeader>
                        <CardTitle>📋 Daftar Pembayaran</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {payments.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">💰</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Belum Ada Pembayaran
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Catat pembayaran pertama untuk mulai melacak pembayaran member
                                </p>
                                <Link href="/payments/create">
                                    <Button size="lg">
                                        ➕ Catat Pembayaran Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {payments.data.map((payment) => {
                                    const status = getPaymentStatus(payment);
                                    return (
                                        <div key={payment.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center space-x-3 mb-2">
                                                        <h3 className="text-lg font-semibold text-gray-900">
                                                            👤 {payment.member.nama}
                                                        </h3>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}>
                                                            {status.label}
                                                        </span>
                                                    </div>
                                                    
                                                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
                                                        <div>
                                                            <p className="text-gray-500 mb-1">Nominal Bayar</p>
                                                            <p className="font-semibold text-green-600">
                                                                {formatCurrency(payment.nominal)}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 mb-1">Bulan</p>
                                                            <p className="font-semibold">
                                                                📅 {formatMonth(payment.bulan_bayar)}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 mb-1">Tanggal Bayar</p>
                                                            <p className="font-semibold">
                                                                {formatDate(payment.tanggal_bayar)}
                                                            </p>
                                                        </div>
                                                        <div>
                                                            <p className="text-gray-500 mb-1">Status</p>
                                                            <div className="space-y-1">
                                                                <p className="font-semibold">
                                                                    Tagihan: {formatCurrency(payment.bill.biaya_per_orang)}
                                                                </p>
                                                                {payment.sisa_saldo > 0 && (
                                                                    <p className="text-blue-600 font-semibold">
                                                                        Sisa: {formatCurrency(payment.sisa_saldo)}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="flex space-x-2 ml-4">
                                                    <Link href={`/payments/${payment.id}`}>
                                                        <Button variant="outline" size="sm">
                                                            👁️ Detail
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/payments/${payment.id}/edit`}>
                                                        <Button variant="outline" size="sm">
                                                            ✏️ Edit
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {payments.last_page > 1 && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">
                                    Menampilkan {((payments.current_page - 1) * payments.per_page) + 1} - {Math.min(payments.current_page * payments.per_page, payments.total)} dari {payments.total} pembayaran
                                </p>
                                <div className="flex space-x-2">
                                    {payments.current_page > 1 && (
                                        <Link href={`/payments?page=${payments.current_page - 1}`}>
                                            <Button variant="outline" size="sm">
                                                ← Sebelumnya
                                            </Button>
                                        </Link>
                                    )}
                                    {payments.current_page < payments.last_page && (
                                        <Link href={`/payments?page=${payments.current_page + 1}`}>
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