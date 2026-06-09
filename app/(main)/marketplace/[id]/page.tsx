'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  FileText,
  Globe,
  MessageCircle,
  Mic,
  Send,
  Share2,
  Star,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { ALL_MEDIUMS } from '../data';

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const slotColor: Record<string, string> = {
  promo: 'bg-yellow-400',
  audio: 'bg-violet-500',
  private: 'bg-emerald-500',
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={14}
          className={i <= Math.round(rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
        />
      ))}
    </div>
  );
}

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const medium = ALL_MEDIUMS.find(m => m.id === id);
  const [copied, setCopied] = useState(false);
  const [askOpen, setAskOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [sent, setSent] = useState(false);
  const MAX_CHARS = 500;

  if (!medium) {
    return (
      <div className="min-h-screen bg-[#E5E5E5] flex items-center justify-center">
        <div className="text-center">
          <p className="text-2xl font-bold text-[#1A1A1A] mb-4">Medium not found</p>
          <button
            onClick={() => router.push('/marketplace')}
            className="text-primary font-bold underline underline-offset-4"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: do nothing
    }
  };

  const writtenService = medium.services.find(s => s.type === 'written');

  return (
    <div className="min-h-screen bg-[#E5E5E5] pt-20 pb-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white top-10 overflow-hidden shadow-2xl"
        >
          {/* Purple header */}
          <div className="relative h-[140px] bg-gradient-to-br from-violet-600 via-purple-600 to-indigo-700">
            <button
              onClick={() => router.back()}
              className="absolute top-4 left-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleShare}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-sm flex items-center justify-center text-white transition-colors"
              title={copied ? 'Copied!' : 'Share'}
            >
              <Share2 size={16} />
            </button>
          </div>

          {/* Avatar + online badge */}
          <div className="relative flex justify-center">
            <div className="absolute -top-12 w-24 h-24 rounded-full border-4 border-white overflow-hidden shadow-lg">
              <Image src={medium.image} alt={medium.name} fill className="object-cover" />
            </div>
          </div>

          <div className="pt-16 pb-8 px-6 space-y-6">

            {/* Name + badges */}
            <div className="text-center space-y-2">
              {medium.online && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-500/10 text-green-600 rounded-full text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Online Now
                </div>
              )}
              <div className="flex items-center justify-center gap-2">
                <h1 className="text-2xl font-bold text-[#1A1A1A]">{medium.name}</h1>
                {medium.verified && (
                  <CheckCircle2 size={20} className="text-violet-500 shrink-0" fill="currentColor" />
                )}
              </div>
              {medium.verified && (
                <p className="text-xs font-bold text-violet-500 uppercase tracking-widest">Verified Medium</p>
              )}

              <div className="flex items-center justify-center gap-2">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-[#1A1A1A]">{medium.rating}</span>
                <span className="text-sm text-[#666666]">({medium.reviews.toLocaleString()} reviews)</span>
              </div>

              <div className="flex items-center justify-center gap-6 text-sm text-[#666666] font-medium pt-1">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-violet-500" />
                  <span>{medium.consultations} Consultations</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Globe size={14} className="text-violet-500" />
                  <span>{medium.languages.join(', ')}</span>
                </div>
              </div>

              <p className="text-sm text-[#666666] leading-relaxed max-w-md mx-auto pt-1">
                {medium.bio}
              </p>

              {/* Specialties */}
              <div className="pt-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/40 mb-3">Specialties</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {medium.specialties.map(spec => (
                    <span
                      key={spec}
                      className="px-4 py-1.5 bg-violet-50 text-violet-600 text-xs font-bold rounded-full"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-black/5" />

            {/* Service cards */}
            <div className="grid grid-cols-3 gap-3">
              {medium.services.map(svc => {
                const Icon = svc.type === 'audio' ? Mic : svc.type === 'chat' ? MessageCircle : FileText;
                return (
                  <div
                    key={svc.type}
                    className="rounded-2xl border border-black/5 bg-[#FAFAFA] p-4 flex flex-col items-center gap-2 text-center"
                  >
                    <Icon size={22} className="text-violet-500" />
                    <p className="text-xs font-bold text-[#1A1A1A]">{svc.label}</p>
                    <p className="text-sm font-bold text-[#1A1A1A]">
                      ${svc.price}
                      <span className="text-[10px] font-bold text-[#1A1A1A]/40">
                        /{svc.unit === 'min' ? 'min' : 'session'}
                      </span>
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="h-px bg-black/5" />

            {/* Book a Consultation */}
            <div className="space-y-4">
              <h2 className="font-bold text-lg text-[#1A1A1A]">Book a Consultation</h2>

              <Link
                href={`/booking/${medium.id}?type=audio`}
                className="w-full h-13 flex items-center justify-center gap-3 bg-violet-600 hover:bg-violet-700 text-white font-bold rounded-2xl py-3.5 text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/25"
              >
                <Mic size={16} />
                Schedule Audio Call
              </Link>

              <Link
                href={`/booking/${medium.id}?type=chat`}
                className="w-full h-13 flex items-center justify-center gap-3 border-2 border-violet-600 text-violet-600 hover:bg-violet-50 font-bold rounded-2xl py-3.5 text-sm transition-all active:scale-[0.98]"
              >
                <MessageCircle size={16} />
                Schedule Live Chat
              </Link>

              {writtenService && (
                <div className="rounded-2xl border border-black/5 bg-[#FAFAFA] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="font-bold text-[#1A1A1A]">Written Question</p>
                    <p className="font-bold text-[#1A1A1A]">${writtenService.price}</p>
                  </div>
                  <Link
                    href={`/booking/${medium.id}/ask`}
                    className="block w-full text-center border-2 border-black/10 hover:border-violet-400 hover:text-violet-600 font-bold rounded-xl py-2.5 text-sm transition-all text-[#1A1A1A]"
                  >
                    Ask a Question
                  </Link>
                  <div className="space-y-1.5 pt-1">
                    {['Detailed written response', '24–48 hour turnaround', 'Private & confidential'].map(item => (
                      <div key={item} className="flex items-center gap-2 text-xs text-[#666666] font-medium">
                        <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="h-px bg-black/5" />

            {/* Availability Schedule */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-[#1A1A1A]">Availability Schedule</h2>
                <span className="text-xs text-[#666666] font-medium flex items-center gap-1">
                  <Globe size={12} />
                  Your timezone
                </span>
              </div>

              {/* Legend */}
              <div className="flex flex-wrap gap-4 text-xs font-bold text-[#666666]">
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-yellow-400" />Promo</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-violet-500" />Audio Call</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-emerald-500" />Private Session</div>
                <div className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-full bg-gray-200" />Unavailable</div>
              </div>

              {/* Grid */}
              <div className="overflow-x-auto -mx-2 px-2">
                <div className="min-w-[560px]">
                  {/* Hour headers */}
                  <div className="flex mb-1 pl-12">
                    {HOURS.map(h => (
                      <div key={h} className="flex-1 text-center text-[8px] font-bold text-[#1A1A1A]/30">
                        {String(h).padStart(2, '0')}
                      </div>
                    ))}
                  </div>

                  {medium.availability.map(row => {
                    const slotMap = new Map(row.slots.map(s => [s.hour, s.kind]));
                    return (
                      <div key={row.date} className="flex items-center mb-1.5 gap-1">
                        <span className="w-11 shrink-0 text-[10px] font-bold text-[#666666]">{row.date}</span>
                        {HOURS.map(h => {
                          const kind = slotMap.get(h);
                          return (
                            <button
                              key={h}
                              title={kind ? `${kind} - ${String(h).padStart(2, '0')}:00` : 'Unavailable'}
                              className={cn(
                                'flex-1 h-5 rounded-sm transition-opacity hover:opacity-80',
                                kind ? slotColor[kind] : 'bg-gray-100'
                              )}
                            />
                          );
                        })}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-start gap-2 text-xs text-[#666666] bg-[#FAFAFA] rounded-xl p-3">
                <span className="text-violet-500 font-bold shrink-0">i</span>
                <p><span className="font-bold">How to book a time slot: </span>Click on any available colored dot to book a session. Purple slots are for audio calls, green slots are for private sessions, and yellow slots have special promo pricing.</p>
              </div>
            </div>

            <div className="h-px bg-black/5" />

            {/* Reviews */}
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <h2 className="font-bold text-lg text-[#1A1A1A]">Reviews ({medium.reviews.toLocaleString()})</h2>
                <div className="flex items-center gap-1.5">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-[#1A1A1A]">{medium.rating}</span>
                </div>
              </div>

              {/* Breakdown bars */}
              <div className="space-y-2">
                {medium.ratingBreakdown.map(({ stars, pct }) => (
                  <div key={stars} className="flex items-center gap-3">
                    <span className="text-xs font-bold text-[#666666] w-12 shrink-0">{stars} stars</span>
                    <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.6, delay: 0.1 * (5 - stars) }}
                        className="h-full bg-yellow-400 rounded-full"
                      />
                    </div>
                    <span className="text-xs font-bold text-[#666666] w-8 text-right shrink-0">{pct}%</span>
                  </div>
                ))}
              </div>

              {/* Review cards */}
              <div className="space-y-4">
                {medium.reviewList.map(review => (
                  <div key={review.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-bold text-sm text-[#1A1A1A]">{review.name}</p>
                      <p className="text-xs text-[#666666]">{review.date}</p>
                    </div>
                    <StarRating rating={review.rating} />
                    <p className="text-sm text-[#666666] leading-relaxed">{review.text}</p>
                  </div>
                ))}
              </div>

              <Link
                href={`/marketplace/review/${medium.id}`}
                className="block w-full py-3.5 border-2 border-black/10 hover:border-violet-400 hover:text-violet-600 font-bold rounded-2xl text-sm text-[#1A1A1A] text-center transition-all"
              >
                View All {medium.reviews.toLocaleString()} Reviews
              </Link>
            </div>

          </div>
        </motion.div>
      </div>

      {/* Ask a Question modal */}
      <AnimatePresence>
        {askOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAskOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#1A1A1A]">Written Question</h3>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-violet-600">${writtenService?.price}</span>
                    <button
                      onClick={() => setAskOpen(false)}
                      className="w-7 h-7 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center transition-colors"
                    >
                      <X size={14} className="text-[#1A1A1A]" />
                    </button>
                  </div>
                </div>

                {sent ? (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-6 space-y-3"
                  >
                    <div className="w-14 h-14 rounded-full bg-green-500/10 flex items-center justify-center mx-auto">
                      <CheckCircle2 size={28} className="text-green-500" />
                    </div>
                    <p className="font-bold text-[#1A1A1A]">Question Sent!</p>
                    <p className="text-sm text-[#666666]">You'll receive a detailed response within 24–48 hours.</p>
                    <button
                      onClick={() => setAskOpen(false)}
                      className="mt-2 px-6 py-2.5 bg-violet-600 text-white font-bold rounded-xl text-sm hover:bg-violet-700 transition-colors"
                    >
                      Done
                    </button>
                  </motion.div>
                ) : (
                  <>
                    {/* Textarea */}
                    <div className="relative">
                      <textarea
                        value={question}
                        onChange={e => setQuestion(e.target.value.slice(0, MAX_CHARS))}
                        placeholder="Type your question here... (max 500 characters)"
                        rows={6}
                        className="w-full resize-none rounded-2xl border border-black/10 bg-[#FAFAFA] p-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 outline-none focus:ring-2 focus:ring-violet-400/30 transition-all"
                      />
                    </div>

                    {/* Counter + turnaround */}
                    <div className="flex items-center justify-between text-xs text-[#666666] font-medium -mt-1">
                      <span className={cn(question.length >= MAX_CHARS && 'text-red-500 font-bold')}>
                        {question.length}/{MAX_CHARS} characters
                      </span>
                      <span>Response in 24–48h</span>
                    </div>

                    {/* Feature list */}
                    <div className="space-y-1.5">
                      {['Detailed written response', '24–48 hour turnaround', 'Private & confidential'].map(item => (
                        <div key={item} className="flex items-center gap-2 text-xs text-[#666666] font-medium">
                          <CheckCircle2 size={13} className="text-green-500 shrink-0" />
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-1">
                      <button
                        onClick={() => setAskOpen(false)}
                        className="flex-1 py-3 rounded-2xl border-2 border-black/10 font-bold text-sm text-[#1A1A1A] hover:border-black/20 transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => { if (question.trim()) setSent(true); }}
                        disabled={!question.trim()}
                        className="flex-1 py-3 rounded-2xl bg-[#1A1A1A] hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed font-bold text-sm text-white flex items-center justify-center gap-2 transition-colors"
                      >
                        <Send size={14} />
                        Send
                      </button>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
