import React from 'react';
import { motion } from 'framer-motion';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  'aria-label': ariaLabel,
  ...props
}) {
  const baseClasses = 'inline-flex items-center justify-center font-semibold rounded-xl transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#84F7F0] disabled:opacity-50 disabled:cursor-not-allowed shadow-soft';

  const variants = {
    primary: 'bg-gradient-to-r from-[#84F7F0] to-[#6dd9d3] text-black font-bold shadow-lg shadow-[#84F7F0]/30 hover:shadow-xl hover:shadow-[#84F7F0]/50 hover:from-[#6dd9d3] hover:to-[#84F7F0] active:scale-95',
    secondary: 'bg-slate-800/90 text-[#84F7F0] border-2 border-[#84F7F0]/40 hover:bg-[#84F7F0]/10 hover:border-[#84F7F0] hover:shadow-lg hover:shadow-[#84F7F0]/20',
    outline: 'bg-transparent text-[#84F7F0] border-2 border-[#84F7F0] hover:bg-[#84F7F0]/10 hover:border-[#84F7F0]',
    ghost: 'bg-transparent text-white/90 hover:bg-white/10',
    'ghost-outline': 'bg-transparent text-white/90 border border-white/20 hover:bg-white/5',
    accent: 'bg-gradient-to-r from-[#84F7F0] to-[#000000] text-white shadow-md hover:brightness-110'
  };

  const sizes = {
    xs: 'py-1.5 px-3 text-xs rounded-lg',
    sm: 'py-2.5 px-4 text-sm rounded-lg',
    md: 'py-3 px-6 text-sm',
    lg: 'py-3.5 px-8 text-base',
    xl: 'py-4 px-9 text-lg'
  };

  const resolvedVariant = variants[variant] || variants.primary;
  const resolvedSize = sizes[size] || sizes.md;

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseClasses} ${resolvedVariant} ${resolvedSize} ${className}`}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      {...props}
    >
      {children}
    </motion.button>
  );
}