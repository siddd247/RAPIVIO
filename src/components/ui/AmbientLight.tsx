"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export const AmbientLight = ({
  opacity = 1,
  color = "rgb(223, 172, 232)",
}: {
  opacity?: number;
  color?: string;
}) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 2,
        overflow: "visible",
      }}
    >
      {/* Blurred glow layer — expands from center */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: opacity } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{
          position: "absolute",
          top: 0,
          left: "5%",
          right: "5%",
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${color} 25%, ${color} 75%, transparent 100%)`,
          transformOrigin: "center",
          filter: "blur(5px)",
          zIndex: 1,
        }}
      />
      {/* Sharp hairline — expands slightly after */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={inView ? { scaleX: 1, opacity: opacity * 0.55 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
        style={{
          position: "absolute",
          top: 0,
          left: "12%",
          right: "12%",
          height: "1px",
          background: `linear-gradient(90deg, transparent 0%, ${color} 35%, ${color} 65%, transparent 100%)`,
          transformOrigin: "center",
          zIndex: 2,
        }}
      />
      {/* Center bright dot */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={inView ? { opacity: opacity * 0.8, scale: 1 } : { opacity: 0, scale: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        style={{
          position: "absolute",
          top: "-2px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "4px",
          height: "4px",
          borderRadius: "50%",
          background: color,
          filter: "blur(2px)",
          zIndex: 3,
        }}
      />
    </div>
  );
};
