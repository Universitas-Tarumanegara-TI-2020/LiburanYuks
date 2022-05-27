const express = require("express");
const router = express.Router();
const Comment = require('../models/Comment')
const User = require("../models/User")

const { ensureAuthenticated } = require("../config/auth");

router.post('/comment/:nama', ensureAuthenticated, async (req, res) => {
    const user = req.body.user;
    const comment = req.body.comment;
    const page = req.params.nama;
    
    const baru = new Comment({
        user: user,
        comment: comment,
        page: page
    });
     await baru.save()
     res.render("terimakasih")
})
module.exports = router;