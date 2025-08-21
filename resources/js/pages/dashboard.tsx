import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface DashboardStats {
    activeMembers: number;
    costPerPerson: number;
    totalBilled: number;
    totalPaid: number;
    totalUnpaid: number;
    currentMonth: string;
    hasCurrentBill: boolean;
    unpaidMembersCount: number;
}

interface Props {
    stats: DashboardStats;
    [key: string]: unknown;
}

export default function Dashboard({ stats }: Props) {
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

    const handleSendReminders = () => {
        // Implementation for WhatsApp reminders would go here
        alert('Fitur pengiriman reminder akan membuka WhatsApp Web untuk setiap member yang belum bayar');
    };

    return (
        <AppShell>
            <Head title="Dashboard - WiFi CMS" />
            
            <div className="space-y-8">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">📊 Dashboard WiFi CMS</h1>
                    <p className="mt-2 text-gray-600">
                        Ringkasan tagihan bulan {formatMonth(stats.currentMonth)}
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-500">Member Aktif</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-600">
                                👥 {stats.activeMembers}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Jumlah member yang aktif
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-500">Biaya Per Orang</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-600">
                                💰 {formatCurrency(stats.costPerPerson)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Pembagian merata per member
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-500">Total Terbayar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-600">
                                ✅ {formatCurrency(stats.totalPaid)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Pembayaran yang sudah masuk
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader className="pb-3">
                            <CardTitle className="text-sm font-medium text-gray-500">Belum Terbayar</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-red-600">
                                ⏳ {formatCurrency(stats.totalUnpaid)}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                {stats.unpaidMembersCount} member belum bayar
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Quick Actions */}
                <Card>
                    <CardHeader>
                        <CardTitle>🚀 Aksi Cepat</CardTitle>
                        <CardDescription>
                            Aksi yang sering digunakan untuk mengelola tagihan WiFi
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <Link href="/payments/create">
                                <Button className="w-full h-20 flex-col space-y-2" variant="outline">
                                    <div className="text-2xl">💳</div>
                                    <div>Catat Pembayaran</div>
                                </Button>
                            </Link>
                            
                            <Button 
                                onClick={handleSendReminders}
                                className="w-full h-20 flex-col space-y-2" 
                                variant="outline"
                                disabled={stats.unpaidMembersCount === 0}
                            >
                                <div className="text-2xl">📱</div>
                                <div>Kirim Reminder</div>
                            </Button>
                            
                            <Link href="/members">
                                <Button className="w-full h-20 flex-col space-y-2" variant="outline">
                                    <div className="text-2xl">👥</div>
                                    <div>Kelola Member</div>
                                </Button>
                            </Link>
                            
                            <Link href="/bills">
                                <Button className="w-full h-20 flex-col space-y-2" variant="outline">
                                    <div className="text-2xl">📊</div>
                                    <div>Kelola Tagihan</div>
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card>

                {/* Current Month Status */}
                {stats.hasCurrentBill ? (
                    <Card>
                        <CardHeader>
                            <CardTitle>📋 Status Bulan Ini</CardTitle>
                            <CardDescription>
                                Ringkasan tagihan {formatMonth(stats.currentMonth)}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">📈 Progress Pembayaran</h4>
                                    <div className="space-y-3">
                                        <div className="flex justify-between">
                                            <span>Total Tagihan:</span>
                                            <span className="font-semibold">{formatCurrency(stats.totalBilled)}</span>
                                        </div>
                                        <div className="flex justify-between text-green-600">
                                            <span>Sudah Terbayar:</span>
                                            <span className="font-semibold">{formatCurrency(stats.totalPaid)}</span>
                                        </div>
                                        <div className="flex justify-between text-red-600">
                                            <span>Belum Terbayar:</span>
                                            <span className="font-semibold">{formatCurrency(stats.totalUnpaid)}</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div 
                                                className="bg-green-600 h-2 rounded-full transition-all" 
                                                style={{ 
                                                    width: `${stats.totalBilled > 0 ? (stats.totalPaid / stats.totalBilled) * 100 : 0}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            {stats.totalBilled > 0 
                                                ? `${Math.round((stats.totalPaid / stats.totalBilled) * 100)}% terkumpul`
                                                : 'Belum ada tagihan'
                                            }
                                        </p>
                                    </div>
                                </div>
                                
                                <div>
                                    <h4 className="font-semibold text-gray-900 mb-4">⚡ Aksi Tersedia</h4>
                                    <div className="space-y-3">
                                        <Link href="/payments/create">
                                            <Button className="w-full justify-start">
                                                💳 Tambah Pembayaran
                                            </Button>
                                        </Link>
                                        {stats.unpaidMembersCount > 0 && (
                                            <Button 
                                                onClick={handleSendReminders}
                                                className="w-full justify-start" 
                                                variant="outline"
                                            >
                                                📱 Kirim Reminder ({stats.unpaidMembersCount} member)
                                            </Button>
                                        )}
                                        <Link href={`/bills`}>
                                            <Button className="w-full justify-start" variant="outline">
                                                📊 Lihat Detail Tagihan
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ) : (
                    <Card className="border-dashed border-2 border-gray-300">
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-6xl mb-4">📋</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Belum Ada Tagihan Bulan Ini
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Buat tagihan untuk bulan {formatMonth(stats.currentMonth)} terlebih dahulu
                                </p>
                                <Link href="/bills/create">
                                    <Button size="lg">
                                        ➕ Buat Tagihan Bulan Ini
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Navigation Cards */}
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/members">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">👥</div>
                                    <h3 className="text-lg font-semibold mb-2">Manajemen Member</h3>
                                    <p className="text-sm text-gray-600">
                                        Tambah, edit, dan kelola status member WiFi
                                    </p>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/bills">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">💳</div>
                                    <h3 className="text-lg font-semibold mb-2">Tagihan Bulanan</h3>
                                    <p className="text-sm text-gray-600">
                                        Kelola tagihan dan pembagian biaya WiFi
                                    </p>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>

                    <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                        <Link href="/payments">
                            <CardContent className="pt-6">
                                <div className="text-center">
                                    <div className="text-4xl mb-4">💰</div>
                                    <h3 className="text-lg font-semibold mb-2">Histori Pembayaran</h3>
                                    <p className="text-sm text-gray-600">
                                        Lihat semua pembayaran dan deposit member
                                    </p>
                                </div>
                            </CardContent>
                        </Link>
                    </Card>
                </div>
            </div>
        </AppShell>
    );
}