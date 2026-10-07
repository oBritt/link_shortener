
import './ProgramLink.css';
import { useState, useEffect, useRef } from 'react';

import Stats from './Stats';
import Mainpage from './Mainpage';
import Window from '../window/Window';


function ProgramLink({program, zIndex, onClose, onMinimize, updatePos, pos }) {
    const [currentPage, setCurrentPage] = useState('mainpage');

    const handleHomeClick = () => {
        setCurrentPage('mainpage');
    }

    const handleStatsClick = () => {
        setCurrentPage('stats');
    }

    const headerLinks = [["Home", handleHomeClick], ["Stats", handleStatsClick]]

    
    return (
      <Window 
        headerLinks={headerLinks} zIndex={zIndex} onClose={onClose} 
        onMinimize={onMinimize}  title="URL Shortener" updatePos={updatePos} pos={pos}

      >
        {currentPage === 'mainpage' && <Mainpage />}
        {currentPage === 'stats' && <Stats />}
      </Window>
    );
}

export default ProgramLink;