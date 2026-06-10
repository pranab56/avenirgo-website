'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const LANGUAGES = ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Arabic'];
const TIMEZONES = [
  'UTC-12:00', 'UTC-11:00', 'UTC-10:00', 'UTC-09:00', 'UTC-08:00 (PST)',
  'UTC-07:00 (MST)', 'UTC-06:00 (CST)', 'UTC-05:00 (EST)', 'UTC-04:00',
  'UTC-03:00', 'UTC+00:00 (GMT)', 'UTC+01:00 (CET)', 'UTC+02:00 (EET)',
  'UTC+03:00', 'UTC+05:30 (IST)', 'UTC+08:00 (CST)', 'UTC+09:00 (JST)',
  'UTC+10:00 (AEST)', 'UTC+12:00',
];

type Pref = { id: string; label: string; description: string; enabled: boolean };

const INITIAL_PREFS: Pref[] = [
  { id: 'email', label: 'Email Notifications', description: 'Receive appointment and message alerts via email', enabled: true },
  { id: 'sms',   label: 'SMS Notifications',   description: 'Get text messages for important updates',           enabled: false },
  { id: 'push',  label: 'Push Notifications',  description: 'Receive in-app notifications',                      enabled: true },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      style={{ width: '52px' }}
      className={`relative inline-flex h-7 items-center rounded-full transition-colors duration-200 cursor-pointer focus:outline-none ${
        enabled ? 'bg-violet-600' : 'bg-gray-300'
      }`}
    >
      <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
        enabled ? 'translate-x-7' : 'translate-x-1'
      }`} />
    </button>
  );
}

const selectCls =
  'w-full max-w-xs h-11 px-3 rounded-lg border border-gray-200 bg-white text-sm text-[#1A1A1A] outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all cursor-pointer';

export default function NotificationsPage() {
  const [prefs, setPrefs]   = useState(INITIAL_PREFS);
  const [language, setLang] = useState('');
  const [timezone, setTz]   = useState('');

  const toggle = (id: string) => setPrefs(p => p.map(x => x.id === id ? { ...x, enabled: !x.enabled } : x));

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col overflow-hidden">
      <div className="p-6 space-y-1 flex-1">
        <h2 className="font-bold text-xl text-[#1A1A1A] mb-5">Notifications &amp; Preferences</h2>

        {/* Toggles */}
        <div className="divide-y divide-gray-100">
          {prefs.map(pref => (
            <div key={pref.id} className="flex items-center justify-between py-5 first:pt-0">
              <div>
                <p className="font-bold text-sm text-[#1A1A1A]">{pref.label}</p>
                <p className="text-sm text-gray-400 mt-0.5">{pref.description}</p>
              </div>
              <Toggle enabled={pref.enabled} onChange={() => toggle(pref.id)} />
            </div>
          ))}

          {/* Language */}
          <div className="py-5">
            <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Language</label>
            <select value={language} onChange={e => setLang(e.target.value)} className={selectCls}>
              <option value="" disabled />
              {LANGUAGES.map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>

          {/* Time Zone */}
          <div className="py-5 last:pb-0">
            <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Time Zone</label>
            <select value={timezone} onChange={e => setTz(e.target.value)} className={selectCls}>
              <option value="" disabled />
              {TIMEZONES.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={() => toast.success('Preferences saved')}
          className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm cursor-pointer transition-colors active:scale-[0.99]"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
