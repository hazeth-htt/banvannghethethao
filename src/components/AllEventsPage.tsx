import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Calendar, Search, Sparkles, Tag, Users } from "lucide-react";
import { EVENTS_DATA, EventItem } from "../data/events";
import { getStoredEvents, CONTENT_UPDATED_EVENT } from "../services/contentService";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MouseGradient } from "./MouseGradient";

interface AllEventsPageProps {
  onBack: () => void;
  onNavigateToEvent: (slug: string) => void;
  onNavigateToHomeSection?: (sectionId: string) => void;
  onNavigateToPage?: (path: string) => void;
}

export const AllEventsPage = ({
  onBack,
  onNavigateToEvent,
  onNavigateToHomeSection,
  onNavigateToPage,
}: AllEventsPageProps) => {
  const [eventsList, setEventsList] = useState<EventItem[]>(() => {
    const stored = getStoredEvents().filter((e) => e.status !== "draft");
    return stored.length > 0 ? stored : EVENTS_DATA;
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleUpdate = () => {
      const stored = getStoredEvents().filter((e) => e.status !== "draft");
      setEventsList(stored.length > 0 ? stored : EVENTS_DATA);
    };
    window.addEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
  }, []);

  // Get unique categories
  const categories = useMemo(() => {
    const set = new Set<string>();
    eventsList.forEach((ev) => {
      if (ev.category) set.add(ev.category);
    });
    return ["all", ...Array.from(set)];
  }, [eventsList]);

  // Filtered list
  const filteredEvents = useMemo(() => {
    return eventsList.filter((ev) => {
      const matchCat = selectedCategory === "all" || ev.category === selectedCategory;
      const matchSearch =
        searchTerm.trim() === "" ||
        ev.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [eventsList, selectedCategory, searchTerm]);

  return (
    <div className="relative min-h-screen bg-[#07040d] text-white selection:bg-bvntt-lilac selection:text-black overflow-x-hidden flex flex-col">
      <MouseGradient />

      {/* Global Navbar */}
      <Navbar
        onNavigateToHomeSection={onNavigateToHomeSection}
        onNavigateToPage={onNavigateToPage}
      />

      <main className="flex-1 pt-24 md:pt-32 pb-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Back Navigation Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Quay lại Trang chủ</span>
            </button>

            <div className="text-xs text-bvntt-muted">
              <span>Đang hiển thị <strong className="text-bvntt-cream">{filteredEvents.length}</strong> / {eventsList.length} sự kiện</span>
            </div>
          </div>

          {/* Hero Header */}
          <div className="max-w-4xl mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-bvntt-lilac mb-3 px-3 py-1 bg-bvntt-lilac/10 border border-bvntt-lilac/20">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thư viện hoạt động thường niên</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-bvntt-cream leading-tight tracking-normal">
              TẤT CẢ <span className="text-bvntt-lilac">SỰ KIỆN</span> BVNTT
            </h1>
            <p className="text-sm sm:text-base text-bvntt-muted font-normal max-w-2xl mt-4 leading-relaxed">
              Tổng hợp toàn bộ các đại nhạc hội bùng nổ, cuộc thi tài năng, giải đấu thể thao và chương trình giao lưu văn hóa sinh viên được Ban Văn nghệ Thể thao tổ chức qua các năm.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-5 mb-12">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Tìm kiếm sự kiện theo tên, nội dung, thể loại..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-11 pr-4 py-3 bg-[#0d071a] border border-white/[0.1] text-sm text-white placeholder:text-white/40 focus:border-bvntt-lilac focus:bg-[#120a24] outline-none transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/50 hover:text-white px-2 py-1 cursor-pointer"
                >
                  Xóa
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 flex-wrap">
              {categories.map((cat) => {
                const active = selectedCategory === cat;
                const label = cat === "all" ? "Tất cả danh mục" : cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border ${
                      active
                        ? "bg-bvntt-lilac text-[#07040d] border-bvntt-lilac font-bold shadow-lg"
                        : "bg-white/[0.02] text-white/60 border-white/[0.08] hover:text-white hover:bg-white/[0.05]"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Events Grid */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 border border-white/[0.06] bg-[#0d071a]/50 p-8">
              <p className="text-white/60 text-base mb-3">Không tìm thấy sự kiện nào phù hợp với từ khóa.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                }}
                className="text-xs uppercase tracking-wider font-semibold text-bvntt-lilac hover:underline cursor-pointer"
              >
                Đặt lại bộ lọc tìm kiếm
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredEvents.map((ev, i) => (
                <motion.article
                  key={ev.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  onClick={() => onNavigateToEvent(ev.slug || ev.id)}
                  className="group relative flex flex-col bg-[#0d071a] border border-white/[0.08] hover:border-bvntt-lilac/50 transition-all duration-400 overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_10px_30px_rgba(214,185,255,0.1)]"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-black/50">
                    <img
                      src={ev.coverImage}
                      alt={ev.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d071a] via-transparent to-transparent opacity-80" />

                    {/* Category pill */}
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-[#07040d]/90 text-bvntt-lilac border border-bvntt-lilac/30 backdrop-blur-md">
                        {ev.category}
                      </span>
                    </div>

                    {/* Participant stat pill */}
                    {ev.stats?.[0] && (
                      <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-0.5 text-[10px] bg-black/70 text-white/80 border border-white/10 backdrop-blur-md">
                        <Users className="w-3 h-3 text-bvntt-lilac" />
                        <span>{ev.stats[0].value} {ev.stats[0].label}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2 text-[11px] text-white/50 font-sans tracking-wide">
                        <Calendar className="w-3.5 h-3.5 text-bvntt-lilac/70" />
                        <span>{ev.timeframe}</span>
                      </div>

                      <h2 className="font-display font-bold text-2xl sm:text-3xl text-bvntt-cream group-hover:text-bvntt-lilac transition-colors leading-tight uppercase line-clamp-2">
                        {ev.title}
                      </h2>

                      {ev.subtitle && (
                        <p className="text-xs text-bvntt-lilac/80 font-medium line-clamp-1">
                          {ev.subtitle}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm text-bvntt-muted leading-relaxed font-normal line-clamp-3">
                        {ev.shortDescription}
                      </p>
                    </div>

                    {/* Footer / CTA */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-wider text-white/40">
                        <Tag className="w-3 h-3" />
                        <span>{ev.highlights?.length || 0} điểm nổi bật</span>
                      </div>

                      <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-muted group-hover:text-bvntt-lilac transition-colors">
                        Khám phá chi tiết
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </span>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
