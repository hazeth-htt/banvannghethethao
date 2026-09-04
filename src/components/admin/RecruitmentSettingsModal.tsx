import { useState, useEffect } from "react";
import { X, Check, Calendar, Plus, Trash2 } from "lucide-react";
import { RecruitmentSettings, RecruitmentStage } from "../../services/contentService";

interface RecruitmentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: RecruitmentSettings) => void;
  initialSettings: RecruitmentSettings;
}

export const RecruitmentSettingsModal = ({
  isOpen,
  onClose,
  onSave,
  initialSettings,
}: RecruitmentSettingsModalProps) => {
  const [formData, setFormData] = useState<RecruitmentSettings>(initialSettings);

  useEffect(() => {
    if (initialSettings) {
      setFormData({
        ...initialSettings,
        stages: initialSettings.stages.map((s) => ({ ...s })),
      });
    }
  }, [initialSettings, isOpen]);

  if (!isOpen) return null;

  const handleStageChange = (idx: number, field: keyof RecruitmentStage, val: string) => {
    const updatedStages = [...formData.stages];
    updatedStages[idx] = {
      ...updatedStages[idx],
      [field]: val,
    };
    setFormData({ ...formData, stages: updatedStages });
  };

  const handleAddStage = () => {
    setFormData({
      ...formData,
      stages: [
        ...formData.stages,
        {
          date: "01/10",
          fullDate: "01/10/2026",
          title: "Giai đoạn mới",
          description: "Mô tả giai đoạn tuyển sinh",
          status: "upcoming",
        },
      ],
    });
  };

  const handleRemoveStage = (idx: number) => {
    setFormData({
      ...formData,
      stages: formData.stages.filter((_, i) => i !== idx),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
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
              Cài đặt Đợt Tuyển thành viên & Timeline
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
          {/* General info */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Năm tuyển sinh</label>
              <input
                type="text"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none"
              />
            </div>
            <div className="space-y-1.5 sm:col-span-2">
              <label className="block font-semibold uppercase tracking-wider text-white/70">Tiêu đề đợt tuyển</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Tuyển thành viên đợt 1 - 2026"
                className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Tagline / Khẩu hiệu nổi bật</label>
            <input
              type="text"
              value={formData.tagline}
              onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
              placeholder="CHÍNH THỨC MỞ ĐƠN"
              className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none font-display uppercase tracking-wider"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block font-semibold uppercase tracking-wider text-white/70">Link Đơn Tuyển Chính (URL)</label>
            <input
              type="text"
              value={formData.formUrl}
              onChange={(e) => setFormData({ ...formData, formUrl: e.target.value })}
              placeholder="https://forms.gle/... hoặc /form"
              className="w-full bg-white/[0.04] border border-white/[0.1] px-3.5 py-2.5 text-sm text-white focus:border-bvntt-lilac outline-none font-mono text-xs"
            />
          </div>

          {/* Timeline Stages */}
          <div className="space-y-3 pt-3 border-t border-white/[0.08]">
            <div className="flex items-center justify-between">
              <label className="font-semibold uppercase tracking-wider text-white/80 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-bvntt-lilac" /> Các mốc thời gian Tuyển sinh (Timeline)
              </label>
              <button
                type="button"
                onClick={handleAddStage}
                className="flex items-center gap-1 text-[11px] font-semibold text-bvntt-lilac hover:text-white transition cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" /> Thêm mốc
              </button>
            </div>

            <div className="space-y-3">
              {formData.stages.map((stg, idx) => (
                <div key={idx} className="p-3.5 bg-white/[0.02] border border-white/[0.08] rounded space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-bvntt-lilac">
                      Mốc #{idx + 1}
                    </span>
                    {formData.stages.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveStage(idx)}
                        className="text-white/30 hover:text-red-400 transition cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[10px] text-white/50 uppercase">Ngày hiển thị</label>
                      <input
                        type="text"
                        value={stg.date}
                        onChange={(e) => handleStageChange(idx, "date", e.target.value)}
                        placeholder="01/09"
                        className="w-full bg-white/[0.03] border border-white/[0.08] px-2.5 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none font-display text-sm tracking-wider"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/50 uppercase">Tên mốc (Title)</label>
                      <input
                        type="text"
                        value={stg.title}
                        onChange={(e) => handleStageChange(idx, "title", e.target.value)}
                        placeholder="Mở đơn"
                        className="w-full bg-white/[0.03] border border-white/[0.08] px-2.5 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] text-white/50 uppercase">Trạng thái</label>
                      <select
                        value={stg.status}
                        onChange={(e) => handleStageChange(idx, "status", e.target.value as any)}
                        className="w-full bg-[#151022] border border-white/[0.08] px-2 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none"
                      >
                        <option value="completed">Đã diễn ra (Completed)</option>
                        <option value="active">Đang diễn ra (Active)</option>
                        <option value="upcoming">Sắp diễn ra (Upcoming)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-white/50 uppercase">Mô tả ngắn</label>
                    <input
                      type="text"
                      value={stg.description}
                      onChange={(e) => handleStageChange(idx, "description", e.target.value)}
                      placeholder="Chính thức phát động đợt tuyển thành viên mới trên toàn trường"
                      className="w-full bg-white/[0.03] border border-white/[0.08] px-2.5 py-1.5 text-xs text-white focus:border-bvntt-lilac outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

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
              <Check className="w-4 h-4" /> Lưu cài đặt
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
