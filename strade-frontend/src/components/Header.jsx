import React from 'react';
import { Bot } from 'lucide-react';

export default function Header() {
  return (
    <header 
      className="relative z-10 border-b border-[#84F7F0]/20 h-16"
      style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(5px)',
        WebkitBackdropFilter: 'blur(5px)',
      }}
    >
      <div className="mx-auto max-w-7xl h-full flex items-center px-4 md:px-6">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div 
            className="flex h-9 w-9 md:h-10 md:w-10 items-center justify-center rounded-lg bg-[#84F7F0]/20 border border-[#84F7F0]/50"
            style={{ boxShadow: '0 0 15px rgba(132, 247, 240, 0.3)' }}
          >
            <Bot className="h-5 w-5 md:h-6 md:w-6 text-[#84F7F0]" />
          </div>
          <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#84F7F0] to-[#6dd9d3] bg-clip-text text-transparent">STRADE</span>
        </div>
      </div>
    </header>
  );
}
