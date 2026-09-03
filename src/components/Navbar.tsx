import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { SITE_CONFIG } from "../data/config";

interface NavbarProps {
  onOpenContact?: () => void;
}

export const Navbar = ({ onOpenContact: _onOpenContact }: NavbarProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

  const scroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled
            ? "bg-[#07040d]/90 backdrop-blur-xl border-b border-white/[0.06]"
            : "bg-transparent"
          }`}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* Left: Logo + Name */}
            <a
              href="#hero"
              onClick={(e) => scroll(e, "#hero")}
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
            <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scroll(e, l.href)}
                  className="text-[11px] xl:text-xs font-medium tracking-[0.08em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors duration-300 relative group"
                >
                  {l.label}
                  <span className="absolute -bottom-2 left-0 w-0 h-px bg-bvntt-lilac group-hover:w-full transition-all duration-400" />
                </a>
              ))}
            </nav>

            {/* Right: CTA + Mobile */}
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
                className="lg:hidden p-2 text-bvntt-cream"
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 top-16 z-40 bg-[#07040d]/97 backdrop-blur-2xl border-b border-white/[0.06] lg:hidden"
          >
            <div className="px-6 py-8 space-y-1">
              {links.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={(e) => scroll(e, l.href)}
                  className="block py-3 text-sm font-medium tracking-[0.06em] uppercase text-bvntt-muted hover:text-bvntt-cream border-b border-white/[0.04] transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <div className="pt-5">
                <a
                  href={SITE_CONFIG.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-cream border border-bvntt-border-md px-5 py-3 hover:border-bvntt-lilac"
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
