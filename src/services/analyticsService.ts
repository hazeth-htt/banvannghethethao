export interface AnalyticsOverview {
  totalViews: number;
  uniqueVisitors: number;
  todayViews: number;
  todayVisitors: number;
  totalSubmissions: number;
}

export interface DailyStat {
  date: string;
  views: number;
  visitors: number;
}

export interface TopPage {
  path: string;
  title: string;
  count: number;
}

export interface StatItem {
  source?: string;
  device?: string;
  browser?: string;
  count: number;
}

export interface RecentVisit {
  id: string;
  path: string;
  title: string;
  referrer: string;
  deviceType: string;
  browser: string;
  os: string;
  createdAt: string;
}

export interface AnalyticsReport {
  overview: AnalyticsOverview;
  dailyStats: DailyStat[];
  topPages: TopPage[];
  referrers: StatItem[];
  devices: StatItem[];
  browsers: StatItem[];
  recentVisits: RecentVisit[];
  range: string;
}

const VISITOR_KEY = 'bvntt_analytics_vid';
const SESSION_KEY = 'bvntt_analytics_sid';

/** Lấy hoặc sinh Visitor ID ẩn danh duy nhất */
export function getVisitorId(): string {
  try {
    let vid = localStorage.getItem(VISITOR_KEY);
    if (!vid) {
      vid = 'v_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
      localStorage.setItem(VISITOR_KEY, vid);
    }
    return vid;
  } catch {
    return 'anon_' + Math.random().toString(36).substring(2, 9);
  }
}

/** Lấy hoặc sinh Session ID theo phiên làm việc */
export function getSessionId(): string {
  try {
    let sid = sessionStorage.getItem(SESSION_KEY);
    if (!sid) {
      sid = 's_' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
      sessionStorage.setItem(SESSION_KEY, sid);
    }
    return sid;
  } catch {
    return 'ses_' + Math.random().toString(36).substring(2, 9);
  }
}

/** Nhận diện thiết bị */
function detectDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  const ua = navigator.userAgent.toLowerCase();
  const width = window.innerWidth;
  if (/tablet|ipad|playbook|silk/i.test(ua) || (width >= 768 && width <= 1024)) {
    return 'tablet';
  }
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua) || width < 768) {
    return 'mobile';
  }
  return 'desktop';
}

/** Nhận diện trình duyệt */
function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (/CocCoc/i.test(ua)) return 'Cốc Cốc';
  if (/Edg/i.test(ua)) return 'Edge';
  if (/Chrome/i.test(ua) && !/Edg/i.test(ua)) return 'Chrome';
  if (/Safari/i.test(ua) && !/Chrome/i.test(ua)) return 'Safari';
  if (/Firefox/i.test(ua)) return 'Firefox';
  if (/Opera|OPR/i.test(ua)) return 'Opera';
  return 'Khác';
}

/** Nhận diện hệ điều hành */
function detectOS(): string {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Macintosh|Mac OS/i.test(ua)) return 'macOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Khác';
}

let lastTrackedPath = '';
let lastTrackedTime = 0;

/** Gửi ghi nhận pageview lên máy chủ */
export async function trackPageView(customPath?: string, customTitle?: string) {
  try {
    const rawPath = customPath || (window.location.pathname + (window.location.hash || ''));
    const path = rawPath.trim() || '/';

    // Không đếm lượt truy cập của trang admin
    if (path.startsWith('/admin') || path.includes('#admin')) {
      return;
    }

    // Chống duplicate gửi liên tục trong 1 giây cùng 1 url
    const now = Date.now();
    if (path === lastTrackedPath && now - lastTrackedTime < 1000) {
      return;
    }

    lastTrackedPath = path;
    lastTrackedTime = now;

    const payload = {
      visitorId: getVisitorId(),
      sessionId: getSessionId(),
      path,
      title: customTitle || document.title || 'BVNTT HUST',
      referrer: document.referrer || '',
      deviceType: detectDeviceType(),
      browser: detectBrowser(),
      os: detectOS(),
      screenRes: `${window.screen?.width || 0}x${window.screen?.height || 0}`,
    };

    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Analytics silent error handling
  }
}

/** Khởi tạo tự động lắng nghe chuyển hướng trang trong SPA */
export function initAnalyticsTracking(): () => void {
  // Gửi lượt xem đầu tiên khi tải web
  setTimeout(() => {
    trackPageView();
  }, 300);

  const handleLocationChange = () => {
    setTimeout(() => {
      trackPageView();
    }, 150);
  };

  window.addEventListener('popstate', handleLocationChange);
  window.addEventListener('hashchange', handleLocationChange);

  // Ghi đè pushState & replaceState để bắt các router SPA
  const originalPush = history.pushState;
  const originalReplace = history.replaceState;

  history.pushState = function (...args) {
    const res = originalPush.apply(this, args);
    handleLocationChange();
    return res;
  };

  history.replaceState = function (...args) {
    const res = originalReplace.apply(this, args);
    handleLocationChange();
    return res;
  };

  return () => {
    window.removeEventListener('popstate', handleLocationChange);
    window.removeEventListener('hashchange', handleLocationChange);
    history.pushState = originalPush;
    history.replaceState = originalReplace;
  };
}

/** Lấy báo cáo Analytics cho Admin Panel */
export async function fetchAnalyticsReport(range: 'today' | '7d' | '30d' | 'all' = '30d'): Promise<AnalyticsReport> {
  const res = await fetch(`/api/analytics?range=${range}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch analytics: ${res.statusText}`);
  }
  return res.json();
}
