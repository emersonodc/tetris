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

  const btnClass = "w-16 h-16 rounded-xl bg-black/60 border border-cyan-500/30 flex items-center justify-center active:bg-cyan-500/20 active:scale-95 transition-all select-none";
  const rotateClass = "w-16 h-16 rounded-xl bg-black/60 border border-fuchsia-500/30 flex items-center justify-center active:bg-fuchsia-500/20 active:scale-95 transition-all select-none";
  const dropClass = "w-16 h-16 rounded-xl bg-black/60 border border-yellow-500/30 flex items-center justify-center active:bg-yellow-500/20 active:scale-95 transition-all select-none";

  return (
    <div className="md:hidden mt-4">
      <div className="flex items-center justify-center gap-2">
        <button
          className={btnClass}
          onClick={() => onMove(-1)}
          onTouchStart={(e) => { e.preventDefault(); startRepeat(() => onMove(-1)); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRepeat(); }}
          onTouchCancel={(e) => { e.preventDefault(); stopRepeat(); }}
        >
          <ChevronLeft className="w-7 h-7 text-cyan-400" />
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
          <RotateCw className="w-7 h-7 text-fuchsia-400" />
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
          <ChevronRight className="w-7 h-7 text-cyan-400" />
        </button>
      </div>
    </div>
  );
}