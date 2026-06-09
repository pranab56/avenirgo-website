'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowDown, ArrowUp, Shield, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

const TRANSACTIONS = [
  { id: '1', type: 'debit' as const, title: 'Consultation with Luna Starlight', date: '2026-03-18', amount: 45.0, balance: 155.0 },
  { id: '2', type: 'credit' as const, title: 'Wallet Top-up', date: '2026-03-17', amount: 100.0, balance: 200.0 },
  { id: '3', type: 'debit' as const, title: 'Written Question - Marcus Silva', date: '2026-03-15', amount: 19.99, balance: 100.0 },
  { id: '4', type: 'credit' as const, title: 'Wallet Top-up', date: '2026-03-14', amount: 50.0, balance: 119.99 },
  { id: '5', type: 'debit' as const, title: 'Live Chat - Sarah Moon', date: '2026-03-12', amount: 29.97, balance: 69.99 },
];

const PRESETS = [10, 25, 50, 100];

export default function WalletPage() {
  const [balance, setBalance] = useState(155.0);
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [topUpOpen, setTopUpOpen] = useState(false);
  const [topUpAmount, setTopUpAmount] = useState('');

  const handleTopUp = () => {
    const amount = parseFloat(topUpAmount);
    if (!amount || amount <= 0) { toast.error('Enter a valid amount'); return; }
    const newBalance = balance + amount;
    const newTx = {
      id: Date.now().toString(),
      type: 'credit' as const,
      title: 'Wallet Top-up',
      date: new Date().toISOString().split('T')[0],
      amount,
      balance: newBalance,
    };
    setTransactions(prev => [newTx, ...prev]);
    setBalance(newBalance);
    toast.success(`$${amount.toFixed(2)} added to your wallet`);
    setTopUpOpen(false);
    setTopUpAmount('');
  };

  return (
    <>
      <div className="space-y-4">
        {/* Balance card */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-700 rounded-2xl px-8 py-7 flex items-center justify-between shadow-lg shadow-violet-500/20">
          <div>
            <p className="text-white/70 text-sm mb-1">Available Balance</p>
            <p className="text-white text-5xl font-black">${balance.toFixed(2)}</p>
          </div>
          <button
            onClick={() => setTopUpOpen(true)}
            className="px-7 py-2.5 bg-white text-violet-700 hover:bg-violet-50 font-bold text-sm rounded-xl transition-all active:scale-[0.98] shadow-sm"
          >
            Top Up
          </button>
        </div>

        {/* Transactions card */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {/* Tab header */}
          <div className="px-6 border-b border-gray-100">
            <div className="inline-block py-4 text-sm font-bold text-violet-600 border-b-2 border-violet-600 -mb-px">
              All Transactions
            </div>
          </div>

          {/* Rows */}
          <div className="divide-y divide-gray-50">
            {transactions.map((tx, i) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.04 }}
                className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50/50 transition-colors"
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center shrink-0',
                  tx.type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                )}>
                  {tx.type === 'credit'
                    ? <ArrowUp size={16} className="text-green-600" />
                    : <ArrowDown size={16} className="text-red-500" />
                  }
                </div>

                <div className="flex-grow min-w-0">
                  <p className="font-semibold text-sm text-[#1A1A1A] truncate">{tx.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{tx.date}</p>
                </div>

                <div className="text-right shrink-0">
                  <p className={cn('font-bold text-sm', tx.type === 'credit' ? 'text-green-600' : 'text-red-500')}>
                    {tx.type === 'credit' ? '+' : '-'}${tx.amount.toFixed(2)}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">Balance: ${tx.balance.toFixed(2)}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-gray-50 flex items-center gap-2 text-xs text-gray-400">
            <Shield size={13} />
            Security &amp; Privacy
          </div>
        </div>
      </div>

      {/* Top Up modal */}
      <AnimatePresence>
        {topUpOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={() => setTopUpOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              className="fixed inset-0 z-50 flex items-center justify-center px-4"
            >
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-sm p-6 space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-[#1A1A1A]">Top Up Wallet</h3>
                  <button
                    onClick={() => setTopUpOpen(false)}
                    className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>

                <div className="flex gap-2 flex-wrap">
                  {PRESETS.map(amt => (
                    <button
                      key={amt}
                      onClick={() => setTopUpAmount(String(amt))}
                      className={cn(
                        'px-4 py-2 rounded-xl text-sm font-bold transition-all border-2',
                        topUpAmount === String(amt)
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
                      value={topUpAmount}
                      onChange={e => setTopUpAmount(e.target.value)}
                      placeholder="0.00"
                      className="w-full h-11 pl-8 pr-4 rounded-xl border border-gray-200 text-sm font-bold text-[#1A1A1A] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
                    />
                  </div>
                </div>

                <button
                  onClick={handleTopUp}
                  disabled={!topUpAmount}
                  className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-40 text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
                >
                  Add Funds
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
