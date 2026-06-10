'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const PAYOUT_METHODS = ['Bank Transfer', 'PayPal', 'Stripe', 'Wise'];

const HISTORY = [
  { id: '1', method: 'Bank Transfer', date: '2026-03-01', amount: 4621.80 },
  { id: '2', method: 'Bank Transfer', date: '2026-02-01', amount: 4234.50 },
  { id: '3', method: 'Bank Transfer', date: '2026-01-01', amount: 3987.20 },
];

const inputCls =
  'w-full h-11 px-4 rounded-lg border border-gray-200 bg-white text-sm text-[#1A1A1A] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all';

export default function EarningsPage() {
  const [threshold, setThreshold] = useState('100');
  const [method, setMethod]       = useState('');

  const handleUpdate = () => toast.success('Settings updated');
  const handlePayout = () => toast.success('Payout requested');

  return (
    <div className="space-y-4">
      {/* Total Earnings banner */}
      <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg px-6 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg shadow-green-500/20">
        <div>
          <p className="text-white/80 text-sm mb-1">Total Earnings</p>
          <p className="text-white text-4xl sm:text-5xl font-black">$4,982.30</p>
          <p className="text-white/70 text-sm mt-1">Available for withdrawal</p>
        </div>
        <button
          onClick={handlePayout}
          className="w-full sm:w-auto px-6 py-2.5 bg-white text-green-700 hover:bg-green-50 font-semibold text-sm rounded-lg cursor-pointer transition-all active:scale-[0.98] shadow-sm"
        >
          Request Payout
        </button>
      </div>

      {/* Payout Settings */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
        <h2 className="font-bold text-xl text-[#1A1A1A]">Payout Settings</h2>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Minimum Payout Threshold</label>
          <div className="flex items-center h-11 w-40 px-4 rounded-lg border border-gray-200 bg-white gap-2 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
            <span className="text-gray-400 text-sm">$</span>
            <input
              type="number"
              min="0"
              value={threshold}
              onChange={e => setThreshold(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#1A1A1A] outline-none"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Payout Method</label>
          <select
            value={method}
            onChange={e => setMethod(e.target.value)}
            className={`${inputCls} w-48 cursor-pointer`}
          >
            <option value="" disabled />
            {PAYOUT_METHODS.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <button
          onClick={handleUpdate}
          className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg cursor-pointer transition-colors active:scale-[0.98]"
        >
          Update Settings
        </button>
      </div>

      {/* Payout History */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-xl text-[#1A1A1A]">Payout History</h2>

        <div className="divide-y divide-gray-100">
          {HISTORY.map(row => (
            <div key={row.id} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
              <div>
                <p className="font-semibold text-sm text-[#1A1A1A]">{row.method}</p>
                <p className="text-xs text-gray-400 mt-0.5">{row.date}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-[#1A1A1A]">${row.amount.toFixed(2)}</span>
                <span className="px-3 py-1 text-xs font-semibold text-green-700 bg-green-100 rounded-md">Completed</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
