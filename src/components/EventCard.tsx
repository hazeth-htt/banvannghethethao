import { useState } from "react";
import { motion } from "framer-motion";
import { EventItem } from "../data/events";

interface EventCardProps {
  event: EventItem;
  index: number;
  onSelect: (event: EventItem) => void;
}

export const EventCard = ({ event, index, onSelect }: EventCardProps) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onSelect(event)}
      className="group relative flex-shrink-0 w-[78vw] max-w-[300px] sm:w-[320px] sm:max-w-none md:w-[360px] snap-center cursor-pointer overflow-hidden bg-[#0a0514] border border-white/[0.06] hover:border-bvntt-lilac/40 transition-all duration-300 flex flex-col select-none"
    >
      {/* ── Image block: Pure cover image without number tag ── */}
      <div className="relative w-full h-[260px] sm:h-[290px] md:h-[320px] flex-shrink-0 overflow-hidden bg-[#07040d]">
        <motion.img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          loading="lazy"
        />
        {/* Subtle overlay */}
        <motion.div
          className="absolute inset-0 bg-black"
          animate={{ opacity: hovered ? 0.15 : 0.05 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* ── Minimalist Text block: Only Category & Title ── */}
      <div className="p-4 sm:p-5 flex flex-col justify-center border-t border-white/[0.07] bg-[#0a0514] space-y-1 sm:space-y-1.5">
        <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-bvntt-lilac/80">
          {event.category}
        </div>

        <motion.h3
          className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-bvntt-cream group-hover:text-bvntt-lilac transition-colors leading-tight tracking-normal line-clamp-2"
          animate={{ y: hovered ? -2 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {event.title}
        </motion.h3>
      </div>
    </motion.article>
  );
};
