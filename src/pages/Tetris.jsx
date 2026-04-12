import { useState, useEffect, useCallback, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import SplashScreen from '../components/tetris/SplashScreen';
import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import GameBoard from '../components/tetris/GameBoard';
import NextPiece from '../components/tetris/NextPiece';
import GameStats from '../components/tetris/GameStats';
import GameControls from '../components/tetris/GameControls';
import {
  createEmptyBoard,
  getRandomPiece,
  rotate,
  isValidPosition,
  placePiece,
  clearLines,
  getSpeed,
  POINTS,
  LINES_PER_LEVEL,
} from '../lib/tetrisEngine';

export default function Tetris() {
  const [board, setBoard] = useState(createEmptyBoard());
  const [currentPiece, setCurrentPiece] = useState(null);
  const [nextPiece, setNextPiece] = useState(null);
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(0);
  const [lines, setLines] = useState(0);
  const [gameState, setGameState] = useState('idle'); // idle, playing, paused, gameover
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('tetris_highscore');
    return saved ? parseInt(saved) : 0;
  });

  const gameLoopRef = useRef(null);
  const boardRef = useRef(board);
  const currentPieceRef = useRef(currentPiece);
  const levelRef = useRef(level);
  const linesRef = useRef(lines);
  const gameStateRef = useRef(gameState);

  boardRef.current = board;
  currentPieceRef.current = currentPiece;
  levelRef.current = level;
  linesRef.current = lines;
  gameStateRef.current = gameState;

  const spawnPiece = useCallback(() => {
    const piece = nextPiece || getRandomPiece();
    const next = getRandomPiece();
    
    if (!isValidPosition(boardRef.current, piece.shape, piece.x, piece.y)) {
      setGameState('gameover');
      setCurrentPiece(null);
      return;
    }

    setCurrentPiece(piece);
    setNextPiece(next);
  }, [nextPiece]);

  const lockPiece = useCallback(() => {
    const piece = currentPieceRef.current;
    if (!piece) return;

    const newBoard = placePiece(boardRef.current, piece);
    const { board: clearedBoard, linesCleared } = clearLines(newBoard);

    setBoard(clearedBoard);

    if (linesCleared > 0) {
      const newLines = linesRef.current + linesCleared;
      const newLevel = Math.floor(newLines / LINES_PER_LEVEL);
      setScore(prev => prev + (POINTS[linesCleared] || 0) * (levelRef.current + 1));
      setLines(newLines);
      setLevel(newLevel);
    }

    setCurrentPiece(null);
  }, []);

  const moveDown = useCallback(() => {
    const piece = currentPieceRef.current;
    if (!piece) return;

    if (isValidPosition(boardRef.current, piece.shape, piece.x, piece.y + 1)) {
      setCurrentPiece(prev => prev ? { ...prev, y: prev.y + 1 } : null);
    } else {
      lockPiece();
    }
  }, [lockPiece]);

  const moveHorizontal = useCallback((dir) => {
    const piece = currentPieceRef.current;
    if (!piece || gameStateRef.current !== 'playing') return;

    if (isValidPosition(boardRef.current, piece.shape, piece.x + dir, piece.y)) {
      setCurrentPiece(prev => prev ? { ...prev, x: prev.x + dir } : null);
    }
  }, []);

  const rotatePiece = useCallback(() => {
    const piece = currentPieceRef.current;
    if (!piece || gameStateRef.current !== 'playing') return;

    const rotated = rotate(piece.shape);
    // Try normal position, then wall kicks
    const kicks = [0, -1, 1, -2, 2];
    for (const kick of kicks) {
      if (isValidPosition(boardRef.current, rotated, piece.x + kick, piece.y)) {
        setCurrentPiece(prev => prev ? { ...prev, shape: rotated, x: prev.x + kick } : null);
        return;
      }
    }
  }, []);

  const hardDrop = useCallback(() => {
    const piece = currentPieceRef.current;
    if (!piece || gameStateRef.current !== 'playing') return;

    let dropY = piece.y;
    while (isValidPosition(boardRef.current, piece.shape, piece.x, dropY + 1)) {
      dropY++;
    }
    const dropDistance = dropY - piece.y;
    setScore(prev => prev + dropDistance * 2);
    setCurrentPiece(prev => prev ? { ...prev, y: dropY } : null);
    // Lock immediately after state update
    setTimeout(() => lockPiece(), 0);
  }, [lockPiece]);

  const softDrop = useCallback(() => {
    if (gameStateRef.current !== 'playing') return;
    setScore(prev => prev + 1);
    moveDown();
  }, [moveDown]);

  // Spawn piece when current is null
  useEffect(() => {
    if (gameState === 'playing' && !currentPiece) {
      spawnPiece();
    }
  }, [currentPiece, gameState, spawnPiece]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
      return;
    }

    gameLoopRef.current = setInterval(() => {
      moveDown();
    }, getSpeed(level));

    return () => {
      if (gameLoopRef.current) clearInterval(gameLoopRef.current);
    };
  }, [gameState, level, moveDown]);

  // Prevent page scroll/zoom on game keys
  useEffect(() => {
    const preventScroll = (e) => {
      if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' '].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener('keydown', preventScroll, { passive: false });
    return () => window.removeEventListener('keydown', preventScroll);
  }, []);

  // Prevent pinch zoom and pull-to-refresh on mobile
  useEffect(() => {
    const preventTouch = (e) => {
      if (e.touches.length > 1) e.preventDefault();
    };
    const preventPull = (e) => {
      if (e.target.closest('.game-area') && !e.target.closest('button')) e.preventDefault();
    };
    document.addEventListener('touchmove', preventTouch, { passive: false });
    document.addEventListener('touchstart', preventPull, { passive: false });
    return () => {
      document.removeEventListener('touchmove', preventTouch);
      document.removeEventListener('touchstart', preventPull);
    };
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (gameStateRef.current !== 'playing') {
        if (e.key === 'Enter' && gameStateRef.current === 'idle') startGame();
        return;
      }
      switch (e.key) {
        case 'ArrowLeft':  e.preventDefault(); moveHorizontal(-1); break;
        case 'ArrowRight': e.preventDefault(); moveHorizontal(1);  break;
        case 'ArrowDown':  e.preventDefault(); softDrop();          break;
        case 'ArrowUp':    e.preventDefault(); rotatePiece();       break;
        case ' ':          e.preventDefault(); hardDrop();          break;
        case 'p': case 'P': setGameState('paused'); break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveHorizontal, softDrop, rotatePiece, hardDrop]);

  // Save high score
  useEffect(() => {
    if (gameState === 'gameover' && score > highScore) {
      setHighScore(score);
      localStorage.setItem('tetris_highscore', score.toString());
    }
  }, [gameState, score, highScore]);

  const startGame = () => {
    setBoard(createEmptyBoard());
    setCurrentPiece(null);
    setNextPiece(null);
    setScore(0);
    setLevel(0);
    setLines(0);
    setGameState('playing');
  };

  const togglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  };

  return (
    <>
    <AnimatePresence>
      {gameState === 'idle' && (
        <SplashScreen highScore={highScore} onStart={startGame} />
      )}
    </AnimatePresence>
    <div className="game-area min-h-screen bg-black overflow-hidden relative select-none" style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}>
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            radial-gradient(ellipse at 20% 50%, rgba(0,255,255,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 50%, rgba(255,0,255,0.05) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 0%, rgba(0,100,255,0.03) 0%, transparent 50%)
          `,
        }} />
        {/* Grid lines */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      <div className="relative z-10 flex flex-col items-center min-h-dvh md:min-h-screen h-dvh md:h-auto overflow-hidden pt-2 md:pt-4 pb-[calc(env(safe-area-inset-bottom)+0.5rem)] md:pb-4 px-3 md:px-4">
        {/* Title */}
        <h1 className="w-full shrink-0 text-center text-xl sm:text-2xl md:text-4xl font-bold tracking-[0.22em] sm:tracking-[0.28em] md:tracking-[0.4em] uppercase mb-1 md:mb-4 text-transparent bg-clip-text"
          style={{
            backgroundImage: 'linear-gradient(135deg, #0ff, #f0f, #0ff)',
            textShadow: '0 0 40px rgba(0,255,255,0.3)',
          }}>
          TETRIS
        </h1>

        {/* High Score */}
        <p className="shrink-0 text-[9px] sm:text-[10px] md:text-xs tracking-[0.12em] sm:tracking-[0.16em] md:tracking-[0.2em] text-cyan-400/40 font-mono mb-1 md:mb-4">
          RECORDE: {highScore.toLocaleString()}
        </p>

        <div className="md:hidden shrink-0 w-full max-w-sm mb-1 grid grid-cols-4 gap-1 items-stretch">
          <NextPiece piece={nextPiece} compact className="h-full" />
          <GameStats score={score} level={level} lines={lines} compact horizontal className="col-span-3" />
        </div>

        {/* Game Area */}
        <div className="flex-1 min-h-0 w-full flex gap-0 md:gap-6 items-center md:items-start justify-center">
          {/* Stats - left side (desktop) */}
          <div className="hidden md:block w-36">
            <GameStats score={score} level={level} lines={lines} />
          </div>

          {/* Board */}
          <div className="w-full max-w-[min(84vw,calc((100dvh-17rem-env(safe-area-inset-bottom))/2))] sm:max-w-[min(80vw,calc((100dvh-17.5rem-env(safe-area-inset-bottom))/2))] md:w-[300px] md:max-w-none">
            <GameBoard board={board} currentPiece={currentPiece} />
          </div>

          {/* Right panel */}
          <div className="hidden md:block w-36 space-y-4">
            <div className="hidden md:block">
              <NextPiece piece={nextPiece} />
            </div>

            {/* Controls */}
            <div className="hidden md:flex flex-col gap-2">
              {gameState === 'idle' ? (
                <Button
                  onClick={startGame}
                  className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                  variant="outline"
                >
                  <Play className="w-4 h-4 mr-2" /> Jogar
                </Button>
              ) : gameState === 'gameover' ? (
                <Button
                  onClick={startGame}
                  className="w-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-400 border border-fuchsia-500/30"
                  variant="outline"
                >
                  <RotateCcw className="w-4 h-4 mr-2" /> Reiniciar
                </Button>
              ) : (
                <Button
                  onClick={togglePause}
                  className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30"
                  variant="outline"
                >
                  {gameState === 'paused' ? (
                    <><Play className="w-4 h-4 mr-2" /> Continuar</>
                  ) : (
                    <><Pause className="w-4 h-4 mr-2" /> Pausar</>
                  )}
                </Button>
              )}
            </div>

            {/* Keyboard hints */}
            <div className="hidden md:block text-[10px] text-cyan-400/30 space-y-1 font-mono">
              <p>← → Mover</p>
              <p>↑ Rotacionar</p>
              <p>↓ Descer</p>
              <p>ESPAÇO Drop</p>
              <p>P Pausar</p>
            </div>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="md:hidden shrink-0 mt-1 w-full max-w-sm pb-[env(safe-area-inset-bottom)]">
          {gameState === 'idle' ? (
            <Button onClick={startGame} className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30 h-11 text-sm" variant="outline">
              <Play className="w-4 h-4 mr-2" /> Jogar
            </Button>
          ) : gameState === 'gameover' ? (
            <Button onClick={startGame} className="w-full bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-400 border border-fuchsia-500/30 h-11 text-sm" variant="outline">
              <RotateCcw className="w-4 h-4 mr-2" /> Reiniciar
            </Button>
          ) : (
            <>
              <GameControls
                onMove={moveHorizontal}
                onRotate={rotatePiece}
                onDrop={hardDrop}
                onSoftDrop={softDrop}
              />
              <Button onClick={togglePause} className="w-full mt-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400/60 border border-cyan-500/20 h-8 text-xs" variant="outline">
                {gameState === 'paused' ? 'Continuar' : 'Pausar'}
              </Button>
            </>
          )}
        </div>

        {/* Overlays */}
        {gameState === 'paused' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold tracking-[0.3em] text-cyan-400 mb-4"
                style={{ textShadow: '0 0 30px rgba(0,255,255,0.5)' }}>
                PAUSADO
              </h2>
              <Button onClick={togglePause} className="w-full bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-400 border border-cyan-500/30" variant="outline">
                <Play className="w-4 h-4 mr-2" /> Continuar
              </Button>
              <Button onClick={() => setGameState('idle')} className="w-full bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" /> Desistir
              </Button>
            </div>
          </div>
        )}

        {gameState === 'gameover' && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold tracking-[0.3em] text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #f00, #f0f)',
                  textShadow: '0 0 30px rgba(255,0,0,0.5)',
                }}>
                GAME OVER
              </h2>
              <div className="space-y-1">
                <p className="text-cyan-400/60 text-sm font-mono">Pontuação: {score.toLocaleString()}</p>
                <p className="text-cyan-400/60 text-sm font-mono">Nível: {level + 1}</p>
                <p className="text-cyan-400/60 text-sm font-mono">Linhas: {lines}</p>
                {score >= highScore && score > 0 && (
                  <p className="text-yellow-400 text-sm font-mono mt-2"
                    style={{ textShadow: '0 0 10px rgba(255,200,0,0.5)' }}>
                    ★ Novo Recorde! ★
                  </p>
                )}
              </div>
              <Button onClick={startGame} className="bg-fuchsia-500/20 hover:bg-fuchsia-500/30 text-fuchsia-400 border border-fuchsia-500/30" variant="outline">
                <RotateCcw className="w-4 h-4 mr-2" /> Jogar Novamente
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
    </>
  );
}
