import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';
import { MagneticButton } from './MagneticButton';
import { ScrambleText } from './ScrambleText';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <nav className="fixed top-0 inset-x-0 z-50 w-full bg-[#050505]/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-6 lg:py-8 flex justify-between items-center w-full relative">
        <div className="flex-shrink-0 font-logo font-black italic text-2xl tracking-tighter w-[150px]">
          <motion.a href="#" className="text-white flex items-center gap-1" whileHover={{ scale: 1.05 }}>
            <Logo size={42} />
          </motion.a>
        </div>
        
        <div className="hidden lg:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          {["Gargalos", "Método", "Especialista"].map(t => (
            <a key={t} href={`#${t === 'Gargalos' ? 'problem' : t === 'Método' ? 'method' : 'mentor'}`} className="text-white hover:text-[#FF2D30] transition-colors text-xs font-medium tracking-widest uppercase">{t}</a>
          ))}
        </div>
        
        <div className="flex gap-6 items-center justify-end w-[150px]">
          <div className="hidden lg:block">
            <MagneticButton href="#ai-consultant" className="text-white bg-[#E8272A] px-6 py-2.5 rounded-full text-xs font-medium tracking-widest uppercase hover:bg-[#FF2D30] transition-colors whitespace-nowrap">Diagnóstico Grátis</MagneticButton>
          </div>
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden p-2 text-white ml-auto">{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}</button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed inset-0 z-40 bg-[#050505]/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 lg:hidden">
            <a href="#problem" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-[#FF2D30]">GARGALOS</a>
            <a href="#method" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-[#E8272A]">MÉTODO</a>
            <a href="#mentor" onClick={() => setIsOpen(false)} className="text-2xl font-display font-medium tracking-tighter text-white hover:text-[#E8272A]">ESPECIALISTA</a>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
