import Header from "./Header";
import "./Window.css";
import { useState, useRef, useEffect, useLayoutEffect } from "react";

function Window({ children, headerLinks }) {

  const [dragging, setDragging] = useState(-1);
  const [position, setPosition] = useState({ x: 0, y: 0, width: 600, height: 400 });
  const preDrag = useRef({ x: 0, y: 0, width: 0, height: 0, mouseX: 0, mouseY: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const rect = windowRef.current.getBoundingClientRect();
    const centeredX = (window.innerWidth - rect.width) / 2;
    const centeredY = (window.innerHeight - rect.height) / 2;
    setPosition({ x: centeredX, y: centeredY, width: rect.width, height: rect.height });
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
      setPosition({
        x: event.clientX + preDrag.current.x - preDrag.current.mouseX,
        y: event.clientY + preDrag.current.y - preDrag.current.mouseY,
        height: preDrag.current.height,
        width: preDrag.current.width
      });
    }

    
    function handleMouseMoveCornerUpperLeft(event) {
      const horizontalChange = event.clientX - preDrag.current.mouseX;
      const verticalChange = event.clientY - preDrag.current.mouseY;


      setPosition({
        x: preDrag.current.x + horizontalChange,
        y: preDrag.current.y + verticalChange,
        width: preDrag.current.width - horizontalChange,
        height: preDrag.current.height - verticalChange,
      });
    }

    function handleMouseMoveUpperBorder(event) {
      const horizontalChange = event.clientX - preDrag.current.mouseX;
      const verticalChange = event.clientY - preDrag.current.mouseY;

      setPosition({
        x: preDrag.current.x,
        y: preDrag.current.y + verticalChange,
        width: preDrag.current.width,
        height: preDrag.current.height - verticalChange,
      });
    }

    function handleMouseMoveCornerUpperRight(event) {
      const horizontalChange = event.clientX - preDrag.current.mouseX;
      const verticalChange = event.clientY - preDrag.current.mouseY;


      setPosition({
        x: preDrag.current.x,
        y: preDrag.current.y + verticalChange,
        width: preDrag.current.width + horizontalChange,
        height: preDrag.current.height - verticalChange,
      });
    }

    function handleMouseMoveLeftBorder(event) {
      const horizontalChange = event.clientX - preDrag.current.mouseX;
      const verticalChange = event.clientY - preDrag.current.mouseY;

      setPosition({
        x: preDrag.current.x + horizontalChange,
        y: preDrag.current.y,
        width: preDrag.current.width - horizontalChange,
        height: preDrag.current.height,
      });
    }


    function handleMouseMoveRightBorder(event) {
      const horizontalChange = event.clientX - preDrag.current.mouseX;
      const verticalChange = event.clientY - preDrag.current.mouseY;

      setPosition({
        x: preDrag.current.x,
        y: preDrag.current.y,
        width: preDrag.current.width + horizontalChange,
        height: preDrag.current.height,
      });
    }

    function handleMouseMoveCornerLowerLeft(event) {
      const horizontalChange = event.clientX - preDrag.current.mouseX;
      const verticalChange = event.clientY - preDrag.current.mouseY;


      setPosition({
        x: preDrag.current.x + horizontalChange,
        y: preDrag.current.y,
        width: preDrag.current.width - horizontalChange,
        height: preDrag.current.height + verticalChange,
      });
    }

    function handleMouseMoveLowerBorder(event) {
      const horizontalChange = event.clientX - preDrag.current.mouseX;
      const verticalChange = event.clientY - preDrag.current.mouseY;

      setPosition({
        x: preDrag.current.x,
        y: preDrag.current.y,
        width: preDrag.current.width,
        height: preDrag.current.height + verticalChange,
      });
    }

    function handleMouseMoveCornerLowerRight(event) {
      const horizontalChange = event.clientX - preDrag.current.mouseX;
      const verticalChange = event.clientY - preDrag.current.mouseY;


      setPosition({
        x: preDrag.current.x,
        y: preDrag.current.y,
        width: preDrag.current.width + horizontalChange,
        height: preDrag.current.height + verticalChange,
      });
    }

    const arrayHandleMove = [
      handleMouseMoveWhole, 
      handleMouseMoveCornerUpperLeft, handleMouseMoveUpperBorder, handleMouseMoveCornerUpperRight,
      handleMouseMoveLeftBorder, handleMouseMoveRightBorder,
      handleMouseMoveCornerLowerLeft, handleMouseMoveLowerBorder, handleMouseMoveCornerLowerRight,
    ]

    function handleMouseUp() {
      setDragging(-1);
    }

    document.addEventListener('mousemove', arrayHandleMove[dragging]);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', arrayHandleMove[dragging]);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [dragging, position]);



  function WindowInformation(){
    return (
      <>

      </>
    );
  }

  return (
    
    <div className="window-wrapper"
        ref={windowRef}
        style={{ position: 'absolute', left: position.x, top: position.y, width:position.width, height:position.height }}
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
        <Header headerLinks={headerLinks} onMouseDown={(event) => handleMouseDown(event, 0)} />
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