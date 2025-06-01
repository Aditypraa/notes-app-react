import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const LocaleContext = createContext();

// Kamus terjemahan
const translations = {
  id: {
    // Header & Navigation
    appTitle: "📑 Aplikasi Catatan",
    searchPlaceholder: "Cari catatan...",
    logout: "Keluar",

    // Auth Pages
    loginTitle: "Masuk ke Akun",
    registerTitle: "Buat Akun Baru",
    loginSubtitle: "masuk dengan akun yang sudah ada",
    registerSubtitle: "Atau",
    name: "Nama lengkap",
    email: "Email address",
    password: "Password",
    confirmPassword: "Konfirmasi password",
    loginButton: "Masuk",
    registerButton: "Daftar",
    processing: "Memproses...",

    // Validation Messages
    nameRequired: "Nama tidak boleh kosong",
    nameMinLength: "Nama minimal 2 karakter",
    emailRequired: "Email tidak boleh kosong",
    emailInvalid: "Format email tidak valid",
    passwordRequired: "Password tidak boleh kosong",
    passwordMinLength: "Password minimal 6 karakter",
    confirmPasswordRequired: "Konfirmasi password tidak boleh kosong",
    passwordMismatch: "Password tidak cocok",

    // Notes
    newNote: "Catatan Baru",
    activeNotes: "Catatan Aktif",
    archivedNotes: "Catatan Terarsip",
    noteTitle: "Masukkan judul...",
    noteBody: "Tulis catatan Anda di sini...",
    createNote: "Buat Catatan",
    saving: "Menyimpan...",
    charactersLeft: "Sisa karakter:",
    titleRequired: "Judul tidak boleh kosong",
    titleMaxLength: "Judul maksimal 50 karakter",
    bodyRequired: "Isi catatan tidak boleh kosong",

    // Actions
    delete: "Hapus",
    archive: "Arsipkan",
    unarchive: "Batal Arsip",
    back: "Kembali",

    // Messages
    loading: "Memuat...",
    loadingNotes: "Memuat catatan...",
    noteNotFound: "Catatan Tidak Ditemukan",
    noteNotFoundDesc: "Catatan yang Anda cari tidak ada atau telah dihapus.",
    backToHome: "Kembali ke Beranda",
    emptyNotes: "Belum ada catatan",
    emptyNotesDesc: "Mulai dengan membuat catatan pertama Anda!",
    emptyArchive: "Arsip kosong",
    emptyArchiveDesc: "Belum ada catatan yang diarsipkan.",
  },
  en: {
    // Header & Navigation
    appTitle: "📑 Notes App",
    searchPlaceholder: "Search notes...",
    logout: "Logout",

    // Auth Pages
    loginTitle: "Sign In to Account",
    registerTitle: "Create New Account",
    loginSubtitle: "sign in with existing account",
    registerSubtitle: "Or",
    name: "Full name",
    email: "Email address",
    password: "Password",
    confirmPassword: "Confirm password",
    loginButton: "Sign In",
    registerButton: "Register",
    processing: "Processing...",

    // Validation Messages
    nameRequired: "Name is required",
    nameMinLength: "Name must be at least 2 characters",
    emailRequired: "Email is required",
    emailInvalid: "Invalid email format",
    passwordRequired: "Password is required",
    passwordMinLength: "Password must be at least 6 characters",
    confirmPasswordRequired: "Confirm password is required",
    passwordMismatch: "Passwords do not match",

    // Notes
    newNote: "New Note",
    activeNotes: "Active Notes",
    archivedNotes: "Archived Notes",
    noteTitle: "Enter title...",
    noteBody: "Write your note here...",
    createNote: "Create Note",
    saving: "Saving...",
    charactersLeft: "Characters left:",
    titleRequired: "Title is required",
    titleMaxLength: "Title must be maximum 50 characters",
    bodyRequired: "Note content is required",

    // Actions
    delete: "Delete",
    archive: "Archive",
    unarchive: "Unarchive",
    back: "Back",

    // Messages
    loading: "Loading...",
    loadingNotes: "Loading notes...",
    noteNotFound: "Note Not Found",
    noteNotFoundDesc:
      "The note you are looking for does not exist or has been deleted.",
    backToHome: "Back to Home",
    emptyNotes: "No notes yet",
    emptyNotesDesc: "Start by creating your first note!",
    emptyArchive: "Archive is empty",
    emptyArchiveDesc: "No archived notes yet.",
  },
};

function LocaleProvider({ children }) {
  const [locale, setLocale] = useState(() => {
    // Cek localStorage terlebih dahulu, jika tidak ada gunakan browser preference
    const savedLocale = localStorage.getItem("locale");
    if (savedLocale && translations[savedLocale]) {
      return savedLocale;
    }

    // Auto-detect browser language
    const browserLang = navigator.language.split("-")[0];
    return translations[browserLang] ? browserLang : "id";
  });

  useEffect(() => {
    // Simpan locale ke localStorage
    localStorage.setItem("locale", locale);

    // Update document language
    document.documentElement.lang = locale;
  }, [locale]);

  const toggleLocale = () => {
    setLocale((prevLocale) => (prevLocale === "id" ? "en" : "id"));
  };

  const t = (key) => {
    return translations[locale][key] || key;
  };

  const value = {
    locale,
    toggleLocale,
    t,
    isEnglish: locale === "en",
  };

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
}

LocaleProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { LocaleContext, LocaleProvider };
