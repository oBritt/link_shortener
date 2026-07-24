

import './Computer.css';
import { useState } from 'react';
import ProgramLink from '../programLink/ProgramLink';
import Footer from './Footer';
import ScreenGrid from './ScreenGrid';


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
      {programm: ProgramLink, name: 'ProgramLink', isMinimized: false, arg: {}},
    ]);



    return (
      <>
        <ScreenGrid /> 
        {
          openPrograms.map(p => (
            <div key={p.name}>
              {p.programm.apply(p.arg)}
            </div>
          ))
        }
        <Footer />
      </>
    );
}

export default Computer;