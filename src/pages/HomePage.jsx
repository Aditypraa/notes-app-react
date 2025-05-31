import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getActiveNotes, getArchivedNotes } from "../utils/data";
import MainLayout from "../components/Layouts/MainLayout";
import NoteBody from "../components/Fragments/Notes/NoteBody";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("keyword") || "";

  // Simplified data fetching
  useEffect(() => {
    const activeNotes = getActiveNotes();
    const archivedNotes = getArchivedNotes();
    setNotes([...activeNotes, ...archivedNotes]);
  }, []);

  // Simplified search handling
  const handleSearchChange = (query) => {
    if (query.trim()) {
      setSearchParams({ keyword: query });
    } else {
      setSearchParams({});
    }
  };

  // Extract filtering logic to separate function
  const getFilteredNotes = () => {
    if (!searchQuery) return notes;

    return notes.filter((note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  const filteredNotes = getFilteredNotes();
  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  return (
    <MainLayout search={searchQuery} setQuery={handleSearchChange}>
      <NoteBody
        notesAll={activeNotes}
        notesArchive={archivedNotes}
        setNotes={setNotes}
      />
    </MainLayout>
  );
}

export default HomePage;
