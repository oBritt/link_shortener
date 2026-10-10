

import './Computer.css';
import { useState, useEffect } from 'react';
import ProgramLink from '../programLink/ProgramLink';
import BrowserApp from '../browser/BrowserApp';
import Footer from './Footer';
import ScreenGrid from './ScreenGrid';
import IconLink from '../assets/icon_link.png'
import BrowserImg from '../assets/explorer.png'



const REGISTRY = [ ProgramLink, BrowserApp ]

function Computer({preset}) {
    
    function handleClick(event) {
      
    }

    function handleMaximize(event) {

    }

    function handleMinimize(event) {

    }

    function handleClose(event) {

    }

    const [programs, setPrograms] = useState(preset);

    const setAbsPosition = (id, pos) => {
      setPrograms(prev => prev.map(p => {
        if (p.id === id) {
          return {...p, positionAbs:pos};
        }
        return p;
      }));
    }

    const openWindow = (id) => {
      console.log(id);

      setPrograms(prev => {
        const target = prev.find(p => p.id === id);
        const newTop = prev.filter(p => p.isOpened && p.id !== id).length + 1;
        const prevOrder = target.isOpened ? target.order : Infinity;

        return prev.map(p => {
          if (p.id === id) {
            return { ...p, isOpened: true, isMinimized: false, order: newTop };
          }
          if (p.isOpened && p.order > prevOrder) {
            return { ...p, order: p.order - 1 };
          }
          return p;
        });
      });
    };

    const clickWindow = (id) => {
      setPrograms(prev => {
        const target = prev.find(p => p.id === id);
        const top = prev.filter(p => p.isOpened).length;
        return prev.map(prog => {
          if (prog.order > target.order && prog.isOpened) {
            return {...prog, order: prog.order - 1};
          }
          if (prog.id == target.id) {
            return {...prog, order: top};
          }
          return prog;
        });
      });
    };


    const closeWindow = (id) => {
      setPrograms(prev => prev.map(p =>
        p.id === id ? { ...p, isOpened: false, isMinimized: false, order: 1000 } : p
      ));
    };
    
    const minimizeWindow = (id) => {
      setPrograms(prev => {
        return prev.map(prog => {
          if (prog.id == id) {
            return {...prog, isMinimized: true};
          }
          return prog;
        });
      });
    };

    return (
      <>
        <ScreenGrid programsState={[programs, setPrograms]} onOpenWindow={openWindow}/> 
        {programs.map(p => {
            if (!p.isOpened || p.isMinimized) {
                return null;
            }

            const Component = REGISTRY[p.id];
            
            return (
              <div 
                key={p.id}
                onMouseDown={() => clickWindow(p.id)}
              >
                <Component
                  program={p}
                  zIndex={p.order * 100}
                  onClose={() => closeWindow(p.id)}
                  onMinimize={() => minimizeWindow(p.id)}
                  updatePos={(position) => setAbsPosition(p.id, position)}
                  pos={p.positionAbs}
                />
              </div>
            );
        })}
        <Footer programs={programs} onOpen={openWindow} onClose={closeWindow}/>
      </>
    );
}

export default Computer;
