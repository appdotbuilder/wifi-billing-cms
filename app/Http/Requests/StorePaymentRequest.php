<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePaymentRequest extends FormRequest
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
            'member_id' => 'required|exists:members,id',
            'bill_id' => 'required|exists:bills,id',
            'nominal' => 'required|numeric|min:0',
            'tanggal_bayar' => 'required|date',
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
            'member_id.required' => 'Member wajib dipilih.',
            'member_id.exists' => 'Member yang dipilih tidak valid.',
            'bill_id.required' => 'Bulan tagihan wajib dipilih.',
            'bill_id.exists' => 'Bulan tagihan yang dipilih tidak valid.',
            'nominal.required' => 'Nominal pembayaran wajib diisi.',
            'nominal.min' => 'Nominal tidak boleh negatif.',
            'tanggal_bayar.required' => 'Tanggal bayar wajib diisi.',
        ];
    }
}