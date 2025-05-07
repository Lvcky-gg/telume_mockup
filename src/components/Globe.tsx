
import React, { useRef, useEffect } from 'react';

const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Make sure canvas is responsive
    const resize = () => {
      const container = canvas.parentElement;
      if (container) {
        const { width, height } = container.getBoundingClientRect();
        canvas.width = width;
        canvas.height = height;
      }
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    // Globe parameters
    const radius = Math.min(canvas.width, canvas.height) * 0.35;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    // Points of interest (longitude, latitude)
    const points = [
      { lon: 0, lat: 0, name: "Origin" },  
      { lon: -74, lat: 40, name: "New York" },
      { lon: -0.1, lat: 51.5, name: "London" },
      { lon: 139, lat: 35, name: "Tokyo" },
      { lon: 121, lat: 31, name: "Shanghai" },
      { lon: 55, lat: 25, name: "Dubai" },
      { lon: 28, lat: -26, name: "Johannesburg" },
      { lon: -118, lat: 34, name: "Los Angeles" },
      { lon: 151, lat: -34, name: "Sydney" },
      { lon: 77, lat: 28, name: "New Delhi" },
    ];
    
    // Rotation state
    let rotation = 0;
    let isDragging = false;
    let lastMouseX = 0;
    let rotationSpeed = 0.001;
    
    // Convert lat/lon to 3D coordinates
    const project = (lon: number, lat: number, r: number) => {
      const adjustedLon = lon - rotation;
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = adjustedLon * (Math.PI / 180);
      
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi);
      const z = r * Math.sin(phi) * Math.sin(theta);
      
      // Project 3D coordinates to 2D
      return {
        x: centerX + x,
        y: centerY - y,
        depth: z
      };
    };
    
    // Draw the globe
    const drawGlobe = () => {
      if (!ctx) return;
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw the globe outline
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(51, 153, 255, 0.8)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Fill with gradient
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, radius
      );
      gradient.addColorStop(0, 'rgba(12, 24, 36, 0.9)');
      gradient.addColorStop(0.7, 'rgba(16, 32, 64, 0.8)');
      gradient.addColorStop(1, 'rgba(20, 40, 80, 0.7)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw grid lines (meridians)
      for (let i = 0; i < 360; i += 15) {
        ctx.beginPath();
        for (let j = -90; j <= 90; j += 5) {
          const p = project(i, j, radius);
          if (p.depth > 0) { // Only show front-facing part
            if (j === -90) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = 'rgba(51, 153, 255, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Draw grid lines (parallels)
      for (let i = -75; i <= 75; i += 15) {
        ctx.beginPath();
        for (let j = 0; j < 360; j += 5) {
          const p = project(j, i, radius);
          if (p.depth > 0) { // Only show front-facing part
            if (j === 0) ctx.moveTo(p.x, p.y);
            else ctx.lineTo(p.x, p.y);
          }
        }
        ctx.strokeStyle = 'rgba(51, 153, 255, 0.2)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
      
      // Draw points of interest
      points.forEach(point => {
        const p = project(point.lon, point.lat, radius);
        
        // Only draw if on the visible side of the globe
        if (p.depth > 0) {
          // Point
          ctx.beginPath();
          ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(51, 153, 255, 0.7)';
          ctx.fill();
          
          // Pulsing circle
          ctx.beginPath();
          ctx.arc(p.x, p.y, 5, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(102, 179, 255, 0.5)';
          ctx.stroke();
          
          // Location name
          ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
          ctx.font = '10px Arial';
          ctx.fillText(point.name, p.x + 8, p.y + 4);
        }
      });
      
      // Update rotation
      if (!isDragging) {
        rotation += rotationSpeed;
        if (rotation > 360) rotation -= 360;
      }
      
      requestAnimationFrame(drawGlobe);
    };
    
    // Mouse interaction
    canvas.addEventListener('mousedown', (e) => {
      isDragging = true;
      lastMouseX = e.offsetX;
    });
    
    canvas.addEventListener('mousemove', (e) => {
      if (isDragging) {
        const dx = e.offsetX - lastMouseX;
        rotation += dx * 0.005;
        lastMouseX = e.offsetX;
      }
    });
    
    canvas.addEventListener('mouseup', () => {
      isDragging = false;
    });
    
    canvas.addEventListener('mouseleave', () => {
      isDragging = false;
    });
    
    // Start animation
    drawGlobe();
    
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="w-full h-full" />;
};

export default Globe;
