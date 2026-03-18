import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TiltCard } from './TiltCard';
import { ScrambleText } from './ScrambleText';

export function DiagnosticGrid() {
  const [cells, setCells] = useState(Array(25).fill('idle'));
  const [scrambleTrigger, setScrambleTrigger] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCells(prev => {
        const next = [...prev];
        const idleIndices = next.map((c, i) => c === 'idle' ? i : -1).filter(i => i !== -1);
        if (idleIndices.length === 0) return Array(25).fill('idle');
        const numToPick = Math.min(idleIndices.length, Math.floor(Math.random() * 2) + 1);
        for(let i=0; i<numToPick; i++) {
            const pick = idleIndices.splice(Math.floor(Math.random() * idleIndices.length), 1)[0];
            next[pick] = 'error';
            setTimeout(() => setCells(curr => { const up = [...curr]; if (up[pick] === 'error') up[pick] = 'optimized'; return up; }), 300 + Math.random() * 400);
        }
        return next;
      });
    }, 500);
    return () => clearInterval(interval);
  }, []);
  return (
    <TiltCard>
      <div className="flex flex-col border border-white/10 bg-[#111111] p-6 rounded-2xl group-hover:border-[#E8272A] transition-colors duration-300">
        <div className="grid grid-cols-5 gap-2 mb-6 cursor-pointer">
          {cells.map((s, i) => (
            <motion.div key={i} onClick={() => { setScrambleTrigger(p => p + 1); setCells(p => { const n = [...p]; n[i] = 'error'; setTimeout(() => setCells(c => { const u = [...c]; if (u[i] === 'error') u[i] = 'optimized'; return u; }), 500); return n; }); }} whileHover={{ scale: 1.2, zIndex: 10 }} animate={{ y: s === 'idle' ? [0, Math.random() * -2 - 1, 0] : 0 }} transition={{ duration: 2 + Math.random() * 2, repeat: Infinity, ease: "easeInOut" }} className={`w-full aspect-square rounded-sm transition-all duration-300 ${s === 'idle' ? 'bg-white/10 hover:bg-white/20' : s === 'error' ? 'bg-[#E8272A]/20 border border-[#E8272A] shadow-[0_0_10px_rgba(220,38,38,0.5)] scale-95' : 'bg-white/20 scale-100'}`} />
          ))}
        </div>
        <div className="flex flex-col gap-2 text-xs tracking-wider uppercase font-bold text-white">
          <div className="flex justify-between gap-6"><span>INTERACTIVE_SCAN:</span><span className="animate-pulse">READY</span></div>
          <div className="flex justify-between gap-6"><span>THROUGHPUT:</span><span className="text-[#E8272A]"><ScrambleText text="MAXIMIZED" trigger={scrambleTrigger} /></span></div>
        </div>
      </div>
    </TiltCard>
  );
}
