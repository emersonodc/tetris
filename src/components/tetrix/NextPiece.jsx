export default function NextPiece({ piece, compact = false, className = '' }) {
  if (!piece) return null;

  const cellSize = compact ? '0.72rem' : '1.25rem';
  const containerClass = compact
    ? 'bg-black/60 border border-cyan-500/20 rounded-md px-1 py-1.5 backdrop-blur-sm'
    : 'bg-black/60 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-sm';
  const titleClass = compact
    ? 'text-[8px] uppercase tracking-[0.08em] text-cyan-400/65 mb-1 font-light text-center'
    : 'text-xs uppercase tracking-[0.3em] text-cyan-400/70 mb-3 font-light text-center';

  return (
    <div className={`${containerClass} ${className}`.trim()}>
      <h3 className={titleClass}>
        Próxima
      </h3>
      <div className="flex justify-center">
        <div className="grid gap-[2px]"
          style={{
            gridTemplateColumns: `repeat(${piece.shape[0].length}, ${cellSize})`,
            gridTemplateRows: `repeat(${piece.shape.length}, ${cellSize})`,
          }}>
          {piece.shape.flat().map((cell, i) => (
            <div
              key={i}
              className="rounded-[2px]"
              style={{
                width: cellSize,
                height: cellSize,
                backgroundColor: cell ? piece.color : 'rgba(255,255,255,0.03)',
                boxShadow: cell ? `0 0 8px ${piece.color}, inset 0 0 4px rgba(255,255,255,0.3)` : 'none',
                border: cell ? `1px solid ${piece.color}66` : '1px solid rgba(255,255,255,0.05)',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
