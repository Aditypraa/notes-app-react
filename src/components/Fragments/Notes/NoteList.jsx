import NoteItem from "./NoteItem";
import PropTypes from "prop-types";
import { Link } from "react-router";
import { useLocale } from "../../../hooks/useLocale";

function NoteList({ notes, label, setNotes }) {
  const { t } = useLocale();

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Section */}
      <div className="text-center mb-8 lg:mb-12">
        <h2 className="relative inline-block font-bold text-slate-900 dark:text-slate-100 text-2xl md:text-3xl lg:text-4xl">
          {label}
          <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 rounded-full shadow-sm"></div>
        </h2>
      </div>

      {/* Content Container */}
      <div className="pb-12">
        {notes.length > 0 ? (
          /* Notes Grid */
          <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {notes.map((note, index) => (
              <div
                key={note.id}
                className="transform transition-all duration-200 hover:scale-[1.02] hover:z-10"
              >
                <NoteItem
                  id={note.id}
                  title={note.title}
                  body={note.body}
                  createdAt={note.createdAt}
                  archived={note.archived}
                  action={setNotes}
                  index={index}
                />
              </div>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-full max-w-lg">
              <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800 dark:to-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-lg">
                {/* Decorative background pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-8 h-8 bg-blue-400 rounded-full"></div>
                  <div className="absolute top-12 right-8 w-4 h-4 bg-purple-400 rounded-full"></div>
                  <div className="absolute bottom-8 left-12 w-6 h-6 bg-pink-400 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-10 h-10 bg-indigo-400 rounded-full"></div>
                </div>

                <div className="relative p-8 sm:p-12 text-center">
                  {/* Icon */}
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900 dark:to-blue-800 rounded-2xl shadow-inner">
                      <svg
                        className="w-8 h-8 text-blue-600 dark:text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
                    {label.includes(t("archivedNotes"))
                      ? t("emptyArchive")
                      : t("emptyNotes")}
                  </h3>

                  {/* Description and Action */}
                  {!label.includes(t("archivedNotes")) && (
                    <div className="space-y-6">
                      <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed">
                        {t("emptyNotesDesc")}
                      </p>
                      <Link
                        to="/create"
                        className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-offset-2 dark:focus:ring-offset-slate-800"
                      >
                        {/* Plus icon */}
                        <svg
                          className="w-5 h-5 transition-transform group-hover:rotate-90"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                        {t("createNote")}
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteList;
