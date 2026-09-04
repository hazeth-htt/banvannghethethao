import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { DivisionItem } from "../data/divisions";

interface OrganizationNodeProps {
  division: DivisionItem;
  index: number;
  onSelect: (d: DivisionItem) => void;
}

/**
 * Organization node attached to the vertical timeline.
 * root.md: "Each organization should appear as a node/card attached to the timeline."
 * root.md: Alternating left/right on desktop.
 * timeline line is handled by parent (OrganizationTimeline).
 */
export const OrganizationNode = ({ division, index, onSelect }: OrganizationNodeProps) => {
  const isEven = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.75, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="relative py-12 md:py-16"
    >
      {/* Timeline node dot - left on mobile, center on desktop */}
      <div
        className={`absolute top-[3.5rem] w-2.5 h-2.5 rounded-full bg-bvntt-bg border border-white/30 z-10
          left-4 md:left-1/2 md:-translate-x-[5px]`}
      />

      {/* Content grid: full-width on mobile, alternating on desktop */}
      <div className={`
        ml-10 md:ml-0
        grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16
        items-start
      `}>
        {/* ─ Text block ─ */}
        <div className={`flex flex-col space-y-4 ${isEven ? "md:order-1" : "md:order-2"}`}>
          {/* Header: Number on left, Title + Role stacked on right so subtitle aligns with title */}
          <div className="flex items-start gap-3 md:gap-4">
            <span className="font-display text-3xl sm:text-4xl md:text-5xl text-white/30 select-none leading-tight flex-shrink-0">
              {division.order}
            </span>
            <div className="space-y-1.5 min-w-0">
              <h3 className="font-display text-3xl sm:text-4xl md:text-5xl text-bvntt-cream leading-tight uppercase">
                {division.name}
              </h3>
              {/* Role - single purple accent */}
              <p className="text-xs font-semibold text-bvntt-lilac tracking-wide uppercase">
                {division.role}
              </p>
            </div>
          </div>

          {/* Unified Information Block: cleanly aligned, justified on both sides into one solid block */}
          <div className="bg-[#0c0718]/60 border border-white/[0.08] p-5 sm:p-6 space-y-4 backdrop-blur-sm shadow-lg">
            {/* Short description */}
            <p className="text-sm text-bvntt-cream/90 leading-relaxed font-normal text-justify pb-3.5 border-b border-white/[0.06]">
              {division.shortDesc}
            </p>

            {/* Tasks list */}
            <div className="space-y-3 divide-y divide-white/[0.05]">
              {division.tasks.slice(0, 3).map((t, i) => (
                <div key={i} className={`flex items-start gap-3.5 text-sm ${i > 0 ? "pt-3" : ""}`}>
                  <span className="font-display text-xs sm:text-sm font-bold text-bvntt-lilac/80 flex-shrink-0 w-5 tabular-nums pt-0.5 select-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="text-sm leading-relaxed text-bvntt-muted text-justify flex-1">
                    <strong className="text-bvntt-cream font-medium">{t.title}. </strong>
                    <span>{t.detail}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* CTA - aligned to the right */}
          <div className="flex justify-end pt-2">
            <button
              onClick={() => onSelect(division)}
              className="group flex items-center gap-2 text-[11px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted hover:text-bvntt-lilac border border-white/[0.08] hover:border-bvntt-lilac/50 bg-white/[0.02] hover:bg-bvntt-lilac/5 px-4 py-2.5 transition-all duration-300"
            >
              Xem chi tiết
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>

        {/* ─ Image block ─ */}
        {division.image && (
          <div className={isEven ? "md:order-2" : "md:order-1"}>
            <motion.div
              initial={{ opacity: 0, scale: 1.05 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.9, delay: 0.1 + index * 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="relative overflow-hidden aspect-[4/3]"
            >
              <img
                src={division.image}
                alt={division.name}
                className="w-full h-full object-cover hover:scale-[1.03] transition-transform duration-700"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};
