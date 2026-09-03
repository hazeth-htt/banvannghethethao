import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ClubItem } from "../data/clubs";

interface ClubCardProps {
  club: ClubItem;
  index: number;
  onClick: () => void;
}

export const ClubCard = ({ club, index, onClick }: ClubCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse position values normalized (-0.5 to 0.5)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to prevent jitter
  const mouseX = useSpring(x, { stiffness: 320, damping: 24 });
  const mouseY = useSpring(y, { stiffness: 320, damping: 24 });

  // 3D rotations based on mouse position
  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-8deg", "8deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const mouseFromLeft = e.clientX - rect.left;
    const mouseFromTop = e.clientY - rect.top;

    x.set(mouseFromLeft / rect.width - 0.5);
    y.set(mouseFromTop / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-36 sm:h-44 md:h-52">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-20px" }}
        transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        onClick={onClick}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        className="group relative w-full h-full flex items-center justify-center p-6 bg-[#0a0514] border border-white/[0.08] hover:border-bvntt-lilac/50 hover:bg-white/[0.02] transition-colors duration-300 cursor-pointer overflow-hidden select-none shadow-lg hover:shadow-[0_12px_32px_rgba(214,185,255,0.1)]"
      >
        {/* Subtle top accent on hover */}
        <div className="absolute top-0 inset-x-0 h-[2px] bg-bvntt-lilac opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Club Name with 3D Depth elevation */}
        <h4
          style={{ transform: isHovered ? "translateZ(24px)" : "translateZ(0px)" }}
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bvntt-cream group-hover:text-bvntt-lilac transition-all duration-300 uppercase tracking-normal text-center"
        >
          {club.name}
        </h4>
      </motion.div>
    </div>
  );
};
