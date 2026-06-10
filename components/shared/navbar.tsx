'use client';

import { Switch } from '@/components/ui/switch';
import { logout } from '@/features/auth/authSlice';
import { useGetUnReadCountQuery } from '@/features/notification/notificationApi';
import { cn } from '@/lib/utils';
import { baseURL } from '@/utils/BaseURL';
import { baseApi } from '@/utils/apiBaseQuery';
import { AnimatePresence, motion } from 'framer-motion';
import { Bell, Calendar, Heart, LayoutDashboard, LogOut, Menu, MessageSquare, ShoppingBag, Wallet, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

export function Navbar() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { token, user } = useSelector((state: any) => state.auth);
  const { data: unreadData, refetch: refetchUnreadCount } = useGetUnReadCountQuery(undefined, { skip: !token });
  const unreadCount = unreadData?.data?.unreadCount || 0;

  // Real-time notifications and chat list updates socket integration
  useEffect(() => {
    if (!token || !user) return;

    const myId = user?._id || user?.id;
    if (!myId) return;

    // Connect to the /notifications socket namespace
    const socketInstance = io(`${baseURL}/notifications`, {
      auth: {
        token: token
      },
      query: {
        token: token
      },
      extraHeaders: {
        token: token
      },
      transports: ['websocket', 'polling']
    });

    socketInstance.on('connect', () => {
      console.log('Successfully connected to notifications socket');
    });

    // Listen for real-time user notification events
    socketInstance.on(`notification::${myId}`, (data: any) => {
      console.log('Real-time notification received:', data);

      // Refresh the global unread count badge in navbar
      refetchUnreadCount();

      // Instantly trigger refetch of all notifications queries currently rendered on any page
      dispatch(baseApi.util.invalidateTags(['notification']));
    });

    // Listen for real-time chat list update events
    socketInstance.on(`chatListUpdate::${myId}`, (data: any) => {
      console.log('Real-time chat list update received:', data);

      // Instantly trigger refetch of chat details / lists currently rendered on any page
      dispatch(baseApi.util.invalidateTags(['Chat']));
    });

    socketInstance.on('disconnect', () => {
      console.log('Disconnected from notifications socket');
    });

    return () => {
      socketInstance.disconnect();
    };
  }, [token, user, dispatch, refetchUnreadCount]);

  const [profileOpen, setProfileOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isClientMode, setIsClientMode] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const pathname = usePathname();
  const profileRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    dispatch(logout());
    setProfileOpen(false);
    setShowLogoutModal(false);
    router.push('/login');
  };

  const menuItems = [
    { name: 'Marketplace', href: '/marketplace', icon: ShoppingBag },
    { name: 'Planning', href: '/planning', icon: Calendar },
    { name: 'Reviews', href: '/reviews', icon: MessageSquare },
    { name: 'Favorites', href: '/favorites', icon: Heart },
  ];

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-[100] w-full bg-primary h-20 flex items-center shadow-lg">
      <div className="container mx-auto px-4 flex items-center justify-between">

        {/* Left: Logo & Brand */}
        <div className="flex items-center gap-3">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white rounded-sm flex items-center justify-center p-1.5 shadow-sm">
              <Image src="/icons/logo2.png" alt="Logo" width={1000} height={1000} className="w-full h-auto object-contain" />
            </div>
            <span className="text-white text-xl sm:text-2xl font-semibold tracking-tight">AvenirGo</span>
          </Link>
        </div>

        {/* Center: Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 text-white/80 hover:text-white transition-all font-medium text-sm",
                  isActive && "text-white"
                )}
              >
                <Icon size={18} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Mode Toggle */}
          <div className="hidden md:flex items-center bg-white rounded-xl px-4 h-12 gap-4 shadow-sm">
            <span className={cn("text-sm font-medium transition-colors", !isClientMode ? "text-primary" : "text-primary/60")}>Medium</span>
            <Switch
              checked={isClientMode}
              onCheckedChange={setIsClientMode}
              className="data-[state=checked]:bg-primary data-[state=unchecked]:bg-primary/40"
            />
            <span className={cn("text-sm font-medium transition-colors", isClientMode ? "text-primary" : "text-primary/60")}>Client</span>
          </div>

          {/* Wallet */}
          <div className="hidden md:flex items-center gap-2 bg-white/20 hover:bg-white/30 transition-colors rounded-xl px-4 h-12 text-white cursor-pointer">
            <Wallet size={18} className="text-white/80" />
            <span className="font-bold text-sm">$155.00</span>
          </div>

          {/* Notifications */}
          <Link href="/notifications" className="relative group">
            <div className="w-12 h-12 flex items-center justify-center text-white/90 group-hover:text-white transition-all">
              <Bell size={24} />
              {unreadCount > 0 && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border border-primary" />
              )}
            </div>
          </Link>

          {/* Profile */}
          {token ? (
            <div ref={profileRef} className="relative">
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="w-10 h-10 rounded-full border-2 border-white/20 overflow-hidden cursor-pointer hover:border-white/40 transition-all shadow-md"
              >
                <Image
                  src={user?.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format"}
                  alt="Avatar"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute top-12 right-0 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 z-[101]"
                  >
                    <div className="flex flex-col items-center text-center pb-4 border-b border-gray-100">
                      <div className="w-16 h-16 rounded-full overflow-hidden mb-3 border-2 border-primary/20 p-0.5">
                        <Image
                          src={user?.image || "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces&auto=format"}
                          alt={user?.name || "User"}
                          width={64}
                          height={64}
                          className="rounded-full object-cover"
                        />
                      </div>
                      <h4 className="text-gray-900 font-semibold">{user?.name || "User"}</h4>
                      <p className="text-gray-500 text-xs uppercase tracking-wider font-medium">{user?.role || "Premium Member"}</p>
                    </div>

                    <div className="mt-4 flex flex-col gap-1">
                      <Link
                        href={isClientMode ? '/client/dashboard' : '/medium/dashboard'}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center gap-3 p-2.5 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-primary transition-all text-sm"
                      >
                        <LayoutDashboard size={16} />
                        My Dashboard
                      </Link>
                      <button
                        onClick={() => { setProfileOpen(false); setShowLogoutModal(true); }}
                        className="flex items-center gap-3 p-2.5 rounded-lg text-red-500 hover:bg-red-50/50 transition-all text-sm w-full text-left cursor-pointer"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link href="/role">
              <button className="bg-white text-primary hover:bg-white/90 px-6 h-10 rounded-lg font-semibold text-sm transition-all shadow-md">
                Sign In
              </button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden text-white p-2"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      <AnimatePresence>
        {showLogoutModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[120]"
              onClick={() => setShowLogoutModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="fixed inset-0 z-[130] flex items-center justify-center px-4"
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
                  <button
                    onClick={() => setShowLogoutModal(false)}
                    className="flex-1 py-2.5 rounded-lg border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex-1 py-2.5 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-medium transition-colors cursor-pointer"
                  >
                    Log out
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            className="fixed inset-0 z-[110] bg-primary flex flex-col p-6"
          >
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/10">
              <span className="text-white font-bold tracking-widest">MENU</span>
              <button onClick={() => setMobileMenuOpen(false)} className="text-white">
                <X size={24} />
              </button>
            </div>
            <div className="flex flex-col gap-6">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-4 text-2xl font-medium",
                      isActive ? "text-white" : "text-white/60"
                    )}
                  >
                    <Icon size={24} />
                    {item.name}
                  </Link>
                );
              })}
              {!token && (
                <Link href="/role" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-medium text-white/60 mt-4">
                  Sign In
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
