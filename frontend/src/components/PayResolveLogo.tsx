import React from 'react';

export const PayResolveMark: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 28 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="PayResolve logo"
    >
      <defs>
        <linearGradient id="prGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#00b4d8" />
          <stop offset="45%" stopColor="#0077b6" />
          <stop offset="100%" stopColor="#0052cc" />
        </linearGradient>
        <linearGradient id="prGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#034694" />
        </linearGradient>
      </defs>
      
      {/* Outer loop styled like the stylized P ribbon in the design PNGs */}
      <path
        d="M12 28.5C12 28.5 7 24 7 17C7 9.8 12.8 4 20 4C27.2 4 33 9.8 33 17C33 24.2 27.2 30 20 30C16.5 30 13.5 28.5 12 26"
        stroke="url(#prGrad)"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9 22C11 26 15 35 18 35.5C21 36 24 33 24 30"
        stroke="url(#prGrad2)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.9"
      />
      {/* Verification checkmark inside the loop */}
      <path
        d="M17.5 17L19.5 19L24 14.5"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export const PayResolveLogo: React.FC<{
  className?: string;
  markSize?: number;
  textColor?: string;
  showText?: boolean;
}> = ({
  className = '',
  markSize = 28,
  textColor = 'text-slate-900 dark:text-white',
  showText = true,
}) => {
  return (
    <div className={`inline-flex items-center space-x-2.5 select-none ${className}`}>
      <PayResolveMark size={markSize} />
      {showText && (
        <span className={`font-bold text-lg tracking-tight flex items-center gap-1.5 ${textColor}`}>
          PayResolve
          <span className="text-[11px] font-semibold px-1.5 py-0.2 rounded bg-blue-500 text-white font-mono shadow-xs">
            AI
          </span>
        </span>
      )}
    </div>
  );
};
