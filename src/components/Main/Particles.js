import { useEffect, useState, useCallback, useMemo } from 'react';

export function Particles() {
  const [theme, setTheme] = useState('dark');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [gridDimensions, setGridDimensions] = useState({ cols: 0, rows: 0 });

  // Developer content arrays
  const developerContent = useMemo(() => ({
    code: ['const', 'function', '=>', '{}', '[]', 'async', 'await', 'return', 'import', 'export'],
    files: ['.tsx', '.js', '.css', '.json', '.md', '.yml', '.env', '.git', '.npm', '.svg'],
    tools: ['react', 'node', 'git', 'npm', 'vscode', 'webpack', 'babel', 'jest', 'docker', 'aws'],
    commands: ['ctrl+s', 'cmd+c', 'ctrl+z', 'cmd+v', 'ctrl+f', 'alt+tab', 'f12', 'ctrl+`', 'cmd+shift+p', 'ctrl+d']
  }), []);

  // Theme detection
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof document !== 'undefined') {
      const rootElement = document.documentElement;
      const initialTheme = rootElement.classList.contains('light') ? 'light' : 'dark';
      setTheme(initialTheme);

      const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
          if (mutation.attributeName === 'class') {
            const newTheme = rootElement.classList.contains('light') ? 'light' : 'dark';
            if (newTheme !== theme) {
              setTheme(newTheme);
            }
          }
        });
      });

      observer.observe(rootElement, { attributes: true });
      return () => observer.disconnect();
    }
  }, [theme]);

  // Grid dimensions calculation
  useEffect(() => {
    const calculateGrid = () => {
      const cellSize = 40; // Base cell size in pixels
      const cols = Math.floor(window.innerWidth / cellSize);
      const rows = Math.floor(window.innerHeight / cellSize);
      setGridDimensions({ cols, rows });
    };

    calculateGrid();
    window.addEventListener('resize', calculateGrid);
    return () => window.removeEventListener('resize', calculateGrid);
  }, []);

  // Throttled mouse and touch move handler
  const handlePointerMove = useCallback((x, y) => {
    setMousePos({ x, y });
  }, []);

  useEffect(() => {
    let timeoutId;
    
    const throttledMove = (x, y) => {
      if (timeoutId) return;
      timeoutId = setTimeout(() => {
        handlePointerMove(x, y);
        timeoutId = null;
      }, 16); // ~60fps
    };

    const handleMouseMove = (e) => {
      throttledMove(e.clientX, e.clientY);
    };

    const handleTouchMove = (e) => {
      // Allow scrolling while still tracking touch for particle effects
      if (e.touches.length > 0) {
        throttledMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches.length > 0) {
        throttledMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    // Add event listeners
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [handlePointerMove]);

  // Generate grid cells
  const gridCells = useMemo(() => {
    const cells = [];
    const cellSize = 40;
    const activationRadius = 120;

    for (let row = 0; row < gridDimensions.rows; row++) {
      for (let col = 0; col < gridDimensions.cols; col++) {
        const x = col * cellSize + cellSize / 2;
        const y = row * cellSize + cellSize / 2;
        
        // Calculate distance from mouse
        const distance = Math.sqrt(
          Math.pow(mousePos.x - x, 2) + Math.pow(mousePos.y - y, 2)
        );
        
        const isActive = distance < activationRadius;
        const intensity = isActive ? Math.max(0, 1 - distance / activationRadius) : 0;
        
        // Select random content if active
        let content = '';
        if (isActive && intensity > 0.3) {
          const contentTypes = Object.keys(developerContent);
          const randomType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
          const randomContent = developerContent[randomType];
          content = randomContent[Math.floor(Math.random() * randomContent.length)];
        }

        cells.push({
          id: `${row}-${col}`,
          x,
          y,
          isActive,
          intensity,
          content,
          row,
          col
        });
      }
    }
    return cells;
  }, [gridDimensions, mousePos, developerContent]);

  const isDark = theme !== 'light';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        background: isDark 
          ? 'linear-gradient(45deg, rgba(0,20,40,0.1) 0%, rgba(0,10,30,0.1) 100%)'
          : 'linear-gradient(45deg, rgba(240,248,255,0.1) 0%, rgba(230,240,250,0.1) 100%)',
        backgroundImage: isDark
          ? `linear-gradient(${isDark ? 'rgba(0,150,200,0.1)' : 'rgba(0,50,100,0.1)'} 1px, transparent 1px),
             linear-gradient(90deg, ${isDark ? 'rgba(0,150,200,0.1)' : 'rgba(0,50,100,0.1)'} 1px, transparent 1px)`
          : `linear-gradient(rgba(0,50,100,0.1) 1px, transparent 1px),
             linear-gradient(90deg, rgba(0,50,100,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    >
      {gridCells.map((cell) => (
        <div
          key={cell.id}
          style={{
            position: 'absolute',
            left: cell.x - 20,
            top: cell.y - 20,
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '10px',
            fontFamily: 'monospace',
            fontWeight: 'bold',
            color: isDark ? '#00d4ff' : '#0066cc',
            backgroundColor: cell.isActive 
              ? isDark 
                ? `rgba(0, 212, 255, ${cell.intensity * 0.1})`
                : `rgba(0, 102, 204, ${cell.intensity * 0.1})`
              : 'transparent',
            border: cell.isActive 
              ? `1px solid ${isDark ? 'rgba(0, 212, 255, ' + cell.intensity * 0.3 + ')' : 'rgba(0, 102, 204, ' + cell.intensity * 0.3 + ')'}`
              : 'none',
            borderRadius: '2px',
            transition: 'all 0.2s ease-out',
            opacity: cell.isActive ? cell.intensity : 0,
            transform: cell.isActive ? `scale(${1 + cell.intensity * 0.1})` : 'scale(1)',
            boxShadow: cell.isActive && cell.intensity > 0.5
              ? `0 0 10px ${isDark ? 'rgba(0, 212, 255, ' + cell.intensity * 0.3 + ')' : 'rgba(0, 102, 204, ' + cell.intensity * 0.3 + ')'}`
              : 'none',
            textShadow: cell.isActive && cell.intensity > 0.3
              ? `0 0 5px ${isDark ? 'rgba(0, 212, 255, 0.8)' : 'rgba(0, 102, 204, 0.8)'}`
              : 'none'
          }}
        >
          {cell.content}
        </div>
      ))}
      
      {/* Blueprint-style corner annotations */}
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          right: '20px',
          fontSize: '10px',
          fontFamily: 'monospace',
          color: isDark ? 'rgba(0, 212, 255, 0.4)' : 'rgba(0, 102, 204, 0.4)',
          textAlign: 'right',
          lineHeight: '1.2'
        }}
      >
        GRID: {gridDimensions.cols}×{gridDimensions.rows}<br/>
        INTERACTIVE BLUEPRINT v2.1<br/>
        DEVELOPER PORTFOLIO
      </div>
      
      <div
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          fontSize: '10px',
          fontFamily: 'monospace',
          color: isDark ? 'rgba(0, 212, 255, 0.4)' : 'rgba(0, 102, 204, 0.4)',
          lineHeight: '1.2'
        }}
      >
        THEME: {theme.toUpperCase()}<br/>
        STATUS: ACTIVE<br/>
        MOUSE: [{Math.round(mousePos.x)}, {Math.round(mousePos.y)}]
      </div>
    </div>
  );
}
