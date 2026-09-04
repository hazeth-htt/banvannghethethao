import { useState, useEffect } from "react";
import { X, Check, ExternalLink, Link2 } from "lucide-react";
import { ContentClub } from "../../services/contentService";
import { SingleImageUploader } from "./SingleImageUploader";
import { ImageGalleryManager } from "./ImageGalleryManager";

interface ClubEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (club: ContentClub) => void;
  clubToEdit: ContentClub | null;
}

export const ClubEditModal = ({ isOpen, onClose, onSave, clubToEdit }: ClubEditModalProps) => {
  const [formData, setFormData] = useState<Partial<ContentClub>>({});

  useEffect(() => {
    if (clubToEdit) {
      setFormData({
        ...clubToEdit,
        gallery: clubToEdit.gallery?.length ? [...clubToEdit.gallery] : [],
      });
    }
  }, [clubToEdit, isOpen]);

  if (!isOpen || !clubToEdit) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...clubToEdit,
      ...formData,
      gallery: formData.gallery?.filter((g) => g && g.trim()) || [],
    } as ContentClub);
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
              Cập nhật CLB: {clubToEdit.name}
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
          <div className="flex items-center gap-4 p-3 bg-white/[0.03] border border-white/[0.06] rounded">
            {formData.image && (
              <img
                src={formData.image}
                alt={clubToEdit.name}
                className="w-14 h-14 object-cover rounded border border-white/10"
              />
            )}
            <div>
              <p className="font-bold text-sm text-bvntt-cream">{clubToEdit.fullName}</p>
              <p className="text-[11px] text-bvntt-lilac">{clubToEdit.categoryLabel}</p>
              <p className="text-[10px] text-white/40">{clubToEdit.tag}</p>
            </div>
          </div>

          {/* Recruitment Status */}
          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">
              Trạng thái tuyển sinh của CLB
            </label>
            <select
              value={formData.recruitmentStatus || "open"}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  recruitmentStatus: e.target.value as "open" | "upcoming" | "closed",
                })
              }
              className="w-full bg-[#151022] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none cursor-pointer"
            >
              <option value="open">🟢 Đang mở đơn ứng tuyển</option>
              <option value="upcoming">🟡 Sắp mở đơn (Chuẩn bị)</option>
              <option value="closed">🔴 Đã tạm đóng đơn</option>
            </select>
          </div>

          {/* Recruitment URL */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block font-semibold uppercase tracking-wider text-white/70">
                Link Đơn Tuyển sinh (Google Form / Link đăng ký)
              </label>
              {formData.recruitmentUrl && (
                <a
                  href={formData.recruitmentUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 text-[11px] text-bvntt-lilac hover:underline"
                >
                  <ExternalLink className="w-3 h-3" /> Mở link
                </a>
              )}
            </div>
            <div className="relative">
              <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input
                type="text"
                value={formData.recruitmentUrl || ""}
                onChange={(e) => setFormData({ ...formData, recruitmentUrl: e.target.value })}
                placeholder="https://docs.google.com/forms/..."
                className="w-full bg-white/[0.04] border border-white/[0.1] pl-9 pr-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none transition font-mono text-xs"
              />
            </div>
            <p className="text-[10px] text-white/40">
              * Khi sinh viên bấm nút "Đăng ký tuyển thành viên" trên thẻ CLB, hệ thống sẽ mở trực tiếp link này.
            </p>
          </div>

          {/* Short Description */}
          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Mô tả ngắn CLB</label>
            <textarea
              rows={3}
              value={formData.shortDesc || ""}
              onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
              className="w-full bg-white/[0.04] border border-white/[0.1] p-3 text-sm text-white focus:border-bvntt-lilac outline-none transition"
            />
          </div>

          {/* Avatar / Main Image */}
          <SingleImageUploader
            label="Ảnh đại diện CLB"
            value={formData.image || ""}
            onChange={(url) => setFormData({ ...formData, image: url })}
            aspectRatio="square"
          />

          {/* Club Photos Gallery */}
          <ImageGalleryManager
            label="Bộ sưu tập ảnh hoạt động CLB"
            images={formData.gallery || []}
            onChange={(imgs) => setFormData({ ...formData, gallery: imgs })}
            onSetAsCover={(imgUrl) => setFormData({ ...formData, image: imgUrl })}
            coverImage={formData.image}
          />

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/[0.08]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white/60 hover:text-white border border-white/[0.1] transition cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2 text-xs font-bold uppercase tracking-wider bg-bvntt-lilac text-[#07040d] hover:bg-bvntt-lilac/90 transition shadow-lg cursor-pointer"
            >
              <Check className="w-4 h-4" /> Cập nhật CLB
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
