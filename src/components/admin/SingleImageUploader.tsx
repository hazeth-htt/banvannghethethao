import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Link as LinkIcon, Loader2 } from "lucide-react";
import { compressImageFile } from "../../utils/imageUtils";

interface SingleImageUploaderProps {
  label: string;
  value: string;
  onChange: (url: string) => void;
  aspectRatio?: "video" | "square" | "banner";
  placeholderText?: string;
}

export const SingleImageUploader = ({
  label,
  value,
  onChange,
  aspectRatio = "video",
  placeholderText = "Chọn ảnh từ máy tính hoặc dán đường dẫn...",
}: SingleImageUploaderProps) => {
  const [loading, setLoading] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const dataUrl = await compressImageFile(file, 1400, 0.82);
      onChange(dataUrl);
    } catch (err) {
      console.error("Lỗi khi tải ảnh:", err);
      alert("Không thể đọc tệp ảnh. Vui lòng thử lại với định dạng JPG, PNG hoặc WebP.");
    } finally {
      setLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const aspectClass =
    aspectRatio === "square"
      ? "aspect-square max-w-[160px]"
      : aspectRatio === "banner"
      ? "aspect-[21/9] w-full max-h-48"
      : "aspect-video w-full max-h-48";

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="block font-semibold uppercase tracking-wider text-white/80 text-xs">
          {label}
        </label>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowUrlInput(!showUrlInput)}
            className="text-[11px] text-bvntt-lilac hover:text-white flex items-center gap-1 transition cursor-pointer"
          >
            <LinkIcon className="w-3 h-3" />
            <span>{showUrlInput ? "Ẩn nhập link" : "Dán link URL"}</span>
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-[11px] text-red-400 hover:text-red-300 flex items-center gap-1 transition cursor-pointer ml-2"
            >
              <X className="w-3 h-3" />
              <span>Gỡ ảnh</span>
            </button>
          )}
        </div>
      </div>

      {/* URL Input field toggle */}
      {showUrlInput && (
        <div className="flex items-center gap-2 mb-2 animate-in fade-in duration-200">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="/assets/events/... hoặc https://..."
            className="flex-1 bg-white/[0.04] border border-white/[0.1] px-3 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none font-mono"
          />
        </div>
      )}

      {/* Image Preview or Upload Trigger Area */}
      <div
        className={`relative ${aspectClass} bg-black/40 border border-white/[0.12] overflow-hidden rounded group flex items-center justify-center`}
      >
        {value ? (
          <>
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
            {/* Hover overlay with Change Photo button */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 p-3 backdrop-blur-xs">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={loading}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-bvntt-lilac text-[#07040d] font-bold text-xs uppercase tracking-wider hover:bg-bvntt-lilac/90 transition shadow-lg cursor-pointer"
              >
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Upload className="w-3.5 h-3.5" />}
                <span>Đổi ảnh</span>
              </button>
              <button
                type="button"
                onClick={() => onChange("")}
                className="flex items-center gap-1 px-2.5 py-1.5 bg-red-500/80 text-white font-semibold text-xs uppercase tracking-wider hover:bg-red-500 transition shadow-lg cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
                <span>Xóa</span>
              </button>
            </div>
          </>
        ) : (
          <div
            onClick={() => fileInputRef.current?.click()}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center cursor-pointer hover:bg-white/[0.03] transition border border-dashed border-white/20 hover:border-bvntt-lilac/50 rounded"
          >
            {loading ? (
              <Loader2 className="w-8 h-8 text-bvntt-lilac animate-spin mb-2" />
            ) : (
              <ImageIcon className="w-8 h-8 text-white/30 mb-2 group-hover:text-bvntt-lilac transition-colors" />
            )}
            <p className="text-xs text-white/70 font-medium group-hover:text-white transition">
              {loading ? "Đang xử lý và nén ảnh..." : placeholderText}
            </p>
            <p className="text-[10px] text-white/40 mt-1">Hỗ trợ JPG, PNG, WebP (Tự động nén tối ưu)</p>
          </div>
        )}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
