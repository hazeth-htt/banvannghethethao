import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, User, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import {
  ContentPost,
  PostCategory,
  getStoredPosts,
  CONTENT_UPDATED_EVENT,
} from "../services/contentService";
import { NewsModal } from "./NewsModal";
import { FadeUp } from "./animations/FadeUp";

const CATEGORIES: ("all" | PostCategory)[] = [
  "all",
  "Thông báo",
  "Tin tức",
  "Sự kiện",
  "Tuyển sinh",
  "Hoạt động CLB",
];

const PAGE_SIZE = 6; // 3 cột x 2 hàng mỗi trang

export const NewsSection = () => {
  const [posts, setPosts] = useState<ContentPost[]>(() => {
    return getStoredPosts().filter((p) => p.status === "published");
  });
  const [selectedCategory, setSelectedCategory] = useState<"all" | PostCategory>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [activePost, setActivePost] = useState<ContentPost | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredPosts().filter((p) => p.status === "published"));
    };
    window.addEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
  }, []);

  // Khi đổi category, reset về trang 1 và tắt chế độ xem tất cả
  const handleSelectCategory = (cat: "all" | PostCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    setShowAll(false);
  };

  // Lọc bài viết
  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  // Sắp xếp: bài ghim lên trước, sau đó theo ngày xuất bản giảm dần
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  const totalPages = Math.max(1, Math.ceil(sortedPosts.length / PAGE_SIZE));

  // Danh sách bài hiển thị: nếu xem tất cả thì lấy hết, nếu không thì phân trang 6 bài/trang
  const displayedPosts = showAll
    ? sortedPosts
    : sortedPosts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setShowAll(false);
    const elem = document.getElementById("news");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
    setCurrentPage(1);
    const elem = document.getElementById("news");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="news" className="section-snap relative w-full py-20 md:py-28 bg-[#07040d] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-bvntt-purple/6 blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="divider-h mb-14 md:mb-20" />

        {/* ── Section Header (Đã bỏ badge "Cổng thông tin & Truyền thông") ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <FadeUp>
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-bvntt-cream text-3xl sm:text-5xl md:text-6xl uppercase tracking-normal leading-tight">
                TIN TỨC & <span className="text-bvntt-lilac">SỰ KIỆN</span>
              </h2>
              <p className="text-sm sm:text-base text-bvntt-muted font-normal max-w-xl mx-auto leading-relaxed pt-1">
                Cập nhật thông báo tuyển sinh, lịch trình hoạt động và những khoảnh khắc thanh xuân rực rỡ nhất tại Bách khoa.
              </p>
            </div>
          </FadeUp>
        </div>

        {/* ── Category Filter Pills ── */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-10 md:mb-14">
          {CATEGORIES.map((cat) => {
            const active = selectedCategory === cat;
            const label = cat === "all" ? "Tất cả bài viết" : cat;
            return (
              <button
                key={cat}
                onClick={() => handleSelectCategory(cat)}
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

        {/* ── Posts Content: Layout 3 cột ── */}
        {sortedPosts.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.06] bg-white/[0.01] rounded">
            <p className="text-white/50 text-sm">Chưa có bài viết nào trong chuyên mục này.</p>
          </div>
        ) : (
          <div className="space-y-12">
            {/* 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <AnimatePresence mode="popLayout">
                {displayedPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.35, delay: idx * 0.05 }}
                    onClick={() => setActivePost(post)}
                    className="group border border-white/[0.08] hover:border-bvntt-lilac/40 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Thumbnail (Đã bỏ tag ghim nổi bật) */}
                      <div className="relative aspect-video w-full overflow-hidden bg-black/40 border-b border-white/[0.08]">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#07040d]/90 text-bvntt-lilac px-2.5 py-1 rounded border border-bvntt-lilac/30 backdrop-blur-sm shadow">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Details */}
                      <div className="p-5 sm:p-6 space-y-3">
                        <div className="flex items-center gap-3 text-xs text-white/45">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-bvntt-lilac/80" />
                            {new Date(post.publishedAt).toLocaleDateString("vi-VN")}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1.5 truncate">
                            <User className="w-3.5 h-3.5 text-bvntt-lilac/80" />
                            {post.author}
                          </span>
                        </div>

                        <h4 className="font-display font-bold text-xl sm:text-2xl text-bvntt-cream group-hover:text-bvntt-lilac transition-colors leading-snug line-clamp-2 uppercase">
                          {post.title}
                        </h4>

                        <p className="text-xs text-white/55 line-clamp-3 leading-relaxed font-sans">
                          {post.excerpt || post.content}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 sm:px-6 pb-5 pt-1 flex items-center justify-between border-t border-white/[0.05] mt-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-bvntt-lilac group-hover:underline">
                        Xem chi tiết
                      </span>
                      <ArrowRight className="w-3.5 h-3.5 text-bvntt-lilac group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>

            {/* ── Phân trang: Nút 1, 2... và "Xem tất cả" ── */}
            {sortedPosts.length > PAGE_SIZE && (
              <div className="flex flex-wrap items-center justify-center gap-2 pt-6 border-t border-white/[0.06]">
                {/* Previous Page Button */}
                {!showAll && (
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:border-bvntt-lilac/40 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Trang trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                )}

                {/* Page Number Buttons 1, 2, ... */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                  const isActive = !showAll && currentPage === pageNum;
                  return (
                    <button
                      key={pageNum}
                      onClick={() => handlePageChange(pageNum)}
                      className={`min-w-[40px] h-10 px-3 flex items-center justify-center text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer border ${
                        isActive
                          ? "bg-bvntt-lilac text-[#07040d] border-bvntt-lilac shadow-[0_0_15px_rgba(214,185,255,0.25)]"
                          : "bg-white/[0.02] text-white/70 border-white/[0.08] hover:text-white hover:border-bvntt-lilac/40 hover:bg-white/[0.05]"
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                {/* Next Page Button */}
                {!showAll && (
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:border-bvntt-lilac/40 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Trang kế tiếp"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

                {/* Button "Xem tất cả" */}
                <button
                  onClick={handleToggleShowAll}
                  className={`h-10 px-4 flex items-center justify-center text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer border ml-2 ${
                    showAll
                      ? "bg-bvntt-lilac text-[#07040d] border-bvntt-lilac shadow-[0_0_15px_rgba(214,185,255,0.25)]"
                      : "bg-white/[0.02] text-white/70 border-white/[0.08] hover:text-white hover:border-bvntt-lilac/40 hover:bg-white/[0.05]"
                  }`}
                >
                  {showAll ? "Thu gọn phân trang" : "Xem tất cả"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal (Đã bỏ tag ghim) */}
      <NewsModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
};
