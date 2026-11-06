import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Inbox, 
  Share2, 
  Zap,
  ShoppingBag, 
  CheckCircle2, 
  BarChart3
} from 'lucide-react';
import { logoutUser, getCurrentUser } from '../lib/authStore';

interface AppLayoutProps {
  children: React.ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const navItems = [
    { label: 'Queue',     path: '/queue',       icon: Inbox },
    { label: 'Case',      path: '/case/PR-0142', icon: Share2 },
    { label: 'Events',    path: '/events',       icon: Zap },
    { label: 'Demo shop', path: '/shop',          icon: ShoppingBag },
    { label: 'Actions',   path: '/actions',       icon: CheckCircle2 },
    { label: 'Benchmark', path: '/benchmark',     icon: BarChart3 },
  ];

  const handleSignOut = () => {
    logoutUser();
    navigate('/signed-out');
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex font-sans selection:bg-blue-100">
      
      {/* ---------------- SIDEBAR ---------------- */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between shrink-0 p-5 hidden md:flex sticky top-0 h-screen">
        <div className="space-y-8">
          
          {/* Brand Logo */}
          <Link to="/" className="flex items-center space-x-2.5 cursor-pointer">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-lg text-white shadow-inner">
              P
            </div>
            <span className="font-bold text-lg tracking-tight text-slate-900 flex items-center gap-1">
              PayResolve <span className="text-blue-600 text-xs font-semibold px-1 py-0.5 rounded bg-blue-50 border border-blue-200 font-mono">AI</span>
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1 text-sm font-medium">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path || 
                (item.path.startsWith('/case') && location.pathname.startsWith('/case'));
              
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 font-semibold'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Status & Sign Out */}
        <div className="space-y-4 pt-4 border-t border-slate-100">
          <Link
            to="/status"
            className="w-full flex items-center space-x-2 px-3 py-1.5 rounded-full border border-emerald-300 bg-emerald-50/60 text-emerald-800 text-xs font-medium cursor-pointer"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Sandbox mode</span>
          </Link>

          <div className="flex items-center justify-between text-xs pt-1">
            <span className="px-2.5 py-1 rounded bg-slate-100 text-slate-700 font-medium border border-slate-200 capitalize">
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

      {/* ---------------- MAIN VIEWPORT ---------------- */}
      <main className="flex-1 p-6 sm:p-10 lg:p-12 overflow-y-auto">
        {children}
      </main>

    </div>
  );
};
