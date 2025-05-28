import { useState } from "react";
import { SlNote } from "react-icons/sl";
import Input from "../../Elements/Input";
import PropTypes from "prop-types";

function NoteInput({ setNotes }) {
  // State untuk input form
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Fungsi untuk menambah catatan baru
  const handleSubmit = (event) => {
    event.preventDefault();

    // Buat ID unik dan timestamp
    const uniqueId = +new Date();
    const currentTime = new Date().toISOString();

    // Tambah catatan baru ke daftar
    setNotes((prevNotes) => [
      ...prevNotes,
      {
        id: uniqueId,
        title: title,
        body: body,
        archived: false,
        createdAt: currentTime,
      },
    ]);

    // Bersihkan form setelah submit
    setTitle("");
    setBody("");
  };

  return (
    <div className="note-input">
      <h2>Catatan Baru</h2>
      <form onSubmit={handleSubmit}>
        <p className="note-input__title__char-limit">
          Sisa karakter: {50 - title.length}
        </p>
        <Input
          value={title}
          onChange={setTitle}
          id="title"
          name="title"
          type="text"
          placeholder="Masukkan judul..."
          required
        />
        <Input
          value={body}
          onChange={setBody}
          id="body"
          name="body"
          type="textarea"
          placeholder="Tulis catatan Anda di sini..."
          required
        />
        <button type="submit">
          Buat Catatan <SlNote />
        </button>
      </form>
    </div>
  );
}

NoteInput.propTypes = {
  setNotes: PropTypes.func.isRequired,
};

export default NoteInput;
