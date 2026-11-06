import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Inbox,
  Share2,
  Zap,
  ShoppingBag,
  CheckCircle2,
  BarChart3,
  Wifi,
  LayoutGrid,
} from 'lucide-react';
import { logoutUser, getCurrentUser } from '../lib/authStore';

interface AppLayoutProps {
  children: React.ReactNode;
}

const NAV_SECTIONS = [
  {
    heading: 'Investigation',
    items: [
      { label: 'Queue',     path: '/queue',          icon: Inbox },
      { label: 'Case',      path: '/case/PR-0142',   icon: Share2 },
      { label: 'Events',    path: '/events',          icon: Zap },
    ],
  },
  {
    heading: 'Tools',
    items: [
      { label: 'Demo shop', path: '/shop',      icon: ShoppingBag },
      { label: 'Actions',   path: '/actions',   icon: CheckCircle2 },
      { label: 'Benchmark', path: '/benchmark', icon: BarChart3 },
    ],
  },
  {
    heading: 'System',
    items: [
      { label: 'Sandbox status', path: '/status',     icon: Wifi },
      { label: 'UI states',      path: '/ui-states',  icon: LayoutGrid },
    ],
  },
];

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const isActive = (path: string) =>
    path.startsWith('/case')
      ? location.pathname.startsWith('/case')
      : location.pathname === path;

  const handleSignOut = () => {
    logoutUser();
    navigate('/signed-out');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-sans selection:bg-blue-100">

      {/* ─── SIDEBAR ─── */}
      <aside className="w-56 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 py-5 hidden md:flex sticky top-0 h-screen">
        <div className="space-y-6 px-4">

          {/* Brand */}
          <Link to="/" className="flex items-center space-x-2 cursor-pointer">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-base text-white shadow-inner">
              P
            </div>
            <span className="font-bold text-base tracking-tight text-slate-900 flex items-center gap-1">
              PayResolve{' '}
              <span className="text-blue-600 text-[10px] font-semibold px-1 py-0.5 rounded bg-blue-50 border border-blue-200 font-mono">
                AI
              </span>
            </span>
          </Link>

          {/* Nav sections */}
          {NAV_SECTIONS.map((section) => (
            <div key={section.heading}>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400 mb-1 px-1">
                {section.heading}
              </p>
              <nav className="space-y-0.5 text-sm font-medium">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const active = isActive(item.path);
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center space-x-2.5 px-3 py-2 rounded-lg cursor-pointer ${
                        active
                          ? 'bg-blue-50 text-blue-700 font-semibold'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                      }`}
                    >
                      <Icon
                        className={`w-4 h-4 shrink-0 ${
                          active ? 'text-blue-600' : 'text-slate-400'
                        }`}
                      />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          ))}
        </div>

        {/* Bottom: sandbox pill + role / sign-out */}
        <div className="px-4 space-y-3 pt-4 border-t border-slate-100">
          <Link
            to="/status"
            className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50/60 text-emerald-800 text-xs font-medium cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Sandbox mode</span>
          </Link>

          <div className="flex items-center justify-between text-xs">
            <span className="px-2 py-1 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200 capitalize">
              {currentUser?.role ?? 'Operator'}
            </span>
            <button
              onClick={handleSignOut}
              className="text-blue-600 font-medium hover:text-blue-800 cursor-pointer"
            >
              Sign out
            </button>
          </div>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};
