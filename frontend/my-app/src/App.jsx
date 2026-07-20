import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Mainpage from './Mainpage';
import Redirectpage from './redirectpage/Redirectpage';
import Stats from './statspage/Stats';
import Layout from './Layout';

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        {/* default route */}
        <Route path="/" element={<Mainpage />} />

        {/* any /stats route */}
        <Route path="/stats" element={<Stats />} />

        {/* any /something route */}
        <Route path="/:code" element={<Redirectpage />} />
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;