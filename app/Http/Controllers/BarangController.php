<?php

namespace App\Http\Controllers;

use App\Models\Barang;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class BarangController extends Controller
{
    public function tampil(){
        $data = DB::table('barang')->get();
        return view('barang.Halaman_barang', ['data' => $data]);
    }
    public function store(Request $request){
        $data = new Barang($request->all());
        $data->save();
    }
}
