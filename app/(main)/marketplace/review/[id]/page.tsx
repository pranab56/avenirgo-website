'use client';

import { Combobox } from '@/components/ui/combobox';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, Search, Star, X } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { use, useState } from 'react';
import { ALL_MEDIUMS } from '../../data';

const SORT_OPTIONS = ['Most Recent', 'Highest Rating', 'Lowest Rating'];
const FILTER_OPTIONS = ['All Stars', '5 Stars', '4 Stars', '3 Stars', '2 Stars', '1 Star'];


function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <Star
          key={i}
          size={size}
          className={i <= rating ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-200 text-gray-200'}
        />
      ))}
    </div>
  );
}

const EXTRA_REVIEWS = [
  { name: 'Olivia T.', date: '2026-02-28', rating: 5, text: 'Absolutely phenomenal reading. Every detail was accurate and the guidance I received changed my perspective completely.' },
  { name: 'Ethan W.', date: '2026-02-20', rating: 4, text: "Really helpful session. The reading gave me clarity on a difficult decision I've been facing for months." },
  { name: 'Zara K.', date: '2026-02-14', rating: 5, text: 'I was skeptical at first but the accuracy blew me away. Will definitely be booking again soon.' },
  { name: 'Noah P.', date: '2026-02-08', rating: 3, text: 'Good session overall. Some things resonated strongly, others less so. Still worth it.' },
  { name: 'Isla F.', date: '2026-01-30', rating: 5, text: "The most accurate reading I've ever had. I felt truly heard and understood throughout." },
  { name: 'Luca B.', date: '2026-01-22', rating: 5, text: 'Incredibly gifted reader. The insights she provided were deeply personal and spot on.' },
  { name: 'Ava M.', date: '2026-01-15', rating: 4, text: 'Very professional and insightful. I loved the detailed explanation of each aspect of my reading.' },
  { name: 'Felix R.', date: '2026-01-08', rating: 2, text: "The session was okay but I felt it was a bit rushed. Some of the insights didn't really apply to me." },
  { name: 'Maya C.', date: '2025-12-30', rating: 5, text: 'Jaw-dropping accuracy. She knew things nobody could have guessed. I feel so much clearer now.' },
  { name: 'Henry S.', date: '2025-12-18', rating: 5, text: 'Life-changing reading. The guidance I received helped me make one of the best decisions of my life.' },
  { name: 'Nora L.', date: '2025-12-05', rating: 4, text: 'Very thoughtful and compassionate reader. Definitely coming back for a follow-up session.' },
  { name: 'Sam D.', date: '2025-11-28', rating: 1, text: "Unfortunately this session wasn't for me. The reading felt very generic and didn't connect with my situation." },
];

