// components/DrawingCanvas.js
import { useRef, useEffect, useState} from 'react';
import PropTypes from 'prop-types';
// import './DrawingCanvas.css';

function DrawingCanvas({ setUserDrawing }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = 5;
    context.lineCap = 'round';
  }, []);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.beginPath();
    context.moveTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.lineTo(
      e.nativeEvent.offsetX,
      e.nativeEvent.offsetY
    );
    context.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    setUserDrawing(canvas.toDataURL());
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    setUserDrawing(null);
  };

  return (
    <div className="canvas-container">
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
      />
      <button onClick={clearCanvas}>Clear</button>
    </div>
  );
}

DrawingCanvas.propTypes = {
  setUserDrawing: PropTypes.func.isRequired,
};

export default DrawingCanvas;