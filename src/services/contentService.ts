import { EVENTS_DATA, EventItem } from "../data/events";
import { CLUBS_DATA, ClubItem } from "../data/clubs";
import { SITE_CONFIG } from "../data/config";

// ── Types ──────────────────────────────────────────────────────────────────
export interface ContentEvent extends EventItem {
  status: "published" | "draft";
  publishedAt?: string;
  order?: number;
}

export type PostCategory = "Thông báo" | "Tin tức" | "Sự kiện" | "Tuyển sinh" | "Hoạt động CLB";

export interface ContentPost {
  id: string;
  title: string;
  slug: string;
  category: PostCategory;
  author: string;
  publishedAt: string;
  coverImage: string;
  excerpt: string;
  content: string;
  status: "published" | "draft";
  isPinned: boolean;
}

export interface ContentClub extends ClubItem {
  recruitmentStatus: "open" | "closed" | "upcoming";
}

export interface RecruitmentStage {
  date: string;
  fullDate: string;
  title: string;
  description: string;
  status: "completed" | "active" | "upcoming";
}

export interface RecruitmentSettings {
  year: string;
  title: string;
  tagline: string;
  formUrl: string;
  stages: RecruitmentStage[];
}

// ── Storage Keys ───────────────────────────────────────────────────────────
const KEYS = {
  EVENTS: "bvntt_content_events",
  POSTS: "bvntt_content_posts",
  CLUBS: "bvntt_content_clubs",
  RECRUITMENT: "bvntt_content_recruitment",
};

export const CONTENT_UPDATED_EVENT = "bvntt:content-updated";

const notifyUpdated = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent(CONTENT_UPDATED_EVENT));
  }
};

// ── Default Initial Data ───────────────────────────────────────────────────
export const DEFAULT_POSTS: ContentPost[] = [
  {
    id: "thong-bao-tuyen-thanh-vien-2026",
    title: "Chính thức mở đơn Tuyển thành viên Ban Văn nghệ Thể thao đợt 1 - Năm 2026",
    slug: "chinh-thuc-mo-don-tuyen-thanh-vien-2026",
    category: "Tuyển sinh",
    author: "Ban Chủ nhiệm BVNTT",
    publishedAt: "2026-09-01",
    coverImage: "/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg",
    excerpt: "Cơ hội bước chân vào ngôi nhà chung BVNTT HUST - nơi hội tụ những bạn trẻ nhiệt huyết, đam mê nghệ thuật và thể thao hàng đầu Bách khoa.",
    content: `Chào đón tất cả các bạn sinh viên Đại học Bách khoa Hà Nội!\n\nĐợt tuyển thành viên đợt 1 năm 2026 của Ban Văn nghệ Thể thao - Đoàn Thanh niên ĐHBK Hà Nội đã chính thức mở cổng đăng ký. Chúng mình tìm kiếm những mảnh ghép sáng tạo, đam mê và nhiệt huyết cho các mảng:\n- Mảng Tổ chức sự kiện\n- Mảng Truyền thông\n- Mảng Media - Design\n- Mảng Đối ngoại\n\nHãy chuẩn bị tinh thần và nộp đơn ngay hôm nay để trở thành một phần của đại gia đình BVNTT!`,
    status: "published",
    isPinned: true,
  },
  {
    id: "lich-phong-van-tuyen-sinh-2026",
    title: "Thông báo lịch trình và hướng dẫn chuẩn bị vòng Phỏng vấn trực tiếp",
    slug: "huong-dan-chuan-bi-vong-phong-van-2026",
    category: "Thông báo",
    author: "Ban Tổ chức",
    publishedAt: "2026-09-03",
    coverImage: "/assets/events/mr-miss/TRT_7014.jpg",
    excerpt: "Những lưu ý quan trọng dành cho các ứng viên đã nộp đơn ứng tuyển các mảng và 7 CLB trực thuộc.",
    content: `Sau khi đóng cổng nhận đơn đăng ký, Ban Tổ chức sẽ gửi thư mời phỏng vấn qua Email và thông báo qua SMS cho các ứng viên vượt qua vòng đơn.\n\nĐịa điểm: Phòng 102 Nhà D3-5, Đại học Bách khoa Hà Nội.\nThời gian: Từ ngày 19/09 đến 22/09/2026.\n\nCác bạn lưu ý kiểm tra hòm thư thường xuyên (kể cả mục Spam) để không bỏ lỡ thông tin quan trọng!`,
    status: "published",
    isPinned: false,
  },
  {
    id: "tong-ket-chao-tan-sinh-vien",
    title: "Bùng nổ cảm xúc cùng Đêm đại nhạc hội Chào tân sinh viên K69 Bách khoa",
    slug: "bung-no-dem-nhac-hoi-chao-tan-k69",
    category: "Sự kiện",
    author: "Ban Truyền thông",
    publishedAt: "2026-08-28",
    coverImage: "/assets/events/chao-tan/570170705_797544896476459_7237356573905969307_n.jpg",
    excerpt: "Hơn 10.000 khán giả đã cùng hòa mình vào không gian âm thanh ánh sáng rực rỡ và những màn trình diễn đỉnh cao.",
    content: `Đêm nhạc hội Chào tân sinh viên đã khép lại thành công rực rỡ với sự tham gia của hơn 10.000 tân binh K69 cùng toàn thể sinh viên Bách khoa. Với sự góp mặt của các nghệ sĩ khách mời nổi tiếng cùng các tiết mục công phu từ 7 Câu lạc bộ trực thuộc BVNTT, chương trình đã mang đến những ký ức thanh xuân khó quên.`,
    status: "published",
    isPinned: false,
  }
];

