import { useState, useRef, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router";
import Input from "../Elements/Input";
import Button from "../Elements/Button";
import { BiLogOut, BiUser, BiSun, BiMoon } from "react-icons/bi";
import { MdLanguage } from "react-icons/md";
import PropTypes from "prop-types";
import { useAuth } from "../../hooks/useAuth";
import { useTheme } from "../../hooks/useTheme";
import { useLocale } from "../../hooks/useLocale";

function Header({ search = "", setQuery = null }) {
  const { user, logout } = useAuth();
  const { toggleTheme, isDark } = useTheme();
  const { toggleLocale, t, isEnglish } = useLocale();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const showSearchInput = setQuery !== null;
  const dropdownRef = useRef(null);

  // Memoized logout handler
  const handleLogout = useCallback(() => {
    logout();
    setShowUserMenu(false);
  }, [logout]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    if (showUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [showUserMenu]);

  // Close dropdown when route changes
  useEffect(() => {
    setShowUserMenu(false);
  }, [location.pathname]);

  return (
    <header className="flex flex-col md:flex-row items-start md:items-center justify-between px-4 sm:px-6 py-4 md:py-5 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-md border-b border-slate-200 dark:border-gray-700 sticky top-0 z-[100] md:px-8 md:py-6 gap-3 md:gap-4 text-center md:text-left transition-colors">
      <div className="flex items-center gap-4 md:gap-8 w-full md:w-auto justify-between md:justify-start">
        <h1 className="flex items-center gap-2 font-bold text-xl md:text-2xl text-slate-900 dark:text-white">
          {t("appTitle")}
        </h1>

        {/* Mobile User Controls */}
        <div className="flex md:hidden items-center gap-2">
          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-0"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <BiSun className="w-4 h-4 text-yellow-500" />
            ) : (
              <BiMoon className="w-4 h-4 text-gray-600" />
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            onClick={toggleLocale}
            className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-0 flex items-center gap-1"
            aria-label={
              isEnglish ? "Switch to Indonesian" : "Switch to English"
            }
          >
            <MdLanguage className="w-4 h-4 text-gray-600 dark:text-gray-300" />
            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
              {isEnglish ? "EN" : "ID"}
            </span>
          </Button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <Button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-1 p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="User menu"
            >
              <div className="w-7 h-7 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium text-sm">
                {user?.name?.charAt(0).toUpperCase() || (
                  <BiUser className="w-3 h-3" />
                )}
              </div>
            </Button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                >
                  <BiLogOut className="w-4 h-4" /> {t("logout")}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Navigation Links - Desktop */}
        <nav className="hidden md:flex items-center gap-4" role="navigation">
          <Link
            to="/"
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              location.pathname === "/"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
            aria-current={location.pathname === "/" ? "page" : undefined}
          >
            {t("activeNotes")}
          </Link>
          <Link
            to="/archived"
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              location.pathname === "/archived"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
            aria-current={
              location.pathname === "/archived" ? "page" : undefined
            }
          >
            {t("archivedNotes")}
          </Link>
        </nav>
      </div>

      {/* Search and Desktop Controls */}
      <div className="flex items-center gap-3 md:gap-4 w-full md:w-auto">
        {showSearchInput && (
          <div className="relative flex items-center flex-1 md:flex-none">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base z-10 select-none pointer-events-none">
              🔍
            </span>
            <Input
              value={search}
              onChange={setQuery}
              type="search"
              id="search_note"
              name="search_note"
              placeholder={t("searchPlaceholder")}
              className="pl-10 w-full md:min-w-[250px] lg:min-w-[300px] xl:min-w-[400px] rounded-xl bg-slate-50 dark:bg-gray-800 border-2 border-transparent focus:bg-white dark:focus:bg-gray-700 focus:border-blue-500 dark:focus:border-blue-400 transition-all"
              autoComplete="off"
            />
          </div>
        )}

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme Toggle */}
          <Button
            onClick={toggleTheme}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-0"
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? (
              <BiSun className="w-5 h-5 text-yellow-500" />
            ) : (
              <BiMoon className="w-5 h-5 text-gray-600" />
            )}
          </Button>

          {/* Language Toggle */}
          <Button
            onClick={toggleLocale}
            className="p-3 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors border-0 flex items-center gap-2"
            aria-label={
              isEnglish ? "Switch to Indonesian" : "Switch to English"
            }
          >
            <MdLanguage className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
              {isEnglish ? "EN" : "ID"}
            </span>
          </Button>

          {/* User Menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg p-2 transition-colors"
              aria-label="User menu"
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-medium">
                {user?.name?.charAt(0).toUpperCase() || <BiUser />}
              </div>
              <span className="hidden lg:block font-medium text-gray-700 dark:text-gray-300 max-w-[120px] truncate">
                {user?.name || "User"}
              </span>
            </button>
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-2 z-50">
                <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                  <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
                <Button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2 transition-colors"
                >
                  <BiLogOut className="w-4 h-4" /> {t("logout")}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="md:hidden w-full" role="navigation">
        <div className="flex justify-center gap-2">
          <Link
            to="/"
            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all text-center text-sm ${
              location.pathname === "/"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
            aria-current={location.pathname === "/" ? "page" : undefined}
          >
            {t("activeNotes")}
          </Link>
          <Link
            to="/archived"
            className={`flex-1 px-3 py-2 rounded-lg font-medium transition-all text-center text-sm ${
              location.pathname === "/archived"
                ? "bg-blue-500 text-white shadow-md"
                : "text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
            }`}
            aria-current={
              location.pathname === "/archived" ? "page" : undefined
            }
          >
            {t("archivedNotes")}
          </Link>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  search: PropTypes.string,
  setQuery: PropTypes.func,
};

export default Header;
