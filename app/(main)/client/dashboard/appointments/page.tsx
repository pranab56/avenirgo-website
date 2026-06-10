'use client';

import { useState } from 'react';

type Appointment = {
  id: string;
  advisor: string;
  date: string;
  time: string;
  service: string;
  duration: number;
  price: number;
};

const UPCOMING: Appointment[] = [
  { id: '1', advisor: 'Luna Starlight', date: '2026-03-20', time: '14:00', service: 'Audio Call', duration: 30, price: 119.70 },
  { id: '2', advisor: 'Marcus Silva', date: '2026-03-22', time: '10:30', service: 'Live Chat', duration: 15, price: 44.85 },
];

const PAST: Appointment[] = [
  { id: '3', advisor: 'Luna Starlight', date: '2026-03-18', time: '11:00', service: 'Audio Call', duration: 15, price: 59.85 },
  { id: '4', advisor: 'Sarah Moon', date: '2026-03-15', time: '16:00', service: 'Live Chat', duration: 10, price: 29.90 },
];

function AppointmentCard({
  appt,
  variant,
  onCancel,
}: {
  appt: Appointment;
  variant: 'upcoming' | 'past';
  onCancel?: (id: string) => void;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-5 py-4 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 shadow-sm">
      <div className="space-y-1">
        <p className="font-bold text-[#1A1A1A] text-sm">{appt.advisor}</p>
        <p className="text-sm text-gray-500">
          📅 {appt.date} at {appt.time}
        </p>
        <p className="text-sm text-gray-500">
          🎧 {appt.service} ({appt.duration} min)
        </p>
        <p className={`text-sm font-semibold ${variant === 'upcoming' ? 'text-violet-600' : 'text-[#1A1A1A]'}`}>
          ${appt.price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center gap-2 sm:mt-0.5">
        {variant === 'upcoming' ? (
          <>
            <button className="flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium text-gray-600 border border-gray-300 rounded-sm hover:bg-gray-50 transition-colors cursor-pointer">
              Reschedule
            </button>
            <button
              onClick={() => onCancel?.(appt.id)}
              className="flex-1 sm:flex-none px-4 py-1.5 text-sm font-medium text-red-500 border border-red-400 rounded-sm hover:bg-red-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>
          </>
        ) : (
          <span className="px-3 py-1 text-xs font-medium text-green-700 bg-green-100 rounded-md">
            Completed
          </span>
        )}
      </div>
    </div>
  );
}

export default function AppointmentsPage() {
  const [upcoming, setUpcoming] = useState(UPCOMING);

  const handleCancel = (id: string) => {
    setUpcoming(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-5">
      {/* Upcoming */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-xl text-[#1A1A1A]">Upcoming Appointments</h2>
        {upcoming.length === 0 ? (
          <p className="text-sm text-gray-400 py-2">No upcoming appointments.</p>
        ) : (
          upcoming.map(appt => (
            <AppointmentCard key={appt.id} appt={appt} variant="upcoming" onCancel={handleCancel} />
          ))
        )}
      </div>

      {/* Past */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-xl text-[#1A1A1A]">Past Appointments</h2>
        {PAST.map(appt => (
          <AppointmentCard key={appt.id} appt={appt} variant="past" />
        ))}
      </div>
    </div>
  );
}
