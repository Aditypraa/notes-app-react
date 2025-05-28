import NoteItem from "./NoteItem";
import PropTypes from "prop-types";

function NoteList({ notes, label, setNotes }) {
  return (
    <>
      <h2>{label}</h2>
      <div className="notes-list">
        {notes.length === 0 ? (
          <p className="notes-list__empty-message">Tidak ada catatan</p>
        ) : (
          notes.map((note) => (
            <NoteItem
              key={note.id}
              id={note.id}
              title={note.title}
              body={note.body}
              createdAt={note.createdAt}
              archived={note.archived}
              action={setNotes}
            />
          ))
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
