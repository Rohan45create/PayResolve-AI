import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';
import { authenticateUser } from '../lib/authStore';

export default function SignInPage() {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!identifier.trim() || !password) {
      setErrorMsg('Please enter your username/email and password.');
      return;
    }

    // Authenticate against database store
    const res = authenticateUser(identifier.trim(), password);
    if (!res.success) {
      setErrorMsg(res.error || 'Invalid credentials.');
      return;
    }

    navigate('/queue');
  };

  const handleFillDemo = (type: 'operator' | 'viewer') => {
    if (type === 'operator') {
      setIdentifier('operator');
      setPassword('operator123');
    } else {
      setIdentifier('viewer');
      setPassword('viewer123');
    }
    setErrorMsg('');
  };

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Sign in
          </h2>
          <p className="text-sm text-slate-500 mt-1.5">
            Operators can approve actions. Viewers explore read-only.
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Username or Email
            </label>
            <input
              type="text"
              placeholder="e.g. operator or operator@payresolve.dev"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-none bg-white"
              required
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-slate-700">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-xs font-medium text-blue-600 hover:text-blue-700 cursor-pointer"
              >
                Forgot password?
              </Link>
            </div>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-none bg-white font-mono"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-sm shadow-sm cursor-pointer"
          >
            Sign in
          </button>
        </form>

        {/* Quick Demo Credentials Pill Bar */}
        <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
          <div className="font-semibold text-slate-700 flex items-center justify-between">
            <span>Demo credentials:</span>
            <span className="text-[11px] text-slate-400">Click to autofill</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleFillDemo('operator')}
              className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-mono text-[11px] cursor-pointer"
            >
              operator / operator123
            </button>
            <button
              type="button"
              onClick={() => handleFillDemo('viewer')}
              className="px-2.5 py-1 rounded bg-white border border-slate-200 hover:border-blue-400 text-slate-700 font-mono text-[11px] cursor-pointer"
            >
              viewer / viewer123
            </button>
          </div>
        </div>

        <div className="pt-2 text-center text-xs text-slate-500">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-600 font-semibold hover:text-blue-700 cursor-pointer">
            Create an account
          </Link>
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link to="/" className="text-blue-600 font-medium cursor-pointer">
            &larr; Back to Landing Page
          </Link>
          <span className="text-slate-400 text-[11px]">
            PayPal AI Hackathon 2026
          </span>
        </div>
      </div>
    </AuthLayout>
  );
}
