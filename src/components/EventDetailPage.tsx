import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Sparkles, X, ChevronRight } from "lucide-react";
import { EVENTS_DATA } from "../data/events";
import { Footer } from "./Footer";
import { FadeUp } from "./animations/FadeUp";

interface EventDetailPageProps {
  slug: string;
  onBack: () => void;
  onNavigateToSlug: (slug: string) => void;
}

export const EventDetailPage = ({ slug, onBack, onNavigateToSlug }: EventDetailPageProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  const eventIndex = EVENTS_DATA.findIndex((e) => e.slug === slug || e.id === slug);
  const event = eventIndex !== -1 ? EVENTS_DATA[eventIndex] : EVENTS_DATA[0];

  const prevEvent = eventIndex > 0 ? EVENTS_DATA[eventIndex - 1] : EVENTS_DATA[EVENTS_DATA.length - 1];
  const nextEvent = eventIndex < EVENTS_DATA.length - 1 ? EVENTS_DATA[eventIndex + 1] : EVENTS_DATA[0];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [slug]);

  if (!event) return null;

  return (
    <div className="relative min-h-screen bg-[#07040d] text-white selection:bg-bvntt-lilac selection:text-black overflow-x-hidden">
      {/* Noise background texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-40 z-0" />

      {/* Top sticky navigation bar */}
      <header className="sticky top-0 z-40 bg-[#07040d]/90 backdrop-blur-xl border-b border-white/[0.08]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 h-16 md:h-20 flex items-center justify-between">
          <button
            onClick={onBack}
            className="group inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors duration-300"
          >
            <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
            <span>Tất cả sự kiện</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-bvntt-muted">
            <span>Sự kiện</span>
            <ChevronRight className="w-3.5 h-3.5 text-white/20" />
            <span className="text-bvntt-cream font-medium truncate max-w-[280px]">{event.title}</span>
          </div>
        </div>
      </header>

      {/* Hero Header Section */}
      <section className="relative w-full pt-10 md:pt-16 pb-20 md:pb-28">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">

          {/* Breadcrumb & Category */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="section-label">{event.category}</span>
            <span className="w-1 h-1 rounded-full bg-white/20" />
            <span className="inline-flex items-center gap-1.5 text-xs text-bvntt-muted font-light">
              <Calendar className="w-3.5 h-3.5 text-bvntt-lilac" />
              {event.timeframe}
            </span>
          </div>

          {/* Main Title & Subtitle */}
          <div className="space-y-4 mb-10 md:mb-16">
            <h1 className="font-display font-extrabold text-bvntt-cream text-3xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight max-w-5xl uppercase tracking-normal">
              {event.title}
            </h1>
            <p className="font-sans text-lg sm:text-xl md:text-2xl text-bvntt-lilac font-medium max-w-3xl leading-relaxed">
              {event.subtitle}
            </p>
          </div>

          {/* Main Cinematic Image Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full aspect-[16/9] md:aspect-[21/9] rounded-xl md:rounded-2xl overflow-hidden border border-white/[0.08] group"
          >
            <img
              src={event.coverImage}
              alt={event.title}
              className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-10 right-6 flex items-end justify-between">
              <div className="text-xs tracking-[0.14em] uppercase text-white/70">
                Lưu giữ bởi Ban Văn nghệ Thể thao
              </div>
              <button
                onClick={() => setSelectedPhoto(event.coverImage)}
                className="hidden sm:inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider px-3.5 py-1.5 bg-black/60 backdrop-blur-md border border-white/20 hover:border-white/50 transition-colors"
              >
                Xem ảnh gốc ↗
              </button>
            </div>
          </motion.div>

          {/* Event Stats Row */}
          {event.stats && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-px bg-white/[0.06] mt-10 md:mt-14 border border-white/[0.06]">
              {event.stats.map((s, i) => (
                <div key={i} className="bg-[#07040d] p-6 md:p-8 space-y-1">
                  <div className="font-display font-black text-3xl md:text-4xl text-bvntt-cream tracking-tight">
                    {s.value}
                  </div>
                  <div className="text-[11px] font-semibold tracking-[0.16em] uppercase text-bvntt-muted">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      {/* Main Narrative & Highlights Section */}
      <section className="relative w-full py-16 md:py-24 bg-[#0a0514] border-t border-white/[0.06]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

            {/* Left Col: Narrative Story */}
            <div className="lg:col-span-7 space-y-6">
              <div className="section-label">Câu chuyện sự kiện</div>
              <h2 className="font-display font-bold text-bvntt-cream text-2xl sm:text-3xl md:text-4xl leading-tight uppercase tracking-normal">
                Không gian bùng nổ của đam mê và thanh xuân sinh viên Bách khoa
              </h2>

              <div className="text-sm md:text-base text-bvntt-muted font-light leading-relaxed space-y-4 pt-2">
                {event.description.split("\n\n").map((para, i) => (
                  <p key={i} className="leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Right Col: Key Highlights */}
            <div className="lg:col-span-5 space-y-6">
              <div className="section-label">Dấu ấn nổi bật</div>
              <div className="p-6 md:p-8 bg-[#07040d] border border-white/[0.08] space-y-4">
                <div className="flex items-center gap-2 text-bvntt-lilac">
                  <Sparkles className="w-4 h-4" />
                  <span className="font-display text-xs font-semibold tracking-[0.14em] uppercase">
                    Điểm nhấn chương trình
                  </span>
                </div>

                <div className="space-y-3 pt-2">
                  {event.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-3 py-2 border-b border-white/[0.04] last:border-0">
                      <span className="font-display text-sm font-bold text-bvntt-lilac leading-none mt-1 flex-shrink-0 w-6">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-xs md:text-sm text-bvntt-muted font-normal leading-relaxed">
                        {h}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Info card */}
              <div className="p-6 bg-[#07040d] border border-white/[0.06] space-y-2">
                <div className="text-[10px] tracking-[0.14em] uppercase text-bvntt-muted">Đơn vị chủ trì & thực hiện</div>
                <div className="font-display text-sm font-semibold uppercase text-bvntt-cream">
                  Ban Văn nghệ Thể thao - Đoàn Đại học Bách khoa Hà Nội
                </div>
                <p className="text-xs text-bvntt-muted font-normal pt-1">
                  Đồng hành cùng các mảng chuyên môn và các câu lạc bộ trực thuộc kiến tạo sân khấu.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Photo Gallery Grid */}
      {event.gallery && event.gallery.length > 0 && (
        <section className="relative w-full py-20 md:py-28 bg-[#07040d] border-t border-white/[0.06]">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 md:mb-16">
              <FadeUp>
                <div className="space-y-2">
                  <span className="section-label">Khoảnh khắc ấn tượng</span>
                  <h2 className="font-display font-extrabold text-bvntt-cream text-3xl sm:text-4xl md:text-5xl uppercase tracking-normal">
                    HÌNH ẢNH <span className="text-bvntt-lilac">SỰ KIỆN</span>
                  </h2>
                </div>
              </FadeUp>
              <p className="text-xs text-bvntt-muted font-normal max-w-xs leading-relaxed">
                Những khoảnh khắc ghi lại trọn vẹn năng lượng, cảm xúc và sân khấu đỉnh cao của sự kiện.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {event.gallery.map((img, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setSelectedPhoto(img)}
                  className="group relative aspect-[4/3] overflow-hidden bg-[#0a0514] border border-white/[0.06] cursor-pointer"
                >
                  <img
                    src={img}
                    alt={`${event.title} - ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-[1.05] transition-transform duration-700 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="text-xs font-semibold uppercase tracking-widest text-white px-3 py-1.5 bg-black/60 border border-white/20 backdrop-blur-sm">
                      Phóng to
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Prev / Next Event Navigation */}
      <section className="relative w-full py-16 md:py-24 bg-[#0a0514] border-t border-white/[0.06]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Prev Event Card */}
            <div
              onClick={() => onNavigateToSlug(prevEvent.slug)}
              className="group relative p-6 md:p-8 bg-[#07040d] border border-white/[0.08] hover:border-white/[0.2] transition-colors cursor-pointer space-y-2"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-bvntt-muted group-hover:text-bvntt-lilac transition-colors">
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
                <span>Sự kiện trước</span>
              </div>
              <h4 className="font-display text-xl md:text-2xl font-bold text-bvntt-cream group-hover:text-white transition-colors">
                {prevEvent.title}
              </h4>
              <p className="text-xs text-bvntt-muted font-light line-clamp-1">
                {prevEvent.subtitle}
              </p>
            </div>

            {/* Next Event Card */}
            <div
              onClick={() => onNavigateToSlug(nextEvent.slug)}
              className="group relative p-6 md:p-8 bg-[#07040d] border border-white/[0.08] hover:border-white/[0.2] transition-colors cursor-pointer space-y-2 text-right"
            >
              <div className="flex items-center justify-end gap-2 text-xs font-semibold uppercase tracking-wider text-bvntt-muted group-hover:text-bvntt-lilac transition-colors">
                <span>Sự kiện tiếp theo</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </div>
              <h4 className="font-display text-xl md:text-2xl font-bold text-bvntt-cream group-hover:text-white transition-colors">
                {nextEvent.title}
              </h4>
              <p className="text-xs text-bvntt-muted font-light line-clamp-1">
                {nextEvent.subtitle}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />

      {/* Lightbox Modal for Photo */}
      <AnimatePresence>
        {selectedPhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedPhoto(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.3 }}
              className="relative z-10 max-w-5xl max-h-[85vh] overflow-hidden"
            >
              <img
                src={selectedPhoto}
                alt="Enlarged"
                className="max-w-full max-h-[85vh] object-contain border border-white/20"
              />
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 bg-black/70 border border-white/30 text-white hover:text-bvntt-lilac transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
