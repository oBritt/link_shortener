

import './Computer.css';
import { useState } from 'react';
import ProgramLink from '../programLink/ProgramLink';
import BrowserApp from '../browser/BrowserApp';
import Footer from './Footer';
import ScreenGrid from './ScreenGrid';

const PROGRAM_REGISTRY = {
  ProgramLink: ProgramLink,
  BrowserApp: BrowserApp,
};

function Computer() {
    
    function handleClick(event) {
      
    }

    function handleMaximize(event) {

    }

    function handleMinimize(event) {

    }

    function handleClose(event) {

    }


    const [openPrograms, setOpenPrograms] = useState([
      { id: 1, programId: 'ProgramLink', name: 'ProgramLink', isMinimized: false },
    ]);

    const openWindow = (programId, name) => {
        setOpenPrograms(prev => [...prev, { 
            id: Date.now(), 
            programId, 
            name 
        }]);
    };

  
    const closeWindow = (id) => {
        setOpenPrograms(prev => prev.filter(p => p.id !== id));
    };



    return (
      <>
        <ScreenGrid onOpenWindow={openWindow}/> 
        {openPrograms.map(p => {
            const Component = PROGRAM_REGISTRY[p.programId];
            if (!Component) return null;
            
            return (
                <Component 
                    key={p.id}           
                    onClose={() => closeWindow(p.id)} 
                />
            );
        })}
        <Footer />
      </>
    );
}

export default Computer;