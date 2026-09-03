import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { EventItem } from "../data/events";

interface EventModalProps {
  event: EventItem | null;
  onClose: () => void;
  onViewDetail?: (slug: string) => void;
}

export const EventModal = ({ event, onClose, onViewDetail }: EventModalProps) => {
  const [activeImg, setActiveImg] = useState(0);

  if (!event) return null;

  const handleViewDetail = () => {
    const slug = event.slug || event.id;
    onClose();
    onViewDetail?.(slug);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal — editorial panel */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full md:max-w-3xl max-h-[92vh] overflow-y-auto bg-[#0d091e] border-t md:border border-white/[0.08] text-bvntt-cream no-scrollbar"
        >
          {/* Header strip */}
          <div className="flex items-start justify-between p-6 sm:p-8 border-b border-white/[0.07]">
            <div className="space-y-1 pr-8">
              <div className="section-label text-bvntt-muted">{event.category} — {event.timeframe}</div>
              <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-bvntt-cream">
                {event.title}
              </h2>
              <p className="text-sm text-bvntt-muted font-light">{event.subtitle}</p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 p-2 border border-bvntt-border text-bvntt-muted hover:text-bvntt-cream hover:border-bvntt-border-md transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Main image */}
          <div className="relative aspect-[16/9] overflow-hidden">
            <motion.img
              key={activeImg}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              src={event.gallery[activeImg] || event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Thumbnail strip */}
          {event.gallery.length > 1 && (
            <div className="flex gap-px border-b border-white/[0.07] overflow-x-auto no-scrollbar">
              {event.gallery.slice(0, 6).map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`relative flex-shrink-0 w-20 h-14 overflow-hidden transition-all duration-200 ${
                    activeImg === i ? "opacity-100" : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  {activeImg === i && (
                    <div className="absolute bottom-0 inset-x-0 h-0.5 bg-bvntt-lilac" />
                  )}
                </button>
              ))}
            </div>
          )}

          {/* Stats row */}
          {event.stats && (
            <div className="grid grid-cols-3 divide-x divide-white/[0.07] border-b border-white/[0.07]">
              {event.stats.map((s, i) => (
                <div key={i} className="py-4 px-5 text-center">
                  <div className="font-display text-lg font-bold text-bvntt-cream">{s.value}</div>
                  <div className="text-[10px] tracking-[0.12em] uppercase text-bvntt-muted mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          )}

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-sm text-bvntt-muted leading-relaxed font-light whitespace-pre-line">{event.description}</p>

            {event.highlights && event.highlights.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-white/[0.07]">
                <div className="section-label mb-3">Điểm nhấn</div>
                {event.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-bvntt-muted">
                    <div className="w-1.5 h-1.5 rounded-full bg-bvntt-purple mt-1.5 flex-shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.07] p-6 sm:p-8 flex items-center justify-end">
            <button
              onClick={handleViewDetail}
              className="inline-flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-5 py-2.5 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300"
            >
              <span>Xem chi tiết</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
