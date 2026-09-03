import { motion } from "framer-motion";
import { ClubItem } from "../data/clubs";

interface ClubCardProps {
  club: ClubItem;
  index: number;
  onClick: () => void;
}

export const ClubCard = ({ club, index, onClick }: ClubCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-20px" }}
      transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onClick={onClick}
      className="group relative h-36 sm:h-44 md:h-52 flex items-center justify-center p-6 bg-[#0a0514] border border-white/[0.08] hover:border-bvntt-lilac/40 hover:bg-white/[0.02] transition-all duration-300 cursor-pointer overflow-hidden select-none"
    >
      {/* Subtle top accent on hover */}
      <div className="absolute top-0 inset-x-0 h-[2px] bg-bvntt-lilac opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Club Name ONLY */}
      <h4 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-bvntt-cream group-hover:text-bvntt-lilac transition-colors duration-300 uppercase tracking-normal text-center">
        {club.name}
      </h4>
    </motion.div>
  );
};
