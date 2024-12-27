import { useEffect, useState } from "react";
import { getInitialData } from "./utils";
import Header from "./components/Header/Header";
import NoteBody from "./components/Notes/NoteBody";
import Footer from "./components/Footer/Footer";

function App() {
  const [query, setQuery] = useState("");
  const [searchNotes, setSearchNotes] = useState([]);
  const [notes, setNotes] = useState(getInitialData());

  const notesAll = (searchNotes || notes).filter((note) => !note.archived);
  const notesArchive = (searchNotes || notes).filter((note) => note.archived);

  useEffect(() => {
    setSearchNotes(
      notes.filter((note) =>
        note.title.toLowerCase().includes(query.toLowerCase())
      )
    );
  }, [query, notes]);

  return (
    <div className="note-app">
      <Header search={query} setQuery={setQuery} />
      <NoteBody
        notesAll={notesAll}
        notesArchive={notesArchive}
        setNotes={setNotes}
      />
      <Footer />
    </div>
  );
}

export default App;
