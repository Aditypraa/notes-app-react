import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";

function MainLayout({ children, search = "", setQuery = null }) {
  return (
    <div className="note-app">
      <Header search={search} setQuery={setQuery} />
      <div className="note-app__body">{children}</div>
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
