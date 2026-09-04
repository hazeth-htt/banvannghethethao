import { useState, useEffect } from "react";
import { X, Check, AlertCircle, Pin } from "lucide-react";
import { ContentPost, PostCategory } from "../../services/contentService";

interface PostEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (post: ContentPost) => void;
  postToEdit: ContentPost | null;
}

const CATEGORIES: PostCategory[] = ["Thông báo", "Tin tức", "Sự kiện", "Tuyển sinh", "Hoạt động CLB"];

export const PostEditModal = ({ isOpen, onClose, onSave, postToEdit }: PostEditModalProps) => {
  const [formData, setFormData] = useState<Partial<ContentPost>>({
    title: "",
    slug: "",
    category: "Thông báo",
    author: "Ban Văn nghệ Thể thao",
    publishedAt: new Date().toISOString().slice(0, 10),
    coverImage: "",
    excerpt: "",
    content: "",
    status: "published",
    isPinned: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (postToEdit) {
      setFormData({ ...postToEdit });
    } else {
      setFormData({
        id: `post-${Date.now()}`,
        title: "",
        slug: "",
        category: "Thông báo",
        author: "Ban Chủ nhiệm BVNTT",
        publishedAt: new Date().toISOString().slice(0, 10),
        coverImage: "/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg",
        excerpt: "",
        content: "",
        status: "published",
        isPinned: false,
      });
    }
    setError("");
  }, [postToEdit, isOpen]);

  if (!isOpen) return null;

  const generateSlug = (text: string) => {
    return text
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[đĐ]/g, "d")
      .replace(/[^a-z0-9\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");
  };

  const handleTitleChange = (val: string) => {
    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: prev?.slug ? prev.slug : generateSlug(val),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      setError("Vui lòng nhập tiêu đề bài viết.");
      return;
    }

    const finalSlug = formData.slug?.trim() || generateSlug(formData.title || "bai-viet");
    const finalPost: ContentPost = {
      id: formData.id || `post-${Date.now()}`,
      title: formData.title.trim(),
      slug: finalSlug,
      category: formData.category || "Thông báo",
      author: formData.author?.trim() || "Ban Văn nghệ Thể thao",
      publishedAt: formData.publishedAt || new Date().toISOString().slice(0, 10),
      coverImage: formData.coverImage || "/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg",
      excerpt: formData.excerpt?.trim() || "",
      content: formData.content?.trim() || "",
      status: formData.status || "published",
      isPinned: !!formData.isPinned,
    };

    onSave(finalPost);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-[#0e0a17] border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-bvntt-lilac animate-pulse" />
            <h2 className="font-display font-bold text-lg uppercase tracking-wider text-bvntt-cream">
              {postToEdit ? "Chỉnh sửa Bài viết / Tin tức" : "Tạo Bài viết Mới"}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-white/50 hover:text-white transition-colors cursor-pointer rounded-lg hover:bg-white/[0.05]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1 text-xs">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title */}
          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">
              Tiêu đề bài viết <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="VD: Thông báo lịch phỏng vấn tuyển thành viên 2026"
              className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition"
            />
          </div>

          {/* Category & Author & Date */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Chuyên mục</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as PostCategory })}
                className="w-full bg-[#151022] border border-white/[0.1] px-3 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Người / Đơn vị đăng</label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                placeholder="Ban Chủ nhiệm BVNTT"
                className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Ngày đăng</label>
              <input
                type="date"
                value={formData.publishedAt}
                onChange={(e) => setFormData({ ...formData, publishedAt: e.target.value })}
                className="w-full bg-[#151022] border border-white/[0.1] px-3 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition"
              />
            </div>
          </div>

          {/* Status & Pin to top */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-3 bg-white/[0.02] border border-white/[0.06] rounded">
            <div className="flex items-center gap-3">
              <label className="font-semibold uppercase tracking-wider text-white/70">Trạng thái:</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "published" | "draft" })}
                className="bg-[#151022] border border-white/[0.1] px-3 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none cursor-pointer"
              >
                <option value="published">🟢 Đã xuất bản</option>
                <option value="draft">🟡 Bản nháp (Ẩn)</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="isPinned"
                checked={formData.isPinned}
                onChange={(e) => setFormData({ ...formData, isPinned: e.target.checked })}
                className="w-4 h-4 accent-bvntt-lilac cursor-pointer"
              />
              <label htmlFor="isPinned" className="text-white/80 cursor-pointer flex items-center gap-1.5 font-medium">
                <Pin className="w-3.5 h-3.5 text-bvntt-lilac" /> Ghim bài viết quan trọng lên đầu trang
              </label>
            </div>
          </div>

          {/* Cover Image URL */}
          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Ảnh bài viết (URL)</label>
            <input
              type="text"
              value={formData.coverImage}
              onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
              placeholder="/assets/events/... hoặc URL ảnh https://..."
              className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition font-mono text-xs"
            />
            {formData.coverImage && (
              <div className="relative w-full h-32 bg-black/40 border border-white/[0.08] overflow-hidden rounded mt-2">
                <img
                  src={formData.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Tóm tắt ngắn gọn</label>
            <textarea
              rows={2}
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="Tóm tắt 1-2 câu ngắn gọn về nội dung chính của bài..."
              className="w-full bg-white/[0.04] border border-white/[0.1] p-3 text-sm text-white focus:border-bvntt-lilac outline-none transition"
            />
          </div>

          {/* Full Content */}
          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Nội dung chi tiết bài viết</label>
            <textarea
              rows={6}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="Nhập toàn bộ nội dung bài viết ở đây (hỗ trợ xuống dòng)..."
              className="w-full bg-white/[0.04] border border-white/[0.1] p-3 text-sm text-white focus:border-bvntt-lilac outline-none transition leading-relaxed"
            />
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white border border-white/[0.1] transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 text-xs font-bold uppercase tracking-wider bg-bvntt-lilac text-[#07040d] hover:bg-bvntt-lilac/90 transition shadow-lg cursor-pointer"
            >
              <Check className="w-4 h-4" /> Lưu bài viết
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
