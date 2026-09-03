import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Facebook, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "../data/config";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal = ({ isOpen, onClose }: ContactModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center p-0 md:p-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full md:max-w-md bg-[#0d091e] border-t md:border border-white/[0.08] text-bvntt-cream"
        >
          <div className="flex items-center justify-between p-6 border-b border-white/[0.07]">
            <div>
              <div className="section-label mb-1">Liên hệ trực tiếp</div>
              <h3 className="font-display text-lg font-bold">Ban Văn nghệ Thể thao</h3>
            </div>
            <button onClick={onClose} className="p-2 border border-bvntt-border text-bvntt-muted hover:text-bvntt-cream">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="divide-y divide-white/[0.06]">
            <a href={SITE_CONFIG.facebookUrl} target="_blank" rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 hover:bg-white/[0.02] transition-colors group"
            >
              <Facebook className="w-4 h-4 text-bvntt-muted group-hover:text-bvntt-lilac transition-colors" />
              <div>
                <div className="text-xs font-semibold text-bvntt-cream">Facebook Fanpage</div>
                <div className="text-[11px] text-bvntt-muted">Nhắn tin trực tiếp</div>
              </div>
              <ArrowUpRight className="w-3.5 h-3.5 text-bvntt-muted ml-auto group-hover:text-bvntt-lilac" />
            </a>

            <a href={`mailto:${SITE_CONFIG.email}`}
              className="flex items-center gap-4 p-5 hover:bg-white/[0.02] transition-colors group"
            >
              <Mail className="w-4 h-4 text-bvntt-muted group-hover:text-bvntt-cream transition-colors" />
              <div>
                <div className="text-xs font-semibold text-bvntt-cream">Email</div>
                <div className="text-[11px] text-bvntt-muted">{SITE_CONFIG.email}</div>
              </div>
            </a>

            <div className="flex items-start gap-4 p-5">
              <MapPin className="w-4 h-4 text-bvntt-muted mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs font-semibold text-bvntt-cream">Văn phòng</div>
                <div className="text-[11px] text-bvntt-muted leading-relaxed">{SITE_CONFIG.address}</div>
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-white/[0.07]">
            <a
              href={SITE_CONFIG.facebookUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300"
            >
              Đến Fanpage Facebook <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
