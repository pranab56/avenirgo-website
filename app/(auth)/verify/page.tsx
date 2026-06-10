'use client';

import { useVerifyOtpMutation } from '@/features/auth/authApi';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const OTP_LENGTH = 5;
const RESEND_SECONDS = 60;

export default function VerifyPage() {
  const router = useRouter();
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

  const [digits, setDigits] = useState<string[]>(Array(OTP_LENGTH).fill(''));
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (countdown === 0) return;
    const t = setTimeout(() => setCountdown(c => c - 1), 1000);
    return () => clearTimeout(t);
  }, [countdown]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < OTP_LENGTH - 1) inputRefs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !digits[i] && i > 0) {
      inputRefs.current[i - 1]?.focus();
    }
    if (e.key === 'ArrowLeft' && i > 0) inputRefs.current[i - 1]?.focus();
    if (e.key === 'ArrowRight' && i < OTP_LENGTH - 1) inputRefs.current[i + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, OTP_LENGTH);
    const next = [...digits];
    for (let i = 0; i < pasted.length; i++) next[i] = pasted[i];
    setDigits(next);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    const code = digits.join('');
    if (code.length < OTP_LENGTH) {
      toast.error('Please enter all 5 digits');
      return;
    }
    try {
      const res = await verifyOtp({ otp: code }).unwrap();
      if (res.success) {
        toast.success(res.message || 'Verified successfully!');
        router.push('/success');
      }
    } catch (err: any) {
      toast.error(err?.data?.message || 'Invalid code. Please try again.');
    }
  };

  const mm = String(Math.floor(countdown / 60)).padStart(2, '0');
  const ss = String(countdown % 60).padStart(2, '0');

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-56px)] px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-xs"
      >
        {/* Logo */}
        <div className="flex justify-center mb-7">
          <div className="w-38 h-38 rounded-3xl">
            <Image src="/icons/logo.png" alt="AvenirGo" width={1000} height={1000} className="object-contain rounded-lg" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1A1A1A] text-center mb-2">Verify Reset Password</h1>
        <p className="text-sm text-[#666666] text-center leading-relaxed mb-8">
          Enter the code sent to your email to reset your password.
        </p>

        {/* OTP inputs */}
        <div className="flex justify-center gap-3 mb-7" onPaste={handlePaste}>
          {digits.map((d, i) => (
            <input
              key={i}
              ref={el => { inputRefs.current[i] = el; }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={d}
              onChange={e => handleChange(i, e.target.value)}
              onKeyDown={e => handleKeyDown(i, e)}
              className="w-12 h-12 text-center text-xl font-bold text-[#1A1A1A] bg-white border border-gray-300 rounded-sm outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
            />
          ))}
        </div>

        <div className="space-y-3">
          <button
            onClick={handleVerify}
            disabled={isLoading || digits.some(d => !d)}
            className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20"
          >
            {isLoading ? 'Verifying...' : 'Verify Code'}
          </button>

          <Link
            href="/login"
            className="block w-full py-3.5 rounded-lg  text-violet-600 font-medium text-sm text-center transition-all"
          >
            Back to Sign In
          </Link>
        </div>

        <p className="text-center text-sm text-[#666666] mt-5">
          Resend code in{' '}
          <span className="font-bold text-[#1A1A1A]">
            {mm} : {ss}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
