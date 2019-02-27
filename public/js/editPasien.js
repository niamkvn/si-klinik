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
      url: "http://localhost:3000/pasien/edit",
      type: "POST",
      data: { uniqueId: kataKunci },
      success: data => {
        window.open(data.redirect, "_self");
      }
    });
  }
});