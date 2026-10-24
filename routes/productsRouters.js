
const express = require("express");
const router = express.Router();
const productmodel = require("../models/product");
const upload = require("../config/multer.config");
const cloudinary = require("../config/cloudinary");

router.post("/create", upload.single("image"), async (req, res) => {
    try {
        let {
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        } = req.body;

        if (!req.file) {
            return res.status(400).send("Please upload an image");
        }

        const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
            { folder: "scatch-products" }
        );

        await productmodel.create({
            image: result.secure_url,
            name,
            price,
            discount,
            bgcolor,
            panelcolor,
            textcolor
        });

        req.flash("success", "Product created successfully");
        res.redirect("/owners/admin");

    } catch (err) {
        console.error(err);
        res.status(500).send(err.message);
    }
});

module.exports = router;
