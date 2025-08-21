<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMemberRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'nama' => 'required|string|max:255',
            'nomor_wa' => 'required|string|max:20',
            'status' => 'required|in:active,inactive',
            'tanggal_gabung' => 'required|date',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'nama.required' => 'Nama member wajib diisi.',
            'nomor_wa.required' => 'Nomor WhatsApp wajib diisi.',
            'status.required' => 'Status member wajib dipilih.',
            'tanggal_gabung.required' => 'Tanggal gabung wajib diisi.',
        ];
    }
}