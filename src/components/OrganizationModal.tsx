import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowRight } from "lucide-react";
import { DivisionItem } from "../data/divisions";
import { ClubItem } from "../data/clubs";

interface OrganizationModalProps {
  division: DivisionItem | null;
  club?: ClubItem | null;
  onClose: () => void;
  onRegisterClick?: () => void;
}

export const OrganizationModal = ({ division, club = null, onClose, onRegisterClick }: OrganizationModalProps) => {
  const [activeImg, setActiveImg] = useState(0);
  const isDivision = Boolean(division);
  const data = division || club;
  if (!data) return null;

  const handleRegister = () => {
    onClose();
    onRegisterClick?.();
    document.querySelector("#recruitment")?.scrollIntoView({ behavior: "smooth" });
  };

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
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full md:max-w-2xl max-h-[92vh] overflow-y-auto bg-[#0d091e] border-t md:border border-white/[0.08] text-bvntt-cream no-scrollbar"
        >
          {/* Header */}
          <div className="flex items-start justify-between p-6 sm:p-8 border-b border-white/[0.07]">
            <div className="space-y-1 pr-8">
              <div className="section-label text-bvntt-muted">
                {isDivision ? `Mảng chuyên môn ${division?.order}` : "Câu lạc bộ trực thuộc"}
              </div>
              <h2 className="font-display text-xl sm:text-2xl font-bold tracking-tight">{data.name}</h2>
              <p className="text-sm text-bvntt-lilac font-medium">
                {isDivision ? division?.role : club?.fullName}
              </p>
            </div>
            <button onClick={onClose} className="p-2 border border-bvntt-border text-bvntt-muted hover:text-bvntt-cream transition-colors" aria-label="Close">
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Image */}
          {isDivision && division?.gallery && division.gallery.length > 0 && (
            <>
              <div className="relative aspect-[16/9] overflow-hidden">
                <motion.img
                  key={activeImg}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  src={division.gallery[activeImg]}
                  alt={division.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {division.gallery.length > 1 && (
                <div className="flex gap-px border-b border-white/[0.07] overflow-x-auto no-scrollbar">
                  {division.gallery.map((img, i) => (
                    <button key={i} onClick={() => setActiveImg(i)} className={`flex-shrink-0 w-16 h-11 overflow-hidden transition-opacity ${activeImg === i ? "opacity-100" : "opacity-35 hover:opacity-60"}`}>
                      <img src={img} alt="" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </>
          )}

          {/* Body */}
          <div className="p-6 sm:p-8 space-y-6">
            <p className="text-sm text-bvntt-muted leading-relaxed font-light">{data.description}</p>

            {isDivision && division?.tasks && (
              <div className="space-y-3 pt-4 border-t border-white/[0.06]">
                <div className="section-label mb-4">Công việc cụ thể</div>
                {division.tasks.map((t, i) => (
                  <div key={i} className="flex items-start gap-3 py-3 border-b border-white/[0.04] text-sm text-bvntt-muted last:border-0">
                    <span className="font-display text-xs font-bold text-bvntt-lilac/80 leading-none mt-1 w-5 flex-shrink-0">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <div className="font-medium text-bvntt-cream mb-0.5">{t.title}</div>
                      <div className="font-light leading-relaxed">{t.detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {isDivision && division?.skills && (
              <div className="pt-4 border-t border-white/[0.06]">
                <div className="section-label mb-3">Kỹ năng phát triển</div>
                <div className="flex flex-wrap gap-2">
                  {division.skills.map((s, i) => (
                    <span key={i} className="text-[11px] font-medium tracking-wide text-bvntt-muted border border-white/[0.08] px-3 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {!isDivision && club?.highlights && (
              <div className="space-y-2 pt-4 border-t border-white/[0.06]">
                <div className="section-label mb-3">Hoạt động nổi bật</div>
                {club.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-sm text-bvntt-muted py-2 border-b border-white/[0.04] last:border-0">
                    <div className="w-1 h-1 rounded-full bg-bvntt-purple mt-2 flex-shrink-0" />
                    {h}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-white/[0.07] p-6 sm:p-8 flex items-center justify-between">
            <span className="text-[11px] text-bvntt-muted">Tuyển thành viên 2026 đang diễn ra</span>
            <button
              onClick={handleRegister}
              className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-5 py-2.5 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300"
            >
              <span>Tuyển thành viên 2026</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
