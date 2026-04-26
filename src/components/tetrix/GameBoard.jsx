import { BOARD_WIDTH, BOARD_HEIGHT, getGhostPosition } from '../../lib/tetrixEngine';

export default function GameBoard({ board, currentPiece }) {
  // Build display board with current piece and ghost
  const displayBoard = board.map(row => [...row]);
  
  if (currentPiece) {
    // Ghost piece
    const ghostY = getGhostPosition(board, currentPiece);
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const y = ghostY + r;
          const x = currentPiece.x + c;
          if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH && !displayBoard[y][x]) {
            displayBoard[y][x] = 'ghost';
          }
        }
      }
    }
    // Current piece
    for (let r = 0; r < currentPiece.shape.length; r++) {
      for (let c = 0; c < currentPiece.shape[r].length; c++) {
        if (currentPiece.shape[r][c]) {
          const y = currentPiece.y + r;
          const x = currentPiece.x + c;
          if (y >= 0 && y < BOARD_HEIGHT && x >= 0 && x < BOARD_WIDTH) {
            displayBoard[y][x] = currentPiece.color;
          }
        }
      }
    }
  }

  return (
    <div className="relative">
      {/* Glow border */}
      <div className="absolute -inset-1 rounded-lg opacity-50 blur-sm"
        style={{ background: 'linear-gradient(135deg, #0ff, #f0f, #0ff)' }} />
      
      <div className="relative border border-cyan-500/30 rounded-lg overflow-hidden bg-black/80 backdrop-blur-sm">
        {/* Scanline overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-5"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,255,0.03) 2px, rgba(0,255,255,0.03) 4px)',
          }}
        />
        
        <div className="grid" style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          gridTemplateRows: `repeat(${BOARD_HEIGHT}, 1fr)`,
          gap: '1px',
          padding: '2px',
          aspectRatio: `${BOARD_WIDTH}/${BOARD_HEIGHT}`,
        }}>
          {displayBoard.flat().map((cell, i) => (
            <div
              key={i}
              className="rounded-[2px] transition-colors duration-75"
              style={{
                aspectRatio: '1',
                backgroundColor: cell === 'ghost'
                  ? 'rgba(255,255,255,0.08)'
                  : cell
                    ? cell
                    : 'rgba(255,255,255,0.02)',
                boxShadow: cell && cell !== 'ghost'
                  ? `0 0 6px ${cell}, inset 0 0 3px rgba(255,255,255,0.3)`
                  : cell === 'ghost'
                    ? '0 0 2px rgba(255,255,255,0.1)'
                    : 'none',
                border: cell === 'ghost'
                  ? '1px dashed rgba(255,255,255,0.15)'
                  : cell
                    ? `1px solid ${cell}44`
                    : '1px solid rgba(255,255,255,0.03)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
