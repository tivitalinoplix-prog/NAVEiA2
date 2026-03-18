import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export function TiltCard({ children, className = "" }: any) {
  const cardRef = useRef<any>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: any) => {
    if (!cardRef.current) return;
    const { left, top, width, height } = cardRef.current.getBoundingClientRect();
    const x = e.clientX - left, y = e.clientY - top;
    setMousePos({ x, y });
    setRotateX(((y - height / 2) / (height / 2)) * -10);
    setRotateY(((x - width / 2) / (width / 2)) * 10);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotateX(0); setRotateY(0); }}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 30, mass: 0.5 }}
      style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
      className={`relative w-full h-full group ${className}`}
    >
      <div 
        className="absolute inset-0 z-50 pointer-events-none transition-opacity duration-300 rounded-2xl mix-blend-overlay"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255,0.15), transparent 40%)`
        }}
      />
      <div style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }} className="w-full h-full">
        {children}
      </div>
    </motion.div>
  );
}
