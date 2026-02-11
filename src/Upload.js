import { useState } from "react";
import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

function Upload() {
  const [file, setFile] = useState(null);
  const [msg, setMsg] = useState("");

  const handleUpload = async () => {
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "website");   // your preset name

  try {
    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dmisidhsr/raw/upload",  // <-- IMPORTANT raw
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await res.json();

    // Save to Firestore
    await addDoc(collection(db, "notes"), {
      name: file.name,
      url: data.secure_url,
      createdAt: new Date(),
    });

    alert("Upload successful ✅");
    setFile(null);
  } catch (err) {
    console.error(err);
    alert("Upload failed ❌");
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
