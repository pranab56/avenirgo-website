'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

type Pref = {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
};

const INITIAL: Pref[] = [
  { id: 'email', label: 'Email Notifications', description: 'Receive appointment and message alerts via email', enabled: true },
  { id: 'sms', label: 'SMS Notifications', description: 'Get text messages for important updates', enabled: false },
  { id: 'push', label: 'Push Notifications', description: 'Receive in-app notifications', enabled: true },
];

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: () => void }) {
  return (
    <button
      onClick={onChange}
      className={`relative inline-flex h-7 w-13 items-center rounded-full transition-colors duration-200 cursor-pointer focus:outline-none ${
        enabled ? 'bg-violet-600' : 'bg-gray-300'
      }`}
      style={{ width: '52px' }}
    >
      <span
        className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform duration-200 ${
          enabled ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

export default function NotificationsPage() {
  const [prefs, setPrefs] = useState(INITIAL);

  const toggle = (id: string) => {
    setPrefs(prev => prev.map(p => p.id === id ? { ...p, enabled: !p.enabled } : p));
  };

  const handleSave = () => {
    toast.success('Preferences saved');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm flex flex-col overflow-hidden">
      <div className="p-6 flex-1">
        <h2 className="font-bold text-xl text-[#1A1A1A] mb-5">Notifications &amp; Preferences</h2>

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
        </div>
      </div>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-medium text-sm transition-colors cursor-pointer active:scale-[0.99]"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
}
