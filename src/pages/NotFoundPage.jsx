import { Link } from "react-router";
import MainLayout from "../components/Layouts/MainLayout";
import { useLocale } from "../hooks/useLocale";

function NotFoundPage() {
  const { t } = useLocale();

  return (
    <MainLayout>
      <div className="flex items-center justify-center min-h-[calc(100vh-200px)]">
        <div className="text-center py-16 px-5 bg-white dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-600 max-w-xl mx-auto">
          <h2 className="text-2xl text-slate-800 dark:text-slate-200 mb-4">
            {t("noteNotFound")}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6 text-base">
            {t("noteNotFoundDesc")}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-blue-500 dark:text-blue-400 no-underline font-medium py-2 px-4 rounded-lg transition-all duration-300 border-2 border-transparent hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-500 dark:hover:border-blue-400 hover:-translate-x-1"
          >
            {t("backToHome")}
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}

export default NotFoundPage;
