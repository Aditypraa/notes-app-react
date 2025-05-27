# 📑 Aplikasi Catatan Pribadi

**Aplikasi web React modern untuk mengelola catatan pribadi dengan fitur pencarian dan arsip**

[![React](https://img.shields.io/badge/React-18.3.1-61dafb?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-6.0.5-646cff?style=for-the-badge&logo=vite)](https://vitejs.dev/)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6+-f7df1e?style=for-the-badge&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)

## ✨ Fitur Utama

### 🎯 Kriteria Utama

- **📋 Menampilkan Daftar Catatan** - Tampilkan semua catatan dengan data awal
- **➕ Menambah Catatan Baru** - Form input dengan controlled components
- **🗑️ Menghapus Catatan** - Hapus catatan dengan konfirmasi visual

### 🚀 Fitur Premium

- **🔍 Pencarian Real-time** - Cari catatan berdasarkan judul
- **📏 Limit Karakter** - Pembatasan 50 karakter untuk judul dengan counter
- **📦 Sistem Arsip** - Arsipkan dan restore catatan dengan mudah

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/username/notes-app-react.git

# Masuk ke directory
cd notes-app-react

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka <http://localhost:5173> di browser Anda.

## 📁 Struktur Project

```text
notes-app-react/
├── public/                  # 🌐 Static assets
├── src/
│   ├── components/          # 🧩 React Components
│   │   ├── Header/          # 📋 Header with search
│   │   ├── Input/           # ⌨️ Input components
│   │   └── Notes/           # 📝 Note-related components
│   │       ├── NoteBody.jsx # Note content wrapper
│   │       ├── NoteInput.jsx# Create new note form
│   │       ├── NoteItem.jsx # Individual note card
│   │       └── NoteList.jsx # Notes grid layout
│   ├── styles/              # 🎨 CSS Styles
│   ├── utils/               # 🛠️ Utility functions
│   ├── App.jsx              # 🏠 Main app component
│   └── main.jsx             # 🚀 App entry point
├── package.json             # 📦 Dependencies
└── README.md                # 📖 Documentation
```

## 🎯 Fitur Detail

### 📝 Membuat Catatan

1. **Judul** dengan limit 50 karakter dan real-time counter
2. **Konten** unlimited di textarea
3. **Auto-clear form** setelah submit berhasil
4. **Timestamp otomatis** menggunakan `+new Date()`

### 🔍 Pencarian

- **Real-time filtering** berdasarkan judul catatan
- **Case-insensitive search** untuk kemudahan penggunaan
- **Instant results** tanpa perlu reload

### 📦 Sistem Arsip

- **Toggle archive/unarchive** dengan satu klik
- **Separated views** untuk catatan aktif dan arsip
- **Visual indicators** dengan icons yang berbeda

## 🎨 Tech Stack

| Kategori       | Teknologi   | Versi  | Alasan Pemilihan                  |
| -------------- | ----------- | ------ | --------------------------------- |
| **Frontend**   | React       | 18.3.1 | Modern UI library dengan hooks    |
| **Build Tool** | Vite        | 6.0.5  | Fast build dan HMR                |
| **Icons**      | React Icons | 5.4.0  | Consistent icon library           |
| **Styling**    | CSS3        | -      | Custom CSS dengan modern features |
| **Linting**    | ESLint      | 9.17.0 | Code quality enforcement          |

## 🔧 Development

### Available Scripts

| Command           | Fungsi                      |
| ----------------- | --------------------------- |
| `npm run dev`     | 🚀 Start development server |
| `npm run build`   | 📦 Build for production     |
| `npm run preview` | 👀 Preview production build |
| `npm run lint`    | 🔍 Check code quality       |

### State Management

```javascript
const [searchQuery, setSearchQuery] = useState(""); // Kata kunci pencarian
const [notes, setNotes] = useState(getInitialData()); // Array semua catatan

// Filter catatan berdasarkan search query
const filteredNotes = notes.filter((note) =>
  note.title.toLowerCase().includes(searchQuery.toLowerCase())
);

// Pisahkan catatan aktif dan arsip
const activeNotes = filteredNotes.filter((note) => !note.archived);
const archivedNotes = filteredNotes.filter((note) => note.archived);
```

## 📖 Usage Guide

### Membuat Catatan Baru

1. Ketik judul catatan (max 50 karakter)
2. Tulis konten di textarea
3. Klik tombol "Buat Catatan 📝"
4. Form akan otomatis ter-reset

### Mengarsip Catatan

1. Klik icon arsip (📦) pada catatan
2. Catatan akan pindah ke section "Catatan Arsip"
3. Untuk unarchive, klik icon restore (📤)

### Mencari Catatan

1. Gunakan search box di header
2. Ketik judul catatan yang dicari
3. Results akan muncul real-time

## 🎨 UI/UX Features

### Design System

- **Modern glassmorphism** dengan backdrop blur
- **Consistent color scheme** dengan CSS variables
- **Responsive grid layout** yang adaptive
- **Clean typography** dengan Inter font
- **Interactive animations** pada hover states

### User Experience

- **Instant feedback** untuk semua actions
- **Loading states** yang smooth
- **Error handling** yang user-friendly
- **Mobile-first responsive** design

## ✅ Best Practices

### Code Quality

- **Controlled Components** untuk form inputs
- **Proper key props** untuk list rendering
- **ES6+ syntax** (destructuring, arrow functions, etc.)
- **Descriptive naming** untuk variables dan functions
- **Component separation** yang logical

### Performance

- **Efficient filtering** dengan array methods
- **Minimal re-renders** dengan proper state management
- **Lightweight components** tanpa over-engineering

### Accessibility

- **Semantic HTML** structure
- **Color contrast** yang baik
- **Keyboard navigation** support

## 🤝 Contributing

Kontribusi selalu welcome! Silakan:

1. **Fork** the Project
2. **Create** your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your Changes (`git commit -m 'Add some AmazingFeature'`)
4. **Push** to the Branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👨‍💻 Author

**Aditya Pratama**

- GitHub: [@aditypraa](https://github.com/aditypraa)
- Email: aditypraa@gmail.com

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Dicoding Academy](https://dicoding.com/)

---

⭐ Jangan lupa kasih star jika project ini membantu kamu!
