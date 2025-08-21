import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import AppLogo from '@/components/app-logo';

export default function Welcome() {
    return (
        <>
            <Head title="WiFi CMS - Sistem Manajemen Tagihan WiFi" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
                {/* Header */}
                <header className="px-6 lg:px-8 py-6">
                    <nav className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                            <AppLogo />
                            <span className="text-xl font-bold text-gray-900">WiFi CMS</span>
                        </div>
                        <div className="flex items-center space-x-4">
                            <Link href="/login">
                                <Button variant="outline">Masuk</Button>
                            </Link>
                            <Link href="/register">
                                <Button>Daftar</Button>
                            </Link>
                        </div>
                    </nav>
                </header>

                {/* Hero Section */}
                <main className="px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="py-16 sm:py-24 lg:py-32">
                            <div className="text-center">
                                <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                                    📶 <span className="text-blue-600">WiFi CMS</span>
                                </h1>
                                <p className="mt-6 text-lg leading-8 text-gray-600 max-w-2xl mx-auto">
                                    Sistem manajemen tagihan WiFi bulanan yang mudah dan efisien. 
                                    Kelola member, tagihan, dan pembayaran dalam satu platform terintegrasi.
                                </p>
                                
                                <div className="mt-10 flex items-center justify-center gap-x-6">
                                    <Link href="/dashboard">
                                        <Button size="lg" className="px-8 py-3 text-lg">
                                            🚀 Mulai Sekarang
                                        </Button>
                                    </Link>
                                    <Link href="#features">
                                        <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                                            📋 Lihat Fitur
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Features Section */}
                        <div id="features" className="py-24 sm:py-32">
                            <div className="mx-auto max-w-7xl">
                                <div className="text-center mb-16">
                                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        ✨ Fitur Unggulan
                                    </h2>
                                    <p className="mt-4 text-lg text-gray-600">
                                        Semua yang Anda butuhkan untuk mengelola tagihan WiFi dengan mudah
                                    </p>
                                </div>
                                
                                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {/* Dashboard */}
                                    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="text-4xl mb-4">📊</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Dashboard Lengkap
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Ringkasan bulanan dengan statistik member aktif, total tagihan, 
                                            pembayaran masuk, dan tunggakan.
                                        </p>
                                        <div className="bg-gray-50 rounded-lg p-4 text-sm">
                                            <div className="flex justify-between py-1">
                                                <span>Member Aktif:</span>
                                                <span className="font-semibold">25</span>
                                            </div>
                                            <div className="flex justify-between py-1">
                                                <span>Biaya per Orang:</span>
                                                <span className="font-semibold">Rp 50,000</span>
                                            </div>
                                            <div className="flex justify-between py-1 text-green-600">
                                                <span>Total Terbayar:</span>
                                                <span className="font-semibold">Rp 1,100,000</span>
                                            </div>
                                            <div className="flex justify-between py-1 text-red-600">
                                                <span>Belum Bayar:</span>
                                                <span className="font-semibold">Rp 150,000</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Member Management */}
                                    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="text-4xl mb-4">👥</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Kelola Member
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            CRUD lengkap untuk member dengan status aktif/non-aktif, 
                                            nomor WhatsApp, dan tanggal bergabung.
                                        </p>
                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-sm font-medium">Budi Santoso</span>
                                                </div>
                                                <span className="text-xs text-green-600">Aktif</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                    <span className="text-sm font-medium">Sari Dewi</span>
                                                </div>
                                                <span className="text-xs text-green-600">Aktif</span>
                                            </div>
                                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                    <span className="text-sm font-medium text-gray-500">Ahmad Joko</span>
                                                </div>
                                                <span className="text-xs text-gray-500">Non-aktif</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Billing System */}
                                    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="text-4xl mb-4">💳</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Sistem Tagihan
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Buat tagihan bulanan dengan pembagian biaya otomatis 
                                            berdasarkan jumlah member aktif.
                                        </p>
                                        <div className="bg-blue-50 rounded-lg p-4 text-sm">
                                            <div className="flex justify-between items-center mb-2">
                                                <span className="font-semibold text-blue-900">Desember 2024</span>
                                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Terbuka</span>
                                            </div>
                                            <div className="text-blue-700">
                                                <div>Total Biaya: Rp 1,250,000</div>
                                                <div>Per Orang: Rp 50,000</div>
                                                <div>Jatuh Tempo: 10 Des 2024</div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Recording */}
                                    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="text-4xl mb-4">💰</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Pencatatan Pembayaran
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Catat pembayaran dengan support deposit untuk bulan berikutnya 
                                            dan histori lengkap per member.
                                        </p>
                                        <div className="space-y-2">
                                            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                                                <div>
                                                    <div className="text-sm font-medium">Budi Santoso</div>
                                                    <div className="text-xs text-gray-500">Des 2024</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-semibold text-green-600">Rp 50,000</div>
                                                    <div className="text-xs text-green-500">Lunas</div>
                                                </div>
                                            </div>
                                            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                                                <div>
                                                    <div className="text-sm font-medium">Sari Dewi</div>
                                                    <div className="text-xs text-gray-500">Des 2024</div>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-sm font-semibold text-blue-600">Rp 100,000</div>
                                                    <div className="text-xs text-blue-500">+Deposit</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* WhatsApp Integration */}
                                    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="text-4xl mb-4">📱</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Reminder WhatsApp
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Kirim reminder otomatis via WhatsApp Web dengan template pesan 
                                            yang sudah disesuaikan.
                                        </p>
                                        <div className="bg-green-50 rounded-lg p-4">
                                            <div className="text-sm text-green-800">
                                                <div className="font-semibold mb-2">📩 Template Pesan:</div>
                                                <div className="bg-white rounded p-3 text-xs">
                                                    "Halo Budi, iuran WiFi bulan Desember 2024 sebesar Rp 50,000 
                                                    sudah bisa dibayarkan. Jatuh tempo: 10 Des 2024."
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Reports */}
                                    <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                                        <div className="text-4xl mb-4">📈</div>
                                        <h3 className="text-xl font-semibold text-gray-900 mb-4">
                                            Laporan & Rekap
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            Generate laporan bulanan dan tahunan dengan export ke Excel dan PDF 
                                            untuk analisis dan dokumentasi.
                                        </p>
                                        <div className="flex space-x-2">
                                            <div className="flex-1 bg-red-50 rounded p-3 text-center">
                                                <div className="text-lg font-semibold text-red-600">📄</div>
                                                <div className="text-xs text-red-700 mt-1">Export PDF</div>
                                            </div>
                                            <div className="flex-1 bg-green-50 rounded p-3 text-center">
                                                <div className="text-lg font-semibold text-green-600">📊</div>
                                                <div className="text-xs text-green-700 mt-1">Export Excel</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA Section */}
                        <div className="bg-blue-600 rounded-2xl py-16 px-8 text-center text-white my-24">
                            <h2 className="text-3xl font-bold mb-4">
                                🎯 Siap Mengelola WiFi Anda?
                            </h2>
                            <p className="text-xl mb-8 text-blue-100">
                                Bergabunglah dengan admin yang sudah menggunakan WiFi CMS untuk mengelola tagihan mereka
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <Link href="/dashboard">
                                    <Button variant="secondary" size="lg" className="px-8 py-3 text-lg">
                                        🚀 Mulai Gratis
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="border-t bg-white">
                    <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                        <div className="flex items-center justify-center">
                            <p className="text-sm text-gray-500">
                                © 2024 WiFi CMS. Sistem manajemen tagihan WiFi yang mudah dan efisien.
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}