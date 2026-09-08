import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Camera, ChevronDown, Menu, Newspaper, Sparkles, X } from "lucide-react";
import { SITE_CONFIG } from "../data/config";

interface NavbarProps {
  onOpenContact?: () => void;
  onNavigateToHomeSection?: (sectionId: string) => void;
  onNavigateToPage?: (path: string) => void;
}

export const Navbar = ({
  onOpenContact: _onOpenContact,
  onNavigateToHomeSection,
  onNavigateToPage,
}: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(true);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "Trang chủ", href: "#hero" },
    { label: "Sự kiện", href: "#events" },
    { label: "Mảng chuyên môn", href: "#organization" },
    { label: "Tuyển thành viên 2026", href: "#recruitment" },
  ];

  const handleLinkClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    setExploreOpen(false);

    // If a custom home section navigator is provided (e.g. on dedicated subpages)
    if (onNavigateToHomeSection) {
      onNavigateToHomeSection(href);
      return;
    }

    // Normal anchor scroll on landing page
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    } else {
      window.history.pushState({}, "", `/${href}`);
      window.location.href = `/${href}`;
    }
  };

  const handleNavigatePage = (path: string) => {
    setMobileOpen(false);
    setExploreOpen(false);
    if (onNavigateToPage) {
      onNavigateToPage(path);
    } else {
      window.history.pushState({}, "", path);
      window.location.href = path;
    }
  };

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setExploreOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExploreOpen(false);
    }, 150);
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#07040d]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo + Name */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero")}
              className="flex items-center gap-3 group"
            >
              <img
                src="/Logo Ban@4x.png"
                alt="Logo"
                className="w-8 h-11 md:w-9 md:h-12 object-contain flex-shrink-0"
              />
              <div>
                <div className="font-sans text-[11px] md:text-xs font-bold tracking-[0.06em] uppercase text-bvntt-cream leading-none">
                  BAN VĂN NGHỆ THỂ THAO
                </div>
                <div className="font-sans text-[9px] md:text-[10px] tracking-[0.08em] uppercase text-bvntt-muted leading-none mt-1">
                  Đoàn Thanh niên Đại học Bách khoa Hà Nội
                </div>
              </div>
            </a>

            {/* Center: Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleLinkClick(e, l.href)}
                  className="text-[11px] xl:text-xs font-medium tracking-[0.08em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors duration-300 relative group cursor-pointer"
                >
                  {l.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-bvntt-lilac group-hover:w-full transition-all duration-400" />
                </a>
              ))}

              {/* ── Menu "Khám phá" Dropdown ── */}
              <div
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <button
                  onClick={() => setExploreOpen((prev) => !prev)}
                  className={`text-[11px] xl:text-xs font-semibold tracking-[0.08em] uppercase transition-colors duration-300 flex items-center gap-1.5 cursor-pointer py-2 ${
                    exploreOpen ? "text-bvntt-lilac" : "text-bvntt-muted hover:text-bvntt-cream"
                  }`}
                >
                  <span>Khám phá</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-300 ${
                      exploreOpen ? "rotate-180 text-bvntt-lilac" : "text-white/40"
                    }`}
                  />
                </button>

                {/* Dropdown Menu Container */}
                <AnimatePresence>
                  {exploreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.96 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.96 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-72 z-50"
                    >
                      <div className="bg-[#0b0616]/95 backdrop-blur-2xl border border-white/[0.1] shadow-2xl p-2 rounded-sm space-y-1">
                        {/* Sub-item: Tin tức & Sự kiện */}
                        <button
                          onClick={() => handleNavigatePage("/news")}
                          className="w-full group flex items-start gap-3 p-3 text-left hover:bg-white/[0.04] transition-colors rounded-sm cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded bg-bvntt-lilac/10 border border-bvntt-lilac/20 flex items-center justify-center text-bvntt-lilac group-hover:bg-bvntt-lilac group-hover:text-black transition-colors flex-shrink-0 mt-0.5">
                            <Newspaper className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-bvntt-cream group-hover:text-bvntt-lilac transition-colors uppercase tracking-wider">
                              Tin tức & Sự kiện
                            </div>
                            <div className="text-[11px] text-bvntt-muted mt-0.5 leading-snug">
                              Tổng hợp tin tức, thông báo & bài viết hoạt động
                            </div>
                          </div>
                        </button>

                        <div className="h-px bg-white/[0.06] mx-2" />

                        {/* Sub-item: Khoảnh khắc */}
                        <button
                          onClick={() => handleNavigatePage("/gallery")}
                          className="w-full group flex items-start gap-3 p-3 text-left hover:bg-white/[0.04] transition-colors rounded-sm cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded bg-bvntt-lilac/10 border border-bvntt-lilac/20 flex items-center justify-center text-bvntt-lilac group-hover:bg-bvntt-lilac group-hover:text-black transition-colors flex-shrink-0 mt-0.5">
                            <Camera className="w-4 h-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-bold text-bvntt-cream group-hover:text-bvntt-lilac transition-colors uppercase tracking-wider">
                              Khoảnh khắc
                            </div>
                            <div className="text-[11px] text-bvntt-muted mt-0.5 leading-snug">
                              Bộ sưu tập hình ảnh hoạt động & sự kiện
                            </div>
                          </div>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>

            {/* Right: CTA + Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a
                href={SITE_CONFIG.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-cream border border-bvntt-border-md px-4 py-2 hover:border-bvntt-lilac hover:text-bvntt-lilac transition-all duration-300"
              >
                Liên hệ ngay
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="lg:hidden p-2 text-bvntt-cream cursor-pointer"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-40 bg-[#07040d]/97 backdrop-blur-2xl border-b border-white/[0.06] lg:hidden max-h-[85vh] overflow-y-auto"
          >
            <div className="px-6 py-6 space-y-2">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => handleLinkClick(e, l.href)}
                  className="block py-3 text-sm font-medium tracking-[0.06em] uppercase text-bvntt-muted hover:text-bvntt-cream border-b border-white/[0.04] transition-colors"
                >
                  {l.label}
                </a>
              ))}

              {/* Mobile "Khám phá" Group */}
              <div className="pt-2 pb-1 border-b border-white/[0.04]">
                <button
                  onClick={() => setMobileExploreOpen((prev) => !prev)}
                  className="w-full flex items-center justify-between py-2 text-sm font-bold tracking-[0.06em] uppercase text-bvntt-lilac"
                >
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Khám phá
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${
                      mobileExploreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {mobileExploreOpen && (
                  <div className="pl-4 pr-1 py-2 space-y-2">
                    <button
                      onClick={() => handleNavigatePage("/news")}
                      className="w-full flex items-center gap-2.5 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-bvntt-lilac text-left"
                    >
                      <Newspaper className="w-4 h-4 text-bvntt-lilac" />
                      <span>Tin tức & Sự kiện</span>
                    </button>

                    <button
                      onClick={() => handleNavigatePage("/gallery")}
                      className="w-full flex items-center gap-2.5 py-2 text-xs font-semibold uppercase tracking-wider text-white/80 hover:text-bvntt-lilac text-left"
                    >
                      <Camera className="w-4 h-4 text-bvntt-lilac" />
                      <span>Khoảnh khắc</span>
                    </button>
                  </div>
                )}
              </div>

              <div className="pt-4">
                <a
                  href={SITE_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-cream border border-bvntt-border-md px-5 py-3 hover:border-bvntt-lilac w-full justify-center"
                >
                  Liên hệ qua Facebook
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
