import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import {
  archiveNote,
  deleteNote,
  getNote,
  showFormattedDate,
  unarchiveNote,
} from "../utils/data";
import MainLayout from "../components/Layouts/MainLayout";
import { IoArrowBack } from "react-icons/io5";
import Button from "../components/Elements/Button";
import { BsFillTrashFill } from "react-icons/bs";
import { BiArchiveIn, BiArchiveOut } from "react-icons/bi";

function DetailNote() {
  const { id } = useParams(); // Mengambil parameter ID dari URL
  const [note, setNote] = useState(null); // State untuk menyimpan data catatan
  const navigate = useNavigate(); // Fungsi untuk navigasi

  useEffect(() => {
    // Mengambil data catatan saat komponen dimount
    const noteData = getNote(id);
    setNote(noteData);
  }, [id]);

  /**
   * Menangani penghapusan catatan
   */
  const handleDelete = () => {
    deleteNote(id);
    navigate("/"); // Redirect ke halaman utama setelah menghapus
  };

  /**
   * Menangani pengarsipan atau pembatalan arsip catatan
   */
  const handleArchive = () => {
    if (note.archived) {
      unarchiveNote(id);
    } else {
      archiveNote(id);
    }
    navigate("/"); // Redirect ke halaman utama setelah mengarsipkan/membatalkan arsip
  };

  // Jika catatan tidak ditemukan
  if (!note) {
    return (
      <MainLayout>
        <div className="note-not-found">
          <h2>Catatan Tidak Ditemukan</h2>
          <p>Catatan yang Anda cari tidak ada atau telah dihapus.</p>
          <Link to="/" className="note-detail__back">
            Kembali ke Beranda
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="note-detail">
        <Link to="/" className="note-detail__back">
          <IoArrowBack /> Kembali
        </Link>
        <h2>{note.title}</h2>
        <p className="note-item__date">{showFormattedDate(note.createdAt)}</p>
        <div className="note-detail__content">
          <p>{note.body}</p>
        </div>
        <div className="note-detail__actions">
          <Button variant="danger" onClick={handleDelete}>
            <BsFillTrashFill /> Hapus
          </Button>
          <Button variant="primary" onClick={handleArchive}>
            {note.archived ? <BiArchiveOut /> : <BiArchiveIn />}
            {note.archived ? "Batal Arsip" : "Arsipkan"}
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

export default DetailNote;
