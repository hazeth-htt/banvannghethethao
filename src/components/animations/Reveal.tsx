import { ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  width?: "fit-content" | "100%";
}

export const Reveal = ({
  children,
  delay = 0,
  duration = 0.6,
  className = "",
  width = "100%",
}: RevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} style={{ width }} className={`relative overflow-hidden ${className}`}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 40, scale: 0.98 },
          visible: { opacity: 1, y: 0, scale: 1 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{
          duration,
          delay,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};
