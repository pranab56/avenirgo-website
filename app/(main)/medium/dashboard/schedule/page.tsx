'use client';

import { cn } from '@/lib/utils';
import { Calendar, ChevronLeft, ChevronRight, Pencil, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';

// ── helpers ───────────────────────────────────────────────────────────────────
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DAY_NAMES   = ['SUN','MON','TUE','WED','THU','FRI','SAT'];
const TIMELINE_START  = 9  * 60;
const TIMELINE_END    = 21 * 60;
const TIMELINE_LABELS = [9,10,11,12,13,14,15,16,17,18,19,20,21];

const getDaysInMonth = (y: number, m: number) => new Date(y, m + 1, 0).getDate();
const getFirstDay    = (y: number, m: number) => new Date(y, m, 1).getDay();
const pct  = (mins: number) => ((mins - TIMELINE_START) / (TIMELINE_END - TIMELINE_START)) * 100;

function toLabel(mins: number) {
  const h = Math.floor(mins / 60), m = mins % 60;
  const ampm = h < 12 ? 'AM' : 'PM';
  const hour = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function parseTime(s: string): number | null {
  const [h, m] = s.split(':').map(Number);
  if (isNaN(h) || isNaN(m)) return null;
  return h * 60 + m;
}

function genSlots(start: number, end: number) {
  const out: number[] = [];
  for (let t = start; t < end; t += 15) out.push(t);
  return out;
}

// ── types ─────────────────────────────────────────────────────────────────────
type Block = { id: string; startMin: number; endMin: number; selected: Set<number>; expanded: boolean };

// ── page ──────────────────────────────────────────────────────────────────────
export default function SchedulePage() {
  const [viewYear,  setViewYear]  = useState(2024);
  const [viewMonth, setViewMonth] = useState(11);
  const [pickedDay, setPickedDay] = useState<number | null>(26);
  const [blocks, setBlocks] = useState<Block[]>([{
    id: 'default', startMin: 9 * 60, endMin: 17 * 60,
    selected: new Set(genSlots(9 * 60, 17 * 60)), expanded: true,
  }]);
  const [startTime, setStartTime] = useState('');
  const [endTime,   setEndTime]   = useState('');

  const prevMonth = () => viewMonth === 0  ? (setViewMonth(11), setViewYear(y => y - 1)) : setViewMonth(m => m - 1);
  const nextMonth = () => viewMonth === 11 ? (setViewMonth(0),  setViewYear(y => y + 1)) : setViewMonth(m => m + 1);

  const deleteBlock  = (id: string) => setBlocks(p => p.filter(b => b.id !== id));
  const toggleExpand = (id: string) => setBlocks(p => p.map(b => b.id === id ? { ...b, expanded: !b.expanded } : b));
  const selectAll    = (id: string) => setBlocks(p => p.map(b => b.id === id ? { ...b, selected: new Set(genSlots(b.startMin, b.endMin)) } : b));
  const clearAll     = (id: string) => setBlocks(p => p.map(b => b.id === id ? { ...b, selected: new Set<number>() } : b));

  const toggleSlot = (id: string, slot: number) =>
    setBlocks(p => p.map(b => {
      if (b.id !== id) return b;
      const s = new Set(b.selected);
      if (s.has(slot)) { s.delete(slot); } else { s.add(slot); }
      return { ...b, selected: s };
    }));

  const addBlock = () => {
    const s = parseTime(startTime), e = parseTime(endTime);
    if (s === null || e === null || e <= s) { toast.error('Enter a valid time range'); return; }
    if (s < TIMELINE_START || e > TIMELINE_END) { toast.error('Must be between 9 AM – 9 PM'); return; }
    setBlocks(p => [
      ...p.map(b => ({ ...b, expanded: false })),
      { id: Date.now().toString(), startMin: s, endMin: e, selected: new Set(genSlots(s, e)), expanded: true },
    ]);
    setStartTime(''); setEndTime('');
  };

  const daysInMonth = getDaysInMonth(viewYear, viewMonth);
  const firstDay    = getFirstDay(viewYear, viewMonth);
  const dateLabel   = pickedDay ? `${MONTH_NAMES[viewMonth]} ${pickedDay}` : 'Selected Date';

  return (
    <div className="space-y-4">

      {/* Calendar */}
      <div className="bg-white rounded-lg shadow-sm p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-bold text-lg text-[#1A1A1A]">{MONTH_NAMES[viewMonth]} {viewYear}</h2>
          <div className="flex gap-1">
            <button onClick={prevMonth} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer transition-colors"><ChevronLeft size={16}/></button>
            <button onClick={nextMonth} className="w-7 h-7 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer transition-colors"><ChevronRight size={16}/></button>
          </div>
        </div>

        <div className="grid grid-cols-7 mb-1">
          {DAY_NAMES.map(d => <div key={d} className="text-center text-xs font-semibold text-gray-400 py-2">{d}</div>)}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const active = pickedDay === day;
            return (
              <button
                key={day}
                onClick={() => setPickedDay(day)}
                className={cn(
                  'relative aspect-square flex flex-col items-center justify-center text-sm font-medium rounded-lg transition-colors cursor-pointer m-0.5',
                  active ? 'bg-violet-600 text-white' : 'hover:bg-gray-100 text-[#1A1A1A]'
                )}
              >
                {day}
                {active && <span className="absolute bottom-1.5 w-1 h-1 rounded-full bg-white/70" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Availability Timeline */}
      <div className="bg-white rounded-lg shadow-sm p-5 space-y-4">
        <div className="flex items-center gap-2">
          <Calendar size={15} className="text-violet-600" />
          <span className="font-semibold text-sm text-[#1A1A1A]">Availability Timeline</span>
        </div>

        {/* Time axis */}
        <div>
          <div className="flex justify-between text-[10px] sm:text-xs text-gray-400 mb-1.5">
            {TIMELINE_LABELS.map((h, i) => (
              <span key={h} className={i % 2 !== 0 ? 'hidden sm:inline' : ''}>
                {h < 12 ? `${h} AM` : h === 12 ? '12 PM' : `${h - 12} PM`}
              </span>
            ))}
          </div>
          <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden">
            {blocks.map(b => (
              <div
                key={b.id}
                className="absolute top-0 h-full bg-violet-500 rounded-full"
                style={{ left: `${pct(b.startMin)}%`, width: `${pct(b.endMin) - pct(b.startMin)}%` }}
              />
            ))}
          </div>
        </div>

        {/* Block cards */}
        {blocks.map(b => {
          const allSlots  = genSlots(b.startMin, b.endMin);
          const selCount  = b.selected.size;
          const totalMin  = b.endMin - b.startMin;
          const h = Math.floor(totalMin / 60), m = totalMin % 60;
          const durLabel  = m ? `${h}h ${m}m` : `${h}h`;

          return (
            <div key={b.id} className="border border-gray-200 rounded-xl overflow-hidden">
              {/* header */}
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="font-bold text-sm text-[#1A1A1A]">{toLabel(b.startMin)} – {toLabel(b.endMin)}</span>
                  <span className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{durLabel}</span>
                  <span className="text-xs font-semibold text-violet-600">{selCount} sessions available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <button onClick={() => toggleExpand(b.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer">
                    <Pencil size={13} className="text-gray-500" />
                  </button>
                  <button onClick={() => deleteBlock(b.id)} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 cursor-pointer">
                    <Trash2 size={13} className="text-red-400" />
                  </button>
                </div>
              </div>

              {/* fine-tune panel */}
              {b.expanded && (
                <div className="border-t border-gray-100 px-4 py-4 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-semibold text-[#1A1A1A]">Fine-tune your availability</p>
                      <p className="text-xs text-gray-400 mt-0.5">Click or drag to select/deselect 15-minute intervals</p>
                    </div>
                    <div className="flex gap-3 text-xs font-semibold shrink-0">
                      <button onClick={() => selectAll(b.id)} className="text-violet-600 hover:underline cursor-pointer">Select All</button>
                      <button onClick={() => clearAll(b.id)} className="text-gray-500 hover:underline cursor-pointer">Clear All</button>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {allSlots.map(slot => (
                      <button
                        key={slot}
                        onClick={() => toggleSlot(b.id, slot)}
                        className={cn(
                          'px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer',
                          b.selected.has(slot) ? 'bg-violet-600 text-white' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                        )}
                      >
                        {toLabel(slot)}
                      </button>
                    ))}
                  </div>

                  <p className="text-xs text-violet-600 font-medium">
                    {selCount} slots selected ({selCount * 15} minutes total)
                  </p>

                  <div className="flex gap-3">
                    <button
                      onClick={() => toggleExpand(b.id)}
                      className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => { toggleExpand(b.id); toast.success('Block updated'); }}
                      className="flex-1 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium cursor-pointer transition-colors"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Set Time Range */}
      <div className="bg-white rounded-lg shadow-sm p-5 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-sm text-[#1A1A1A]">Set Time Range</span>
          <button onClick={() => { setStartTime(''); setEndTime(''); }} className="w-6 h-6 flex items-center justify-center rounded hover:bg-gray-100 cursor-pointer transition-colors">
            <X size={14} className="text-gray-400" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 mb-1.5">End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={e => setEndTime(e.target.value)}
              className="w-full h-10 px-3 rounded-lg border border-gray-200 bg-gray-50 text-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>
        </div>

        <button
          onClick={addBlock}
          className="w-full py-2.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium cursor-pointer transition-colors active:scale-[0.99]"
        >
          Add Block
        </button>
      </div>

      {/* Save Availability */}
      <button
        onClick={() => toast.success(`Availability saved for ${dateLabel}`)}
        className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm cursor-pointer transition-colors active:scale-[0.99]"
      >
        Save Availability for {dateLabel}
      </button>

      {/* Set */}
      <button
        onClick={() => toast.success('Schedule set')}
        className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm cursor-pointer transition-colors"
      >
        Set
      </button>
    </div>
  );
}
