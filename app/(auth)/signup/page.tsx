'use client';

import { useSignUpMutation } from '@/features/auth/authApi';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

export default function SignupPage() {
  const router = useRouter();
  const [signUp, { isLoading }] = useSignUpMutation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      const res = await signUp({ name, email, password }).unwrap();
      if (res.success) {
        toast.success(res.message || 'Account created! Please verify.');
        router.push('/verify');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Sign up failed. Please try again.');
    }
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
          <div className="w-24 h-24 bg-violet-700 rounded-3xl flex flex-col items-center justify-center gap-1.5 shadow-lg">
            <Image src="/icons/logo.png" alt="AvenirGo" width={38} height={38} className="object-contain" />
            <span className="text-white font-bold text-xs">AvenirGo</span>
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1A1A1A] text-center mb-1">Create an Account</h1>
        <p className="text-sm text-[#666666] text-center mb-7">Sign up for personalized spiritual guidance.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Enter your full name"
              className="w-full h-11 px-4 rounded-lg border border-gray-300 bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Enter your email address"
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
                placeholder="Enter your password"
                className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-300 bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
              <button type="button" onClick={() => setShowPassword(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Re-write your password"
                className="w-full h-11 px-4 pr-11 rounded-lg border border-gray-300 bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              />
              <button type="button" onClick={() => setShowConfirm(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading || !name || !email || !password || !confirmPassword}
            className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
          >
            {isLoading ? 'Creating account...' : 'Login'}
          </button>
        </form>

        <p className="text-center text-sm text-[#666666] mt-6">
          If haven&apos;t account?{' '}
          <Link href="/login" className="font-bold text-[#1A1A1A] hover:text-violet-600 transition-colors">
            Sign Up
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
