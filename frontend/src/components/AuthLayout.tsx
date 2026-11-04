import React from 'react';
import { Link } from 'react-router-dom';

interface AuthLayoutProps {
  children: React.ReactNode;
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans text-slate-900 bg-white">
      {/* Left Gradient Panel */}
      <div className="w-full md:w-[48%] lg:w-[46%] bg-gradient-to-b from-[#052864] via-[#043384] to-[#0153b6] text-white p-8 sm:p-12 lg:p-16 flex flex-col justify-between relative overflow-hidden shrink-0">
        
        {/* Top Logo Badge */}
        <div className="z-10">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-xl bg-blue-950/40 border border-blue-400/30 text-white shadow-sm cursor-pointer"
          >
            <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center font-bold text-xs text-white">
              P
            </div>
            <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1">
              PayResolve <span className="text-[10px] bg-blue-900/80 px-1 py-0.2 rounded text-blue-200 border border-blue-600/40 font-mono">AI</span>
            </span>
          </Link>
        </div>

        {/* Center Hero Heading */}
        <div className="my-auto py-12 z-10 space-y-4 max-w-md">
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Every payment, with proof.
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed font-normal">
            Investigate PayPal payment exceptions with an evidence graph and an AI investigator. Humans approve every action.
          </p>
        </div>

        {/* Bottom Disclaimer */}
        <div className="text-xs text-blue-200/70 font-normal z-10">
          Sandbox only. Synthetic data. No real money.
        </div>

        {/* Decorative subtle ambient lights */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-300/10 rounded-full blur-3xl pointer-events-none"></div>
      </div>

      {/* Right Content Panel */}
      <div className="w-full md:w-[52%] lg:w-[54%] flex items-center justify-center p-6 sm:p-12 lg:p-20 bg-white">
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  );
};
