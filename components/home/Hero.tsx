'use client';

import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const stats = [
    { value: '60+', label: 'Psychics' },
    { value: '250+', label: 'Specialties' },
    { value: '1.5k+', label: 'Clients' },
    { value: '98%', label: 'Satisfaction', highlight: true },
  ];

  return (
    <section ref={ref} className="relative min-h-[90vh] w-full flex items-center bg-[#E5E5E5] pt-20 pb-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Content */}
          <div className="flex flex-col space-y-8 max-w-2xl">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#1A1A1A] font-bold leading-[1.1] tracking-tight"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}
            >
              Connect with trusted psychics <span className="text-primary italic relative">instantly
                <span className="absolute bottom-2 left-0 w-full h-1 bg-primary/20 -z-10 rounded-full" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="text-[#4A4A4A] text-lg md:text-xl max-w-lg font-medium leading-relaxed"
            >
              Get spiritual guidance, clarity, and support through audio calls, chat, or written questions from experienced mediums.
            </motion.p>
          </div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/3] w-full max-w-[600px] ml-auto"
          >
            <div className="absolute inset-0 rounded-[40px] overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=1000&auto=format&fit=crop"
                alt="Psychic cards and crystal ball"
                fill
                className="object-cover"
                priority
              />
            </div>
          </motion.div>
        </div>

        {/* Floating Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mt-16 lg:mt-[-80px] relative z-30 inline-block w-full lg:w-fit"
        >
          <div className="bg-[#F8F8F8] rounded-[30px] p-8 md:p-10 shadow-xl border border-white/50 flex flex-wrap lg:flex-nowrap items-center gap-10 md:gap-16">
            {stats.map((stat, i) => (
              <div key={stat.label} className="flex items-center gap-10 md:gap-16">
                <div className="flex flex-col items-center lg:items-start space-y-1 min-w-[120px]">
                  <span className={cn(
                    "text-4xl md:text-5xl font-bold tracking-tight",
                    stat.highlight ? "text-primary" : "text-[#1A1A1A]"
                  )}>
                    {stat.value}
                  </span>
                  <span className="text-[#666666] text-sm font-semibold uppercase tracking-wider">
                    {stat.label}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div className="hidden lg:block w-px h-12 bg-[#E0E0E0]" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
