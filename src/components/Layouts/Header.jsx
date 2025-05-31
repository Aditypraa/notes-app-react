import Input from "../Elements/Input";
import PropTypes from "prop-types";

function Header({ search = "", setQuery = null }) {
  const showSearchInput = setQuery !== null;

  return (
    <div className="flex items-center justify-between px-6 py-5 bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200 sticky top-0 z-[100] md:px-8 md:py-6 flex-col md:flex-row gap-4 text-center md:text-left">
      <h1 className="flex items-center gap-2 font-bold text-2xl text-slate-900">
        📑 Aplikasi Catatan
      </h1>

      {showSearchInput && (
        <div className="relative flex items-center">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base z-10 select-none">
            🔍
          </span>
          <Input
            value={search}
            onChange={setQuery}
            type="search"
            id="search_note"
            name="search_note"
            placeholder="Cari catatan..."
            className="pl-10 min-w-[250px] md:min-w-[300px] lg:min-w-[400px] rounded-xl bg-slate-50 border-2 border-transparent focus:bg-white focus:border-blue-500 transition-all"
          />
        </div>
      )}
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.string,
  setQuery: PropTypes.func,
};

export default Header;
