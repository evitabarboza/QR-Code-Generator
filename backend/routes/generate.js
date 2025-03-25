const express = require("express");
const QRCode = require("qrcode");
const fs = require("fs");

const router = express.Router();

router.post("/generate", async (req, res) => {
    const { text, color, shape } = req.body;
    
    try {
        const qrOptions = {
            color: { dark: color || "#000000", light: "#ffffff" }
        };

        const qrImage = await QRCode.toDataURL(text, qrOptions);
        res.json({ qrImage });
    } catch (err) {
        res.status(500).json({ error: "Error generating QR code" });
    }
});

module.exports = router;
