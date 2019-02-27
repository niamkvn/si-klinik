const express = require("express");
const router = express.Router();
const pasien = require("../controllers/pasien");
const obat = require("../controllers/pasien");
const dokter = require("../controllers/pasien");
const bodyParser = require("body-parser");

// API ROUTERS
router.post("/api/pasien", pasien.create_a_row);

// NON-API ROUTERS
// router.get("/", (req, res, next)=>{
//     res.status(200).render("index");
// })

//HOME
// router.get("/", pasien.home);


// POST UNIQUE ID UNTUK DIEDIT
router.post("/pasien/edit/", pasien.cari_edit);
// REDIRECT KE FORM EDIT
router.get("/pasien-edit", pasien.render_edit);


// MENAMPILKAN DATA SEMUA PASIEN
router.get("/pasien", pasien.render_pasien);
// POST KATA KUNCI PENCARIAN
router.post("/pasien/cari", pasien.cari);
// REDIRECT KE HASIL PENCARIAN
router.get("/pencarian", pasien.render_pencarian);

// POST UNIQUE ID UNTUK DIHAPUS
router.post("/pasien/hapus", pasien.hapus);

router.get("/tambah-pasien", (req, res, next)=>{
    res.status(200).render("tambahPasien");
})

module.exports = router;
