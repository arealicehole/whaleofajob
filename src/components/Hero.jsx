import React, { useEffect, useRef } from 'react';

const Hero = () => {
  const liteYouTubeRef = useRef(null);

  useEffect(() => {
    // Ensure lite-youtube-embed script is loaded and ready
    if (window.customElements && window.customElements.get('lite-youtube')) {
      // Custom element is already defined, we're good
      return;
    }

    // If not defined, wait for the script to load
    const checkForLiteYouTube = () => {
      if (window.customElements && window.customElements.get('lite-youtube')) {
        // Component is now available, force a re-render if needed
        if (liteYouTubeRef.current) {
          liteYouTubeRef.current.style.display = 'block';
        }
      } else {
        // Check again in 100ms
        setTimeout(checkForLiteYouTube, 100);
      }
    };

    checkForLiteYouTube();
  }, []);

  return (
    <section className="hero">
      <div className="hero__video">
        <lite-youtube
          ref={liteYouTubeRef}
          videoid="UJlJ_Ep1fOc"
          params="rel=0&modestbranding=1"
          style={{
            '--lite-yt-aspect-ratio': '56.25%',
            backgroundImage: 'url("/images/hero-poster.webp")'
          }}
        >
          <a 
            href="https://youtube.com/watch?v=UJlJ_Ep1fOc" 
            className="lty-playbtn"
            aria-label="Play intro video"
          >
            <span className="lyt-visually-hidden">Play intro</span>
          </a>
        </lite-youtube>
      </div>
      
      <div className="container">
        <div className="hero__content">
          <h1 className="hero__title">
            <span className="hero__title--highlight">Yzagere Enterprises</span>
            <br />
            Family Owned in Glendale, AZ since 1983!
          </h1>
          
          <p className="hero__text">
            No Job too Big or Small! From sprinkler and irrigation repair to small engine maintenance and junk hauling, 
            we're your trusted local experts serving the West Valley with reliable, professional service.
          </p>
          
          <div className="hero__actions">
            <a href="/contact/" className="form__button">
              Get Free Estimate
            </a>
            <a href="tel:+16239310846" className="form__button form__button--secondary">
              Call (623) 931-0846
            </a>
            <a href="/service-areas/" className="form__button form__button--outline">
              View Service Areas
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;