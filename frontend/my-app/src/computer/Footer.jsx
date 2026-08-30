

import './Footer.css';
import { useState, useEffect, useRef } from 'react';
import osIcon from '../assets/os.png';

function Footer() {
  const [time, setTime] = useState(new Date());
  const [menuOpen, setMenuOpen] = useState(false);
  const menuAreaRef = useRef(null);     

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;

    function handleClickOutside(e) {
      if (!menuAreaRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    }
    function handleKeyDown(e) {
      if (e.key === "Escape") setMenuOpen(false);
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <footer className="taskbar" ref={menuAreaRef}>

      {menuOpen && (
          <div className="dropup-menu">
            <h1>Contact</h1>
            tg 1: @bebra<br></br>
            tg 2: @benis
          </div>
        )}

      <button className="start-button" onClick={() => setMenuOpen(o => !o)}>
        <img src={osIcon} alt="OS" className="start-icon" />
        
      </button>

      <div className="clock">{formattedTime}</div>
    </footer>
  );
}

export default Footer;