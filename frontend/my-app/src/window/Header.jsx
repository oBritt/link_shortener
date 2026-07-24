import './Header.css';
import { Link } from "react-router-dom";


function Header({ headerLinks, onMouseDown }) {

  return (
    <header className="header" onMouseDown={onMouseDown}>
      
      <div className="nav">
        {headerLinks.map(([text, onClick], index) => (
          <button key={index} className="nav-button" onClick={onClick}>
            {text}
          </button>
        ))}
      </div>

      <div className="drag-area" >
        <span className="title">URL Shortener</span>
      </div>

      <div className="window-buttons">
        <button className="window-btn" onMouseDown={(e) => e.stopPropagation()}>
          _
        </button>
        <button className="window-btn" onMouseDown={(e) => e.stopPropagation()}>
          □
        </button>
        <button className="window-btn" onMouseDown={(e) => e.stopPropagation()}>
          ✕
        </button>
      </div>
    </header>

    
  );
}

export default Header;