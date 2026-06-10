'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

type Consultation = {
  id: string;
  client: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  price: number;
};

const COMPLETED: Consultation[] = [
  { id: '1', client: 'Emily R.',   service: 'Audio Call', date: '2026-03-20', time: '14:30', duration: 30, price: 119.70 },
  { id: '2', client: 'Emily R.',   service: 'Audio Call', date: '2026-03-20', time: '14:30', duration: 30, price: 119.70 },
  { id: '3', client: 'Emily R.',   service: 'Audio Call', date: '2026-03-20', time: '14:30', duration: 30, price: 119.70 },
];

const INITIAL_NEW: Consultation[] = [
  { id: '4', client: 'Emily R.',   service: 'Audio Call', date: '2026-03-20', time: '14:30', duration: 30, price: 119.70 },
  { id: '5', client: 'Michael T.', service: 'Live Chat',  date: '2026-03-21', time: '10:00', duration: 15, price:  44.85 },
];

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
      <span className="text-white font-bold text-base">{name[0]}</span>
    </div>
  );
}

function ConsultationCard({
  item,
  variant,
  onDecline,
}: {
  item: Consultation;
  variant: 'completed' | 'new';
  onDecline?: (id: string) => void;
}) {
  return (
    <div className="border border-gray-200 rounded-xl px-5 py-4 bg-white flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
      <div className="flex items-start gap-4">
        <Avatar name={item.client} />
        <div className="space-y-0.5">
          <p className="font-bold text-sm text-[#1A1A1A]">{item.client}</p>
          <p className="text-sm text-gray-500">📞 {item.service}</p>
          <p className="text-sm text-gray-500">📅 {item.date} at {item.time}</p>
          <p className="text-sm text-gray-500">⏱ {item.duration} min</p>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 sm:shrink-0">
        <span className="font-bold text-green-600 text-base">${item.price.toFixed(2)}</span>
        {variant === 'completed' ? (
          <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-md">Confirmed</span>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => onDecline?.(item.id)}
              className="px-4 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
            >
              Decline
            </button>
            <button
              onClick={() => toast.success('Joining consultation...')}
              className="px-4 py-1.5 text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg cursor-pointer transition-colors"
            >
              Join
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

type Tab = 'completed' | 'new';

export default function ConsultationsPage() {
  const [tab, setTab]       = useState<Tab>('completed');
  const [newList, setNewList] = useState(INITIAL_NEW);

  const handleDecline = (id: string) => {
    setNewList(p => p.filter(c => c.id !== id));
    toast.error('Consultation declined');
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-white rounded-lg shadow-sm px-3 sm:px-5 py-3 sm:py-4 space-y-1">
          <p className="text-xs sm:text-sm text-gray-500">Upcoming</p>
          <p className="text-2xl sm:text-4xl font-black text-violet-600">3</p>
          <p className="text-xs sm:text-sm text-gray-400">Next 7 days</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm px-3 sm:px-5 py-3 sm:py-4 space-y-1">
          <p className="text-xs sm:text-sm text-gray-500">This Week</p>
          <p className="text-2xl sm:text-4xl font-black text-[#1A1A1A]">12</p>
          <p className="text-xs sm:text-sm text-green-500 font-medium">+3 last week</p>
        </div>
        <div className="bg-white rounded-lg shadow-sm px-3 sm:px-5 py-3 sm:py-4 space-y-1">
          <p className="text-xs sm:text-sm text-gray-500">Avg. Duration</p>
          <p className="text-2xl sm:text-4xl font-black text-[#1A1A1A]">18m</p>
          <p className="text-xs sm:text-sm text-gray-400">Per session</p>
        </div>
      </div>

      {/* Tabs + list */}
      <div className="bg-white rounded-lg shadow-sm">
        {/* Tab bar */}
        <div className="flex border-b border-gray-100 px-5">
          {(['completed', 'new'] as Tab[]).map(t => {
            const label = t === 'new' ? `New${newList.length ? ` (${newList.length})` : ''}` : 'Completed';
            const active = tab === t;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`py-4 px-1 mr-6 text-sm font-semibold border-b-2 transition-colors cursor-pointer ${
                  active
                    ? 'border-violet-600 text-violet-600'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Cards */}
        <div className="p-5 space-y-3">
          {tab === 'completed'
            ? COMPLETED.map(c => <ConsultationCard key={c.id} item={c} variant="completed" />)
            : newList.length === 0
              ? <p className="text-sm text-gray-400 py-4 text-center">No new consultations</p>
              : newList.map(c => <ConsultationCard key={c.id} item={c} variant="new" onDecline={handleDecline} />)
          }
        </div>
      </div>
    </div>
  );
}
