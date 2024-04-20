import React, { useRef, useEffect } from 'react';

const AnimatedSVG = ({ children }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            svgRef.current.classList.add('animate');
          } else {
            svgRef.current.classList.remove('animate');
          }
        });
      },
      { threshold: 0.5 } // Adjust the threshold as needed
    );

    const currentSvgRef = svgRef.current; // Store the current value of svgRef.current

    if (currentSvgRef) {
      observer.observe(currentSvgRef);
    }

    return () => {
      if (currentSvgRef) {
        observer.unobserve(currentSvgRef);
      }
    };
  }, []);

  return (
    <div ref={svgRef} className="animated-svg">
      {children}
    </div>
  );
};

export default AnimatedSVG;