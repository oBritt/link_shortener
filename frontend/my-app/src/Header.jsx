import './Header.css';
import { Link } from "react-router-dom";


function Header() {

  return (
    <header>
      <div className="header">
        <h1>URL Shortener</h1>

        <div className="nav">
          <Link className="nav-button" to="/">
            Home
          </Link>

          <Link className="nav-button" to="/stats">
            Stats
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;