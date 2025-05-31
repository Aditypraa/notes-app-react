import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteList({ notes, label, setNotes }) {
  return (
    <>
      <h2 className="font-semibold mt-6 mb-4 text-slate-900 text-lg md:text-xl pl-4 relative before:content-[''] before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:w-1 before:h-5 before:bg-gradient-to-br before:from-blue-500 before:to-blue-600 before:rounded before:mr-2">
        {label}
      </h2>
      <div className="grid grid-cols-1 gap-6 mb-12 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {notes.length ? (
          notes.map((note, index) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              archived={note.archived}
              action={setNotes}
              index={index}
            />
          ))
        ) : (
          <p className="text-center text-slate-400 text-lg font-medium py-16 px-5 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            Tidak ada catatan
          </p>
        )}
      </div>
    </>
  );
}

NoteList.propTypes = {
  notes: PropTypes.array.isRequired,
  label: PropTypes.string.isRequired,
  setNotes: PropTypes.func.isRequired,
};

export default NoteList;
