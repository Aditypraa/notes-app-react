import { useNavigate } from "react-router";
import { SlNote } from "react-icons/sl";
import MainLayout from "../components/Layouts/MainLayout";
import NoteInput from "../components/Fragments/Notes/NoteInput";
import { useLocale } from "../hooks/useLocale";

function CreateNotePage() {
  const { t } = useLocale();
  const navigate = useNavigate();

  // Handler ketika note berhasil dibuat
  const handleNoteCreated = () => {
    // Redirect ke halaman utama setelah note berhasil dibuat
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="max-w-[1200px] mx-auto p-6 md:p-8 flex-1">
        {/* Header halaman */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full mb-4">
            <SlNote className="w-8 h-8 text-blue-500 dark:text-blue-400" />
          </div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            {t("createNewNote")}
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            {t("createNoteDescription")}
          </p>
        </div>

        {/* Form untuk membuat catatan baru */}
        <NoteInput
          onSuccess={handleNoteCreated}
          showTitle={false} // Tidak perlu menampilkan title di form karena sudah ada di header
        />
      </div>
    </MainLayout>
  );
}

export default CreateNotePage;
