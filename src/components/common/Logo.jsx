import React from 'react';

/**
 * Tarah Logo Component
 * Uses the official tarah_logo.svg asset
 */
export default function Logo({ className = "h-8", variant = "white" }) {
  const logoSrc = variant === "dark" ? "/tarah_logo_dark.svg" : "/tarah_logo.svg";

  return (
    <div className={`flex items-center select-none ${className}`}>
      <img
        src={logoSrc}
        alt="Tarah"
        className="h-full w-auto max-h-10 object-contain"
      />
    </div>
  );
}
