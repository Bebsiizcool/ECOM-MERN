const express = require("express")
const router = express.Router()
const owenrModel = require("../models/owners")


if(process.env.NODE_ENV === "development"){

    router.post("/create", async(req, res)=>{
       let owners = await owenrModel.find()
       if(owners.length > 0) return res.send(503).send("you dont have permision to create new owner")
        
        let {fullname, email, password} = req.body
        let admin = await owenrModel.create({
        fullname,
        email,
        password,
        })

        res.status(201).send(admin)
    })

}


router.get("/admin", (req, res)=>{
    let success = req.flash("success")
    res.render("createproducts", { success });
})



// console.log("NODE_ENV:", process.env.NODE_ENV);

module.exports = router