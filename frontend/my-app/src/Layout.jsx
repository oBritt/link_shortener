import Header from "./Header";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="page">
      <div className="window">
        <Header />
        <div className="window-content">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;