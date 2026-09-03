import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { FadeUp } from "./animations/FadeUp";
import { SITE_CONFIG } from "../data/config";

interface Stage {
  date: string;
  title: string;
  description: string;
  status: "active" | "completed" | "upcoming";
}

const stages: Stage[] = [
  {
    date: "01/09",
    title: "Mở đơn",
    description: "Chính thức phát động đợt tuyển thành viên mới trên toàn trường",
    status: "active",
  },
  {
    date: "16/09",
    title: "Đóng đơn",
    description: "Kết thúc vòng đơn",
    status: "upcoming",
  },
  {
    date: "10/09/2026",
    title: "Kết quả",
    description: "Công bố danh sách thành viên chính thức gia nhập đại gia đình",
    status: "upcoming",
  },
];

interface RecruitmentSectionProps {
  onOpenFormModal?: () => void;
}

export const RecruitmentSection = ({ onOpenFormModal }: RecruitmentSectionProps) => {
  return (
    <section id="recruitment" className="section-snap relative w-full py-20 md:py-28 bg-[#07040d] overflow-hidden">
      {/* Very subtle ambient */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-bvntt-purple/8 blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="divider-h mb-14 md:mb-20" />

        {/* ── Section header: Centered ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16 md:mb-20 space-y-4">
          <FadeUp>
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-bvntt-cream text-3xl sm:text-5xl md:text-6xl uppercase tracking-normal leading-tight">
                TUYỂN THÀNH VIÊN <span className="text-bvntt-lilac">{SITE_CONFIG.recruitment.year}</span>
              </h2>
              <p className="text-sm sm:text-base text-bvntt-muted font-normal max-w-xl mx-auto leading-relaxed pt-1">
                Gia nhập Ban Văn nghệ Thể thao - nơi đam mê được nuôi dưỡng, tài năng được tỏa sáng và mỗi sự kiện là một ký ức thanh xuân không thể nào quên.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* ── Recruitment Timeline: Centered & Balanced ── */}
        <div className="relative max-w-4xl mx-auto">
          {/* Horizontal connector line — desktop only, connecting dot centers */}
          <div className="hidden md:block absolute top-[11px] left-[16.666%] right-[16.666%] h-px bg-white/[0.12] z-0" />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            {stages.map((stage, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex flex-col items-center text-center pb-6 md:pb-0"
              >
                {/* Timeline dot */}
                <div className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center bg-[#07040d] border border-white/20 mb-5">
                  <div className={`w-2.5 h-2.5 rounded-full ${stage.status === "active"
                    ? "bg-bvntt-lilac shadow-[0_0_10px_rgba(214,185,255,0.7)]"
                    : stage.status === "completed"
                      ? "bg-bvntt-purple"
                      : "bg-white/25"
                    }`} />
                </div>

                {/* Stage title: Dominant and prominent in League Gothic */}
                <h3 className={`font-display text-2xl sm:text-3xl md:text-4xl font-bold tracking-normal uppercase mb-1.5 ${stage.status === "active" ? "text-bvntt-lilac" : "text-bvntt-cream"
                  }`}>
                  {stage.title}
                </h3>

                {/* Date */}
                <div className="font-display text-base sm:text-lg tracking-[0.06em] uppercase text-white/50 mb-2">
                  {stage.date}
                </div>

                {/* Thin divider */}
                <div className="w-8 h-px bg-white/[0.12] my-2 mx-auto" />

                {/* Description: Subordinate and clear in Inter */}
                <p className="font-sans text-xs sm:text-sm text-bvntt-muted font-normal leading-relaxed max-w-[220px] mx-auto">
                  {stage.description}
                </p>

                {stage.status === "active" && (
                  <span className="inline-block mt-3 text-[11px] font-semibold tracking-[0.12em] uppercase text-bvntt-lilac">
                    Đang diễn ra •
                  </span>
                )}
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── CTA Button: Moved below the timeline & centered ── */}
        <FadeUp delay={0.2} className="mt-14 md:mt-20 flex justify-center">
          <div className="pt-2">
            <button
              onClick={onOpenFormModal}
              className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-7 py-3 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300 backdrop-blur-sm cursor-pointer"
            >
              <span>Đăng ký ngay</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </FadeUp>

      </div>
    </section>
  );
};
