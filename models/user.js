const mongoose = require("mongoose")

mongoose.connect("mongodb://localhost:27017/scatch")

const usermodel = mongoose.Schema({
    fullname : String,
    email: String,
    password: String,
    cart: {
        type: Array,
        defualt: []
    },

    isadmin: Boolean,
    orders: {
        type: Array,
        defualt: []
    },

    contact: Number,

    picture: String
})

module.exports = mongoose.model("user", usermodel)