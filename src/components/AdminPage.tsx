import { useState, useEffect } from "react";
import {
  LogOut,
  Users,
  FileText,
  Download,
  Eye,
  Trash2,
  Shield,
  ChevronUp,
  Search,
  RefreshCw,
  Database,
  Layers,
  ArrowLeft,
  Sparkles,
  Activity,
  ExternalLink,
  Phone,
  Mail,
  Lock,
  Unlock,
  Settings,
} from "lucide-react";
import { fetchSubmissions, deleteSubmission, Submission } from "../services/dbService";
import { ContentManager } from "./admin/ContentManager";
import { AnalyticsDashboard } from "./admin/AnalyticsDashboard";
import {
  fetchContentFromDatabase,
  getStoredRecruitment,
  saveStoredRecruitment,
  RecruitmentSettings,
  CONTENT_UPDATED_EVENT,
} from "../services/contentService";
import { RecruitmentSettingsModal } from "./admin/RecruitmentSettingsModal";

const ADMIN_PASSWORD = "bvntt2026"; // Change this in production
const AUTH_KEY = "bvntt_admin_authenticated";

type AdminMainTab = "submissions" | "content" | "analytics";

// Bảng ánh xạ tiêu đề câu hỏi đầy đủ y hệt Form
const QUESTION_LABELS: Record<string, string> = {
  // Mảng Tổ chức
  "Ba điểm mạnh và yếu": "Hãy kể ba điểm mạnh và ba điểm yếu của bản thân bạn.",
  "Điểm mạnh phù hợp mảng TC": "Bạn nghĩ điểm mạnh nào của mình phù hợp với các công việc của Mảng Tổ chức?",
  "Hoạt động từng tham gia": "Hãy kể tên các hoạt động văn hóa/văn nghệ/thể thao bạn từng tham gia tổ chức? Chọn ra một hoạt động mà bạn tâm đắc nhất và nêu lý do.",
  "Phẩm chất quan trọng": "Bạn nghĩ phẩm chất nào quan trọng hơn trong công việc tổ chức: tinh thần trách nhiệm, sự tỉ mỉ hay khả năng làm việc nhóm? Vì sao?",
  "Sự kiện thành công là gì": "Bạn đánh giá như thế nào là một sự kiện thành công?",
  "Mong muốn đóng góp": "Bạn có mong muốn được học hỏi hay đóng góp điều gì cho mảng Tổ chức nói riêng và Ban Văn nghệ Thể thao nói chung?",

  // Mảng Truyền thông
  "Truyền thông là gì": "Bạn hiểu truyền thông là gì?",
  "Yếu tố chiến dịch TT": "Theo bạn, yếu tố nào là quan trọng trong một chiến dịch truyền thông?",
  "Siêu năng lực": "Nếu được chọn giữa 1 trong 2 siêu năng lực: luôn tàng hình hoặc luôn bay lơ lửng, bạn chọn gì? Bạn nghĩ siêu năng lực đó giúp ích được gì trong đời sống?",
  "Kinh nghiệm TT": "Bạn đã từng tham gia truyền thông hay chưa? Hãy gắn link các sản phẩm nhé (video, hình ảnh, content...). Nếu chưa, hãy cho chúng mình biết vì sao bạn muốn thử sức ở mảng này.",

  // Mảng Media - Design
  "Tiểu mảng": "Bạn muốn ứng tuyển vào tiểu mảng nào?",
  "Mong muốn học": "Bạn mong muốn học được gì khi tham gia mảng?",
  "Portfolio": "Link Portfolio / Ấn phẩm của bạn",
  "[Media] Đã làm gì": "Bạn đã từng chụp ảnh/quay video cho CLB, sự kiện hoặc dự án nào?",
  "[Media] Ảnh đẹp cần gì": "Theo bạn, một bức ảnh sự kiện đẹp cần có những yếu tố nào?",
  "[Media] Chuẩn bị": "Bạn được giao chụp một sự kiện nhưng không có shot list. Bạn sẽ chuẩn bị những gì trước khi bắt đầu?",
  "[Media] Thử sức Design": "Bạn có muốn thử sức thêm ở Tiểu mảng Design không?",
  "[Media] Thử sức thêm Design": "Bạn có muốn thử sức thêm ở Tiểu mảng Design không?",
  "[Design] Công cụ": "Bạn thường sử dụng công cụ nào để thiết kế?",
  "[Design] Thiết kế tốt": "Theo bạn, một thiết kế tốt cần đáp ứng những yếu tố nào?",
  "[Design] Ưu tiên": "Theo bạn, màu sắc, typography, bố cục và hình ảnh - yếu tố nào cần được ưu tiên? Tại sao?",
  "[Design] Khi bị sửa toàn bộ": "Bạn đã hoàn thành design nhưng leader yêu cầu sửa gần như toàn bộ. Bạn sẽ xử lý thế nào?",
  "[Design] Đẹp nhưng sai TT": "Nếu một thiết kế rất đẹp nhưng không truyền tải đúng thông tin của chương trình, bạn có cho rằng đó là một thiết kế tốt không? Vì sao?",

  // Mảng Đối ngoại
  "Biết gì về ĐN": "Bạn biết gì về công việc của Mảng Đối ngoại trong Ban Văn nghệ Thể thao?",
  "Kinh nghiệm": "Hãy mô tả ngắn gọn về kinh nghiệm làm việc/hoạt động xã hội trước đây của bạn (đặc biệt là các vị trí liên quan tới giao tiếp, đối ngoại hoặc thu hút tài trợ nếu có).",
  "Tự đánh giá giao tiếp": "Bạn hãy tự đánh giá khả năng giao tiếp của mình trên thang điểm 10. Vì sao bạn cho mình số điểm đó?",
  "3 kỹ năng ĐN": "Theo bạn, ba kỹ năng cần có của người làm Đối ngoại là gì? Bạn tự đánh giá mình mạnh nhất ở kỹ năng nào trong số đó?",
  "Nhóm hay một mình": "Giữa việc làm một mình và làm việc nhóm, bạn thấy mình phát huy tốt nhất ở hình thức nào? Vì sao?",

  // Góp ý
  "Góp ý / Thắc mắc": "Bạn có câu hỏi hoặc góp ý gì cho chúng mình không?",
  "Góp ý / Câu hỏi thêm": "Bạn có câu hỏi hoặc góp ý gì cho chúng mình không?",
  "goiY": "Bạn có câu hỏi hoặc góp ý gì cho chúng mình không?",
};

