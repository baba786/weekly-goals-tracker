import React, { useEffect, useRef } from 'react';

const ProgressChart = () => {
  const canvasRef = useRef(null);
  
  // Sample data - in a real app, this would come from your API
  const data = [
    { week: 'Week 1', completion: 60 },
    { week: 'Week 2', completion: 75 },
    { week: 'Week 3', completion: 40 },
    { week: 'Week 4', completion: 90 },
    { week: 'Week 5', completion: 100 },
    { week: 'Week 6', completion: 80 },
    { week: 'Week 7', completion: 85 },
    { week: 'Week 8', completion: 95 },
  ];
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Chart configuration
    const paddingLeft = 50;
    const paddingRight = 20;
    const paddingTop = 20;
    const paddingBottom = 50;
    
    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;
    
    // Draw grid lines
    ctx.strokeStyle = '#e5e7eb'; // gray-200
    ctx.lineWidth = 1;
    
    // Horizontal grid lines
    for (let i = 0; i <= 10; i++) {
      const y = paddingTop + (chartHeight / 10) * i;
      ctx.beginPath();
      ctx.moveTo(paddingLeft, y);
      ctx.lineTo(width - paddingRight, y);
      ctx.stroke();
      
      // Y-axis labels (percentage)
      if (i % 2 === 0) {
        const label = 100 - (i * 10);
        ctx.font = '12px Inter, sans-serif';
        ctx.fillStyle = '#6b7280'; // gray-500
        ctx.textAlign = 'right';
        ctx.fillText(`${label}%`, paddingLeft - 10, y + 4);
      }
    }
    
    // Draw data points and line
    const dataPointRadius = 4;
    const dataPointStrokeWidth = 2;
    const barWidth = chartWidth / data.length / 2;
    
    // Draw bars
    data.forEach((point, index) => {
      const x = paddingLeft + (chartWidth / data.length) * (index + 0.5);
      const y = paddingTop + chartHeight - (chartHeight * point.completion / 100);
      const barHeight = (chartHeight * point.completion / 100);
      
      // Gradient for bars
      const gradient = ctx.createLinearGradient(x, y, x, paddingTop + chartHeight);
      gradient.addColorStop(0, 'rgba(79, 70, 229, 0.8)'); // indigo-600
      gradient.addColorStop(1, 'rgba(99, 102, 241, 0.3)'); // indigo-500 with transparency
      
      // Bar
      ctx.fillStyle = gradient;
      ctx.beginPath();
      
      // Use regular rectangle if roundRect is not supported
      if (ctx.roundRect) {
        ctx.roundRect(x - barWidth/2, y, barWidth, barHeight, 4);
      } else {
        ctx.rect(x - barWidth/2, y, barWidth, barHeight);
      }
      
      ctx.fill();
      
      // X-axis labels
      ctx.font = '12px Inter, sans-serif';
      ctx.fillStyle = '#6b7280'; // gray-500
      ctx.textAlign = 'center';
      ctx.fillText(point.week, x, paddingTop + chartHeight + 20);
      
      // Completion percentage above bar
      ctx.font = '10px Inter, sans-serif';
      ctx.fillStyle = '#6b7280'; // gray-500
      ctx.textAlign = 'center';
      ctx.fillText(`${point.completion}%`, x, y - 10);
    });
    
    // Line connecting data points
    ctx.beginPath();
    ctx.strokeStyle = '#4f46e5'; // indigo-600
    ctx.lineWidth = 3;
    
    data.forEach((point, index) => {
      const x = paddingLeft + (chartWidth / data.length) * (index + 0.5);
      const y = paddingTop + chartHeight - (chartHeight * point.completion / 100);
      
      if (index === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });
    
    ctx.stroke();
    
    // Data points (circles)
    data.forEach((point, index) => {
      const x = paddingLeft + (chartWidth / data.length) * (index + 0.5);
      const y = paddingTop + chartHeight - (chartHeight * point.completion / 100);
      
      // Draw point
      ctx.beginPath();
      ctx.arc(x, y, dataPointRadius + dataPointStrokeWidth, 0, Math.PI * 2);
      ctx.fillStyle = '#fff';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(x, y, dataPointRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#4f46e5'; // indigo-600
      ctx.fill();
    });
    
  }, [data]);
  
  return (
    <div className="w-full h-full">
      <canvas 
        ref={canvasRef} 
        width={700} 
        height={400}
        className="w-full h-full"
      ></canvas>
    </div>
  );
};

export default ProgressChart;