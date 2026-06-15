'use client';

import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Heart, Search, ShoppingBag, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ALL_MEDIUMS } from '../marketplace/data';

const DEFAULT_FAVORITES = new Set(['1', '2', '4']);

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Set<string>>(DEFAULT_FAVORITES);
  const [search, setSearch] = useState('');

  const favoritedMediums = ALL_MEDIUMS.filter(m => favorites.has(m.id));
  const filtered = favoritedMediums.filter(m => {
    const q = search.toLowerCase();
    return !q || m.name.toLowerCase().includes(q) || m.specialties.some(s => s.toLowerCase().includes(q));
  });

  const removeFavorite = (id: string) => {
    setFavorites(prev => { const next = new Set(prev); next.delete(id); return next; });
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] pt-28 md:pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 md:mb-10">
          <div>
            <h1 className="text-[#1A1A1A] font-medium text-3xl md:text-4xl">My Favorites</h1>
            <p className="text-[#666666] text-sm font-medium mt-1">
              {favorites.size} medium{favorites.size !== 1 ? 's' : ''} saved
            </p>
          </div>
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium px-5 py-2.5 rounded-sm text-sm transition-all active:scale-95 shadow-lg shadow-primary/20 w-fit"
          >
            <ShoppingBag size={16} />
            Browse Marketplace
          </Link>
        </div>

        {/* Search bar (only when there are favorites) */}
        {favorites.size > 0 && (
          <div className="max-w-xl relative mb-8 group">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 group-focus-within:text-primary transition-colors">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search favorites..."
              className="w-full h-12 pl-11 pr-10 bg-[#F8F8F8] rounded-lg border border-white/50 shadow-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-sm text-[#1A1A1A]"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 cursor-pointer">
                <X size={16} />
              </button>
            )}
          </div>
        )}

        {/* Content */}
        <AnimatePresence mode="popLayout">
          {favorites.size === 0 ? (
            /* Empty state */
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 text-[#666666]"
            >
              <div className="w-20 h-20 rounded-full bg-[#F8F8F8] border border-white/50 flex items-center justify-center mx-auto mb-5 shadow-sm">
                <Heart size={32} className="opacity-20" />
              </div>
              <p className="text-xl font-medium mb-2 text-[#1A1A1A]">No favorites yet</p>
              <p className="text-sm font-medium mb-6">Save mediums you love to find them quickly.</p>
              <Link
                href="/marketplace"
                className="inline-flex items-center gap-2 bg-primary text-white font-medium px-6 py-2.5 rounded-sm text-sm hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
              >
                <ShoppingBag size={15} />
                Browse Mediums
              </Link>
            </motion.div>
          ) : filtered.length === 0 ? (
            /* No search results */
            <motion.div
              key="no-results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16 text-[#666666]"
            >
              <p className="text-lg font-medium">No results for &ldquo;{search}&rdquo;</p>
            </motion.div>
          ) : (
            /* Grid */
            <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((medium, index) => (
                <motion.div
                  key={medium.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.05, duration: 0.25 }}
                  className="bg-[#F8F8F8] rounded-lg p-5 md:p-6 border border-white/50 shadow-sm hover:shadow-xl transition-all group"
                >
                  {/* Card body */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-5">
                    {/* Image */}
                    <div className="relative w-full h-[140px] sm:w-[120px] sm:h-[150px] rounded-xl overflow-hidden shrink-0">
                      <Image
                        src={medium.image}
                        alt={medium.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Remove from favorites */}
                      <button
                        onClick={() => removeFavorite(medium.id)}
                        title="Remove from favorites"
                        className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <Heart size={15} fill="#ef4444" className="text-red-500" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="flex-grow space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg text-[#1A1A1A] leading-tight">{medium.name}</h3>
                        <div className={cn(
                          'px-2.5 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider shrink-0 ml-2',
                          medium.online ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                        )}>
                          {medium.online ? 'Online' : 'Offline'}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Star size={14} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-sm text-[#1A1A1A]">{medium.rating}</span>
                        <span className="text-xs font-medium text-[#1A1A1A]/40">({medium.reviews})</span>
                      </div>

                      <div className="flex flex-wrap gap-1.5">
                        {medium.specialties.slice(0, 2).map(spec => (
                          <span
                            key={spec}
                            className="px-2.5 py-0.5 bg-primary/10 text-primary text-[10px] font-medium rounded-lg uppercase tracking-wide"
                          >
                            {spec}
                          </span>
                        ))}
                        {medium.specialties.length > 2 && (
                          <span className="px-2 py-0.5 bg-black/[0.03] text-[#1A1A1A]/40 text-[10px] font-medium rounded-lg">
                            +{medium.specialties.length - 2}
                          </span>
                        )}
                      </div>

                      <p className="text-[#666666] text-xs font-medium leading-relaxed line-clamp-2">
                        {medium.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-4 pt-4 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-base font-medium text-[#1A1A1A]">${medium.price}</span>
                      <span className="text-xs font-medium text-[#1A1A1A]/40">/min</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-[#1A1A1A]/40">
                      <Clock size={13} />
                      <span className="text-xs font-medium uppercase tracking-wide">{medium.sessions}</span>
                    </div>
                    <Link
                      href={`/marketplace/${medium.id}`}
                      className="bg-primary hover:bg-primary/90 text-white font-medium px-4 md:px-5 py-2 rounded-sm text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
                    >
                      View Profile
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