// Helper parse an toàn cho answers (hỗ trợ cả JSON string và object)
const parseAnswers = (raw: any): Record<string, string> => {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  if (typeof raw === "string") {
    try {
      const parsed = JSON.parse(raw);
      return typeof parsed === "object" && parsed !== null ? parsed : {};
    } catch {
      return {};
    }
  }
  return {};
};

// ── Admin Page ─────────────────────────────────────────────────────────────
export const AdminPage = () => {
  const [authed, setAuthed] = useState<boolean>(() => {
    try {
      return localStorage.getItem(AUTH_KEY) === "true";
    } catch {
      return false;
    }
  });
  const [mainTab, setMainTab] = useState<AdminMainTab>("submissions");
  const [pw, setPw] = useState("");
  const [pwError, setPwError] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filterMang, setFilterMang] = useState("all");
  const [recruitment, setRecruitment] = useState<RecruitmentSettings>(() => getStoredRecruitment());
  const [recruitmentModalOpen, setRecruitmentModalOpen] = useState(false);

  useEffect(() => {
    const handleUpdate = () => {
      setRecruitment(getStoredRecruitment());
    };
    window.addEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
    return () => window.removeEventListener(CONTENT_UPDATED_EVENT, handleUpdate);
  }, []);

  const handleSaveRecruitment = (saved: RecruitmentSettings) => {
    setRecruitment(saved);
    saveStoredRecruitment(saved);
  };

  const handleQuickToggleFormLock = () => {
    const nextLocked = !recruitment.isFormLocked;
    const confirmMsg = nextLocked
      ? "Bạn có chắc chắn muốn KHÓA CỔNG ĐƠN ĐĂNG KÝ? Người dùng truy cập /form sẽ không thể nộp đơn nữa."
      : "Bạn có chắc chắn muốn MỞ LẠI CỔNG ĐƠN ĐĂNG KÝ để tiếp tục nhận hồ sơ?";
    if (window.confirm(confirmMsg)) {
      const updated: RecruitmentSettings = {
        ...recruitment,
        isFormLocked: nextLocked,
      };
      setRecruitment(updated);
      saveStoredRecruitment(updated);
    }
  };

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await fetchSubmissions();
      setSubmissions(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (authed) {
      loadData();
    }
  }, [authed]);

  const handleLogin = () => {
    if (pw === ADMIN_PASSWORD) {
      setAuthed(true);
      setPwError(false);
      try {
        localStorage.setItem(AUTH_KEY, "true");
      } catch {}
    } else {
      setPwError(true);
    }
  };

  const handleLogout = () => {
    setAuthed(false);
    setPw("");
    try {
      localStorage.removeItem(AUTH_KEY);
    } catch {}
  };

  const handleDelete = async (id: string) => {
    if (confirm("Xoá đơn này?")) {
      await deleteSubmission(id);
      loadData();
    }
  };

  const handleExportCSV = () => {
    // Xuất danh sách theo bộ lọc hiện tại hoặc toàn bộ
    const list = filtered.length > 0 ? filtered : submissions;
    if (list.length === 0) {
      alert("Không có đơn ứng tuyển nào để xuất.");
      return;
    }

    // Danh sách các cột câu hỏi chuyên môn cố định theo từng mảng
    const SPECIFIC_COLUMNS: { label: string; keys: string[] }[] = [
      // Câu hỏi chung
      { label: "[Câu hỏi chung] Bạn biết gì về Ban Văn nghệ Thể thao?", keys: ["bietGi"] },
      { label: "[Câu hỏi chung] Lý do muốn ứng tuyển vào Ban?", keys: ["lyDo"] },

      // Mảng Tổ chức
      { label: "[Tổ chức] 3 điểm mạnh và 3 điểm yếu của bản thân", keys: ["Ba điểm mạnh và yếu", "tc_diemManh"] },
      { label: "[Tổ chức] Điểm mạnh phù hợp với mảng Tổ chức", keys: ["Điểm mạnh phù hợp mảng TC", "tc_phucHop"] },
      { label: "[Tổ chức] Hoạt động từng tham gia tổ chức & tâm đắc", keys: ["Hoạt động từng tham gia", "tc_hoatDong"] },
      { label: "[Tổ chức] Phẩm chất quan trọng (trách nhiệm/tỉ mỉ/nhóm)", keys: ["Phẩm chất quan trọng", "tc_phamChat"] },
      { label: "[Tổ chức] Định nghĩa thế nào là sự kiện thành công", keys: ["Sự kiện thành công là gì", "tc_suKien"] },
      { label: "[Tổ chức] Mong muốn học hỏi / đóng góp cho mảng & Ban", keys: ["Mong muốn đóng góp", "tc_mongMuon"] },

      // Mảng Truyền thông
      { label: "[Truyền thông] Bạn hiểu truyền thông là gì?", keys: ["Truyền thông là gì", "tt_hieu"] },
      { label: "[Truyền thông] Yếu tố quan trọng trong chiến dịch TT", keys: ["Yếu tố chiến dịch TT", "tt_yeuTo"] },
      { label: "[Truyền thông] Lựa chọn siêu năng lực (tàng hình hay bay lơ lửng)", keys: ["Siêu năng lực", "tt_sienang"] },
      { label: "[Truyền thông] Kinh nghiệm & link sản phẩm TT", keys: ["Kinh nghiệm TT", "tt_kinh_nghiem"] },

      // Mảng Media - Design
      { label: "[Media-Design] Tiểu mảng ứng tuyển (Media / Design / Cả hai)", keys: ["Tiểu mảng", "md_tieumang"] },
      { label: "[Media-Design] Mong muốn học được gì khi tham gia mảng", keys: ["Mong muốn học", "md_mongMuon"] },
      { label: "[Media-Design] Link Portfolio / Ấn phẩm", keys: ["Portfolio", "md_portfolio"] },
      { label: "[Media] Đã từng chụp ảnh/quay video cho CLB, sự kiện nào", keys: ["[Media] Đã làm gì", "med_daLamGi"] },
      { label: "[Media] Yếu tố một bức ảnh sự kiện đẹp", keys: ["[Media] Ảnh đẹp cần gì", "med_anhDep"] },
      { label: "[Media] Chuẩn bị khi chụp sự kiện không có shot list", keys: ["[Media] Chuẩn bị", "med_chuanBi"] },
      { label: "[Media] Thử sức thêm ở Tiểu mảng Design", keys: ["[Media] Thử sức thêm Design", "[Media] Thử sức Design", "med_themDesign"] },
      { label: "[Design] Công cụ thường sử dụng thiết kế", keys: ["[Design] Công cụ", "des_congCu"] },
      { label: "[Design] Tiêu chí một thiết kế tốt", keys: ["[Design] Thiết kế tốt", "des_toiNao"] },
      { label: "[Design] Thứ tự ưu tiên màu sắc/typography/bố cục/hình ảnh", keys: ["[Design] Ưu tiên", "des_uuTien"] },
      { label: "[Design] Xử lý khi leader yêu cầu sửa gần như toàn bộ", keys: ["[Design] Khi bị sửa toàn bộ", "des_suaHet"] },
      { label: "[Design] Quan điểm thiết kế rất đẹp nhưng sai thông tin", keys: ["[Design] Đẹp nhưng sai TT", "des_depMaNhung"] },

      // Mảng Đối ngoại
      { label: "[Đối ngoại] Hiểu biết về công việc của Mảng Đối ngoại", keys: ["Biết gì về ĐN", "dn_bietGi"] },
      { label: "[Đối ngoại] Kinh nghiệm làm việc / hoạt động xã hội trước đây", keys: ["Kinh nghiệm", "dn_kinhNghiem"] },
      { label: "[Đối ngoại] Tự đánh giá khả năng giao tiếp (thang điểm 10)", keys: ["Tự đánh giá giao tiếp", "dn_giaotiep"] },
      { label: "[Đối ngoại] Ba kỹ năng cần có của người làm Đối ngoại", keys: ["3 kỹ năng ĐN", "dn_kyNang"] },
      { label: "[Đối ngoại] Phát huy tốt nhất khi làm một mình hay nhóm", keys: ["Nhóm hay một mình", "dn_nhom"] },

      // Góp ý
      { label: "[Góp ý] Câu hỏi hoặc góp ý thêm cho Ban", keys: ["Góp ý / Thắc mắc", "Góp ý / Câu hỏi thêm", "goiY"] },
    ];

    // Thu thập thêm bất kỳ câu hỏi nào khác có trong answers của các đơn
    const allKnownKeys = new Set<string>();
    SPECIFIC_COLUMNS.forEach(col => col.keys.forEach(k => allKnownKeys.add(k)));

    const extraKeys: string[] = [];
    list.forEach(s => {
      const ans = parseAnswers(s.answers);
      Object.keys(ans).forEach(k => {
        if (!allKnownKeys.has(k) && !extraKeys.includes(k)) {
          extraKeys.push(k);
        }
      });
    });

    // Headers
    const baseHeaders = [
      "Mã đơn",
      "Thời gian nộp",
      "Họ và tên",
      "MSSV",
      "Khoá",
      "Trường / Khoa",
      "Lớp",
      "Số điện thoại",
      "Email",
      "Facebook",
      "Mảng ứng tuyển",
    ];

    const headers = [
      ...baseHeaders,
      ...SPECIFIC_COLUMNS.map(c => c.label),
      ...extraKeys.map(k => QUESTION_LABELS[k] || `[Khác] ${k}`),
      "[Tổng hợp toàn bộ câu trả lời]"
    ];

    const rows = list.map(s => {
      const ans = parseAnswers(s.answers);

      // Base fields
      const row: string[] = [
        s.id || "",
        s.submittedAt ? new Date(s.submittedAt).toLocaleString("vi-VN") : "",
        s.hoTen || "",
        s.mssv || "",
        s.khoa || "",
        s.truongKhoa || "",
        s.lop || "",
        s.sdt || "",
        s.email || "",
        s.facebook || "",
        s.mang || "",
      ];

      // Specific columns
      SPECIFIC_COLUMNS.forEach(col => {
        let val = "";
        if (col.keys.includes("bietGi")) val = s.bietGi || "";
        else if (col.keys.includes("lyDo")) val = s.lyDo || "";
        else {
          for (const k of col.keys) {
            if (ans[k] !== undefined && ans[k] !== null && ans[k] !== "") {
              val = ans[k];
              break;
            }
          }
        }
        row.push(val);
      });

      // Extra keys
      extraKeys.forEach(k => {
        row.push(ans[k] || "");
      });

      // Combined summary column (tiện để đọc lướt tất cả câu trả lời trên 1 ô Excel)
      const summaryParts: string[] = [];
      summaryParts.push(`--- I. CÂU HỎI CHUNG ---`);
      summaryParts.push(`1. Bạn biết gì về Ban: ${s.bietGi || "(Chưa điền)"}`);
      summaryParts.push(`2. Lý do muốn ứng tuyển: ${s.lyDo || "(Chưa điền)"}`);
      summaryParts.push(``);
      summaryParts.push(`--- II. CÂU HỎI CHUYÊN MÔN (${s.mang || "Chưa chọn"}) ---`);
      let count = 1;
      for (const [k, v] of Object.entries(ans)) {
        summaryParts.push(`${count++}. ${QUESTION_LABELS[k] || k}: ${v || "(Chưa điền)"}`);
      }
      row.push(summaryParts.join("\n"));

      return row;
    });

    const csv = [headers, ...rows]
      .map(r => r.map(c => `"${(c ?? "").toString().replace(/"/g, '""')}"`).join(","))
      .join("\r\n");

    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `bvntt-don-ung-tuyen-day-du-${dateStr}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const filtered = submissions.filter(s => {
    const matchSearch = !search || [s.hoTen, s.mssv, s.email, s.mang, s.truongKhoa, s.bietGi, s.lyDo].some(f => f?.toLowerCase().includes(search.toLowerCase()));
    const matchMang = filterMang === "all" || s.mang === filterMang;
    return matchSearch && matchMang;
  });

  const stats = {
    total: submissions.length,
    toChuc: submissions.filter(s => s.mang === "Mảng Tổ chức").length,
    truyenThong: submissions.filter(s => s.mang === "Mảng Truyền thông").length,
    mediaDesign: submissions.filter(s => s.mang === "Mảng Media - Design").length,
    doiNgoai: submissions.filter(s => s.mang === "Mảng Đối ngoại").length,
  };

  // ── Login screen ──
  if (!authed) {
    return (
      <div className="min-h-screen bg-[#07040d] flex items-center justify-center px-6">
        <div className="w-full max-w-sm space-y-8">
          <div className="text-center space-y-3">
            <div className="flex justify-center mb-4">
              <div className="w-12 h-12 rounded-full bg-bvntt-purple/20 border border-bvntt-purple/40 flex items-center justify-center">
                <Shield className="w-5 h-5 text-bvntt-lilac" />
              </div>
            </div>
            <h1 className="font-display font-bold text-2xl text-bvntt-cream uppercase tracking-wide">Admin Panel</h1>
            <p className="text-xs text-bvntt-muted tracking-wider">Ban Văn nghệ Thể thao - Bách Khoa</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-cream/70">Mật khẩu</label>
              <input
                type="password"
                value={pw}
                onChange={e => { setPw(e.target.value); setPwError(false); }}
                onKeyDown={e => e.key === "Enter" && handleLogin()}
                placeholder="Nhập mật khẩu admin"
                className={`w-full bg-white/[0.04] border text-bvntt-cream text-sm px-4 py-3 outline-none focus:bg-white/[0.06] transition-all duration-200 placeholder:text-white/20 ${pwError ? "border-red-500/60 focus:border-red-500" : "border-white/[0.1] focus:border-bvntt-lilac/60"}`}
              />
              {pwError && <p className="text-[11px] text-red-400">Mật khẩu không đúng.</p>}
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-bvntt-lilac text-[#07040d] font-bold text-xs tracking-[0.12em] uppercase py-3.5 hover:bg-bvntt-lilac/80 transition-all duration-300 cursor-pointer"
            >
              Đăng nhập
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Dashboard ──
  return (
    <div className="min-h-screen bg-[#07040d] text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#07040d]/95 backdrop-blur-xl border-b border-white/[0.06]">
        <div className="max-w-screen-xl mx-auto px-6 md:px-10">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <a
                href="/"
                className="flex items-center gap-1.5 text-xs text-white/50 hover:text-bvntt-cream transition mr-1.5"
                title="Về website"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span className="hidden sm:inline font-medium">Trang chủ</span>
              </a>
              <div className="w-[1px] h-4 bg-white/10 hidden sm:block" />
              <Shield className="w-4 h-4 text-bvntt-lilac" />
              <span className="text-sm font-bold tracking-[0.06em] uppercase text-bvntt-cream">Admin - BVNTT 2026</span>
              <div className="hidden md:flex items-center gap-1.5 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full text-[10px] text-emerald-400 font-medium">
                <Database className="w-3 h-3" />
                <span>Neon PostgreSQL</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {mainTab === "submissions" && (
                <>
                  <button
                    onClick={loadData}
                    disabled={loading}
                    className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-muted hover:text-bvntt-cream border border-white/[0.1] hover:border-bvntt-lilac/40 px-3 py-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
                    title="Tải lại dữ liệu"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-bvntt-lilac" : ""}`} />
                    <span className="hidden sm:inline">{loading ? "Đang tải..." : "Làm mới"}</span>
                  </button>
                  <button
                    onClick={handleExportCSV}
                    className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-muted hover:text-bvntt-cream border border-white/[0.1] hover:border-bvntt-lilac/40 px-4 py-2 transition-all duration-200 cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Xuất CSV
                  </button>
                </>
              )}
              {mainTab === "content" && (
                <button
                  onClick={async () => {
                    setLoading(true);
                    await fetchContentFromDatabase();
                    setLoading(false);
                  }}
                  disabled={loading}
                  className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-muted hover:text-bvntt-cream border border-white/[0.1] hover:border-bvntt-lilac/40 px-3 py-2 transition-all duration-200 cursor-pointer disabled:opacity-50"
                  title="Tải lại dữ liệu mới nhất từ Neon Database"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin text-bvntt-lilac" : ""}`} />
                  <span className="hidden sm:inline">{loading ? "Đang đồng bộ..." : "Đồng bộ Neon"}</span>
                </button>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-bvntt-muted hover:text-red-400 transition-colors cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Đăng xuất
              </button>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex items-center gap-3 border-t border-white/[0.05] pt-1 pb-2">
            <button
              onClick={() => setMainTab("submissions")}
              className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer ${
                mainTab === "submissions"
                  ? "border-bvntt-lilac text-bvntt-cream font-bold bg-white/[0.03]"
                  : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
              }`}
            >
              <Users className="w-4 h-4 text-bvntt-lilac" />
              <span>Hồ sơ ứng tuyển</span>
              <span className="ml-1 px-1.5 py-0.5 rounded-full text-[10px] bg-white/10 text-white/70">
                {submissions.length}
              </span>
            </button>

            <button
              onClick={() => setMainTab("content")}
              className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer ${
                mainTab === "content"
                  ? "border-bvntt-lilac text-bvntt-cream font-bold bg-white/[0.03]"
                  : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
              }`}
            >
              <Layers className="w-4 h-4 text-bvntt-lilac" />
              <span>Quản lý nội dung đăng tải</span>
              <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-bvntt-lilac/20 text-bvntt-lilac uppercase tracking-wider border border-bvntt-lilac/30">
                <Sparkles className="w-2.5 h-2.5" /> Mới
              </span>
            </button>

            <button
              onClick={() => setMainTab("analytics")}
              className={`flex items-center gap-2 px-4 py-2 text-xs uppercase tracking-wider font-semibold border-b-2 transition-all cursor-pointer ${
                mainTab === "analytics"
                  ? "border-bvntt-lilac text-bvntt-cream font-bold bg-white/[0.03]"
                  : "border-transparent text-white/50 hover:text-white/80 hover:bg-white/[0.01]"
              }`}
            >
              <Activity className="w-4 h-4 text-bvntt-lilac" />
              <span>Thống kê truy cập (Analytics)</span>
              <span className="flex items-center gap-1 text-[9px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 uppercase tracking-wider border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Live
              </span>
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 md:px-10 py-10 space-y-8">
        {mainTab === "analytics" ? (
          <AnalyticsDashboard />
        ) : mainTab === "content" ? (
          <ContentManager />
        ) : (
          <>
            {/* Form Lock Status Bar */}
            <div
              className={`p-4 border rounded flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors ${
                recruitment.isFormLocked
                  ? "bg-rose-950/25 border-rose-500/35"
                  : "bg-emerald-950/20 border-emerald-500/30"
              }`}
            >
              <div className="flex items-start sm:items-center gap-3">
                <div
                  className={`w-9 h-9 rounded flex items-center justify-center flex-shrink-0 transition-colors ${
                    recruitment.isFormLocked
                      ? "bg-rose-500/20 text-rose-400 border border-rose-500/40"
                      : "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                  }`}
                >
                  {recruitment.isFormLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-bvntt-cream">
                      Trạng thái Cổng Đơn Tuyển Thành Viên
                    </span>
                    <span
                      className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded ${
                        recruitment.isFormLocked
                          ? "bg-rose-500/25 text-rose-300 border border-rose-500/40"
                          : "bg-emerald-500/25 text-emerald-300 border border-emerald-500/40"
                      }`}
                    >
                      {recruitment.isFormLocked ? "Đã Khóa - Ngừng nhận đơn" : "Đang Mở Nhận Hồ Sơ"}
                    </span>
                  </div>
                  <p className="text-[11px] text-white/50 pt-0.5">
                    {recruitment.isFormLocked
                      ? `Cổng /form hiện hiển thị thông báo đóng đơn. Lý do: ${recruitment.lockReason || "Đã hết hạn nộp đơn"}`
                      : "Sinh viên có thể truy cập /form để điền và nộp hồ sơ trực tuyến."}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={handleQuickToggleFormLock}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer border rounded ${
                    recruitment.isFormLocked
                      ? "bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-500/40"
                      : "bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border-rose-500/40"
                  }`}
                  title={recruitment.isFormLocked ? "Bấm để mở lại form" : "Bấm để khóa form ngay"}
                >
                  {recruitment.isFormLocked ? (
                    <>
                      <Unlock className="w-3.5 h-3.5" /> Mở lại cổng đơn
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" /> Khóa cổng đơn ngay
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setRecruitmentModalOpen(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-white/70 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] transition cursor-pointer rounded"
                >
                  <Settings className="w-3.5 h-3.5" /> Cài đặt
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {[
                { label: "Tổng đơn", value: stats.total, icon: Users, color: "text-bvntt-lilac" },
                { label: "Tổ chức", value: stats.toChuc, icon: FileText, color: "text-purple-400" },
                { label: "Truyền thông", value: stats.truyenThong, icon: FileText, color: "text-blue-400" },
                { label: "Media - Design", value: stats.mediaDesign, icon: FileText, color: "text-pink-400" },
                { label: "Đối ngoại", value: stats.doiNgoai, icon: FileText, color: "text-emerald-400" },
              ].map((stat) => (
                <div key={stat.label} className="bg-white/[0.03] border border-white/[0.07] p-5 space-y-2">
                  <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">{stat.label}</p>
                  <p className={`font-display font-bold text-3xl ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, MSSV, email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/[0.04] border border-white/[0.1] text-bvntt-cream text-sm pl-10 pr-4 py-2.5 outline-none focus:border-bvntt-lilac/60 transition-all placeholder:text-white/20"
                />
              </div>
              <select
                value={filterMang}
                onChange={(e) => setFilterMang(e.target.value)}
                className="bg-white/[0.04] border border-white/[0.1] text-sm text-bvntt-cream px-4 py-2.5 outline-none focus:border-bvntt-lilac/60 transition-all cursor-pointer appearance-none min-w-[180px]"
              >
                <option value="all" className="bg-[#07040d]">Tất cả mảng</option>
                <option value="Mảng Tổ chức" className="bg-[#07040d]">Mảng Tổ chức</option>
                <option value="Mảng Truyền thông" className="bg-[#07040d]">Mảng Truyền thông</option>
                <option value="Mảng Media - Design" className="bg-[#07040d]">Mảng Media - Design</option>
                <option value="Mảng Đối ngoại" className="bg-[#07040d]">Mảng Đối ngoại</option>
              </select>
            </div>

        {/* Table */}
        {filtered.length === 0 ? (
          <div className="text-center py-24 space-y-3">
            <Users className="w-10 h-10 text-white/10 mx-auto" />
            <p className="text-bvntt-muted text-sm">
              {submissions.length === 0 ? "Chưa có đơn ứng tuyển nào." : "Không tìm thấy kết quả phù hợp."}
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-[11px] text-bvntt-muted tracking-wider">Hiển thị {filtered.length} / {submissions.length} đơn</p>
            {filtered.map(s => (
              <div key={s.id} className="border border-white/[0.07] bg-white/[0.02] hover:bg-white/[0.04] transition-colors">
                {/* Row */}
                <div className="flex items-center gap-4 px-5 py-4">
                  <div className="flex-1 min-w-0 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-x-4 gap-y-1">
                    <div>
                      <p className="text-[10px] text-bvntt-muted tracking-wider uppercase">Họ tên</p>
                      <p className="text-sm text-bvntt-cream font-medium truncate">{s.hoTen}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-bvntt-muted tracking-wider uppercase">MSSV</p>
                      <p className="text-sm text-bvntt-cream font-medium">{s.mssv}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[10px] text-bvntt-muted tracking-wider uppercase">Khoá / Lớp</p>
                      <p className="text-sm text-bvntt-cream">{s.khoa} - {s.lop}</p>
                    </div>
                    <div className="hidden sm:block">
                      <p className="text-[10px] text-bvntt-muted tracking-wider uppercase">Mảng</p>
                      <p className="text-xs font-semibold text-bvntt-lilac tracking-wide">{s.mang}</p>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-[10px] text-bvntt-muted tracking-wider uppercase">Email</p>
                      <p className="text-xs text-bvntt-muted truncate">{s.email}</p>
                    </div>
                    <div className="hidden lg:block">
                      <p className="text-[10px] text-bvntt-muted tracking-wider uppercase">Nộp lúc</p>
                      <p className="text-xs text-bvntt-muted">{new Date(s.submittedAt).toLocaleString("vi-VN")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <button onClick={() => setExpanded(expanded === s.id ? null : s.id)}
                      className="p-2 text-bvntt-muted hover:text-bvntt-cream transition-colors cursor-pointer" title="Xem chi tiết">
                      {expanded === s.id ? <ChevronUp className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    <button onClick={() => handleDelete(s.id)}
                      className="p-2 text-bvntt-muted hover:text-red-400 transition-colors cursor-pointer" title="Xoá">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Expanded detail */}
                {expanded === s.id && (() => {
                  const ans = parseAnswers(s.answers);
                  const answerEntries = Object.entries(ans);
                  return (
                    <div className="border-t border-white/[0.08] px-6 py-6 space-y-7 bg-white/[0.015]">
                      {/* Mục 1: Thông tin cá nhân & Liên hệ */}
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                          <div className="w-1.5 h-4 bg-bvntt-lilac rounded-full" />
                          <h4 className="text-xs font-bold tracking-[0.12em] uppercase text-bvntt-cream">
                            1. Thông tin cá nhân & Liên hệ
                          </h4>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-1">
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">Họ và tên</p>
                            <p className="text-sm font-medium text-bvntt-cream">{s.hoTen || "-"}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">MSSV</p>
                            <p className="text-sm font-medium text-bvntt-cream">{s.mssv || "-"}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">Khoá</p>
                            <p className="text-sm font-medium text-bvntt-cream">{s.khoa || "-"}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">Trường / Khoa</p>
                            <p className="text-sm font-medium text-bvntt-cream">{s.truongKhoa || "-"}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">Lớp</p>
                            <p className="text-sm font-medium text-bvntt-cream">{s.lop || "-"}</p>
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">Số điện thoại</p>
                            {s.sdt ? (
                              <a href={`tel:${s.sdt}`} className="text-sm text-bvntt-lilac hover:underline inline-flex items-center gap-1.5 font-medium">
                                <Phone className="w-3.5 h-3.5 flex-shrink-0 text-bvntt-lilac" />
                                <span>{s.sdt}</span>
                              </a>
                            ) : (
                              <p className="text-sm text-bvntt-cream">-</p>
                            )}
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">Email cá nhân</p>
                            {s.email ? (
                              <a href={`mailto:${s.email}`} className="text-sm text-bvntt-lilac hover:underline inline-flex items-center gap-1.5 break-all font-medium">
                                <Mail className="w-3.5 h-3.5 flex-shrink-0 text-bvntt-lilac" />
                                <span>{s.email}</span>
                              </a>
                            ) : (
                              <p className="text-sm text-bvntt-cream">-</p>
                            )}
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">Link Facebook cá nhân</p>
                            {s.facebook ? (
                              <a
                                href={s.facebook.startsWith("http") ? s.facebook : `https://${s.facebook}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-bvntt-lilac hover:underline inline-flex items-center gap-1.5 break-all font-medium"
                              >
                                <span>{s.facebook}</span>
                                <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                              </a>
                            ) : (
                              <p className="text-sm text-bvntt-cream">-</p>
                            )}
                          </div>
                          <div className="bg-white/[0.02] border border-white/[0.06] p-3.5 space-y-1">
                            <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">Mảng ứng tuyển</p>
                            <p className="text-sm font-bold text-bvntt-lilac">{s.mang || "-"}</p>
                          </div>
                        </div>
                      </div>

                      {/* Mục 2: Phần câu hỏi chung (Y hệt form) */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                          <div className="w-1.5 h-4 bg-purple-400 rounded-full" />
                          <h4 className="text-xs font-bold tracking-[0.12em] uppercase text-bvntt-cream">
                            2. Câu hỏi chung (Y hệt Form ứng tuyển)
                          </h4>
                        </div>
                        <div className="space-y-3.5">
                          <div className="bg-white/[0.02] border border-white/[0.08] p-4 space-y-2">
                            <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-bvntt-cream/80">
                              <span className="text-purple-400 mr-1.5 font-mono">1.</span>
                              Bạn biết gì về Ban Văn nghệ Thể thao - Đoàn Thanh niên Đại học Bách khoa Hà Nội?
                            </label>
                            <div className="bg-white/[0.03] border border-white/[0.06] text-bvntt-cream/90 text-sm p-3.5 leading-relaxed whitespace-pre-wrap">
                              {s.bietGi ? (
                                s.bietGi
                              ) : (
                                <span className="text-white/30 italic">Ứng viên chưa điền câu trả lời này</span>
                              )}
                            </div>
                          </div>

                          <div className="bg-white/[0.02] border border-white/[0.08] p-4 space-y-2">
                            <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-bvntt-cream/80">
                              <span className="text-purple-400 mr-1.5 font-mono">2.</span>
                              Lý do bạn muốn ứng tuyển vào Ban Văn nghệ Thể thao?
                            </label>
                            <div className="bg-white/[0.03] border border-white/[0.06] text-bvntt-cream/90 text-sm p-3.5 leading-relaxed whitespace-pre-wrap">
                              {s.lyDo ? (
                                s.lyDo
                              ) : (
                                <span className="text-white/30 italic">Ứng viên chưa điền câu trả lời này</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Mục 3: Phần câu hỏi chuyên môn */}
                      <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2 pb-2 border-b border-white/[0.08]">
                          <div className="w-1.5 h-4 bg-bvntt-lilac rounded-full" />
                          <h4 className="text-xs font-bold tracking-[0.12em] uppercase text-bvntt-cream">
                            3. Câu hỏi chuyên môn — {s.mang || "Chưa xác định"}
                          </h4>
                        </div>

                        {answerEntries.length === 0 ? (
                          <div className="bg-white/[0.02] border border-white/[0.06] p-4 text-xs text-white/40 italic">
                            Chưa có câu trả lời chuyên môn nào được lưu cho đơn này.
                          </div>
                        ) : (
                          <div className="space-y-3.5">
                            {answerEntries.map(([qKey, aVal], idx) => {
                              const questionTitle = QUESTION_LABELS[qKey] || qKey;
                              const isUrl = typeof aVal === "string" && (aVal.trim().startsWith("http://") || aVal.trim().startsWith("https://"));
                              return (
                                <div key={qKey} className="bg-white/[0.02] border border-white/[0.08] p-4 space-y-2">
                                  <label className="block text-[11px] font-semibold tracking-[0.08em] uppercase text-bvntt-cream/80">
                                    <span className="text-bvntt-lilac mr-1.5 font-mono">{idx + 1}.</span>
                                    {questionTitle}
                                  </label>
                                  <div className="bg-white/[0.03] border border-white/[0.06] text-bvntt-cream/90 text-sm p-3.5 leading-relaxed whitespace-pre-wrap">
                                    {isUrl ? (
                                      <a
                                        href={aVal.trim()}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-bvntt-lilac hover:text-white underline inline-flex items-center gap-1.5 break-all font-medium"
                                      >
                                        <span>{aVal}</span>
                                        <ExternalLink className="w-3.5 h-3.5 flex-shrink-0" />
                                      </a>
                                    ) : (
                                      aVal || <span className="text-white/30 italic">Chưa có câu trả lời</span>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            ))}
          </div>
        )}
          </>
        )}
      </main>

      {/* Recruitment Settings Modal */}
      <RecruitmentSettingsModal
        isOpen={recruitmentModalOpen}
        onClose={() => setRecruitmentModalOpen(false)}
        onSave={handleSaveRecruitment}
        initialSettings={recruitment}
      />
    </div>
  );
};
