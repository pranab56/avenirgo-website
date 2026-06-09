'use client';

import { ALL_MEDIUMS } from '../../marketplace/data';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  Info,
  MessageCircle,
  Mic,
  PhoneCall,
  Users,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { use, useState, Suspense } from 'react';

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatHour(h: number) {
  if (h === 12) return '12:00 PM';
  if (h > 12) return `${h - 12}:00 PM`;
  return `${h}:00 AM`;
}

function getBookedHours(dateIndex: number, mediumId: string): number[] {
  const seed = parseInt(mediumId) * 3 + dateIndex * 7;
  return [9, 11, 14, 16].map(h => (h + (seed % 4))).filter(h => h >= 9 && h <= 19);
}

function BookingContent({ id }: { id: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialType = (searchParams.get('type') as 'audio' | 'chat') ?? 'audio';

  const medium = ALL_MEDIUMS.find(m => m.id === id);

  const [consultType, setConsultType] = useState<'audio' | 'chat'>(initialType);
  const [selectedDateIdx, setSelectedDateIdx] = useState(0);
  const [selectedHour, setSelectedHour] = useState<number | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  if (!medium) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold text-[#1A1A1A]">Medium not found</p>
      </div>
    );
  }

  const today = new Date(2026, 5, 9);
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    return d;
  });

  const selectedDate = dates[selectedDateIdx];
  const bookedHours = getBookedHours(selectedDateIdx, id);
  const timeSlots = Array.from({ length: 11 }, (_, i) => ({
    hour: 9 + i,
    booked: bookedHours.includes(9 + i),
  }));

  const audioSvc = medium.services.find(s => s.type === 'audio');
  const chatSvc = medium.services.find(s => s.type === 'chat');
  const activeSvc = consultType === 'audio' ? audioSvc : chatSvc;
  const rate = activeSvc?.price ?? 0;
  const estMinutes = 15;
  const total = (rate * estMinutes).toFixed(2);

  const formatDate = (d: Date) =>
    `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;

  const canConfirm = selectedHour !== null && !confirmed;

  const handleConfirm = () => {
    if (selectedHour !== null) setConfirmed(true);
  };

  const joinPath = consultType === 'audio'
    ? `/booking/${id}/queue`
    : `/booking/${id}/chat`;

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-6xl">

        {/* Page header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center hover:shadow-md transition-all"
          >
            <ArrowLeft size={18} className="text-[#1A1A1A]" />
          </button>
          <h1 className="text-xl font-bold text-[#1A1A1A]">Booking</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6">

          {/* ── Left column ── */}
          <div className="space-y-5">

            {/* Medium card */}
            <div className="bg-white rounded-2xl p-5 flex items-center gap-4 shadow-sm">
              <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 border-2 border-gray-100">
                <Image src={medium.image} alt={medium.name} width={56} height={56} className="object-cover w-full h-full" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold text-lg text-[#1A1A1A]">{medium.name}</h2>
                  {medium.online && (
                    <span className="flex items-center gap-1 px-2 py-0.5 bg-green-500/10 text-green-600 text-[10px] font-bold rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Online
                    </span>
                  )}
                </div>
                <p className="text-sm text-[#666666] font-medium">${activeSvc?.price}/min</p>
              </div>
            </div>

            {/* Consultation type */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <h3 className="font-bold text-[#1A1A1A]">Choose Consultation Type</h3>
              <div className="space-y-3">
                {([
                  { type: 'audio' as const, label: 'Audio Call', sub: 'Best 1-time voice consultation', Icon: Mic },
                  { type: 'chat' as const, label: 'Live Chat', sub: 'Best 1-time live chat consultation', Icon: MessageCircle },
                ] as const).map(({ type, label, sub, Icon }) => (
                  <button
                    key={type}
                    onClick={() => { setConsultType(type); setConfirmed(false); setSelectedHour(null); }}
                    className={cn(
                      'w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left',
                      consultType === type
                        ? 'border-violet-500 bg-violet-50/50'
                        : 'border-gray-100 hover:border-violet-200'
                    )}
                  >
                    <div className={cn(
                      'w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center transition-colors',
                      consultType === type ? 'border-violet-500' : 'border-gray-300'
                    )}>
                      {consultType === type && <div className="w-2 h-2 rounded-full bg-violet-500" />}
                    </div>
                    <Icon size={16} className={consultType === type ? 'text-violet-500' : 'text-[#666666]'} />
                    <div>
                      <p className={cn('font-bold text-sm', consultType === type ? 'text-violet-700' : 'text-[#1A1A1A]')}>
                        {label}
                      </p>
                      <p className="text-xs text-[#666666]">{sub}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Date & Time */}
            <div className="bg-white rounded-2xl p-5 shadow-sm space-y-5">
              <div className="flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-bold text-[#1A1A1A]">Select Date & Time</h3>
                <div className="flex items-center gap-4 text-xs font-semibold text-[#666666]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm border border-gray-300 bg-white" />
                    Available
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-gray-200" />
                    Booked
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-sm bg-violet-500" />
                    Selected
                  </span>
                </div>
              </div>

              {/* Date pills */}
              <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
                {dates.map((date, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setSelectedDateIdx(i);
                      setSelectedHour(null);
                      setConfirmed(false);
                    }}
                    className={cn(
                      'shrink-0 px-4 py-2 rounded-xl text-sm font-bold transition-all',
                      selectedDateIdx === i
                        ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/20'
                        : 'bg-gray-100 text-[#1A1A1A] hover:bg-gray-200'
                    )}
                  >
                    {MONTHS[date.getMonth()]} {date.getDate()}
                  </button>
                ))}
              </div>

              {/* Time slots */}
              <div>
                <p className="text-xs font-bold text-[#1A1A1A]/40 mb-3">
                  {MONTHS[selectedDate.getMonth()]} {selectedDate.getDate()}
                </p>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map(({ hour, booked }) => (
                    <button
                      key={hour}
                      disabled={booked}
                      onClick={() => { setSelectedHour(hour); setConfirmed(false); }}
                      className={cn(
                        'px-3 py-1.5 rounded-lg text-xs font-bold transition-all',
                        booked
                          ? 'bg-gray-100 text-[#1A1A1A]/30 cursor-not-allowed'
                          : selectedHour === hour
                          ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                          : 'bg-white border border-gray-200 text-[#1A1A1A] hover:border-violet-400 hover:text-violet-600'
                      )}
                    >
                      {booked ? 'Booked' : formatHour(hour)}
                    </button>
                  ))}
                </div>
              </div>

              {/* How it works */}
              <div className="flex items-start gap-3 bg-blue-50 rounded-xl p-4">
                <Info size={15} className="text-blue-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-[#1A1A1A] mb-1">How it works</p>
                  <p className="text-xs text-[#666666] leading-relaxed">
                    Click on any available (blank) time block, then select your desired session duration. The system will automatically fit your booking into the available time.
                  </p>
                </div>
              </div>
            </div>

          </div>

          {/* ── Right column — Booking Summary ── */}
          <div>
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-28 space-y-4">
              <h3 className="font-bold text-lg text-[#1A1A1A]">Booking Summary</h3>

              <div className="space-y-3">
                {[
                  { label: 'Consultation Type', value: consultType === 'audio' ? 'Audio' : 'Live Chat' },
                  { label: 'Date', value: selectedHour !== null ? formatDate(selectedDate) : '---' },
                  { label: 'Time', value: selectedHour !== null ? formatHour(selectedHour) : '---' },
                  { label: 'Duration', value: '---' },
                  { label: 'Rate', value: `$${rate.toFixed(2)}/min` },
                  { label: 'Est. Minutes', value: `${estMinutes} min` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-center justify-between text-sm">
                    <span className="text-[#666666]">{label}</span>
                    <span className="font-semibold text-[#1A1A1A]">{value}</span>
                  </div>
                ))}
              </div>

              <div className="h-px bg-black/5" />

              <div className="flex items-center justify-between">
                <span className="font-bold text-[#1A1A1A]">Estimated Total</span>
                <span className="font-bold text-xl text-violet-600">${total}</span>
              </div>

              <AnimatePresence mode="wait">
                {!confirmed ? (
                  <motion.button
                    key="confirm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleConfirm}
                    disabled={!canConfirm}
                    className={cn(
                      'w-full py-3.5 rounded-2xl font-bold text-sm transition-all',
                      canConfirm
                        ? 'bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/20 active:scale-[0.98]'
                        : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    )}
                  >
                    {canConfirm ? 'Confirm Booking' : 'Select a Time Slot'}
                  </motion.button>
                ) : (
                  <motion.div
                    key="confirmed"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="space-y-3"
                  >
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 rounded-xl px-4 py-2.5">
                      <CheckCircle2 size={16} />
                      <span className="text-sm font-bold">Booking Confirmed!</span>
                    </div>
                    <Link
                      href={joinPath}
                      className={cn(
                        'flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-bold text-sm text-white shadow-lg active:scale-[0.98] transition-all',
                        consultType === 'audio'
                          ? 'bg-violet-600 hover:bg-violet-700 shadow-violet-500/20'
                          : 'bg-violet-600 hover:bg-violet-700 shadow-violet-500/20'
                      )}
                    >
                      {consultType === 'audio' ? (
                        <><Users size={15} /> Join Queue</>
                      ) : (
                        <><MessageCircle size={15} /> Join Live Chat</>
                      )}
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>

              <p className="text-[10px] text-[#666666]/50 text-center">
                Price charged based on actual consultation time
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function BookingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-100 flex items-center justify-center"><p className="text-[#666666] font-medium">Loading...</p></div>}>
      <BookingContent id={id} />
    </Suspense>
  );
}
