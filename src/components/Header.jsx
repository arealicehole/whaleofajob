import React, { useState, useEffect } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPath, setCurrentPath] = useState('/');

  useEffect(() => {
    // Get current path to highlight active nav item
    setCurrentPath(window.location.pathname);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => {
    if (path === '/') {
      return currentPath === '/';
    }
    return currentPath.startsWith(path);
  };

  return (
    <nav className="nav" role="navigation" aria-label="Main navigation">
      <div className="container">
        <div className="nav__container">
          <a href="/" className="nav__logo" aria-label="Yzagere Enterprises Home">
            <img src="/images/logo.webp" alt="Yzagere Enterprises" className="nav__logo-img" />
          </a>
          
          <button 
            className={`nav__toggle ${isMenuOpen ? 'nav__toggle--active' : ''}`}
            aria-label="Toggle navigation menu" 
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="nav__toggle-line"></span>
            <span className="nav__toggle-line"></span>
            <span className="nav__toggle-line"></span>
          </button>
          
          <ul className={`nav__list ${isMenuOpen ? 'nav__list--active' : ''}`} role="list">
            <li className="nav__item">
              <a 
                href="/" 
                className={`nav__link ${isActive('/') ? 'nav__link--active' : ''}`}
                aria-current={isActive('/') ? 'page' : undefined}
              >
                Home
              </a>
            </li>
            <li className="nav__item">
              <a 
                href="/services/" 
                className={`nav__link ${isActive('/services/') ? 'nav__link--active' : ''}`}
                aria-current={isActive('/services/') ? 'page' : undefined}
              >
                Services
              </a>
            </li>
            <li className="nav__item">
              <a 
                href="/about/" 
                className={`nav__link ${isActive('/about/') ? 'nav__link--active' : ''}`}
                aria-current={isActive('/about/') ? 'page' : undefined}
              >
                About
              </a>
            </li>
            <li className="nav__item">
              <a 
                href="/contact/" 
                className={`nav__link ${isActive('/contact/') ? 'nav__link--active' : ''}`}
                aria-current={isActive('/contact/') ? 'page' : undefined}
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;