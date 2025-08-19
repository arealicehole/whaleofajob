import React from 'react';
import { createRoot } from 'react-dom/client';
import Hero from './components/Hero.jsx';
import RetroHero from './components/RetroHero.jsx';
import ContactForm from './components/ContactForm.jsx';
import Footer from './components/Footer.jsx';

/**
 * React Island Mounting System
 * 
 * This script mounts React components to specific DOM elements if they exist.
 * It's designed for progressive enhancement - content should work without JS,
 * and React "islands" enhance the experience when available.
 */

const mountComponent = (Component, elementId, componentName = 'Component') => {
  try {
    const container = document.getElementById(elementId);
    
    if (!container) {
      // Container doesn't exist, which is fine - not all pages need all components
      console.log(`${componentName} mount point #${elementId} not found (this is normal if not on the right page)`);
      return;
    }

    // Check if already mounted (prevent double mounting)
    if (container.hasAttribute('data-react-mounted')) {
      console.warn(`${componentName} already mounted on #${elementId}`);
      return;
    }

    // Mark as mounted before creating root to prevent race conditions
    container.setAttribute('data-react-mounted', 'true');

    // Create React root and render component
    const root = createRoot(container);
    root.render(<Component />);

    console.log(`${componentName} successfully mounted on #${elementId}`);
    
    // Store root reference for potential cleanup
    container._reactRoot = root;

  } catch (error) {
    console.error(`Error mounting ${componentName} on #${elementId}:`, error);
    
    // Clean up if mounting failed
    const container = document.getElementById(elementId);
    if (container) {
      container.removeAttribute('data-react-mounted');
    }
  }
};

/**
 * Initialize React islands when DOM is ready
 */
const initializeReactIslands = () => {
  console.log('Initializing React islands...');

  // Mount Hero component if container exists (check for retro version first)
  if (document.getElementById('retro-hero-root')) {
    mountComponent(RetroHero, 'retro-hero-root', 'RetroHero');
  } else {
    mountComponent(Hero, 'hero-root', 'Hero');
  }

  // Mount ContactForm component if container exists
  mountComponent(ContactForm, 'contact-form-root', 'ContactForm');

  // Mount Footer component on all pages
  mountComponent(Footer, 'footer-root', 'Footer');

  console.log('React islands initialization complete');
};

/**
 * Cleanup function for development/testing
 */
const cleanupReactIslands = () => {
  const containers = [
    document.getElementById('hero-root'),
    document.getElementById('contact-form-root'),
    document.getElementById('footer-root')
  ].filter(Boolean);

  containers.forEach(container => {
    if (container._reactRoot) {
      container._reactRoot.unmount();
      delete container._reactRoot;
      container.removeAttribute('data-react-mounted');
    }
  });

  console.log('React islands cleaned up');
};

/**
 * DOM Ready Handler
 * Handles both regular DOM ready and cases where script loads after DOM is ready
 */
const handleDOMReady = () => {
  if (document.readyState === 'loading') {
    // DOM is still loading, wait for DOMContentLoaded
    document.addEventListener('DOMContentLoaded', initializeReactIslands);
  } else {
    // DOM is already ready, initialize immediately
    initializeReactIslands();
  }
};

// Start the mounting process
handleDOMReady();

// Export cleanup function for development use
if (typeof window !== 'undefined') {
  window.cleanupReactIslands = cleanupReactIslands;
}

// Export for ES modules (if needed for testing)
export { initializeReactIslands, cleanupReactIslands };