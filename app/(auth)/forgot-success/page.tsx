'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const CONFETTI = [
  { x: 12,  y: 18,  color: '#EF4444', w: 12, h: 8,  r: 40  },
  { x: 70,  y: 12,  color: '#3B82F6', w: 8,  h: 13, r: -25 },
  { x: 84,  y: 30,  color: '#F59E0B', w: 13, h: 7,  r: 60  },
  { x: 5,   y: 40,  color: '#8B5CF6', w: 7,  h: 11, r: -50 },
  { x: 55,  y: 5,   color: '#EF4444', w: 10, h: 6,  r: 30  },
  { x: 82,  y: 60,  color: '#10B981', w: 12, h: 8,  r: -40 },
  { x: 3,   y: 62,  color: '#F59E0B', w: 8,  h: 12, r: 55  },
  { x: 36,  y: 4,   color: '#3B82F6', w: 11, h: 6,  r: -20 },
  { x: 90,  y: 48,  color: '#EF4444', w: 7,  h: 10, r: 70  },
  { x: 18,  y: 74,  color: '#10B981', w: 10, h: 6,  r: -60 },
  { x: 65,  y: 80,  color: '#F97316', w: 12, h: 8,  r: 45  },
  { x: 46,  y: 85,  color: '#8B5CF6', w: 8,  h: 11, r: -35 },
  { x: 26,  y: 10,  color: '#F59E0B', w: 6,  h: 9,  r: 25  },
  { x: 78,  y: 84,  color: '#3B82F6', w: 11, h: 6,  r: -55 },
  { x: 8,   y: 88,  color: '#10B981', w: 7,  h: 12, r: 65  },
  { x: 52,  y: 92,  color: '#EF4444', w: 9,  h: 7,  r: -30 },
  { x: 93,  y: 20,  color: '#F97316', w: 8,  h: 10, r: 50  },
  { x: 0,   y: 28,  color: '#3B82F6', w: 6,  h: 8,  r: -45 },
];

function Confetti() {
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { setVisible(true); }, []);
  if (!visible) return null;

  return (
    <>
      {CONFETTI.map((p, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: [0, 1, 1, 0], scale: 1, y: [0, -18, -6, 12] }}
          transition={{ delay: i * 0.035, duration: 1.5, ease: 'easeOut' }}
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
    </>
  );
}

export default function ForgotSuccessPage() {
  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-56px)] px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center text-center w-full max-w-sm"
      >
        {/* Circle + confetti container */}
        <div className="relative flex items-center justify-center w-44 h-44 mb-6">
          {/* Confetti layer */}
          <div className="absolute inset-0 pointer-events-none">
            <Confetti />
          </div>

          {/* Checkmark circle */}
          <motion.div
            initial={{ scale: 0, rotate: -20 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.1 }}
            className="relative z-10 w-24 h-24 rounded-full bg-violet-600 flex items-center justify-center shadow-xl shadow-violet-500/30"
          >
            <Check size={40} strokeWidth={3} className="text-white" />
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="text-2xl font-bold text-[#1A1A1A] mb-2"
        >
          Password Changed!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.45 }}
          className="text-sm text-[#666666] leading-relaxed mb-8"
        >
          Your password has been updated successfully.<br />
          You can now sign in securely.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.55 }}
          className="w-full"
        >
          <Link href="/login">
            <button className="w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20">
              Get Started
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
