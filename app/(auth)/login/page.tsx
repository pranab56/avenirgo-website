'use client';

import { useLoginMutation } from '@/features/auth/authApi';
import { setCredentials } from '@/features/auth/authSlice';
import { motion } from 'framer-motion';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';

const DEMO_CREDENTIALS = { email: 'demo@gmail.com', password: 'hello123' };
const DEMO_USER = {
  _id: 'demo-user',
  name: 'Demo User',
  email: 'demo@gmail.com',
  role: 'client',
  image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop',
};

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);

  const loginWithCredentials = (_credentials: { email: string; password: string }) => {
    dispatch(setCredentials({ token: 'demo-token-' + Date.now(), refreshToken: 'demo-refresh', user: DEMO_USER }));
    toast.success('Welcome back, Demo User!');
    router.push('/');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    // Demo shortcut — no API call needed
    if (email === DEMO_CREDENTIALS.email && password === DEMO_CREDENTIALS.password) {
      loginWithCredentials({ email, password });
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      if (res.success) {
        toast.success(res.message);
        dispatch(setCredentials({
          token: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          user: res.data.userInfo,
        }));
        router.push('/');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Login failed. Please try again.');
    }
  };

  const handleDemoLogin = async () => {
    setDemoLoading(true);
    await new Promise(r => setTimeout(r, 600));
    loginWithCredentials(DEMO_CREDENTIALS);
    setDemoLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="w-38 h-38 rounded-3xl">
            <Image src="/icons/logo.png" alt="AvenirGo" width={1000} height={1000} className="object-contain rounded-lg" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1A1A1A] text-center mb-1">Welcome Back</h1>
        <p className="text-sm text-[#666666] text-center mb-7">Login to your account</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your full name"
                className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-300 bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 accent-violet-600"
              />
              <span className="text-sm text-[#1A1A1A] font-medium">Remember Password</span>
            </label>
            <Link href="/verify" className="text-sm font-semibold text-[#1A1A1A] underline underline-offset-2 hover:text-violet-600 transition-colors">
              Forgot Password
            </Link>
          </div>

          <button
            type="submit"
            disabled={isLoading || !email || !password}
            className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Demo login */}
        <div className="relative flex items-center gap-3 my-4">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400 font-medium">or</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>
        <button
          onClick={handleDemoLogin}
          disabled={demoLoading}
          className="w-full py-3 rounded-lg border-2 border-violet-300 text-violet-600 hover:bg-violet-50 font-bold text-sm transition-all active:scale-[0.98] disabled:opacity-50"
        >
          {demoLoading ? 'Signing in...' : 'Try Demo Account'}
        </button>

        <p className="text-center text-sm text-[#666666] mt-5">
          If have an account?{' '}
          <Link href="/signup" className="font-bold text-[#1A1A1A] hover:text-violet-600 transition-colors">
            SignUp
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
