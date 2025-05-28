import Input from "../Elements/Input";
import PropTypes from "prop-types";

function Header({ search, setQuery }) {
  return (
    <div className="note-app__header">
      <h1>📑 Aplikasi Catatan</h1>
      <div className="note-search">
        <Input
          value={search}
          onChange={setQuery}
          type="search"
          id="search_note"
          name="search_note"
          placeholder="Cari catatan..."
        />
      </div>
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.string.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default Header;
