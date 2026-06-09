import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#E8E8E8]">
      <header className="bg-violet-600 h-14 flex items-center px-6 shrink-0">
        <Link href="/" className="flex items-center gap-2 text-white text-sm font-medium hover:text-white/80 transition-colors">
          <ArrowLeft size={17} />
          Back to the homepage
        </Link>
      </header>
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
