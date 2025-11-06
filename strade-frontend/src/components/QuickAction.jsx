import React from 'react';

export default function QuickAction({
  label,
  icon,
  color = 'text-blue-400',
  onClick,
  className = '',
  type = 'button'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-4 hover:bg-slate-700/50 ${className}`.trim()}
    >
      <div className="flex flex-col items-center space-y-3">
        <div className={`p-3 rounded-xl bg-slate-700/50 ${color}`}>
          {icon}
        </div>
        <span className="text-white text-sm md:text-base font-medium">{label}</span>
      </div>
    </button>
  );
}