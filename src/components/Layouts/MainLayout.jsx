import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";

function MainLayout({ children, search = "", setQuery = null }) {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
      <Header search={search} setQuery={setQuery} />
      <div className="flex-1 flex flex-col justify-center content-center">
        {children}
      </div>
      <Footer />
    </div>
  );
}

MainLayout.propTypes = {
  children: PropTypes.node.isRequired,
  search: PropTypes.string,
  setQuery: PropTypes.func,
};

export default MainLayout;
