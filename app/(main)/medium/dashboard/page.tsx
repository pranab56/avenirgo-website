'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Shield, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const ALL_TRANSACTIONS = [
  { id: '1', type: 'debit' as const, title: 'Withdrawal to Bank', date: '2026-03-19', amount: 100.0, balance: 155.0 },
  { id: '2', type: 'credit' as const, title: 'Sarah M. - Audio Call (15 min)', date: '2026-03-18', amount: 59.85, status: 'Completed' },
  { id: '3', type: 'credit' as const, title: 'Michael R. - Live Chat (10 min)', date: '2026-03-17', amount: 29.9, status: 'Completed' },
  { id: '4', type: 'credit' as const, title: 'Jessica L. - Written Question', date: '2026-03-16', amount: 19.99, status: 'Completed' },
  { id: '5', type: 'credit' as const, title: 'David K. - Audio Call (20 min)', date: '2026-03-15', amount: 79.8, status: 'Completed' },
  { id: '6', type: 'credit' as const, title: 'Emma W. - Live Chat (8 min)', date: '2026-03-14', amount: 23.92, status: 'Completed' },
];

const MY_EARNINGS = ALL_TRANSACTIONS.filter(t => t.type === 'credit');

const PRESETS = [50, 100, 200, 500];

export default function MediumWalletPage() {
  const [balance] = useState(155.0);
  const [activeTab, setActiveTab] = useState<'all' | 'earnings'>('earnings');
  const [withdrawOpen, setWithdrawOpen] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState('');

  const rows = activeTab === 'all' ? ALL_TRANSACTIONS : MY_EARNINGS;

  const handleWithdraw = () => {
    const amount = parseFloat(withdrawAmount);
    if (!amount || amount <= 0) { toast.error('Enter a valid amount'); return; }
    if (amount > balance) { toast.error('Insufficient balance'); return; }
    toast.success(`$${amount.toFixed(2)} withdrawal requested`);
    setWithdrawOpen(false);
    setWithdrawAmount('');
  };

  return (
    <>
      <div className="space-y-4">
        {/* Balance card */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-lg px-6 sm:px-8 py-6 sm:py-7 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shadow-lg shadow-violet-500/20">
          <div>
            <p className="text-white/70 text-sm mb-1">Available Balance</p>
            <p className="text-white text-4xl sm:text-5xl font-black">${balance.toFixed(2)}</p>
          </div>
          <button
            onClick={() => setWithdrawOpen(true)}
            className="w-full sm:w-auto px-7 py-2.5 bg-white text-violet-700 hover:bg-violet-50 font-bold text-sm rounded-sm cursor-pointer transition-all active:scale-[0.98] shadow-sm"
          >
            Top Up
          </button>
        </div>

        {/* Transactions card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-gray-100 px-6">
            {[
              { id: 'all', label: 'All Transactions' },
              { id: 'earnings', label: 'My Earnings' },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'all' | 'earnings')}
                className={cn(
                  'py-4 mr-6 text-sm font-semibold border-b-2 cursor-pointer transition-all -mb-px',
                  activeTab === tab.id
                    ? 'border-violet-600 text-violet-600'
                    : 'border-transparent text-gray-400 hover:text-gray-600'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
              >
                {rows.map((tx, i) => (
                  <motion.div
                    key={tx.id}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
                  >
                    <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                      <Check size={15} className="text-green-600" strokeWidth={2.5} />
                    </div>

                    <div className="flex-grow min-w-0">
                      <p className="font-semibold text-sm text-[#1A1A1A] truncate">{tx.title}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{tx.date}</p>
                    </div>

                    <div className="text-right shrink-0">
                      <p className="font-bold text-sm text-green-600">+${tx.amount.toFixed(2)}</p>
                      {'status' in tx && (
                        <p className="text-xs text-green-500 mt-0.5">{tx.status}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
            <Shield size={13} />
            Security &amp; Privacy
          </div>
        </div>
      </div>

      {/* Withdraw modal */}
      <AnimatePresence>
        {withdrawOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setWithdrawOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="bg-white rounded-lg shadow-2xl w-full max-w-sm p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#1A1A1A]">Withdraw Earnings</h3>
                  <button
                    onClick={() => setWithdrawOpen(false)}
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors cursor-pointer"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {PRESETS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => setWithdrawAmount(String(amt))}
                      className={cn(
                        'px-4 py-2 rounded-xl text-sm font-bold transition-all border-2',
                        withdrawAmount === String(amt)
                          ? 'border-violet-500 bg-violet-50 text-violet-700'
                          : 'border-gray-200 text-gray-600 hover:border-violet-300'
                      )}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">Custom Amount</label>
                  <div className="relative mt-1.5">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      min="1"
                      value={withdrawAmount}
                      onChange={e => setWithdrawAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full h-11 pl-8 pr-4 rounded-xl border border-gray-200 text-sm font-bold text-[#1A1A1A] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleWithdraw}
                  disabled={!withdrawAmount}
                  className="w-full py-3.5 rounded-2xl cursor-pointer bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
                >
                  Request Withdrawal
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
