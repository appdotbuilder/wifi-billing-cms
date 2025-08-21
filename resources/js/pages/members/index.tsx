import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { AppShell } from '@/components/app-shell';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Member {
    id: number;
    nama: string;
    nomor_wa: string;
    status: 'active' | 'inactive';
    tanggal_gabung: string;
}

interface PaginatedMembers {
    data: Member[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

interface Props {
    members: PaginatedMembers;
    [key: string]: unknown;
}

export default function MembersIndex({ members }: Props) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    const formatPhoneNumber = (phone: string) => {
        // Format phone number for WhatsApp (remove leading 0, add 62)
        if (phone.startsWith('0')) {
            return '62' + phone.substring(1);
        }
        return phone.startsWith('62') ? phone : '62' + phone;
    };

    return (
        <AppShell>
            <Head title="Manajemen Member - WiFi CMS" />
            
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">👥 Manajemen Member</h1>
                        <p className="mt-2 text-gray-600">
                            Kelola member WiFi dan status keanggotaan mereka
                        </p>
                    </div>
                    <Link href="/members/create">
                        <Button size="lg">
                            ➕ Tambah Member
                        </Button>
                    </Link>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {members.data.filter(m => m.status === 'active').length}
                                </div>
                                <p className="text-sm text-gray-500">Member Aktif</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-gray-600">
                                    {members.data.filter(m => m.status === 'inactive').length}
                                </div>
                                <p className="text-sm text-gray-500">Member Non-aktif</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">
                                    {members.total}
                                </div>
                                <p className="text-sm text-gray-500">Total Member</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Members List */}
                <Card>
                    <CardHeader>
                        <CardTitle>📋 Daftar Member</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {members.data.length === 0 ? (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4">👤</div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    Belum Ada Member
                                </h3>
                                <p className="text-gray-600 mb-6">
                                    Tambahkan member pertama untuk memulai mengelola tagihan WiFi
                                </p>
                                <Link href="/members/create">
                                    <Button size="lg">
                                        ➕ Tambah Member Pertama
                                    </Button>
                                </Link>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {members.data.map((member) => (
                                    <div key={member.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                        <div className="flex items-center justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-3">
                                                    <div className={`w-3 h-3 rounded-full ${member.status === 'active' ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                                                    <h3 className="text-lg font-semibold text-gray-900">
                                                        {member.nama}
                                                    </h3>
                                                    <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                                                        {member.status === 'active' ? 'Aktif' : 'Non-aktif'}
                                                    </Badge>
                                                </div>
                                                <div className="mt-2 space-y-1 text-sm text-gray-600">
                                                    <div className="flex items-center space-x-2">
                                                        <span>📱</span>
                                                        <span>{member.nomor_wa}</span>
                                                        <a
                                                            href={`https://wa.me/${formatPhoneNumber(member.nomor_wa)}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-green-600 hover:text-green-700 ml-2"
                                                        >
                                                            WhatsApp
                                                        </a>
                                                    </div>
                                                    <div className="flex items-center space-x-2">
                                                        <span>📅</span>
                                                        <span>Bergabung: {formatDate(member.tanggal_gabung)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <Link href={`/members/${member.id}`}>
                                                    <Button variant="outline" size="sm">
                                                        👁️ Lihat
                                                    </Button>
                                                </Link>
                                                <Link href={`/members/${member.id}/edit`}>
                                                    <Button variant="outline" size="sm">
                                                        ✏️ Edit
                                                    </Button>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Pagination */}
                {members.last_page > 1 && (
                    <Card>
                        <CardContent className="pt-6">
                            <div className="flex justify-between items-center">
                                <p className="text-sm text-gray-600">
                                    Menampilkan {((members.current_page - 1) * members.per_page) + 1} - {Math.min(members.current_page * members.per_page, members.total)} dari {members.total} member
                                </p>
                                <div className="flex space-x-2">
                                    {members.current_page > 1 && (
                                        <Link href={`/members?page=${members.current_page - 1}`}>
                                            <Button variant="outline" size="sm">
                                                ← Sebelumnya
                                            </Button>
                                        </Link>
                                    )}
                                    {members.current_page < members.last_page && (
                                        <Link href={`/members?page=${members.current_page + 1}`}>
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