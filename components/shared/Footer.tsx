'use client';

import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="w-full bg-primary py-12 md:py-16">
      <div className="container mx-auto px-6 flex flex-col items-center gap-8">
        
        {/* Copyright Text */}
        <p className="text-white/60 text-sm md:text-base font-medium text-center">
          © 2024 AvenirGo. All rights reserved.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6">
          <Link 
            href="/contact" 
            className="w-full sm:w-auto min-w-[180px] h-14 flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white font-semibold hover:bg-white/20 transition-all shadow-lg backdrop-blur-sm"
          >
            Contact Us
          </Link>
          <Link 
            href="/become-medium" 
            className="w-full sm:w-auto min-w-[180px] h-14 flex items-center justify-center rounded-2xl border border-white/20 bg-white/10 text-white font-semibold hover:bg-white/20 transition-all shadow-lg backdrop-blur-sm"
          >
            Become a Medium
          </Link>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