export default function ReviewsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();

  const medium = ALL_MEDIUMS.find(m => m.id === id);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('Most Recent');
  const [filterStars, setFilterStars] = useState('All Stars');

  if (!medium) {
    return (
      <div className="min-h-screen bg-[#E5E5E5] flex items-center justify-center">
        <p className="text-xl font-bold text-[#1A1A1A]">Medium not found</p>
      </div>
    );
  }

  const allReviews = [...medium.reviewList, ...EXTRA_REVIEWS];

  const filtered = allReviews
    .filter(r => {
      const starMatch = filterStars === 'All Stars' || r.rating === parseInt(filterStars[0]);
      const searchMatch = !search || r.name.toLowerCase().includes(search.toLowerCase()) || r.text.toLowerCase().includes(search.toLowerCase());
      return starMatch && searchMatch;
    })
    .sort((a, b) => {
      if (sortBy === 'Most Recent') return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (sortBy === 'Highest Rating') return b.rating - a.rating;
      if (sortBy === 'Lowest Rating') return a.rating - b.rating;
      return 0;
    });

  return (
    <div className="min-h-screen bg-[#E5E5E5] pt-24 pb-20">
      <div className="container mx-auto px-4 max-w-4xl">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-full cursor-pointer bg-white shadow-sm flex items-center justify-center text-[#1A1A1A] hover:shadow-md transition-all shrink-0"
          >
            <ArrowLeft size={18} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
              <Image src={medium.image} alt={medium.name} width={48} height={48} className="object-cover w-full h-full" />
            </div>
            <div>
              <h1 className="font-bold text-xl text-[#1A1A1A] leading-tight">{medium.name}</h1>
              <p className="text-xs text-[#666666] font-medium">All Reviews</p>
            </div>
          </div>
        </div>

        {/* Rating summary card */}
        <div className="bg-white rounded-lg p-6 shadow-sm mb-6 flex items-center gap-8">
          <div className="text-center shrink-0">
            <p className="text-5xl font-bold text-[#1A1A1A]">{medium.rating}</p>
            <div className="mt-1">
              <StarRating rating={Math.round(medium.rating)} size={16} />
            </div>
            <p className="text-xs text-[#666666] font-medium mt-1">{medium.reviews.toLocaleString()} reviews</p>
          </div>
          <div className="flex-grow space-y-2">
            {medium.ratingBreakdown.map(({ stars, pct }) => (
              <button
                key={stars}
                onClick={() => setFilterStars(filterStars === `${stars} Stars` ? 'All Stars' : `${stars} Stars`)}
                className={cn(
                  'w-full flex items-center gap-3 transition-all rounded-lg',
                  filterStars !== 'All Stars' && filterStars !== `${stars} Stars` && 'opacity-35'
                )}
              >
                <span className="text-xs font-bold text-[#666666] w-10 shrink-0 text-right">{stars} ★</span>
                <div className="flex-grow h-2 bg-gray-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.6, delay: 0.05 * (5 - stars) }}
                    className={cn('h-full rounded-full', filterStars === `${stars} Stars` ? 'bg-violet-500' : 'bg-yellow-400')}
                  />
                </div>
                <span className="text-xs font-bold text-[#666666] w-8 shrink-0 text-left">{pct}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Search + controls */}
        <div className="space-y-3 mb-6">
          <div className="relative group">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 group-focus-within:text-violet-500 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search reviews..."
              className="w-full h-12 pl-11 pr-10 bg-white rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-violet-400/20 transition-all font-medium text-sm text-[#1A1A1A]"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors"
              >
                <X size={15} />
              </button>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm font-bold text-[#666666]">
              {filtered.length} review{filtered.length !== 1 ? 's' : ''}
              {filterStars !== 'All Stars' && (
                <span className="text-violet-500"> · {filterStars}</span>
              )}
            </p>
            <div className="flex items-center gap-2">
              <Combobox options={FILTER_OPTIONS} value={filterStars} onValueChange={setFilterStars} searchPlaceholder="Filter by stars..." />
              <Combobox options={SORT_OPTIONS} value={sortBy} onValueChange={setSortBy} searchPlaceholder="Sort by..." />
            </div>
          </div>
        </div>

        {/* Review cards */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-20 text-[#666666]"
            >
              <p className="text-xl font-bold mb-1">No reviews found</p>
              <p className="text-sm">Try a different search or filter.</p>
            </motion.div>
          ) : (
            <div className="space-y-4">
              {filtered.map((review, i) => (
                <motion.div
                  key={`${review.name}-${review.date}`}
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.03, duration: 0.2 }}
                  className="bg-white rounded-lg p-5 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-violet-100 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold text-violet-600">{review.name[0]}</span>
                      </div>
                      <div>
                        <p className="font-bold text-sm text-[#1A1A1A]">{review.name}</p>
                        <p className="text-xs text-[#666666]">{review.date}</p>
                      </div>
                    </div>
                    <StarRating rating={review.rating} />
                  </div>
                  <p className="text-sm text-[#666666] leading-relaxed">{review.text}</p>
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
