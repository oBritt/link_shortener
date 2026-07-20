import Header from "./Header";
import "./Layout.css";

function Layout({ children }) {
  return (
    <div className="page">
      <Header />
      <main>
        {children}
      </main>
    </div>
  );
}

export default Layout;