const mongoose = require("mongoose")

const productmodel = mongoose.Schema({
    image: {
    type: String,
    default: ""
},
    name: String,
    price: Number,
    discount: {
        type: Number,
        default: 0
    },
    bgcolor: String,
    panelcolor: String,
    textcolor: String,

})

module.exports = mongoose.model("product", productmodel)