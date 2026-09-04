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
} from "lucide-react";
import { fetchSubmissions, deleteSubmission, Submission } from "../services/dbService";
import { ContentManager } from "./admin/ContentManager";
import { fetchContentFromDatabase } from "../services/contentService";

const ADMIN_PASSWORD = "bvntt2026"; // Change this in production
const AUTH_KEY = "bvntt_admin_authenticated";

type AdminMainTab = "submissions" | "content";

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
    const rows = submissions.map(s => [
      s.submittedAt, s.hoTen, s.mssv, s.khoa, s.truongKhoa, s.lop,
      s.sdt, s.email, s.facebook, s.mang,
    ]);
    const header = ["Thời gian", "Họ tên", "MSSV", "Khoá", "Trường/Khoa", "Lớp", "SĐT", "Email", "Facebook", "Mảng"];
    const csv = [header, ...rows].map(r => r.map(c => `"${(c||"").replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF" + csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `bvntt-don-ung-tuyen-${new Date().toLocaleDateString("vi")}.csv`;
    a.click(); URL.revokeObjectURL(url);
  };

  const filtered = submissions.filter(s => {
    const matchSearch = !search || [s.hoTen, s.mssv, s.email, s.mang, s.truongKhoa].some(f => f?.toLowerCase().includes(search.toLowerCase()));
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
          </div>
        </div>
      </header>

      <main className="max-w-screen-xl mx-auto px-6 md:px-10 py-10 space-y-8">
        {mainTab === "content" ? (
          <ContentManager />
        ) : (
          <>
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
                {expanded === s.id && (
                  <div className="border-t border-white/[0.06] px-5 py-5 space-y-5 bg-white/[0.015]">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {[
                        ["Họ và tên", s.hoTen], ["MSSV", s.mssv], ["Khoá", s.khoa],
                        ["Trường / Khoa", s.truongKhoa], ["Lớp", s.lop], ["SĐT", s.sdt],
                        ["Email", s.email], ["Facebook", s.facebook], ["Mảng ứng tuyển", s.mang],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-bvntt-muted">{k}</p>
                          <p className="text-sm text-bvntt-cream mt-0.5 break-all">{v || "-"}</p>
                        </div>
                      ))}
                    </div>
                    {Object.keys(s.answers || {}).length > 0 && (
                      <div className="space-y-3 pt-3 border-t border-white/[0.05]">
                        <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-bvntt-lilac">Câu hỏi chuyên môn</p>
                        {Object.entries(s.answers).map(([q, a]) => (
                          <div key={q}>
                            <p className="text-[11px] font-medium text-bvntt-cream/70 mb-1">{q}</p>
                            <p className="text-sm text-bvntt-muted leading-relaxed whitespace-pre-wrap">{a || "-"}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
          </>
        )}
      </main>
    </div>
  );
};
