$(document).ready(function(){
    $(".dataTables_length label").before ("<button class='btn btn-primary' id='add'>Tambah</button>");
});

$(document).on("click", "#add", function(){
    var id =makeid(10);
    $(".tblBarang tbody").prepend(`
        <tr class="tr_${id}">
        <td><input type="text" class="form control id_barang"></td>
        <td><input type="text" class="form control nama_barang"></td>
        <td><input type="text" class="form control jumlah_barang"></td>
        <td><input type="text" class="form control harga_barang"></td>
        <td><input type="text" class="form control tanggal_masuk"></td>
        <td>
            <button class="btn btn-primary btnSave" id="btnSave_${id}">Simpan</button>
            <button class="btn btn-danger btnCancel" id="btnCancel_${id}">Batal</button>
        </td>
        </tr>
    `);
});

$(document).on("click", ".btnCancel", function(){
    var classTr = $(this).attr("id").replace("btnCancel_","tr_");
    $("."+classTr).remove();
})

$(document).on("click", ".btnSave", function(){
    var id = $(this).attr("id").replace("btnSave_","");
    var data = getData(id);
    console.log(data);

    //aksi kirim data ke controller
    $.ajax({
        url  : "Halaman_barang/store",
        type : "POST",
        data : data,
        success:function(respond){
            console.log(respond);
        },
        error:function(){
            alert("Terjadi Kesalahan");
        }
    })
})

function getData(classTr) {
    data    = new Object();
    data.id_barang = $(`.tr_${classTr} .id_barang`).val();
    data.nama_barang = $(`.tr_${classTr} .nama_barang`).val();
    data.jumlah_barang = $(`.tr_${classTr} .jumlah_barang`).val();
    data.harga_barang = $(`.tr_${classTr} .harga_barang`).val();
    data.tanggal_masuk = $(`.tr_${classTr} .tanggal_masuk`).val();
    data._token = $(`meta[name="csrf-token"]`).attr('content');
    return data;
}