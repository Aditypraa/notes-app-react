import { Link } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";

function NotFoundPage() {
  return (
    <MainLayout>
      <div className="note-not-found">
        <h2>404 - Halaman Tidak Ditemukan</h2>
        <p>Halaman yang Anda cari tidak ada.</p>
        <Link to="/" className="note-detail__back">
          Kembali ke Beranda
        </Link>
      </div>
    </MainLayout>
  );
}

export default NotFoundPage;
