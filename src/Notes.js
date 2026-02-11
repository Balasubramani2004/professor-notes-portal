import { useEffect, useState } from "react";
import { db } from "./firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

function Notes() {
  const [notes, setNotes] = useState([]);
  const [selectedPDF, setSelectedPDF] = useState(null);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const q = query(collection(db, "notes"), orderBy("createdAt", "desc"));
        const snapshot = await getDocs(q);

        const list = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        console.log("Fetched notes:", list); // ⭐ debug
        setNotes(list);
      } catch (err) {
        console.error("Firestore fetch error:", err);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>Available Notes</h2>

      {notes.length === 0 && <p>No notes uploaded yet.</p>}

      {notes.map(note => (
        <div key={note.id} style={{ marginBottom: "10px" }}>
          <button onClick={() => setSelectedPDF(note.url)}>
            {note.name}
          </button>
        </div>
      ))}

      {selectedPDF && (
        <div style={{ marginTop: "20px" }}>
          <h3>Reading Online</h3>
          <iframe
            src={selectedPDF}
            width="100%"
            height="600px"
            title="PDF Viewer"
          />
        </div>
      )}
    </div>
  );
}

export default Notes;
