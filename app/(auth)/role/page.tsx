'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

function CrystalBallIcon() {
  return (
    <svg viewBox="0 0 120 130" width="88" height="88" xmlns="http://www.w3.org/2000/svg">
      {/* Glow rays */}
      <line x1="60" y1="4" x2="60" y2="16" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" />
      <line x1="28" y1="13" x2="34" y2="22" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="92" y1="13" x2="86" y2="22" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="8" y1="44" x2="18" y2="48" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <line x1="112" y1="44" x2="102" y2="48" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      {/* Ball */}
      <circle cx="60" cy="56" r="40" fill="url(#ballGrad)" />
      <circle cx="60" cy="56" r="40" fill="rgba(255,255,255,0.08)" />
      {/* Eye white */}
      <ellipse cx="60" cy="56" rx="21" ry="15" fill="white" />
      {/* Iris */}
      <circle cx="60" cy="56" r="10" fill="#6D28D9" />
      {/* Pupil */}
      <circle cx="60" cy="56" r="5.5" fill="#1E1B4B" />
      {/* Highlight */}
      <circle cx="65" cy="51" r="3" fill="white" opacity="0.8" />
      {/* Base pedestal */}
      <ellipse cx="60" cy="98" rx="28" ry="6" fill="#D97706" />
      <rect x="36" y="94" width="48" height="10" rx="5" fill="#D97706" />
      <rect x="32" y="102" width="56" height="7" rx="3.5" fill="#B45309" />
      {/* Arm rests */}
      <path d="M36 95 Q20 90 22 80" stroke="#D97706" strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M84 95 Q100 90 98 80" stroke="#D97706" strokeWidth="5" strokeLinecap="round" fill="none" />
      <defs>
        <radialGradient id="ballGrad" cx="40%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#67E8F9" />
          <stop offset="60%" stopColor="#22D3EE" />
          <stop offset="100%" stopColor="#0E7490" />
        </radialGradient>
      </defs>
    </svg>
  );
}

export default function RolePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        {/* Card */}
        <div className="bg-white rounded-2xl p-10 flex flex-col items-center text-center shadow-sm mb-6">
          <CrystalBallIcon />
          <h2 className="text-2xl font-bold text-[#1A1A1A] mt-5 mb-2">Mediums</h2>
          <p className="text-sm text-[#666666] leading-relaxed">
            Manage consultations, set availability, track earnings, and connect with clients.
          </p>
        </div>

        {/* Get Started */}
        <Link
          href="/login"
          className="block w-full py-4 rounded-xl bg-violet-600 hover:bg-violet-700 text-white font-bold text-center text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
        >
          Get Started
        </Link>
      </motion.div>
    </div>
  );
}
