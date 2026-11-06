import { useState } from 'react';
import { Wifi, RotateCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function SandboxStatusPage() {
  const navigate = useNavigate();
  const [retrying, setRetrying] = useState(false);

  const handleRetry = () => {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      navigate('/queue');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col items-center justify-center p-6 font-sans">
      <div className="w-full max-w-lg text-center space-y-6">
        
        {/* Top green wifi icon */}
        <div className="flex justify-center">
          <div className="text-emerald-500">
            <Wifi className="w-6 h-6" />
          </div>
        </div>

        {/* Heading & description */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            PayPal Sandbox is not reachable
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            New payments cannot be created right now. Existing cases, the graph and the timeline still work from stored data.
          </p>
        </div>

        {/* Status Table Box */}
        <div className="bg-white rounded-2xl border border-slate-200/90 shadow-xs p-5 divide-y divide-slate-100 text-left">
          
          <div className="py-3 flex items-center justify-between first:pt-1">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              PayPal Sandbox API
            </span>
            <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-rose-300 bg-rose-50/60 text-rose-600">
              Unreachable
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Webhook inbox
            </span>
            <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-emerald-300 bg-emerald-50/60 text-emerald-700">
              Operational
            </span>
          </div>

          <div className="py-3 flex items-center justify-between">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              Rules engine
            </span>
            <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-emerald-300 bg-emerald-50/60 text-emerald-700">
              Operational
            </span>
          </div>

          <div className="py-3 flex items-center justify-between last:pb-1">
            <span className="text-xs sm:text-sm font-medium text-slate-700">
              AI investigator
            </span>
            <span className="inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-amber-300 bg-amber-50/60 text-amber-700">
              Degraded
            </span>
          </div>

        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-1">
          <button
            onClick={handleRetry}
            disabled={retrying}
            className="px-5 py-2.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-xs cursor-pointer flex items-center space-x-2"
          >
            <RotateCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
            <span>{retrying ? 'Connecting...' : 'Retrying'}</span>
          </button>
          
          <Link
            to="/queue"
            className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-slate-900 font-medium text-xs sm:text-sm shadow-xs cursor-pointer"
          >
            Continue read-only
          </Link>
        </div>

      </div>
    </div>
  );
}
