import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import PropTypes from "prop-types";
import { useLocale } from "../../../hooks/useLocale";

function NoteBody({ notesAll, notesArchive, setNotes }) {
  const { t } = useLocale();

  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex-1">
      {/* Form untuk menambah catatan baru */}
      <NoteInput setNotes={setNotes} />

      {/* Daftar catatan aktif */}
      <NoteList label={t("activeNotes")} notes={notesAll} setNotes={setNotes} />

      {/* Daftar catatan yang diarsip */}
      <NoteList
        label={t("archivedNotes")}
        notes={notesArchive}
        setNotes={setNotes}
      />
    </div>
  );
}

NoteBody.propTypes = {
  notesAll: PropTypes.array.isRequired,
  notesArchive: PropTypes.array.isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteBody;
