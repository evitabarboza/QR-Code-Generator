import React, { useState, useRef } from "react";
import axios from "axios";
import QRCodeStyling from "qr-code-styling";

const QRGenerator = () => {
  const [link, setLink] = useState(""); // URL input
  const [color, setColor] = useState("#000000"); // Default QR color
  const qrRef = useRef(null); // Reference for the QR code

  // QR Code Styling
  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    dotsOptions: {
      color: color, // Dynamic Color Selection
      type: "rounded", // Change this for different dot styles
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
    },
  });

  const generateQRCode = () => {
    if (link.trim() === "") {
      alert("Please enter a valid link.");
      return;
    }

    qrCode.update({ data: link, dotsOptions: { color } }); // Update QR code with new link & color
    qrCode.append(qrRef.current); // Append to the div
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Custom QR Code Generator</h2>

      {/* Link Input */}
      <input
        type="text"
        placeholder="Enter URL"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ padding: "10px", width: "250px", marginRight: "10px" }}
      />

      {/* Color Picker */}
      <input
        type="color"
        value={color}
        onChange={(e) => setColor(e.target.value)}
        style={{ width: "50px", height: "40px", cursor: "pointer" }}
      />

      {/* Generate Button */}
      <button onClick={generateQRCode} style={{ padding: "10px", marginLeft: "10px", cursor: "pointer" }}>
        Generate QR Code
      </button>

      {/* QR Code Display */}
      <div ref={qrRef} style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default QRGenerator;
