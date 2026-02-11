import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setMsg("Please select a file ❗");
      return;
    }

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "website");

    try {
      // ✅ correct endpoint for PDF/docs
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dmisidhsr/raw/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();
      console.log("Cloudinary result:", result);

      if (!result.secure_url) {
        throw new Error("Cloudinary upload failed");
      }

      // ✅ save to Firestore
      await addDoc(collection(db, "notes"), {
        name: file.name,
        url: result.secure_url,
        createdAt: new Date(),
      });

      setMsg("Upload successful ✅");
      setFile(null);
    } catch (err) {
      console.error("Upload error:", err);
      setMsg("Upload failed ❌ Check console");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "60px" }}>
      <h2>Upload Notes</h2>

      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <br /><br />

      <button onClick={handleUpload}>Upload</button>

      <p>{msg}</p>
    </div>
  );
}

export default Upload;
