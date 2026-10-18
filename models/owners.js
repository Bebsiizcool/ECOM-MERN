const mongoose = require("mongoose")

const ownermodel = mongoose.Schema({
    fullname : String,
    email: String,
    password: String,

    products: {
        type: Array,
        defualt: []
    },

    picture: String,
    gstin: String
})

module.exports = mongoose.model("owner", ownermodel)