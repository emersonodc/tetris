import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

export default function SplashScreen({ highScore, onStart, isStarting = false }) {
  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Background grid */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `
          linear-gradient(rgba(0,255,255,1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0,255,255,1) 1px, transparent 1px)
        `,
        backgroundSize: '40px 40px',
      }} />

      {/* Glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `
          radial-gradient(ellipse at 50% 40%, rgba(0,255,255,0.12) 0%, transparent 60%),
          radial-gradient(ellipse at 20% 80%, rgba(255,0,255,0.08) 0%, transparent 50%)
        `,
      }} />

      {/* Falling blocks animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-6 h-6 rounded-sm opacity-20"
            style={{
              left: `${10 + i * 12}%`,
              backgroundColor: ['#00f0f0','#f0f000','#a000f0','#00f000','#f00000','#0000f0','#f0a000','#00f0f0'][i],
              boxShadow: `0 0 10px ${['#00f0f0','#f0f000','#a000f0','#00f000','#f00000','#0000f0','#f0a000','#00f0f0'][i]}`,
            }}
            initial={{ y: -40 }}
            animate={{ y: '110vh' }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'linear',
            }}
          />
        ))}
      </div>

      {/* Title */}
      <motion.div
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mb-8 w-full"
      >
        <div className="w-full flex justify-center">
          <h1
            className="text-6xl md:text-8xl font-bold tracking-[0.4em] uppercase mb-2 pl-[0.4em]"
            style={{
              fontFamily: 'var(--font-orbitron)',
              backgroundImage: 'linear-gradient(135deg, #0ff, #f0f, #0ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 0 20px rgba(0,255,255,0.5))',
            }}
          >
            TETRIS
          </h1>
        </div>
        <p className="w-full text-center text-cyan-400/50 tracking-[0.5em] text-xs uppercase font-mono pl-[0.5em]">
          Cyberpunk Edition
        </p>
      </motion.div>

      {/* High score */}
      {highScore > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-cyan-400/40 font-mono text-sm tracking-widest mb-8"
        >
          RECORDE: {highScore.toLocaleString()}
        </motion.p>
      )}

      {/* Play button */}
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        whileTap={{ scale: 0.95 }}
        onClick={onStart}
        disabled={isStarting}
        className="relative group px-12 py-4 rounded-lg font-bold tracking-[0.3em] uppercase text-lg cursor-pointer disabled:opacity-70 disabled:cursor-wait"
        style={{
          fontFamily: 'var(--font-orbitron)',
          background: 'linear-gradient(135deg, rgba(0,255,255,0.15), rgba(255,0,255,0.15))',
          border: '1px solid rgba(0,255,255,0.4)',
          color: '#0ff',
          textShadow: '0 0 10px rgba(0,255,255,0.7)',
          boxShadow: '0 0 20px rgba(0,255,255,0.2), inset 0 0 20px rgba(0,255,255,0.05)',
        }}
      >
        <span className="flex items-center gap-3">
          <Play className="w-5 h-5" />
          {isStarting ? 'CARREGANDO' : 'JOGAR'}
        </span>
        {/* Animated border */}
        <motion.div
          className="absolute inset-0 rounded-lg pointer-events-none"
          style={{ border: '1px solid rgba(255,0,255,0.4)' }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>

      {/* Keyboard hint */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-6 text-cyan-400/25 font-mono text-xs tracking-widest"
      >
        {isStarting ? 'aguarde um instante' : 'ou pressione ENTER'}
      </motion.p>
    </motion.div>
  );
}
