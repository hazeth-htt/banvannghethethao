import { motion } from "framer-motion";
import { EventItem } from "../data/events";

interface EventCardProps {
  event: EventItem;
  index: number;
  onSelect: (event: EventItem) => void;
}

export const EventCard = ({ event, index, onSelect }: EventCardProps) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => onSelect(event)}
      className="group relative flex-shrink-0 w-[78vw] max-w-[300px] sm:w-[320px] sm:max-w-none md:w-[360px] snap-center cursor-pointer overflow-hidden bg-[#0a0514] border border-white/[0.06] hover:border-bvntt-lilac/40 transition-colors duration-300 flex flex-col select-none"
    >
      {/* ── Image block: Pure cover image without number tag ── */}
      <div className="relative w-full h-[260px] sm:h-[290px] md:h-[320px] flex-shrink-0 overflow-hidden bg-[#07040d]">
        <img
          src={event.coverImage}
          alt={event.title}
          draggable={false}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 pointer-events-none select-none"
        />
        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-black opacity-5 group-hover:opacity-20 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* ── Minimalist Text block: Only Category & Title ── */}
      <div className="p-4 sm:p-5 flex flex-col justify-center border-t border-white/[0.07] bg-[#0a0514] space-y-1 sm:space-y-1.5">
        <div className="text-[10px] sm:text-[11px] font-semibold tracking-[0.16em] uppercase text-bvntt-lilac/80">
          {event.category}
        </div>

        <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-bvntt-cream group-hover:text-bvntt-lilac transition-colors leading-tight tracking-normal line-clamp-2">
          {event.title}
        </h3>
      </div>
    </motion.article>
  );
};
