import React from 'react';

const Footer = () => {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__content" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: '3rem'
        }}>
          {/* Business Info - Left Side */}
          <section className="footer__section" style={{ 
            flex: 1, 
            minWidth: '250px'
          }}>
            <h3 className="footer__title">Yzagere Enterprises</h3>
            <div className="footer__text">
              <p style={{ marginBottom: '0.5rem' }}>Family-owned since 1983</p>
              <p style={{ marginBottom: '0.5rem' }}>5314 W Glendale Ave • Glendale, AZ 85301</p>
              <p style={{ marginBottom: '0.5rem' }}>
                <a href="tel:+16239310846" className="footer__link" style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
                  (623) 931-0846
                </a>
              </p>
            </div>
          </section>

          {/* Center - Hours & Service Areas */}
          <section className="footer__section" style={{ 
            flex: 1, 
            minWidth: '250px', 
            textAlign: 'center'
          }}>
            <h3 className="footer__title">Hours & Coverage</h3>
            <div className="footer__text">
              <p style={{ marginBottom: '0.5rem' }}><strong>Mon-Fri:</strong> 5:00 AM - 5:00 PM</p>
              <p style={{ marginBottom: '0.5rem' }}><strong>Emergency Service Available</strong></p>
              <p style={{ color: 'var(--neon-cyan)', marginTop: '1rem' }}>Serving All West Valley</p>
            </div>
          </section>

          {/* Quick Links - Right Side */}
          <section className="footer__section" style={{ 
            flex: 1, 
            minWidth: '250px', 
            textAlign: 'right'
          }}>
            <h3 className="footer__title">Quick Links</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', alignItems: 'flex-end' }}>
              <a href="/services/#engine-panel" className="footer__link" style={{ fontSize: '1.1rem' }}>
                Small Engine Repair
              </a>
              <a href="/services/#sprinkler-panel" className="footer__link" style={{ fontSize: '1.1rem' }}>
                Sprinkler Repair
              </a>
              <a href="/contact/" className="footer__link" style={{ fontSize: '1.1rem', color: 'var(--neon-pink)' }}>
                Get Quote
              </a>
            </div>
          </section>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; 2025 Yzagere Enterprises. All rights reserved. | Site powered by{' '}
            <a 
              href="https://tricondigital.com" 
              target="_blank" 
              rel="noopener"
              style={{ 
                color: 'var(--neon-cyan)', 
                textDecoration: 'none', 
                transition: 'color 0.3s ease' 
              }}
            >
              Tricon Digital
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;