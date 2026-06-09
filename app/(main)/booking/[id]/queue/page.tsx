'use client';

import { ALL_MEDIUMS } from '../../../marketplace/data';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Bell, Coffee, Wind, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';

export default function QueuePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const medium = ALL_MEDIUMS.find(m => m.id === id);

  const [notify, setNotify] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const POSITION = 2;
  const TOTAL = 4;
  const progress = Math.round(((TOTAL - POSITION) / TOTAL) * 100);

  useEffect(() => {
    const t = setInterval(() => setElapsed(s => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const waitMin = Math.max(0, 8 - Math.floor(elapsed / 60));

  if (!medium) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="font-bold">Medium not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4 py-20">

      {/* Queue card */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-sm bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700 rounded-3xl p-7 text-white shadow-2xl shadow-violet-500/30 relative overflow-hidden"
      >
        {/* Decorative circles */}
        <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white/5" />
        <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white/5" />

        {/* Close (leave queue) at top right */}
        <button
          onClick={() => router.back()}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
        >
          <X size={15} />
        </button>

        {/* Avatar stack */}
        <div className="flex justify-center mb-5">
          <div className="relative">
            <div className="w-16 h-16 rounded-full overflow-hidden border-3 border-white/30 shadow-lg">
              <Image src={medium.image} alt={medium.name} width={64} height={64} className="object-cover w-full h-full" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-violet-400 border-2 border-white flex items-center justify-center">
              <span className="text-[10px] font-bold text-white">+2</span>
            </div>
          </div>
        </div>

        {/* Position badge */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/15 border-2 border-white/30 mb-3">
            <span className="text-3xl font-black">#{POSITION}</span>
          </div>
          <h2 className="text-2xl font-black tracking-tight">You're in the queue</h2>
          <p className="text-white/70 text-sm font-medium mt-1">
            Estimated wait: {waitMin}–{waitMin + 4} min
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-xs font-bold text-white/70 mb-2">
            <span>Queue Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="h-full bg-white rounded-full"
            />
          </div>
        </div>

        {/* While you wait */}
        <div className="bg-white/10 rounded-2xl p-4 space-y-3 mb-6">
          <p className="text-sm font-bold text-white/90">While you wait</p>
          {[
            { Icon: Coffee, text: 'Find a quiet, comfortable space for your session. Take a few deep breaths and set your intention.' },
            { Icon: Wind, text: 'Have your questions ready. Think about what guidance you need most from this session.' },
          ].map(({ Icon, text }, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-white/15 flex items-center justify-center shrink-0 mt-0.5">
                <Icon size={13} />
              </div>
              <p className="text-xs text-white/70 leading-relaxed">{text}</p>
            </div>
          ))}
        </div>

        {/* Notify toggle */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Bell size={15} className="text-white/70" />
            <span className="text-sm font-bold">Notify when ready</span>
          </div>
          <button
            onClick={() => setNotify(v => !v)}
            className={cn(
              'w-11 h-6 rounded-full transition-colors relative',
              notify ? 'bg-white' : 'bg-white/20'
            )}
          >
            <motion.div
              animate={{ x: notify ? 18 : 2 }}
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              className={cn(
                'absolute top-1 w-4 h-4 rounded-full shadow-sm',
                notify ? 'bg-violet-600' : 'bg-white'
              )}
            />
          </button>
        </div>

        {/* Leave Queue */}
        <button
          onClick={() => router.back()}
          className="w-full py-3 rounded-2xl bg-[#1A1A1A]/80 hover:bg-[#1A1A1A] text-white font-bold text-sm transition-all active:scale-[0.98]"
        >
          Leave Queue
        </button>
      </motion.div>

    </div>
  );
}
