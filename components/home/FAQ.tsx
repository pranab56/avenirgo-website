'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    _id: '1',
    question: 'How do I choose the right medium for me?',
    answer: 'You can browse through our list of verified mediums, read their specialties, and check user reviews to find the one that resonates best with your needs and energy.'
  },
  {
    _id: '2',
    question: 'Are all mediums verified and authenticated?',
    answer: 'Yes, every medium on our platform undergoes a rigorous verification process to ensure their authenticity, experience, and ethical standards.'
  },
  {
    _id: '3',
    question: 'How does pricing work?',
    answer: 'Pricing is based on the session type (audio, chat, or written) and the specific medium\'s rates. You can see the cost clearly before starting any session.'
  },
  {
    _id: '4',
    question: 'What happens if I\'m not satisfied with a session?',
    answer: 'Your satisfaction is our priority. If you feel a session didn\'t meet your expectations, please contact our support team, and we will review your case for a potential refund or credit.'
  },
  {
    _id: '5',
    question: 'How private and secure are my consultations?',
    answer: 'All consultations are 100% private and encrypted. Your personal details and session transcripts are never shared with third parties.'
  },
  {
    _id: '6',
    question: 'Can I schedule a session in advance or do I need to connect immediately?',
    answer: 'Both options are available. You can connect with available mediums instantly or book a future time slot that fits your schedule.'
  },
  {
    _id: '7',
    question: 'What\'s the difference between audio call, chat, and written questions?',
    answer: 'Audio calls offer real-time voice interaction, chat is perfect for quick text-based guidance, and written questions allow for detailed responses that you can read at your convenience.'
  }
];

const FAQ = () => {
  const [openId, setOpenId] = useState<string | null>(null);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-[#E5E5E5] py-20 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 flex flex-col items-center">

        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-4 py-1.5 bg-primary/10 rounded-full">
            <span className="text-primary text-sm font-semibold tracking-wide">Frequently Asked Questions</span>
          </div>
          <h2 className="text-[#1A1A1A] font-bold text-4xl md:text-6xl tracking-tight">
            FAQs
          </h2>
          <p className="text-[#666666] text-lg md:text-xl font-medium">
            Answers to common questions about our platform
          </p>
        </div>

        {/* Accordion List */}
        <div className="w-full max-w-4xl space-y-4">
          {faqs.map((item: any) => (
            <div
              key={item._id}
              className={cn(
                "bg-[#F8F8F8] rounded-[24px] border border-white/50 overflow-hidden transition-all duration-300",
                openId === item._id ? "shadow-lg ring-1 ring-primary/10" : "hover:bg-white"
              )}
            >
              <button
                onClick={() => toggleFAQ(item._id)}
                className="w-full p-6 md:p-8 flex items-center justify-between text-left group cursor-pointer"
              >
                <div className="flex items-center gap-4 md:gap-6">
                  <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <HelpCircle size={22} />
                  </div>
                  <span className="text-[#1A1A1A] font-semibold text-base md:text-lg lg:text-xl leading-snug">
                    {item.question}
                  </span>
                </div>
                <div className={cn(
                  "w-10 h-10 flex items-center justify-center text-primary transition-transform duration-300 shrink-0 ml-4",
                  openId === item._id ? "rotate-180" : ""
                )}>
                  <ChevronDown size={24} />
                </div>
              </button>

              <AnimatePresence>
                {openId === item._id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                  >
                    <div className="px-6 md:px-8 pb-8 pt-2">
                      <div className="pl-14 md:pl-18 border-l-2 border-primary/20">
                        <p className="text-[#666666] font-medium leading-relaxed text-sm md:text-base lg:text-lg">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
