<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\BarangController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('Halamandashboard', [AuthController::class, 'tampilDashboard'])->name('Halamandashboard');
Route::get('Halamanlogin', [AuthController::class, 'tampil'])->name('Halamanlogin');
Route::get('registration', [AuthController::class, 'registration'])->name('registration');
Route::POST('custom-registration', [AuthController::class, 'customRegistration'])->name('custom.registration');
Route::POST('custom-login', [AuthController::class, 'customLogin'])->name('custom.login');
Route::get('logout', [AuthController::class, 'logout'])->name('logout');
///barang
Route::get('Halaman_barang', [BarangController::class, 'tampil'])->name('list-barang');
Route::POST('Halaman_barang/store', [BarangController::class, 'store']);
///transaksi
Route::get('Halaman_transaksi', [BarangController::class, 'tampil'])->name('list-transaksi');
