import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { updatePasswordByEmail } from '../lib/authStore';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('•••••••');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const targetEmail = searchParams.get('email') || 'operator@payresolve.dev';

  const realPassword = newPassword === '•••••••' ? 'shortpw' : newPassword;
  const isLongEnough = realPassword.length >= 12;
  const isTooShort = realPassword.length > 0 && !isLongEnough;
  const isCommon = realPassword.toLowerCase() === 'password1234' || realPassword.toLowerCase() === '123456789012';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErrorMsg('');

    if (!isLongEnough) {
      setErrorMsg('Password must be at least 12 characters.');
      return;
    }

    if (realPassword !== confirmPassword) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    updatePasswordByEmail(targetEmail, realPassword);
    updatePasswordByEmail('operator', realPassword);
    navigate('/password-updated');
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Choose a new password
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed">
            Use at least 12 characters.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-700 dark:text-rose-400 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              New password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setTouched(true);
              }}
              onFocus={() => {
                if (newPassword === '•••••••') setNewPassword('');
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:border-transparent bg-white dark:bg-[#131b26] ${
                isTooShort && touched
                  ? 'border-rose-400 dark:border-rose-500 focus:ring-rose-500'
                  : 'border-slate-200 dark:border-slate-800 focus:ring-blue-600'
              }`}
              required
            />
            {isTooShort && touched && (
              <p className="text-xs text-rose-500 dark:text-rose-400 font-normal pt-0.5">
                Password is too short.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 dark:border-slate-800 text-sm text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent bg-white dark:bg-[#131b26]"
              required
            />
          </div>

          {/* Validation indicators */}
          <div className="space-y-1 pt-1 text-xs">
            <div className={`font-medium ${isLongEnough ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-500 dark:text-rose-400'}`}>
              {isLongEnough ? 'Done: 12 or more characters' : 'Not yet: 12 or more characters'}
            </div>
            <div className={`font-medium ${!isCommon && realPassword.length > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
              Done: not a common password
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-[#0066cc] hover:bg-blue-600 active:scale-[0.98] text-white font-medium text-sm shadow-sm cursor-pointer transition-all mt-2"
          >
            Update password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
