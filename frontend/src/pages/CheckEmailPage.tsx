import { useState } from 'react';
import { Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export default function CheckEmailPage() {
  const [countdown, setCountdown] = useState(28);

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Check your email
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            If an account exists for <span className="font-mono text-slate-700 font-medium">operator@payresolve.dev</span>, a reset link is on its way.
          </p>
        </div>

        {/* Central Illustration / Email Mockup Area */}
        <div className="bg-[#f0f4f9] rounded-2xl p-8 flex flex-col items-center justify-center space-y-4 border border-slate-100">
          <div className="w-48 h-32 bg-slate-900 rounded-2xl shadow-xl flex items-center justify-center relative overflow-hidden">
            <Mail className="w-12 h-12 text-slate-200 stroke-1" />
            <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-400 animate-ping"></div>
          </div>
          <p className="text-xs text-slate-500 font-medium">
            It can take a minute. Check spam too.
          </p>
        </div>

        {/* Resend button */}
        <div className="space-y-2">
          <button
            type="button"
            disabled={countdown > 0}
            onClick={() => {
              setCountdown(30);
              alert('New password reset link dispatched.');
            }}
            className="w-full py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 text-slate-600 disabled:text-slate-400 font-medium text-xs sm:text-sm border border-slate-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {countdown > 0 ? `Resend in ${countdown} s` : 'Resend reset link'}
          </button>

          <div className="pt-2 flex items-center justify-between text-xs">
            <Link
              to="/forgot-password"
              className="text-blue-600 font-medium hover:text-blue-700 cursor-pointer"
            >
              Use a different email
            </Link>

            <Link
              to="/reset-password"
              className="text-slate-500 hover:text-slate-700 cursor-pointer"
            >
              Proceed to test reset &rarr;
            </Link>
          </div>
        </div>

      </div>
    </AuthLayout>
  );
}
