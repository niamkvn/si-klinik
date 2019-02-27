let arrUniqueId = [];

$("#input_cari").keyup(function() {
  $("#searchclear").toggle(Boolean($(this).val()));
});

$("#searchclear").toggle(Boolean($("#input_cari").val()));
$("#searchclear").click(function() {
  $("#input_cari")
    .val("")
    .focus();
  $(this).hide();
});

// HANDLE PENCARIAN
$("#btn_cari").on("click", () => {
  let kataKunci = $("#input_cari").val();

  // JIKA INPUT TIDAK KOSONG
  if (kataKunci) {
    $.ajax({
      // POST KATA KUNCI
      url: "http://localhost:3000/pasien/cari",
      type: "POST",
      data: { kunci: kataKunci },
      success: data => {
        window.open(data.redirect, "_self");
      }
    });
  }
});

// HANDLE CENTANG
$("table tbody input").on("ifChecked", e => {
  let uniqueId = $(e.currentTarget).attr("id");
  arrUniqueId.push(uniqueId);
});

$("table tbody input").on("ifUnchecked", e => {
  let uniqueId = $(e.currentTarget).attr("id");
  arrUniqueId = arrUniqueId.filter(el => {
    return el != uniqueId;
  });
});

// HANDLE HAPUS
$(".opsi-hapus").on("click", () => {
  $(".modal-custom").toggleClass("show-modal");
});

$(".modal-custom").on("click", () => {
  $(".modal-custom").toggleClass("show-modal");
});

$(".btn-hapus").on("click", () => {
  $.ajax({
    url: "http://localhost:3000/pasien/hapus",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({ uniqueId: arrUniqueId }),
    success: data => {
      if (data.status == 200) {
        document.location.reload();
      }
    }
  });
});

// HANDLE EDIT
$(".btn-edit").on("click", e => {
  let uniqueId = $(e.currentTarget).attr("id");
  arrUniqueId.push(uniqueId);
  $.ajax({
    url: "http://localhost:3000/pasien/edit",
    type: "POST",
    contentType: "application/json; charset=utf-8",
    dataType: "json",
    data: JSON.stringify({ uniqueId: arrUniqueId }),
    success: data => {
      window.open(data.redirect, "_self");
    }
  });

});
