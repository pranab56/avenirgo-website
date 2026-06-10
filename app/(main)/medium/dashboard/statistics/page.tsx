const STAT_CARDS = [
  { label: 'Total Consultations', value: '2,547', sub: '↑ 12% this month', subGreen: true },
  { label: 'Total Revenue',       value: '$18,234', sub: '↑ 8% this month', subGreen: true },
  { label: 'Average Rating',      value: '4.9',    sub: 'From 1,247 reviews', subGreen: false },
  { label: 'Rebooking Rate',      value: '68%',    sub: '↑ 5% this month', subGreen: true },
];

const PERFORMANCE = [
  {
    period: 'This Week',
    consultations: 42,
    revenue: '$1,247.50',
    avgDuration: '18 min',
  },
  {
    period: 'This Month',
    consultations: 167,
    revenue: '$4,982.30',
    avgDuration: '17 min',
  },
  {
    period: 'Last Month',
    consultations: 154,
    revenue: '$4,621.80',
    avgDuration: '16 min',
  },
];

export default function StatisticsPage() {
  return (
    <div className="space-y-4">
      {/* Stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {STAT_CARDS.map(card => (
          <div key={card.label} className="bg-white rounded-lg shadow-sm px-5 py-4 space-y-1.5">
            <p className="text-sm text-gray-500">{card.label}</p>
            <p className="text-4xl font-black text-[#1A1A1A]">{card.value}</p>
            <p className={`text-sm font-medium ${card.subGreen ? 'text-emerald-500' : 'text-gray-400'}`}>
              {card.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly Performance */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="font-bold text-xl text-[#1A1A1A] mb-6">Monthly Performance</h2>

        <div className="divide-y divide-gray-100">
          {PERFORMANCE.map(row => (
            <div key={row.period} className="py-5 first:pt-0 last:pb-0 space-y-3 sm:space-y-0 sm:flex sm:items-center">
              <p className="font-bold text-[#1A1A1A] sm:w-40 sm:shrink-0">{row.period}</p>
              <div className="grid grid-cols-3 sm:flex-1">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Consultations</p>
                  <p className="font-bold text-[#1A1A1A]">{row.consultations}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Revenue</p>
                  <p className="font-bold text-emerald-500">{row.revenue}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Avg. Duration</p>
                  <p className="font-bold text-[#1A1A1A]">{row.avgDuration}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
