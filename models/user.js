const mongoose = require("mongoose")


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