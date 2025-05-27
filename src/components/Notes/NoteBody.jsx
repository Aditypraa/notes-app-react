import NoteInput from "./NoteInput";
import NoteList from "./NoteList";

function NoteBody({ notesAll, notesArchive, setNotes }) {
  return (
    <div className="note-app__body">
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

export default NoteBody;
