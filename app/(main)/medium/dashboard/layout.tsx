'use client';

import { logout } from '@/features/auth/authSlice';
import { cn } from '@/lib/utils';
import {
  BarChart2,
  Bell,
  BookOpen,
  Calendar,
  DollarSign,
  FileText,
  HelpCircle,
  LogOut,
  MessageSquare,
  Shield,
  UserCog,
  Wallet,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';

const NAV_ITEMS = [
  { label: 'Wallet', href: '/medium/dashboard', icon: Wallet },
  { label: 'Profile Settings', href: '/medium/dashboard/profile', icon: UserCog },
  { label: 'Schedule & Availability', href: '/medium/dashboard/schedule', icon: Calendar },
  { label: 'Consultations', href: '/medium/dashboard/consultations', icon: BookOpen },
  { label: 'Question & Answer', href: '/medium/dashboard/qa', icon: MessageSquare },
  { label: 'Statistics', href: '/medium/dashboard/statistics', icon: BarChart2 },
  { label: 'Earnings & Payouts', href: '/medium/dashboard/earnings', icon: DollarSign },
  { label: 'My Documents', href: '/medium/dashboard/documents', icon: FileText },
  { label: 'Notifications', href: '/medium/dashboard/notifications', icon: Bell },
  { label: 'Security & Privacy', href: '/medium/dashboard/security', icon: Shield },
  { label: 'Support', href: '/medium/dashboard/support', icon: HelpCircle },
];

function Sidebar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push('/role');
  };

  return (
    <aside className="w-52 shrink-0 bg-white rounded-2xl shadow-sm py-3 sticky top-28 self-start">
      <nav className="px-2 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all',
                isActive
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-500/20'
                  : 'text-gray-500 hover:bg-gray-50 hover:text-[#1A1A1A]'
              )}
            >
              <Icon size={16} className="shrink-0" />
              {label}
            </Link>
          );
        })}

        <div className="my-1.5 h-px bg-gray-100 mx-2" />

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all text-left"
        >
          <LogOut size={16} className="shrink-0" />
          Logout
        </button>
      </nav>
    </aside>
  );
}

export default function MediumDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-100 pt-24 pb-12">
      <div className="container mx-auto px-6 max-w-5xl">
        <div className="flex gap-6 items-start">
          <Sidebar />
          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>
    </div>
  );
}
