import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
      className="group relative flex-shrink-0 w-[280px] sm:w-[340px] md:w-[380px] h-[520px] cursor-pointer overflow-hidden bg-[#0a0514] border border-white/[0.06] hover:border-white/[0.16] transition-colors duration-300 flex flex-col"
    >
      {/* ── Image block: Fixed uniform height for perfect alignment ── */}
      <div className="relative w-full h-[320px] flex-shrink-0 overflow-hidden bg-[#07040d]">
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
          animate={{ opacity: hovered ? 0.18 : 0.06 }}
          transition={{ duration: 0.5 }}
        />

        {/* Index number */}
        <div className="absolute top-4 left-5 font-display text-[10px] font-semibold tracking-[0.2em] text-white/70 bg-black/40 px-2.5 py-1 backdrop-blur-sm border border-white/10">
          0{index + 1}
        </div>
      </div>

      {/* ── Text block: Fixed flex-1, perfectly aligned across all cards ── */}
      <div className="flex-1 p-5 md:p-6 flex flex-col justify-between border-t border-white/[0.07] bg-[#0a0514]">
        <div className="space-y-2">
          {/* Category */}
          <div className="text-[10px] font-semibold tracking-[0.16em] uppercase text-bvntt-muted">
            {event.category}
          </div>

          {/* Title */}
          <motion.h3
            className="font-display text-2xl sm:text-3xl font-bold text-bvntt-cream leading-tight tracking-normal line-clamp-2"
            animate={{ y: hovered ? -2 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {event.title}
          </motion.h3>

          {/* Time */}
          <div className="text-xs text-bvntt-muted font-normal">
            {event.timeframe}
          </div>
        </div>

        {/* View CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
          <span className="text-[11px] font-semibold tracking-[0.14em] uppercase text-bvntt-muted group-hover:text-bvntt-lilac transition-colors duration-300">
            Xem sự kiện
          </span>
          <motion.div
            animate={{ x: hovered ? 3 : 0, y: hovered ? -3 : 0 }}
            transition={{ duration: 0.25 }}
          >
            <ArrowUpRight className="w-3.5 h-3.5 text-bvntt-muted group-hover:text-bvntt-lilac transition-colors duration-300" />
          </motion.div>
        </div>
      </div>
    </motion.article>
  );
};
