const mongoose = require('mongoose')

const forumSchema = mongoose.Schema({
    nama: {
        type: String,
        require: true
    },
    gambar: {
        type: String,
        require: true
    },
    des_pdk: {
        type: String,
        require: true
    },
    des_pjg: {
        type: String,
        require: true
    },
    section: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

module.exports =mongoose.model("Forum",forumSchema,'forum')

