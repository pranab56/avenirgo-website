export type ServiceType = {
  type: 'audio' | 'chat' | 'written';
  label: string;
  price: number;
  unit: 'min' | 'flat';
};

export type Review = {
  name: string;
  date: string;
  rating: number;
  text: string;
};

export type AvailabilitySlot = {
  date: string;
  slots: { hour: number; kind: 'promo' | 'audio' | 'private' }[];
};

export type Medium = {
  id: string;
  name: string;
  image: string;
  rating: number;
  reviews: number;
  specialties: string[];
  description: string;
  price: number;
  sessions: string;
  online: boolean;
  // profile-only fields
  verified: boolean;
  consultations: string;
  languages: string[];
  bio: string;
  services: ServiceType[];
  ratingBreakdown: { stars: number; pct: number }[];
  reviewList: Review[];
  availability: AvailabilitySlot[];
};

export const ALL_MEDIUMS: Medium[] = [
  {
    id: '1',
    name: 'Aria Moonstone',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
    rating: 4.7,
    reviews: 654,
    specialties: ['Dream Analysis', 'Astrology', 'Tarot'],
    description: 'Astrologer and dream interpreter helping you unlock the secrets of your subconscious mind.',
    price: 2.99,
    sessions: '1200+',
    online: true,
    verified: true,
    consultations: '1200+',
    languages: ['English'],
    bio: 'Experienced astrologer and dream analyst with 12+ years of helping clients find clarity in life, love, and purpose. I combine celestial wisdom with dream symbolism to provide deeply personalized guidance for your journey.',
    services: [
      { type: 'audio', label: 'Audio Call', price: 2.99, unit: 'min' },
      { type: 'chat', label: 'Live Chat', price: 1.99, unit: 'min' },
      { type: 'written', label: 'Written Q&A', price: 14.99, unit: 'flat' },
    ],
    ratingBreakdown: [
      { stars: 5, pct: 78 },
      { stars: 4, pct: 12 },
      { stars: 3, pct: 6 },
      { stars: 2, pct: 2 },
      { stars: 1, pct: 2 },
    ],
    reviewList: [
      { name: 'Emily R.', date: '2026-05-12', rating: 5, text: 'Aria\'s reading was spot on! She picked up on things I hadn\'t even mentioned. I feel so much clearer about my path forward.' },
      { name: 'Tom K.', date: '2026-04-28', rating: 5, text: 'Amazing dream analysis session. She explained symbols I\'ve been seeing for months and it all made perfect sense.' },
      { name: 'Priya S.', date: '2026-04-10', rating: 4, text: 'Great experience overall. Very patient and thorough in her reading.' },
    ],
    availability: [
      { date: '17/06', slots: [{ hour: 14, kind: 'audio' }, { hour: 15, kind: 'audio' }, { hour: 16, kind: 'private' }] },
      { date: '18/06', slots: [{ hour: 10, kind: 'promo' }, { hour: 11, kind: 'audio' }, { hour: 18, kind: 'private' }] },
      { date: '19/06', slots: [{ hour: 14, kind: 'audio' }, { hour: 15, kind: 'private' }, { hour: 16, kind: 'audio' }] },
      { date: '20/06', slots: [] },
      { date: '21/06', slots: [{ hour: 9, kind: 'audio' }, { hour: 10, kind: 'audio' }] },
      { date: '22/06', slots: [] },
      { date: '23/06', slots: [{ hour: 13, kind: 'promo' }, { hour: 14, kind: 'audio' }] },
      { date: '24/06', slots: [{ hour: 11, kind: 'private' }] },
    ],
  },
  {
    id: '2',
    name: 'Luna Starlight',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=400&auto=format&fit=crop',
    rating: 4.9,
    reviews: 1247,
    specialties: ['Tarot Reading', 'Love & Relationships', 'Career Guidance', 'Spiritual Healing'],
    description: 'Gifted clairvoyant offering direct communication with guides and departed loved ones.',
    price: 3.99,
    sessions: '2500+',
    online: true,
    verified: true,
    consultations: '2500+',
    languages: ['English', 'Spanish'],
    bio: 'Experienced tarot reader with 15+ years of helping clients find clarity in love and career. I combine traditional tarot wisdom with intuitive insights to provide personalized guidance for your life journey.',
    services: [
      { type: 'audio', label: 'Audio Call', price: 3.99, unit: 'min' },
      { type: 'chat', label: 'Live Chat', price: 2.99, unit: 'min' },
      { type: 'written', label: 'Written Q&A', price: 19.99, unit: 'flat' },
    ],
    ratingBreakdown: [
      { stars: 5, pct: 85 },
      { stars: 4, pct: 10 },
      { stars: 3, pct: 3 },
      { stars: 2, pct: 1 },
      { stars: 1, pct: 1 },
    ],
    reviewList: [
      { name: 'Sarah M.', date: '2026-03-14', rating: 5, text: 'Luna was amazing! Her insights were incredibly accurate and helped me make an important career decision. Highly recommend!' },
      { name: 'Michael R.', date: '2026-03-08', rating: 5, text: 'Very insightful reading. Luna picked up on things I hadn\'t even mentioned. Will definitely book again.' },
      { name: 'Jessica L.', date: '2026-03-10', rating: 4, text: 'Great experience overall. Luna was patient and thorough in her reading. The guidance was helpful.' },
    ],
    availability: [
      { date: '17/06', slots: [{ hour: 14, kind: 'audio' }, { hour: 15, kind: 'audio' }, { hour: 16, kind: 'private' }] },
      { date: '18/06', slots: [{ hour: 14, kind: 'audio' }, { hour: 15, kind: 'private' }, { hour: 16, kind: 'audio' }] },
      { date: '19/06', slots: [{ hour: 10, kind: 'promo' }, { hour: 11, kind: 'audio' }, { hour: 18, kind: 'private' }] },
      { date: '20/06', slots: [] },
      { date: '21/06', slots: [{ hour: 9, kind: 'audio' }, { hour: 10, kind: 'audio' }] },
      { date: '22/06', slots: [] },
      { date: '23/06', slots: [{ hour: 13, kind: 'promo' }, { hour: 14, kind: 'audio' }] },
      { date: '24/06', slots: [{ hour: 11, kind: 'private' }] },
    ],
  },
  {
    id: '3',
    name: 'Sage Holloway',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
    rating: 4.5,
    reviews: 320,
    specialties: ['Tarot', 'Numerology'],
    description: 'Tarot reader and numerologist who helps you find clarity in life\'s most challenging moments.',
    price: 1.99,
    sessions: '800+',
    online: true,
    verified: true,
    consultations: '800+',
    languages: ['English', 'French'],
    bio: 'Certified tarot reader and numerology expert with 8 years of practice. I use the ancient science of numbers combined with tarot symbolism to reveal hidden patterns and help you align with your true path.',
    services: [
      { type: 'audio', label: 'Audio Call', price: 1.99, unit: 'min' },
      { type: 'chat', label: 'Live Chat', price: 1.49, unit: 'min' },
      { type: 'written', label: 'Written Q&A', price: 12.99, unit: 'flat' },
    ],
    ratingBreakdown: [
      { stars: 5, pct: 70 },
      { stars: 4, pct: 18 },
      { stars: 3, pct: 8 },
      { stars: 2, pct: 2 },
      { stars: 1, pct: 2 },
    ],
    reviewList: [
      { name: 'Anna P.', date: '2026-05-20', rating: 5, text: 'Sage\'s numerology reading completely changed how I see my life path. Truly gifted!' },
      { name: 'Carlos M.', date: '2026-05-05', rating: 4, text: 'Good session, very detailed tarot spread. Will come back for more guidance.' },
      { name: 'Rachel T.', date: '2026-04-18', rating: 5, text: 'Incredible insight. She knew things about my situation without me saying a word.' },
    ],
    availability: [
      { date: '17/06', slots: [{ hour: 9, kind: 'audio' }, { hour: 10, kind: 'promo' }] },
      { date: '18/06', slots: [{ hour: 14, kind: 'audio' }, { hour: 15, kind: 'audio' }] },
      { date: '19/06', slots: [] },
      { date: '20/06', slots: [{ hour: 11, kind: 'private' }, { hour: 12, kind: 'audio' }] },
      { date: '21/06', slots: [{ hour: 16, kind: 'audio' }] },
      { date: '22/06', slots: [{ hour: 10, kind: 'promo' }, { hour: 11, kind: 'private' }] },
      { date: '23/06', slots: [] },
      { date: '24/06', slots: [{ hour: 14, kind: 'audio' }] },
    ],
  },
  {
    id: '4',
    name: 'Orion Black',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop',
    rating: 4.8,
    reviews: 478,
    specialties: ['Astrology', 'Clairvoyance'],
    description: 'Seasoned astrologer combining celestial charts with clairvoyant insight for deep readings.',
    price: 3.49,
    sessions: '1500+',
    online: true,
    verified: true,
    consultations: '1500+',
    languages: ['English'],
    bio: 'Seasoned astrologer and clairvoyant with over 10 years of professional practice. I blend precise astrological analysis with my natural clairvoyant gifts to deliver readings that are both accurate and transformative.',
    services: [
      { type: 'audio', label: 'Audio Call', price: 3.49, unit: 'min' },
      { type: 'chat', label: 'Live Chat', price: 2.49, unit: 'min' },
      { type: 'written', label: 'Written Q&A', price: 17.99, unit: 'flat' },
    ],
    ratingBreakdown: [
      { stars: 5, pct: 82 },
      { stars: 4, pct: 11 },
      { stars: 3, pct: 4 },
      { stars: 2, pct: 2 },
      { stars: 1, pct: 1 },
    ],
    reviewList: [
      { name: 'Diana W.', date: '2026-05-30', rating: 5, text: 'Orion\'s clairvoyant reading was incredibly accurate. He described my situation perfectly without any hints.' },
      { name: 'James F.', date: '2026-05-15', rating: 5, text: 'Best astrology reading I\'ve ever had. Very professional and insightful.' },
      { name: 'Sophie G.', date: '2026-04-22', rating: 4, text: 'Great session. The birth chart analysis was thorough and eye-opening.' },
    ],
    availability: [
      { date: '17/06', slots: [{ hour: 13, kind: 'audio' }, { hour: 14, kind: 'audio' }, { hour: 15, kind: 'private' }] },
      { date: '18/06', slots: [] },
      { date: '19/06', slots: [{ hour: 10, kind: 'audio' }, { hour: 11, kind: 'promo' }] },
      { date: '20/06', slots: [{ hour: 14, kind: 'private' }] },
      { date: '21/06', slots: [{ hour: 9, kind: 'audio' }, { hour: 10, kind: 'audio' }, { hour: 16, kind: 'private' }] },
      { date: '22/06', slots: [] },
      { date: '23/06', slots: [{ hour: 11, kind: 'audio' }] },
      { date: '24/06', slots: [{ hour: 15, kind: 'promo' }, { hour: 16, kind: 'audio' }] },
    ],
  },
  {
    id: '5',
    name: 'Celeste Wren',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=400&auto=format&fit=crop',
    rating: 4.6,
    reviews: 215,
    specialties: ['Mediumship', 'Dream Analysis'],
    description: 'Medium and dream analyst specializing in healing connections and subconscious exploration.',
    price: 5.99,
    sessions: '600+',
    online: false,
    verified: true,
    consultations: '600+',
    languages: ['English', 'Italian'],
    bio: 'Gifted medium and dream analyst dedicated to healing and connection. I help clients communicate with departed loved ones and decode the powerful messages hidden in their dreams, bringing peace and clarity.',
    services: [
      { type: 'audio', label: 'Audio Call', price: 5.99, unit: 'min' },
      { type: 'chat', label: 'Live Chat', price: 4.49, unit: 'min' },
      { type: 'written', label: 'Written Q&A', price: 24.99, unit: 'flat' },
    ],
    ratingBreakdown: [
      { stars: 5, pct: 74 },
      { stars: 4, pct: 16 },
      { stars: 3, pct: 6 },
      { stars: 2, pct: 3 },
      { stars: 1, pct: 1 },
    ],
    reviewList: [
      { name: 'Laura B.', date: '2026-05-18', rating: 5, text: 'Celeste connected me with my late grandmother. I cannot describe how healing this was. Forever grateful.' },
      { name: 'Mark H.', date: '2026-05-02', rating: 5, text: 'The dream analysis was profound. She explained recurring symbols I\'ve had for years. Mind-blowing accuracy.' },
      { name: 'Nadia C.', date: '2026-04-15', rating: 4, text: 'Very compassionate and gifted. The session brought me real peace.' },
    ],
    availability: [
      { date: '17/06', slots: [] },
      { date: '18/06', slots: [{ hour: 15, kind: 'audio' }, { hour: 16, kind: 'private' }] },
      { date: '19/06', slots: [{ hour: 11, kind: 'audio' }] },
      { date: '20/06', slots: [{ hour: 14, kind: 'promo' }, { hour: 15, kind: 'audio' }] },
      { date: '21/06', slots: [] },
      { date: '22/06', slots: [{ hour: 10, kind: 'audio' }, { hour: 11, kind: 'audio' }] },
      { date: '23/06', slots: [{ hour: 16, kind: 'private' }] },
      { date: '24/06', slots: [] },
    ],
  },
  {
    id: '6',
    name: 'River Stone',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
    rating: 4.3,
    reviews: 189,
    specialties: ['Numerology', 'Tarot'],
    description: 'Numerologist and tarot guide helping souls navigate life transitions with ancient wisdom.',
    price: 1.49,
    sessions: '400+',
    online: true,
    verified: false,
    consultations: '400+',
    languages: ['English'],
    bio: 'Passionate numerologist and tarot guide with 5 years of practice. I specialize in life transition readings, helping clients navigate change, find their true purpose, and step into their highest potential.',
    services: [
      { type: 'audio', label: 'Audio Call', price: 1.49, unit: 'min' },
      { type: 'chat', label: 'Live Chat', price: 0.99, unit: 'min' },
      { type: 'written', label: 'Written Q&A', price: 9.99, unit: 'flat' },
    ],
    ratingBreakdown: [
      { stars: 5, pct: 62 },
      { stars: 4, pct: 22 },
      { stars: 3, pct: 10 },
      { stars: 2, pct: 4 },
      { stars: 1, pct: 2 },
    ],
    reviewList: [
      { name: 'Owen T.', date: '2026-05-25', rating: 5, text: 'River was so helpful during my career transition. The tarot reading gave me the confidence I needed.' },
      { name: 'Mia L.', date: '2026-05-10', rating: 4, text: 'Good reading, very friendly and approachable. Will book again.' },
      { name: 'Ben S.', date: '2026-04-30', rating: 4, text: 'Numerology analysis was interesting and surprisingly accurate.' },
    ],
    availability: [
      { date: '17/06', slots: [{ hour: 10, kind: 'audio' }, { hour: 11, kind: 'audio' }] },
      { date: '18/06', slots: [{ hour: 14, kind: 'promo' }] },
      { date: '19/06', slots: [] },
      { date: '20/06', slots: [{ hour: 9, kind: 'audio' }, { hour: 10, kind: 'private' }] },
      { date: '21/06', slots: [{ hour: 13, kind: 'audio' }, { hour: 14, kind: 'audio' }] },
      { date: '22/06', slots: [] },
      { date: '23/06', slots: [{ hour: 11, kind: 'promo' }, { hour: 12, kind: 'audio' }] },
      { date: '24/06', slots: [{ hour: 16, kind: 'private' }] },
    ],
  },
];
