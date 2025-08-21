<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreMemberRequest;
use App\Http\Requests\UpdateMemberRequest;
use App\Models\Member;
use Inertia\Inertia;

class MemberController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $members = Member::latest()->paginate(10);
        
        return Inertia::render('members/index', [
            'members' => $members
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('members/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMemberRequest $request)
    {
        $member = Member::create($request->validated());

        return redirect()->route('members.show', $member)
            ->with('success', 'Member berhasil ditambahkan.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Member $member)
    {
        $member->load('payments.bill');
        
        return Inertia::render('members/show', [
            'member' => $member
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Member $member)
    {
        return Inertia::render('members/edit', [
            'member' => $member
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMemberRequest $request, Member $member)
    {
        $member->update($request->validated());

        return redirect()->route('members.show', $member)
            ->with('success', 'Member berhasil diperbarui.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Member $member)
    {
        $member->delete();

        return redirect()->route('members.index')
            ->with('success', 'Member berhasil dihapus.');
    }
}