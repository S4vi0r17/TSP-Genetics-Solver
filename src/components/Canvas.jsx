import React, { useRef, useEffect } from 'react';

const Canvas = ({ points, drawLine, handleCanvasClick }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    points.forEach(({ x, y }) => {
      ctx.fillStyle = 'red';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });

    // Draw lines
    if (points.length > 1) {
      for (let i = 0; i < points.length - 1; i++) {
        drawLine(ctx, points[i], points[i + 1]);
      }
    }
  }, [points, drawLine]);

  return (
    <canvas
      ref={canvasRef}
      width={800}
      height={600}
      style={{ border: '1px solid black' }}
      onClick={handleCanvasClick}
    />
  );
};

export default Canvas;
