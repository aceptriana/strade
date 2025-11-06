import React from 'react';
import { motion } from 'framer-motion';

export default function Card({
  children,
  className = '',
  hover = false,
  padding = 'p-4 md:p-6',
  animate = true,
  ...props
}) {
    const baseClasses = `
    rounded-2xl border border-[#84F7F0]/20 
    bg-[rgba(255,255,255,0.02)]
    backdrop-blur-sm shadow-xl
    transition-all duration-200 ease-out
    ${hover ? 'hover:border-[#84F7F0] hover:shadow-2xl hover:shadow-[#84F7F0]/20 hover:scale-[1.02] cursor-pointer' : ''}
  `.trim();
  // support compact variant via className or padding prop
  const compactPadding = padding === 'compact' ? 'p-3 sm:p-4' : padding;
  const hoverClasses = '';

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' }
    }
  };

  const CardComponent = animate ? motion.div : 'div';
  const animateProps = animate ? {
    initial: 'hidden',
    animate: 'visible',
    variants: cardVariants
  } : {};

  return (
    <CardComponent
      className={`${baseClasses} ${compactPadding} ${hoverClasses} ${className}`.trim()}
      {...animateProps}
      {...props}
    >
      {children}
    </CardComponent>
  );
}