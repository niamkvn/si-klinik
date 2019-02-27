$("#formulir").submit(e => {
  e.preventDefault();

  let id_pas = $("#id_pas").val();
  let id_fak = $("input[name='fakultas']:checked").val();
  let nama_pas = $("#nama").val();
  let tgl_lahir = $("#tgl_lahir").val();
  let nomor_tel = $("#nomor_tel").val();
  let jenis_kel = $("input[name='gender']:checked").val();

  let pasien = {
    id_pas: id_pas,
    id_fak: id_fak,
    nama_pas: nama_pas,
    tgl_lahir: tgl_lahir,
    nomor_tel: nomor_tel,
    jenis_kel: jenis_kel
  };

  $.ajax({
    url: "http://localhost:3000/api/pasien",
    type: "POST",
    data: pasien,
    success: data => {
      // $("#tabel_form").removeClass("hidden");
      renderTable(data);
    }
  });
});

const renderTable = data => {
  for (let i = 0; i < data.length; i++) {
    $("#tbody_records").append(
      `<tr class="even pointer">
        <td class=" ">
          <div class="icheckbox_flat-green" style="position: relative;">
            <input type="checkbox" class="flat" name="table_records" style="position: absolute; opacity: 0;">
            <ins class="iCheck-helper" style="position: absolute; top: 0%; left: 0%; display: block; width: 100%; height: 100%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;">
            </ins>
          </div>
        </td>
        <td class=" ">
        ${data[i].id_pas}
        </td><td class=" ">
        ${data[i].id_fak}
        </td><td class=" ">
        ${data[i].nama_pas}
        </td><td class=" ">
        ${data[i].tgl_lahir}
        </td><td class=" ">
        ${data[i].nomor_tel}
        </td><td class=" ">
        ${data[i].jenis_kel}
        </td><td class=" last"><a href="#">Edit</a></td>
        </tr>`
    );
  }
};
