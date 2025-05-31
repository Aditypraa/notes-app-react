import NoteInput from "./NoteInput";
import NoteList from "./NoteList";
import PropTypes from "prop-types";

function NoteBody({ notesAll, notesArchive, setNotes }) {
  return (
    <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex-1">
      {/* Form untuk menambah catatan baru */}
      <NoteInput setNotes={setNotes} />

      {/* Daftar catatan aktif */}
      <NoteList label="Semua Catatan" notes={notesAll} setNotes={setNotes} />

      {/* Daftar catatan yang diarsip */}
      <NoteList
        label="Catatan Arsip"
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