export const DEFAULT_EVENTS: ContentEvent[] = EVENTS_DATA.map((ev, index) => ({
  ...ev,
  status: "published",
  publishedAt: "2026-01-01",
  order: index + 1,
}));

export const DEFAULT_CLUBS: ContentClub[] = CLUBS_DATA.map((c) => ({
  ...c,
  recruitmentStatus: "open",
}));

export const DEFAULT_RECRUITMENT: RecruitmentSettings = {
  year: SITE_CONFIG.recruitment.year,
  title: SITE_CONFIG.recruitment.title,
  tagline: SITE_CONFIG.recruitment.tagline,
  formUrl: SITE_CONFIG.recruitmentFormUrl,
  stages: SITE_CONFIG.recruitment.stages.map((s) => ({ ...s })),
};

// ── Database Sync Functions ───────────────────────────────────────────────

/**
 * Gửi cập nhật lên Neon Database qua /api/content
 */
export async function pushContentToDatabase(key: string, data: any): Promise<boolean> {
  try {
    const res = await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, data }),
    });
    return res.ok;
  } catch (err) {
    console.warn(`Không thể đồng bộ [${key}] lên Neon Database:`, err);
    return false;
  }
}

/**
 * Tải toàn bộ nội dung từ Neon Database về và đồng bộ vào localStorage
 */
export async function fetchContentFromDatabase(): Promise<boolean> {
  try {
    const res = await fetch("/api/content");
    if (!res.ok) return false;
    const all = await res.json();
    if (!all || typeof all !== "object") return false;

    let hasUpdate = false;
    if (Array.isArray(all.events) && all.events.length > 0) {
      localStorage.setItem(KEYS.EVENTS, JSON.stringify(all.events));
      hasUpdate = true;
    }
    if (Array.isArray(all.posts)) {
      localStorage.setItem(KEYS.POSTS, JSON.stringify(all.posts));
      hasUpdate = true;
    }
    if (Array.isArray(all.clubs) && all.clubs.length > 0) {
      localStorage.setItem(KEYS.CLUBS, JSON.stringify(all.clubs));
      hasUpdate = true;
    }
    if (all.recruitment && typeof all.recruitment === "object") {
      localStorage.setItem(KEYS.RECRUITMENT, JSON.stringify(all.recruitment));
      hasUpdate = true;
    }

    if (hasUpdate) {
      notifyUpdated();
    } else if (!all.events) {
      // Nếu Database Neon còn trống (mới tạo bảng), tự động nạp dữ liệu chuẩn ban đầu lên Neon
      pushContentToDatabase("events", DEFAULT_EVENTS);
      pushContentToDatabase("posts", DEFAULT_POSTS);
      pushContentToDatabase("clubs", DEFAULT_CLUBS);
      pushContentToDatabase("recruitment", DEFAULT_RECRUITMENT);
    }
    return true;
  } catch (err) {
    console.warn("Không thể fetch content từ Neon Database:", err);
    return false;
  }
}

// ── Service Functions ──────────────────────────────────────────────────────

