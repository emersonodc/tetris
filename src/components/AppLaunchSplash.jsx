import { motion } from 'framer-motion';

export default function AppLaunchSplash() {
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="text-center"
        initial={{ y: 6, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <h1 className="text-4xl md:text-5xl font-semibold tracking-[0.2em] text-white">
          EOC Tech
        </h1>

        <p className="mt-4 text-xs tracking-[0.3em] uppercase text-white/65">
          Loading
        </p>

        <motion.div
          className="mx-auto mt-6 h-8 w-8 rounded-full border-2 border-white/30 border-t-white"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
        />
      </motion.div>
    </motion.div>
  );
}
