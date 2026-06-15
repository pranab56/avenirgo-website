'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, ChevronRight, Clock, FileText, Headphones, MessageSquare, Plus, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ALL_MEDIUMS } from '../marketplace/data';

const SESSIONS = [
  { id: '1', medium: ALL_MEDIUMS[0], date: '2026-06-17', time: '14:00', type: 'audio' as const, status: 'upcoming' as const },
  { id: '2', medium: ALL_MEDIUMS[1], date: '2026-06-18', time: '10:00', type: 'chat' as const, status: 'upcoming' as const },
  { id: '3', medium: ALL_MEDIUMS[2], date: '2026-06-22', time: '11:00', type: 'written' as const, status: 'upcoming' as const },
  { id: '4', medium: ALL_MEDIUMS[0], date: '2026-06-10', time: '15:00', type: 'audio' as const, status: 'completed' as const },
  { id: '5', medium: ALL_MEDIUMS[3], date: '2026-06-05', time: '09:00', type: 'chat' as const, status: 'completed' as const },
  { id: '6', medium: ALL_MEDIUMS[1], date: '2026-05-28', time: '16:30', type: 'written' as const, status: 'completed' as const },
];

const TYPE_CONFIG = {
  audio: { label: 'Audio Call', Icon: Headphones, color: 'bg-blue-500/10 text-blue-600' },
  chat: { label: 'Live Chat', Icon: MessageSquare, color: 'bg-green-500/10 text-green-600' },
  written: { label: 'Written Q&A', Icon: FileText, color: 'bg-orange-500/10 text-orange-600' },
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function getDaysUntil(dateStr: string) {
  const today = new Date('2026-06-15');
  const diff = Math.ceil((new Date(dateStr).getTime() - today.getTime()) / 86400000);
  if (diff === 0) return 'Today';
  if (diff === 1) return 'Tomorrow';
  return `In ${diff} days`;
}

export default function PlanningPage() {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const upcoming = SESSIONS.filter(s => s.status === 'upcoming').sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  const past = SESSIONS.filter(s => s.status === 'completed').sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const displayed = activeTab === 'upcoming' ? upcoming : past;
  const nextSession = upcoming[0];

  return (
    <div className="min-h-screen bg-[#E5E5E5] pt-28 md:pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <h1 className="text-[#1A1A1A] font-medium text-3xl md:text-4xl">My Planning</h1>
            <p className="text-[#666666] text-sm font-medium mt-1">Manage and track your spiritual sessions</p>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2.5 rounded-sm text-sm transition-all active:scale-95 w-fit"
          >
            <Plus size={16} />
            Book Session
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3 md:gap-4 mb-8">
          <div className="bg-[#F8F8F8] rounded-lg p-4 md:p-5 border border-white/50 shadow-sm text-center">
            <p className="text-2xl md:text-4xl font-medium text-primary mb-1">{upcoming.length}</p>
            <p className="text-[#666666] text-xs md:text-sm font-medium">Upcoming</p>
          </div>
          <div className="bg-[#F8F8F8] rounded-lg p-4 md:p-5 border border-white/50 shadow-sm text-center">
            <p className="text-2xl md:text-4xl font-medium text-green-600 mb-1">{past.length}</p>
            <p className="text-[#666666] text-xs md:text-sm font-medium">Completed</p>
          </div>
          <div className="bg-[#F8F8F8] rounded-lg p-4 md:p-5 border border-white/50 shadow-sm text-center">
            <p className="text-base md:text-xl font-medium text-orange-500 mb-1">{nextSession ? getDaysUntil(nextSession.date) : '—'}</p>
            <p className="text-[#666666] text-xs md:text-sm font-medium">Next Session</p>
          </div>
        </div>

        {/* Next session banner */}
        {nextSession && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary rounded-lg p-5 md:p-6 mb-8 flex flex-col sm:flex-row sm:items-center gap-4 relative overflow-hidden"
          >
            <div className="absolute right-0 top-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute right-10 bottom-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2" />
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0 relative z-10">
              <Calendar size={22} className="text-white" />
            </div>
            <div className="flex-1 relative z-10">
              <p className="text-white/70 text-xs font-medium uppercase tracking-wider mb-0.5">Next Upcoming Session</p>
              <p className="text-white font-medium text-lg">{nextSession.medium.name}</p>
              <p className="text-white/70 text-sm font-medium">
                {formatDate(nextSession.date)} · {nextSession.time} · {TYPE_CONFIG[nextSession.type].label}
              </p>
            </div>
            <Link
              href={`/marketplace/${nextSession.medium.id}`}
              className="relative z-10 bg-white/20 hover:bg-white/30 text-white font-medium px-5 py-2.5 rounded-sm text-sm transition-all shrink-0 w-fit"
            >
              Manage
            </Link>
          </motion.div>
        )}

        {/* Tabs */}
        <div className="flex gap-1 bg-[#F8F8F8] rounded-lg p-1 border border-white/50 shadow-sm mb-6 w-fit">
          {(['upcoming', 'past'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                'px-5 py-2 rounded-md text-sm font-medium transition-all cursor-pointer',
                activeTab === tab ? 'bg-primary text-white shadow-sm' : 'text-[#666666] hover:text-[#1A1A1A]'
              )}
            >
              {tab === 'upcoming' ? `Upcoming (${upcoming.length})` : `Past (${past.length})`}
            </button>
          ))}
        </div>

        {/* Session list */}
        <AnimatePresence mode="popLayout">
          {displayed.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-[#666666]"
            >
              <Calendar size={44} className="mx-auto mb-4 opacity-20" />
              <p className="text-xl font-medium mb-2">No sessions</p>
              <p className="text-sm font-medium mb-6">
                {activeTab === 'upcoming' ? 'Book a session with a medium to get started.' : 'Your completed sessions will appear here.'}
              </p>
              {activeTab === 'upcoming' && (
                <Link href="/marketplace" className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-2.5 rounded-sm text-sm hover:bg-primary/90 transition-all">
                  <Plus size={15} />
                  Browse Mediums
                </Link>
              )}
            </motion.div>
          ) : (
            <motion.div key="list" className="space-y-4">
              {displayed.map((session, i) => {
                const { label, Icon, color } = TYPE_CONFIG[session.type];
                return (
                  <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ delay: i * 0.05 }}
                    className="bg-[#F8F8F8] rounded-lg p-5 border border-white/50 shadow-sm flex flex-col sm:flex-row sm:items-center gap-4"
                  >
                    {/* Medium info */}
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="relative shrink-0">
                        <div className="w-14 h-14 rounded-xl overflow-hidden">
                          <Image src={session.medium.image} alt={session.medium.name} width={56} height={56} className="object-cover w-full h-full" />
                        </div>
                        <span className={cn('absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-[#F8F8F8]', session.medium.online ? 'bg-green-500' : 'bg-yellow-400')} />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-medium text-[#1A1A1A] truncate">{session.medium.name}</h3>
                        <p className="text-xs text-[#666666] font-medium truncate">{session.medium.specialties[0]}</p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star size={11} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-medium text-[#1A1A1A]">{session.medium.rating}</span>
                        </div>
                      </div>
                    </div>

                    {/* Date & time */}
                    <div className="bg-primary/5 rounded-lg px-3 py-2 text-center shrink-0">
                      <p className="text-xs font-medium text-[#666666]">{formatDate(session.date)}</p>
                      <p className="text-sm font-medium text-[#1A1A1A] mt-0.5">
                        <Clock size={11} className="inline mr-1 mb-0.5" />{session.time}
                      </p>
                      {session.status === 'upcoming' && (
                        <p className="text-[10px] font-medium text-primary mt-0.5">{getDaysUntil(session.date)}</p>
                      )}
                    </div>

                    {/* Type badge */}
                    <div className={cn('flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold shrink-0', color)}>
                      <Icon size={13} />
                      {label}
                    </div>

                    {/* Action link */}
                    <Link
                      href={`/marketplace/${session.medium.id}`}
                      className={cn(
                        'flex items-center gap-1 text-sm font-medium shrink-0 transition-colors',
                        session.status === 'upcoming' ? 'text-primary hover:text-primary/70' : 'text-[#666666] hover:text-[#1A1A1A]'
                      )}
                    >
                      {session.status === 'upcoming' ? 'Manage' : 'View'}
                      <ChevronRight size={14} />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
