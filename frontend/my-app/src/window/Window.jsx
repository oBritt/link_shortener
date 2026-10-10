import Header from "./Header";
import "./Window.css";
import { useState, useRef, useEffect, useLayoutEffect } from "react";

function Window({ children, headerLinks, zIndex, onClose, onMinimize, updatePos, pos}) {

  const [dragging, setDragging] = useState(-1);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 600, height: 400 });
  const preDrag = useRef({ x: 0, y: 0, width: 0, height: 0, mouseX: 0, mouseY: 0 });
  const windowRef = useRef(null);
  const minWidth = 350;
  const minHeight = 250;

  function updatePosition(position) {
    updatePos(position);
    setPosition(position);
  }


  useEffect(() => {
    const rect = windowRef.current.getBoundingClientRect();

    const w = pos.width ?? rect.width;
    const h = pos.height ?? rect.height;
    const x = pos.x ?? (window.innerWidth - w) / 2;
    const y = pos.y ?? (window.innerHeight - h) / 2;

    const jitterX = pos.x != null ? 0 : Math.random() * 40 - 20;
    const jitterY = pos.y != null ? 0 : Math.random() * 40 - 20;
    updatePosition({ x: x + jitterX, y: y + jitterY, width: w, height: h });
  }, []);

  function handleMouseDown(event, val) {
    setDragging(val);
    const rect = windowRef.current.getBoundingClientRect();

    preDrag.current = {
      x: rect.left,
      y: rect.top,
      width: rect.width,
      height: rect.height,
      mouseX: event.clientX,
      mouseY: event.clientY  
    };
  }

  useEffect(() => {
    if (dragging === -1) return;

    function handleMouseMoveWhole(event) {
      let mouseX = Math.min(Math.max(5, event.clientX), window.innerWidth - 5);
      let mouseY = Math.min(Math.max(5, event.clientY), window.innerHeight - 40);

      updatePosition({
        x: mouseX + preDrag.current.x - preDrag.current.mouseX,
        y: mouseY + preDrag.current.y - preDrag.current.mouseY,
        height: preDrag.current.height,
        width: preDrag.current.width
      });
    }

    function handleTransform(event) {
      if (dragging == -1) return;

      if (dragging == 0) {
        handleMouseMoveWhole(event);
        return;
      }
      const factors = [
                        [1, 1, -1, -1], [0, 1, 0, -1], [0, 1, 1, -1],
                        [1, 0, -1, 0], [0, 0, 1, 0],
                        [1, 0, -1, 1], [0, 0, 0, 1], [0, 0, 1, 1],
                      ]

      const factor = factors[dragging - 1];

      let mouseX = Math.min(Math.max(5, event.clientX), window.innerWidth - 5);
      let mouseY = Math.min(Math.max(5, event.clientY), window.innerHeight - 40);

      let horizontalChange = mouseX - preDrag.current.mouseX;
      let verticalChange = mouseY - preDrag.current.mouseY;
      
      if (preDrag.current.width - horizontalChange < minWidth) {
        horizontalChange = preDrag.current.width - minWidth;
      }
      if (preDrag.current.height - verticalChange < minHeight) {
        verticalChange = preDrag.current.height - minHeight;
      }

      updatePosition({
        x: preDrag.current.x + factor[0] * horizontalChange,
        y: preDrag.current.y + factor[1] * verticalChange,
        width: preDrag.current.width + factor[2] * horizontalChange,
        height: preDrag.current.height + factor[3] * verticalChange,
      });

    }

    function handleMouseUp() {
      setDragging(-1);
    }

    document.addEventListener('mousemove', handleTransform);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleTransform);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, position]);


  return (
    
    <div className="window-wrapper"
        ref={windowRef}
        style={{ 
          position: 'absolute', 
          left: position.x, 
          top: position.y, 
          width: position.width, 
          height: position.height,
          minWidth: minWidth,
          minHeight: minHeight,
          zIndex: zIndex
        }}
    >
      <div className="window-wrapper-upper">
        <div className="window-corner-upper-left" onMouseDown={(event) => (handleMouseDown(event, 1))}>
          <div className="window-corner-upper-left-visiable"></div>
        </div>
        <div className="window-upper-border" onMouseDown={(event) => (handleMouseDown(event, 2))}>
          <div className="window-upper-border-visiable"></div>
        </div>
        <div className="window-corner-upper-right" onMouseDown={(event) => (handleMouseDown(event, 3))}>
          <div className="window-corner-upper-right-visiable">
            {
              ["w", "w", "h", "w", "h", "d", "h", "d", "d"].map((p, i) => (
                <div key={i} className={ p == "w" ? "corner-pixel-white" : p == "d" ? "corner-pixel-dark" : "corner-pixel-half"}>
                </div>
              ))
            }
          </div>
        </div>
      </div>
      <div className="window-wrapper-middle">
        <div className="window-left-border" onMouseDown={(event) => (handleMouseDown(event, 4))}>
          <div className="window-left-border-visiable"></div>
        </div>
        <div className="window">
        <Header headerLinks={headerLinks} onMouseDown={(event) => handleMouseDown(event, 0)} onClose={onClose} onMinimize={onMinimize}/>
          <div className="window-content">
            {children}
          </div>
        </div>
        <div className="window-right-border" onMouseDown={(event) => (handleMouseDown(event, 5))}>
          <div className="window-right-border-visiable"></div>
        </div>
      </div>
      <div className="window-wrapper-lower">
        <div className="window-corner-lower-left" onMouseDown={(event) => (handleMouseDown(event, 6))} >
          <div className="window-corner-lower-left-visiable">
            {
              ["w", "w", "h", "w", "h", "d", "h", "d", "d"].map((p, i) => (
                <div key={i} className={ p == "w" ? "corner-pixel-white" : p == "d" ? "corner-pixel-dark" : "corner-pixel-half"}>
                </div>
              ))
            }
          </div>
        </div>
        <div className="window-lower-border" onMouseDown={(event) => (handleMouseDown(event, 7))}>
          <div className="window-lower-border-visiable"></div>
        </div>
        <div className="window-corner-lower-right" onMouseDown={(event) => (handleMouseDown(event, 8))}>
          <div className="window-corner-lower-right-visiable"></div>
        </div>
      </div>
    </div>
  );  
}

export default Window;