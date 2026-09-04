import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Calendar, User, Tag, Pin, Share2 } from "lucide-react";
import { ContentPost } from "../services/contentService";

interface NewsModalProps {
  post: ContentPost | null;
  onClose: () => void;
}

export const NewsModal = ({ post, onClose }: NewsModalProps) => {
  useEffect(() => {
    if (post) {
      document.body.style.overflow = "hidden";
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", handleKeyDown);
      return () => {
        document.body.style.overflow = "";
        window.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [post, onClose]);

  if (!post) return null;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Đã sao chép liên kết bài viết!");
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 md:p-10">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 w-full max-w-3xl max-h-[90vh] flex flex-col bg-[#0b0616] border border-white/[0.1] shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#0d071a]">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-bvntt-lilac/15 text-bvntt-lilac px-2.5 py-1 rounded border border-bvntt-lilac/30">
                <Tag className="w-3 h-3" />
                <span>{post.category}</span>
              </span>
              {post.isPinned && (
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/15 text-amber-400 px-2.5 py-1 rounded border border-amber-500/30">
                  <Pin className="w-3 h-3" />
                  <span>Tin ghim</span>
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 text-white/50 hover:text-bvntt-cream transition-colors rounded hover:bg-white/[0.05]"
                title="Chia sẻ bài viết"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 text-white/50 hover:text-white transition-colors rounded hover:bg-white/[0.05]"
                aria-label="Đóng"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 no-scrollbar">
            {/* Title */}
            <div className="space-y-3">
              <h1 className="font-display font-bold text-2xl sm:text-3xl md:text-4xl text-bvntt-cream leading-tight uppercase">
                {post.title}
              </h1>

              {/* Meta: Author & Date */}
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/50 border-b border-white/[0.06] pb-4">
                <div className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-bvntt-lilac" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-bvntt-lilac" />
                  <span>{new Date(post.publishedAt).toLocaleDateString("vi-VN")}</span>
                </div>
              </div>
            </div>

            {/* Cover Image */}
            {post.coverImage && (
              <div className="relative w-full aspect-video sm:max-h-80 overflow-hidden rounded bg-black/40 border border-white/[0.08]">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}

            {/* Excerpt Lead */}
            {post.excerpt && (
              <div className="p-4 bg-white/[0.02] border-l-2 border-bvntt-lilac text-sm text-bvntt-cream/90 font-medium italic leading-relaxed">
                {post.excerpt}
              </div>
            )}

            {/* Full Content */}
            <div className="text-sm text-white/80 leading-relaxed space-y-4 whitespace-pre-wrap font-sans">
              {post.content || post.excerpt}
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0d071a] flex items-center justify-between">
            <span className="text-xs text-white/40">Ban Văn nghệ Thể thao - ĐHBK Hà Nội</span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-bvntt-lilac text-[#07040d] text-xs font-bold uppercase tracking-wider hover:bg-bvntt-lilac/90 transition shadow cursor-pointer"
            >
              Đóng bài viết
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
