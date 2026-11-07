import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export default function PasswordUpdatedPage() {
  const [seconds, setSeconds] = useState(3);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds <= 0) {
      navigate('/signin');
      return;
    }
    const timer = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [seconds, navigate]);

  const progressPercent = Math.min(100, Math.max(0, ((3 - seconds) / 3) * 100));

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Password updated
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            You can sign in with your new password. Other sessions were signed out.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <div className="text-xs font-medium text-slate-600">
            Redirecting to sign in in {seconds} s
          </div>

          {/* Progress Bar matching design */}
          <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-[#0066d6] transition-all duration-1000 ease-linear"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        <div className="pt-2">
          <button
            onClick={() => navigate('/signin')}
            className="w-full py-2.5 px-4 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-sm shadow-sm cursor-pointer text-center block"
          >
            Sign in now
          </button>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="text-xs font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
          >
            &larr; Back to home
          </Link>
        </div>
      </div>
    </AuthLayout>
  );
}
