import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRegisterNow: () => void;
  onLearnMore: () => void;
}

export const WelcomeModal = ({
  isOpen,
  onClose,
  onRegisterNow,
  onLearnMore,
}: WelcomeModalProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 select-none">
        {/* Backdrop: Clearer, not heavily blurred */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/55 backdrop-blur-[2px]"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-lg bg-[#0c0618]/95 border border-white/[0.14] p-7 sm:p-9 text-center shadow-[0_24px_70px_rgba(0,0,0,0.9)] overflow-hidden"
        >
          {/* Ambient Purple Glow */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-bvntt-purple/25 blur-[90px] pointer-events-none" />

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 border border-white/10 text-bvntt-muted hover:text-bvntt-cream hover:border-bvntt-lilac/40 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Logo */}
          <div className="flex justify-center mb-5">
            <img
              src="/Logo Ban@4x.png"
              alt="Logo Ban Văn nghệ Thể thao"
              className="w-11 h-15 object-contain drop-shadow-[0_0_18px_rgba(214,185,255,0.45)]"
            />
          </div>

          {/* Title: Inter bold for top line, League Gothic for BAN VĂN NGHỆ THỂ THAO? */}
          <div className="mb-7 sm:mb-8">
            <h3 className="uppercase tracking-normal text-center flex flex-col items-center">
              <span className="block font-sans font-bold text-xs sm:text-sm tracking-[0.14em] text-bvntt-cream/80 mb-2 sm:mb-2.5">
                BẠN MUỐN TRỞ THÀNH THÀNH VIÊN CỦA
              </span>
              <span className="block font-display font-black text-3xl sm:text-4xl md:text-5xl text-bvntt-lilac drop-shadow-[0_0_25px_rgba(214,185,255,0.4)] leading-[1.1]">
                BAN VĂN NGHỆ THỂ THAO?
              </span>
            </h3>
          </div>

          {/* Two Buttons: Tìm hiểu thêm & Đăng ký ngay */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onLearnMore}
              className="w-full sm:w-1/2 py-3 px-5 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-cream border border-white/20 hover:border-white/50 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-200 cursor-pointer text-center"
            >
              Tìm hiểu thêm
            </button>
            <button
              onClick={onRegisterNow}
              className="w-full sm:w-1/2 py-3 px-5 text-xs font-semibold tracking-[0.1em] uppercase text-black bg-bvntt-lilac hover:bg-white border border-bvntt-lilac hover:border-white shadow-[0_0_20px_rgba(214,185,255,0.35)] transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 font-bold"
            >
              <span>Đăng ký ngay</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
