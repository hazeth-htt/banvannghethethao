import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  X,
} from "lucide-react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { MouseGradient } from "./MouseGradient";

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: string;
  year?: string;
  description?: string;
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  // Chào Tân
  {
    id: "ct-1",
    src: "/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg",
    title: "Sân khấu Chào Tân sinh viên rực sáng",
    category: "Chào Tân Sinh Viên",
    year: "2024",
  },
  {
    id: "ct-2",
    src: "/assets/events/chao-tan/565647031_792355210328761_4750042045286568568_n.jpg",
    title: "Biển sinh viên Bách khoa bùng nổ nhiệt huyết",
    category: "Chào Tân Sinh Viên",
    year: "2024",
  },
  {
    id: "ct-3",
    src: "/assets/events/chao-tan/570170705_797544896476459_7237356573905969307_n.jpg",
    title: "Ánh sáng visual đỉnh cao đêm nhạc hội",
    category: "Chào Tân Sinh Viên",
    year: "2024",
  },
  {
    id: "ct-4",
    src: "/assets/events/chao-tan/565898254_792355406995408_2175179391795983221_n.jpg",
    title: "Khoảnh khắc ca sĩ nghệ sĩ hòa giọng",
    category: "Chào Tân Sinh Viên",
    year: "2024",
  },
  {
    id: "ct-5",
    src: "/assets/events/chao-tan/571254293_797546623142953_5081384216400704788_n.jpg",
    title: "Pháo sáng rực rỡ chào đón tân sinh viên",
    category: "Chào Tân Sinh Viên",
    year: "2024",
  },
  {
    id: "ct-6",
    src: "/assets/events/chao-tan/564666827_792355520328730_6126403052533398563_n.jpg",
    title: "Cảm xúc thăng hoa tại Quảng trường C1",
    category: "Chào Tân Sinh Viên",
    year: "2024",
  },
  {
    id: "ct-7",
    src: "/assets/events/chao-tan/571194344_797545099809772_5404871312392483810_n.jpg",
    title: "Đội ngũ BTC Ban Văn nghệ Thể thao sau cánh gà",
    category: "Chào Tân Sinh Viên",
    year: "2024",
  },

  // BK Got Talent
  {
    id: "bkgt-1",
    src: "/assets/events/bk-got-talent/484097268_1150422160057788_1295660705058046785_n.jpg",
    title: "Tiết mục tranh tài đêm Gala Chung kết",
    category: "Bách Khoa Got Talent",
    year: "2024",
  },
  {
    id: "bkgt-2",
    src: "/assets/events/bk-got-talent/484501144_1150422193391118_3937382025129125985_n.jpg",
    title: "Ban giám khảo và các thí sinh xuất sắc",
    category: "Bách Khoa Got Talent",
    year: "2024",
  },
  {
    id: "bkgt-3",
    src: "/assets/events/bk-got-talent/484364634_1150422140057790_1986125813148609171_n.jpg",
    title: "Màn trình diễn nghệ thuật ấn tượng",
    category: "Bách Khoa Got Talent",
    year: "2024",
  },
  {
    id: "bkgt-4",
    src: "/assets/events/bk-got-talent/482352907_1150422163391121_2720353401748659601_n.jpg",
    title: "Đêm thi tài năng bùng nổ hội trường C2",
    category: "Bách Khoa Got Talent",
    year: "2024",
  },
  {
    id: "bkgt-5",
    src: "/assets/events/bk-got-talent/484170761_1150422146724456_9045358129090930114_n.jpg",
    title: "Khoảnh khắc trao cúp Quán quân BK Got Talent",
    category: "Bách Khoa Got Talent",
    year: "2024",
  },

  // Mr & Miss BK
  {
    id: "mm-1",
    src: "/assets/events/mr-miss/TRT_7014.jpg",
    title: "Tỏa sáng tại đêm Chung kết Mr & Miss Bách khoa",
    category: "Mr & Miss BK",
    year: "2025",
  },
  {
    id: "mm-2",
    src: "/assets/events/mr-miss/612056440_1379294523837216_7495395552591115444_n.jpg",
    title: "Top thí sinh tài sắc vẹn toàn HUST",
    category: "Mr & Miss BK",
    year: "2025",
  },
  {
    id: "mm-3",
    src: "/assets/events/mr-miss/TRT_6790.jpg",
    title: "Phần thi trang phục dạ hội lộng lẫy",
    category: "Mr & Miss BK",
    year: "2025",
  },
  {
    id: "mm-4",
    src: "/assets/events/mr-miss/TRT_6982.jpg",
    title: "Phong thái tự tin và bản lĩnh sân khấu",
    category: "Mr & Miss BK",
    year: "2025",
  },
  {
    id: "mm-5",
    src: "/assets/events/mr-miss/VHA_6963.jpg",
    title: "Đăng quang ngôi vị cao quý nhất",
    category: "Mr & Miss BK",
    year: "2025",
  },

  // BK Fashion Show
  {
    id: "fs-1",
    src: "/assets/events/bkfs/649135125_122163166808698245_7267003324474995220_n.jpg",
    title: "Sàn runway đẳng cấp Bách Khoa Fashion Show",
    category: "BK Fashion Show",
    year: "2024",
  },
  {
    id: "fs-2",
    src: "/assets/events/bkfs/649177098_122163167228698245_799143808575145452_n.jpg",
    title: "Bộ sưu tập thời trang sáng tạo từ sinh viên",
    category: "BK Fashion Show",
    year: "2024",
  },
  {
    id: "fs-3",
    src: "/assets/events/bkfs/648861435_122163167024698245_675666074437531202_n.jpg",
    title: "Thần thái trình diễn chuyên nghiệp",
    category: "BK Fashion Show",
    year: "2024",
  },
  {
    id: "fs-4",
    src: "/assets/events/bkfs/649224940_122163167168698245_3885583844373051397_n.jpg",
    title: "Visual ánh sáng và âm nhạc hòa quyện",
    category: "BK Fashion Show",
    year: "2024",
  },

  // HUST Club Day
  {
    id: "cd-1",
    src: "/assets/events/hust-club-day/561981551_791911577039791_2935054371516643466_n.jpg",
    title: "Gian hàng trải nghiệm sôi động HUST Club Day",
    category: "HUST Club Day",
    year: "2024",
  },
  {
    id: "cd-2",
    src: "/assets/events/hust-club-day/562303051_791898387041110_6255576229222733276_n.jpg",
    title: "Giao lưu tuyển thành viên các câu lạc bộ",
    category: "HUST Club Day",
    year: "2024",
  },
  {
    id: "cd-3",
    src: "/assets/events/hust-club-day/561776000_791797397051209_4962759691120156503_n.jpg",
    title: "Sức hút không hạ nhiệt từ các hoạt động ngoài trời",
    category: "HUST Club Day",
    year: "2024",
  },
  {
    id: "cd-4",
    src: "/assets/events/hust-club-day/561249090_797546146476334_2799030172653842311_n.jpg",
    title: "Nụ cười rạng rỡ của tân binh Bách khoa",
    category: "HUST Club Day",
    year: "2024",
  },

  // Thể thao BK Cup
  {
    id: "sport-1",
    src: "/assets/events/bk-cup/bk-cup-1.jpg",
    title: "Giải bóng đá thường niên BK Cup kịch tính",
    category: "BK Cup & Thể thao",
    year: "2024",
  },
  {
    id: "sport-2",
    src: "/assets/events/bk-cup/bk-cup-2.jpg",
    title: "Tinh thần thi đấu fair-play và quả cảm",
    category: "BK Cup & Thể thao",
    year: "2024",
  },

  // Mảng & CLB
  {
    id: "div-1",
    src: "/assets/divisions/to-chuc/ALX_0137.jpeg",
    title: "Đại gia đình Mảng Tổ chức BVNTT",
    category: "Mảng & CLB",
    year: "2025",
  },
  {
    id: "div-2",
    src: "/assets/divisions/truyen-thong/ALX_0234(1).jpeg",
    title: "Thế hệ năng động Mảng Truyền thông",
    category: "Mảng & CLB",
    year: "2025",
  },
  {
    id: "div-3",
    src: "/assets/divisions/media-design/ALX_0201.JPG",
    title: "Biệt đội sáng tạo Media - Design",
    category: "Mảng & CLB",
    year: "2025",
  },
  {
    id: "div-4",
    src: "/assets/divisions/doi-ngoai/ALX_9911.JPG",
    title: "Khối gắn kết Mảng Đối ngoại",
    category: "Mảng & CLB",
    year: "2025",
  },
  {
    id: "club-1",
    src: "/assets/clubs/gleebk/571811436_1385038383623583_1915918929973790816_n.jpg",
    title: "CLB Âm nhạc Glee BK trên sân khấu",
    category: "Mảng & CLB",
    year: "2024",
  },
  {
    id: "club-2",
    src: "/assets/clubs/beu/576392063_1349500446964851_4391470027039026053_n.jpg",
    title: "CLB Vũ đạo BEU Dance Club bùng cháy",
    category: "Mảng & CLB",
    year: "2024",
  },
  {
    id: "club-3",
    src: "/assets/clubs/dop/660479700_1431139442142865_3038517156482335145_n.jpg",
    title: "CLB Nhiếp ảnh & Quay phim DOP",
    category: "Mảng & CLB",
    year: "2024",
  },
  {
    id: "club-4",
    src: "/assets/clubs/emcee/713824539_1576895624440303_6356811856293780906_n.jpg",
    title: "CLB MC Đại học Bách khoa dẫn dắt sân khấu",
    category: "Mảng & CLB",
    year: "2024",
  },
];

