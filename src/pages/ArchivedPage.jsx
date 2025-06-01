import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { getArchivedNotes } from "../utils/apiUtils";
import MainLayout from "../components/Layouts/MainLayout";
import NoteList from "../components/Fragments/Notes/NoteList";
import { useLocale } from "../hooks/useLocale";

function ArchivedPage() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useLocale();
  const searchQuery = searchParams.get("keyword") || "";

  // Fetch archived notes from API
  useEffect(() => {
    const fetchArchivedNotes = async () => {
      setLoading(true);
      try {
        const result = await getArchivedNotes();

        if (!result.error) {
          setNotes(result.data);
        } else {
          setNotes([]);
        }
      } catch (error) {
        console.error("Failed to fetch archived notes:", error);
        setNotes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchArchivedNotes();
  }, []);

  // Handle search functionality
  const handleSearchChange = (query) => {
    if (query.trim()) {
      setSearchParams({ keyword: query });
    } else {
      setSearchParams({});
    }
  };

  // Filter notes based on search query
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
            <p className="text-gray-600 dark:text-gray-300">
              {t("loadingNotes")}
            </p>
          </div>
        </div>
      </MainLayout>
    );
  }

  const filteredNotes = getFilteredNotes();

  return (
    <MainLayout search={searchQuery} setQuery={handleSearchChange}>
      <NoteList
        label={t("archivedNotes")}
        notes={filteredNotes}
        setNotes={setNotes}
      />
    </MainLayout>
  );
}

export default ArchivedPage;
