import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, RotateCw, ChevronsDown } from 'lucide-react';

export default function GameControls({ onMove, onRotate, onDrop, onSoftDrop }) {
  const repeatRef = useRef(null);

  const startRepeat = (fn) => {
    fn();
    repeatRef.current = setTimeout(() => {
      repeatRef.current = setInterval(fn, 80);
    }, 200);
  };

  const stopRepeat = () => {
    clearTimeout(repeatRef.current);
    clearInterval(repeatRef.current);
  };

  const btnClass = "w-full aspect-square rounded-lg bg-black/60 border border-cyan-500/30 flex items-center justify-center active:bg-cyan-500/20 active:scale-95 transition-all select-none";
  const rotateClass = "w-full aspect-square rounded-lg bg-black/60 border border-fuchsia-500/30 flex items-center justify-center active:bg-fuchsia-500/20 active:scale-95 transition-all select-none";
  const dropClass = "w-full aspect-square rounded-lg bg-black/60 border border-yellow-500/30 flex items-center justify-center active:bg-yellow-500/20 active:scale-95 transition-all select-none";

  return (
    <div className="md:hidden mt-1 w-full">
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
        <button
          className={btnClass}
          onClick={() => onMove(-1)}
          onTouchStart={(e) => { e.preventDefault(); startRepeat(() => onMove(-1)); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRepeat(); }}
          onTouchCancel={(e) => { e.preventDefault(); stopRepeat(); }}
        >
          <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
        </button>

        <button
          className={btnClass}
          onClick={onSoftDrop}
          onTouchStart={(e) => { e.preventDefault(); startRepeat(onSoftDrop); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRepeat(); }}
          onTouchCancel={(e) => { e.preventDefault(); stopRepeat(); }}
        >
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
        </button>

        <button
          className={rotateClass}
          onPointerDown={(e) => { e.preventDefault(); onRotate(); }}
        >
          <RotateCw className="w-5 h-5 sm:w-6 sm:h-6 text-fuchsia-400" />
        </button>

        <button
          className={dropClass}
          onPointerDown={(e) => { e.preventDefault(); onDrop(); }}
        >
          <ChevronsDown className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
        </button>

        <button
          className={btnClass}
          onClick={() => onMove(1)}
          onTouchStart={(e) => { e.preventDefault(); startRepeat(() => onMove(1)); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRepeat(); }}
          onTouchCancel={(e) => { e.preventDefault(); stopRepeat(); }}
        >
          <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-cyan-400" />
        </button>
      </div>
    </div>
  );
}
