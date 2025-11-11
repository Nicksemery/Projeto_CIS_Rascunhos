// src/components/common/Icons.jsx
import React from 'react';

// Componente base para ícones SVG
export const Icon = ({ path, className = "icon", size = 20 }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} style={{ width: size, height: size }}>
    <path strokeLinecap="round" strokeLinejoin="round" d={path} />
  </svg>
);

export const UserIcon = (props) => <Icon path="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" {...props} />;
export const CalendarIcon = (props) => <Icon path="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" {...props} />;
export const CloseIcon = (props) => <Icon path="M6 18L18 6M6 6l12 12" {...props} />;
export const ArrowLeft = (props) => <Icon path="M15 19l-7-7 7-7" {...props} />;
export const ArrowRight = (props) => <Icon path="M9 5l7 7-7 7" {...props} />;
export const MenuIcon = (props) => <Icon path="M4 6h16M4 12h16M4 18h16" {...props} />;