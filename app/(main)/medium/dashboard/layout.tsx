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
  Menu,
  MessageSquare,
  Shield,
  UserCog,
  Wallet,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
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

function LogoutModal({ onConfirm, onCancel }: { onConfirm: () => void; onCancel: () => void }) {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
        onClick={onCancel}
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4"
      >
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 space-y-5">
          <div className="flex flex-col items-center text-center gap-3">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
              <LogOut size={20} className="text-red-500" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-[#1A1A1A]">Log out?</h3>
              <p className="text-sm text-gray-500 mt-1">Are you sure you want to log out of your account?</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={onCancel} className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer">
              Cancel
            </button>
            <button onClick={onConfirm} className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors cursor-pointer">
              Log out
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}

function SidebarNav({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const dispatch = useDispatch();
  const router = useRouter();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/role');
  };

  return (
    <>
      <nav className="px-2 space-y-0.5">
        {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={cn(
                'flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-semibold transition-all',
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
          onClick={() => setShowLogoutModal(true)}
          className="flex w-full items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all text-left cursor-pointer"
        >
          <LogOut size={16} className="shrink-0" />
          Logout
        </button>
      </nav>

      <AnimatePresence>
        {showLogoutModal && (
          <LogoutModal onConfirm={handleLogout} onCancel={() => setShowLogoutModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default function MediumDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentLabel = NAV_ITEMS.find(n => n.href === pathname)?.label ?? 'Dashboard';

  return (
    <div className="bg-gray-100 pt-24 lg:pt-30 pb-12">
      <div className="container mx-auto px-4 lg:px-6">

        {/* Mobile header bar */}
        <div className="flex items-center gap-3 mb-4 lg:hidden">
          <button
            onClick={() => setMobileOpen(true)}
            className="w-9 h-9 bg-white rounded-sm shadow-sm flex items-center justify-center"
          >
            <Menu size={18} className="text-[#1A1A1A]" />
          </button>
          <h1 className="font-bold text-lg text-[#1A1A1A]">{currentLabel}</h1>
        </div>

        <div className="flex gap-6 items-start">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-72 shrink-0 bg-white rounded-sm shadow-sm py-3 sticky top-28 self-start">
            <SidebarNav />
          </aside>

          <div className="flex-1 min-w-0">{children}</div>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[110]"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 left-0 z-[120] w-72 bg-white shadow-2xl pt-3 overflow-y-auto"
            >
              <div className="flex items-center justify-between px-4 pb-3 mb-1 border-b border-gray-100">
                <span className="font-bold text-sm text-[#1A1A1A]">Medium Dashboard</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center"
                >
                  <X size={15} />
                </button>
              </div>
              <SidebarNav onNavigate={() => setMobileOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
