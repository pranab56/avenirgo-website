'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONFETTI_PIECES = [
  { x: 18, y: 22, color: '#FF6B6B', w: 10, h: 7, r: 40 },
  { x: 75, y: 18, color: '#4ECDC4', w: 8, h: 12, r: -25 },
  { x: 88, y: 35, color: '#FFE66D', w: 12, h: 6, r: 60 },
  { x: 10, y: 40, color: '#A78BFA', w: 7, h: 10, r: -50 },
  { x: 60, y: 10, color: '#F87171', w: 9, h: 6, r: 30 },
  { x: 82, y: 60, color: '#34D399', w: 11, h: 7, r: -40 },
  { x: 5, y: 62, color: '#FBBF24', w: 8, h: 11, r: 55 },
  { x: 40, y: 8, color: '#60A5FA', w: 10, h: 6, r: -20 },
  { x: 93, y: 48, color: '#F472B6', w: 7, h: 9, r: 70 },
  { x: 22, y: 70, color: '#4ADE80', w: 9, h: 6, r: -60 },
  { x: 68, y: 75, color: '#FB923C', w: 11, h: 8, r: 45 },
  { x: 50, y: 80, color: '#818CF8', w: 8, h: 10, r: -35 },
  { x: 30, y: 15, color: '#F59E0B', w: 6, h: 8, r: 25 },
  { x: 78, y: 80, color: '#EC4899', w: 10, h: 6, r: -55 },
  { x: 12, y: 82, color: '#14B8A6', w: 7, h: 11, r: 65 },
  { x: 55, y: 88, color: '#EF4444', w: 9, h: 7, r: -30 },
];

function Confetti() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setVisible(true); }, []);

  if (!visible) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full" style={{ width: 280, height: 280, top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      {CONFETTI_PIECES.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 0, x: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], y: [0, -30, -10, 20], scale: 1 }}
          transition={{ delay: i * 0.04, duration: 1.4, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.w,
            height: p.h,
            backgroundColor: p.color,
            borderRadius: 2,
            rotate: p.r,
          }}
        />
      ))}
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col items-center text-center w-full max-w-sm"
      >
        {/* Checkmark + confetti */}
        <div className="relative mb-8">
          <Confetti />
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="w-20 h-20 rounded-full bg-violet-600 flex items-center justify-center shadow-xl shadow-violet-500/30 relative z-10"
          >
            <Check size={36} strokeWidth={3} className="text-white" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-2xl font-bold text-[#1A1A1A] mb-2"
        >
          You&apos;re In! 🎉
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-sm text-[#666666] leading-relaxed mb-8 max-w-xs"
        >
          Your account is ready. Book consultations, connect with verified psychics, and gain clarity today.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="w-full"
        >
          <Link
            href="/marketplace"
            className="block w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm text-center transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
          >
            Get Started
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
