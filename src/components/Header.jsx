import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';
import './components.css';

function Header({ searchTerm, setSearchTerm }) {
  const location = useLocation();
  const onReadingsPage = location.pathname === '/readings';
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    if (onReadingsPage) {
      const timer = setTimeout(() => {
        setIsSearchVisible(true);
      }, 300);
      return () => clearTimeout(timer);
    } else {
      setIsSearchVisible(false);
    }
  }, [onReadingsPage]);

  useEffect(() => {
    const handleScroll = () => {
      const isMobile = window.innerWidth <= 900;
      if (!isMobile) {
        setShowHeader(true);
        setLastScrollY(window.scrollY);
        return;
      }
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setShowHeader(false);
      } else {
        setShowHeader(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className={`site-header${showHeader ? '' : ' header-hidden'}`}>
      <div className="header-container">
        <div className="logo">
          <NavLink to="/">xINDUNIL</NavLink>
        </div>
        <div className="header-right">
          <nav className="main-nav">
            <ul>
              <li><NavLink to="/">Home</NavLink></li>
              <li><NavLink to="/readings">Readings</NavLink></li>
            </ul>
          </nav>
          <form 
            className={`header-search-form ${isSearchVisible ? 'visible' : ''}`} 
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="header-search-input"
            />
            <button type="submit" className="header-search-button">
              <FiSearch />
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}

export default Header; 