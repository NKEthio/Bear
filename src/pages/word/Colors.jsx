// ShapeExplorer.jsx
import React, { useState } from 'react';
import './Colors.css';

/**
 * ShapeExplorer Component
 * An interactive educational component for teaching kids about colors and shapes
 */
const ShapeExplorer = () => {
  // Define shape data with colors and SVG paths
  const shapes = [
    {
      id: 'circle',
      name: 'Circle',
      color: 'red',
      fillColor: '#f87171', // Color inside the shape
      path: 'M50 50 A25 25 0 1 1 50 49.999 Z',
    },
    {
      id: 'square',
      name: 'Square',
      color: 'blue',
      fillColor: '#60a5fa',
      path: 'M25 25 H75 V75 H25 Z',
    },
    {
      id: 'triangle',
      name: 'Triangle',
      color: 'yellow',
      fillColor: '#facc15',
      path: 'M50 25 L75 75 H25 Z',
    },
    {
      id: 'star',
      name: 'Star',
      color: 'green',
      fillColor: '#4ade80',
      path: 'M50 15 L61 35 L82 35 L66 50 L71 72 L50 58 L29 72 L34 50 L18 35 L39 35 Z',
    },
  ];

  // State for tracking the currently selected shape
  const [selectedShape, setSelectedShape] = useState(null);

  /**
   * Handles shape click events
   * @param {Object} shape - The clicked shape object
   */
  const handleShapeClick = (shape) => {
    setSelectedShape(shape.id);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(
        `${shape.color} ${shape.name}`
      );
      utterance.pitch = 1.2;
      utterance.rate = 0.6;
      window.speechSynthesis.speak(utterance);
    } else {
      console.log('Text-to-speech not supported in this browser');
    }

    setTimeout(() => setSelectedShape(null), 500);
  };

  return (
    <div className="shape-explorer">
      <h1 className="title" aria-label="Shape Explorer Title">
        Shape Explorer
      </h1>

      <div 
        className="shape-grid"
        role="grid"
        aria-label="Shape selection grid"
      >
        {shapes.map((shape) => (
          <button
            key={shape.id}
            className={`shape-card ${
              selectedShape === shape.id ? 'bounce' : ''
            }`}
            onClick={() => handleShapeClick(shape)}
            aria-label={`${shape.color} ${shape.name}`}
            role="gridcell"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleShapeClick(shape)}
          >
            <svg
              width="80"
              height="80"
              viewBox="0 0 100 100"
              className="shape-svg"
              aria-hidden="true"
            >
              <path
                d={shape.path}
                fill={shape.fillColor} // Color inside the shape
                stroke="#333" // Dark border for contrast
                strokeWidth="2"
              />
            </svg>
            <span className="shape-name">{shape.name}</span>
          </button>
        ))}
      </div>

      <p className="instructions" aria-label="Instructions">
        Click a shape to hear its name and color!
      </p>
    </div>
  );
};

ShapeExplorer.displayName = 'ShapeExplorer';

export default ShapeExplorer;