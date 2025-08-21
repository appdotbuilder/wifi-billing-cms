<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBillRequest extends FormRequest
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
            'bulan' => 'required|string|regex:/^\d{4}-\d{2}$/|unique:bills,bulan',
            'biaya_total' => 'required|numeric|min:0',
            'tanggal_jatuh_tempo' => 'required|date|after:today',
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
            'bulan.required' => 'Bulan tagihan wajib diisi.',
            'bulan.unique' => 'Tagihan untuk bulan ini sudah ada.',
            'biaya_total.required' => 'Biaya total WiFi wajib diisi.',
            'biaya_total.min' => 'Biaya total tidak boleh negatif.',
            'tanggal_jatuh_tempo.required' => 'Tanggal jatuh tempo wajib diisi.',
            'tanggal_jatuh_tempo.after' => 'Tanggal jatuh tempo harus setelah hari ini.',
        ];
    }
}