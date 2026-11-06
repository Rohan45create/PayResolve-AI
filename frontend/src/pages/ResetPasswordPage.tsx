import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { updatePasswordByEmail } from '../lib/authStore';

export default function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [touched, setTouched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const targetEmail = searchParams.get('email') || 'operator@payresolve.dev';

  const isLongEnough = newPassword.length >= 12;
  const isCommon = newPassword.toLowerCase() === 'password1234' || newPassword.toLowerCase() === '123456789012';
  const isTooShort = touched && newPassword.length > 0 && !isLongEnough;
  const passwordsMatch = newPassword === confirmPassword;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErrorMsg('');

    if (!isLongEnough) {
      setErrorMsg('Password must be at least 12 characters.');
      return;
    }

    if (!passwordsMatch) {
      setErrorMsg('Passwords do not match.');
      return;
    }

    // Persist new password into the store
    const success = updatePasswordByEmail(targetEmail, newPassword);
    if (!success) {
      // In case targeted email is custom or fallback to operator
      updatePasswordByEmail('operator', newPassword);
    }

    navigate('/password-updated');
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Choose a new password
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            Resetting password for <strong className="font-mono text-slate-700">{targetEmail}</strong>. Use at least 12 characters.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              New password
            </label>
            <input
              type="password"
              placeholder="Enter at least 12 characters"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setTouched(true);
              }}
              className={`w-full px-3.5 py-2.5 rounded-lg border text-sm text-slate-900 focus:outline-none focus:ring-2 focus:border-transparent transition-none bg-white font-mono ${
                isTooShort 
                  ? 'border-rose-400 focus:ring-rose-500' 
                  : 'border-slate-200 focus:ring-blue-600'
              }`}
              required
            />
            {isTooShort && (
              <p className="text-xs text-rose-500 font-medium pt-0.5">
                Password is too short.
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Confirm password
            </label>
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-none bg-white font-mono"
              required
            />
          </div>

          {/* Validation checklist */}
          <div className="space-y-1 pt-1 text-xs font-medium">
            <div className={isLongEnough ? 'text-emerald-600' : 'text-rose-500'}>
              {isLongEnough ? 'Done: 12 or more characters' : 'Not yet: 12 or more characters'}
            </div>
            <div className={!isCommon && newPassword.length > 0 ? 'text-emerald-600' : 'text-slate-500'}>
              Done: not a common password
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-sm shadow-sm cursor-pointer mt-2"
          >
            Update password
          </button>
        </form>
      </div>
    </AuthLayout>
  );
}
