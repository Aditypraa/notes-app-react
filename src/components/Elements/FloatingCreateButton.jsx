import { Link, useLocation } from "react-router";
import { BiPlus } from "react-icons/bi";
import { useLocale } from "../../hooks/useLocale";

function FloatingCreateButton() {
  const { t } = useLocale();
  const location = useLocation();

  // Jangan tampilkan floating button di halaman create note dan login/register
  if (
    location.pathname === "/create" ||
    location.pathname === "/login" ||
    location.pathname === "/register"
  ) {
    return null;
  }

  return (
    <Link
      to="/create"
      className="fixed bottom-6 right-6 z-50 group"
      aria-label={t("createNote")}
    >
      <div className="relative">
        {/* Floating Button */}
        <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 dark:from-blue-600 dark:to-blue-700 dark:hover:from-blue-700 dark:hover:to-blue-800 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group-hover:scale-110 active:scale-95 cursor-pointer">
          <BiPlus className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>

        {/* Tooltip */}
        <div className="absolute bottom-full right-0 mb-3 px-3 py-2 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          {t("createNote")}
          <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
        </div>

        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full bg-blue-400 opacity-0 scale-75 group-hover:scale-150 group-hover:opacity-20 transition-all duration-700 pointer-events-none"></div>

        {/* Pulse Animation */}
        <div className="absolute inset-0 rounded-full bg-blue-500 opacity-75 animate-ping"></div>
      </div>
    </Link>
  );
}

export default FloatingCreateButton;