const CATEGORIES = [
  "Tất cả",
  "Chào Tân Sinh Viên",
  "Bách Khoa Got Talent",
  "Mr & Miss BK",
  "BK Fashion Show",
  "HUST Club Day",
  "BK Cup & Thể thao",
  "Mảng & CLB",
];

interface GalleryPageProps {
  onBack: () => void;
  onNavigateToHomeSection?: (sectionId: string) => void;
  onNavigateToPage?: (path: string) => void;
}

export const GalleryPage = ({
  onBack,
  onNavigateToHomeSection,
  onNavigateToPage,
}: GalleryPageProps) => {
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredPhotos = useMemo(() => {
    if (selectedCategory === "Tất cả") return GALLERY_PHOTOS;
    return GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const activePhoto = activePhotoIndex !== null ? filteredPhotos[activePhotoIndex] : null;

  const handleNextPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! + 1) % filteredPhotos.length);
  }, [activePhotoIndex, filteredPhotos.length]);

  const handlePrevPhoto = useCallback(() => {
    if (activePhotoIndex === null) return;
    setActivePhotoIndex((prev) => (prev! - 1 + filteredPhotos.length) % filteredPhotos.length);
  }, [activePhotoIndex, filteredPhotos.length]);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    if (activePhotoIndex === null) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActivePhotoIndex(null);
      if (e.key === "ArrowRight") handleNextPhoto();
      if (e.key === "ArrowLeft") handlePrevPhoto();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhotoIndex, handleNextPhoto, handlePrevPhoto]);

  return (
    <div className="relative min-h-screen bg-[#07040d] text-white selection:bg-bvntt-lilac selection:text-black overflow-x-hidden flex flex-col">
      <MouseGradient />

      {/* Global Navbar */}
      <Navbar
        onNavigateToHomeSection={onNavigateToHomeSection}
        onNavigateToPage={onNavigateToPage}
      />

      <main className="flex-1 pt-24 md:pt-32 pb-24">
        <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16">
          {/* Top Back Navigation Bar */}
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
            <button
              onClick={onBack}
              className="group inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.1em] uppercase text-bvntt-muted hover:text-bvntt-cream transition-colors duration-300 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Quay lại Trang chủ</span>
            </button>

            <div className="text-xs text-bvntt-muted">
              <span>Đang hiển thị <strong className="text-bvntt-cream">{filteredPhotos.length}</strong> khoảnh khắc</span>
            </div>
          </div>

          {/* Hero Header */}
          <div className="max-w-4xl mb-12 md:mb-16">
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl md:text-6xl lg:text-7xl uppercase text-bvntt-cream leading-tight tracking-normal">
              KHOẢNH KHẮC <span className="text-bvntt-lilac">BVNTT</span>
            </h1>
            <p className="text-sm sm:text-base text-bvntt-muted font-normal max-w-2xl mt-4 leading-relaxed">
              Nơi lưu giữ từng nhịp đập, nụ cười, ngọn lửa đam mê và những dấu ấn không thể phai mờ của các thế hệ thành viên Ban Văn nghệ Thể thao qua từng mùa sự kiện.
            </p>
          </div>

          {/* Album / Category Filter Pills */}
          <div className="flex items-center gap-2 flex-wrap mb-12">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setActivePhotoIndex(null);
                  }}
                  className={`px-4 py-2 text-xs uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer border ${
                    active
                      ? "bg-bvntt-lilac text-[#07040d] border-bvntt-lilac font-bold shadow-lg"
                      : "bg-white/[0.02] text-white/60 border-white/[0.08] hover:text-white hover:bg-white/[0.05]"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Photos Masonry / Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {filteredPhotos.map((photo, index) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, delay: (index % 12) * 0.04 }}
                onClick={() => setActivePhotoIndex(index)}
                className="group relative aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/3] bg-[#0d071a] border border-white/[0.08] hover:border-bvntt-lilac/60 overflow-hidden cursor-pointer shadow-lg transition-all duration-400"
              >
                <img
                  src={photo.src}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  loading="lazy"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4" />

                {/* Hover Badge / Year */}
                <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider uppercase bg-black/80 text-bvntt-lilac border border-bvntt-lilac/30 backdrop-blur-md">
                    {photo.category}
                  </span>
                </div>

                {/* Hover Zoom Icon */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-8 h-8 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white backdrop-blur-sm">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>

                {/* Title & Caption */}
                <div className="absolute bottom-0 inset-x-0 p-4 transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <p className="text-xs font-semibold text-bvntt-cream line-clamp-2 leading-snug">
                    {photo.title}
                  </p>
                  {photo.year && (
                    <span className="text-[10px] text-white/50 mt-1 block">Năm {photo.year}</span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      {/* ── Lightbox Full-screen Modal ── */}
      <AnimatePresence>
        {activePhoto && activePhotoIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 md:p-10">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActivePhotoIndex(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-xl"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-5xl max-h-[92vh] flex flex-col bg-[#0a0514] border border-white/10 shadow-2xl overflow-hidden"
            >
              {/* Header Bar */}
              <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.08] bg-[#0c0718]">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold text-bvntt-lilac uppercase tracking-wider">
                    {activePhoto.category}
                  </span>
                  <span className="text-white/20">•</span>
                  <span className="text-xs text-white/60">
                    Ảnh {activePhotoIndex + 1} / {filteredPhotos.length}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={activePhoto.src}
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border border-white/10 hover:border-bvntt-lilac text-white/70 hover:text-white transition-colors"
                    title="Mở ảnh gốc"
                  >
                    <Download className="w-4 h-4" />
                  </a>
                  <button
                    onClick={() => setActivePhotoIndex(null)}
                    className="p-2 border border-white/10 hover:border-white/30 text-white/70 hover:text-white transition-colors cursor-pointer"
                    aria-label="Đóng"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Photo Display Viewport */}
              <div className="relative flex-1 min-h-[300px] max-h-[70vh] bg-black/60 flex items-center justify-center p-2 overflow-hidden select-none">
                <img
                  src={activePhoto.src}
                  alt={activePhoto.title}
                  className="max-w-full max-h-[68vh] object-contain rounded"
                />

                {/* Prev Button */}
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 hover:border-bvntt-lilac text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  aria-label="Ảnh trước"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Button */}
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/70 hover:bg-black/90 border border-white/20 hover:border-bvntt-lilac text-white flex items-center justify-center backdrop-blur-md transition-all cursor-pointer"
                  aria-label="Ảnh tiếp theo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Bottom Caption Bar */}
              <div className="px-6 py-4 border-t border-white/[0.08] bg-[#0c0718] flex items-center justify-between">
                <div>
                  <h3 className="font-sans font-bold text-sm sm:text-base text-bvntt-cream">
                    {activePhoto.title}
                  </h3>
                  {activePhoto.year && (
                    <p className="text-xs text-bvntt-muted mt-0.5">Ghi lại vào năm {activePhoto.year}</p>
                  )}
                </div>

                <div className="text-[11px] text-white/40 hidden sm:block">
                  Sử dụng phím ⬅️ ➡️ để chuyển ảnh, Esc để đóng
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Global Footer */}
      <Footer />
    </div>
  );
};
