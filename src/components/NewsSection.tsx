import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, User, ArrowRight, Pin, Sparkles } from "lucide-react";
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

export const NewsSection = () => {
  const [posts, setPosts] = useState<ContentPost[]>(() => {
    return getStoredPosts().filter((p) => p.status === "published");
  });
  const [selectedCategory, setSelectedCategory] = useState<"all" | PostCategory>("all");
  const [activePost, setActivePost] = useState<ContentPost | null>(null);

  useEffect(() => {
    const handleUpdate = () => {
      setPosts(getStoredPosts().filter((p) => p.status === "published"));
    };
    window.addEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
  }, []);

  // Filter posts
  const filteredPosts = posts.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  // Sort: pinned first, then by published date descending
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
  });

  // Featured post: top pinned post if available
  const featuredPost = sortedPosts.length > 0 ? sortedPosts[0] : null;
  const remainingPosts = sortedPosts.slice(1);

  return (
    <section id="news" className="section-snap relative w-full py-20 md:py-28 bg-[#07040d] overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-bvntt-purple/6 blur-[180px] pointer-events-none" />

      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
        <div className="divider-h mb-14 md:mb-20" />

        {/* ── Section Header ── */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 md:mb-16 space-y-3">
          <FadeUp>
            <div className="space-y-3">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-bvntt-lilac/10 border border-bvntt-lilac/25 text-[11px] font-semibold uppercase tracking-[0.14em] text-bvntt-lilac">
                <Sparkles className="w-3 h-3" />
                <span>Cổng thông tin & Truyền thông</span>
              </div>
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

        {/* ── Posts Content ── */}
        {sortedPosts.length === 0 ? (
          <div className="text-center py-20 border border-white/[0.06] bg-white/[0.01] rounded">
            <p className="text-white/50 text-sm">Chưa có bài viết nào trong chuyên mục này.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Featured Hero Article (If exists) */}
            {featuredPost && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                onClick={() => setActivePost(featuredPost)}
                className="group relative border border-white/[0.1] hover:border-bvntt-lilac/40 bg-white/[0.02] hover:bg-white/[0.035] transition-all duration-300 cursor-pointer overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-6 p-6 sm:p-8"
              >
                {/* Image */}
                <div className="lg:col-span-7 aspect-video sm:aspect-[16/10] overflow-hidden rounded bg-black/40 border border-white/10 relative">
                  <img
                    src={featuredPost.coverImage}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-bvntt-lilac text-[#07040d] px-2.5 py-1 rounded shadow">
                      {featuredPost.category}
                    </span>
                    {featuredPost.isPinned && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-black px-2.5 py-1 rounded shadow">
                        <Pin className="w-3 h-3" /> Ghim nổi bật
                      </span>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 text-xs text-white/50">
                      <span className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5 text-bvntt-lilac" />
                        {featuredPost.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-bvntt-lilac" />
                        {new Date(featuredPost.publishedAt).toLocaleDateString("vi-VN")}
                      </span>
                    </div>

                    <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-bvntt-cream group-hover:text-bvntt-lilac transition-colors leading-tight uppercase">
                      {featuredPost.title}
                    </h3>

                    <p className="text-sm text-bvntt-muted leading-relaxed line-clamp-4 pt-1 font-sans">
                      {featuredPost.excerpt || featuredPost.content}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/[0.08] flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-bvntt-lilac group-hover:translate-x-1 transition-transform">
                    <span>Đọc toàn bộ bài viết</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Grid of Remaining Articles */}
            {remainingPosts.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                {remainingPosts.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    onClick={() => setActivePost(post)}
                    className="group border border-white/[0.08] hover:border-bvntt-lilac/40 bg-white/[0.02] hover:bg-white/[0.035] transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
                  >
                    <div>
                      {/* Thumbnail */}
                      <div className="relative aspect-video w-full overflow-hidden bg-black/40 border-b border-white/[0.08]">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-[#07040d]/90 text-bvntt-lilac px-2 py-0.5 rounded border border-bvntt-lilac/30">
                            {post.category}
                          </span>
                          {post.isPinned && (
                            <span className="inline-flex items-center gap-0.5 text-[9px] font-bold uppercase tracking-wider bg-amber-500/90 text-black px-1.5 py-0.5 rounded">
                              <Pin className="w-2.5 h-2.5" /> Ghim
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Info */}
                      <div className="p-5 space-y-2.5">
                        <div className="flex items-center gap-3 text-[11px] text-white/40">
                          <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
                          <span>•</span>
                          <span className="truncate">{post.author}</span>
                        </div>

                        <h4 className="font-display font-bold text-xl text-bvntt-cream group-hover:text-bvntt-lilac transition-colors leading-snug line-clamp-2 uppercase">
                          {post.title}
                        </h4>

                        <p className="text-xs text-white/50 line-clamp-2 leading-relaxed pt-1 font-sans">
                          {post.excerpt || post.content}
                        </p>
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-bvntt-muted group-hover:text-bvntt-lilac transition-colors">
                      <span>Xem chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </motion.article>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <NewsModal post={activePost} onClose={() => setActivePost(null)} />
    </section>
  );
};
