import { useState, useEffect, useMemo } from 'react';
import {
  Activity,
  Users,
  Eye,
  TrendingUp,
  RefreshCw,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  Compass,
  ArrowUpRight,
  Zap,
  AlertCircle,
} from 'lucide-react';
import {
  fetchAnalyticsReport,
  AnalyticsReport,
  trackPageView,
} from '../../services/analyticsService';

type TimeRange = 'today' | '7d' | '30d' | 'all';

export const AnalyticsDashboard = () => {
  const [range, setRange] = useState<TimeRange>('30d');
  const [data, setData] = useState<AnalyticsReport | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastRefreshed, setLastRefreshed] = useState<Date>(new Date());
  const [hoveredPoint, setHoveredPoint] = useState<{
    date: string;
    views: number;
    visitors: number;
    x: number;
    y: number;
  } | null>(null);
  const [simulating, setSimulating] = useState(false);

  const loadData = async (selectedRange = range) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetchAnalyticsReport(selectedRange);
      setData(res);
      setLastRefreshed(new Date());
    } catch (err: any) {
      setError(err?.message || 'Không thể tải dữ liệu phân tích');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(range);
  }, [range]);

  // Tính toán tỷ lệ chuyển đổi
  const conversionRate = useMemo(() => {
    if (!data?.overview) return '0.0%';
    const visitors = data.overview.uniqueVisitors;
    const subs = data.overview.totalSubmissions;
    if (!visitors || visitors <= 0) return '0.0%';
    const rate = Math.min(100, (subs / visitors) * 100);
    return `${rate.toFixed(1)}%`;
  }, [data]);

  // Thử nghiệm gửi 1 lượt test visit
  const handleSimulateVisit = async () => {
    setSimulating(true);
    await trackPageView('/test-preview', 'Trang thử nghiệm Analytics');
    setTimeout(() => {
      loadData(range);
      setSimulating(false);
    }, 600);
  };

  // Chuẩn bị dữ liệu cho biểu đồ SVG
  const chartData = useMemo(() => {
    if (!data?.dailyStats || data.dailyStats.length === 0) {
      return [];
    }
    return data.dailyStats;
  }, [data]);

  const maxViews = useMemo(() => {
    if (chartData.length === 0) return 10;
    const max = Math.max(...chartData.map((d) => d.views), 5);
    return Math.ceil(max * 1.2);
  }, [chartData]);

  // Đếm tổng thiết bị để chia phần trăm
  const totalDeviceCount = useMemo(() => {
    return data?.devices.reduce((acc, curr) => acc + curr.count, 0) || 1;
  }, [data]);

  // Đếm tổng nguồn để chia phần trăm
  const totalReferrerCount = useMemo(() => {
    return data?.referrers.reduce((acc, curr) => acc + curr.count, 0) || 1;
  }, [data]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* ── Top Header Toolbar ── */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/[0.02] border border-white/[0.08] p-6 rounded-2xl backdrop-blur-sm">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-bvntt-purple/20 border border-bvntt-purple/40 flex items-center justify-center text-bvntt-lilac">
              <Activity className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-bvntt-cream tracking-wide">
              Thống kê lưu lượng truy cập (Web Analytics)
            </h2>
          </div>
          <p className="text-xs text-white/50">
            Dữ liệu đo lường hành vi người dùng, lượt xem trang và tỷ lệ chuyển đổi qua Neon PostgreSQL & Vercel
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Time range switcher */}
          <div className="inline-flex bg-black/40 p-1 border border-white/10 rounded-xl text-xs">
            {(
              [
                { id: 'today', label: 'Hôm nay' },
                { id: '7d', label: '7 ngày' },
                { id: '30d', label: '30 ngày' },
                { id: 'all', label: 'Tất cả' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setRange(t.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  range === t.id
                    ? 'bg-bvntt-lilac text-[#07040d] font-bold shadow'
                    : 'text-white/60 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => loadData(range)}
            disabled={loading}
            className="flex items-center gap-1.5 bg-white/[0.04] border border-white/10 hover:border-bvntt-lilac/50 text-xs px-3.5 py-2 rounded-xl text-white/80 hover:text-white transition cursor-pointer disabled:opacity-50"
            title="Làm mới dữ liệu"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-bvntt-lilac' : ''}`} />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </div>

      {/* ── Error Banner nếu có ── */}
      {error && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* ── Official Vercel Analytics Integration Status Card ── */}
      <div className="relative overflow-hidden rounded-2xl border border-bvntt-lilac/30 bg-gradient-to-r from-bvntt-purple/20 via-[#07040d] to-bvntt-purple/10 p-5 md:p-6 shadow-xl">
        <div className="absolute right-0 top-0 -mr-16 -mt-16 w-64 h-64 bg-bvntt-lilac/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3.5">
            {/* Vercel triangle symbol */}
            <div className="w-10 h-10 rounded-xl bg-black/60 border border-white/20 flex items-center justify-center shrink-0">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 1155 1000">
                <path d="M577.346 0L1154.69 1000H0L577.346 0Z" />
              </svg>
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm font-bold text-bvntt-cream tracking-wide">
                  Vercel Web Analytics Engine
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Đang hoạt động (@vercel/analytics)
                </span>
              </div>
              <p className="text-xs text-white/60 mt-1 max-w-2xl">
                Gói <code className="text-bvntt-lilac">@vercel/analytics</code> đã được nhúng vào ứng dụng web. Dữ liệu truy cập đồng thời được phân tích & lưu trữ nội bộ vào Neon PostgreSQL để quản trị viên có thể xem trực tiếp ngay tại đây.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <button
              onClick={handleSimulateVisit}
              disabled={simulating}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/[0.05] border border-white/10 hover:border-white/30 text-white/80 hover:text-white transition cursor-pointer disabled:opacity-50"
              title="Gửi 1 lượt truy cập mẫu để kiểm tra hệ thống"
            >
              <Zap className={`w-3.5 h-3.5 ${simulating ? 'animate-bounce text-amber-400' : 'text-amber-400'}`} />
              <span>Gửi lượt xem thử</span>
            </button>

            <a
              href="https://vercel.com/hazeth-htt/banvannghethethao/analytics"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-xl bg-bvntt-lilac text-[#07040d] hover:bg-bvntt-lilac/90 transition shadow-lg shadow-bvntt-purple/20 cursor-pointer"
            >
              <span>Vercel Console</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>

      {/* ── 4 KPI Metric Cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Tổng lượt xem */}
        <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-bvntt-lilac/40 p-6 rounded-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
              Tổng lượt xem trang
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
              <Eye className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-display font-bold text-bvntt-cream">
              {data?.overview.totalViews.toLocaleString('vi-VN') || 0}
            </p>
            <p className="text-[11px] text-white/40 mt-1 flex items-center gap-1">
              <span>Tính trong khoảng thời gian đã chọn</span>
            </p>
          </div>
        </div>

        {/* Card 2: Khách truy cập độc nhất */}
        <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-bvntt-lilac/40 p-6 rounded-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
              Khách truy cập (Visitors)
            </span>
            <div className="w-9 h-9 rounded-xl bg-bvntt-purple/20 border border-bvntt-purple/30 flex items-center justify-center text-bvntt-lilac">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-display font-bold text-bvntt-lilac">
              {data?.overview.uniqueVisitors.toLocaleString('vi-VN') || 0}
            </p>
            <p className="text-[11px] text-white/40 mt-1 flex items-center gap-1">
              <span>Định danh thiết bị duy nhất</span>
            </p>
          </div>
        </div>

        {/* Card 3: Lượt xem hôm nay */}
        <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-bvntt-lilac/40 p-6 rounded-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
              Lượt xem hôm nay
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
              <Activity className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-display font-bold text-emerald-400">
              {data?.overview.todayViews.toLocaleString('vi-VN') || 0}
            </p>
            <p className="text-[11px] text-white/40 mt-1">
              {data?.overview.todayVisitors || 0} người dùng hôm nay
            </p>
          </div>
        </div>

        {/* Card 4: Tỷ lệ nộp đơn */}
        <div className="relative overflow-hidden bg-white/[0.03] border border-white/[0.08] hover:border-bvntt-lilac/40 p-6 rounded-2xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <span className="text-xs uppercase tracking-wider text-white/50 font-semibold">
              Tỷ lệ ứng tuyển
            </span>
            <div className="w-9 h-9 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center text-pink-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-4">
            <p className="text-3xl font-display font-bold text-pink-400">
              {conversionRate}
            </p>
            <p className="text-[11px] text-white/40 mt-1">
              {data?.overview.totalSubmissions || 0} đơn ứng tuyển đã nộp
            </p>
          </div>
        </div>
      </div>

      {/* ── Daily Trend Chart (Biểu đồ tương tác ngày) ── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-bvntt-cream tracking-wide">
              Xu hướng lượt xem & khách truy cập theo ngày
            </h3>
            <p className="text-xs text-white/50">
              Đường cong lượt xem (Màu tím) và lượng khách truy cập (Màu xanh ngọc)
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-bvntt-lilac" />
              <span className="text-white/70">Lượt xem</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-cyan-400" />
              <span className="text-white/70">Khách độc nhất</span>
            </div>
          </div>
        </div>

        {chartData.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center text-center p-6 border border-dashed border-white/10 rounded-xl space-y-2">
            <Activity className="w-8 h-8 text-white/20 animate-pulse" />
            <p className="text-sm font-semibold text-white/60">Chưa có đủ dữ liệu theo ngày</p>
            <p className="text-xs text-white/40 max-w-sm">
              Hệ thống sẽ vẽ biểu đồ tương tác ngay khi có các lượt truy cập được ghi nhận. Bạn có thể bấm nút &quot;Gửi lượt xem thử&quot; phía trên để kiểm tra.
            </p>
          </div>
        ) : (
          <div className="relative pt-4">
            {/* SVG Chart */}
            <div className="w-full h-64 relative">
              <svg className="w-full h-full overflow-visible" viewBox="0 0 800 240" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="viewGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#c084fc" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#c084fc" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal Guide Lines */}
                {[0, 0.25, 0.5, 0.75, 1].map((ratio) => {
                  const y = 200 - ratio * 180;
                  return (
                    <g key={ratio}>
                      <line
                        x1="30"
                        y1={y}
                        x2="790"
                        y2={y}
                        stroke="rgba(255,255,255,0.06)"
                        strokeDasharray="4 4"
                      />
                      <text x="5" y={y + 3} fill="rgba(255,255,255,0.3)" fontSize="10">
                        {Math.round(ratio * maxViews)}
                      </text>
                    </g>
                  );
                })}

                {/* Area Fill for Views */}
                {(() => {
                  const points = chartData.map((d, i) => {
                    const x = 30 + (i / Math.max(chartData.length - 1, 1)) * 750;
                    const y = 200 - (d.views / maxViews) * 180;
                    return `${x},${y}`;
                  });
                  const areaPoints = `30,200 ${points.join(' ')} 780,200`;
                  return <polygon points={areaPoints} fill="url(#viewGradient)" />;
                })()}

                {/* Line for Views */}
                {(() => {
                  const points = chartData.map((d, i) => {
                    const x = 30 + (i / Math.max(chartData.length - 1, 1)) * 750;
                    const y = 200 - (d.views / maxViews) * 180;
                    return `${x},${y}`;
                  }).join(' ');
                  return (
                    <polyline
                      fill="none"
                      stroke="#c084fc"
                      strokeWidth="2.5"
                      points={points}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  );
                })()}

                {/* Line for Visitors */}
                {(() => {
                  const points = chartData.map((d, i) => {
                    const x = 30 + (i / Math.max(chartData.length - 1, 1)) * 750;
                    const y = 200 - (d.visitors / maxViews) * 180;
                    return `${x},${y}`;
                  }).join(' ');
                  return (
                    <polyline
                      fill="none"
                      stroke="#22d3ee"
                      strokeWidth="2"
                      strokeDasharray="4 2"
                      points={points}
                      strokeLinecap="round"
                    />
                  );
                })()}

                {/* Interactive Points */}
                {chartData.map((d, i) => {
                  const x = 30 + (i / Math.max(chartData.length - 1, 1)) * 750;
                  const y = 200 - (d.views / maxViews) * 180;
                  return (
                    <g key={d.date} className="cursor-pointer">
                      <circle
                        cx={x}
                        cy={y}
                        r="4"
                        fill="#07040d"
                        stroke="#c084fc"
                        strokeWidth="2"
                        className="transition-all hover:r-6 hover:fill-bvntt-lilac"
                        onMouseEnter={() => setHoveredPoint({ ...d, x, y })}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Hover Tooltip */}
              {hoveredPoint && (
                <div
                  className="absolute z-20 pointer-events-none -translate-x-1/2 -translate-y-full mb-3 bg-[#0d0714] border border-bvntt-lilac/40 px-3 py-2 rounded-lg shadow-2xl text-xs space-y-1"
                  style={{
                    left: `${(hoveredPoint.x / 800) * 100}%`,
                    top: `${(hoveredPoint.y / 240) * 100}%`,
                  }}
                >
                  <p className="font-bold text-bvntt-cream border-b border-white/10 pb-1">
                    {hoveredPoint.date}
                  </p>
                  <p className="text-purple-300 flex items-center justify-between gap-3">
                    <span>Lượt xem:</span>
                    <span className="font-bold">{hoveredPoint.views}</span>
                  </p>
                  <p className="text-cyan-300 flex items-center justify-between gap-3">
                    <span>Khách duy nhất:</span>
                    <span className="font-bold">{hoveredPoint.visitors}</span>
                  </p>
                </div>
              )}
            </div>

            {/* Date labels at bottom */}
            <div className="flex justify-between text-[10px] text-white/40 pt-3 px-6">
              {chartData.map((d, idx) => {
                if (
                  chartData.length > 10 &&
                  idx !== 0 &&
                  idx !== chartData.length - 1 &&
                  idx % Math.ceil(chartData.length / 6) !== 0
                ) {
                  return null;
                }
                return <span key={d.date}>{d.date.slice(5)}</span>;
              })}
            </div>
          </div>
        )}
      </div>

      {/* ── Two-Column Breakdown: Top Pages vs Sources & Devices ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Top Pages */}
        <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-bold text-bvntt-cream tracking-wide flex items-center gap-2">
              <Globe className="w-4 h-4 text-bvntt-lilac" />
              Top trang được xem nhiều nhất
            </h3>
            <span className="text-xs text-white/40">Lượt xem</span>
          </div>

          <div className="space-y-3 pt-1">
            {!data?.topPages || data.topPages.length === 0 ? (
              <p className="text-xs text-white/40 py-8 text-center">Chưa có dữ liệu trang</p>
            ) : (
              data.topPages.map((page, idx) => {
                const percent = Math.round(
                  (page.count / (data.overview.totalViews || 1)) * 100
                );
                return (
                  <div key={page.path} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2 max-w-[75%] truncate">
                        <span className="w-5 text-[10px] font-bold text-white/40">#{idx + 1}</span>
                        <code className="font-mono text-bvntt-cream/90 bg-white/[0.05] px-1.5 py-0.5 rounded text-[11px] truncate">
                          {page.path}
                        </code>
                        {page.title && (
                          <span className="text-white/40 text-[11px] truncate hidden sm:inline">
                            {page.title}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-bold text-white">{page.count}</span>
                        <span className="text-[10px] text-white/40 w-9 text-right">{percent}%</span>
                      </div>
                    </div>
                    {/* Progress Bar */}
                    <div className="w-full bg-white/[0.05] h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-bvntt-purple to-bvntt-lilac h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(percent, 3)}%` }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Sources & Devices */}
        <div className="space-y-6">
          {/* Traffic Sources */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-bvntt-cream tracking-wide flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              Nguồn truy cập (Referrers)
            </h3>

            <div className="space-y-2.5">
              {!data?.referrers || data.referrers.length === 0 ? (
                <p className="text-xs text-white/40 py-4 text-center">Chưa có nguồn truy cập</p>
              ) : (
                data.referrers.map((ref) => {
                  const percent = Math.round((ref.count / totalReferrerCount) * 100);
                  return (
                    <div key={ref.source} className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span className="text-white/80">{ref.source}</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="text-white font-semibold">{ref.count}</span>
                        <span className="text-white/40 text-[10px] w-9 text-right">{percent}%</span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Device & Browser breakdown */}
          <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
            <h3 className="text-base font-bold text-bvntt-cream tracking-wide flex items-center gap-2">
              <Monitor className="w-4 h-4 text-pink-400" />
              Thiết bị & Trình duyệt
            </h3>

            {/* Devices */}
            <div className="grid grid-cols-3 gap-2">
              {['mobile', 'desktop', 'tablet'].map((dev) => {
                const item = data?.devices.find(
                  (d) => d.device?.toLowerCase() === dev.toLowerCase()
                );
                const count = item?.count || 0;
                const percent = Math.round((count / totalDeviceCount) * 100);

                const Icon = dev === 'mobile' ? Smartphone : dev === 'tablet' ? Tablet : Monitor;
                const label = dev === 'mobile' ? 'Di động' : dev === 'tablet' ? 'Tablet' : 'Máy tính';

                return (
                  <div
                    key={dev}
                    className="bg-white/[0.03] border border-white/[0.06] p-3 rounded-xl text-center space-y-1"
                  >
                    <div className="flex justify-center text-white/60">
                      <Icon className="w-4 h-4" />
                    </div>
                    <p className="text-[11px] text-white/60">{label}</p>
                    <p className="text-sm font-bold font-mono text-bvntt-cream">{percent}%</p>
                  </div>
                );
              })}
            </div>

            {/* Browsers */}
            <div className="pt-2 flex flex-wrap gap-2">
              {data?.browsers.map((b) => (
                <span
                  key={b.browser}
                  className="text-[11px] bg-white/[0.04] border border-white/10 px-2.5 py-1 rounded-lg text-white/70"
                >
                  <strong className="text-white font-semibold">{b.browser}</strong>: {b.count}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Recent Activity Stream (Nhật ký 30 lượt truy cập mới nhất) ── */}
      <div className="bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-bvntt-cream tracking-wide">
              Nhật ký truy cập gần đây (Live Activity Stream)
            </h3>
            <p className="text-xs text-white/50">
              Các phiên truy cập được ghi nhận tự động theo thời gian thực
            </p>
          </div>
          <span className="text-xs text-white/40">
            Cập nhật lúc: {lastRefreshed.toLocaleTimeString('vi-VN')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-white/80">
            <thead>
              <tr className="border-b border-white/10 text-[11px] uppercase tracking-wider text-white/40">
                <th className="py-3 px-3">Thời gian</th>
                <th className="py-3 px-3">Trang truy cập</th>
                <th className="py-3 px-3">Thiết bị</th>
                <th className="py-3 px-3">Trình duyệt / HĐH</th>
                <th className="py-3 px-3">Nguồn đến</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.05]">
              {!data?.recentVisits || data.recentVisits.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-white/40">
                    Chưa có lượt truy cập nào được lưu
                  </td>
                </tr>
              ) : (
                data.recentVisits.map((v) => {
                  const dateStr = new Date(v.createdAt).toLocaleTimeString('vi-VN', {
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                  });
                  const dayStr = new Date(v.createdAt).toLocaleDateString('vi-VN', {
                    day: '2-digit',
                    month: '2-digit',
                  });

                  return (
                    <tr key={v.id} className="hover:bg-white/[0.02] transition">
                      <td className="py-3 px-3 font-mono text-white/50 whitespace-nowrap">
                        <span>{dayStr}</span> <span className="text-white/80">{dateStr}</span>
                      </td>
                      <td className="py-3 px-3 font-medium text-bvntt-cream">
                        <code className="bg-white/[0.05] px-1.5 py-0.5 rounded text-[11px] font-mono">
                          {v.path}
                        </code>
                      </td>
                      <td className="py-3 px-3 capitalize text-white/70">
                        {v.deviceType || 'Desktop'}
                      </td>
                      <td className="py-3 px-3 text-white/70">
                        {v.browser} {v.os ? `(${v.os})` : ''}
                      </td>
                      <td className="py-3 px-3 text-white/50 max-w-xs truncate">
                        {v.referrer ? (
                          <span className="text-bvntt-lilac/80 truncate block">{v.referrer}</span>
                        ) : (
                          <span className="italic text-white/30">Trực tiếp</span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
