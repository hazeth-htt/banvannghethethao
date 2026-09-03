import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export const MouseGradient = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Track cursor viewport coordinates
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  // Smooth physical spring for gentle, floating lag
  const springX = useSpring(mouseX, { stiffness: 140, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 140, damping: 30 });

  useEffect(() => {
    // Only activate on pointer-fine devices (desktop mouse/trackpad)
    if (window.matchMedia("(pointer: fine)").matches) {
      const handleMouseMove = (e: MouseEvent) => {
        if (!isVisible) setIsVisible(true);
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      };

      const handleMouseLeave = () => {
        setIsVisible(false);
      };

      window.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [isVisible, mouseX, mouseY]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-opacity duration-1000">
      {/* Outer ambient soft purple glow */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[560px] h-[560px] rounded-full bg-gradient-to-br from-bvntt-lilac/[0.08] via-purple-600/[0.04] to-transparent blur-[110px]"
      />

      {/* Inner subtle core tint */}
      <motion.div
        style={{
          x: springX,
          y: springY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[300px] h-[300px] rounded-full bg-bvntt-purple/[0.06] blur-[70px]"
      />
    </div>
  );
};
