import { useState } from "react";
import { SlNote } from "react-icons/sl";
import Input from "../../Elements/Input";
import PropTypes from "prop-types";
import Button from "../../Elements/Button";

const MAX_TITLE_LENGTH = 50;

function NoteInput({ setNotes }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});

  // Simplified validation
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Judul tidak boleh kosong";
    } else if (title.length > MAX_TITLE_LENGTH) {
      newErrors.title = `Judul maksimal ${MAX_TITLE_LENGTH} karakter`;
    }

    if (!body.trim()) {
      newErrors.body = "Isi catatan tidak boleh kosong";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    const newNote = {
      id: `notes-${Date.now()}`,
      title: title.trim(),
      body: body.trim(),
      archived: false,
      createdAt: new Date().toISOString(),
    };

    setNotes((prevNotes) => [newNote, ...prevNotes]);

    // Reset form
    setTitle("");
    setBody("");
    setErrors({});
  };

  // Simplified error clearing
  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const remainingChars = MAX_TITLE_LENGTH - title.length;

  return (
    <div className="mx-auto max-w-[700px] mb-12 bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
      <h2 className="font-semibold text-xl text-slate-900 mb-6">
        Catatan Baru
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-right text-slate-400 mb-2">
              Sisa karakter: {remainingChars}
            </p>
            <Input
              value={title}
              onChange={(value) => {
                setTitle(value);
                clearError("title");
              }}
              id="title"
              name="title"
              type="text"
              placeholder="Masukkan judul..."
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>

          <div>
            <Input
              value={body}
              onChange={(value) => {
                setBody(value);
                clearError("body");
              }}
              id="body"
              name="body"
              type="textarea"
              placeholder="Tulis catatan Anda di sini..."
            />
            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body}</p>
            )}
          </div>
        </div>

        <Button
          type="submit"
          className="block w-full px-6 py-4 bg-gradient-to-tr from-blue-500 to-blue-600 font-sans text-white font-semibold text-lg rounded-xl mt-6 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 button-shine"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Buat Catatan <SlNote />
          </span>
        </Button>
      </form>
    </div>
  );
}

NoteInput.propTypes = {
  setNotes: PropTypes.func.isRequired,
};

export default NoteInput;
