const express = require('express');
const app = express();
const ejs = require("ejs")
const mongoose = require("mongoose")
const db = require("./config/mongoose-connection")
const path = require("path")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const cookieparser = require("cookie-parser")
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouters")
const indexRouter = require("./routes/indexRouter")
const expressSession = require("express-session")
const flash = require("connect-flash")
require("dotenv").config()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieparser())
app.set("view engine", "ejs")
app.use(express.static(path.join(__dirname, "public")))
app.use(flash())
app.use(expressSession({
    resave: false,
    saveUninitialized: false,
    secret: process.env.EXPRESS_SESSION_SECRET
}))

app.use("/", indexRouter)
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.listen(3000)