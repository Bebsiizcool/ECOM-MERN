const userModel = require("../models/user")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const gentoken = require("../utils/createtoken")

module.exports.registeruser =  async(req, res)=>{
   try{
     let {email, fullname, password} = req.body
    
    let already = await userModel.findOne({email})
    if(already) return res.status(401).send("You Already have an account")
    
    bcrypt.genSalt(10, (err, salt)=>{
        bcrypt.hash(password, salt, async (err, hash)=>{
            let user = await userModel.create({
            email,
            fullname,
            password: hash
    })  
        let token = gentoken(user)
        res.cookie("token", token)
        res.redirect("/shop")
        }
    )}) 
   }
   catch(err){
    console.log(err.message)
   }
}

module.exports.loginuser = async(req, res)=>{
    let {email, password} = req.body
    let user = await userModel.findOne({email})
    if(!user) return res.send("User Does not Exist")

    bcrypt.compare(password, user.password, (err, result)=>{
        if(result){
            let token = gentoken(user)
            res.cookie("token", token)
            res.redirect("/shop")
        }
        else{
            res.send("email or pass incorrect")
        }
    })
}

module.exports.logoutuser = async(req, res)=>{
   res.cookie("token", "")
   res.redirect("/")
}