import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordsPullUpProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delay?: number;
}

export const WordsPullUp = ({
  text,
  className = "",
  wordClassName = "",
  delay = 0,
}: WordsPullUpProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const words = text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    hidden: {
      opacity: 0,
      y: 24,
      transition: {
        type: "spring",
        damping: 18,
        stiffness: 120,
      },
    },
  };

  return (
    <motion.span
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`inline-flex flex-wrap ${className}`}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          variants={child}
          className={`inline-block mr-[0.25em] last:mr-0 ${wordClassName}`}
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  );
};
