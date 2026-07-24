

import './Footer.css';
import { useState, useEffect } from 'react';
import osIcon from '../assets/os.png';

function Footer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <footer className="taskbar">
      <button className="start-button">
        <img src={osIcon} alt="OS" className="start-icon" />
        
      </button>

      <div className="clock">{formattedTime}</div>
    </footer>
  );
}

export default Footer;