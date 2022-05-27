const express = require("express");
const router = express.Router();
const schema = require('../models/schema')

const { ensureAuthenticated } = require("../config/auth");
const { updateOne } = require("../models/schema");

//buat
router.post('/post', ensureAuthenticated , async (req, res) => {
    
    const nama = req.body.nama;
    const gambar = req.body.gambar;
    const des_pdk = req.body.des_pdk;
    const des_pjg = req.body.des_pjg;
    const section = req.body.section;

    let errors = [];

  //cek required
    if (!nama || !gambar || !des_pdk || !des_pjg || !section) {
        errors.push({ msg: "harap data di input semua" });
    }
    if (errors.length > 0) {
        res.render("post", {
          errors,
          nama,
          gambar,
          des_pdk,
          des_pjg,
          section,
        });
    } else {
        //validasi oke lanjut database
        schema.findOne({ nama: nama }).then((forumSchema) => {
          if (forumSchema) {
            errors.push({ msg: "Judul yang anda pakai sudah digunakan." });
            res.render("post", {
              errors,
              nama,
              gambar,
              des_pdk,
              des_pjg,
              section,
            });
          } else {
                const baru = new schema({
                    nama: nama,
                    gambar: gambar,
                    des_pdk: des_pdk,
                    des_pjg: des_pjg,
                    section: section      
                });
                baru.save()
                req.flash("success_msg", "Anda berhasil Mem-Posting");
                res.render("terimakasih");
          }
        });
    }
})

router.get('/delete/:id',(req,res)=>{
    schema
        .findByIdAndRemove(req.params.id)
        .exec();
    res.render("terimakasih")
})

router.post('/edit/:id',(req,res)=>{

    console.log("edit")

    const nama = req.body.nama;
    const gambar = req.body.gambar;
    const des_pdk = req.body.des_pdk;
    const des_pjg = req.body.des_pjg;

    console.log(req.body.nama)
    let errors = [];

        //validasi oke lanjut database
        schema.updateOne({_id : req.params.id}, {$set: {
            "nama" : nama,
            "gambar" : gambar,
            "des_pdk" : des_pdk,
            "des_pjg" :  des_pjg,
        }})
        .exec()
        console.log(req.params.id)
        console.log(nama)
        res.render("terimakasih")
    }
)
module.exports = router;