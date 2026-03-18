import React from 'react';

export const Logo = ({ className = "", size = 40 }: any) => {
  const w = size * (460 / 130);
  return (
    <img 
      src="https://res.cloudinary.com/dfjgixxn5/image/upload/v1773797439/logo_tr9te8.svg" 
      alt="IA na Veia Logo" 
      className={className} 
      style={{ display: 'inline-block', verticalAlign: 'middle', height: size, width: w, objectFit: 'contain' }} 
      referrerPolicy="no-referrer"
    />
  );
};
