import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { AuthLayout } from '../components/AuthLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      return;
    }

    setIsSending(true);

    // Simulate sending network request with realistic feedback
    setTimeout(() => {
      setIsSending(false);
      setSentSuccess(true);
    }, 900);
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Forgot your password?
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            Enter your email and we will send a reset link. It expires in 30 minutes.
          </p>
        </div>

        {sentSuccess ? (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-slate-800 space-y-2">
              <div className="flex items-center space-x-2 text-emerald-700 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5" />
                <span>Reset link sent!</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                We've dispatched a secure password reset link to <strong className="text-slate-900 font-mono">{email}</strong>. Please check your inbox or spam folder.
              </p>
            </div>

            <div className="space-y-2.5">
              <button
                type="button"
                onClick={() => navigate('/reset-password')}
                className="w-full py-2.5 px-4 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-sm shadow-sm cursor-pointer flex items-center justify-center space-x-2"
              >
                <span>Continue to Choose New Password</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setSentSuccess(false);
                  setEmail('');
                }}
                className="w-full py-2 text-center text-xs text-slate-500 hover:text-slate-700 cursor-pointer"
              >
                Try another email
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-xs font-semibold text-slate-700">
                Email
              </label>
              <input
                type="email"
                placeholder="e.g. user@payresolve.dev"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSending}
                className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-none bg-white disabled:bg-slate-50"
                required
              />
              <p className="text-xs text-slate-400 mt-1">
                We never confirm whether an account exists.
              </p>
            </div>

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2.5 px-4 rounded-lg bg-[#0066d6] hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium text-sm shadow-sm cursor-pointer flex items-center justify-center space-x-2"
            >
              {isSending ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Sending reset link...</span>
                </>
              ) : (
                <span>Send reset link</span>
              )}
            </button>
          </form>
        )}

        <div className="pt-2">
          <Link
            to="/signin"
            className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
