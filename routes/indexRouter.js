const express = require("express")
const router = express.Router()
const isloggedin = require("../middlewares/isloggedin")
const productmodel = require("../models/product")
const usermodel = require("../models/user")

router.get("/", (req, res)=>{
    let error = req.flash("error")
    res.render("index", { error, loggedin: false});
})

router.get("/shop", isloggedin,async (req,res)=>{
    let products = await productmodel.find()
    let success = req.flash("success")
   res.render("shop", { products, success });
})

router.get("/cart", isloggedin,async (req,res)=>{
    let user = await usermodel.findOne({email: req.user.email}).populate("cart")
    const bill = (Number(user.cart[0].price)+20)-Number(user.cart[0].discount)
    res.render("cart", {user, bill});
})

router.get("/addtocart/:productid", isloggedin,async (req,res)=>{
    let user = await  usermodel.findOne({ email: req.user.email})
    user.cart.push(req.params.productid)
    await user.save()
    req.flash("success", "Added to cart")
    res.redirect("/shop")
})


module.exports = router