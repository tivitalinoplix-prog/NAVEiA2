import React, { useRef, useState } from 'react';

export function MagneticButton({ children, className = "", href, target, rel, onClick, disabled }: any) {
  const buttonRef = useRef<any>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: any) => {
    if (!buttonRef.current || disabled) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * 0.3;
    const y = (clientY - (top + height / 2)) * 0.3;
    setPosition({ x, y });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  const commonProps = {
    ref: buttonRef,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: onClick,
    className: `relative inline-flex items-center justify-center transition-transform duration-300 ease-out ${className}`,
    style: { transform: `translate(${position.x}px, ${position.y}px)` }
  };

  if (href) return <a href={href} target={target} rel={rel} {...commonProps}>{children}</a>;
  return <button disabled={disabled} {...commonProps}>{children}</button>;
}
