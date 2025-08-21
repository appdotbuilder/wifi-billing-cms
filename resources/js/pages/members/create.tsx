import React from 'react';
import { Head, useForm } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface MemberFormData {
    nama: string;
    nomor_wa: string;
    status: 'active' | 'inactive';
    tanggal_gabung: string;
    [key: string]: string;
}

export default function CreateMember() {
    const { data, setData, post, processing, errors } = useForm<MemberFormData>({
        nama: '',
        nomor_wa: '',
        status: 'active',
        tanggal_gabung: new Date().toISOString().split('T')[0],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/members');
    };

    return (
        <AppShell>
            <Head title="Tambah Member - WiFi CMS" />
            
            <div className="max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900">➕ Tambah Member Baru</h1>
                    <p className="mt-2 text-gray-600">
                        Tambahkan member baru ke dalam sistem tagihan WiFi
                    </p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>📝 Informasi Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="nama">Nama Lengkap</Label>
                                <Input
                                    id="nama"
                                    type="text"
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                    placeholder="Masukkan nama lengkap member"
                                    className={errors.nama ? 'border-red-500' : ''}
                                />
                                {errors.nama && (
                                    <p className="text-sm text-red-600">{errors.nama}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="nomor_wa">Nomor WhatsApp</Label>
                                <Input
                                    id="nomor_wa"
                                    type="text"
                                    value={data.nomor_wa}
                                    onChange={(e) => setData('nomor_wa', e.target.value)}
                                    placeholder="08123456789"
                                    className={errors.nomor_wa ? 'border-red-500' : ''}
                                />
                                {errors.nomor_wa && (
                                    <p className="text-sm text-red-600">{errors.nomor_wa}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Format: 08123456789 (akan digunakan untuk pengiriman reminder)
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select value={data.status} onValueChange={(value: 'active' | 'inactive') => setData('status', value)}>
                                    <SelectTrigger className={errors.status ? 'border-red-500' : ''}>
                                        <SelectValue placeholder="Pilih status member" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="active">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                                <span>Aktif</span>
                                            </div>
                                        </SelectItem>
                                        <SelectItem value="inactive">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                                                <span>Non-aktif</span>
                                            </div>
                                        </SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-600">{errors.status}</p>
                                )}
                                <p className="text-sm text-gray-500">
                                    Hanya member aktif yang akan dikenakan tagihan bulanan
                                </p>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="tanggal_gabung">Tanggal Gabung</Label>
                                <Input
                                    id="tanggal_gabung"
                                    type="date"
                                    value={data.tanggal_gabung}
                                    onChange={(e) => setData('tanggal_gabung', e.target.value)}
                                    className={errors.tanggal_gabung ? 'border-red-500' : ''}
                                />
                                {errors.tanggal_gabung && (
                                    <p className="text-sm text-red-600">{errors.tanggal_gabung}</p>
                                )}
                            </div>

                            <div className="flex space-x-4 pt-4">
                                <Button type="submit" disabled={processing}>
                                    {processing ? (
                                        <>⏳ Menyimpan...</>
                                    ) : (
                                        <>💾 Simpan Member</>
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