
import React from 'react';

interface SectionProps {
  id: string;
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
  fullWidth?: boolean;
}

export const Section: React.FC<SectionProps> = ({ id, title, subtitle, children, className = '', fullWidth = false }) => {
  return (
    <section id={id} className={`py-20 px-6 sm:px-12 ${className}`}>
      <div className={fullWidth ? 'w-full' : 'max-w-7xl mx-auto'}>
        {(title || subtitle) && (
          <div className="mb-12 text-center">
            {title && <h2 className="text-3xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white">{title}</h2>}
            {subtitle && <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </section>
  );
};
