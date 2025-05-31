import { Link } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";

function NotFoundPage() {
  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center py-16 px-5 bg-white rounded-2xl border-2 border-dashed border-slate-200 max-w-xl mx-auto">
          <h2 className="text-2xl text-slate-800 mb-4">
            404 - Halaman Tidak Ditemukan
          </h2>
          <p className="text-slate-600 mb-6 text-base">
            Halaman yang Anda cari tidak ada.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-500 no-underline font-medium py-2 px-4 rounded-lg transition-all duration-300 border-2 border-transparent hover:bg-blue-50 hover:border-blue-500 hover:-translate-x-1"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default NotFoundPage;
