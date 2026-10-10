import { BrowserRouter, Routes, Route, redirect } from 'react-router-dom';
import Redirectpage from './redirectpage/Redirectpage';
import Computer from './computer/Computer';
import IconLink from './assets/icon_link.png';
import BrowserImg from './assets/explorer.png';

function App() {

  const PRESET_DEFAULT = [
      {
          id: 0, position: {x: 0, y: 0}, positionAbs: {x: null, y: null, width: null, height: null},
          icon: IconLink, name: "Link Shortener",
          programId: "ProgramLink", isOpened: true, isMinimized: false, order: 1,
      },
      {   
          id: 1, position: {x: 0, y: 1}, positionAbs: {x: null, y: null, width: null, height: null},
          icon: BrowserImg, name: "Explorer", 
          programId: "BrowserApp", isOpened: false, isMinimized: false, order: 1000, redirect: false,
      },
  ]

  const PRESET_REDIRECT = [
    {
        id: 0, position: {x: 0, y: 0}, positionAbs: {x: null, y: null, width: null, height: null},
        icon: IconLink, name: "Link Shortener",
        programId: "ProgramLink", isOpened: false, isMinimized: false, order: 1000,
    },
    {   
        id: 1, position: {x: 0, y: 1}, positionAbs: {x: null, y: null, width: null, height: null},
        icon: BrowserImg, name: "Explorer", 
        programId: "BrowserApp", isOpened: true, isMinimized: false, order: 1, redirect: true
    },
  ]


  return (
    <BrowserRouter>
      <Routes>
        {/* default route */}
        <Route path="/" element={<Computer preset={PRESET_DEFAULT}/>} />

        {/* any /something route */}
        <Route path="/:code" element={<Computer preset={PRESET_REDIRECT} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;