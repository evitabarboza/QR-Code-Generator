import React, { useState, useRef } from "react";
import QRCodeStyling from "qr-code-styling";

const QRGenerator = () => {
  const [link, setLink] = useState("");
  const [color1, setColor1] = useState("#000000");
  const [color2, setColor2] = useState("#ff0000");
  const [style, setStyle] = useState("dots");
  const [logo, setLogo] = useState(null);
  const [format, setFormat] = useState("png");
  const qrRef = useRef(null);

  const qrCode = new QRCodeStyling({
    width: 300,
    height: 300,
    dotsOptions: {
      gradient: {
        type: "linear",
        colorStops: [
          { offset: 0, color: color1 },
          { offset: 1, color: color2 },
        ],
      },
      type: style,
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
      imageSize: 0.3,
      hideBackgroundDots: true,
      imagePadding: 10,
    },
  });

  const generateQRCode = () => {
    if (!link.trim()) {
      alert("Please enter a valid link.");
      return;
    }

    qrCode.update({
      data: link,
      dotsOptions: {
        gradient: {
          type: "linear",
          colorStops: [
            { offset: 0, color: color1 },
            { offset: 1, color: color2 },
          ],
        },
        type: style,
      },
      image: logo,
    });

    qrRef.current.innerHTML = "";
    qrCode.append(qrRef.current);
  };

  const downloadQRCode = () => {
    qrCode.download({ extension: format });
  };

  const handleLogoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => createRoundedLogo(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const createRoundedLogo = (imageSrc) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      const size = 100;
      canvas.width = size;
      canvas.height = size;
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, size, size);
      setLogo(canvas.toDataURL());
    };
    img.src = imageSrc;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Custom QR Code Generator</h2>

      <input
        type="text"
        placeholder="Enter URL"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ padding: "10px", width: "250px", marginBottom: "10px" }}
      />

      <br />

      <label>Color 1: </label>
      <input type="color" value={color1} onChange={(e) => setColor1(e.target.value)} />
      <label> Color 2: </label>
      <input type="color" value={color2} onChange={(e) => setColor2(e.target.value)} />

      <br />

      <label>Style: </label>
      <select value={style} onChange={(e) => setStyle(e.target.value)}>
        <option value="dots">Dots</option>
        <option value="rounded">Rounded</option>
        <option value="classy">Classy</option>
        <option value="classy-rounded">Classy Rounded</option>
        <option value="square">Square</option>
        <option value="extra-rounded">Extra Rounded</option>
      </select>

      <br />

      <label>Upload Logo (Round Shape): </label>
      <input type="file" accept="image/*" onChange={handleLogoUpload} />

      <br />

      <label>Download Format: </label>
      <select value={format} onChange={(e) => setFormat(e.target.value)}>
        <option value="png">PNG</option>
        <option value="svg">SVG</option>
        <option value="jpeg">JPEG</option>
      </select>

      <br />

      <button onClick={generateQRCode} style={{ margin: "10px", padding: "10px" }}>
        Generate QR Code
      </button>
      <button onClick={downloadQRCode} style={{ margin: "10px", padding: "10px" }}>
        Download {format.toUpperCase()}
      </button>

      <div ref={qrRef} style={{ marginTop: "20px" }}></div>
    </div>
  );
};

export default QRGenerator;
