'use client';

import { Send } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

type Question = {
  id: string;
  client: string;
  question: string;
  date: string;
};

const INITIAL: Question[] = [
  { id: '1', client: 'Sarah M.',   question: "What guidance can you offer regarding my career transition? I'm considering a major change.", date: '2026-03-11' },
  { id: '2', client: 'Michael R.', question: "Can you provide insight into my relationship? We've been facing challenges lately.", date: '2026-03-11' },
  { id: '3', client: 'Jessica L.', question: 'I keep having recurring dreams about water. What could this mean spiritually?', date: '2026-03-10' },
];

function PendingBadge() {
  return (
    <span className="px-2 py-0.5 text-xs font-semibold text-orange-500 bg-orange-100 rounded-md">Pending</span>
  );
}

export default function QAPage() {
  const [questions, setQuestions] = useState(INITIAL);
  const [answering, setAnswering] = useState<Question | null>(null);
  const [answer, setAnswer] = useState('');

  const handleSubmit = () => {
    if (!answer.trim()) return;
    setQuestions(p => p.filter(q => q.id !== answering!.id));
    toast.success('Answer submitted');
    setAnswering(null);
    setAnswer('');
  };

  const handleCancel = () => {
    setAnswering(null);
    setAnswer('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
      <h2 className="font-bold text-xl text-[#1A1A1A]">Pending Written Questions ({questions.length})</h2>

      {answering ? (
        /* ── Answer panel ── */
        <div className="border border-gray-200 rounded-xl p-5 space-y-5">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-base text-[#1A1A1A]">Answer Question</h3>
            <button onClick={handleCancel} className="text-sm text-gray-500 hover:text-gray-700 cursor-pointer transition-colors">
              Cancel
            </button>
          </div>

          {/* Question preview */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-1">
            <p className="text-xs text-gray-400 font-medium">Question from {answering.client}:</p>
            <p className="text-sm text-[#1A1A1A]">{answering.question}</p>
            <p className="text-xs text-gray-400 mt-1">Asked on {answering.date}</p>
          </div>

          {/* Answer textarea */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-[#1A1A1A]">Your Answer</label>
            <textarea
              value={answer}
              onChange={e => setAnswer(e.target.value)}
              placeholder="Type your detailed answer here..."
              rows={7}
              className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
            />
            <p className="text-xs text-gray-400">{answer.length} characters</p>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!answer.trim()}
            className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium cursor-pointer transition-colors flex items-center justify-center gap-2"
          >
            <Send size={14} />
            Submit Answer
          </button>
        </div>
      ) : (
        /* ── Question list ── */
        <div className="space-y-4">
          {questions.length === 0 ? (
            <p className="text-sm text-gray-400 py-4 text-center">No pending questions</p>
          ) : (
            questions.map(q => (
              <div key={q.id} className="border border-gray-200 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#1A1A1A]">{q.client}</span>
                  <PendingBadge />
                </div>
                <p className="text-sm text-gray-700">{q.question}</p>
                <p className="text-xs text-gray-400">Asked on {q.date}</p>

                <button
                  onClick={() => { setAnswering(q); setAnswer(''); }}
                  className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium cursor-pointer transition-colors flex items-center justify-center gap-2"
                >
                  <Send size={14} />
                  Answer Question
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
