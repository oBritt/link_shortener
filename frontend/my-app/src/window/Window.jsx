import Header from "./Header";
import "./Window.css";
import { useState, useRef, useEffect } from "react";

function Window({ children, headerLinks }) {

  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const windowRef = useRef(null);

  useEffect(() => {
    const rect = windowRef.current.getBoundingClientRect();
    const centeredX = (window.innerWidth - rect.width) / 2;
    const centeredY = (window.innerHeight - rect.height) / 2;
    setPosition({ x: centeredX, y: centeredY });
  }, []);

  function handleMouseDown(event) {
    setIsDragging(true);
    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };
  }

  useEffect(() => {
    if (!isDragging) return;

    function handleMouseMove(event) {
      setPosition({
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      });
    }

    function handleMouseUp() {
      setIsDragging(false);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="window-wrapper"
      ref={windowRef}
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="window-wrapper-upper">
        <div className="window-corner-upper-left">
          <div className="window-corner-upper-left-visable"></div>
        </div>
        <div className="window-upper-border">
          <div className="window-upper-border-visiable"></div>
        </div>
        <div className="window-corner-upper-right">
          <div className="window-corner-upper-right-visiable"></div>
        </div>
      </div>
      <div className="window-wrapper-middle">
        <div className="window-left-border"></div>
        <div className="window">
        <Header headerLinks={headerLinks} onMouseDown={handleMouseDown} />
          <div className="window-content">
            {children}
          </div>
        </div>
        <div className="window-right-border"></div>
      </div>
      <div className="window-wrapper-lower">
        <div className="window-corner-lower-left"></div>
        <div className="window-lower-border"></div>
        <div className="window-corner-lower-right"></div>
      </div>
      
    </div>
  );
}

export default Window;