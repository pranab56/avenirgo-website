'use client';

import { Combobox } from '@/components/ui/combobox';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, Filter, Heart, Search, Star, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ALL_MEDIUMS } from './data';

const SPECIALTIES = ['All Specialties', 'Astrology', 'Clairvoyance', 'Dream Analysis', 'Mediumship', 'Numerology', 'Tarot', 'Tarot Reading', 'Love & Relationships', 'Career Guidance', 'Spiritual Healing'];
const SORT_OPTIONS = ['Highest Rated', 'Most Reviews', 'Price: Low to High', 'Price: High to Low'];

export default function MarketplacePage() {
  const [search, setSearch] = useState('');
  const [specialty, setSpecialty] = useState('All Specialties');
  const [sortBy, setSortBy] = useState('Highest Rated');
  const [priceRange, setPriceRange] = useState([10]);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) { next.delete(id); } else { next.add(id); }
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
    <div className="min-h-screen bg-[#E5E5E5] pt-28 md:pt-32 pb-20">
      <div className="container mx-auto px-4 md:px-6">

        <h1 className="text-[#1A1A1A] font-medium text-3xl md:text-5xl text-center mb-8 md:mb-12">
          Find Your Medium
        </h1>

        {/* Search Bar */}
        <div className="max-w-3xl mx-auto relative mb-6 md:mb-8 group">
          <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 group-focus-within:text-primary transition-colors">
            <Search size={20} />
          </div>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by name or specialty..."
            className="w-full h-14 md:h-16 pl-12 md:pl-14 pr-12 bg-[#F8F8F8] rounded-lg border border-white/50 shadow-sm outline-none focus:ring-2 focus:ring-primary/10 transition-all font-medium text-[#1A1A1A]"
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

        {/* Filter Bar — vertical on mobile, horizontal on md+ */}
        <div className="bg-[#F8F8F8] rounded-lg p-5 md:p-6 md:px-8 border border-white/50 shadow-sm mb-8 md:mb-10">
          <div className="flex items-center gap-2 mb-4 md:mb-0 md:hidden">
            <Filter size={16} className="text-primary" />
            <span className="font-medium text-sm text-[#1A1A1A]">Filters</span>
          </div>

          <div className="flex flex-col md:flex-row md:flex-wrap md:items-center gap-4 md:gap-8 lg:gap-12">
            {/* Filters label - desktop only */}
            <div className="hidden md:flex items-center gap-3 text-[#1A1A1A]">
              <Filter size={18} className="text-primary" />
              <span className="font-medium">Filters:</span>
            </div>

            {/* Specialty */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#666666] shrink-0">Specialty:</span>
              <Combobox
                options={SPECIALTIES}
                value={specialty}
                onValueChange={setSpecialty}
                searchPlaceholder="Search specialty..."
              />
            </div>

            {/* Sort By */}
            <div className="flex items-center gap-3">
              <span className="text-sm font-medium text-[#666666] shrink-0">Sort By:</span>
              <Combobox
                options={SORT_OPTIONS}
                value={sortBy}
                onValueChange={setSortBy}
                searchPlaceholder="Search sort..."
              />
            </div>

            {/* Price Range */}
            <div className="flex items-center gap-3 md:flex-grow md:max-w-[300px]">
              <span className="text-sm font-medium text-[#666666] shrink-0">Price:</span>
              <div className="flex-grow flex items-center gap-3">
                <span className="text-xs font-medium text-[#1A1A1A]/40">$0</span>
                <Slider
                  value={priceRange}
                  max={10}
                  step={0.5}
                  onValueChange={(value) => setPriceRange(Array.isArray(value) ? [...value] : [value as number])}
                  className="flex-grow"
                />
                <span className="text-xs font-medium text-[#1A1A1A]/40 whitespace-nowrap">${priceRange[0]}/min</span>
              </div>
            </div>

            {/* Clear All */}
            <button
              onClick={clearAll}
              className={cn(
                'text-sm font-medium transition-colors cursor-pointer underline underline-offset-4 text-left md:ml-auto',
                hasActiveFilters ? 'text-primary hover:text-primary/70' : 'text-[#666666] hover:text-primary'
              )}
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results Info */}
        <p className="text-[#666666] font-medium text-sm mb-6 md:mb-8">
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
              <p className="text-2xl font-medium mb-2">No mediums found</p>
              <p className="text-sm font-medium">Try adjusting your filters or search query.</p>
            </motion.div>
          ) : (
            <motion.div key="grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filtered.map((medium, index) => (
                <motion.div
                  key={medium.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ delay: index * 0.04, duration: 0.25 }}
                  className="bg-[#F8F8F8] rounded-lg md:rounded-lg p-5 md:p-6 border border-white/50 shadow-sm hover:shadow-xl transition-all group"
                >
                  {/* Card body: vertical on mobile, horizontal on sm+ */}
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                    {/* Image */}
                    <div className="relative w-full h-[160px] sm:w-[140px] sm:h-[180px] rounded-xl sm:rounded-2xl overflow-hidden shrink-0">
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
                    <div className="flex-grow space-y-2 sm:space-y-3">
                      <div className="flex justify-between items-start">
                        <h3 className="font-medium text-lg sm:text-xl text-[#1A1A1A] leading-tight">{medium.name}</h3>
                        <div className={cn(
                          'px-2.5 py-1 rounded-lg text-[10px] font-medium uppercase tracking-wider shrink-0 ml-2',
                          medium.online ? 'bg-green-500/10 text-green-600' : 'bg-yellow-500/10 text-yellow-600'
                        )}>
                          {medium.online ? 'Online' : 'Offline'}
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <Star size={16} className="fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-sm text-[#1A1A1A]">{medium.rating}</span>
                        <span className="text-xs font-medium text-[#1A1A1A]/40">({medium.reviews} reviews)</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {medium.specialties.slice(0, 2).map(spec => (
                          <button
                            key={spec}
                            onClick={() => setSpecialty(spec)}
                            className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-medium rounded-lg uppercase tracking-wide hover:bg-primary/20 transition-colors"
                          >
                            {spec}
                          </button>
                        ))}
                        {medium.specialties.length > 2 && (
                          <span className="px-2 py-1 bg-black/[0.03] text-[#1A1A1A]/40 text-[10px] font-medium rounded-lg">
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
                  <div className="mt-5 pt-5 border-t border-black/5 flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-lg font-medium text-[#1A1A1A]">${medium.price}</span>
                      <span className="text-xs font-medium text-[#1A1A1A]/40">/min</span>
                    </div>

                    <div className="flex items-center gap-2 text-[#1A1A1A]/40">
                      <Clock size={14} />
                      <span className="text-xs font-medium uppercase tracking-wide">{medium.sessions}</span>
                    </div>

                    <Link
                      href={`/marketplace/${medium.id}`}
                      className="bg-primary hover:bg-primary/90 text-white font-medium px-5 md:px-6 py-2.5 rounded-sm text-sm transition-all active:scale-95 shadow-lg shadow-primary/20"
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
