import { useState, useEffect } from "react";
import { X, Check, Calendar, Plus, Trash2, Lock, Unlock, AlertCircle, RotateCcw } from "lucide-react";
import { RecruitmentSettings, RecruitmentStage } from "../../services/contentService";

interface RecruitmentSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (settings: RecruitmentSettings) => void;
  initialSettings: RecruitmentSettings;
}

const DEFAULT_LOCKED_MSG =
  "Cổng tiếp nhận đơn đăng ký đợt tuyển thành viên hiện đã chính thức đóng lại. Cảm ơn tất cả các bạn đã dành thời gian và sự quan tâm tới Ban Văn nghệ Thể thao!";

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
        isFormLocked: !!initialSettings.isFormLocked,
        lockedMessage: initialSettings.lockedMessage || DEFAULT_LOCKED_MSG,
        lockReason: initialSettings.lockReason || "Đã hết hạn tiếp nhận đơn đăng ký",
        stages: initialSettings.stages ? initialSettings.stages.map((s) => ({ ...s })) : [],
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

          {/* Form Lock / Unlock Panel */}
          <div className="p-4 rounded border transition-all duration-300 space-y-4 bg-white/[0.02] border-white/[0.1]">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/[0.08]">
              <div className="flex items-start gap-2.5">
                <div
                  className={`w-8 h-8 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                    formData.isFormLocked
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {formData.isFormLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs uppercase tracking-wider text-bvntt-cream">
                      Trạng thái Cổng Đơn Đăng Ký
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        formData.isFormLocked
                          ? "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                          : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                      }`}
                    >
                      {formData.isFormLocked ? "Đang Khóa (Ngừng nhận đơn)" : "Đang Mở (Nhận hồ sơ)"}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 pt-0.5">
                    {formData.isFormLocked
                      ? "Trang /form hiển thị màn hình thông báo đóng đơn và từ chối nhận hồ sơ mới."
                      : "Ứng viên có thể truy cập /form để điền và nộp hồ sơ trực tuyến."}
                  </p>
                </div>
              </div>

              {/* Big Action Toggle Button */}
              <button
                type="button"
                onClick={() =>
                  setFormData({
                    ...formData,
                    isFormLocked: !formData.isFormLocked,
                  })
                }
                className={`flex items-center justify-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer shadow-md rounded flex-shrink-0 ${
                  formData.isFormLocked
                    ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                    : "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40"
                }`}
              >
                {formData.isFormLocked ? (
                  <>
                    <Unlock className="w-3.5 h-3.5" /> Mở lại cổng đơn
                  </>
                ) : (
                  <>
                    <Lock className="w-3.5 h-3.5" /> Khóa cổng đơn ngay
                  </>
                )}
              </button>
            </div>

            {/* If Form is Locked: Customization Fields */}
            {formData.isFormLocked && (
              <div className="space-y-3.5 pt-1">
                {/* Lock Reason */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-semibold uppercase tracking-wider text-rose-300 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-400" /> Lý do đóng cổng đơn
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Đã hết hạn tiếp nhận đơn đăng ký",
                      "Đã đủ số lượng chỉ tiêu hồ sơ",
                      "Đóng đơn để chuẩn bị cho Vòng Phỏng vấn",
                      "Tạm đóng cổng đơn để bảo trì",
                    ].map((reasonPreset) => (
                      <button
                        key={reasonPreset}
                        type="button"
                        onClick={() => setFormData({ ...formData, lockReason: reasonPreset })}
                        className={`text-[10px] px-2.5 py-1 rounded border transition-all cursor-pointer ${
                          formData.lockReason === reasonPreset
                            ? "bg-rose-500/25 border-rose-500/50 text-white font-medium"
                            : "bg-white/[0.03] border-white/[0.08] text-white/60 hover:text-white hover:bg-white/[0.06]"
                        }`}
                      >
                        {reasonPreset}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={formData.lockReason || ""}
                    onChange={(e) => setFormData({ ...formData, lockReason: e.target.value })}
                    placeholder="Nhập lý do đóng đơn cụ thể..."
                    className="w-full bg-white/[0.04] border border-white/[0.1] px-3 py-2 text-xs text-white focus:border-rose-400/70 outline-none"
                  />
                </div>

                {/* Closed Message */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-white/70">
                      Thông điệp hiển thị cho ứng viên khi vào Form
                    </label>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, lockedMessage: DEFAULT_LOCKED_MSG })}
                      className="flex items-center gap-1 text-[10px] text-bvntt-lilac hover:text-white transition cursor-pointer"
                    >
                      <RotateCcw className="w-3 h-3" /> Mẫu mặc định
                    </button>
                  </div>
                  <textarea
                    rows={3}
                    value={formData.lockedMessage || ""}
                    onChange={(e) => setFormData({ ...formData, lockedMessage: e.target.value })}
                    placeholder="Nhập thông điệp hiển thị khi ứng viên truy cập form..."
                    className="w-full bg-white/[0.04] border border-white/[0.1] px-3 py-2 text-xs text-white focus:border-rose-400/70 outline-none leading-relaxed resize-none"
                  />
                </div>
              </div>
            )}
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
