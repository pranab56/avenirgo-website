'use client';

import { useRef, useState } from 'react';
import toast from 'react-hot-toast';

const DEFAULT_SPECIALTIES = ['Tarot Reading', 'Love & Relationships', 'Career Guidance', 'Spiritual Healing'];

export default function ProfilePage() {
  const [photo, setPhoto] = useState<string | null>(null);
  const [description, setDescription] = useState('');
  const [specialties, setSpecialties] = useState(DEFAULT_SPECIALTIES);
  const [newSpecialty, setNewSpecialty] = useState('');
  const [addingSpecialty, setAddingSpecialty] = useState(false);
  const [rates, setRates] = useState({ audio: '3.99', chat: '2.99', qa: '19.99' });
  const fileRef = useRef<HTMLInputElement>(null);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPhoto(URL.createObjectURL(file));
  };

  const removeSpecialty = (s: string) => setSpecialties(prev => prev.filter(x => x !== s));

  const confirmSpecialty = () => {
    const trimmed = newSpecialty.trim();
    if (!trimmed) return;
    if (specialties.includes(trimmed)) { toast.error('Already added'); return; }
    setSpecialties(prev => [...prev, trimmed]);
    setNewSpecialty('');
    setAddingSpecialty(false);
  };

  const handleSave = () => {
    toast.success('Changes saved');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <h2 className="font-bold text-xl text-[#1A1A1A]">Public Profile</h2>

      {/* Photo */}
      <div>
        <p className="text-sm font-semibold text-[#1A1A1A] mb-3">Profile Photo</p>
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-violet-600 flex items-center justify-center overflow-hidden shrink-0">
            {photo
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={photo} alt="avatar" className="w-full h-full object-cover" />
              : <span className="text-white font-bold text-2xl">L</span>
            }
          </div>
          <button
            onClick={() => fileRef.current?.click()}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Change Photo
          </button>
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handlePhoto} />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Profile Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          placeholder="Describe your experience, specialties, and approach..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all resize-none"
        />
      </div>

      {/* Specialties */}
      <div>
        <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">Specialties</label>
        <div className="flex flex-wrap gap-2 items-center">
          {specialties.map(s => (
            <span key={s} className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-50 text-violet-700 text-sm font-medium rounded-lg">
              {s}
              <button onClick={() => removeSpecialty(s)} className="text-violet-400 hover:text-violet-700 cursor-pointer leading-none">×</button>
            </span>
          ))}

          {addingSpecialty ? (
            <input
              autoFocus
              value={newSpecialty}
              onChange={e => setNewSpecialty(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') confirmSpecialty(); if (e.key === 'Escape') setAddingSpecialty(false); }}
              onBlur={confirmSpecialty}
              placeholder="Type & press Enter"
              className="px-3 py-1.5 text-sm border border-violet-400 rounded-lg outline-none focus:ring-2 focus:ring-violet-500/20 w-40"
            />
          ) : (
            <button
              onClick={() => setAddingSpecialty(true)}
              className="px-3 py-1.5 text-sm font-medium text-violet-600 border border-violet-400 rounded-lg hover:bg-violet-50 transition-colors cursor-pointer"
            >
              + Add Specialty
            </button>
          )}
        </div>
      </div>

      {/* Rates */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {([
          { label: 'Audio Call (per min)', key: 'audio' },
          { label: 'Live Chat (per min)', key: 'chat' },
          { label: 'Written Q&A', key: 'qa' },
        ] as const).map(({ label, key }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-[#1A1A1A] mb-2">{label}</label>
            <div className="flex items-center h-11 px-4 rounded-lg border border-gray-200 bg-gray-50 gap-2 focus-within:border-violet-500 focus-within:ring-2 focus-within:ring-violet-500/20 transition-all">
              <span className="text-gray-400 text-sm font-medium">$</span>
              <input
                type="number"
                min="0"
                step="0.01"
                value={rates[key]}
                onChange={e => setRates(p => ({ ...p, [key]: e.target.value }))}
                className="flex-1 bg-transparent text-sm text-[#1A1A1A] outline-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Save */}
      <button
        onClick={handleSave}
        className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors cursor-pointer active:scale-[0.99]"
      >
        Save Changes
      </button>
    </div>
  );
}
