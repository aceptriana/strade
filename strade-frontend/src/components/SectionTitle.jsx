import React from 'react';

export default function SectionTitle({
  title,
  subtitle,
  className = '',
  align = 'center',
  ...props
}) {
  const alignment = align === 'left' ? 'text-left' : align === 'right' ? 'text-right' : 'text-center';

  return (
    <div
      className={`space-y-2 ${alignment} ${className}`.trim()}
      {...props}
    >
      <h2 className="text-lg md:text-xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="text-white/70 text-sm leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}