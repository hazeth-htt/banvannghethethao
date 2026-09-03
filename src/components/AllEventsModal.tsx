import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight, Calendar, Tag } from "lucide-react";
import { EVENTS_DATA, EventItem } from "../data/events";

interface AllEventsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEvent: (event: EventItem) => void;
  onViewDetail?: (slug: string) => void;
}

export const AllEventsModal = ({ isOpen, onClose, onSelectEvent, onViewDetail }: AllEventsModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-6xl max-h-[90vh] flex flex-col bg-[#0b0616] border border-white/[0.08] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6 border-b border-white/[0.08] bg-[#0d071a]">
            <div>
              <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-bvntt-cream uppercase tracking-normal">
                TẤT CẢ <span className="text-bvntt-lilac">SỰ KIỆN</span>
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2.5 border border-white/10 text-bvntt-muted hover:text-bvntt-cream hover:border-bvntt-lilac transition-colors"
              aria-label="Đóng"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body: Grid of all events */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 md:p-10 no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {EVENTS_DATA.map((ev, i) => (
                <div
                  key={ev.id}
                  onClick={() => {
                    onClose();
                    if (onViewDetail) {
                      onViewDetail(ev.slug || ev.id);
                    } else {
                      onSelectEvent(ev);
                    }
                  }}
                  className="group bg-[#07040d] border border-white/[0.07] hover:border-bvntt-lilac/40 transition-all duration-300 cursor-pointer flex flex-col overflow-hidden"
                >
                  {/* Image */}
                  <div className="relative w-full h-48 overflow-hidden bg-black/40">
                    <img
                      src={ev.coverImage}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 font-display text-[10px] font-bold tracking-[0.16em] text-white/70 bg-black/50 px-2 py-0.5 border border-white/10 backdrop-blur-sm">
                      0{i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center gap-1.5 text-[10px] font-semibold tracking-[0.14em] uppercase text-bvntt-muted">
                        <Tag className="w-3 h-3 text-bvntt-lilac" />
                        <span>{ev.category}</span>
                      </div>

                      <h3 className="font-display font-bold text-2xl sm:text-3xl text-bvntt-cream group-hover:text-bvntt-lilac transition-colors leading-tight">
                        {ev.title}
                      </h3>

                      <p className="text-xs text-bvntt-muted font-normal line-clamp-2 leading-relaxed">
                        {ev.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[11px] text-white/40">
                        <Calendar className="w-3 h-3" />
                        <span>{ev.timeframe}</span>
                      </div>

                      <span className="inline-flex items-center gap-1 text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-muted group-hover:text-bvntt-lilac transition-colors">
                        Xem chi tiết <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 sm:px-8 border-t border-white/[0.08] bg-[#0d071a] flex items-center justify-between text-xs text-bvntt-muted">
            <span>Tổng cộng {EVENTS_DATA.length} sự kiện lớn thường niên</span>
            <button
              onClick={onClose}
              className="px-4 py-2 border border-white/10 hover:border-white/25 text-bvntt-cream text-xs font-semibold tracking-wide uppercase transition-colors"
            >
              Đóng
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
