@extends('template/sbadmin')

@section('content')
<div class="card shadow mb-4">
    <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Data Barang</h6>
    </div>
    <div class="card-body">
        <div class="table-responsive">
            <table class="table table-bordered tblBarang" id="dataTable" width="100%" cellspacing="0">
                <thead>
                    <tr>
                        <th>ID barang</th>
                        <th>Nama barang</th>
                        <th>Jumlah Barang</th>
                        <th>Harga Barang</th>
                        <th>Tanggal Masuk</th>
                        <th>Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    @foreach ($data as $dt)
                        <tr>
                            <td>{{$dt->id_barang}}</td>
                            <td>{{$dt->nama_barang}}</td>
                            <td>{{$dt->jumlah_barang}}</td>
                            <td>{{$dt->harga_barang}}</td>
                            <td>{{$dt->tanggal_masuk}}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" id="brg{{$dt->id_barang}}">Edit</button>
                                <button class="btn btn-danger btn-sm" id="brg{{$dt->id_barang}}">Hapus</button>
                            </td>
                        </tr>
                    @endforeach
                </tbody>
                <tfoot>
                    <tr>
                        <th>ID barang</th>
                        <th>Nama barang</th>
                        <th>Jumlah Barang</th>
                        <th>Harga Barang</th>
                        <th>Tanggal Masuk</th>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>

@endsection
@section('js')
<script src="./js/barang.js"></script>
@endsection