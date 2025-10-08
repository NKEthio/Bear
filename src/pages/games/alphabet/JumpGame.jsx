import { useRef, useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import './JumpGame.css';

/**
 * JumpGame component: A canvas-based game where a player jumps to hit a target letter box.
 * @param {Object} props - Component props
 * @param {number} [props.initialScore=0] - Initial score
 * @param {number} [props.canvasWidth=800] - Canvas width in pixels
 * @param {number} [props.canvasHeight=400] - Canvas height in pixels
 */
const JumpGame = ({ initialScore = 0, canvasWidth = 800, canvasHeight = 400 }) => {
  const canvasRef = useRef(null);
  const [score, setScore] = useState(initialScore);
  const [highScore, setHighScore] = useState(() => {
    return Number(localStorage.getItem('jumpGameHighScore')) || 0;
  });
  const [time, setTime] = useState(0);
  const [misses, setMisses] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [error, setError] = useState(null);
  const gameState = useRef({
    player: { x: 50, y: 0, width: 30, height: 50, vy: 0, jumping: false },
    letters: [],
    targetLetter: 'A',
    lastSpawn: 0,
    gravity: 800, // Pixels per second^2
    jumpPower: -300, // Pixels per second
    letterSpeed: -150, // Pixels per second
    spawnInterval: 1500, // Milliseconds
  });
  const animationFrameId = useRef(null);
  const lastTime = useRef(0);
  const timerRef = useRef(null);

  // Generate random letter
  const getRandomLetter = useCallback(() => {
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return letters[Math.floor(Math.random() * letters.length)];
  }, []);

  // Collision detection
  const checkCollision = useCallback((player, letter) => {
    return (
      player.x < letter.x + letter.width &&
      player.x + player.width > letter.x &&
      player.y < letter.y + letter.height &&
      player.y + player.height > letter.y
    );
  }, []);

  // Handle jump
  const handleJump = useCallback(() => {
    if (!isPaused && !isGameOver && !gameState.current.player.jumping) {
      gameState.current.player.vy = gameState.current.jumpPower;
      gameState.current.player.jumping = true;
    }
  }, [isPaused, isGameOver]);

  // Toggle pause
  const togglePause = useCallback(() => {
    if (!isGameOver) {
      setIsPaused((prev) => !prev);
    }
  }, [isGameOver]);

  // Restart game
  const restartGame = useCallback(() => {
    setScore(initialScore);
    setTime(0);
    setMisses(0);
    setIsGameOver(false);
    setIsPaused(false);
    gameState.current = {
      player: { x: 50, y: 0, width: 30, height: 50, vy: 0, jumping: false },
      letters: [],
      targetLetter: getRandomLetter(),
      lastSpawn: 0,
      gravity: 800,
      jumpPower: -300,
      letterSpeed: -150,
      spawnInterval: 1500,
    };
  }, [initialScore, getRandomLetter]);

  // Game loop
  const update = useCallback(
    (currentTime) => {
      if (isPaused || isGameOver) {
        animationFrameId.current = requestAnimationFrame(update);
        return;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setError('Canvas context not supported');
        return;
      }

      const deltaTime = (currentTime - lastTime.current) / 1000; // Seconds
      lastTime.current = currentTime;

      const { player, letters } = gameState.current;
      const canvasHeight = canvas.height;

      // Update player
      player.vy += gameState.current.gravity * deltaTime;
      player.y += player.vy * deltaTime;
      if (player.y >= canvasHeight - player.height) {
        player.y = canvasHeight - player.height;
        player.vy = 0;
        player.jumping = false;
      }

      // Spawn letter boxes
      if (currentTime - gameState.current.lastSpawn > gameState.current.spawnInterval) {
        letters.push({
          x: canvas.width,
          y: canvasHeight - 60,
          width: 30,
          height: 30,
          char: getRandomLetter(),
        });
        gameState.current.lastSpawn = currentTime;
        if (Math.random() < 0.3) {
          gameState.current.targetLetter = getRandomLetter();
        }
      }

      // Update letter boxes
      letters.forEach((letter, index) => {
        letter.x += gameState.current.letterSpeed * deltaTime;
        if (checkCollision(player, letter)) {
          if (letter.char === gameState.current.targetLetter) {
            setScore((prev) => prev + 10);
          } else {
            setScore((prev) => prev - 5);
            setMisses((prev) => prev + 1);
          }
          letters.splice(index, 1);
        }
        if (letter.x < -letter.width) {
          if (letter.char === gameState.current.targetLetter) {
            setScore((prev) => prev - 5);
            setMisses((prev) => prev + 1);
          }
          letters.splice(index, 1);
        }
      });

      // Check game over
      if (misses >= 5) {
        setIsGameOver(true);
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('jumpGameHighScore', score);
        }
      }

      // Render
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      // Draw ground
      ctx.fillStyle = '#ddd';
      ctx.fillRect(0, canvasHeight - 30, canvas.width, 30);
      // Draw player
      ctx.fillStyle = 'blue';
      ctx.fillRect(player.x, player.y, player.width, player.height);
      // Draw letter boxes
      letters.forEach((letter) => {
        ctx.fillStyle = '#fff';
        ctx.strokeStyle = letter.char === gameState.current.targetLetter ? 'red' : 'black';
        ctx.lineWidth = 2;
        ctx.fillRect(letter.x, letter.y, letter.width, letter.height);
        ctx.strokeRect(letter.x, letter.y, letter.width, letter.height);
        ctx.fillStyle = 'black';
        ctx.font = '20px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(letter.char, letter.x + letter.width / 2, letter.y + letter.height / 2);
      });
      // Draw HUD
      ctx.fillStyle = 'black';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.font = '20px Arial';
      ctx.fillText(`Score: ${score}`, 10, 10);
      ctx.fillText(`High Score: ${highScore}`, 10, 40);
      ctx.fillText(`Time: ${time}s`, 10, 70);
      ctx.fillText(`Target: ${gameState.current.targetLetter}`, 10, 100);
      ctx.fillText(`Misses: ${misses}/5`, 10, 130);
      if (isPaused) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Paused', canvas.width / 2, canvas.height / 2);
      }
      if (isGameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '40px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
        ctx.font = '20px Arial';
        ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
        ctx.fillText('Press R or Restart to Play Again', canvas.width / 2, canvas.height / 2 + 60);
      }

      animationFrameId.current = requestAnimationFrame(update);
    },
    [score, highScore, time, misses, isPaused, isGameOver, checkCollision, getRandomLetter]
  );

  // Initialize game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.getContext) {
      setError('Canvas not supported in this browser');
      return;
    }

    // Set canvas size
    const updateCanvasSize = () => {
      const maxWidth = window.innerWidth * 0.9;
      const maxHeight = window.innerHeight * 0.7;
      canvas.width = Math.min(canvasWidth, maxWidth);
      canvas.height = Math.min(canvasHeight, maxHeight);
      gameState.current.player.y = canvas.height - gameState.current.player.height;
    };
    updateCanvasSize();

    // Timer
    timerRef.current = setInterval(() => {
      if (!isPaused && !isGameOver) {
        setTime((prev) => prev + 1);
      }
    }, 1000);

    // Input handlers
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent page scrolling
        handleJump();
      }
      if (e.code === 'KeyP') togglePause();
      if (e.code === 'KeyR' && isGameOver) restartGame();
    };
    window.addEventListener('keydown', handleKeyDown);

    // Resize handler
    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(document.body);

    // Start game loop
    lastTime.current = performance.now();
    animationFrameId.current = requestAnimationFrame(update);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      clearInterval(timerRef.current);
      window.removeEventListener('keydown', handleKeyDown);
      resizeObserver.disconnect();
    };
  }, [handleJump, togglePause, restartGame, update, canvasWidth, canvasHeight, isPaused, isGameOver]);

  if (error) {
    return (
      <div className="jump-game-container">
        <div className="jump-game-error" role="alert">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="jump-game-container">
      <div className="jump-game-controls" role="region" aria-label="Game Controls">
        <button
          onClick={handleJump}
          className="jump-game-button jump-game-jump-button"
          aria-label="Jump"
          disabled={isPaused || isGameOver}
        >
          JUMP
        </button>
        <button
          onClick={togglePause}
          className="jump-game-button"
          aria-label={isPaused ? 'Resume' : 'Pause'}
          disabled={isGameOver}
        >
          {isPaused ? 'Resume' : 'Pause'}
        </button>
        {isGameOver && (
          <button
            onClick={restartGame}
            className="jump-game-button"
            aria-label="Restart Game"
          >
            Restart
          </button>
        )}
      </div>
      <canvas
        ref={canvasRef}
        className="jump-game-canvas"
        role="img"
        aria-label="Jump Game Canvas"
      />
    </div>
  );
};

JumpGame.propTypes = {
  initialScore: PropTypes.number,
  canvasWidth: PropTypes.number,
  canvasHeight: PropTypes.number,
};

export default JumpGame;