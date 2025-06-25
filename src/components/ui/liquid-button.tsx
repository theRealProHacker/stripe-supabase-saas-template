'use client';

import React, { forwardRef } from 'react';
import LiquidGlass from 'liquid-glass-react';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface LiquidButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: LucideIcon;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'accent' | 'muted';
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16',
};

const iconSizes = {
  sm: 16,
  md: 20,
  lg: 24,
};

export const LiquidButton = forwardRef<HTMLButtonElement, LiquidButtonProps>(
  ({ icon: Icon, size = 'md', variant = 'default', className, children, ...props }, ref) => {
    return (
      <LiquidGlass
        displacementScale={64}
        blurAmount={0.1}
        saturation={130}
        aberrationIntensity={2}
        elasticity={0.35}
        cornerRadius={100}
        className={cn(
          'liquid-button',
          sizeClasses[size],
          'flex items-center justify-center',
          'hover:scale-105 active:scale-95',
          'transition-all duration-200',
          className
        )}
        onClick={props.onClick}
      >
        <button
          ref={ref}
          className={cn(
            'w-full h-full rounded-full',
            'flex items-center justify-center',
            'text-foreground hover:text-emphasis',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
            'transition-colors duration-200'
          )}
          {...props}
        >
          {Icon && <Icon size={iconSizes[size]} />}
          {children}
        </button>
      </LiquidGlass>
    );
  }
);

LiquidButton.displayName = 'LiquidButton';