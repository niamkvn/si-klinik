const bodyParser = require("body-parser");
const mysql = require("mysql");
let kata_kunci = "";
let sizeUnique_id = 0;
let unique_id = [];

const connection = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "",
    database: "db_klinik"
  },
  { multipleStatements: true }
);

exports.home = (req, res, next) => {
  let query = `SELECT COUNT(id_pas) AS jumlaPasien FROM pasien`;
  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).json({
        error: err
      });
    } else {
      res.status(200).send(rows);
    }
  });
};

exports.create_a_row = (req, res, next) => {
  let id_pas = req.body.id_pas;
  let id_fak = req.body.id_fak;
  let nama_pas = req.body.nama_pas;
  let tgl_lahir = req.body.tgl_lahir;
  let nomor_tel = req.body.nomor_tel;
  let jenis_kel = req.body.jenis_kel;

  let query = `INSERT INTO pasien (id_pas, id_fak, nama_pas, tgl_lahir, nomor_tel, jenis_kel) values 
  (?, ?, ?, ?, ?, ?)`;
  connection.query(
    query,
    [id_pas, id_fak, nama_pas, tgl_lahir, nomor_tel, jenis_kel],
    (err, rows) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        let query = `SELECT * FROM pasien WHERE id_pas = ?`;
        connection.query(query, [id_pas], (err, rows) => {
          if (err) {
            res.status(500).json({
              error: err
            });
          } else {
            res.status(200).json(rows);
          }
        });
      }
    }
  );
};

exports.render_pasien = (req, res, next) => {
  let query = `SELECT * FROM pasien`;
  connection.query(query, (err, rows) => {
    if (err) {
      res.status(500).json({
        error: err
      });
    } else {
      res
        .status(200)
        .render("tabelPasien", { data: rows, jmlTerhapus: sizeUnique_id });
      sizeUnique_id = 0;
    }
  });
};

exports.cari = (req, res, next) => {
  kata_kunci = req.body.kunci;
  res.status(200).send({ redirect: "/pencarian" });
};

exports.render_pencarian = (req, res, next) => {
  let parameter = kata_kunci + "%";
  let kunci = kata_kunci;
  let query = `SELECT * FROM pasien WHERE id_pas LIKE ? OR id_fak LIKE ? OR nama_pas LIKE ? OR tgl_lahir LIKE ? OR nomor_tel LIKE ? OR jenis_kel LIKE ?`;
  connection.query(
    query,
    [parameter, parameter, parameter, parameter, parameter, parameter],
    (err, rows) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        res.status(200).render("pencarian", { data: rows, kunci: kunci });
      }
    }
  );
  kata_kunci = "";
};

exports.cari_edit = (req, res, next) => {
  unique_id = req.body.uniqueId;
  console.log(unique_id)
  res.status(200).send({ redirect: "/pasien-edit" });
};

exports.render_edit = (req, res, next) => {
  if (unique_id.length > 0) {
    let query = `SELECT * FROM pasien WHERE id_pas = ?`;
    connection.query(query, [unique_id], (err, rows) => {
      if (err) {
        res.status(500).json({
          error: err
        });
      } else {
        console.log(rows);
        res.status(200).render("editPasien", { data: rows, kunci: unique_id });
      }
    });
    unique_id = [];
  } else {
    res.status(200).render("editPasien", {data: ""});
  }
};

exports.hapus = (req, res, next) => {
  unique_id = req.body.uniqueId;
  let query = `DELETE FROM pasien WHERE id_pas IN (?)`;
  connection.query(query, [unique_id], (err, rows) => {
    if (err) {
      res.status(500).json({
        error: err
      });
    } else {
      sizeUnique_id = unique_id.length;
      unique_id = [];
      res.json({ status: 200 });
    }
  });
};
