const mongoose = require("mongoose")

const productmodel = mongoose.Schema({
    image: String,
    name: String,
    price: Number,
    discount: {
        type: Number,
        defualt: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,

})

module.exports = mongoose.model("product", productmodel)