// 1. Events
export const getStoredEvents = (): ContentEvent[] => {
  try {
    const raw = localStorage.getItem(KEYS.EVENTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Error reading stored events", e);
  }
  return DEFAULT_EVENTS;
};

export const saveStoredEvents = (events: ContentEvent[]): void => {
  try {
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
    notifyUpdated();
  } catch (e) {
    console.warn("Error saving stored events", e);
  }
  pushContentToDatabase("events", events);
};

// 2. Posts (News & Announcements)
export const getStoredPosts = (): ContentPost[] => {
  try {
    const raw = localStorage.getItem(KEYS.POSTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    console.warn("Error reading stored posts", e);
  }
  return DEFAULT_POSTS;
};

export const saveStoredPosts = (posts: ContentPost[]): void => {
  try {
    localStorage.setItem(KEYS.POSTS, JSON.stringify(posts));
    notifyUpdated();
  } catch (e) {
    console.warn("Error saving stored posts", e);
  }
  pushContentToDatabase("posts", posts);
};

// 3. Clubs
export const getStoredClubs = (): ContentClub[] => {
  try {
    const raw = localStorage.getItem(KEYS.CLUBS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch (e) {
    console.warn("Error reading stored clubs", e);
  }
  return DEFAULT_CLUBS;
};

export const saveStoredClubs = (clubs: ContentClub[]): void => {
  try {
    localStorage.setItem(KEYS.CLUBS, JSON.stringify(clubs));
    notifyUpdated();
  } catch (e) {
    console.warn("Error saving stored clubs", e);
  }
  pushContentToDatabase("clubs", clubs);
};

// 4. Recruitment Settings
export const getStoredRecruitment = (): RecruitmentSettings => {
  try {
    const raw = localStorage.getItem(KEYS.RECRUITMENT);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && typeof parsed === "object") return parsed;
    }
  } catch (e) {
    console.warn("Error reading stored recruitment", e);
  }
  return DEFAULT_RECRUITMENT;
};

export const saveStoredRecruitment = (settings: RecruitmentSettings): void => {
  try {
    localStorage.setItem(KEYS.RECRUITMENT, JSON.stringify(settings));
    notifyUpdated();
  } catch (e) {
    console.warn("Error saving stored recruitment", e);
  }
  pushContentToDatabase("recruitment", settings);
};

// 5. Global Backup & Reset
export const resetContentToDefault = async (): Promise<void> => {
  try {
    localStorage.removeItem(KEYS.EVENTS);
    localStorage.removeItem(KEYS.POSTS);
    localStorage.removeItem(KEYS.CLUBS);
    localStorage.removeItem(KEYS.RECRUITMENT);
    notifyUpdated();
  } catch (e) {
    console.warn("Error resetting content", e);
  }
  await Promise.all([
    pushContentToDatabase("events", DEFAULT_EVENTS),
    pushContentToDatabase("posts", DEFAULT_POSTS),
    pushContentToDatabase("clubs", DEFAULT_CLUBS),
    pushContentToDatabase("recruitment", DEFAULT_RECRUITMENT),
  ]);
};

export const exportContentDataJSON = (): string => {
  const data = {
    exportDate: new Date().toISOString(),
    version: "1.0",
    events: getStoredEvents(),
    posts: getStoredPosts(),
    clubs: getStoredClubs(),
    recruitment: getStoredRecruitment(),
  };
  return JSON.stringify(data, null, 2);
};

export const importContentDataJSON = async (jsonStr: string): Promise<boolean> => {
  try {
    const data = JSON.parse(jsonStr);
    if (data && typeof data === "object") {
      if (Array.isArray(data.events)) {
        localStorage.setItem(KEYS.EVENTS, JSON.stringify(data.events));
        pushContentToDatabase("events", data.events);
      }
      if (Array.isArray(data.posts)) {
        localStorage.setItem(KEYS.POSTS, JSON.stringify(data.posts));
        pushContentToDatabase("posts", data.posts);
      }
      if (Array.isArray(data.clubs)) {
        localStorage.setItem(KEYS.CLUBS, JSON.stringify(data.clubs));
        pushContentToDatabase("clubs", data.clubs);
      }
      if (data.recruitment) {
        localStorage.setItem(KEYS.RECRUITMENT, JSON.stringify(data.recruitment));
        pushContentToDatabase("recruitment", data.recruitment);
      }
      notifyUpdated();
      return true;
    }
  } catch (e) {
    console.error("Failed to import content JSON", e);
  }
  return false;
};
