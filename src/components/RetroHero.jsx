import React from 'react';

const RetroHero = () => {
  return (
    <section className="hero hero--retro">
      <div className="hero__background">
        <div className="hero__grid"></div>
      </div>
      
      <div className="hero__content">
        <h1 className="hero__title">
          <span className="hero__title--pink">YZAGERE</span>
          <span className="hero__title--cyan">ENTERPRISES</span>
        </h1>
        
        <p className="hero__tagline">WE DO A WHALE OF A JOB</p>
        
        <h2 className="hero__subtitle">LANDSCAPING & SPRINKLER REPAIR</h2>
        
        <div className="hero__services">
          <span className="hero__service">SPRINKLER REPAIR</span>
          <span className="hero__service-divider">•</span>
          <span className="hero__service">SMALL ENGINE REPAIR</span>
          <span className="hero__service-divider">•</span>
          <span className="hero__service">JUNK HAULING</span>
        </div>
        
        <div className="hero__cta">
          <a href="/contact/" className="btn btn--neon-pink">
            GET A QUOTE
          </a>
          <a href="tel:6239310846" className="btn btn--neon-cyan">
            CALL NOW
          </a>
        </div>
      </div>
      
      <style jsx>{`
        .hero--retro {
          min-height: 100vh;
          background: #000;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .hero__background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
        
        .hero__grid {
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(rgba(22, 224, 189, 0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(22, 224, 189, 0.15) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: grid-slide 20s linear infinite;
        }
        
        @keyframes grid-slide {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }
        
        .hero__content {
          position: relative;
          z-index: 1;
          text-align: center;
          padding: 2rem;
          max-width: 1200px;
          width: 100%;
        }
        
        .hero__title {
          font-family: 'Orbitron', sans-serif;
          font-weight: 900;
          line-height: 0.85;
          margin-bottom: 1rem;
        }
        
        .hero__title--pink {
          display: block;
          font-size: clamp(4rem, 12vw, 10rem);
          color: #FF2D7D;
          text-shadow: 
            0 0 20px rgba(255, 45, 125, 0.8),
            0 0 40px rgba(255, 45, 125, 0.6),
            0 0 60px rgba(255, 45, 125, 0.4),
            0 0 80px rgba(255, 45, 125, 0.2);
          letter-spacing: 0.02em;
          animation: neon-pulse-pink 2s ease-in-out infinite alternate;
        }
        
        .hero__title--cyan {
          display: block;
          font-size: clamp(3rem, 10vw, 8rem);
          color: #16E0BD;
          text-shadow: 
            0 0 20px rgba(22, 224, 189, 0.8),
            0 0 40px rgba(22, 224, 189, 0.6),
            0 0 60px rgba(22, 224, 189, 0.4),
            0 0 80px rgba(22, 224, 189, 0.2);
          letter-spacing: 0.05em;
          animation: neon-pulse-cyan 2s ease-in-out infinite alternate;
        }
        
        @keyframes neon-pulse-pink {
          0% { 
            text-shadow: 
              0 0 20px rgba(255, 45, 125, 0.8),
              0 0 40px rgba(255, 45, 125, 0.6),
              0 0 60px rgba(255, 45, 125, 0.4);
          }
          100% { 
            text-shadow: 
              0 0 25px rgba(255, 45, 125, 1),
              0 0 50px rgba(255, 45, 125, 0.8),
              0 0 75px rgba(255, 45, 125, 0.6);
          }
        }
        
        @keyframes neon-pulse-cyan {
          0% { 
            text-shadow: 
              0 0 20px rgba(22, 224, 189, 0.8),
              0 0 40px rgba(22, 224, 189, 0.6),
              0 0 60px rgba(22, 224, 189, 0.4);
          }
          100% { 
            text-shadow: 
              0 0 25px rgba(22, 224, 189, 1),
              0 0 50px rgba(22, 224, 189, 0.8),
              0 0 75px rgba(22, 224, 189, 0.6);
          }
        }
        
        .hero__tagline {
          font-family: 'Brush Script MT', cursive;
          font-size: clamp(1.5rem, 4vw, 3rem);
          color: #FF2D7D;
          font-style: italic;
          margin: 2rem 0;
          text-shadow: 
            0 0 10px rgba(255, 45, 125, 0.8),
            0 0 20px rgba(255, 45, 125, 0.4);
          letter-spacing: 0.1em;
        }
        
        .hero__subtitle {
          font-family: 'Orbitron', sans-serif;
          font-size: clamp(1.2rem, 3vw, 2rem);
          color: #16E0BD;
          text-transform: uppercase;
          letter-spacing: 0.15em;
          margin: 2rem 0;
          font-weight: 700;
          text-shadow: 0 0 15px rgba(22, 224, 189, 0.6);
        }
        
        .hero__services {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 1rem;
          margin: 3rem 0;
          font-family: 'Space Mono', monospace;
          font-size: clamp(0.9rem, 2vw, 1.2rem);
        }
        
        .hero__service {
          color: #FDF9F6;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        
        .hero__service-divider {
          color: #FF2D7D;
          font-size: 1.5rem;
        }
        
        .hero__cta {
          display: flex;
          gap: 2rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 3rem;
        }
        
        .btn--neon-pink,
        .btn--neon-cyan {
          padding: 1rem 2.5rem;
          font-family: 'Orbitron', sans-serif;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          text-decoration: none;
          border: 2px solid;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }
        
        .btn--neon-pink {
          color: #FF2D7D;
          border-color: #FF2D7D;
          background: transparent;
        }
        
        .btn--neon-pink:hover {
          color: #000;
          background: #FF2D7D;
          box-shadow: 
            0 0 20px rgba(255, 45, 125, 0.8),
            inset 0 0 20px rgba(255, 45, 125, 0.2);
          transform: translateY(-2px);
        }
        
        .btn--neon-cyan {
          color: #16E0BD;
          border-color: #16E0BD;
          background: transparent;
        }
        
        .btn--neon-cyan:hover {
          color: #000;
          background: #16E0BD;
          box-shadow: 
            0 0 20px rgba(22, 224, 189, 0.8),
            inset 0 0 20px rgba(22, 224, 189, 0.2);
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .hero__title--pink {
            font-size: clamp(3rem, 15vw, 6rem);
          }
          
          .hero__title--cyan {
            font-size: clamp(2.5rem, 12vw, 5rem);
          }
          
          .hero__services {
            flex-direction: column;
            gap: 0.5rem;
          }
          
          .hero__service-divider {
            display: none;
          }
          
          .hero__cta {
            flex-direction: column;
            align-items: center;
          }
          
          .btn--neon-pink,
          .btn--neon-cyan {
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default RetroHero;