import { LINES_PER_LEVEL } from '../../lib/tetrixEngine';

export default function GameStats({ score, level, lines, compact = false, horizontal = false, className = '' }) {
  const progress = ((lines % LINES_PER_LEVEL) / LINES_PER_LEVEL) * 100;
  const compactHorizontal = compact && horizontal;
  const containerClass = horizontal
    ? 'grid grid-cols-3 gap-2 sm:gap-2.5'
    : compact
      ? 'space-y-2'
      : 'space-y-4';
  const cardClass = compactHorizontal
    ? 'min-h-[4.5rem] rounded-md border border-cyan-500/20 bg-black/60 px-1.5 py-2 text-center backdrop-blur-sm flex flex-col items-center justify-center'
    : compact
    ? 'min-h-[5.4rem] rounded-lg border border-cyan-500/20 bg-black/60 p-2.5 text-center backdrop-blur-sm flex flex-col items-center justify-center'
    : 'min-h-[7.4rem] rounded-lg border border-cyan-500/20 bg-black/60 p-4 text-center backdrop-blur-sm flex flex-col items-center justify-center';
  const labelClass = compactHorizontal
    ? 'mb-1 text-[9px] uppercase tracking-[0.06em] text-cyan-400/65 font-light text-center leading-none'
    : compact
    ? 'mb-1 text-[10px] uppercase tracking-[0.16em] text-cyan-400/70 font-light text-center'
    : 'mb-1.5 text-xs uppercase tracking-[0.26em] text-cyan-400/70 font-light text-center';
  const valueClass = compactHorizontal
    ? 'text-[1.5rem] sm:text-[1.75rem] font-mono text-white tabular-nums text-center leading-none'
    : compact
    ? 'text-[1.5rem] sm:text-[1.7rem] font-mono text-white tabular-nums leading-none'
    : 'text-[2.35rem] font-mono text-white tabular-nums leading-none';
  const levelValueClass = compactHorizontal
    ? 'text-[1.65rem] sm:text-[1.85rem] font-mono text-transparent bg-clip-text text-center leading-none'
    : compact
    ? 'text-[1.8rem] sm:text-[2rem] font-mono text-transparent bg-clip-text leading-none'
    : 'text-[2.75rem] font-mono text-transparent bg-clip-text leading-none';
  const progressWrapperClass = compact
    ? 'mt-2 h-0.5 w-full bg-white/5 rounded-full overflow-hidden'
    : 'mt-2.5 h-1 w-full bg-white/5 rounded-full overflow-hidden';
  const progressTextClass = compact
    ? 'mt-1 text-[8px] text-cyan-400/40 font-mono'
    : 'mt-1.5 text-[10px] text-cyan-400/40 font-mono';

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
