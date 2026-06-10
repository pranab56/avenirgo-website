'use client';

import {
  useForgotEmailMutation,
  useResendPasswordMutation,
  useVerifyOtpMutation
} from '@/features/auth/authApi';
import { zodResolver } from '@hookform/resolvers/zod';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, Eye, EyeOff, Loader } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import * as z from 'zod';

const emailSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email address'),
});

const passwordSchema = z.object({
  password: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(1, 'Please confirm your password'),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type EmailFormValues = z.infer<typeof emailSchema>;
type PasswordFormValues = z.infer<typeof passwordSchema>;

export default function ForgotPasswordPage() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [resetToken, setResetToken] = useState('');
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);

  const [forgotEmail, { isLoading: isSendingEmail }] = useForgotEmailMutation();
  const [verifyOtp, { isLoading: isVerifyingOtp }] = useVerifyOtpMutation();
  const [resetPassword, { isLoading: isResettingPassword }] = useResendPasswordMutation();

  const emailForm = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: '' },
  });

  const passwordForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');
    if (value && index < 5) otpRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const onEmailSubmit = async (data: EmailFormValues) => {
    try {
      const res = await forgotEmail({ email: data.email }).unwrap();
      if (res.success) {
        toast.success(res.message);
        setUserEmail(data.email);
        setStep(2);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to send OTP');
    }
  };

  const onVerifyOtp = async () => {
    const code = otp.join('');
    if (code.length < 6) {
      setOtpError('Please enter the full 6-digit code');
      return;
    }
    try {
      const res = await verifyOtp({ email: userEmail, oneTimeCode: code }).unwrap();
      if (res.success) {
        toast.success(res.message);
        setResetToken(res.data.token);
        setStep(3);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Invalid OTP');
    }
  };

  const onPasswordSubmit = async (data: PasswordFormValues) => {
    try {
      const res = await resetPassword({
        token: resetToken,
        data: { newPassword: data.password, confirmPassword: data.confirmPassword }
      }).unwrap();
      if (res.success) {
        toast.success(res.message);
        setStep(4);
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
        {step !== 4 && (
          <div className="flex justify-center mb-7">
            <div className="w-38 h-38 rounded-3xl">
              <Image src="/icons/logo.png" alt="AvenirGo" width={1000} height={1000} className="object-contain rounded-lg" />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Email */}
          {step === 1 && (
            <motion.div
              key="step-email"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
            >
              <h1 className="text-2xl font-bold text-[#1A1A1A] text-center mb-1">Reset Password</h1>
              <p className="text-sm text-[#666666] text-center mb-7">Enter the email address associated with your account.</p>

              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1A1A1A]">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your full name"
                    {...emailForm.register('email')}
                    className={`w-full h-11 px-4 rounded-lg border bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all ${emailForm.formState.errors.email ? 'border-red-400' : 'border-gray-300'}`}
                  />
                  {emailForm.formState.errors.email && (
                    <p className="text-red-500 text-xs mt-1">{emailForm.formState.errors.email.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSendingEmail}
                  className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
                >
                  {isSendingEmail && <Loader size={16} className="animate-spin" />}
                  Send Reset Link
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
          )}

          {/* Step 2: OTP */}
          {step === 2 && (
            <motion.div
              key="step-otp"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-2xl font-bold text-[#1A1A1A] text-center mb-1">Verify Account</h1>
              <p className="text-sm text-[#666666] text-center mb-7">
                We&apos;ve sent a unique 6-digit verification code to your email address.
              </p>

              <div className="space-y-4">
                <div className="flex justify-center gap-3">
                  {otp.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={(el) => { otpRefs.current[idx] = el; }}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className={`w-12 h-12 text-center text-lg font-bold text-[#1A1A1A] bg-white border rounded-lg outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all ${otpError ? 'border-red-400' : 'border-gray-300'}`}
                    />
                  ))}
                </div>
                {otpError && <p className="text-red-500 text-xs text-center">{otpError}</p>}

                <div className="flex items-center justify-between text-xs font-medium">
                  <span className="text-[#666666]">Didn&apos;t receive the code?</span>
                  <button
                    onClick={() => setOtp(['', '', '', '', '', ''])}
                    className="text-violet-600 hover:underline font-bold cursor-pointer"
                  >
                    Resend OTP
                  </button>
                </div>

                <button
                  onClick={onVerifyOtp}
                  disabled={isVerifyingOtp}
                  className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
                >
                  {isVerifyingOtp && <Loader size={16} className="animate-spin" />}
                  Verify & Continue
                </button>

                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="w-full py-3.5 rounded-lg border-2 border-violet-300 text-violet-600 hover:bg-violet-50 font-bold text-sm transition-all active:scale-[0.98]"
                >
                  Back
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: New Password */}
          {step === 3 && (
            <motion.div
              key="step-password"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h1 className="text-2xl font-bold text-[#1A1A1A] text-center mb-1">New Password</h1>
              <p className="text-sm text-[#666666] text-center mb-7">Please create a new secure password for your account.</p>

              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1A1A1A]">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder="Enter password"
                      {...passwordForm.register('password')}
                      className={`w-full h-11 px-4 pr-11 rounded-lg border bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all ${passwordForm.formState.errors.password ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.password && (
                    <p className="text-red-500 text-xs mt-1">{passwordForm.formState.errors.password.message}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-semibold text-[#1A1A1A]">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      placeholder="Confirm password"
                      {...passwordForm.register('confirmPassword')}
                      className={`w-full h-11 px-4 pr-11 rounded-lg border bg-white text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all ${passwordForm.formState.errors.confirmPassword ? 'border-red-400' : 'border-gray-300'}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(v => !v)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  {passwordForm.formState.errors.confirmPassword && (
                    <p className="text-red-500 text-xs mt-1">{passwordForm.formState.errors.confirmPassword.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isResettingPassword}
                  className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20 flex items-center justify-center gap-2"
                >
                  {isResettingPassword && <Loader size={16} className="animate-spin" />}
                  Update Password
                </button>
              </form>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              key="step-success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex justify-center mb-7">
                <div className="w-38 h-38 rounded-3xl">
                  <Image src="/icons/logo.png" alt="AvenirGo" width={1000} height={1000} className="object-contain rounded-lg" />
                </div>
              </div>

              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center text-green-500 border border-green-100 shadow-xl shadow-green-500/10 mb-5">
                <CheckCircle2 size={40} strokeWidth={1.5} />
              </div>

              <h1 className="text-2xl font-bold text-[#1A1A1A] mb-1">Password Changed</h1>
              <p className="text-sm text-[#666666] mb-7 max-w-xs">
                Your password has been reset successfully. You can now login with your new credentials.
              </p>

              <Link href="/login" className="w-full">
                <button className="w-full py-3.5 rounded-lg bg-violet-600 hover:bg-violet-700 text-white font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-violet-500/20">
                  Go to Login
                </button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
