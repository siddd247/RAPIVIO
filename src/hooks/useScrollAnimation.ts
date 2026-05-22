import { useRef } from 'react';
import { useInView, useScroll, useTransform, MotionValue } from 'framer-motion';

export function useScrollAnimation() {
  const ref = useRef<any>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return { ref, isInView };
}

export function useParallax(strength: number = 40): { ref: React.RefObject<any>; y: MotionValue<number> } {
  const ref = useRef<any>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  return { ref, y };
}
