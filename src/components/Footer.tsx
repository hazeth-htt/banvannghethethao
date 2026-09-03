import { motion } from "framer-motion";
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
                  Đoàn Thanh niên Đại học Bách khoa Hà Nội
                </div>
              </div>
            </div>
            <p className="text-xs text-bvntt-muted font-light leading-relaxed max-w-xs">
              Đơn vị trực thuộc Đoàn trường phụ trách toàn diện công tác phong trào văn hóa, nghệ thuật và thể thao tại Đại học Bách khoa Hà Nội.
            </p>
          </div>

          {/* 7 Câu lạc bộ trực thuộc - 1 dòng mỗi CLB, không role */}
          <div className="space-y-4">
            <div className="section-label">7 CLB trực thuộc</div>
            <ul className="space-y-2 text-xs text-bvntt-muted font-light">
              {["D.O.P", "Glee BK", "EMCEE", "BeU", "D.A.S", "HBC", "HRO"].map((name) => (
                <li key={name}>
                  <button
                    onClick={() => scrollTo("#organization")}
                    className="hover:text-bvntt-cream transition-colors duration-200 text-left cursor-pointer block"
                  >
                    <span className="font-medium text-bvntt-cream/90">{name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 4 Mảng chuyên môn */}
          <div className="space-y-4">
            <div className="section-label">4 Mảng chuyên môn</div>
            <ul className="space-y-2.5 text-xs text-bvntt-muted font-light">
              <li>
                <button
                  onClick={() => scrollTo("#organization")}
                  className="hover:text-bvntt-cream transition-colors duration-200 text-left cursor-pointer"
                >
                  01. Mảng Tổ chức
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#organization")}
                  className="hover:text-bvntt-cream transition-colors duration-200 text-left cursor-pointer"
                >
                  02. Mảng Truyền thông
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#organization")}
                  className="hover:text-bvntt-cream transition-colors duration-200 text-left cursor-pointer"
                >
                  03. Mảng Media - Design
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo("#organization")}
                  className="hover:text-bvntt-cream transition-colors duration-200 text-left cursor-pointer"
                >
                  04. Mảng Đối ngoại
                </button>
              </li>
            </ul>
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

        {/* Large footer marquee ticker */}
        <div className="relative w-full py-10 md:py-14 overflow-hidden select-none -mx-6 sm:-mx-10 lg:-mx-16 px-0">
          {/* Subtle fade masks at left & right */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#07040d] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#07040d] to-transparent z-10 pointer-events-none" />

          <div className="flex w-max">
            <motion.div
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 28, ease: "linear", repeat: Infinity }}
              className="flex items-center gap-8 md:gap-12 flex-shrink-0"
            >
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="flex items-center gap-6 sm:gap-8 md:gap-12 font-display font-black tracking-tighter text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.8rem] text-white/[0.05] hover:text-white/[0.12] transition-colors duration-500 uppercase cursor-default whitespace-nowrap leading-none"
                >
                  <span>TRÁCH NHIỆM</span>
                  <span className="text-white/[0.03]">-</span>
                  <span>ĐAM MÊ</span>
                  <span className="text-white/[0.03]">-</span>
                  <span>TỈ MẨN</span>
                  <span className="text-white/[0.03]">-</span>
                  <span>SÁNG TẠO</span>
                  <span className="text-white/[0.03]">-</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="border-t border-white/[0.05] py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-bvntt-muted tracking-[0.06em]">
          <span>© {year} Ban Văn nghệ Thể thao - Đoàn Thanh niên Đại học Bách khoa Hà Nội</span>
          <span className="text-white/30">Được xây dựng với tâm huyết cho sinh viên HUST</span>
        </div>

      </div>
    </footer>
  );
};
