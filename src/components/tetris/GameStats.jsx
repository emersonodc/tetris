import { LINES_PER_LEVEL } from '../../lib/tetrisEngine';

export default function GameStats({ score, level, lines, compact = false, horizontal = false, className = '' }) {
  const progress = ((lines % LINES_PER_LEVEL) / LINES_PER_LEVEL) * 100;
  const compactHorizontal = compact && horizontal;
  const containerClass = horizontal
    ? 'grid grid-cols-3 gap-1'
    : compact
      ? 'space-y-2'
      : 'space-y-4';
  const cardClass = compactHorizontal
    ? 'bg-black/60 border border-cyan-500/20 rounded-md px-1 py-1.5 backdrop-blur-sm'
    : compact
    ? 'bg-black/60 border border-cyan-500/20 rounded-lg p-2 backdrop-blur-sm'
    : 'bg-black/60 border border-cyan-500/20 rounded-lg p-4 backdrop-blur-sm';
  const labelClass = compactHorizontal
    ? 'text-[8px] uppercase tracking-[0.08em] text-cyan-400/65 mb-0.5 font-light text-center'
    : compact
    ? 'text-[9px] uppercase tracking-[0.18em] text-cyan-400/70 mb-1 font-light'
    : 'text-xs uppercase tracking-[0.3em] text-cyan-400/70 mb-1 font-light';
  const valueClass = compactHorizontal
    ? 'text-[11px] font-mono text-white tabular-nums text-center leading-none'
    : compact
    ? 'text-sm sm:text-base font-mono text-white tabular-nums'
    : 'text-2xl font-mono text-white tabular-nums';
  const levelValueClass = compactHorizontal
    ? 'text-[13px] font-mono text-transparent bg-clip-text text-center leading-none'
    : compact
    ? 'text-lg sm:text-xl font-mono text-transparent bg-clip-text'
    : 'text-3xl font-mono text-transparent bg-clip-text';
  const progressWrapperClass = compact
    ? 'mt-1 h-0.5 bg-white/5 rounded-full overflow-hidden'
    : 'mt-2 h-1 bg-white/5 rounded-full overflow-hidden';
  const progressTextClass = compact
    ? 'text-[8px] text-cyan-400/40 mt-1 font-mono'
    : 'text-[10px] text-cyan-400/40 mt-1 font-mono';

  return (
    <div className={`${containerClass} ${className}`.trim()}>
      {/* Score */}
      <div className={cardClass}>
        <h3 className={labelClass}>
          {compactHorizontal ? 'Pontos' : 'Pontuação'}
        </h3>
        <p className={valueClass}
          style={{ textShadow: '0 0 10px rgba(0,255,255,0.5)' }}>
          {score.toLocaleString()}
        </p>
      </div>

      {/* Level */}
      <div className={cardClass}>
        <h3 className={labelClass}>
          Nível
        </h3>
        <p className={levelValueClass}
          style={{
            backgroundImage: 'linear-gradient(135deg, #0ff, #f0f)',
            textShadow: '0 0 20px rgba(0,255,255,0.3)',
          }}>
          {level + 1}
        </p>
        {/* Progress to next level */}
        {!horizontal && (
          <>
            <div className={progressWrapperClass}>
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${progress}%`,
                  background: 'linear-gradient(90deg, #0ff, #f0f)',
                  boxShadow: '0 0 8px rgba(0,255,255,0.5)',
                }}
              />
            </div>
            <p className={progressTextClass}>
              {lines % LINES_PER_LEVEL}/{LINES_PER_LEVEL} linhas
            </p>
          </>
        )}
      </div>

      {/* Lines */}
      <div className={cardClass}>
        <h3 className={labelClass}>
          Linhas
        </h3>
        <p className={valueClass}
          style={{ textShadow: '0 0 10px rgba(0,255,255,0.5)' }}>
          {lines}
        </p>
      </div>
    </div>
  );
}
