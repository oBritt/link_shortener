import './Header.css';
import { Link } from "react-router-dom";


function Header() {

  return (
    <header className="header">
      


      <div className="nav">
        <Link className="nav-button" to="/">Home</Link>
        <Link className="nav-button" to="/stats">Stats</Link>
      </div>

      <span className="title">URL Shortener</span>

      <div className="window-buttons">
        <button className="window-btn">_</button>
        <button className="window-btn">□</button>
        <button className="window-btn">✕</button>
      </div>
    </header>

    
  );
}

export default Header;