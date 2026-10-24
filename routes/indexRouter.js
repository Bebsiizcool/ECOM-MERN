const express = require("express")
const router = express.Router()
const isloggedin = require("../middlewares/isloggedin")
const productmodel = require("../models/product")
const usermodel = require("../models/user")

router.get("/", (req, res)=>{
    if(req.cookies.token){
        return res.redirect("/shop")
    }

    let error = req.flash("error")
    res.render("index", { error, loggedin: false});
})

router.get("/shop", isloggedin,async (req,res)=>{
    let products = await productmodel.find()
    let success = req.flash("success")
   res.render("shop", { products, success });
})

router.get("/cart", isloggedin, async (req, res) => {
    let user = await usermodel
        .findOne({ email: req.user.email })
        .populate("cart");

    if (!user) {
        return res.status(404).send("User not found");
    }

    let totalMRP = 0;
    let totalDiscount = 0;
    let platformFee = user.cart.length > 0 ? 20 : 0;

    user.cart.forEach(function (item) {
        totalMRP += Number(item.price || 0);
        totalDiscount += Number(item.discount || 0);
    });

    let bill = totalMRP - totalDiscount + platformFee;

    res.render("cart", {
        user,
        totalMRP,
        totalDiscount,
        platformFee,
        bill
    });
});

router.get("/addtocart/:productid", isloggedin,async (req,res)=>{
    let user = await  usermodel.findOne({ email: req.user.email})
    user.cart.push(req.params.productid)
    await user.save()
    req.flash("success", "Added to cart")
    res.redirect("/shop",)
})


module.exports = router