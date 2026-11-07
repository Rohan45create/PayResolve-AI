import React from 'react';
import { PayResolveMark } from './PayResolveLogo';

interface PayResolveSpinnerProps {
  size?: number;
  label?: string;
  sublabel?: string;
  className?: string;
}

export const PayResolveSpinner: React.FC<PayResolveSpinnerProps> = ({
  size = 48,
  label,
  sublabel,
  className = '',
}) => {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`flex flex-col items-center justify-center p-8 space-y-4 ${className}`}
    >
      <div className="relative flex items-center justify-center">
        {/* Animated breathing pulse ring with prefers-reduced-motion fallback */}
        <div
          className="absolute inset-0 rounded-full bg-blue-500/20 dark:bg-blue-400/20 blur-md motion-safe:animate-ping opacity-60"
          style={{ width: size * 1.3, height: size * 1.3, top: -size * 0.15, left: -size * 0.15 }}
        />
        <div className="motion-safe:animate-pulse">
          <PayResolveMark size={size} />
        </div>
      </div>

      {label && (
        <div className="text-center space-y-1">
          <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {label}
          </p>
          {sublabel && (
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              {sublabel}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
