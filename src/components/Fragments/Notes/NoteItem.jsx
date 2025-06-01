import { BsFillTrashFill } from "react-icons/bs";
import { BiArchiveOut, BiArchiveIn } from "react-icons/bi";
import { Link } from "react-router";
import { showFormattedDate } from "../../../utils/dateUtils";
import {
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../../../utils/apiUtils";
import PropTypes from "prop-types";
import Button from "../../Elements/Button";
import { useLocale } from "../../../hooks/useLocale";

function NoteItem({ id, title, body, createdAt, archived, action, index = 0 }) {
  const { t } = useLocale();

  // Fungsi untuk menghapus catatan
  const handleDelete = async () => {
    try {
      const result = await deleteNote(id);
      if (!result.error) {
        // Update local state by removing the deleted note
        action((notes) => notes.filter((note) => note.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  // Fungsi untuk mengarsip/unarsip catatan
  const handleArchive = async () => {
    try {
      let result;
      if (archived) {
        result = await unarchiveNote(id);
      } else {
        result = await archiveNote(id);
      }

      if (!result.error) {
        // Update local state by toggling the archived status
        action((notes) =>
          notes.map((note) =>
            note.id === id ? { ...note, archived: !note.archived } : note
          )
        );
      }
    } catch (error) {
      console.error("Failed to archive/unarchive note:", error);
    }
  };

  // Dynamic animation delay based on index
  const animationClass =
    index % 2 === 0 ? "animate-slideIn-delay-1" : "animate-slideIn-delay-2";

  return (
    <div
      className={`relative flex flex-col bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-600 rounded-2xl shadow-md transition-all duration-300 overflow-hidden ${animationClass} hover:-translate-y-1 hover:shadow-lg hover:border-blue-100 dark:hover:border-blue-400 before:content-[''] before:absolute before:top-0 before:left-0 before:right-0 before:h-1 before:bg-gradient-to-r before:from-blue-500 before:to-blue-600 focus-within:outline-2 focus-within:outline-blue-500`}
    >
      {/* Konten Catatan */}
      <div className="flex-1 p-6">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3 leading-tight line-clamp-2">
          <Link
            to={`/notes/${id}`}
            className="text-inherit no-underline transition-colors hover:text-blue-500 dark:hover:text-blue-400 focus:outline-none focus:text-blue-500 dark:focus:text-blue-400 focus:underline"
          >
            {title}
          </Link>
        </h3>
        <p className="text-xs font-medium mb-4 text-slate-400 dark:text-slate-500 uppercase tracking-wide">
          {showFormattedDate(createdAt)}
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-4">
          {body}
        </p>
      </div>

      {/* Tombol Aksi */}
      <div className="flex gap-2 mt-5 justify-end px-6 pb-6">
        <Button
          onClick={handleDelete}
          aria-label={t("delete")}
          className="bg-white dark:bg-slate-700 border-2 border-red-500 dark:border-red-400 text-red-500 dark:text-red-400 rounded-md p-2 w-10 h-10 flex items-center justify-center transition-all hover:bg-red-500 dark:hover:bg-red-400 hover:text-white hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
        >
          <BsFillTrashFill />
        </Button>
        <Button
          onClick={handleArchive}
          aria-label={archived ? t("unarchive") : t("archive")}
          className="bg-white dark:bg-slate-700 border-2 border-amber-400 dark:border-amber-500 text-amber-400 dark:text-amber-500 rounded-md p-2 w-10 h-10 flex items-center justify-center transition-all hover:bg-amber-400 dark:hover:bg-amber-500 hover:text-white hover:scale-105 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-700"
        >
          {archived ? <BiArchiveOut /> : <BiArchiveIn />}
        </Button>
      </div>
    </div>
  );
}

NoteItem.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  archived: PropTypes.bool.isRequired,
  action: PropTypes.func.isRequired,
  index: PropTypes.number,
};

export default NoteItem;
