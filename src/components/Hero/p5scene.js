import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const FluidTextSimulation = () => {
  const containerRef = useRef(null);
  const sketchRef = useRef(null);

  useEffect(() => {
    // Define the p5.js sketch
    const sketch = (p) => {
      let particles = [];
      let textPoints = [];
      let textGraphics;
      let textSize = 150;
      let text = "Nico McGill";
      let sampleFactor = 0.8; // Increased from 0.4 for more detailed text sampling
      let pressureField = [];
      let fieldResolution = 10; // Decreased from 20 for higher resolution pressure field
      let cols, rows;
      let textPointsMap = {}; // For faster text point lookup
      
      p.setup = () => {
        // Create canvas that fills the container
        const canvas = p.createCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        canvas.parent(containerRef.current);
        
        // Set up pressure field grid
        cols = Math.floor(p.width / fieldResolution);
        rows = Math.floor(p.height / fieldResolution);
        
        // Create off-screen graphics buffer for the text
        textGraphics = p.createGraphics(p.width, p.height);
        textGraphics.background(0, 0);
        textGraphics.fill(255);
        textGraphics.textFont('Helvetica');
        textGraphics.textSize(textSize);
        textGraphics.textAlign(p.CENTER, p.CENTER);
        textGraphics.text(text, p.width/2, p.height/2);
        
        // Sample points from the text
        sampleTextPoints();
        
        // Initialize pressure field
        initPressureField();
        
        // Create particles
        for (let i = 0; i < 5000; i++) {
          particles.push(new Particle());
        }
      };
      
      const initPressureField = () => {
        // Initialize pressure field with high pressure everywhere
        pressureField = new Array(cols);
        for (let i = 0; i < cols; i++) {
          pressureField[i] = new Array(rows).fill(1.0);
        }
        
        // Set low pressure at text points (using map for faster lookup)
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const key = `${i},${j}`;
            if (textPointsMap[key]) {
              pressureField[i][j] = 0.0;
            }
          }
        }
        
        // Expand the low pressure field around text (create a gravity well)
        smoothPressureField(5); // Increased from 3 for smoother pressure field
      };
      
      const smoothPressureField = (passes) => {
        for (let pass = 0; pass < passes; pass++) {
          let newField = new Array(cols);
          for (let i = 0; i < cols; i++) {
            newField[i] = new Array(rows);
          }
          
          // Apply smoothing
          for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
              let sum = 0;
              let count = 0;
              
              // Check neighbors (only direct neighbors for speed)
              for (let ni = -1; ni <= 1; ni++) {
                for (let nj = -1; nj <= 1; nj++) {
                  let ni_idx = i + ni;
                  let nj_idx = j + nj;
                  
                  if (ni_idx >= 0 && ni_idx < cols && nj_idx >= 0 && nj_idx < rows) {
                    sum += pressureField[ni_idx][nj_idx];
                    count++;
                  }
                }
              }
              
              // Average pressure of neighbors
              newField[i][j] = sum / count;
              
              // Keep text points as low pressure
              const key = `${i},${j}`;
              if (textPointsMap[key]) {
                newField[i][j] = 0.0;
              }
            }
          }
          
          pressureField = newField;
        }
      };
      
      const sampleTextPoints = () => {
        textPoints = [];
        textPointsMap = {}; // Reset map
        textGraphics.loadPixels();
        
        const stepSize = Math.floor(1/sampleFactor);
        
        for (let y = 0; y < textGraphics.height; y += stepSize) {
          for (let x = 0; x < textGraphics.width; x += stepSize) {
            const index = 4 * (y * textGraphics.width + x);
            if (textGraphics.pixels[index] > 180) {
              textPoints.push(p.createVector(x, y));
              
              // Add to map for faster lookup
              const col = Math.floor(x / fieldResolution);
              const row = Math.floor(y / fieldResolution);
              const key = `${col},${row}`;
              textPointsMap[key] = true;
            }
          }
        }
        console.log(`Sampled ${textPoints.length} points from text`);
      };
      
      p.draw = () => {
        p.background(0, 15);
        
        // Update mouse pressure (create high pressure at mouse)
        updateMousePressure();
        
        // Restore pressure field to normal state
        restorePressureField();
        
        // Update and display particles
        for (let particle of particles) {
          particle.update();
          particle.display();
        }
      };
      
      // Handle mouse click to generate particles
      p.mousePressed = () => {
        // Generate 100 particles at mouse position
        for (let i = 0; i < 100; i++) {
          let newParticle = new Particle(p.mouseX, p.mouseY);
          // Give truly random initial velocity in all directions
          let angle = p.random(0, p.TWO_PI);
          let magnitude = p.random(3, 8);
          newParticle.velocity = p.createVector(
            Math.cos(angle) * magnitude,
            Math.sin(angle) * magnitude
          );
          particles.push(newParticle);
        }
        return false; // Prevent default behavior
      };
      
      // Optimized mouse pressure update
      const updateMousePressure = () => {
        if (p.mouseX > 0 && p.mouseX < p.width && p.mouseY > 0 && p.mouseY < p.height) {
          // Get mouse grid position
          let mouseCol = Math.floor(p.mouseX / fieldResolution);
          let mouseRow = Math.floor(p.mouseY / fieldResolution);
          
          // Create high pressure around mouse
          const radius = 5;
          for (let i = -radius; i <= radius; i++) {
            for (let j = -radius; j <= radius; j++) {
              let col = mouseCol + i;
              let row = mouseRow + j;
              
              if (col >= 0 && col < cols && row >= 0 && row < rows) {
                // Distance from mouse
                let dist = Math.sqrt(i*i + j*j);
                if (dist <= radius) {
                  // Create high pressure that falls off with distance
                  let pressure = p.map(dist, 0, radius, 2.5, 1.0);
                  pressureField[col][row] = Math.max(pressureField[col][row], pressure);
                }
              }
            }
          }
        }
      };
      
      // Restore pressure field to normal state
      const restorePressureField = () => {
        // Gradually restore pressure everywhere
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            const key = `${i},${j}`;
            
            if (textPointsMap[key]) {
              // Text points should always be low pressure
              pressureField[i][j] = 0.0;
            } else {
              // Non-text areas gradually return to normal pressure
              pressureField[i][j] = p.lerp(pressureField[i][j], 1.0, 0.1);
            }
          }
        }
      };
      
      p.windowResized = () => {
        p.resizeCanvas(containerRef.current.offsetWidth, containerRef.current.offsetHeight);
        
        // Update grid dimensions
        cols = Math.floor(p.width / fieldResolution);
        rows = Math.floor(p.height / fieldResolution);
        
        // Recreate text graphics on resize
        textGraphics = p.createGraphics(p.width, p.height);
        textGraphics.background(0, 0);
        textGraphics.fill(255);
        textGraphics.textFont('Helvetica');
        textGraphics.textSize(textSize);
        textGraphics.textAlign(p.CENTER, p.CENTER);
        textGraphics.text(text, p.width/2, p.height/2);
        
        // Resample text points
        sampleTextPoints();
        
        // Reinitialize pressure field
        initPressureField();
      };
      
      class Particle {
        constructor(x, y) {
          // If x,y provided, create at that position, otherwise random
          this.position = x !== undefined && y !== undefined ? 
            p.createVector(x, y) : 
            p.createVector(p.random(p.width), p.random(p.height));
          
          this.velocity = p.createVector(p.random(-2, 2), p.random(-2, 2));
          this.acceleration = p.createVector(0, 0);
          this.maxSpeed = 10;
          this.maxForce = 0.8;
          this.size = p.random(3, 7);
          this.pressureSensitivity = p.random(0.9, 1.3);
          this.color = p.color(100, 150, 255, 150);
        }
        
        update() {
          // Reset acceleration
          this.acceleration.mult(0);
          
          // Follow pressure gradient (from high to low pressure)
          this.followPressureGradient();
          
          // Apply fluid dynamics
          this.applyFluidDynamics();
          
          // Update position
          this.velocity.add(this.acceleration);
          this.velocity.limit(this.maxSpeed);
          this.position.add(this.velocity);
          
          // Bounce off walls
          this.bounceOffWalls();
          
          // Update color based on pressure
          this.updateColor();
        }
        
        bounceOffWalls() {
          const bounce = 0.7;
          
          if (this.position.x < 0) {
            this.position.x = 0;
            this.velocity.x *= -bounce;
          } else if (this.position.x > p.width) {
            this.position.x = p.width;
            this.velocity.x *= -bounce;
          }
          
          if (this.position.y < 0) {
            this.position.y = 0;
            this.velocity.y *= -bounce;
          } else if (this.position.y > p.height) {
            this.position.y = p.height;
            this.velocity.y *= -bounce;
          }
        }
        
        followPressureGradient() {
          // Get current cell
          let col = Math.floor(this.position.x / fieldResolution);
          let row = Math.floor(this.position.y / fieldResolution);
          
          // Check if within bounds
          if (col < 0 || col >= cols - 1 || row < 0 || row >= rows - 1) return;
          
          // Calculate pressure gradient (direction from high to low pressure)
          let gradX = -(pressureField[col+1][row] - pressureField[col][row]);
          let gradY = -(pressureField[col][row+1] - pressureField[col][row]);
          
          // Create force from gradient (gas flows from high to low pressure)
          let force = p.createVector(gradX, gradY);
          
          // Scale force by pressure sensitivity and current pressure
          let currentPressure = pressureField[col][row];
          let forceMagnitude = 7 * this.pressureSensitivity * (1 + currentPressure);
          force.mult(forceMagnitude);
          
          // Apply force
          this.applyForce(force);
          
          // Additional behavior in low pressure areas (text)
          if (currentPressure < 0.3) {
            // If in a low pressure area (text), apply very strong damping
            this.velocity.mult(0.7); 
            
            // If very low pressure (center of text) almost stop completely

          }
        }
        
        applyFluidDynamics() {
          // Reduced damping for faster movement
          const drag = 0.98;
          this.velocity.mult(drag);
          
          // Add some random movement (Brownian motion)
          let brownian = p5.Vector.random2D();
          brownian.mult(0.05);
          this.applyForce(brownian);
        }
        
        updateColor() {
          // Get current pressure at particle position
          let col = Math.floor(this.position.x / fieldResolution);
          let row = Math.floor(this.position.y / fieldResolution);
          
          // Default pressure if out of bounds
          let pressure = 1.0;
          if (col >= 0 && col < cols && row >= 0 && row < rows) {
            pressure = pressureField[col][row];
          }
          
          // Color based on pressure
          let r, g, b;
          
          if (pressure < 0.5) {
            // Low pressure (text) - blue to cyan gradient
            r = p.map(pressure, 0, 0.5, 50, 100);
            g = p.map(pressure, 0, 0.5, 150, 200);
            b = 255;
          } else {
            // High pressure - cyan to purple gradient
            r = p.map(pressure, 0.5, 2.0, 100, 200);
            g = p.map(pressure, 0.5, 2.0, 200, 100);
            b = p.map(pressure, 0.5, 2.0, 255, 255);
          }
          
          // Set color with alpha based on pressure
          let alpha = p.map(pressure, 0, 2.0, 200, 150);
          this.color = p.color(r, g, b, alpha);
        }
        
        applyForce(force) {
          this.acceleration.add(force);
        }
        
        display() {
          p.noStroke();
          p.fill(this.color);
          p.ellipse(this.position.x, this.position.y, this.size, this.size);
        }
      }
    };

    // Create a new p5 instance
    sketchRef.current = new p5(sketch);

    // Cleanup on unmount
    return () => {
      if (sketchRef.current) {
        sketchRef.current.remove();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100%', 
        background: '#111',
        position: 'relative'
      }}
    />
  );
};

export default FluidTextSimulation;