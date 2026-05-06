import React from 'react';

export default function Logo({ className = "" }: { className?: string }) {
  return (
    <img
      src="/logo.png"
      alt="Chakraborty Enterprise Logo"
      className={className}
      style={{ objectFit: 'contain' }}
      draggable={false}
    />
  );
}
