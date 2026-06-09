'use client';

import { ALL_MEDIUMS } from '../../../marketplace/data';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { Paperclip, PhoneOff, Send } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useEffect, useRef, useState } from 'react';

type Message = {
  id: string;
  from: 'medium' | 'user';
  text: string;
  time: string;
};

function nowTime() {
  return new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const medium = ALL_MEDIUMS.find(m => m.id === id);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: '0',
      from: 'medium',
      text: `Welcome! I'm ${medium?.name ?? 'your medium'}. I'm here to provide you with guidance and clarity. How can I help you today?`,
      time: nowTime(),
    },
  ]);
  const [input, setInput] = useState('');
  const [seconds, setSeconds] = useState(0);
  const [ended, setEnded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (ended) return;
    const t = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [ended]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!medium) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-bold">Medium not found</p>
      </div>
    );
  }

  const rate = medium.services.find(s => s.type === 'chat')?.price ?? 0;
  const cost = ((seconds / 60) * rate).toFixed(2);
  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;

  const sendMessage = () => {
    const text = input.trim();
    if (!text) return;
    const userMsg: Message = { id: Date.now().toString(), from: 'user', text, time: nowTime() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // Simulate medium reply after 2s
    setTimeout(() => {
      const replies = [
        "I sense a strong energy around you. Let me focus on that for a moment...",
        "That's very interesting. The cards are showing me something significant here.",
        "I'm picking up on some important signals. Can you tell me more about your situation?",
        "The spirits are guiding me towards a message for you. Please be patient.",
        "I see clarity coming your way. Trust the process and stay open to the signs.",
      ];
      const reply: Message = {
        id: (Date.now() + 1).toString(),
        from: 'medium',
        text: replies[Math.floor(Math.random() * replies.length)],
        time: nowTime(),
      };
      setMessages(prev => [...prev, reply]);
    }, 1800);
  };

  const handleEnd = () => {
    setEnded(true);
    setTimeout(() => router.back(), 2000);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col pt-20">

      {/* Chat header */}
      <div className="bg-white border-b border-black/5 px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0">
            <Image src={medium.image} alt={medium.name} width={40} height={40} className="object-cover w-full h-full" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <p className="font-bold text-sm text-[#1A1A1A]">{medium.name}</p>
              <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-[10px] font-bold text-green-600">Online</span>
            </div>
            <p className="text-xs text-[#666666]">{medium.specialties[0]}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-1.5">
            <span className="text-sm font-bold text-[#1A1A1A] tabular-nums">{formatTime(seconds)}</span>
            <span className="h-3 w-px bg-black/10" />
            <span className="text-sm font-bold text-violet-600">${cost}</span>
          </div>
          {/* End button */}
          <button
            onClick={handleEnd}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-red-500 hover:bg-red-600 text-white font-bold text-xs rounded-xl transition-colors shadow-sm shadow-red-500/20"
          >
            <PhoneOff size={13} />
            End
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-grow overflow-y-auto px-6 py-6 space-y-4 bg-gray-50">
        <AnimatePresence initial={false}>
          {messages.map(msg => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className={cn('flex', msg.from === 'user' ? 'justify-end' : 'justify-start')}
            >
              <div className={cn('max-w-[72%] space-y-1', msg.from === 'user' ? 'items-end' : 'items-start')}>
                {msg.from === 'medium' && (
                  <p className="text-xs font-bold text-[#666666] ml-1">{medium.name}</p>
                )}
                <div
                  className={cn(
                    'px-4 py-3 rounded-2xl text-sm leading-relaxed',
                    msg.from === 'user'
                      ? 'bg-violet-600 text-white rounded-tr-sm'
                      : 'bg-white text-[#1A1A1A] shadow-sm rounded-tl-sm'
                  )}
                >
                  {msg.text}
                </div>
                <p className={cn('text-[10px] text-[#1A1A1A]/30 px-1', msg.from === 'user' ? 'text-right' : 'text-left')}>
                  {msg.time}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {ended && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-4"
          >
            <p className="text-sm font-bold text-[#666666]">Session ended. Redirecting...</p>
          </motion.div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input bar */}
      {!ended && (
        <div className="bg-white border-t border-black/5 px-6 py-4">
          <div className="flex items-end gap-3">
            <div className="flex-grow bg-gray-50 rounded-2xl border border-black/8 px-4 py-3 flex items-end gap-3">
              <textarea
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
                placeholder="Type your message..."
                rows={1}
                className="flex-grow bg-transparent text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/30 outline-none resize-none"
              />
              <input ref={fileRef} type="file" className="hidden" />
              <button
                onClick={() => fileRef.current?.click()}
                className="text-[#1A1A1A]/30 hover:text-violet-500 transition-colors shrink-0"
              >
                <Paperclip size={18} />
              </button>
            </div>
            <button
              onClick={sendMessage}
              disabled={!input.trim()}
              className="w-11 h-11 rounded-2xl bg-violet-600 hover:bg-violet-700 disabled:opacity-30 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all active:scale-95 shadow-lg shadow-violet-500/20 shrink-0"
            >
              <Send size={16} />
            </button>
          </div>
          <p className="text-[10px] text-[#1A1A1A]/25 text-center mt-2">
            Attach file
          </p>
        </div>
      )}

    </div>
  );
}
