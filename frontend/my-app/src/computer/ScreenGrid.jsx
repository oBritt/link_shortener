
import './ScreenGrid.css';
import Icon from './Icon';
import { useState, useRef } from 'react';
import IconLink from '../assets/icon_link.png'

function ScreenGrid() {

    const gridSize = 80; // Size of each grid cell in pixels

    const width = window.innerWidth;
    const height = window.innerHeight - 40;

    const rows = Math.floor(height / gridSize);
    const cols = Math.floor(width / gridSize);

    const [programsIcons, setProgramsIcons] = useState([
      {position: {x: 0, y: 0}, icon: IconLink, name: "Link Shortener", },
    ]);

    const [dragging, setDragging] = useState(-1);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const dragOffset = useRef({ x: 0, y: 0 });

    function handleMouseUp(event) {
      setDragging(null);
    }

    function handleMouseDown(event) {
      setDragging();
      dragOffset.current = {
        x: event.clientX - position.x,
        y: event.clientY - position.y,
      };
    }

    function handleMouseMove(event) {
      if (dragging == -1) return;

      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      });
    }



    return (
      <div className="screen-grid">
        <div className="padding-row" style={{ height: (height - rows * gridSize) / 2 }}></div>
        {
          Array.from({ length: rows }, (_, i) => (
            <div className="screen-grid-row" key={i} style={{ height: gridSize }}>
              {
                Array.from({ length: cols }, (_, j) => (
                  <div className="screen-grid-cell" key={j} >
                    {
                      programsIcons.filter(program => program.position.x === j && program.position.y === i).map(p => (
                          <div className="icon-container" key={p.name}>
                            <img className='icon-image' src={p.icon} key={p.name}></img>
                            <div className='icon-name'>{p.name}</div>
                          </div>
                      ))
                    }
                  </div>  
                ))
              }
            </div>
          ))
        }
      </div>
    );
}

export default ScreenGrid;