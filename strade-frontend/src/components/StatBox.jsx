import React from 'react';

export default function StatBox({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  color = 'from-blue-500 to-cyan-500',
  className = ''
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-5 md:p-6 shadow-xl backdrop-blur-xl transition-all hover:border-84F7F0/40 hover:shadow-2xl hover:shadow-84F7F0/10 ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-3">
          <p className="text-xs font-medium uppercase tracking-wider text-white/50">{title}</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{value}</p>
          {change && (
            <p
              className={`text-xs md:text-sm font-medium ${
                changeType === 'positive'
                  ? 'text-84F7F0'
                  : changeType === 'negative'
                  ? 'text-red-400'
                  : 'text-white/50'
              }`}
            >
              {change}
            </p>
          )}
        </div>
        <div className={`flex h-12 w-12 md:h-14 md:w-14 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${color} shadow-lg`}>
          <div className="text-white">{icon}</div>
        </div>
      </div>
      <div className={`absolute -bottom-2 -right-2 h-20 w-20 rounded-full bg-gradient-to-br ${color} opacity-10 blur-2xl transition-opacity group-hover:opacity-20`}></div>
    </div>
  );
}
