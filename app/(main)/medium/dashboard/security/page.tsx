'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';

const labelCls = 'block text-sm font-semibold text-[#1A1A1A] mb-1.5';

function Field({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className={labelCls}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-11 px-4 rounded-lg border bg-gray-50 text-sm text-[#1A1A1A] placeholder:text-gray-400 outline-none focus:ring-2 transition-all ${
          error
            ? 'border-red-400 focus:border-red-400 focus:ring-red-400/20'
            : 'border-gray-200 focus:border-violet-500 focus:ring-violet-500/20'
        }`}
      />
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}

type InfoErrors = { firstName?: string; lastName?: string; email?: string; phone?: string };
type PwdErrors  = { current?: string; newPwd?: string; confirm?: string };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function SecurityPage() {
  const [info, setInfo] = useState({ firstName: 'Sarah', lastName: 'Johnson', email: 'sarah.johnson@example.com', phone: '+1 (555) 123-4567' });
  const [infoErrors, setInfoErrors] = useState<InfoErrors>({});

  const [pwd, setPwd] = useState({ current: '', newPwd: '', confirm: '' });
  const [pwdErrors, setPwdErrors] = useState<PwdErrors>({});

  const handleInfoUpdate = () => {
    const errs: InfoErrors = {};
    if (!info.firstName.trim()) errs.firstName = 'First name is required';
    if (!info.lastName.trim())  errs.lastName  = 'Last name is required';
    if (!info.email.trim())     errs.email     = 'Email is required';
    else if (!EMAIL_RE.test(info.email)) errs.email = 'Enter a valid email address';
    if (!info.phone.trim())     errs.phone     = 'Phone number is required';
    setInfoErrors(errs);
    if (Object.keys(errs).length > 0) return;
    toast.success('Information updated');
  };

  const handlePasswordUpdate = () => {
    const errs: PwdErrors = {};
    if (!pwd.current)  errs.current = 'Current password is required';
    if (!pwd.newPwd)   errs.newPwd  = 'New password is required';
    else if (pwd.newPwd.length < 8) errs.newPwd = 'Password must be at least 8 characters';
    if (!pwd.confirm)  errs.confirm = 'Please confirm your new password';
    else if (pwd.newPwd && pwd.confirm !== pwd.newPwd) errs.confirm = 'Passwords do not match';
    setPwdErrors(errs);
    if (Object.keys(errs).length > 0) return;
    toast.success('Password updated');
    setPwd({ current: '', newPwd: '', confirm: '' });
  };

  return (
    <div className="space-y-5">
      {/* Personal Information */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-5">
        <h2 className="font-bold text-xl text-[#1A1A1A]">Personal Information</h2>

        <div className="grid grid-cols-2 gap-4">
          <Field label="First Name" value={info.firstName}
            onChange={v => { setInfo(p => ({ ...p, firstName: v })); setInfoErrors(p => ({ ...p, firstName: undefined })); }}
            error={infoErrors.firstName} />
          <Field label="Last Name" value={info.lastName}
            onChange={v => { setInfo(p => ({ ...p, lastName: v })); setInfoErrors(p => ({ ...p, lastName: undefined })); }}
            error={infoErrors.lastName} />
          <Field label="Email" type="email" value={info.email}
            onChange={v => { setInfo(p => ({ ...p, email: v })); setInfoErrors(p => ({ ...p, email: undefined })); }}
            error={infoErrors.email} />
          <Field label="Phone" type="tel" value={info.phone}
            onChange={v => { setInfo(p => ({ ...p, phone: v })); setInfoErrors(p => ({ ...p, phone: undefined })); }}
            error={infoErrors.phone} />
        </div>

        <button
          onClick={handleInfoUpdate}
          className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer active:scale-[0.98]"
        >
          Update Information
        </button>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-lg shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-xl text-[#1A1A1A]">Change Password</h2>

        <Field label="Current Password" type="password" value={pwd.current}
          onChange={v => { setPwd(p => ({ ...p, current: v })); setPwdErrors(p => ({ ...p, current: undefined })); }}
          placeholder="Enter current password" error={pwdErrors.current} />
        <Field label="New Password" type="password" value={pwd.newPwd}
          onChange={v => { setPwd(p => ({ ...p, newPwd: v })); setPwdErrors(p => ({ ...p, newPwd: undefined })); }}
          placeholder="Enter new password" error={pwdErrors.newPwd} />
        <Field label="Confirm New Password" type="password" value={pwd.confirm}
          onChange={v => { setPwd(p => ({ ...p, confirm: v })); setPwdErrors(p => ({ ...p, confirm: undefined })); }}
          placeholder="Confirm new password" error={pwdErrors.confirm} />

        <button
          onClick={handlePasswordUpdate}
          className="px-6 py-2.5 bg-violet-600 hover:bg-violet-700 text-white text-sm font-medium rounded-lg transition-colors cursor-pointer active:scale-[0.98]"
        >
          Update Password
        </button>
      </div>
    </div>
  );
}
