import React, { useState, useEffect } from 'react';
import { Logo } from './Logo';

export function Preloader() {
  const [isOpen, setIsOpen] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsOpen(true), 800);
    const t2 = setTimeout(() => setIsUnmounted(true), 2000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (isUnmounted) return null;

  return (
    <div className="fixed inset-0 z-[100] flex w-full h-full overflow-hidden pointer-events-none">
      <div className={`absolute inset-0 flex items-center justify-center z-50 transition-all duration-700 ${isOpen ? 'opacity-0 scale-110' : 'opacity-100 scale-100'}`}>
        <Logo size={120} className="font-logo text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.1)] select-none" />
      </div>
      <div className={`relative flex-1 border-r border-[#1a1a1a] bg-[#050507] transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)] pointer-events-auto ${isOpen ? '-translate-x-full' : 'translate-x-0'}`}>
      </div>
      <div className={`relative flex-1 border-l border-[#1a1a1a] bg-[#050507] transition-transform duration-[1200ms] ease-[cubic-bezier(0.7,0,0.3,1)] pointer-events-auto ${isOpen ? 'translate-x-full' : 'translate-x-0'}`}>
      </div>
      <div className={`absolute inset-x-0 bottom-[10%] flex flex-col items-center justify-center z-30 transition-opacity duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
        <span className="text-xs tracking-[0.3em] text-[#E8272A] uppercase animate-pulse font-medium">_Initialize_Connection</span>
      </div>
    </div>
  );
}
