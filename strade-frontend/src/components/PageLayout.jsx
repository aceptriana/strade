import React from 'react';
import { ArrowLeft } from 'lucide-react';

/**
 * Provides a consistent padded layout for feature pages with optional back button and header actions.
 */
export default function PageLayout({
  title,
  subtitle,
  onBack,
  actions,
  headerContent,
  children,
  maxWidth = 'max-w-7xl',
  contentClassName = '',
  centerHeader = false
}) {
  return (
    <div className="min-h-screen">
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 md:px-8 py-6`}>
        {(title || onBack || actions || headerContent) && (
          <div className="mb-6 sm:mb-8 md:mb-10">
            <div className={`flex items-center gap-5 ${centerHeader ? 'justify-center' : ''}`}>
              {onBack && (
                <button
                  onClick={onBack}
                  className="flex h-10 w-10 md:h-12 md:w-12 flex-shrink-0 items-center justify-center rounded-xl md:rounded-2xl border border-white/10 bg-white/5 text-white transition-colors hover:bg-white/10"
                  aria-label="Kembali"
                >
                  <ArrowLeft className="h-4 w-4 md:h-5 md:w-5" />
                </button>
              )}
              <div className={`min-w-0 flex-1 ${centerHeader ? 'text-center' : ''}`}>
                {title && (
                  <h1 className="truncate text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold text-white">{title}</h1>
                )}
                {subtitle && (
                  <p className="mt-2 md:mt-3 text-sm md:text-base lg:text-lg text-white/60">{subtitle}</p>
                )}
              </div>
              {actions && (
                <div className="flex flex-shrink-0 items-center gap-4">{actions}</div>
              )}
            </div>
            {headerContent && (
              <div className="mt-6">{headerContent}</div>
            )}
          </div>
        )}
        <div className={contentClassName}>{children}</div>
      </div>
    </div>
  );
}
