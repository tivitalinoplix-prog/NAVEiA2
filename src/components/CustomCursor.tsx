import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const update = (e: MouseEvent) => setMousePosition({ x: e.clientX, y: e.clientY });
    const hover = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      setIsHovering(t.tagName === 'A' || t.tagName === 'BUTTON' || !!t.closest('a') || !!t.closest('button'));
    };
    window.addEventListener('mousemove', update);
    window.addEventListener('mouseover', hover);
    return () => { window.removeEventListener('mousemove', update); window.removeEventListener('mouseover', hover); };
  }, []);

  return (
    <div className="hidden lg:block pointer-events-none z-[100]">
      <motion.div className="fixed top-0 left-0 w-3 h-3 bg-[#E8272A] rounded-full mix-blend-screen" animate={{ x: mousePosition.x - 6, y: mousePosition.y - 6, scale: isHovering ? 0 : 1, opacity: isHovering ? 0 : 1 }} transition={{ type: 'spring', stiffness: 1000, damping: 40, mass: 0.1 }} />
      <motion.div className="fixed top-0 left-0 w-8 h-8 border border-[#E8272A]/50 rounded-full mix-blend-screen flex items-center justify-center backdrop-blur-[1px]" animate={{ x: mousePosition.x - 16, y: mousePosition.y - 16, scale: isHovering ? 2.5 : 1, backgroundColor: isHovering ? 'rgba(232, 39, 42, 0.15)' : 'transparent', borderColor: isHovering ? 'rgba(232, 39, 42, 0.8)' : 'rgba(232, 39, 42, 0.5)' }} transition={{ type: 'spring', stiffness: 400, damping: 25, mass: 0.5 }} />
    </div>
  );
}
