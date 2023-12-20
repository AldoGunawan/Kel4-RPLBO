<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang extends Model
{
    use HasFactory;
    protected $table = 'barang';
    protected $primaryKey = 'id';
    protected $fillable = ['id_barang', 'nama_barang', 'jumlah_barang', 'harga_barang', 'tanggal_masuk'];
    public $timestamps = false;
}
