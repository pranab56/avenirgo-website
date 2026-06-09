'use client';

import { motion, useInView } from 'framer-motion';
import { CheckCircle2, Clock, Shield, Star } from 'lucide-react';
import { useRef } from 'react';

export default function WhyChoose() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  const features = [
    "Multi-channel support",
    "Guaranteed Security",
    "Personalized Insights"
  ];

  return (
    <section ref={ref} className="bg-[#E5E5E5] py-20 md:py-32 overflow-hidden">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* Left Content */}
          <div className="space-y-8 max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full">
                <span className="text-primary text-sm font-semibold tracking-wide">Features</span>
              </div>
              <h2 className="text-[#1A1A1A] font-bold text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight">
                Why Choose <span className="text-primary">AvenirGo</span>
              </h2>
              <p className="text-[#4A4A4A] text-lg font-medium leading-relaxed">
                Experience the best in spiritual guidance with our trusted platform, verified psychics, and secure connections designed for your peace of mind.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-3">
                  <CheckCircle2 className="text-primary w-5 h-5" />
                  <span className="text-[#1A1A1A] font-semibold">{feature}</span>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <button className="bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/30 hover:bg-primary/90 transition-all active:scale-95">
                Get Started
              </button>
            </motion.div>
          </div>

          {/* Right Cards Layout */}
          <div className="relative h-[500px] md:h-[600px] flex items-center justify-center lg:justify-end">

            {/* Card 1: Verified Mediums */}
            <motion.div
              initial={{ opacity: 0, y: 40, x: -20 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="absolute top-0 left-0 lg:left-[-50px] z-10 w-[280px] md:w-[350px] bg-[#F8F8F8] p-8 rounded-[32px] shadow-xl border border-white/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Shield size={24} />
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">Verified Mediums</h3>
              <p className="text-[#666666] text-sm font-medium leading-relaxed">
                All our psychics are carefully vetted and verified for authenticity and professionalism.
              </p>
            </motion.div>

            {/* Card 2: Satisfaction Guaranteed */}
            <motion.div
              initial={{ opacity: 0, y: 40, x: 20 }}
              animate={inView ? { opacity: 1, y: 0, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="absolute bottom-10 left-0 lg:left-[-20px] z-30 w-[280px] md:w-[350px] bg-primary p-8 rounded-[32px] shadow-2xl"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center text-white mb-6">
                <Star size={24} />
              </div>
              <h3 className="text-white font-bold text-xl mb-3">Satisfaction Guaranteed</h3>
              <p className="text-white/80 text-sm font-medium leading-relaxed">
                Your satisfaction is our priority. Read reviews and choose with confidence.
              </p>
            </motion.div>

            {/* Card 3: 24/7 Availability */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, x: 40 }}
              animate={inView ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute top-[150px] right-0 z-20 w-[280px] md:w-[350px] bg-[#F8F8F8] p-8 rounded-[32px] shadow-xl border border-white/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-[#1A1A1A] font-bold text-xl mb-3">24/7 Availability</h3>
              <p className="text-[#666666] text-sm font-medium leading-relaxed">
                Connect with mediums anytime, anywhere. Guidance is always available.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
