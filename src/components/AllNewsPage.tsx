import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  User,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Search,
  ArrowLeft,
  Newspaper,
  Tag,
} from "lucide-react";
import {
  ContentPost,
  PostCategory,
  getStoredPosts,
  CONTENT_UPDATED_EVENT,
} from "../services/contentService";
import { NewsModal } from "./NewsModal";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MouseGradient } from "./MouseGradient";

const CATEGORIES: ("all" | PostCategory)[] = [
  "all",
  "Thông báo",
  "Tin tức",
  "Sự kiện",
  "Tuyển sinh",
  "Hoạt động CLB",
];

const PAGE_SIZE = 9; // 3 cột x 3 hàng

interface AllNewsPageProps {
  onBack: () => void;
  onNavigateToHomeSection?: (sectionId: string) => void;
  onNavigateToPage?: (path: string) => void;
}

export const AllNewsPage = ({
  onBack,
  onNavigateToHomeSection,
  onNavigateToPage,
}: AllNewsPageProps) => {
  const [posts, setPosts] = useState<ContentPost[]>(() => {
    return getStoredPosts().filter((p) => p.status === "published");
  });

  const [selectedCategory, setSelectedCategory] = useState<"all" | PostCategory>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [activePost, setActivePost] = useState<ContentPost | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const handleUpdate = () => {
      setPosts(getStoredPosts().filter((p) => p.status === "published"));
    };
    window.addEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
  }, []);

  const filteredPosts = useMemo(() => {
    return posts.filter((p) => {
      const matchCat = selectedCategory === "all" || p.category === selectedCategory;
      const matchSearch =
        searchTerm.trim() === "" ||
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.author && p.author.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchCat && matchSearch;
    });
  }, [posts, selectedCategory, searchTerm]);

  // Sort: newest first
  const sortedPosts = useMemo(() => {
    return [...filteredPosts].sort(
      (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    );
  }, [filteredPosts]);

  const totalPages = Math.ceil(sortedPosts.length / PAGE_SIZE) || 1;

  const displayedPosts = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return sortedPosts.slice(start, start + PAGE_SIZE);
  }, [sortedPosts, currentPage]);

  const handleSelectCategory = (cat: "all" | PostCategory) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

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
          {/* Top Back Navigation Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Quay lại Trang chủ</span>
            </button>

            <div className="text-xs text-bvntt-muted">
              <span>Đang hiển thị <strong className="text-bvntt-cream">{sortedPosts.length}</strong> bài viết</span>
            </div>
          </div>

          {/* Hero Header */}
          <div className="max-w-4xl mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] uppercase text-bvntt-lilac mb-3 px-3 py-1 bg-bvntt-lilac/10 border border-bvntt-lilac/20">
              <Newspaper className="w-3.5 h-3.5" />
              <span>Thông tin chính thức & Sự kiện</span>
            </div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-bvntt-cream leading-tight tracking-normal">
              TỔNG HỢP <span className="text-bvntt-lilac">TIN TỨC & SỰ KIỆN</span>
            </h1>
            <p className="text-sm sm:text-base text-bvntt-muted font-normal max-w-2xl mt-4 leading-relaxed">
              Cập nhật liên tục các thông báo quan trọng, lịch trình hoạt động, tuyển thành viên và những khoảnh khắc thanh xuân rực rỡ nhất tại Đại học Bách khoa Hà Nội.
            </p>
          </div>

          {/* Search & Filter Controls */}
          <div className="space-y-5 mb-12">
            {/* Search Input */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết theo tiêu đề, tác giả..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
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
          </div>

          {/* Posts Grid */}
          {sortedPosts.length === 0 ? (
            <div className="text-center py-20 border border-white/[0.06] bg-[#0d071a]/50 p-8">
              <p className="text-white/60 text-base mb-3">Không có bài viết nào phù hợp với tìm kiếm của bạn.</p>
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
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                <AnimatePresence mode="popLayout">
                  {displayedPosts.map((post, idx) => (
                    <motion.article
                      key={post.id}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.45, delay: idx * 0.04 }}
                      onClick={() => setActivePost(post)}
                      className="group flex flex-col bg-[#0d071a] border border-white/[0.08] hover:border-bvntt-lilac/50 transition-all duration-400 overflow-hidden cursor-pointer shadow-xl hover:shadow-[0_10px_30px_rgba(214,185,255,0.1)]"
                    >
                      {/* Image Preview */}
                      <div className="relative aspect-[16/10] overflow-hidden bg-black/40">
                        <img
                          src={post.coverImage || "/assets/cover2.jpg"}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0d071a] via-transparent to-transparent opacity-80" />

                        {/* Category Badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2.5 py-1 text-[10px] font-semibold tracking-wider uppercase bg-[#07040d]/90 text-bvntt-lilac border border-bvntt-lilac/30 backdrop-blur-md">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                        <div className="space-y-2.5">
                          {/* Date & Author */}
                          <div className="flex items-center gap-4 text-[11px] text-white/50 font-sans">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-bvntt-lilac/70" />
                              {post.publishedAt}
                            </span>
                            {post.author && (
                              <span className="flex items-center gap-1.5">
                                <User className="w-3.5 h-3.5 text-bvntt-lilac/70" />
                                {post.author}
                              </span>
                            )}
                          </div>

                          {/* Post Title */}
                          <h2 className="font-display font-bold text-xl sm:text-2xl text-bvntt-cream group-hover:text-bvntt-lilac transition-colors leading-snug line-clamp-2 uppercase">
                            {post.title}
                          </h2>

                          {/* Summary */}
                          <p className="text-xs sm:text-sm text-bvntt-muted line-clamp-3 leading-relaxed font-normal">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Footer / Read More */}
                        <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                          <span className="text-[11px] text-white/40 uppercase tracking-wider flex items-center gap-1">
                            <Tag className="w-3 h-3 text-bvntt-lilac/60" />
                            {post.category}
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-muted group-hover:text-bvntt-lilac transition-colors">
                            Đọc bài viết
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          </span>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </AnimatePresence>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex flex-wrap items-center justify-center gap-2 pt-8 border-t border-white/[0.06]">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                    className="p-2 border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:border-bvntt-lilac/40 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Trang trước"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>

                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => {
                    const isActive = currentPage === pageNum;
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

                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                    className="p-2 border border-white/[0.08] bg-white/[0.02] text-white/60 hover:text-white hover:border-bvntt-lilac/40 disabled:opacity-30 disabled:pointer-events-none transition-colors cursor-pointer"
                    title="Trang kế tiếp"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Detail Modal */}
      <NewsModal post={activePost} onClose={() => setActivePost(null)} />

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
