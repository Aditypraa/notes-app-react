import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";
import { IoArrowBack } from "react-icons/io5";
import Button from "../components/Elements/Button";
import { BsFillTrashFill } from "react-icons/bs";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/apiUtils";
import { showFormattedDate } from "../utils/dateUtils";
import { useLocale } from "../hooks/useLocale";

function DetailNote() {
  const { id } = useParams(); // Mengambil parameter ID dari URL
  const [note, setNote] = useState(null); // State untuk menyimpan data catatan
  const [loading, setLoading] = useState(true); // State untuk loading
  const [error, setError] = useState(null); // State untuk error
  const { t } = useLocale();
  const navigate = useNavigate(); // Fungsi untuk navigasi

  useEffect(() => {
    // Mengambil data catatan saat komponen dimount
    const fetchNote = async () => {
      setLoading(true);
      setError(null);

      try {
        const result = await getNote(id);
        if (!result.error) {
          setNote(result.data);
        } else {
          setError(t("noteNotFound"));
        }
      } catch (error) {
        console.error("Failed to fetch note:", error);
        setError(t("noteNotFound"));
      } finally {
        setLoading(false);
      }
    };
    fetchNote();
  }, [id, t]);

  /**
   * Menangani penghapusan catatan
   */
  const handleDelete = async () => {
    try {
      const result = await deleteNote(id);
      if (!result.error) {
        navigate("/"); // Redirect ke halaman utama setelah menghapus
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  /**
   * Menangani pengarsipan atau pembatalan arsip catatan
   */
  const handleArchive = async () => {
    try {
      let result;
      if (note.archived) {
        result = await unarchiveNote(id);
      } else {
        result = await archiveNote(id);
      }

      if (!result.error) {
        navigate("/"); // Redirect ke halaman utama setelah mengarsipkan/membatalkan arsip
      }
    } catch (error) {
      console.error("Failed to archive/unarchive note:", error);
    }
  };

  // Loading state
  if (loading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            <p className="text-gray-600 dark:text-gray-300">{t("loading")}</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  // Error state atau catatan tidak ditemukan
  if (error || !note) {
    return (
      <MainLayout>
        <div className="text-center py-16 px-5 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600 max-w-xl mx-auto">
          <h2 className="text-2xl text-slate-800 dark:text-slate-200 mb-4">
            {error || t("noteNotFound")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-base">
            {t("noteNotFoundDesc")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-400 no-underline font-medium py-2 px-4 rounded-lg transition-all duration-300 border-2 border-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-x-1"
          >
            {t("backToHome")}
          </Link>
        </div>
      </MainLayout>
    );
  }
  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-lg border border-slate-200 dark:border-slate-600">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-400 no-underline font-medium mb-6 py-2 px-4 rounded-lg transition-all duration-300 border-2 border-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-x-1"
        >
          <IoArrowBack /> {t("back")}
        </Link>
        <h2 className="text-4xl font-bold text-slate-800 dark:text-slate-200 mb-4 leading-tight">
          {note.title}
        </h2>
        <p className="text-sm font-medium mb-8 text-slate-400 dark:text-slate-500 uppercase tracking-wider pb-4 border-b-2 border-slate-200 dark:border-slate-600">
          {showFormattedDate(note.createdAt)}
        </p>
        <div className="my-8">
          <p className="text-base leading-relaxed text-slate-600 dark:text-slate-300 whitespace-pre-wrap">
            {note.body}
          </p>
        </div>
        <div className="flex gap-4 justify-end mt-10 pt-6 border-t-2 border-slate-200 dark:border-slate-600">
          <Button variant="danger" onClick={handleDelete}>
            <BsFillTrashFill /> {t("delete")}
          </Button>
          <Button variant="primary" onClick={handleArchive}>
            {note.archived ? <BiArchiveOut /> : <BiArchiveIn />}
            {note.archived ? t("unarchive") : t("archive")}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

export default DetailNote;
