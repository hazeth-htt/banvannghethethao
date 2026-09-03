import { useState, useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { DIVISIONS_DATA, DivisionItem } from "../data/divisions";
import { CLUBS_DATA, ClubItem } from "../data/clubs";
import { OrganizationNode } from "./OrganizationNode";
import { OrganizationModal } from "./OrganizationModal";
import { ClubCard } from "./ClubCard";
import { FadeUp } from "./animations/FadeUp";

interface OrganizationTimelineProps {
  onRegisterClick?: () => void;
}

export const OrganizationTimeline = ({ onRegisterClick }: OrganizationTimelineProps) => {
  const [selectedDiv, setSelectedDiv] = useState<DivisionItem | null>(null);
  const [selectedClub, setSelectedClub] = useState<ClubItem | null>(null);

  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 65%", "end 80%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 80, damping: 25, restDelta: 0.001 });

  const closeModal = () => {
    setSelectedDiv(null);
    setSelectedClub(null);
  };

  return (
    <section id="organization" className="section-snap relative w-full py-20 md:py-28 bg-[#07040d]">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">

        {/* Centered section header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-24 space-y-3">
          <FadeUp>
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-bvntt-cream text-3xl sm:text-5xl md:text-6xl uppercase tracking-normal leading-tight">
                CƠ CẤU <span className="text-bvntt-lilac">BAN VĂN NGHỆ THỂ THAO</span>
              </h2>
              <p className="text-sm sm:text-base text-bvntt-muted font-normal max-w-xl mx-auto leading-relaxed pt-1">
                4 mảng chuyên môn nòng cốt và 7 câu lạc bộ văn nghệ, nghệ thuật & thể thao trực thuộc trong một mô hình tổ chức chuyên nghiệp, liên kết chặt chẽ.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* ══ VERTICAL TIMELINE ══ */}
        <div ref={timelineRef} className="relative">

          {/* The central vertical line connecting Root card to 7 Clubs node */}
          <div className="absolute left-4 md:left-1/2 top-48 bottom-28 w-px bg-white/[0.08] md:-translate-x-px" />

          {/* Progressive scroll reveal line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-4 md:left-1/2 top-48 bottom-28 w-px bg-gradient-to-b from-bvntt-purple to-bvntt-lilac md:-translate-x-px z-0"
          />

          {/* ── Root node: Ban Văn nghệ Thể thao - 100% Centered ── */}
          <FadeUp className="w-full flex justify-center mb-16 md:mb-20">
            <div className="w-full max-w-[480px] mx-auto border border-white/[0.08] bg-[#0a0514] p-6 md:p-8 flex flex-col items-center justify-center text-center">
              <img
                src="/Logo Ban@4x.png"
                alt="Logo"
                className="w-10 h-14 md:w-12 md:h-16 object-contain mb-4 mx-auto"
              />
              <div className="text-center">
                <h3 className="font-sans font-bold text-bvntt-cream text-base sm:text-lg md:text-xl tracking-[0.08em] uppercase text-center">
                  BAN VĂN NGHỆ THỂ THAO
                </h3>
                <p className="font-sans font-normal text-xs sm:text-sm text-bvntt-muted tracking-wide mt-1.5 text-center">
                  Đoàn Thanh niên Đại học Bách khoa Hà Nội
                </p>
              </div>
            </div>
          </FadeUp>

          {/* ── 4 Division nodes - alternating left/right on desktop ── */}
          <div className="space-y-0">
            {DIVISIONS_DATA.map((div, i) => (
              <OrganizationNode
                key={div.id}
                division={div}
                index={i}
                onSelect={setSelectedDiv}
              />
            ))}
          </div>

          {/* ── 7 Clubs terminal node - 100% Centered ── */}
          <FadeUp delay={0.1} className="w-full flex justify-center mt-16 md:mt-20 mb-4">
            <div className="w-full max-w-[480px] mx-auto border border-white/[0.08] bg-[#0a0514] p-5 md:p-7 text-center flex flex-col items-center justify-center">
              <h3 className="font-display font-bold text-bvntt-cream text-2xl md:text-3xl uppercase tracking-normal text-center">
                7 CÂU LẠC BỘ <span className="text-bvntt-lilac">TRỰC THUỘC</span>
              </h3>
            </div>
          </FadeUp>

        </div>
        {/* END vertical timeline */}

        {/* ── 7 Clubs Grid - below the timeline ── */}
        <div id="clubs" className="section-snap mt-16 md:mt-24">
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-12 space-y-2">
            <h3 className="font-display font-bold text-2xl md:text-3xl text-bvntt-cream uppercase tracking-normal">
              7 CÂU LẠC BỘ NGHỆ THUẬT & THỂ THAO
            </h3>
            <p className="text-sm text-bvntt-muted font-normal leading-relaxed">
              Mỗi câu lạc bộ mang một bản sắc cá tính riêng biệt, tạo nên bức tranh phong trào đa dạng và sống động nhất tại Bách khoa.
            </p>
          </div>

          {/* Club Grid - 4 on top, 3 below + 8th box with watermarked logo */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
            {CLUBS_DATA.map((club, i) => (
              <ClubCard
                key={club.id}
                club={club}
                index={i}
                onClick={() => setSelectedClub(club)}
              />
            ))}

            {/* 8th Box: Watermarked Ban Văn nghệ Thể thao Logo */}
            <div className="h-36 sm:h-44 md:h-52 flex items-center justify-center p-6 bg-[#0a0514] border border-white/[0.08] overflow-hidden select-none relative group">
              <img
                src="/Logo Ban@4x.png"
                alt="BVNTT Logo"
                className="w-12 h-16 sm:w-14 sm:h-18 md:w-16 md:h-22 object-contain opacity-20 grayscale group-hover:opacity-40 transition-opacity duration-500 pointer-events-none"
              />
            </div>
          </div>
        </div>

      </div>

      <OrganizationModal
        division={selectedDiv}
        club={selectedClub}
        onClose={closeModal}
        onRegisterClick={onRegisterClick}
      />
    </section>
  );
};
