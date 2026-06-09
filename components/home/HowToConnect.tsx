'use client';

import { cn } from '@/lib/utils';
import { motion, useInView } from 'framer-motion';
import { Check, Mail, MessageCircle, Phone } from 'lucide-react';
import { useRef } from 'react';

const connectionMethods = [
  {
    title: 'Audio Call',
    icon: Phone,
    description: 'Experience real-time voice guidance with crystal-clear audio quality. Perfect for in-depth conversations.',
    features: [
      'Live one-on-one sessions',
      'Immediate connection',
      'Personal interaction'
    ],
    popular: false
  },
  {
    title: 'Live Chat',
    icon: MessageCircle,
    description: 'Connect via text messaging for a comfortable, thoughtful conversation at your own pace.',
    features: [
      'Text-based messaging',
      'Review messages anytime',
      'Comfortable & private'
    ],
    popular: true
  },
  {
    title: 'Written Q&A',
    icon: Mail,
    description: 'Submit detailed questions and receive thoughtful written responses within 24-48 hours.',
    features: [
      'Detailed responses',
      'No scheduling needed',
      'Affordable option'
    ],
    popular: false
  }
];

export default function HowToConnect() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <section ref={ref} className="bg-[#E5E5E5] py-20 md:py-32">
      <div className="container mx-auto px-6 md:px-10 lg:px-20 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 bg-primary/10 rounded-full"
          >
            <span className="text-primary text-sm font-semibold tracking-wide">Your Way, Your Pace</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-[#1A1A1A] font-bold text-4xl md:text-6xl tracking-tight"
          >
            Choose How to Connect
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#666666] text-lg md:text-xl font-medium"
          >
            Select the consultation method that feels right for you
          </motion.p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl">
          {connectionMethods.map((method, i) => {
            const Icon = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                className={cn(
                  "relative bg-[#F2F2F2] rounded-[32px] p-8 md:p-10 flex flex-col h-full border-2 transition-all duration-300",
                  method.popular ? "border-primary shadow-2xl" : "border-transparent hover:bg-white"
                )}
              >
                {method.popular && (
                  <div className="absolute top-0 right-10 -translate-y-1/2 bg-primary px-6 py-2 rounded-full shadow-lg">
                    <span className="text-white text-xs font-bold uppercase tracking-widest">Most Popular</span>
                  </div>
                )}

                <div className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center text-white mb-8">
                  <Icon size={28} />
                </div>

                <h3 className="text-[#1A1A1A] font-bold text-2xl mb-4">{method.title}</h3>
                <p className="text-[#666666] font-medium leading-relaxed mb-8 flex-grow">
                  {method.description}
                </p>

                <div className="space-y-4 pt-4 border-t border-black/5">
                  {method.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-green-500/10 flex items-center justify-center text-green-600 shrink-0">
                        <Check size={12} strokeWidth={3} />
                      </div>
                      <span className="text-[#1A1A1A] text-sm font-semibold">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
