import React from 'react';
import { motion } from 'framer-motion';

export function EKGBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden flex items-center opacity-10">
      <motion.div animate={{ x: ["0%", "-50%"] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }} className="flex w-[200%] h-full items-center">
        {[0, 1].map(i => (
          <div key={i} className="w-1/2 h-full flex items-center">
            <svg width="100%" height="300" viewBox="0 0 1000 300" preserveAspectRatio="none">
              <path d="M 0 150 L 800 150 L 820 90 L 840 240 L 860 120 L 880 150 L 1000 150" fill="none" stroke="#E8272A" strokeWidth="3" vectorEffect="non-scaling-stroke" filter="drop-shadow(0 0 8px rgba(232,39,42,0.8))" />
            </svg>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
