import { useState, useEffect } from "react";
import {
  Calendar,
  FileText,
  Users,
  Database,
  Plus,
  Search,
  Edit3,
  Trash2,
  Eye,
  EyeOff,
  Pin,
  RotateCcw,
  Download,
  Upload,
  CheckCircle2,
  Settings,
  AlertTriangle,
} from "lucide-react";
import {
  ContentEvent,
  ContentPost,
  ContentClub,
  RecruitmentSettings,
  getStoredEvents,
  saveStoredEvents,
  getStoredPosts,
  saveStoredPosts,
  getStoredClubs,
  saveStoredClubs,
  getStoredRecruitment,
  saveStoredRecruitment,
  resetContentToDefault,
  exportContentDataJSON,
  importContentDataJSON,
} from "../../services/contentService";
import { EventEditModal } from "./EventEditModal";
import { PostEditModal } from "./PostEditModal";
import { ClubEditModal } from "./ClubEditModal";
import { RecruitmentSettingsModal } from "./RecruitmentSettingsModal";

type ContentSubTab = "events" | "posts" | "clubs" | "backup";

export const ContentManager = () => {
  const [activeSubTab, setActiveSubTab] = useState<ContentSubTab>("events");

  // State
  const [events, setEvents] = useState<ContentEvent[]>([]);
  const [posts, setPosts] = useState<ContentPost[]>([]);
  const [clubs, setClubs] = useState<ContentClub[]>([]);
  const [recruitment, setRecruitment] = useState<RecruitmentSettings>(getStoredRecruitment());

  // Search & Filters
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  // Modals state
  const [eventModalOpen, setEventModalOpen] = useState(false);
  const [eventToEdit, setEventToEdit] = useState<ContentEvent | null>(null);

  const [postModalOpen, setPostModalOpen] = useState(false);
  const [postToEdit, setPostToEdit] = useState<ContentPost | null>(null);

  const [clubModalOpen, setClubModalOpen] = useState(false);
  const [clubToEdit, setClubToEdit] = useState<ContentClub | null>(null);

  const [recruitmentModalOpen, setRecruitmentModalOpen] = useState(false);

  // Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const refreshData = () => {
    setEvents(getStoredEvents());
    setPosts(getStoredPosts());
    setClubs(getStoredClubs());
    setRecruitment(getStoredRecruitment());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // ── Event Handlers ──
  const handleSaveEvent = (savedEvent: ContentEvent) => {
    let updated: ContentEvent[];
    const exists = events.some((e) => e.id === savedEvent.id);
    if (exists) {
      updated = events.map((e) => (e.id === savedEvent.id ? savedEvent : e));
      showToast(`Đã cập nhật sự kiện "${savedEvent.title}"`);
    } else {
      updated = [savedEvent, ...events];
      showToast(`Đã thêm mới sự kiện "${savedEvent.title}"`);
    }
    setEvents(updated);
    saveStoredEvents(updated);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xoá sự kiện "${title}"?`)) {
      const updated = events.filter((e) => e.id !== id);
      setEvents(updated);
      saveStoredEvents(updated);
      showToast(`Đã xoá sự kiện "${title}"`);
    }
  };

  const handleToggleEventStatus = (id: string) => {
    const updated = events.map((e) => {
      if (e.id === id) {
        const nextStatus = e.status === "published" ? "draft" : "published";
        return { ...e, status: nextStatus as "published" | "draft" };
      }
      return e;
    });
    setEvents(updated);
    saveStoredEvents(updated);
    showToast("Đã thay đổi trạng thái hiển thị sự kiện");
  };

  // ── Post Handlers ──
  const handleSavePost = (savedPost: ContentPost) => {
    let updated: ContentPost[];
    const exists = posts.some((p) => p.id === savedPost.id);
    if (exists) {
      updated = posts.map((p) => (p.id === savedPost.id ? savedPost : p));
      showToast(`Đã cập nhật bài viết "${savedPost.title}"`);
    } else {
      updated = [savedPost, ...posts];
      showToast(`Đã tạo bài viết "${savedPost.title}"`);
    }
    setPosts(updated);
    saveStoredPosts(updated);
  };

  const handleDeletePost = (id: string, title: string) => {
    if (confirm(`Bạn có chắc chắn muốn xoá bài viết "${title}"?`)) {
      const updated = posts.filter((p) => p.id !== id);
      setPosts(updated);
      saveStoredPosts(updated);
      showToast(`Đã xoá bài viết "${title}"`);
    }
  };

  const handleTogglePostPin = (id: string) => {
    const updated = posts.map((p) => (p.id === id ? { ...p, isPinned: !p.isPinned } : p));
    setPosts(updated);
    saveStoredPosts(updated);
    showToast("Đã cập nhật trạng thái ghim bài viết");
  };

  const handleTogglePostStatus = (id: string) => {
    const updated = posts.map((p) => {
      if (p.id === id) {
        const nextStatus = p.status === "published" ? "draft" : "published";
        return { ...p, status: nextStatus as "published" | "draft" };
      }
      return p;
    });
    setPosts(updated);
    saveStoredPosts(updated);
    showToast("Đã cập nhật trạng thái xuất bản");
  };

  // ── Club Handlers ──
  const handleSaveClub = (savedClub: ContentClub) => {
    const updated = clubs.map((c) => (c.id === savedClub.id ? savedClub : c));
    setClubs(updated);
    saveStoredClubs(updated);
    showToast(`Đã cập nhật thông tin CLB ${savedClub.name}`);
  };

  // ── Recruitment Handlers ──
  const handleSaveRecruitment = (savedSettings: RecruitmentSettings) => {
    setRecruitment(savedSettings);
    saveStoredRecruitment(savedSettings);
    showToast("Đã cập nhật đợt tuyển thành viên và timeline");
  };

  // ── Backup & Reset ──
  const handleExportJSON = () => {
    const json = exportContentDataJSON();
    const blob = new Blob([json], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bvntt-content-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast("Đã xuất tệp sao lưu cấu hình JSON thành công");
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (event) => {
      const content = event.target?.result as string;
      if (content) {
        const ok = await importContentDataJSON(content);
        if (ok) {
          refreshData();
          showToast("Đã nhập dữ liệu cấu hình thành công!");
        } else {
          alert("Tệp JSON không hợp lệ.");
        }
      }
    };
    reader.readAsText(file);
    e.target.value = "";
  };

  const handleResetDefaults = async () => {
    if (confirm("Khôi phục toàn bộ nội dung (Sự kiện, Tin tức, CLB, Cài đặt) về dữ liệu mặc định của Ban?")) {
      await resetContentToDefault();
      refreshData();
      showToast("Đã khôi phục toàn bộ nội dung về mặc định!");
    }
  };

  // Filtered lists
  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      !searchQuery ||
      [e.title, e.subtitle, e.category, e.timeframe].some((f) =>
        f?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCat = filterCategory === "all" || e.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const filteredPosts = posts.filter((p) => {
    const matchesSearch =
      !searchQuery ||
      [p.title, p.category, p.author, p.excerpt].some((f) =>
        f?.toLowerCase().includes(searchQuery.toLowerCase())
      );
    const matchesCat = filterCategory === "all" || p.category === filterCategory;
    return matchesSearch && matchesCat;
  });

  const filteredClubs = clubs.filter((c) => {
    return (
      !searchQuery ||
      [c.name, c.fullName, c.categoryLabel, c.tag].some((f) =>
        f?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  });

  return (
    <div className="space-y-8">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 bg-emerald-500/95 text-white px-4 py-3 rounded shadow-2xl backdrop-blur-md text-xs font-semibold animate-in fade-in slide-in-from-bottom-3 duration-300">
          <CheckCircle2 className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Sub Tab Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/[0.08] pb-4">
        <div className="flex items-center gap-2 overflow-x-auto">
          {[
            { id: "events", label: "Sự kiện", count: events.length, icon: Calendar },
            { id: "posts", label: "Bài viết & Tin tức", count: posts.length, icon: FileText },
            { id: "clubs", label: "CLB & Tuyển sinh", count: clubs.length, icon: Users },
            { id: "backup", label: "Sao lưu & Dữ liệu", icon: Database },
          ].map((tab) => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveSubTab(tab.id as ContentSubTab);
                  setSearchQuery("");
                  setFilterCategory("all");
                }}
                className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer border ${
                  active
                    ? "bg-bvntt-lilac text-[#07040d] border-bvntt-lilac font-bold shadow-lg"
                    : "bg-white/[0.02] text-white/70 border-white/[0.08] hover:text-white hover:bg-white/[0.05]"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                      active ? "bg-black/20 text-[#07040d]" : "bg-white/10 text-white/60"
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Action button based on sub tab */}
        {activeSubTab === "events" && (
          <button
            onClick={() => {
              setEventToEdit(null);
              setEventModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-bvntt-lilac text-[#07040d] font-bold text-xs uppercase tracking-wider hover:bg-bvntt-lilac/90 transition shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Thêm sự kiện mới
          </button>
        )}

        {activeSubTab === "posts" && (
          <button
            onClick={() => {
              setPostToEdit(null);
              setPostModalOpen(true);
            }}
            className="flex items-center gap-1.5 px-4 py-2 bg-bvntt-lilac text-[#07040d] font-bold text-xs uppercase tracking-wider hover:bg-bvntt-lilac/90 transition shadow-md cursor-pointer"
          >
            <Plus className="w-4 h-4" /> Tạo bài viết mới
          </button>
        )}

        {activeSubTab === "clubs" && (
          <button
            onClick={() => setRecruitmentModalOpen(true)}
            className="flex items-center gap-1.5 px-4 py-2 border border-bvntt-lilac/50 hover:border-bvntt-lilac text-bvntt-lilac hover:text-white font-semibold text-xs uppercase tracking-wider transition cursor-pointer"
          >
            <Settings className="w-3.5 h-3.5" /> Cài đặt Đợt tuyển & Timeline
          </button>
        )}
      </div>

      {/* ── TAB 1: SỰ KIỆN (EVENTS) ── */}
      {activeSubTab === "events" && (
        <div className="space-y-6">
          {/* Quick Stats & Search */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Tìm sự kiện theo tên, thời gian, phân loại..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.1] text-bvntt-cream text-sm pl-10 pr-4 py-2.5 outline-none focus:border-bvntt-lilac/60 transition-all placeholder:text-white/20"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#151022] border border-white/[0.1] text-sm text-bvntt-cream px-4 py-2.5 outline-none focus:border-bvntt-lilac/60 transition cursor-pointer min-w-[180px]"
            >
              <option value="all">Tất cả phân loại</option>
              <option value="Lễ hội Âm nhạc">Lễ hội Âm nhạc</option>
              <option value="Cuộc thi Nhan sắc & Tài năng">Cuộc thi Nhan sắc & Tài năng</option>
              <option value="Cuộc thi Tài năng & Sáng tạo">Cuộc thi Tài năng & Sáng tạo</option>
              <option value="Thể thao & Hội thao">Thể thao & Hội thao</option>
            </select>
          </div>

          {/* Events Grid / List */}
          {filteredEvents.length === 0 ? (
            <div className="text-center py-20 border border-white/[0.05] bg-white/[0.01] space-y-2">
              <Calendar className="w-10 h-10 text-white/10 mx-auto" />
              <p className="text-white/50 text-sm">Không tìm thấy sự kiện phù hợp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredEvents.map((ev) => {
                const isPublished = ev.status === "published";
                return (
                  <div
                    key={ev.id}
                    className="border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.035] transition-colors p-4 flex flex-col justify-between gap-4"
                  >
                    <div className="flex gap-4">
                      {/* Thumbnail */}
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 bg-black/40 border border-white/10 overflow-hidden">
                        <img
                          src={ev.coverImage}
                          alt={ev.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = "none";
                          }}
                        />
                        <span
                          className={`absolute bottom-1 left-1 text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded ${
                            isPublished
                              ? "bg-emerald-500/80 text-white"
                              : "bg-amber-500/80 text-black"
                          }`}
                        >
                          {isPublished ? "Hiển thị" : "Bản nháp"}
                        </span>
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-bvntt-lilac">
                            {ev.category}
                          </span>
                          <span className="text-white/20">•</span>
                          <span className="text-[10px] text-white/40">{ev.timeframe}</span>
                        </div>
                        <h3 className="font-display font-bold text-base sm:text-lg text-white leading-tight uppercase truncate">
                          {ev.title}
                        </h3>
                        {ev.subtitle && (
                          <p className="text-xs text-white/60 line-clamp-1 italic">{ev.subtitle}</p>
                        )}
                        <p className="text-xs text-white/50 line-clamp-2 pt-1 leading-relaxed">
                          {ev.shortDescription || ev.description}
                        </p>
                      </div>
                    </div>

                    {/* Bottom Actions */}
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-xs">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleToggleEventStatus(ev.id)}
                          className={`flex items-center gap-1 text-[11px] px-2.5 py-1 rounded transition cursor-pointer ${
                            isPublished
                              ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                              : "bg-white/5 text-white/50 hover:bg-white/10"
                          }`}
                          title="Bật/Tắt hiển thị"
                        >
                          {isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{isPublished ? "Đang hiện" : "Đang ẩn"}</span>
                        </button>
                        <span className="text-[10px] text-white/30">
                          {ev.highlights?.length || 0} điểm nhấn • {ev.gallery?.length || 0} ảnh
                        </span>
                      </div>

                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEventToEdit(ev);
                            setEventModalOpen(true);
                          }}
                          className="flex items-center gap-1 p-2 text-white/60 hover:text-bvntt-cream transition cursor-pointer"
                          title="Chỉnh sửa sự kiện"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span className="text-[11px]">Sửa</span>
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(ev.id, ev.title)}
                          className="p-2 text-white/40 hover:text-red-400 transition cursor-pointer"
                          title="Xoá sự kiện"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 2: BÀI VIẾT & TIN TỨC (NEWS & POSTS) ── */}
      {activeSubTab === "posts" && (
        <div className="space-y-6">
          {/* Search & Category Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input
                type="text"
                placeholder="Tìm kiếm bài viết theo tiêu đề, tác giả, nội dung..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/[0.1] text-bvntt-cream text-sm pl-10 pr-4 py-2.5 outline-none focus:border-bvntt-lilac/60 transition-all placeholder:text-white/20"
              />
            </div>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-[#151022] border border-white/[0.1] text-sm text-bvntt-cream px-4 py-2.5 outline-none focus:border-bvntt-lilac/60 transition cursor-pointer min-w-[180px]"
            >
              <option value="all">Tất cả chuyên mục</option>
              <option value="Thông báo">Thông báo</option>
              <option value="Tin tức">Tin tức</option>
              <option value="Sự kiện">Sự kiện</option>
              <option value="Tuyển sinh">Tuyển sinh</option>
              <option value="Hoạt động CLB">Hoạt động CLB</option>
            </select>
          </div>

          {/* Posts List */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 border border-white/[0.05] bg-white/[0.01] space-y-2">
              <FileText className="w-10 h-10 text-white/10 mx-auto" />
              <p className="text-white/50 text-sm">Chưa có bài viết nào phù hợp.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredPosts.map((post) => {
                const isPublished = post.status === "published";
                return (
                  <div
                    key={post.id}
                    className="border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.035] transition-colors p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  >
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      {post.coverImage && (
                        <div className="w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 bg-black/40 border border-white/10 overflow-hidden rounded">
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLElement).style.display = "none";
                            }}
                          />
                        </div>
                      )}

                      <div className="space-y-1 flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-bvntt-lilac/10 text-bvntt-lilac px-2 py-0.5 rounded border border-bvntt-lilac/20">
                            {post.category}
                          </span>
                          {post.isPinned && (
                            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded border border-amber-500/20">
                              <Pin className="w-3 h-3" /> Đã ghim
                            </span>
                          )}
                          <span className="text-[11px] text-white/40">{post.publishedAt}</span>
                          <span className="text-white/20">•</span>
                          <span className="text-[11px] text-white/50">{post.author}</span>
                        </div>

                        <h4 className="text-sm font-semibold text-bvntt-cream leading-snug truncate">
                          {post.title}
                        </h4>

                        <p className="text-xs text-white/50 line-clamp-1">{post.excerpt || post.content}</p>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 flex-shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleTogglePostPin(post.id)}
                        className={`p-2 rounded transition cursor-pointer ${
                          post.isPinned
                            ? "text-amber-400 bg-amber-500/10 hover:bg-amber-500/20"
                            : "text-white/40 hover:text-white"
                        }`}
                        title={post.isPinned ? "Bỏ ghim" : "Ghim bài viết"}
                      >
                        <Pin className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleTogglePostStatus(post.id)}
                        className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded transition cursor-pointer ${
                          isPublished
                            ? "bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20"
                            : "bg-white/5 text-white/50 hover:bg-white/10"
                        }`}
                      >
                        {isPublished ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{isPublished ? "Đã xuất bản" : "Bản nháp"}</span>
                      </button>

                      <button
                        onClick={() => {
                          setPostToEdit(post);
                          setPostModalOpen(true);
                        }}
                        className="p-2 text-white/60 hover:text-bvntt-cream transition cursor-pointer"
                        title="Chỉnh sửa bài viết"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleDeletePost(post.id, post.title)}
                        className="p-2 text-white/40 hover:text-red-400 transition cursor-pointer"
                        title="Xoá bài viết"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ── TAB 3: CLB & TUYỂN SINH (CLUBS & RECRUITMENT) ── */}
      {activeSubTab === "clubs" && (
        <div className="space-y-6">
          {/* Recruitment Timeline Banner Box */}
          <div className="p-5 bg-white/[0.02] border border-white/[0.08] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-bvntt-lilac">
                  Đợt tuyển thành viên {recruitment.year}
                </span>
                <span className="text-white/20">•</span>
                <span className="text-xs text-white/60">{recruitment.tagline}</span>
              </div>
              <h3 className="font-display font-bold text-xl text-bvntt-cream uppercase tracking-wide">
                {recruitment.title}
              </h3>
              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-white/50">
                <span>Timeline:</span>
                {recruitment.stages.map((stg, i) => (
                  <span key={i} className="bg-white/[0.05] px-2 py-0.5 rounded text-[11px] text-white/70">
                    <strong>{stg.date}:</strong> {stg.title}
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={() => setRecruitmentModalOpen(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-bvntt-lilac text-[#07040d] font-bold text-xs uppercase tracking-wider hover:bg-bvntt-lilac/90 transition cursor-pointer flex-shrink-0"
            >
              <Settings className="w-3.5 h-3.5" /> Chỉnh sửa đợt tuyển
            </button>
          </div>

          {/* Search clubs */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Tìm kiếm CLB theo tên, mảng nghệ thuật..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.04] border border-white/[0.1] text-bvntt-cream text-sm pl-10 pr-4 py-2.5 outline-none focus:border-bvntt-lilac/60 transition-all placeholder:text-white/20"
            />
          </div>

          {/* Clubs List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredClubs.map((club) => {
              const statusColor =
                club.recruitmentStatus === "open"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : club.recruitmentStatus === "upcoming"
                  ? "bg-amber-500/10 text-amber-400 border-amber-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20";

              const statusLabel =
                club.recruitmentStatus === "open"
                  ? "Đang mở đơn"
                  : club.recruitmentStatus === "upcoming"
                  ? "Sắp mở đơn"
                  : "Tạm đóng đơn";

              return (
                <div
                  key={club.id}
                  className="border border-white/[0.08] bg-white/[0.02] hover:bg-white/[0.035] transition-colors p-4 flex flex-col justify-between gap-4"
                >
                  <div className="flex gap-4">
                    {club.image && (
                      <img
                        src={club.image}
                        alt={club.name}
                        className="w-20 h-20 object-cover rounded border border-white/10 flex-shrink-0"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    )}
                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-bvntt-lilac">
                          {club.categoryLabel}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${statusColor}`}
                        >
                          {statusLabel}
                        </span>
                      </div>
                      <h4 className="font-bold text-base text-bvntt-cream truncate">{club.fullName}</h4>
                      <p className="text-xs text-white/40 line-clamp-1">{club.tag}</p>
                      <p className="text-xs text-white/60 line-clamp-2 pt-1">{club.shortDesc}</p>
                    </div>
                  </div>

                  {/* Recruitment URL display & Edit */}
                  <div className="border-t border-white/[0.06] pt-3 flex items-center justify-between gap-3 text-xs">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-white/40 uppercase">Link ứng tuyển:</p>
                      {club.recruitmentUrl ? (
                        <a
                          href={club.recruitmentUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="text-bvntt-lilac hover:underline truncate block text-xs"
                        >
                          {club.recruitmentUrl}
                        </a>
                      ) : (
                        <span className="text-white/30 text-xs italic">Chưa cài đặt link</span>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        setClubToEdit(club);
                        setClubModalOpen(true);
                      }}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-white/[0.06] hover:bg-white/[0.12] text-white text-xs font-semibold uppercase tracking-wider transition cursor-pointer flex-shrink-0"
                    >
                      <Edit3 className="w-3.5 h-3.5" /> Sửa link & CLB
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── TAB 4: SAO LƯU & DỮ LIỆU (BACKUP & RESTORE) ── */}
      {activeSubTab === "backup" && (
        <div className="max-w-2xl mx-auto space-y-6 py-4">
          <div className="p-6 bg-white/[0.02] border border-white/[0.08] space-y-4">
            <div className="flex items-center gap-3">
              <Database className="w-5 h-5 text-bvntt-lilac" />
              <h3 className="font-display font-bold text-lg text-bvntt-cream uppercase tracking-wider">
                Sao lưu & Đồng bộ Dữ liệu Nội dung
              </h3>
            </div>
            <p className="text-xs text-white/60 leading-relaxed">
              Toàn bộ bài viết, sự kiện, thông tin tuyển sinh CLB và các mốc thời gian được lưu trữ trực tiếp
              trong hệ thống nội bộ trình duyệt. Bạn có thể xuất tệp JSON để lưu dự phòng hoặc chuyển sang máy
              khác.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <button
                onClick={handleExportJSON}
                className="flex items-center justify-center gap-2 p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-bvntt-cream text-xs font-semibold uppercase tracking-wider transition cursor-pointer"
              >
                <Download className="w-4 h-4 text-bvntt-lilac" /> Xuất tệp sao lưu (JSON)
              </button>

              <label className="flex items-center justify-center gap-2 p-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.1] text-bvntt-cream text-xs font-semibold uppercase tracking-wider transition cursor-pointer">
                <Upload className="w-4 h-4 text-bvntt-lilac" /> Nhập tệp sao lưu (JSON)
                <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
              </label>
            </div>
          </div>

          <div className="p-6 bg-red-500/[0.03] border border-red-500/20 space-y-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-display font-bold text-lg text-red-400 uppercase tracking-wider">
                Khôi phục Dữ liệu Gốc
              </h3>
            </div>
            <p className="text-xs text-white/50 leading-relaxed">
              Nếu bạn muốn xóa toàn bộ các thay đổi thử nghiệm và đưa toàn bộ Sự kiện, CLB, Bài viết về dữ
              liệu chuẩn ban đầu của Ban Văn nghệ Thể thao, hãy nhấn nút dưới đây.
            </p>
            <button
              onClick={handleResetDefaults}
              className="flex items-center gap-2 px-5 py-2.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" /> Khôi phục về dữ liệu mặc định
            </button>
          </div>
        </div>
      )}

      {/* Modals */}
      <EventEditModal
        isOpen={eventModalOpen}
        onClose={() => setEventModalOpen(false)}
        onSave={handleSaveEvent}
        eventToEdit={eventToEdit}
      />

      <PostEditModal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        onSave={handleSavePost}
        postToEdit={postToEdit}
      />

      <ClubEditModal
        isOpen={clubModalOpen}
        onClose={() => setClubModalOpen(false)}
        onSave={handleSaveClub}
        clubToEdit={clubToEdit}
      />

      <RecruitmentSettingsModal
        isOpen={recruitmentModalOpen}
        onClose={() => setRecruitmentModalOpen(false)}
        onSave={handleSaveRecruitment}
        initialSettings={recruitment}
      />
    </div>
  );
};
