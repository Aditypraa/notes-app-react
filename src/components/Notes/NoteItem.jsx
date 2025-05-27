import { showFormattedDate } from "../../utils/data";
import { BsFillTrashFill } from "react-icons/bs";
import { BiArchiveOut, BiArchiveIn } from "react-icons/bi";

function NoteItem({ id, title, body, createdAt, archived, action }) {
  // Fungsi untuk menghapus catatan
  const handleDelete = () => {
    action((notes) => notes.filter((note) => note.id !== id));
  };

  // Fungsi untuk mengarsip/unarsip catatan
  const handleArchive = () => {
    action((notes) =>
      notes.map((note) =>
        note.id === id ? { ...note, archived: !note.archived } : note
      )
    );
  };

  return (
    <div className="note-item">
      {/* Konten Catatan */}
      <div className="note-item__content">
        <h3 className="note-item__title">{title}</h3>
        <p className="note-item__date">{showFormattedDate(createdAt)}</p>
        <p className="note-item__body">{body}</p>
      </div>

      {/* Tombol Aksi */}
      <div className="note-item__action">
        <button onClick={handleDelete} aria-label="Hapus Catatan">
          <BsFillTrashFill />
        </button>
        <button onClick={handleArchive} aria-label="Arsip Catatan">
          {archived ? <BiArchiveOut /> : <BiArchiveIn />}
        </button>
      </div>
    </div>
  );
}

export default NoteItem;
