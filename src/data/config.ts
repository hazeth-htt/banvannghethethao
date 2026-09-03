export const SITE_CONFIG = {
  name: "Ban Văn nghệ Thể thao",
  subName: "Đoàn Đại học Bách khoa Hà Nội",
  shortName: "BVNTT HUST",
  description: "Ban Văn nghệ Thể thao — Đoàn Đại học Bách khoa Hà Nội. Nơi khơi nguồn đam mê, thắp sáng tài năng và lưu giữ những khoảnh khắc thanh xuân rực rỡ nhất dưới mái trường Bách khoa.",
  facebookUrl: "https://www.facebook.com/bvnttbkhn",
  recruitmentFormUrl: "https://forms.gle/bvntt-tuyen-thanh-vien-2026",
  email: "vannghethethao.hust@gmail.com",
  phone: "024 3869 2222",
  address: "Phòng 102 Nhà D3-5, Đại học Bách khoa Hà Nội, Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
  recruitment: {
    year: "2026",
    title: "Tuyển thành viên đợt 1 - 2026",
    tagline: "CHÍNH THỨC MỞ ĐƠN",
    stages: [
      {
        date: "01/09",
        fullDate: "01/09/2026",
        title: "Mở đơn",
        description: "Chính thức phát động đợt tuyển thành viên mới trên toàn trường",
        status: "completed" as const,
      },
      {
        date: "16/09",
        fullDate: "16/09/2026",
        title: "Đóng đơn",
        description: "Hạn chót tiếp nhận hồ sơ đăng ký tham gia các mảng và câu lạc bộ",
        status: "active" as const,
      },
      {
        date: "19/09",
        fullDate: "19/09/2026",
        title: "Phỏng vấn",
        description: "Vòng phỏng vấn trực tiếp cùng Ban Chủ nhiệm và Trưởng các mảng",
        status: "upcoming" as const,
      },
    ],
  },
};
