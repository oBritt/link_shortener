import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Redirectpage from './redirectpage/Redirectpage';
import Computer from './computer/Computer';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default route */}
        <Route path="/" element={<Computer />} />

        {/* any /something route */}
        <Route path="/:code" element={<Redirectpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;