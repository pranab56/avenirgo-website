'use client';

import { useResendPasswordMutation } from '@/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const schema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type FormValues = z.infer<typeof schema>;

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [resetPassword, { isLoading }] = useResendPasswordMutation();

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await resetPassword({
        token,
        data: { newPassword: data.password, confirmPassword: data.confirmPassword },
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        router.push('/login');
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to reset password');
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
          <div className="w-38 h-38 rounded-3xl">
            <Image src="/icons/logo.png" alt="AvenirGo" width={1000} height={1000} className="object-contain rounded-lg" />
          </div>
        </div>

        <h1 className="text-2xl font-bold text-[#1A1A1A] text-center mb-1">Set New Password</h1>
        <p className="text-sm text-[#666666] text-center mb-7">Create a new password for your account.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                {...register('password')}
                className={`w-full h-11 px-4 pr-11 rounded-lg border bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all ${errors.password ? 'border-red-400' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-semibold text-[#1A1A1A]">Confirm Password</label>
            <div className="relative">
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder="Re enter your password"
                {...register('confirmPassword')}
                className={`w-full h-11 px-4 pr-11 rounded-lg border bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all ${errors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
          >
            {isLoading && <Loader size={16} className="animate-spin" />}
            Confirm
          </button>

          <Link href="/login">
            <button
              type="button"
              className="w-full py-3.5 rounded-lg border-2 border-violet-300 text-violet-600 hover:bg-violet-50 font-bold text-sm transition-all active:scale-[0.98]"
            >
              Back to Sign in
            </button>
          </Link>
        </form>
      </motion.div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
