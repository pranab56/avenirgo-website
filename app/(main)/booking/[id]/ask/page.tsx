'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, FileText, Send } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { ALL_MEDIUMS } from '../../../marketplace/data';

const MAX_CHARS = 1000;

type QA = {
  question: string;
  askedAt: string;
  answer: string;
  answeredAt: string;
};

const PREVIOUS_QAS: QA[] = [
  {
    question: "I've been experiencing occasional chest pains. Should I be concerned?",
    askedAt: '2 weeks ago',
    answer:
      "Thank you for reaching out. Chest pain should always be taken seriously. I recommend scheduling an urgent appointment so we can run some tests including an EKG and possibly a stress test. In the meantime, avoid strenuous activity and note when the pain occurs.",
    answeredAt: "Dr. Johnson's Response",
  },
  {
    question: 'What lifestyle changes would you recommend for better heart health?',
    askedAt: '1 month ago',
    answer:
      "Great question! I recommend: 1) Regular exercise (150 min/week), 2) Mediterranean diet rich in omega-3s, 3) Stress management, 4) Adequate sleep (7-8 hours), 5) Regular health screenings. Let's discuss a personalized plan in your next appointment.",
    answeredAt: "Dr. Johnson's Response",
  },
];

export default function AskPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const medium = ALL_MEDIUMS.find(m => m.id === id);

  const [question, setQuestion] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [qaList, setQaList] = useState<QA[]>(PREVIOUS_QAS);

  if (!medium) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold">Medium not found</p>
      </div>
    );
  }

  const writtenSvc = medium.services.find(s => s.type === 'written');

  const handleSubmit = () => {
    if (!question.trim()) return;
    setQaList(prev => [
      {
        question: question.trim(),
        askedAt: 'Just now',
        answer: '',
        answeredAt: '',
      },
      ...prev,
    ]);
    setQuestion('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-20">
      <div className="container mx-auto px-6 max-w-4xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-white cursor-pointer shadow-sm flex items-center justify-center hover:shadow-md transition-all"
          >
            <ArrowLeft size={18} className="text-[#1A1A1A]" />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm">
              <Image src={medium.image} alt={medium.name} width={40} height={40} className="object-cover w-full h-full" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#1A1A1A] leading-tight">Ask a Question</h1>
              <p className="text-xs text-[#666666]">to {medium.name}</p>
            </div>
          </div>
        </div>

        {/* Submit form */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6 space-y-4">
          <div>
            <h2 className="font-bold text-lg text-[#1A1A1A]">Ask a Question</h2>
            <p className="text-sm text-[#666666] mt-0.5">
              Submit a written question and get a detailed response within 24 hours
              {writtenSvc && <span className="text-violet-600 font-bold"> · ${writtenSvc.price}</span>}
            </p>
          </div>

          <div>
            <label className="text-xs font-bold text-[#1A1A1A]/50 uppercase tracking-widest block mb-2">
              Your Question
            </label>
            <textarea
              value={question}
              onChange={e => setQuestion(e.target.value.slice(0, MAX_CHARS))}
              placeholder="Type your detailed question here..."
              rows={6}
              className="w-full resize-none rounded-lg border border-black/8 bg-gray-50 p-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/25 outline-none focus:ring-2 focus:ring-violet-400/20 transition-all"
            />
            <div className="flex items-center justify-between mt-1.5 text-xs text-[#666666]">
              <span className={question.length >= MAX_CHARS ? 'text-red-500 font-bold' : ''}>
                {question.length} characters
              </span>
              <span className="flex items-center gap-1.5 text-[#666666]/60">
                <CheckCircle2 size={11} className="text-green-500" />
                Response within 24–48 hours
              </span>
            </div>
          </div>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 bg-green-50 text-green-700 rounded-2xl px-5 py-3.5"
            >
              <CheckCircle2 size={18} />
              <span className="font-bold text-sm">{"Question submitted! You'll hear back in 24–48 hours."}</span>
            </motion.div>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!question.trim()}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-40 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
            >
              <Send size={15} />
              Submit Question
            </button>
          )}

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 pt-1">
            {[
              { icon: CheckCircle2, label: 'Detailed written response' },
              { icon: CheckCircle2, label: '24–48 hour turnaround' },
              { icon: CheckCircle2, label: 'Private & confidential' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-1.5 text-xs text-[#666666] font-medium">
                <Icon size={12} className="text-green-500 shrink-0" />
                {label}
              </div>
            ))}
          </div>
        </div>

        {/* Previous Q&As */}
        {qaList.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <FileText size={16} className="text-violet-500" />
              <h3 className="font-bold text-[#1A1A1A]">Previous Questions</h3>
            </div>

            {qaList.map((qa, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white rounded-lg p-5 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <p className="font-semibold text-sm text-[#1A1A1A] leading-relaxed">{qa.question}</p>
                  <span className="text-xs text-[#666666] shrink-0 whitespace-nowrap">{qa.askedAt}</span>
                </div>

                {qa.answer ? (
                  <div className="bg-violet-50 rounded-lg p-4 space-y-2">
                    <p className="text-xs font-bold text-violet-600">{qa.answeredAt}</p>
                    <p className="text-sm text-[#1A1A1A]/80 leading-relaxed">{qa.answer}</p>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 bg-yellow-50 rounded-2xl px-4 py-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    <p className="text-xs font-bold text-yellow-600">Awaiting response (24–48 hours)</p>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}
