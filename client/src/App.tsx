import { BrowserRouter as Router, Routes, Route } from 'react-router'
import Layout from './components/Layout/Layout';
import Board from './components/Boards/Boards';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Board />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;