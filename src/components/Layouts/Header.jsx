import { useState } from "react";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { BiLogOut, BiUser } from "react-icons/bi";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";

function Header({ search = "", setQuery = null }) {
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const showSearchInput = setQuery !== null;

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="flex items-center justify-between px-6 py-5 bg-white/80 backdrop-blur-md shadow-md border-b border-slate-200 sticky top-0 z-[100] md:px-8 md:py-6 flex-col md:flex-row gap-4 text-center md:text-left">
      <h1 className="flex items-center gap-2 font-bold text-2xl text-slate-900">
        📑 Aplikasi Catatan
      </h1>

      <div className="flex items-center gap-4">
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

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
              {user?.name?.charAt(0).toUpperCase() || <BiUser />}
            </div>
            <span className="hidden md:block font-medium text-gray-700">
              {user?.name || "User"}
            </span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-sm font-medium text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <Button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
              >
                <BiLogOut /> Keluar
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

Header.propTypes = {
  search: PropTypes.string,
  setQuery: PropTypes.func,
};

export default Header;
