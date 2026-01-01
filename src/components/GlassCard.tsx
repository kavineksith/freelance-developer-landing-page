
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = true }) => {
  return (
    <div className={`
      glass
      bg-white/40 dark:bg-slate-900/40 
      border border-white/20 dark:border-slate-800/50 
      rounded-3xl shadow-xl 
      backdrop-blur-xl
      transition-all duration-300
      ${hoverEffect ? 'hover:scale-[1.02] hover:shadow-2xl hover:bg-white/50 dark:hover:bg-slate-900/50' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};
