'use client'

import { motion } from 'framer-motion'

export default function FloatingIllustrations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {/* Crescent moon */}
      <motion.svg
        animate={{ y: [0, -12, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[8%] right-[10%] w-16 h-16 sm:w-24 sm:h-24 opacity-20"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path
          d="M60 10C35 10 15 30 15 55s20 45 45 45c8 0 16-2 22-6-8 4-18 6-28 6C27 100 5 78 5 51S27 2 54 2c4 0 8 .5 12 1.5C63 5 61 7 60 10z"
          fill="url(#moonGrad)"
        />
        <defs>
          <linearGradient id="moonGrad" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
        </defs>
      </motion.svg>

      {/* Cloud 1 - upper left */}
      <motion.svg
        animate={{ x: [0, 20, 0], y: [0, -5, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[15%] left-[5%] w-32 h-16 sm:w-48 sm:h-24 opacity-[0.07]"
        viewBox="0 0 200 100"
        fill="white"
      >
        <ellipse cx="70" cy="60" rx="50" ry="30" />
        <ellipse cx="110" cy="50" rx="40" ry="25" />
        <ellipse cx="140" cy="60" rx="45" ry="28" />
        <ellipse cx="90" cy="45" rx="35" ry="22" />
      </motion.svg>

      {/* Cloud 2 - lower right */}
      <motion.svg
        animate={{ x: [0, -15, 0], y: [0, 8, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-[25%] right-[3%] w-40 h-20 sm:w-56 sm:h-28 opacity-[0.05]"
        viewBox="0 0 200 100"
        fill="white"
      >
        <ellipse cx="60" cy="55" rx="45" ry="28" />
        <ellipse cx="100" cy="48" rx="38" ry="24" />
        <ellipse cx="135" cy="55" rx="42" ry="26" />
        <ellipse cx="80" cy="42" rx="30" ry="20" />
      </motion.svg>

      {/* Small decorative stars */}
      {[
        { top: '20%', left: '25%', size: 12, delay: 0, dur: 6 },
        { top: '35%', left: '80%', size: 10, delay: 2, dur: 7 },
        { top: '60%', left: '15%', size: 14, delay: 1, dur: 8 },
        { top: '75%', left: '70%', size: 8, delay: 3, dur: 5 },
        { top: '10%', left: '55%', size: 10, delay: 1.5, dur: 9 },
      ].map((star, i) => (
        <motion.svg
          key={i}
          animate={{
            opacity: [0.1, 0.25, 0.1],
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: star.dur,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: star.delay,
          }}
          className="absolute"
          style={{ top: star.top, left: star.left, width: star.size, height: star.size }}
          viewBox="0 0 24 24"
          fill="#fbbf24"
        >
          <path d="M12 0l3.09 6.26L22 7.27l-5 4.87 1.18 6.88L12 15.4l-6.18 3.62L7 12.14 2 7.27l6.91-1.01L12 0z" />
        </motion.svg>
      ))}
    </div>
  )
}
