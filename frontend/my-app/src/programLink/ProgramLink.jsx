
import './ProgramLink.css';
import { useState } from 'react';

import Stats from './Stats';
import Mainpage from './Mainpage';
import Window from '../window/Window';


function ProgramLink() {
    const [currentPage, setCurrentPage] = useState('mainpage');


    const handleHomeClick = () => {
        setCurrentPage('mainpage');
    }

    const handleStatsClick = () => {
        setCurrentPage('stats');
    }

    const headerLinks = [["Home", handleHomeClick], ["Stats", handleStatsClick]]

    
    return (
      <Window headerLinks={headerLinks}>
        {currentPage === 'mainpage' && <Mainpage />}
        {currentPage === 'stats' && <Stats />}
      </Window>
    );
}

export default ProgramLink;