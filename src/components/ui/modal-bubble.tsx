'use client';

import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidGlass from 'liquid-glass-react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

interface ModalBubbleProps {
  isOpen: boolean;
  onClose: () => void;
  triggerPosition: { x: number; y: number };
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const ModalBubble: React.FC<ModalBubbleProps> = ({
  isOpen,
  onClose,
  triggerPosition,
  children,
  title,
  className,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  // Calculate modal position based on trigger position
  const getModalPosition = () => {
    const { x, y } = triggerPosition;
    const isLeft = x < window.innerWidth / 2;
    const isTop = y < window.innerHeight / 2;

    return {
      left: isLeft ? x + 20 : x - 320,
      top: isTop ? y + 20 : y - 200,
      transformOrigin: isLeft 
        ? (isTop ? 'top left' : 'bottom left')
        : (isTop ? 'top right' : 'bottom right'),
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          />
          
          {/* Modal */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            style={getModalPosition()}
            className="fixed z-50"
          >
            <LiquidGlass
              displacementScale={40}
              blurAmount={0.15}
              saturation={120}
              aberrationIntensity={1}
              elasticity={0.2}
              cornerRadius={16}
              className={cn(
                'w-80 max-h-96 overflow-hidden',
                'border border-border/30',
                className
              )}
            >
              <div className="p-6 space-y-4">
                {/* Header */}
                {title && (
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-foreground">
                      {title}
                    </h3>
                    <button
                      onClick={onClose}
                      className="p-1 rounded-full hover:bg-muted transition-colors"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}
                
                {/* Content */}
                <div className="text-sm text-muted-foreground">
                  {children}
                </div>
              </div>
            </LiquidGlass>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};