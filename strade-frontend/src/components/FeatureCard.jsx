import React from 'react';
import { ChevronRight } from 'lucide-react';

export default function FeatureCard({
  title,
  description,
  icon,
  onClick,
  className = '',
  type = 'button'
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-left w-full hover:bg-slate-700/50 ${className}`.trim()}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4 flex-1">
          <div className="p-3 rounded-xl bg-gradient-to-br from-[#84F7F0]/20 to-purple-500/20 text-[#84F7F0]">
            {icon}
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-white font-semibold text-base md:text-lg">{title}</h3>
            <p className="text-white/60 text-sm md:text-base">{description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-white/50" />
      </div>
    </button>
  );
}