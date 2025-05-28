import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getActiveNotes, getArchivedNotes } from "../utils/data";
import MainLayout from "../components/Layouts/MainLayout";
import NoteBody from "../components/Fragments/Notes/NoteBody";

function HomePage() {
  // State untuk menyimpan semua catatan
  const [notes, setNotes] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  // State untuk kata kunci pencarian
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("keyword") || ""
  );

  useEffect(() => {
    // Memuat data catatan awal saat komponen dimount
    setNotes([...getActiveNotes(), ...getArchivedNotes()]);
  }, []);

  useEffect(() => {
    // Memperbarui URL ketika query pencarian berubah
    if (searchQuery.trim()) {
      setSearchParams({ keyword: searchQuery });
    } else {
      setSearchParams({});
    }
  }, [searchQuery, setSearchParams]);

  // Filter catatan berdasarkan kata kunci pencarian
  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pisahkan catatan aktif dan yang diarsip
  const activeNotes = filteredNotes.filter((note) => !note.archived);
  const archivedNotes = filteredNotes.filter((note) => note.archived);

  return (
    <MainLayout search={searchQuery} setQuery={setSearchQuery}>
      <NoteBody
        notesAll={activeNotes}
        notesArchive={archivedNotes}
        setNotes={setNotes}
      />
    </MainLayout>
  );
}

export default HomePage;
