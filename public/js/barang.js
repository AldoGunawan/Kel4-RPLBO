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
            var htmlNewRecord = `
            <tr class="tr_${respond.last_insert_id}">
                <td class ="id_barang">${data.id_barang}</td>
                <td class ="nama_barang">${data.nama_barang}</td>
                <td class ="jumlah_barang">${data.jumlah_barang}</td>
                <td class ="harga_barang">${data.harga_barang}</td>
                <td class ="tanggal_masuk">${data.tanggal_masuk}</td>
                <td>
                    <button class="btn btn-warning btn-sm btnEdit" id="brg_${respond.last_insert_id}">Edit</button>
                    <button class="btn btn-danger btn-sm btnHapus" id="brg_${respond.last_insert_id}">Hapus</button>
                </td>
            `;
            $(`tbody`).prepend(htmlNewRecord);
            $('.tr_'+id).remove()
        },
        error:function(){
            alert("Terjadi Kesalahan!");
        }
    })
})

function getData(classTr) {
    data    = new Object();
    data.id = classTr;
    data.id_barang = $(`.tr_${classTr} .id_barang`).val();
    data.nama_barang = $(`.tr_${classTr} .nama_barang`).val();
    data.jumlah_barang = $(`.tr_${classTr} .jumlah_barang`).val();
    data.harga_barang = $(`.tr_${classTr} .harga_barang`).val();
    data.tanggal_masuk = $(`.tr_${classTr} .tanggal_masuk`).val();
    data._token = $('meta[name="csrf-token"]').attr('content');
    return data;
}

function getDataFromRecord(classTr) {
    data = new Object();
    data.id = classTr;
    data.id_barang = $(`.tr_${classTr} .id_barang`).html().trim();
    data.nama_barang = $(`.tr_${classTr} .nama_barang`).html().trim()
    data.jumlah_barang = $(`.tr_${classTr} .jumlah_barang`).html().trim()
    data.harga_barang = $(`.tr_${classTr} .harga_barang`).html().trim()
    data.tanggal_masuk = $(`.tr_${classTr} .tanggal_masuk`).html().trim()
    data._token = $('meta[name="csrf-token"]').attr('content');
    return data;
}

$(document).on("click", ".btnEdit", function() {
    var classTr = $(this).attr("id").replace("brg_","");
    var data = getDataFromRecord(classTr);
    console.log(data);

    var htmlFormEdit = `
    <tr class="tr_${data.id} formEdit_${data.id}">
    <td><input type="text" class="form-control kode" value="${data.id_barang}"></td>
    <td><input type="text" class="form-control kode" value="${data.nama_barang}"></td>
    <td><input type="text" class="form-control kode" value="${data.jumlah_barang}"></td>
    <td><input type="text" class="form-control kode" value="${data.harga_barang}"></td>
    <td><input type="text" class="form-control kode" value="${data.tanggal_masuk}" readonly></td>
        <td>
            <button class="btn btn-primary btnSaveEdit" id="btnSave_${data.id}">Update</button>
            <button class="btn btn-danger btnCancelEdit" id="btnCancel_${data.id}">Batal</button>
        </td>
    </tr>
    `;
    $(`.tr_${data.id}`).addClass("old");
    $(`.tr_${data.id}`).hide();
    $(`.tr_${data.id}`).before(htmlFormEdit);
});

$(document).on("click", ".btnCancelEdit", function(){
    var id = $(this).attr("id").replace("btnCancel_","");
    $(`.formEdit_${id}`).remove();
    $(`.tr_${id}`).show();
});

$(document).on("click", ".btnSaveEdit", function(){
    var id = $(this).attr("id").replace("btnSave_","");
    var data = getData(id);
    console.log(data);

    // aksi buat kirim data ke controller
    $.ajax({
        url : "barang/update",
        type : "POST",
        data : data,
        success:function(respond){
            console.log(respond);
            var htmlNewRecore = `
            <tr class="tr_${data.id}">
                <td class="kode">${data.kode}</td>
                <td class="kode">${data.kode}</td>
                <td class="nama">${data.nama}</td>
                <td class="stok">${data.stok}</td>
                <td>
                    <button class="btn btn-warning btn-sm btnEdit" id="brg_${data.id}">Edit</button>
                    <button class="btn btn-danger btn-sm btnHapus" id="brg_${data.id}">Hapus</button>
                </td>
            </tr>
            `;
            $('.formEdit_'+ id).after(htmlNewRecore);
            $('.formEdit_'+id).remove();
            $('.tr_'+id + '.old').remove();
        },
        error:function(){
            alert("terjadi kesalahan");
        }
    })
});

// hapus data
$(document).on("click", ".btnHapus", function(){
    var id = $(this).attr("id").replace("brg_","");
    var data = getData(id);

    $.ajax({
        url : "barang/hapus",
        type : "POST",
        data : data,
        success:function(respond){
            console.log(respond);
            $('.tr_'+id).remove();
        },
        error:function(){
            alert("terjadi kesalahan");
        }
    })
});