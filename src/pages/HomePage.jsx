import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getActiveNotes, getArchivedNotes } from "../utils/apiUtils";
import MainLayout from "../components/Layouts/MainLayout";
import NoteBody from "../components/Fragments/Notes/NoteBody";

function HomePage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("keyword") || "";

  // Fetch notes from API
  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);
      try {
        const [activeResult, archivedResult] = await Promise.all([
          getActiveNotes(),
          getArchivedNotes(),
        ]);

        const allNotes = [];

        if (!activeResult.error) {
          allNotes.push(...activeResult.data);
        }

        if (!archivedResult.error) {
          allNotes.push(...archivedResult.data);
        }

        setNotes(allNotes);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
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

  if (loading) {
    return (
      <MainLayout search={searchQuery} setQuery={handleSearchChange}>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600">Memuat catatan...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

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
