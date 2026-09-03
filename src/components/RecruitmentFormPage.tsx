import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { submitApplication } from "../services/dbService";

interface RecruitmentFormPageProps {
  onBack?: () => void;
}

type Step = "common" | "division_select" | "to_chuc" | "truyen_thong" | "media_design" | "doi_ngoai" | "final" | "success";

interface FormData {
  // Common
  hoTen: string;
  mssv: string;
  khoa: string;
  truongKhoa: string;
  lop: string;
  sdt: string;
  facebook: string;
  email: string;
  bietGi: string;
  lyDo: string;
  mang: string;
  // To chuc
  tc_diemManh: string;
  tc_phucHop: string;
  tc_hoatDong: string;
  tc_phamChat: string;
  tc_suKien: string;
  tc_mongMuon: string;
  // Truyen thong
  tt_hieu: string;
  tt_yeuTo: string;
  tt_sienang: string;
  tt_kinh_nghiem: string;
  // Media Design
  md_mongMuon: string;
  md_portfolio: string;
  md_tieumang: string;
  // Media
  med_daLamGi: string;
  med_anhDep: string;
  med_chuanBi: string;
  med_themDesign: string;
  // Design
  des_congCu: string;
  des_toiNao: string;
  des_uuTien: string;
  des_suaHet: string;
  des_depMaNhung: string;
  // Doi ngoai
  dn_bietGi: string;
  dn_kinhNghiem: string;
  dn_giaotiep: string;
  dn_kyNang: string;
  dn_nhom: string;
  // Final
  goiY: string;
}

const initialData: FormData = {
  hoTen: "", mssv: "", khoa: "", truongKhoa: "", lop: "", sdt: "", facebook: "", email: "",
  bietGi: "", lyDo: "", mang: "",
  tc_diemManh: "", tc_phucHop: "", tc_hoatDong: "", tc_phamChat: "", tc_suKien: "", tc_mongMuon: "",
  tt_hieu: "", tt_yeuTo: "", tt_sienang: "", tt_kinh_nghiem: "",
  md_mongMuon: "", md_portfolio: "", md_tieumang: "",
  med_daLamGi: "", med_anhDep: "", med_chuanBi: "", med_themDesign: "",
  des_congCu: "", des_toiNao: "", des_uuTien: "", des_suaHet: "", des_depMaNhung: "",
  dn_bietGi: "", dn_kinhNghiem: "", dn_giaotiep: "", dn_kyNang: "", dn_nhom: "",
  goiY: "",
};

const TextInput = ({ label, value, onChange, required, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string }) => (
  <div className="space-y-2">
    <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-cream/80">
      {label}{required && <span className="text-bvntt-lilac ml-1">*</span>}
    </label>
    <input
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-white/[0.04] border border-white/[0.1] text-bvntt-cream text-sm px-4 py-3 outline-none focus:border-bvntt-lilac/60 focus:bg-white/[0.06] transition-all duration-200 placeholder:text-white/20 font-normal"
    />
  </div>
);

