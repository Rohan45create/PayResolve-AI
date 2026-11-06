import { Link, useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-md text-center space-y-6">
        
        {/* Top Logo */}
        <div className="flex justify-center">
          <Link to="/" className="inline-flex items-center space-x-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-inner">
              P
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1">
              PayResolve <span className="text-blue-600 text-xs font-semibold px-1 py-0.5 rounded bg-blue-50 border border-blue-200 font-mono">AI</span>
            </span>
          </Link>
        </div>

        {/* 404 Bold Number */}
        <h1 className="text-6xl sm:text-7xl font-black text-[#0066d6] tracking-tight">
          404
        </h1>

        {/* Title & subtitle */}
        <div className="space-y-2">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            We could not find that page
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed max-w-sm mx-auto">
            The case or page may have been deleted, or the link is incomplete. Cases are never removed, so check the id.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/queue"
            className="px-5 py-2.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-xs cursor-pointer"
          >
            Go to the queue
          </Link>
          <button
            onClick={() => navigate('/queue')}
            className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-medium text-xs sm:text-sm shadow-xs cursor-pointer"
          >
            Search cases
          </button>
        </div>

      </div>
    </div>
  );
}
