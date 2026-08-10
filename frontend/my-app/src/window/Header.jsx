import './Header.css';
import { Link } from "react-router-dom";


function Header({ headerLinks = [], onMouseDown, onClose, title}) {

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
        <span className="title">{title}</span>
      </div>

      <div className="window-buttons">
        <button className="window-btn" onMouseDown={(e) => e.stopPropagation()} onClick={onClose}>
          _
        </button>
        <button className="window-btn" onMouseDown={(e) => e.stopPropagation()} onClick={() => window.open('', '_blank')}>
          □
        </button>
        <button className="window-btn" onMouseDown={(e) => e.stopPropagation()} onClick={onClose}>
          ✕
        </button>
      </div>
    </header>

    
  );
}

export default Header;