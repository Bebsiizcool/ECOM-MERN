const express = require("express")
const router = express.Router()
const isloggedin = require("../middlewares/isloggedin")
const productmodel = require("../models/product")

router.get("/", (req, res)=>{
    let error = req.flash("error")
    res.render("index", { error});
})

router.get("/shop", isloggedin,async (req,res)=>{
    let products = await productmodel.find()
   res.render("shop", { products });
})


module.exports = router