'use client';

import { useState } from 'react';

type HistoryItem = {
  id: string;
  advisor: string;
  date: string;
  detail: string;
  price: number;
  reviewed: boolean;
};

const HISTORY: HistoryItem[] = [
  { id: '1', advisor: 'Luna Starlight', date: '2026-03-18', detail: '15 min', price: 59.85, reviewed: true },
  { id: '2', advisor: 'Sarah Moon', date: '2026-03-15', detail: '10 min', price: 29.90, reviewed: true },
  { id: '3', advisor: 'Marcus Silva', date: '2026-03-12', detail: 'Written Q&A', price: 19.99, reviewed: false },
  { id: '4', advisor: 'Luna Starlight', date: '2026-03-08', detail: '20 min', price: 79.80, reviewed: true },
];

function Avatar({ name }: { name: string }) {
  return (
    <div className="w-12 h-12 rounded-full bg-violet-600 flex items-center justify-center shrink-0">
      <span className="text-white font-bold text-base">{name[0]}</span>
    </div>
  );
}

export default function HistoryPage() {
  const [items, setItems] = useState(HISTORY);

  const handleReview = (id: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, reviewed: true } : item));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="font-bold text-xl text-[#1A1A1A] mb-6">Consultation History</h2>

      <div className="divide-y divide-gray-100">
        {items.map(item => (
          <div key={item.id} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 py-5 first:pt-0 last:pb-0">
            <div className="flex items-center gap-4 flex-1 min-w-0">
              <Avatar name={item.advisor} />
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm text-[#1A1A1A]">{item.advisor}</p>
                <p className="text-sm text-gray-400 mt-0.5">{item.date} • {item.detail}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 pl-16 sm:pl-0 shrink-0">
              <span className="font-bold text-[#1A1A1A] text-base">${item.price.toFixed(2)}</span>

              {item.reviewed ? (
                <span className="px-3 py-1.5 text-sm font-medium text-yellow-700 bg-yellow-100 rounded-md flex items-center gap-1.5">
                  ⭐ Reviewed
                </span>
              ) : (
                <button
                  onClick={() => handleReview(item.id)}
                  className="px-3 py-1.5 text-sm font-medium text-violet-600 border border-violet-500 rounded-md hover:bg-violet-50 transition-colors cursor-pointer"
                >
                  Leave Review
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
