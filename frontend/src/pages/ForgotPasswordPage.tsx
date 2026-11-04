import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      alert('Please enter your email.');
      return;
    }
    // Route to choose a new password
    navigate('/reset-password');
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
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-none bg-white"
              required
            />
            <p className="text-xs text-slate-400 mt-1">
              We never confirm whether an account exists.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 px-4 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-sm shadow-sm cursor-pointer"
          >
            Send reset link
          </button>
        </form>

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
