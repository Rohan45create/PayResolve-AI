import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      alert('Please enter your username and password.');
      return;
    }
    // Simulate sign-in action
    alert(`Signed in as: ${username}`);
    navigate('/');
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

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-slate-700">
              Username
            </label>
            <input
              type="text"
              placeholder="e.g. operator"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              className="w-full px-3.5 py-2.5 rounded-lg border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-none bg-white"
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

        <div className="text-xs text-slate-400 pt-2">
          Judges: viewer credentials are in the Devpost submission.
        </div>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <Link to="/" className="text-blue-600 font-medium cursor-pointer">
            &larr; Back to Landing Page
          </Link>
          <Link to="/password-updated" className="text-slate-400 hover:text-slate-600">
            Preview Success &rarr;
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
