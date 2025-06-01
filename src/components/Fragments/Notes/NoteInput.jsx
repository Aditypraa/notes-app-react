import { useState } from "react";
import { SlNote } from "react-icons/sl";
import Input from "../../Elements/Input";
import PropTypes from "prop-types";
import Button from "../../Elements/Button";
import { addNote } from "../../../utils/apiUtils";
import { useLocale } from "../../../hooks/useLocale";

const MAX_TITLE_LENGTH = 50;

function NoteInput({ setNotes }) {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { t } = useLocale();
  // Simplified validation
  const validateForm = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = t("titleRequired");
    } else if (title.length > MAX_TITLE_LENGTH) {
      newErrors.title = t("titleMaxLength");
    }

    if (!body.trim()) {
      newErrors.body = t("bodyRequired");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const result = await addNote({
        title: title.trim(),
        body: body.trim(),
      });

      if (!result.error) {
        setNotes((prevNotes) => [result.data, ...prevNotes]);
        // Reset form
        setTitle("");
        setBody("");
        setErrors({});
      }
    } catch (error) {
      console.error("Failed to add note:", error);
      setErrors({ submit: "Gagal menambahkan catatan. Coba lagi." });
    } finally {
      setLoading(false);
    }
  };

  // Simplified error clearing
  const clearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const remainingChars = MAX_TITLE_LENGTH - title.length;

  return (
    <div className="mx-auto max-w-[700px] mb-12 bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-600">
      <h2 className="font-semibold text-xl text-slate-900 dark:text-slate-100 mb-6">
        {t("newNote")}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <p className="text-xs text-right text-slate-400 dark:text-slate-500 mb-2">
              {t("charactersLeft")} {remainingChars}
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
              placeholder={t("noteTitle")}
              disabled={loading}
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
              placeholder={t("noteBody")}
              disabled={loading}
            />
            {errors.body && (
              <p className="text-red-500 text-sm mt-1">{errors.body}</p>
            )}
          </div>
        </div>{" "}
        {errors.submit && (
          <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mt-4">
            <p className="text-sm text-red-800 dark:text-red-200">
              {errors.submit}
            </p>
          </div>
        )}{" "}
        <Button
          type="submit"
          disabled={loading}
          className="block w-full px-6 py-4 bg-gradient-to-tr from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 font-sans text-white font-semibold text-lg rounded-xl mt-6 relative overflow-hidden transition-all hover:-translate-y-0.5 hover:shadow-lg active:translate-y-0 button-shine disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? t("saving") : t("createNote")} <SlNote />
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
