'use client';

import { ALL_MEDIUMS } from './data';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Clock, Filter, Heart, Search, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState, useEffect } from 'react';

const SPECIALTIES = ['All Specialties', 'Astrology', 'Clairvoyance', 'Dream Analysis', 'Mediumship', 'Numerology', 'Tarot', 'Tarot Reading', 'Love & Relationships', 'Career Guidance', 'Spiritual Healing'];
const SORT_OPTIONS = ['Highest Rated', 'Most Reviews', 'Price: Low to High', 'Price: High to Low'];

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

function Dropdown({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useClickOutside(ref, () => setOpen(false));

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-10 px-6 py-2.5 bg-black/[0.03] rounded-xl font-bold text-sm text-[#1A1A1A] hover:bg-black/[0.05] transition-all"
      >
        {value}
        <ChevronDown
          size={16}
          className={cn('text-primary transition-transform duration-200', open && 'rotate-180')}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.97 }}
            transition={{ duration: 0.15 }}
            className="absolute top-full mt-2 left-0 z-50 bg-[#F8F8F8] border border-white/50 shadow-xl rounded-2xl py-2 min-w-[180px]"
          >
            {options.map(opt => (
              <li key={opt}>
                <button
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={cn(
                    'w-full text-left px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-primary/10 hover:text-primary',
                    value === opt ? 'text-primary bg-primary/5' : 'text-[#1A1A1A]'
                  )}
                >
                  {opt}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');
  const [sortBy, setSortBy] = useState('Highest Rated');
  const [priceRange, setPriceRange] = useState([10]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const clearAll = () => {
    setSearch('');
    setSpecialty('All Specialties');
    setSortBy('Highest Rated');
    setPriceRange([10]);
  };

  const filtered = ALL_MEDIUMS
    .filter(m => {
      const q = search.toLowerCase();
      const matchesSearch = !q || m.name.toLowerCase().includes(q) || m.specialties.some(s => s.toLowerCase().includes(q));
      const matchesSpecialty = specialty === 'All Specialties' || m.specialties.includes(specialty);
      const matchesPrice = m.price <= priceRange[0];
      return matchesSearch && matchesSpecialty && matchesPrice;
    })
    .sort((a, b) => {
      if (sortBy === 'Highest Rated') return b.rating - a.rating;
      if (sortBy === 'Most Reviews') return b.reviews - a.reviews;
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return 0;
    });

  const hasActiveFilters = search || specialty !== 'All Specialties' || priceRange[0] < 10;

  return (
    <div className="min-h-screen bg-[#E5E5E5] pt-32 pb-20">
      <div className="container mx-auto px-6 max-w-7xl">

        <h1 className="text-[#1A1A1A] font-bold text-4xl md:text-5xl text-center mb-12">
          Find Your Medium
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto relative mb-8 group">
          <div className="absolute left-6 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
            className="w-full h-16 pl-14 pr-12 bg-[#F8F8F8] rounded-2xl border border-white/50 shadow-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-[#1A1A1A]"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-[#1A1A1A]/30 hover:text-[#1A1A1A]/60 transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Bar */}
        <div className="bg-[#F8F8F8] rounded-[24px] p-6 md:px-8 border border-white/50 shadow-sm flex flex-wrap items-center gap-8 md:gap-12 mb-10">
          <div className="flex items-center gap-3 text-[#1A1A1A]">
            <Filter size={18} className="text-primary" />
            <span className="font-bold">Filters:</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-[#666666]">Specialty:</span>
            <Dropdown options={SPECIALTIES} value={specialty} onChange={setSpecialty} />
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-[#666666]">Sort By:</span>
            <Dropdown options={SORT_OPTIONS} value={sortBy} onChange={setSortBy} />
          </div>

          <div className="flex-grow max-w-[300px] flex items-center gap-6">
            <span className="text-sm font-bold text-[#666666] whitespace-nowrap">Price Range:</span>
            <div className="flex-grow flex items-center gap-4">
              <span className="text-xs font-bold text-[#1A1A1A]/40">$0</span>
              <Slider
                value={priceRange}
                max={10}
                step={0.5}
                onValueChange={setPriceRange}
                className="flex-grow"
              />
              <span className="text-xs font-bold text-[#1A1A1A]/40">${priceRange[0]}/min</span>
            </div>
          </div>

          <button
            onClick={clearAll}
            className={cn(
              'ml-auto text-sm font-bold transition-colors underline underline-offset-4',
              hasActiveFilters ? 'text-primary hover:text-primary/70' : 'text-[#666666] hover:text-primary'
            )}
          >
            Clear All
          </button>
        </div>

        {/* Results Info */}
        <p className="text-[#666666] font-bold text-sm mb-8">
          {filtered.length} medium{filtered.length !== 1 ? 's' : ''} found
        </p>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-24 text-[#666666]"
            >
              <p className="text-2xl font-bold mb-2">No mediums found</p>
              <p className="text-sm font-medium">Try adjusting your filters or search query.</p>
            </motion.div>
          ) : (
            <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map((medium, index) => (
                <motion.div
                  key={medium.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.04, duration: 0.25 }}
                  className="bg-[#F8F8F8] rounded-[32px] p-6 border border-white/50 shadow-sm hover:shadow-xl transition-all group"
                >
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="relative w-[140px] h-[180px] rounded-2xl overflow-hidden shrink-0">
                      <Image
                        src={medium.image}
                        alt={medium.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <button
                        onClick={() => toggleFavorite(medium.id)}
                        className="absolute top-2 left-2 w-8 h-8 rounded-full bg-white flex items-center justify-center transition-colors shadow-sm"
                      >
                        <Heart
                          size={16}
                          fill={favorites.has(medium.id) ? '#ef4444' : 'currentColor'}
                          className={favorites.has(medium.id) ? 'text-red-500' : 'text-[#1A1A1A]/30'}
                        />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="flex-grow space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold text-xl text-[#1A1A1A] leading-tight">{medium.name}</h3>
                        <div className={cn(
                          'px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider',
                          medium.online ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                        )}>
                          {medium.online ? 'Online' : 'Offline'}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-bold text-sm text-[#1A1A1A]">{medium.rating}</span>
                        <span className="text-xs font-medium text-[#1A1A1A]/40">({medium.reviews} reviews)</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {medium.specialties.slice(0, 2).map(spec => (
                          <button
                            key={spec}
                            onClick={() => setSpecialty(spec)}
                            className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-bold rounded-lg uppercase tracking-wide hover:bg-primary/20 transition-colors"
                          >
                            {spec}
                          </button>
                        ))}
                        {medium.specialties.length > 2 && (
                          <span className="px-2 py-1 bg-black/[0.03] text-[#1A1A1A]/40 text-[10px] font-bold rounded-lg">
                            +{medium.specialties.length - 2}
                          </span>
                        )}
                      </div>

                      <p className="text-[#666666] text-xs font-medium leading-relaxed line-clamp-2">
                        {medium.description}
                      </p>
                    </div>
                  </div>

                  {/* Pricing & Footer */}
                  <div className="mt-6 pt-6 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-bold text-[#1A1A1A]">${medium.price}</span>
                      <span className="text-xs font-bold text-[#1A1A1A]/40">/min</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#1A1A1A]/40">
                      <Clock size={14} />
                      <span className="text-xs font-bold uppercase tracking-wide">{medium.sessions}</span>
                    </div>

                    <Link
                      href={`/marketplace/${medium.id}`}
                      className="bg-primary hover:bg-primary/90 text-white font-bold px-6 py-2.5 rounded-xl text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
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
