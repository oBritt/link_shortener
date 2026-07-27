
import './ScreenGrid.css';
import Icon from './Icon';
import { useState, useRef, useEffect } from 'react';
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
    const preDrag = useRef({x: 0, y: 0, mouseX: 0, mouseY:0});
    const iconRefs = useRef(new Map());

    function getRef(key) {
      if (!iconRefs.current.has(key)) {
        iconRefs.current.set(key, { current: null }); // plain ref-like object
      }
      return iconRefs.current.get(key);
    }


    function getPosition(x, y) {
      const moveVertical = Math.floor((height - rows * gridSize) / 2);
      const moveHorizontal = Math.floor((width - cols * gridSize) / 2);
      const xCord = Math.floor((x - moveHorizontal) / gridSize);
      const yCord = Math.floor((y - moveVertical) / gridSize);
      return [xCord, yCord];
    }

    function handleMouseDown(event, id) {
      setDragging(id);
      const refContainer = getRef(programsIcons[id].name);
      const rect = refContainer.current.getBoundingClientRect();

      preDrag.current = {
        mouseX: event.clientX,
        mouseY: event.clientY,
        x: rect.left,
        y: rect.top
      };

      setPosition({x: rect.left, y: rect.top});
    }

    useEffect(() => {
      if (dragging === -1) return;
  
      function handleMouseMove(event) {
        setPosition({
          x: event.clientX + preDrag.current.x - preDrag.current.mouseX,
          y: event.clientY + preDrag.current.y - preDrag.current.mouseY,
        });
      }
  
      function handleMouseUp() {
        const pos = getPosition(position.x, position.y);

        setProgramsIcons(prev => prev.map((icon, index) =>
           index === dragging ? {...icon, position: {x: pos[0], y:pos[1]} } : icon)
        )

        setDragging(-1);
      }
  
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
  
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }, [dragging, position, programsIcons]);



    return (
      <div className="screen-grid">
        <div className="padding-row" style={{ height: (height - rows * gridSize) / 2 }}></div>
        {
          Array.from({ length: rows }, (_, i) => (
            <div className="screen-grid-row" key={i} style={{ height: gridSize }}>
              {
                Array.from({ length: cols }, (_, j) => (
            
                  <div className="screen-grid-cell" key={j}>
                    {
                      programsIcons
                        .filter(program => program.position.x === j && program.position.y === i)
                        .map(p => {
                          const id = programsIcons.findIndex(icon => icon.position.x === j && icon.position.y === i);
                          return (
                            <div
                              className="icon-container"
                              ref={getRef(p.name)}
                              onMouseDown={(event) => handleMouseDown(event, id)}
                              key={p.name}
                            >
                              <img className="icon-image" src={p.icon} />
                              <div className="icon-name">{p.name}</div>
                            </div>
                          );
                        })
                    }
                  </div>  
                ))
              }
            </div>
          ))
        }

        {
      dragging !== -1 && (
          <div
            className="icon-container-moving"
            key={programsIcons[dragging].name}
            style={{
              position: 'absolute',
              top: position.y,
              left: position.x,
            }}
          >
            <img className="icon-image" src={programsIcons[dragging].icon} />
            <div className="icon-name">{programsIcons[dragging].name}</div>
          </div>
         )

        }
      </div>
    );
}

export default ScreenGrid;