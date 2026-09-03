import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface HeroProps {
  onRegisterClick?: () => void;
}

export const Hero = ({ onRegisterClick }: HeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const bgOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.5]);

  const scrollToRecruitment = () => {
    onRegisterClick?.();
    document.querySelector("#recruitment")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="section-snap scroll-mt-0 relative w-full h-[calc(100vh-4.75rem)] md:h-[calc(100vh-5.5rem)] min-h-[520px] flex items-center justify-center overflow-hidden bg-[#07040d]"
    >
      {/* ── Full-bleed Video Background - Edge-to-Edge ── */}
      <div className="absolute inset-0 z-0">
        <motion.video
          style={{ opacity: bgOpacity }}
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg"
        >
          <source src="/hero-video.mp4" type="video/mp4" />
        </motion.video>

        {/* Cinematic dark overlay: High contrast for maximum text legibility */}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/30 to-[#07040d]" />
      </div>

      {/* ── Centered Content ── */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-8 md:px-12 pt-16 pb-6 md:pt-20 md:pb-8 max-w-5xl mx-auto w-full space-y-3 sm:space-y-4 md:space-y-5">
        {/* Main Title: VĂN NGHỆ on top, THỂ THAO below - Dominant & Responsive */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <h1 className="font-display uppercase text-center leading-[0.86] tracking-normal select-none">
            <span className="block text-[13.5vw] sm:text-[11.5vw] md:text-[9.5vw] lg:text-[9.5rem] xl:text-[11.2rem] text-bvntt-cream">
              VĂN NGHỆ
            </span>
            <span className="block text-[13.5vw] sm:text-[11.5vw] md:text-[9.5vw] lg:text-[9.5rem] xl:text-[11.2rem] text-bvntt-lilac">
              THỂ THAO
            </span>
          </h1>
        </motion.div>

        {/* Description: Compact and slightly wider than center, proportional to title */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xs sm:text-sm md:text-base text-bvntt-muted font-normal leading-relaxed max-w-xs sm:max-w-md md:max-w-lg mx-auto"
        >
          Nơi khơi nguồn đam mê, thắp sáng tài năng và lưu giữ những khoảnh khắc rực rỡ, bùng nổ nhất của tuổi trẻ Bách khoa.
        </motion.p>

        {/* CTA Button: Synchronized with site button style and size */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="pt-1"
        >
          <button
            onClick={scrollToRecruitment}
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-5 py-2.5 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300 backdrop-blur-sm"
          >
            <span>Tuyển thành viên 2026</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
