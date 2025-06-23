import React from 'react';
import { NavLink } from 'react-router-dom';
import './components.css';

const Footer = () => {
  return (
    <footer className="site-footer-main">
      <div className="footer-container">
        <div className="footer-branding">
          <NavLink to="/">xINDUNIL</NavLink>
        </div>
        <div className="footer-social-links">
          <a href="https://www.linkedin.com/in/indunil-jayaranga-484a1b244" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://github.com/Indunil-jayaranga" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#">Blog</a>
        </div>
        <div className="footer-email-container">
          <a href="mailto:contact.xindunil@gmail.com" className="footer-email-link">
            contact.xindunil@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 