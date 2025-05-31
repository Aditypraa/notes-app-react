import Footer from "./Footer";
import Header from "./Header";
import PropTypes from "prop-types";

function MainLayout({ children, search = "", setQuery = null }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header search={search} setQuery={setQuery} />
      <div className="flex-1 flex flex-col">{children}</div>
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
