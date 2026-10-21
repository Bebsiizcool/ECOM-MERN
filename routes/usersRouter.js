const express = require("express")
const router = express.Router()
const {registeruser} = require("../controllers/authcontroller")

router.post("/register", registeruser)



router.post("/login", (req, res)=>{

})


module.exports = router