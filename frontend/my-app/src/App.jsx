import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainpage from './Mainpage';
import Redirectpage from './Redirectpage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* default route */}
        <Route path="/" element={<Mainpage />} />

        {/* any /something route */}
        <Route path="/:code" element={<Redirectpage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;