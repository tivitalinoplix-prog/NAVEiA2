import React from 'react';
import { Logo } from './Logo';

export function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="relative bg-[#050505] text-white py-12 border-t border-white/5 overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E8272A]/50 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <Logo size={48} />
          </div>
          <p className="text-[#E4E4E7] text-sm font-light">© {currentYear} Vitalino. Todos os direitos reservados.</p>
          <div className="flex items-center gap-4">
            <a href="https://wa.me/5522998586180" className="text-[#E4E4E7] hover:text-[#E8272A] transition-colors text-sm font-light">Termos</a>
            <a href="https://wa.me/5522998586180" className="text-[#E4E4E7] hover:text-[#E8272A] transition-colors text-sm font-light">Privacidade</a>
          </div>
        </div>
      </div>
      {/* EKG Pulsating Line Backdrop */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-40 flex items-center justify-center overflow-hidden">
        <svg viewBox="0 0 1000 100" className="w-[200%] h-full opacity-80 stroke-[#E8272A]" preserveAspectRatio="none">
          <path d="M0 50 H300 L320 10 L340 90 L360 50 H600 L620 20 L640 80 L660 50 H1000" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-[dash_3s_linear_infinite]" strokeDasharray="1000" strokeDashoffset="1000" />
        </svg>
      </div>
    </footer>
  );
}
