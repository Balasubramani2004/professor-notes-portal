import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";


const Notes = () => {
const [notes, setNotes] = useState([]);
const [selectedNote, setSelectedNote] = useState(null);


useEffect(() => {
const fetchNotes = async () => {
const querySnapshot = await getDocs(collection(db, "notes"));
const notesData = querySnapshot.docs.map((doc) => ({
id: doc.id,
...doc.data(),
}));


setNotes(notesData);
};


fetchNotes();
}, []);


return (
<div style={{ padding: 20 }}>
<h2>Available Notes</h2>


{notes.map((note) => (
<div key={note.id} style={{ marginBottom: 10 }}>
<button onClick={() => setSelectedNote(note.url)}>
{note.name}
</button>
</div>
))}


<h3 style={{ marginTop: 30 }}>Reading Online</h3>


{selectedNote && (
<iframe
src={selectedNote}
width="100%"
height="600px"
title="PDF Viewer"
style={{ border: "1px solid #ccc" }}
/>
)}
</div>
);
};


export default Notes;