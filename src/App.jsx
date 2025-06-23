import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Projects from './components/Projects';
import ProjectDetail from './components/ProjectDetail';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <ScrollToTop />
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/readings" element={<Projects searchTerm={searchTerm} />} />
          <Route path="/readings/:slug" element={<ProjectDetail />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App; 