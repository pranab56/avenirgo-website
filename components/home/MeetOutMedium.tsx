'use client';

import { motion, useInView } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

export default function MeetOurMedium() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="relative w-full h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1515405299443-f71bb404097b?q=80&w=2000&auto=format&fit=crop"
          alt="Spiritual journey background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center text-center space-y-8">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-white font-bold text-4xl md:text-6xl tracking-tight"
        >
          Ready to Begin Your Journey?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-white/80 text-lg md:text-xl max-w-2xl font-medium leading-relaxed"
        >
          Join thousands who have found clarity, peace, and direction through authentic spiritual guidance.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <button className="group relative flex items-center gap-3 bg-primary/90 hover:bg-primary text-white font-bold px-8 py-4 rounded-2xl border border-white/20 shadow-2xl transition-all active:scale-95 backdrop-blur-md">
            <span>Meet Our Mediums</span>
            <Sparkles size={20} className="text-white animate-pulse" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
