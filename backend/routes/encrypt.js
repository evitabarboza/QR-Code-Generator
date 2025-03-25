const express = require("express");
const QRCode = require("qrcode");
const CryptoJS = require("crypto-js");
const fs = require("fs");

const router = express.Router();

router.post("/generate", async (req, res) => {
    const { text, password } = req.body;

    try {
        const encryptedText = CryptoJS.AES.encrypt(text, password).toString();
        const qrImage = await QRCode.toDataURL(encryptedText);

        res.json({ qrImage });
    } catch (err) {
        res.status(500).json({ error: "Error encrypting QR code" });
    }
});

router.post("/decrypt", (req, res) => {
    const { encryptedText, password } = req.body;

    try {
        const bytes = CryptoJS.AES.decrypt(encryptedText, password);
        const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
        
        res.json({ decryptedText });
    } catch (err) {
        res.status(500).json({ error: "Error decrypting QR code" });
    }
});

module.exports = router;
