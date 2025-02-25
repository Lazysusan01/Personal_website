import { useEffect, useState } from 'react';

export function Particles() {
  const [theme, setTheme] = useState('dark');

  // Function to create particles config based on theme
  const getParticlesConfig = (currentTheme) => {
    const isDark = currentTheme !== 'light';
    
    return {
      "particles": {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        "color": {
          // White particles for dark theme, dark grey for light theme
          "value": isDark ? "#ffffff" : "#212121"
        },
        "shape": {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": isDark ? "#000000" : "#f5f5f5"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        "opacity": {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        "size": {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        "line_linked": {
          "enable": true,
          "distance": 150,
          // White lines for dark theme, dark grey for light theme
          "color": isDark ? "#ffffff" : "#212121",
          "opacity": 0.4,
          "width": 1
        },
        "move": {
          "enable": true,
          "speed": 4,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        }
      },
      "interactivity": {
        "detect_on": "window",
        "events": {
          "onhover": {
            "enable": false,
            "mode": "repulse"
          },
          "onclick": {
            "enable": true,
            "mode": "push"
          },
          "resize": true
        },
        "modes": {
          "grab": {
            "distance": 400,
            "line_linked": {
              "opacity": 1
            }
          },
          "bubble": {
            "distance": 400,
            "size": 40,
            "duration": 2,
            "opacity": 8,
            "speed": 3
          },
          "repulse": {
            "distance": 200,
            "duration": 0.4
          },
          "push": {
            "particles_nb": 4
          },
          "remove": {
            "particles_nb": 2
          }
        }
      },
      "retina_detect": true
    };
  };

  useEffect(() => {
    // Only run in browser environment
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      // Check initial theme
      const rootElement = document.documentElement;
      const initialTheme = rootElement.classList.contains('light') ? 'light' : 'dark';
      setTheme(initialTheme);

      // Create and load particles.js script
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js';
      script.async = true;
      document.body.appendChild(script);

      // Function to initialize or reinitialize particles
      const initParticles = (currentTheme) => {
        if (window.particlesJS) {
          const particlesElement = document.getElementById('particles-js');
          if (particlesElement) {
            // Get config based on current theme
            const config = getParticlesConfig(currentTheme);
            
            // Clear existing particles if any
            if (window.pJSDom && window.pJSDom.length > 0) {
              window.pJSDom[0].pJS.fn.vendors.destroypJS();
              window.pJSDom = [];
            }
            
            // Initialize with new config
            window.particlesJS('particles-js', config);
          }
        }
      };

      // Initialize particles when script is loaded
      script.onload = () => {
        initParticles(initialTheme);
      };

      // Set up a mutation observer to watch for theme changes
      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const newTheme = rootElement.classList.contains('light') ? 'light' : 'dark';
            if (newTheme !== theme) {
              setTheme(newTheme);
              initParticles(newTheme);
            }
          }
        });
      });

      observer.observe(rootElement, { attributes: true });

      // Cleanup function
      return () => {
        if (script.parentNode) {
          document.body.removeChild(script);
        }
        observer.disconnect();
        if (window.pJSDom && window.pJSDom.length > 0) {
          window.pJSDom[0].pJS.fn.vendors.destroypJS();
        }
      };
    }
  }, [theme]);

  return (
    <div 
      id="particles-js" 
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // This ensures it stays behind other content
        pointerEvents: 'auto' // This allows interaction with the particles
      }}
    ></div>
  );
}
