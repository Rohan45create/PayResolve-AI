import { Link, useNavigate } from 'react-router-dom';
import { AuthLayout } from '../components/AuthLayout';

export default function SignedOutPage() {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className="space-y-6">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            You were signed out
          </h2>
          <p className="text-sm text-slate-500 mt-1.5 leading-relaxed">
            After 30 minutes of inactivity we end the session to protect approvals.
          </p>
        </div>

        {/* Informative returning banner */}
        <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700">
          After you sign in you will return to <strong className="font-semibold text-slate-900 font-mono">Case PR-0142</strong>.
        </div>

        <button
          onClick={() => navigate('/signin')}
          className="w-full py-2.5 px-4 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-sm shadow-sm cursor-pointer"
        >
          Sign in again
        </button>

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
