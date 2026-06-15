'use client';

import { motion, useInView } from 'framer-motion';
import { Clock, DollarSign, Heart, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';

const MEDIUMS = [
  {
    id: 1,
    name: 'Aria Moonstone',
    rating: 4.7,
    reviews: 654,
    tags: ['Dream Analysis', 'Astrology'],
    extraTags: 1,
    description: 'Astrologer and dream interpreter helping you unlock the secrets of your',
    price: 2.99,
    sessions: '1200+',
    online: true,
    image: '/images/hero.jpg',
  },
  {
    id: 2,
    name: 'Aria Moonstone',
    rating: 4.7,
    reviews: 654,
    tags: ['Dream Analysis', 'Astrology'],
    extraTags: 1,
    description: 'Astrologer and dream interpreter helping you unlock the secrets of your',
    price: 2.99,
    sessions: '1200+',
    online: true,
    image: '/images/hero.jpg',
  },
  {
    id: 3,
    name: 'Aria Moonstone',
    rating: 4.7,
    reviews: 654,
    tags: ['Dream Analysis', 'Astrology'],
    extraTags: 1,
    description: 'Astrologer and dream interpreter helping you unlock the secrets of your',
    price: 2.99,
    sessions: '1200+',
    online: true,
    image: '/images/hero.jpg',
  },
  {
    id: 4,
    name: 'Aria Moonstone',
    rating: 4.7,
    reviews: 654,
    tags: ['Dream Analysis', 'Astrology'],
    extraTags: 1,
    description: 'Astrologer and dream interpreter helping you unlock the secrets of your',
    price: 2.99,
    sessions: '1200+',
    online: false,
    image: '/images/hero.jpg',
  },
  {
    id: 5,
    name: 'Aria Moonstone',
    rating: 4.7,
    reviews: 654,
    tags: ['Dream Analysis', 'Astrology'],
    extraTags: 1,
    description: 'Astrologer and dream interpreter helping you unlock the secrets of your',
    price: 2.99,
    sessions: '1200+',
    online: false,
    image: '/images/hero.jpg',
  },
  {
    id: 6,
    name: 'Aria Moonstone',
    rating: 4.7,
    reviews: 654,
    tags: ['Dream Analysis', 'Astrology'],
    extraTags: 1,
    description: 'Astrologer and dream interpreter helping you unlock the secrets of your',
    price: 2.99,
    sessions: '1200+',
    online: false,
    image: '/images/hero.jpg',
  },
];

function MediumCard({ medium, index }: { medium: typeof MEDIUMS[0]; index: number }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white rounded-lg shadow-[0_2px_16px_rgba(0,0,0,0.07)] border border-gray-100 flex overflow-hidden relative"
    >
      {/* Online / Offline badge */}
      <span
        className={`absolute top-3 right-3 z-10 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${medium.online
          ? 'bg-green-500 text-white'
          : 'bg-yellow-400 text-white'
          }`}
      >
        {medium.online ? 'Online' : 'Offline'}
      </span>

      {/* Image */}
      <div className="relative shrink-0 w-[110px] sm:w-[140px]">
        <Image
          src={medium.image}
          alt={medium.name}
          fill
          className="object-cover"
        />
        {/* Heart button */}
        <button
          onClick={() => setLiked(v => !v)}
          className="absolute top-2 right-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center shadow-sm hover:scale-110 transition-transform"
        >
          <Heart
            size={14}
            className={liked ? 'fill-red-500 text-red-500' : 'text-gray-400'}
          />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-3 xl:pr-12 gap-1.5">
        {/* Name */}
        <h3 className="font-bold text-[#1A1A1A] text-[15px] leading-tight">{medium.name}</h3>

        {/* Rating */}
        <div className="flex items-center gap-1">
          <Star size={13} className="fill-yellow-400 text-yellow-400" />
          <span className="text-[13px] font-semibold text-[#1A1A1A]">{medium.rating}</span>
          <span className="text-[12px] text-gray-400">({medium.reviews} reviews)</span>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {medium.tags.map(tag => (
            <span
              key={tag}
              className="text-[11px] font-medium text-violet-600 border border-violet-300 rounded-full px-2.5 py-0.5"
            >
              {tag}
            </span>
          ))}
          {medium.extraTags > 0 && (
            <span className="text-[11px] font-medium text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5">
              +{medium.extraTags}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-[12px] text-gray-500 leading-snug line-clamp-2">{medium.description}</p>

        {/* Footer */}
        <div className="flex items-center gap-3 mt-auto pt-1">
          <div className="flex items-center gap-0.5 text-[12px] text-gray-600 shrink-0">
            <DollarSign size={12} className="text-gray-500" />
            <span className="font-bold text-[#1A1A1A]">${medium.price}</span>
            <span className="text-gray-400">/min</span>
          </div>

          <div className="flex items-center gap-1 text-[12px] text-gray-500 shrink-0">
            <Clock size={12} />
            <span>{medium.sessions}</span>
          </div>

          <Link href={`/marketplace/${medium.id}`} className="ml-auto">
            <button className="bg-primary cursor-pointer text-white text-[12px] font-semibold px-4 py-1.5 rounded-sm transition-all active:scale-95 whitespace-nowrap">
              View Profile
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function ForYou() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section ref={ref} className="">
      <div className="container mx-auto px-6 md:px-10 lg:px-20">

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center text-[2rem] font-extrabold text-[#12122A] mb-2"
        >
          Best mediums for you!
        </motion.h2>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[13px] text-gray-500 mb-5"
        >
          {MEDIUMS.length} mediums found
        </motion.p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 ">
          {MEDIUMS.map((medium, i) => (
            <MediumCard key={medium.id} medium={medium} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
