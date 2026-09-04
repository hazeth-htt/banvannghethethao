import { useState, useRef } from "react";
import {
  Upload,
  Plus,
  Trash2,
  Image as ImageIcon,
  Link as LinkIcon,
  Loader2,
  Star,
} from "lucide-react";
import { compressMultipleImageFiles } from "../../utils/imageUtils";

interface ImageGalleryManagerProps {
  label?: string;
  images: string[];
  onChange: (images: string[]) => void;
  onSetAsCover?: (imageUrl: string) => void;
  coverImage?: string;
}

export const ImageGalleryManager = ({
  label = "Bộ sưu tập ảnh (Gallery)",
  images = [],
  onChange,
  onSetAsCover,
  coverImage,
}: ImageGalleryManagerProps) => {
  const [loading, setLoading] = useState(false);
  const [urlInput, setUrlInput] = useState("");
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Xử lý khi chọn tệp từ máy tính (hỗ trợ nhiều ảnh cùng lúc)
  const handleFilesSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setLoading(true);
      const compressedDataUrls = await compressMultipleImageFiles(files);
      const updated = [...images, ...compressedDataUrls];
      onChange(updated);
    } catch (err) {
      console.error("Lỗi khi tải nhiều ảnh:", err);
      alert("Không thể đọc tệp ảnh. Vui lòng thử lại với định dạng JPG, PNG hoặc WebP.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Thêm ảnh từ URL dán vào
  const handleAddUrl = () => {
    if (!urlInput.trim()) return;
    onChange([...images, urlInput.trim()]);
    setUrlInput("");
    setShowUrlInput(false);
  };

  // Bớt ảnh (xóa ảnh tại vị trí index)
  const handleRemoveImage = (indexToRemove: number) => {
    const updated = images.filter((_, idx) => idx !== indexToRemove);
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      {/* Header with Title and Quick Add Buttons */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="block font-semibold uppercase tracking-wider text-white/80 text-xs">
            {label}
          </label>
          <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/10 text-white/70">
            {images.length} ảnh
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="flex items-center gap-1 text-[11px] text-white/60 hover:text-white px-2.5 py-1 rounded bg-white/[0.04] border border-white/[0.08] transition cursor-pointer"
          >
            <LinkIcon className="w-3 h-3 text-bvntt-lilac" />
            <span>{showUrlInput ? "Đóng nhập link" : "Dán link URL"}</span>
          </button>

          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            disabled={loading}
            className="flex items-center gap-1 text-[11px] font-bold text-[#07040d] bg-bvntt-lilac hover:bg-bvntt-lilac/90 px-3 py-1 uppercase tracking-wider transition shadow cursor-pointer disabled:opacity-50"
          >
            {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <Upload className="w-3 h-3" />}
            <span>Thêm ảnh từ máy</span>
          </button>
        </div>
      </div>

      {/* URL Input Form */}
      {showUrlInput && (
        <div className="flex gap-2 p-2.5 bg-white/[0.02] border border-white/[0.08] rounded animate-in fade-in duration-200">
          <input
            type="text"
            value={urlInput}
            onChange={(e) => setUrlInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddUrl();
              }
            }}
            placeholder="Dán link ảnh: /assets/... hoặc https://..."
            className="flex-1 bg-white/[0.04] border border-white/[0.1] px-3 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none font-mono"
          />
          <button
            type="button"
            onClick={handleAddUrl}
            className="flex items-center gap-1 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Thêm
          </button>
        </div>
      )}

      {/* Grid of Thumbnails */}
      {images.length === 0 ? (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="p-8 border border-dashed border-white/15 hover:border-bvntt-lilac/40 bg-white/[0.01] hover:bg-white/[0.025] rounded text-center cursor-pointer transition space-y-2"
        >
          {loading ? (
            <Loader2 className="w-8 h-8 text-bvntt-lilac animate-spin mx-auto" />
          ) : (
            <ImageIcon className="w-8 h-8 text-white/20 mx-auto" />
          )}
          <p className="text-xs text-white/60 font-medium">
            {loading ? "Đang xử lý tải ảnh..." : "Chưa có ảnh nào trong bộ sưu tập. Bấm vào đây để tải ảnh từ máy tính!"}
          </p>
          <p className="text-[10px] text-white/40">Có thể chọn nhiều tệp ảnh cùng lúc (JPG, PNG, WebP)</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((imgUrl, idx) => {
            const isCover = coverImage === imgUrl;
            return (
              <div
                key={idx}
                className={`group relative aspect-video bg-black/50 border overflow-hidden rounded transition-all duration-200 ${
                  isCover ? "border-bvntt-lilac ring-1 ring-bvntt-lilac" : "border-white/[0.1] hover:border-white/30"
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Ảnh #${idx + 1}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = "none";
                  }}
                />

                {/* Index badge */}
                <span className="absolute top-1.5 left-1.5 bg-black/70 text-white/80 text-[9px] font-bold px-1.5 py-0.5 rounded backdrop-blur-xs">
                  #{idx + 1}
                </span>

                {/* Is Cover Indicator */}
                {isCover && (
                  <span className="absolute bottom-1.5 left-1.5 bg-bvntt-lilac text-[#07040d] text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded shadow">
                    Ảnh bìa
                  </span>
                )}

                {/* Hover Action Overlay */}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 p-2 backdrop-blur-xs">
                  {onSetAsCover && !isCover && (
                    <button
                      type="button"
                      onClick={() => onSetAsCover(imgUrl)}
                      className="p-1.5 rounded bg-white/20 hover:bg-bvntt-lilac text-white hover:text-[#07040d] transition cursor-pointer"
                      title="Đặt làm ảnh bìa"
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  )}

                  {/* Nút xóa ảnh (bớt ảnh) */}
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(idx)}
                    className="p-1.5 rounded bg-red-500/80 hover:bg-red-500 text-white transition cursor-pointer shadow"
                    title="Xoá ảnh này"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}

          {/* "+ Thêm ảnh" slot in the grid */}
          <div
            onClick={() => fileInputRef.current?.click()}
            className="aspect-video border border-dashed border-white/20 hover:border-bvntt-lilac/60 bg-white/[0.02] hover:bg-white/[0.04] rounded flex flex-col items-center justify-center cursor-pointer transition text-white/50 hover:text-white"
            title="Thêm ảnh từ máy tính"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin text-bvntt-lilac" />
            ) : (
              <>
                <Plus className="w-5 h-5 mb-1" />
                <span className="text-[10px] font-semibold uppercase tracking-wider">Thêm ảnh</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Hidden Multi-file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleFilesSelected}
        className="hidden"
      />
    </div>
  );
};
