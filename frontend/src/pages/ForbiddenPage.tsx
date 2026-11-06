import { Link, useNavigate } from 'react-router-dom';

export default function ForbiddenPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md text-center space-y-6">
        
        {/* Viewer access pill */}
        <div className="flex justify-center">
          <span className="inline-flex items-center text-xs font-semibold px-3 py-1 rounded-full border border-amber-300 bg-amber-50/70 text-amber-800">
            Viewer access
          </span>
        </div>

        {/* 403 Bold Number */}
        <h1 className="text-6xl sm:text-7xl font-black text-[#0066d6] tracking-tight">
          403
        </h1>

        {/* Title & subtitle */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            This needs an operator
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            You are signed in as a viewer, so approvals are read-only. Ask an operator to approve this action, or sign in with an operator account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/queue"
            className="px-5 py-2.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-xs cursor-pointer"
          >
            Back to Case PR-0142
          </Link>
          <button
            onClick={() => navigate('/signin')}
            className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-medium text-xs sm:text-sm shadow-xs cursor-pointer"
          >
            Switch account
          </button>
        </div>

      </div>
    </div>
  );
}
