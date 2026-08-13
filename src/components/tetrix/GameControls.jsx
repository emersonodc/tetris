import { useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, RotateCw, ChevronsDown } from 'lucide-react';

export default function GameControls({ onMove, onRotate, onDrop, onSoftDrop }) {
  const repeatTimeoutRef = useRef(null);
  const repeatIntervalRef = useRef(null);

  const stopRepeat = () => {
    if (repeatTimeoutRef.current !== null) {
      clearTimeout(repeatTimeoutRef.current);
      repeatTimeoutRef.current = null;
    }

    if (repeatIntervalRef.current !== null) {
      clearInterval(repeatIntervalRef.current);
      repeatIntervalRef.current = null;
    }
  };

  const startRepeat = (fn) => {
    stopRepeat();
    fn();
    repeatTimeoutRef.current = setTimeout(() => {
      repeatTimeoutRef.current = null;
      repeatIntervalRef.current = setInterval(fn, 80);
    }, 200);
  };

  useEffect(() => stopRepeat, []);

  const btnClass = "w-full h-16 min-h-16 rounded-lg bg-black/60 border border-cyan-500/30 flex items-center justify-center active:bg-cyan-500/20 active:scale-95 transition-all select-none";
  const rotateClass = "w-full h-16 min-h-16 rounded-lg bg-black/60 border border-fuchsia-500/30 flex items-center justify-center active:bg-fuchsia-500/20 active:scale-95 transition-all select-none";
  const dropClass = "w-full h-16 min-h-16 rounded-lg bg-black/60 border border-yellow-500/30 flex items-center justify-center active:bg-yellow-500/20 active:scale-95 transition-all select-none";

  return (
    <div className="md:hidden mt-0 w-full">
      <div className="grid grid-cols-[1.25fr_0.82fr_0.9fr_0.82fr_1.25fr] gap-2">
        <button
          className={btnClass}
          onClick={() => onMove(-1)}
          onTouchStart={(e) => { e.preventDefault(); startRepeat(() => onMove(-1)); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRepeat(); }}
          onTouchCancel={(e) => { e.preventDefault(); stopRepeat(); }}
        >
          <ChevronLeft className="w-9 h-9 text-cyan-400" />
        </button>

        <button
          className={btnClass}
          onClick={onSoftDrop}
          onTouchStart={(e) => { e.preventDefault(); startRepeat(onSoftDrop); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRepeat(); }}
          onTouchCancel={(e) => { e.preventDefault(); stopRepeat(); }}
        >
          <ChevronDown className="w-7 h-7 text-cyan-400" />
        </button>

        <button
          className={rotateClass}
          onPointerDown={(e) => { e.preventDefault(); onRotate(); }}
        >
          <RotateCw className="w-8 h-8 text-fuchsia-400" />
        </button>

        <button
          className={dropClass}
          onPointerDown={(e) => { e.preventDefault(); onDrop(); }}
        >
          <ChevronsDown className="w-7 h-7 text-yellow-400" />
        </button>

        <button
          className={btnClass}
          onClick={() => onMove(1)}
          onTouchStart={(e) => { e.preventDefault(); startRepeat(() => onMove(1)); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRepeat(); }}
          onTouchCancel={(e) => { e.preventDefault(); stopRepeat(); }}
        >
          <ChevronRight className="w-9 h-9 text-cyan-400" />
        </button>
      </div>
    </div>
  );
}
