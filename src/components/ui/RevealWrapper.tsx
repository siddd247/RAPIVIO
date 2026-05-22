import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

export type RevealVariant =
  | 'fade-up'
  | 'fade-down'
  | 'fade-left'
  | 'fade-right'
  | 'scale-in'
  | 'slide-up-stagger'
  | 'clip-reveal';

interface RevealWrapperProps {
  children: React.ReactNode;
  variant: RevealVariant;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
}

export const RevealWrapper = ({
  children,
  variant,
  delay = 0,
  className,
  style,
}: RevealWrapperProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  // Map variants to initial/animate values
  const getVariants = () => {
    switch (variant) {
      case 'fade-up':
      case 'slide-up-stagger':
        return {
          initial: { opacity: 0, y: 40 },
          animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : 40 },
        };
      case 'fade-down':
        return {
          initial: { opacity: 0, y: -40 },
          animate: { opacity: isInView ? 1 : 0, y: isInView ? 0 : -40 },
        };
      case 'fade-left':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: isInView ? 1 : 0, x: isInView ? 0 : -50 },
        };
      case 'fade-right':
        return {
          initial: { opacity: 0, x: 50 },
          animate: { opacity: isInView ? 1 : 0, x: isInView ? 0 : 50 },
        };
      case 'scale-in':
        return {
          initial: { opacity: 0, scale: 0.92 },
          animate: { opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0.92 },
        };
      case 'clip-reveal':
        return {
          initial: { clipPath: 'inset(100% 0 0 0)' },
          animate: {
            clipPath: isInView ? 'inset(0% 0 0 0)' : 'inset(100% 0 0 0)',
          },
        };
      default:
        return {
          initial: {},
          animate: {},
        };
    }
  };

  const { initial, animate } = getVariants();

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.7,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: delay,
      }}
      className={className}
      style={{
        ...style,
        // Optional performance hint to limit will-change strictly during active rendering/animation
      }}
    >
      {children}
    </motion.div>
  );
};
