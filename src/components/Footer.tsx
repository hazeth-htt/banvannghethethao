import { ArrowUpRight, Facebook, Mail, MapPin } from "lucide-react";
import { SITE_CONFIG } from "../data/config";

export const Footer = () => {
  const year = new Date().getFullYear();
  const scrollTo = (href: string) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  return (
    <footer className="section-snap relative bg-[#07040d] border-t border-white/[0.07] overflow-hidden">
      {/* Noise */}
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-60" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 pt-16 md:pt-20">

        {/* Middle: Logo + Nav + Contact */}
        <div className="py-12 md:py-16 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-10 border-b border-white/[0.07]">

          {/* Logo + identity */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <img src="/Logo Ban@4x.png" alt="Logo" className="w-8 h-11 object-contain" />
              <div>
                <div className="text-xs font-bold tracking-[0.12em] uppercase text-bvntt-cream">
                  Ban Văn nghệ Thể thao
                </div>
                <div className="text-[10px] tracking-[0.08em] uppercase text-bvntt-muted">
                  Đoàn Đhbk Hà Nội
                </div>
              </div>
            </div>
            <p className="text-xs text-bvntt-muted font-light leading-relaxed max-w-xs">
              Đơn vị trực thuộc Đoàn trường phụ trách toàn diện công tác phong trào văn hóa, nghệ thuật và thể thao tại Đại học Bách khoa Hà Nội.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <div className="section-label">Khám phá</div>
            <ul className="space-y-2.5 text-xs text-bvntt-muted font-light">
              {[
                { label: "Trang chủ", href: "#hero" },
                { label: "Sự kiện nổi bật", href: "#events" },
                { label: "Mảng chuyên môn", href: "#organization" },
                { label: "7 Câu lạc bộ", href: "#organization" },
                { label: "Tuyển thành viên 2026", href: "#recruitment" },
              ].map((l) => (
                <li key={l.href}>
                  <button
                    onClick={() => scrollTo(l.href)}
                    className="hover:text-bvntt-cream transition-colors duration-200"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Mảng */}
          <div className="space-y-4">
            <div className="section-label">4 Mảng chuyên môn</div>
            <ul className="space-y-2 text-xs text-bvntt-muted font-light">
              <li>01. Mảng Tổ chức</li>
              <li>02. Mảng Truyền thông</li>
              <li>03. Mảng Media - Design</li>
              <li>04. Mảng Đối ngoại</li>
            </ul>
            <div className="section-label mt-4 pt-4 border-t border-white/[0.05]">7 CLB trực thuộc</div>
            <p className="text-[11px] text-bvntt-muted font-light leading-relaxed">
              D.O.P · GleeBK · BeU · D.A.S · Emcee · HRO · HBC
            </p>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <div className="section-label">Liên hệ</div>
            <ul className="space-y-3 text-xs text-bvntt-muted font-light">
              <li>
                <a
                  href={SITE_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-bvntt-cream transition-colors"
                >
                  <Facebook className="w-3.5 h-3.5 flex-shrink-0" />
                  <span>Facebook</span>
                  <ArrowUpRight className="w-3 h-3 ml-auto" />
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${SITE_CONFIG.email}`}
                  className="flex items-center gap-2 hover:text-bvntt-cream transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="truncate">{SITE_CONFIG.email}</span>
                </a>
              </li>
              <li>
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội</span>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* Large footer closer text */}
        <div className="py-12 md:py-16 overflow-hidden select-none">
          <h2
            className="font-display font-black tracking-tighter text-[12vw] md:text-[10vw] lg:text-[8vw] text-white/[0.04] hover:text-white/[0.07] transition-colors duration-700 leading-none uppercase cursor-default whitespace-nowrap"
          >
            TRÁCH NHIỆM - ĐAM MÊ - TỈ MẨN - SÁNG TẠO
          </h2>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/[0.05] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-bvntt-muted tracking-[0.06em]">
          <span>© {year} Ban Văn nghệ Thể thao - Đoàn Đại học Bách khoa Hà Nội</span>
          <span className="text-white/30">Được xây dựng với tâm huyết cho sinh viên HUST</span>
        </div>

      </div>
    </footer>
  );
};
