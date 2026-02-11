import { useState } from "react";
import Login from "./Login";
import Upload from "./Upload";
import Notes from "./Notes";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  if (!loggedIn) return <Login setLoggedIn={setLoggedIn} />;

  return (
    <>
      <Upload />
      <Notes />
    </>
  );
}

export default App;