const TextArea = ({ label, value, onChange, required, rows = 4, placeholder = "" }: { label: string; value: string; onChange: (v: string) => void; required?: boolean; rows?: number; placeholder?: string }) => (
  <div className="space-y-2">
    <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-cream/80">
      {label}{required && <span className="text-bvntt-lilac ml-1">*</span>}
    </label>
    <textarea
      value={value}
      onChange={e => onChange(e.target.value)}
      rows={rows}
      placeholder={placeholder}
      className="w-full bg-white/[0.04] border border-white/[0.1] text-bvntt-cream text-sm px-4 py-3 outline-none focus:border-bvntt-lilac/60 focus:bg-white/[0.06] transition-all duration-200 resize-none placeholder:text-white/20 font-normal leading-relaxed"
    />
  </div>
);
const SelectInput = ({ label, value, onChange, options, required, placeholder = "Chọn một mục" }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean; placeholder?: string }) => (
  <div className="space-y-2">
    <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-cream/80">
      {label}{required && <span className="text-bvntt-lilac ml-1">*</span>}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full bg-white/[0.04] border border-white/[0.1] text-sm px-4 py-3 outline-none focus:border-bvntt-lilac/60 focus:bg-white/[0.06] transition-all duration-200 font-normal appearance-none pr-10 cursor-pointer ${value ? "text-bvntt-cream" : "text-white/30"
          }`}
      >
        <option value="" disabled className="bg-[#07040d] text-white/40">{placeholder}</option>
        {options.map(opt => (
          <option key={opt} value={opt} className="bg-[#0d0919] text-bvntt-cream">{opt}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/40">
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
          <path d="M1 1L6 6L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  </div>
);

const RadioGroup = ({ label, value, onChange, options, required }: { label: string; value: string; onChange: (v: string) => void; options: string[]; required?: boolean }) => (
  <div className="space-y-3">
    <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-cream/80">
      {label}{required && <span className="text-bvntt-lilac ml-1">*</span>}
    </label>
    <div className="space-y-2">
      {options.map(opt => (
        <button key={opt} type="button" onClick={() => onChange(opt)}
          className={`w-full text-left px-4 py-3 border text-sm transition-all duration-200 ${value === opt ? "border-bvntt-lilac bg-bvntt-lilac/10 text-bvntt-cream" : "border-white/[0.1] bg-white/[0.02] text-bvntt-muted hover:border-white/20 hover:bg-white/[0.04]"}`}>
          <span className={`inline-block w-3.5 h-3.5 rounded-full border mr-3 flex-shrink-0 align-middle ${value === opt ? "border-bvntt-lilac bg-bvntt-lilac" : "border-white/30"}`} />
          {opt}
        </button>
      ))}
    </div>
  </div>
);

const SectionHeader = ({ title, note }: { title: string; note?: string }) => (
  <div className="border-b border-white/[0.08] pb-5 mb-8">
    <h2 className="font-display font-bold text-2xl sm:text-3xl text-bvntt-cream uppercase tracking-normal">{title}</h2>
    {note && <p className="text-xs text-bvntt-muted mt-2 font-normal leading-relaxed">{note}</p>}
  </div>
);

export const RecruitmentFormPage = ({ onBack }: RecruitmentFormPageProps) => {
  const [step, setStep] = useState<Step>("common");
  const [data, setData] = useState<FormData>(initialData);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => { window.scrollTo({ top: 0 }); }, [step]);

  const set = (field: keyof FormData) => (v: string) => setData(d => ({ ...d, [field]: v }));

  const handleMangSelect = (mang: string) => {
    setData(d => ({ ...d, mang }));
    if (mang === "Mảng Tổ chức") setStep("to_chuc");
    else if (mang === "Mảng Truyền thông") setStep("truyen_thong");
    else if (mang === "Mảng Media - Design") setStep("media_design");
    else if (mang === "Mảng Đối ngoại") setStep("doi_ngoai");
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 800));
    // Build answers object for mảng-specific questions
    const answers: Record<string, string> = {};
    if (data.mang === "Mảng Tổ chức") {
      answers["Ba điểm mạnh và yếu"] = data.tc_diemManh;
      answers["Điểm mạnh phù hợp mảng TC"] = data.tc_phucHop;
      answers["Hoạt động từng tham gia"] = data.tc_hoatDong;
      answers["Phẩm chất quan trọng"] = data.tc_phamChat;
      answers["Sự kiện thành công là gì"] = data.tc_suKien;
      answers["Mong muốn đóng góp"] = data.tc_mongMuon;
    } else if (data.mang === "Mảng Truyền thông") {
      answers["Truyền thông là gì"] = data.tt_hieu;
      answers["Yếu tố chiến dịch TT"] = data.tt_yeuTo;
      answers["Siêu năng lực"] = data.tt_sienang;
      answers["Kinh nghiệm TT"] = data.tt_kinh_nghiem;
    } else if (data.mang === "Mảng Media - Design") {
      answers["Tiểu mảng"] = data.md_tieumang;
      answers["Mong muốn học"] = data.md_mongMuon;
      answers["Portfolio"] = data.md_portfolio;
      if (data.md_tieumang !== "Design") {
        answers["[Media] Đã làm gì"] = data.med_daLamGi;
        answers["[Media] Ảnh đẹp cần gì"] = data.med_anhDep;
        answers["[Media] Chuẩn bị"] = data.med_chuanBi;
      }
      if (data.md_tieumang !== "Media") {
        answers["[Design] Công cụ"] = data.des_congCu;
        answers["[Design] Thiết kế tốt"] = data.des_toiNao;
        answers["[Design] Ưu tiên"] = data.des_uuTien;
        answers["[Design] Khi bị sửa toàn bộ"] = data.des_suaHet;
        answers["[Design] Đẹp nhưng sai TT"] = data.des_depMaNhung;
      }
    } else if (data.mang === "Mảng Đối ngoại") {
      answers["Biết gì về ĐN"] = data.dn_bietGi;
      answers["Kinh nghiệm"] = data.dn_kinhNghiem;
      answers["Tự đánh giá giao tiếp"] = data.dn_giaotiep;
      answers["3 kỹ năng ĐN"] = data.dn_kyNang;
      answers["Nhóm hay một mình"] = data.dn_nhom;
    }
    await submitApplication({
      hoTen: data.hoTen, mssv: data.mssv, khoa: data.khoa, truongKhoa: data.truongKhoa,
      lop: data.lop, sdt: data.sdt, facebook: data.facebook, email: data.email,
      bietGi: data.bietGi, lyDo: data.lyDo, mang: data.mang, answers,
    });
    setSubmitting(false);
    setStep("success");
  };

  const stepVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -16, transition: { duration: 0.22 } },
  };

  return (
    <div className="min-h-screen bg-[#07040d] text-white flex flex-col">
      {/* Sticky header */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#07040d]/90 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          <div className="flex items-center justify-between h-16 md:h-20">
            <button onClick={onBack} className="flex items-center gap-2 text-bvntt-muted hover:text-bvntt-cream transition-colors duration-300 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-300" />
              <span className="text-[11px] font-medium tracking-[0.08em] uppercase">Quay lại</span>
            </button>
            <a href="/" className="flex items-center gap-3">
              <img src="/Logo Ban@4x.png" alt="Logo" className="w-8 h-11 object-contain" />
              <div>
                <div className="font-sans text-[11px] font-bold tracking-[0.06em] uppercase text-bvntt-cream leading-none">BAN VĂN NGHỆ THỂ THAO</div>
                <div className="font-sans text-[9px] tracking-[0.08em] uppercase text-bvntt-muted leading-none mt-1">Đoàn thanh niên ĐHBK Hà Nội</div>
              </div>
            </a>
            <div className="w-24" />
          </div>
        </div>
      </header>

      <main className="flex-1 pt-16 md:pt-20">
        {/* Hero */}
        <div className="relative py-14 md:py-18 bg-gradient-to-b from-[#0d0919] to-[#07040d] overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-bvntt-purple/10 blur-[100px] pointer-events-none" />
          <div className="relative z-10 max-w-2xl mx-auto text-center px-6">
            <div className="inline-block text-[10px] font-semibold tracking-[0.2em] uppercase text-bvntt-lilac mb-4 border border-bvntt-lilac/30 px-4 py-1.5">Tuyển thành viên 2026</div>
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl uppercase leading-tight text-bvntt-cream mb-4">
              ĐĂNG KÝ<br /><span className="text-bvntt-lilac">GIA NHẬP BAN</span>
            </h1>
            <p className="text-sm text-bvntt-muted font-normal leading-relaxed max-w-lg mx-auto">
              Điền đầy đủ thông tin bên dưới. Form sẽ hướng dẫn bạn qua từng phần theo mảng bạn ứng tuyển.
            </p>
          </div>
        </div>

        {/* Form Progress Bar */}
        <div className="bg-[#0d0919] border-y border-white/[0.06] py-5 px-6">
          <div className="max-w-2xl mx-auto flex items-center justify-center">
            {[
              { label: "Thông tin cá nhân", done: ["division_select", "to_chuc", "truyen_thong", "media_design", "doi_ngoai", "final", "success"].includes(step), active: step === "common" },
              { label: "Mảng chuyên môn", done: ["final", "success"].includes(step), active: ["division_select", "to_chuc", "truyen_thong", "media_design", "doi_ngoai"].includes(step) },
              { label: "Hoàn thành", done: step === "success", active: step === "final" },
            ].map((s, i, arr) => (
              <div key={i} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[9px] font-bold transition-all duration-300 ${s.done ? "border-bvntt-purple bg-bvntt-purple/30 text-bvntt-cream"
                      : s.active ? "border-bvntt-lilac bg-bvntt-lilac/10 text-bvntt-lilac shadow-[0_0_12px_rgba(214,185,255,0.4)]"
                        : "border-white/20 text-white/20"
                    }`}>
                    {s.done ? "✓" : i + 1}
                  </div>
                  <div className={`text-[10px] font-medium tracking-[0.05em] uppercase transition-colors duration-300 ${s.done ? "text-bvntt-cream" : s.active ? "text-bvntt-lilac" : "text-white/25"
                    }`}>{s.label}</div>
                </div>
                {i < arr.length - 1 && (
                  <div className={`w-10 sm:w-16 h-px mx-3 transition-colors duration-500 ${arr[i].done ? "bg-bvntt-purple/40" : "bg-white/[0.08]"
                    }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="py-12 md:py-16 px-6">
          <div className="max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {/* ── STEP: Common ── */}
              {step === "common" && (
                <motion.div key="common" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <SectionHeader title="Câu hỏi chung" note="Điền đầy đủ thông tin cá nhân của bạn trước khi bắt đầu." />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <TextInput label="Họ và tên" value={data.hoTen} onChange={set("hoTen")} required />
                    <TextInput label="MSSV" value={data.mssv} onChange={set("mssv")} required />
                    <SelectInput
                      label="Bạn là khoá?"
                      value={data.khoa}
                      onChange={set("khoa")}
                      required
                      options={["K71", "K70", "K69", "K68"]}
                    />
                    <SelectInput
                      label="Trường / Khoa"
                      value={data.truongKhoa}
                      onChange={set("truongKhoa")}
                      required
                      options={[
                        "Trường Cơ khí",
                        "Trường Điện - Điện tử",
                        "Trường Công nghệ Thông tin và Truyền thông",
                        "Trường Hóa và Khoa học sự sống",
                        "Trường Vật liệu",
                        "Trường Công nghệ công nghiệp",
                        "Trường Xây dựng và Môi trường",
                        "Khoa Toán - Tin",
                        "Khoa Vật lý kỹ thuật",
                        "Khoa Kinh tế và Quản lý",
                        "Khoa Ngoại ngữ",
                        "Viện Đào tạo Quốc tế (TROY)",
                        "Khác",
                      ]}
                    />
                    <TextInput label="Lớp" value={data.lop} onChange={set("lop")} required />
                    <TextInput label="Số điện thoại" value={data.sdt} onChange={set("sdt")} required />
                    <TextInput label="Link Facebook cá nhân" value={data.facebook} onChange={set("facebook")} required placeholder="https://facebook.com/..." />
                    <TextInput label="Email cá nhân" value={data.email} onChange={set("email")} required placeholder="example@mail.com" />
                  </div>
                  <TextArea label="Bạn biết gì về Ban Văn nghệ Thể thao - Đoàn Thanh niên ĐHBK Hà Nội?" value={data.bietGi} onChange={set("bietGi")} required rows={4} />
                  <TextArea label="Lý do bạn muốn ứng tuyển vào Ban Văn nghệ Thể thao?" value={data.lyDo} onChange={set("lyDo")} required rows={4} />
                  <div className="pt-4 flex justify-end">
                    <button onClick={() => setStep("division_select")}
                      disabled={!data.hoTen || !data.mssv || !data.email || !data.sdt}
                      className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-7 py-3 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                      Tiếp theo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Division Select ── */}
              {step === "division_select" && (
                <motion.div key="div_select" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <SectionHeader title="Chọn mảng ứng tuyển" note="Mỗi bạn chỉ được ứng tuyển vào một mảng chính. Sau khi chọn, form sẽ hướng dẫn bạn điền câu hỏi riêng của mảng đó." />
                  <RadioGroup
                    label="Mảng mà bạn muốn ứng tuyển?"
                    value={data.mang}
                    onChange={handleMangSelect}
                    options={["Mảng Tổ chức", "Mảng Truyền thông", "Mảng Media - Design", "Mảng Đối ngoại"]}
                    required
                  />
                  <div className="pt-4 flex justify-between">
                    <button onClick={() => setStep("common")} className="flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Tổ Chức ── */}
              {step === "to_chuc" && (
                <motion.div key="to_chuc" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <SectionHeader title="Mảng Tổ chức" />
                  <TextArea label="Hãy kể ba điểm mạnh và ba điểm yếu của bản thân bạn." value={data.tc_diemManh} onChange={set("tc_diemManh")} required rows={5} />
                  <TextArea label="Bạn nghĩ điểm mạnh nào của mình phù hợp với các công việc của Mảng Tổ chức?" value={data.tc_phucHop} onChange={set("tc_phucHop")} required rows={4} />
                  <TextArea label="Hãy kể tên các hoạt động văn hóa/văn nghệ/thể thao bạn từng tham gia tổ chức? Chọn ra một hoạt động mà bạn tâm đắc nhất và nêu lý do." value={data.tc_hoatDong} onChange={set("tc_hoatDong")} required rows={5} />
                  <TextArea label="Bạn nghĩ phẩm chất nào quan trọng hơn trong công việc tổ chức: tinh thần trách nhiệm, sự tỉ mỉ hay khả năng làm việc nhóm? Vì sao?" value={data.tc_phamChat} onChange={set("tc_phamChat")} required rows={4} />
                  <TextArea label="Bạn đánh giá như thế nào là một sự kiện thành công?" value={data.tc_suKien} onChange={set("tc_suKien")} required rows={4} />
                  <TextArea label="Bạn có mong muốn được học hỏi hay đóng góp điều gì cho mảng Tổ chức nói riêng và Ban Văn nghệ Thể thao nói chung?" value={data.tc_mongMuon} onChange={set("tc_mongMuon")} required rows={4} />
                  <div className="pt-4 flex justify-between">
                    <button onClick={() => setStep("division_select")} className="flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
                    </button>
                    <button onClick={() => setStep("final")} className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-7 py-3 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300 cursor-pointer">
                      Tiếp theo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Truyền Thông ── */}
              {step === "truyen_thong" && (
                <motion.div key="truyen_thong" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <SectionHeader title="Mảng Truyền thông" />
                  <TextArea label="Bạn hiểu truyền thông là gì?" value={data.tt_hieu} onChange={set("tt_hieu")} required rows={4} />
                  <TextArea label="Theo bạn, yếu tố nào là quan trọng trong một chiến dịch truyền thông?" value={data.tt_yeuTo} onChange={set("tt_yeuTo")} required rows={4} />
                  <TextArea label='Nếu được chọn giữa 1 trong 2 siêu năng lực: luôn tàng hình hoặc luôn bay lơ lửng, bạn chọn gì? Bạn nghĩ siêu năng lực đó giúp ích được gì trong đời sống?' value={data.tt_sienang} onChange={set("tt_sienang")} required rows={5} />
                  <TextArea label="Bạn đã từng tham gia truyền thông hay chưa? Hãy gắn link các sản phẩm nhé (video, hình ảnh, content...). Nếu chưa, hãy cho chúng mình biết vì sao bạn muốn thử sức ở mảng này." value={data.tt_kinh_nghiem} onChange={set("tt_kinh_nghiem")} required rows={5} placeholder="Link sản phẩm hoặc chia sẻ lý do..." />
                  <div className="pt-4 flex justify-between">
                    <button onClick={() => setStep("division_select")} className="flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
                    </button>
                    <button onClick={() => setStep("final")} className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-7 py-3 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300 cursor-pointer">
                      Tiếp theo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Media - Design ── */}
              {step === "media_design" && (
                <motion.div key="media_design" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <SectionHeader title="Mảng Media - Design" />
                  <TextArea label="Bạn mong muốn học được gì khi tham gia mảng?" value={data.md_mongMuon} onChange={set("md_mongMuon")} required rows={4} />
                  <TextInput label="Link Portfolio / Ấn phẩm của bạn" value={data.md_portfolio} onChange={set("md_portfolio")} placeholder="https://... (nếu là Drive, hãy mở quyền truy cập)" />
                  <RadioGroup label="Bạn muốn ứng tuyển vào tiểu mảng nào?" value={data.md_tieumang} onChange={set("md_tieumang")} options={["Media", "Design", "Cả hai"]} required />

                  {(data.md_tieumang === "Media" || data.md_tieumang === "Cả hai") && (
                    <div className="space-y-5 border-l-2 border-bvntt-lilac/30 pl-5 pt-3">
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-bvntt-lilac">Câu hỏi tiểu mảng Media</p>
                      <TextArea label="Bạn đã từng chụp ảnh/quay video cho CLB, sự kiện hoặc dự án nào?" value={data.med_daLamGi} onChange={set("med_daLamGi")} rows={4} />
                      <TextArea label="Theo bạn, một bức ảnh sự kiện đẹp cần có những yếu tố nào?" value={data.med_anhDep} onChange={set("med_anhDep")} rows={4} />
                      <TextArea label="Bạn được giao chụp một sự kiện nhưng không có shot list. Bạn sẽ chuẩn bị những gì trước khi bắt đầu?" value={data.med_chuanBi} onChange={set("med_chuanBi")} rows={4} />
                      <RadioGroup label="Bạn có muốn thử sức thêm ở Tiểu mảng Design không?" value={data.med_themDesign} onChange={set("med_themDesign")} options={["Có", "Không"]} />
                    </div>
                  )}

                  {(data.md_tieumang === "Design" || data.md_tieumang === "Cả hai") && (
                    <div className="space-y-5 border-l-2 border-bvntt-lilac/30 pl-5 pt-3">
                      <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-bvntt-lilac">Câu hỏi tiểu mảng Design</p>
                      <TextInput label="Bạn thường sử dụng công cụ nào để thiết kế?" value={data.des_congCu} onChange={set("des_congCu")} placeholder="VD: Canva, Figma, Photoshop..." />
                      <TextArea label="Theo bạn, một thiết kế tốt cần đáp ứng những yếu tố nào?" value={data.des_toiNao} onChange={set("des_toiNao")} rows={4} />
                      <TextArea label="Theo bạn, màu sắc, typography, bố cục và hình ảnh - yếu tố nào cần được ưu tiên? Tại sao?" value={data.des_uuTien} onChange={set("des_uuTien")} rows={4} />
                      <TextArea label="Bạn đã hoàn thành design nhưng leader yêu cầu sửa gần như toàn bộ. Bạn sẽ xử lý thế nào?" value={data.des_suaHet} onChange={set("des_suaHet")} rows={4} />
                      <TextArea label="Nếu một thiết kế rất đẹp nhưng không truyền tải đúng thông tin của chương trình, bạn có cho rằng đó là một thiết kế tốt không? Vì sao?" value={data.des_depMaNhung} onChange={set("des_depMaNhung")} rows={4} />
                    </div>
                  )}

                  <div className="pt-4 flex justify-between">
                    <button onClick={() => setStep("division_select")} className="flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
                    </button>
                    <button onClick={() => setStep("final")} disabled={!data.md_tieumang} className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-7 py-3 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer">
                      Tiếp theo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Đối ngoại ── */}
              {step === "doi_ngoai" && (
                <motion.div key="doi_ngoai" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <SectionHeader title="Mảng Đối ngoại" />
                  <TextArea label="Bạn biết gì về công việc của Mảng Đối ngoại trong Ban Văn nghệ Thể thao?" value={data.dn_bietGi} onChange={set("dn_bietGi")} required rows={4} />
                  <TextArea label="Hãy mô tả ngắn gọn về kinh nghiệm làm việc/hoạt động xã hội trước đây của bạn (đặc biệt là các vị trí liên quan tới giao tiếp, đối ngoại hoặc thu hút tài trợ nếu có)." value={data.dn_kinhNghiem} onChange={set("dn_kinhNghiem")} rows={5} />
                  <TextArea label="Bạn hãy tự đánh giá khả năng giao tiếp của mình trên thang điểm 10. Vì sao bạn cho mình số điểm đó?" value={data.dn_giaotiep} onChange={set("dn_giaotiep")} required rows={4} />
                  <TextArea label="Theo bạn, ba kỹ năng cần có của người làm Đối ngoại là gì? Bạn tự đánh giá mình mạnh nhất ở kỹ năng nào trong số đó?" value={data.dn_kyNang} onChange={set("dn_kyNang")} required rows={4} />
                  <TextArea label="Giữa việc làm một mình và làm việc nhóm, bạn thấy mình phát huy tốt nhất ở hình thức nào? Vì sao?" value={data.dn_nhom} onChange={set("dn_nhom")} required rows={4} />
                  <div className="pt-4 flex justify-between">
                    <button onClick={() => setStep("division_select")} className="flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
                    </button>
                    <button onClick={() => setStep("final")} className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-7 py-3 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300 cursor-pointer">
                      Tiếp theo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Final ── */}
              {step === "final" && (
                <motion.div key="final" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="space-y-6">
                  <SectionHeader title="Lời kết" note='Cảm ơn bạn đã điền đơn! Hãy kiểm tra lại thông tin một lần cuối và nhấn "Gửi" để hoàn tất. Sau khi gửi, bạn nhớ theo dõi Email và Fanpage của Ban để không bỏ lỡ thông báo kết quả.' />

                  {/* Summary card */}
                  <div className="bg-white/[0.03] border border-white/[0.08] p-5 space-y-2">
                    <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-bvntt-muted mb-3">Tóm tắt thông tin</p>
                    {[["Họ và tên", data.hoTen], ["MSSV", data.mssv], ["Email", data.email], ["SĐT", data.sdt], ["Mảng ứng tuyển", data.mang]].map(([k, v]) => (
                      <div key={k} className="flex gap-3 text-sm">
                        <span className="text-bvntt-muted font-normal w-28 flex-shrink-0">{k}:</span>
                        <span className="text-bvntt-cream font-medium">{v || "-"}</span>
                      </div>
                    ))}
                  </div>

                  <TextArea label="Bạn có câu hỏi hoặc góp ý gì cho chúng mình không?" value={data.goiY} onChange={set("goiY")} rows={3} placeholder="Không bắt buộc" />

                  <div className="pt-4 flex justify-between items-center">
                    <button onClick={() => setStep(data.mang === "Mảng Tổ chức" ? "to_chuc" : data.mang === "Mảng Truyền thông" ? "truyen_thong" : data.mang === "Mảng Media - Design" ? "media_design" : "doi_ngoai")}
                      className="flex items-center gap-2 text-xs font-medium tracking-[0.08em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors">
                      <ArrowLeft className="w-3.5 h-3.5" /> Quay lại
                    </button>
                    <button onClick={handleSubmit} disabled={submitting}
                      className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-[#07040d] bg-bvntt-lilac border border-bvntt-lilac px-8 py-3.5 hover:bg-bvntt-lilac/80 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">
                      {submitting ? "Đang gửi..." : "Gửi đơn ứng tuyển"}
                    </button>
                  </div>
                </motion.div>
              )}

              {/* ── STEP: Success ── */}
              {step === "success" && (
                <motion.div key="success" variants={stepVariants} initial="hidden" animate="visible" exit="exit" className="text-center py-20 space-y-6">
                  <div className="flex justify-center">
                    <div className="w-16 h-16 rounded-full bg-bvntt-lilac/20 border border-bvntt-lilac/40 flex items-center justify-center">
                      <CheckCircle className="w-8 h-8 text-bvntt-lilac" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h2 className="font-display font-bold text-3xl text-bvntt-cream uppercase">Gửi thành công!</h2>
                    <p className="text-bvntt-muted font-normal text-sm max-w-md mx-auto leading-relaxed">
                      Cảm ơn <strong className="text-bvntt-cream">{data.hoTen}</strong> đã ứng tuyển vào Ban Văn nghệ Thể thao!
                      Hãy kiểm tra email và theo dõi Fanpage để nhận thông báo kết quả.
                    </p>
                  </div>
                  <button onClick={onBack} className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-muted hover:text-bvntt-cream border border-white/[0.1] px-6 py-3 hover:border-bvntt-lilac transition-all duration-300 cursor-pointer">
                    <ArrowLeft className="w-3.5 h-3.5" /> Về trang chủ
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/[0.05] py-6 text-center text-[10px] tracking-widest uppercase text-white/20">
        Ban Văn nghệ Thể thao - Đoàn ĐHBK Hà Nội
      </footer>
    </div>
  );
};
