import { useState, useEffect } from "react";
import { X, Image as ImageIcon, Plus, Trash2, Check, AlertCircle } from "lucide-react";
import { ContentEvent } from "../../services/contentService";

interface EventEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: ContentEvent) => void;
  eventToEdit: ContentEvent | null;
}

export const EventEditModal = ({ isOpen, onClose, onSave, eventToEdit }: EventEditModalProps) => {
  const [formData, setFormData] = useState<Partial<ContentEvent>>({
    title: "",
    subtitle: "",
    slug: "",
    category: "Lễ hội Âm nhạc",
    timeframe: "Thường niên",
    coverImage: "",
    shortDescription: "",
    description: "",
    highlights: [""],
    gallery: [""],
    status: "published",
  });

  const [highlightInput, setHighlightInput] = useState("");
  const [galleryInput, setGalleryInput] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setFormData({
        ...eventToEdit,
        highlights: eventToEdit.highlights?.length ? [...eventToEdit.highlights] : [""],
        gallery: eventToEdit.gallery?.length ? [...eventToEdit.gallery] : [""],
      });
    } else {
      setFormData({
        id: `event-${Date.now()}`,
        slug: "",
        title: "",
        subtitle: "",
        category: "Lễ hội Âm nhạc",
        timeframe: "Thường niên hàng năm",
        coverImage: "/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg",
        shortDescription: "",
        description: "",
        highlights: ["Chương trình quy mô lớn", "Sự tham gia của các nghệ sĩ và CLB"],
        gallery: [],
        status: "published",
      });
    }
    setError("");
  }, [eventToEdit, isOpen]);

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

  const handleAddHighlight = () => {
    if (!highlightInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      highlights: [...(prev.highlights || []), highlightInput.trim()],
    }));
    setHighlightInput("");
  };

  const handleRemoveHighlight = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== idx),
    }));
  };

  const handleAddGalleryUrl = () => {
    if (!galleryInput.trim()) return;
    setFormData((prev) => ({
      ...prev,
      gallery: [...(prev.gallery || []), galleryInput.trim()],
    }));
    setGalleryInput("");
  };

  const handleRemoveGalleryUrl = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery?.filter((_, i) => i !== idx),
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title?.trim()) {
      setError("Vui lòng nhập tên sự kiện.");
      return;
    }

    const finalSlug = formData.slug?.trim() || generateSlug(formData.title || "su-kien");
    const finalEvent: ContentEvent = {
      id: formData.id || `event-${Date.now()}`,
      slug: finalSlug,
      title: formData.title || "",
      subtitle: formData.subtitle || "",
      category: formData.category || "Sự kiện",
      timeframe: formData.timeframe || "Thường niên",
      coverImage: formData.coverImage || "/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg",
      shortDescription: formData.shortDescription || "",
      description: formData.description || formData.shortDescription || "",
      highlights: formData.highlights?.filter((h) => h && h.trim()) || [],
      gallery: formData.gallery?.filter((g) => g && g.trim()) || [],
      status: formData.status || "published",
      publishedAt: formData.publishedAt || new Date().toISOString().slice(0, 10),
    };

    onSave(finalEvent);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-[#0e0a17] border border-white/[0.12] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-white/[0.02]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-bvntt-lilac animate-pulse" />
            <h2 className="font-display font-bold text-lg uppercase tracking-wider text-bvntt-cream">
              {eventToEdit ? "Chỉnh sửa Sự kiện" : "Thêm Sự kiện Mới"}
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
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1 text-xs">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-400 rounded">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Title & Slug */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-white/70">
                Tên sự kiện <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="VD: Chào tân sinh viên Bách khoa"
                className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Đường dẫn tĩnh (Slug)</label>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="chao-tan-sinh-vien"
                className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white/80 focus:border-bvntt-lilac outline-none transition font-mono text-xs"
              />
            </div>
          </div>

          {/* Subtitle & Category & Timeframe */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-1.5 md:col-span-1">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Phân loại</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-[#151022] border border-white/[0.1] px-3 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition cursor-pointer"
              >
                <option value="Lễ hội Âm nhạc">Lễ hội Âm nhạc</option>
                <option value="Cuộc thi Nhan sắc & Tài năng">Cuộc thi Nhan sắc & Tài năng</option>
                <option value="Cuộc thi Tài năng & Sáng tạo">Cuộc thi Tài năng & Sáng tạo</option>
                <option value="Thể thao & Hội thao">Thể thao & Hội thao</option>
                <option value="Chương trình Truyền thống">Chương trình Truyền thống</option>
                <option value="Hoạt động Giao lưu">Hoạt động Giao lưu</option>
              </select>
            </div>
            <div className="space-y-1.5 md:col-span-1">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Thời gian tổ chức</label>
              <input
                type="text"
                value={formData.timeframe}
                onChange={(e) => setFormData({ ...formData, timeframe: e.target.value })}
                placeholder="VD: Tháng 10 hàng năm"
                className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition"
              />
            </div>
            <div className="space-y-1.5 md:col-span-1">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Trạng thái hiển thị</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as "published" | "draft" })}
                className="w-full bg-[#151022] border border-white/[0.1] px-3 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition cursor-pointer"
              >
                <option value="published">🟢 Hiển thị công khai</option>
                <option value="draft">🟡 Bản nháp (Ẩn)</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Khẩu hiệu / Phụ đề ngắn</label>
            <input
              type="text"
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="VD: Đại nhạc hội bùng nổ mở đầu năm học mới"
              className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition"
            />
          </div>

          {/* Cover Image */}
          <div className="space-y-2">
            <label className="block font-semibold uppercase tracking-wider text-white/70">
              Đường dẫn Ảnh bìa (Cover Image URL)
            </label>
            <div className="flex gap-3 items-center">
              <input
                type="text"
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                placeholder="/assets/events/... hoặc https://..."
                className="flex-1 bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition"
              />
            </div>
            {formData.coverImage && (
              <div className="relative w-full h-36 bg-black/40 border border-white/[0.08] overflow-hidden rounded flex items-center justify-center">
                <img
                  src={formData.coverImage}
                  alt="Xem trước ảnh bìa"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />
                <span className="absolute bottom-2 right-2 bg-black/70 px-2 py-0.5 rounded text-[10px] text-white/70">
                  Xem trước ảnh bìa
                </span>
              </div>
            )}
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">
              Mô tả tóm tắt (Hiển thị ngoài thẻ sự kiện)
            </label>
            <textarea
              rows={2}
              value={formData.shortDescription}
              onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
              placeholder="Đoạn văn ngắn giới thiệu về sự kiện..."
              className="w-full bg-white/[0.04] border border-white/[0.1] p-3 text-sm text-white focus:border-bvntt-lilac outline-none transition"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">
              Nội dung chi tiết (Trang bài viết sự kiện)
            </label>
            <textarea
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Bài viết tường thuật chi tiết, ý nghĩa sự kiện..."
              className="w-full bg-white/[0.04] border border-white/[0.1] p-3 text-sm text-white focus:border-bvntt-lilac outline-none transition"
            />
          </div>

          {/* Highlights */}
          <div className="space-y-2">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Điểm nổi bật (Highlights)</label>
            <div className="space-y-2">
              {formData.highlights?.map((hl, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="text-bvntt-lilac font-bold text-xs">•</span>
                  <input
                    type="text"
                    value={hl}
                    onChange={(e) => {
                      const updated = [...(formData.highlights || [])];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, highlights: updated });
                    }}
                    className="flex-1 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveHighlight(idx)}
                    className="p-1.5 text-white/40 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Thêm điểm nổi bật mới..."
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddHighlight();
                    }
                  }}
                  className="flex-1 bg-white/[0.04] border border-white/[0.1] px-3 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none"
                />
                <button
                  type="button"
                  onClick={handleAddHighlight}
                  className="flex items-center gap-1 bg-white/[0.08] hover:bg-white/[0.15] text-white px-3 py-1.5 text-xs font-medium transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm
                </button>
              </div>
            </div>
          </div>

          {/* Gallery URLs */}
          <div className="space-y-2">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Bộ sưu tập ảnh (Gallery)</label>
            <div className="space-y-2">
              {formData.gallery?.map((url, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <ImageIcon className="w-3.5 h-3.5 text-bvntt-lilac flex-shrink-0" />
                  <input
                    type="text"
                    value={url}
                    onChange={(e) => {
                      const updated = [...(formData.gallery || [])];
                      updated[idx] = e.target.value;
                      setFormData({ ...formData, gallery: updated });
                    }}
                    className="flex-1 bg-white/[0.03] border border-white/[0.08] px-3 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveGalleryUrl(idx)}
                    className="p-1.5 text-white/40 hover:text-red-400 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Đường dẫn ảnh: /assets/events/... hoặc URL"
                  value={galleryInput}
                  onChange={(e) => setGalleryInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleAddGalleryUrl();
                    }
                  }}
                  className="flex-1 bg-white/[0.04] border border-white/[0.1] px-3 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none font-mono"
                />
                <button
                  type="button"
                  onClick={handleAddGalleryUrl}
                  className="flex items-center gap-1 bg-white/[0.08] hover:bg-white/[0.15] text-white px-3 py-1.5 text-xs font-medium transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" /> Thêm ảnh
                </button>
              </div>
            </div>
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
              <Check className="w-4 h-4" /> Lưu sự kiện
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
