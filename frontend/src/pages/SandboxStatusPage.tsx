import { useState } from 'react';
import { Wifi, RotateCw } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppLayout } from '../components/AppLayout';

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
    <AppLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <div className="w-full max-w-lg text-center space-y-6">

          {/* Icon */}
          <div className="flex justify-center">
            <Wifi className="w-6 h-6 text-emerald-500" />
          </div>

          {/* Heading */}
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              PayPal Sandbox is not reachable
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              New payments cannot be created right now. Existing cases, the graph
              and the timeline still work from stored data.
            </p>
          </div>

          {/* Status table */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 divide-y divide-slate-100 text-left">
            {[
              { label: 'PayPal Sandbox API', status: 'Unreachable', color: 'rose' },
              { label: 'Webhook inbox',      status: 'Operational', color: 'emerald' },
              { label: 'Rules engine',       status: 'Operational', color: 'emerald' },
              { label: 'AI investigator',    status: 'Degraded',    color: 'amber' },
            ].map(({ label, status, color }) => (
              <div key={label} className="py-3 flex items-center justify-between first:pt-1 last:pb-1">
                <span className="text-xs sm:text-sm font-medium text-slate-700">{label}</span>
                <span
                  className={`inline-flex items-center text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-${color}-300 bg-${color}-50/60 text-${color}-${color === 'rose' ? '600' : '700'}`}
                >
                  {status}
                </span>
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center justify-center gap-3 pt-1">
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="px-5 py-2.5 rounded-lg bg-[#0066d6] hover:bg-blue-700 text-white font-medium text-xs sm:text-sm shadow-sm cursor-pointer flex items-center space-x-2"
            >
              <RotateCw className={`w-3.5 h-3.5 ${retrying ? 'animate-spin' : ''}`} />
              <span>{retrying ? 'Connecting...' : 'Retrying'}</span>
            </button>
            <Link
              to="/queue"
              className="px-5 py-2.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 font-medium text-xs sm:text-sm shadow-sm cursor-pointer"
            >
              Continue read-only
            </Link>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
