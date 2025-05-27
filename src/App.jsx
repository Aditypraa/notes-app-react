import { useState } from "react";
import { getInitialData } from "./utils/data";
import Header from "./components/Header/Header";
import NoteBody from "./components/Notes/NoteBody";
import Footer from "./components/Footer/Footer";

function App() {
  // State untuk kata kunci pencarian
  const [searchQuery, setSearchQuery] = useState("");
  // State untuk menyimpan semua catatan
  const [notes, setNotes] = useState(getInitialData());

  // Filter catatan berdasarkan kata kunci pencarian
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pisahkan catatan aktif dan yang diarsip
  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  return (
    <div className="note-app">
      <Header search={searchQuery} setQuery={setSearchQuery} />
      <NoteBody
        notesAll={activeNotes}
        notesArchive={archivedNotes}
        setNotes={setNotes}
      />
      <Footer />
    </div>
  );
}

export default App;
