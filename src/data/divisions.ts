export interface DivisionItem {
  id: string;
  order: string;
  name: string;
  role: string;
  shortDesc: string;
  description: string;
  tasks: { title: string; detail: string }[];
  tag: string;
  image: string;
  gallery: string[];
  skills: string[];
}

export const DIVISIONS_DATA: DivisionItem[] = [
  {
    id: "to-chuc",
    order: "01",
    name: "Mảng Tổ chức",
    role: "Khối óc vận hành & Trái tim của mọi sự kiện",
    tag: "Operation & Management",
    image: "/assets/divisions/to-chuc/ALX_0137.jpeg",
    shortDesc: "Người đứng sau ánh hào quang nhưng đóng vai trò cốt lõi trong việc hiện thực hóa mọi ý tưởng thành những sự kiện bùng nổ.",
    description: "Công việc của mảng Tổ chức được ví như người đứng sau ánh hào quang nhưng đóng vai trò cốt lõi trong việc hiện thực hóa mọi ý tưởng thành những sự kiện bùng nổ. Từ những bản kế hoạch trên giấy tờ đến giây phút sân khấu rực rỡ và các vận động viên bước vào sân cỏ, mảng Tổ chức chính là bộ máy điều phối nhịp nhàng và chính xác nhất.",
    tasks: [
      {
        title: "Xây dựng kế hoạch",
        detail: "Lên ý tưởng, xây dựng đề án và kế hoạch chi tiết cho các chương trình, sự kiện, cuộc thi hay giải đấu thể thao."
      },
      {
        title: "Điều phối và vận hành",
        detail: "Trực tiếp triển khai, điều phối và theo dõi sát sao tiến độ các hoạt động để đảm bảo mọi thứ diễn ra suôn sẻ, đúng chuẩn."
      },
      {
        title: "Hậu cần và takecare",
        detail: "Chịu trách nhiệm toàn diện về khâu hậu cần, chuẩn bị đạo cụ, trang thiết bị và chăm sóc chu đáo khách mời, nghệ sĩ."
      },
      {
        title: "Thủ tục hành chính",
        detail: "Xử lý và làm việc với các loại giấy tờ, thủ tục nội bộ cần thiết với Đoàn trường và các phòng ban Đại học Bách khoa Hà Nội."
      },
      {
        title: "Quản lý và gắn kết nhân sự",
        detail: "Quản lý nhân sự trong Ban và chủ trì tổ chức các hoạt động nội bộ nhằm thắt chặt tinh thần đoàn kết, gắn bó."
      }
    ],
    skills: ["Lập kế hoạch & Quản trị dự án", "Xử lý tình huống linh hoạt", "Kỹ năng lãnh đạo & Teamwork", "Quản lý hậu cần"],
    gallery: [
      "/assets/divisions/to-chuc/ALX_0137.jpeg",
      "/assets/divisions/to-chuc/ALX_0150.jpeg",
      "/assets/divisions/to-chuc/ALX_0149.jpeg",
      "/assets/divisions/to-chuc/ALX_0145.jpeg",
      "/assets/divisions/to-chuc/ALX_0144.jpeg",
      "/assets/divisions/to-chuc/ALX_0138.jpeg"
    ]
  },
  {
    id: "truyen-thong",
    order: "02",
    name: "Mảng Truyền thông",
    role: "Tiếng nói lan tỏa & Định hướng thông điệp",
    tag: "Communication & Content",
    image: "/assets/divisions/truyen-thong/ALX_0234(1).jpeg",
    shortDesc: "Người định hướng tiếng nói, lan tỏa thông điệp và kết nối các chương trình đến gần hơn với mọi người.",
    description: "Mảng Truyền thông là người định hướng tiếng nói, lan tỏa thông điệp và kết nối các chương trình của Ban Văn nghệ Thể thao đến gần hơn với hàng vạn sinh viên Bách khoa và cộng đồng. Bằng ngòi bút sắc bén, khả năng bắt trend nhạy bén và tư duy chiến lược, Truyền thông thổi bùng sức nóng cho mọi chiến dịch.",
    tasks: [
      {
        title: "Lên kế hoạch truyền thông",
        detail: "Xây dựng kế hoạch truyền thông toàn diện (cả online và offline) cho các chương trình, sự kiện và cuộc thi lớn."
      },
      {
        title: "Quản lý kênh thông tin",
        detail: "Quản lý và phát triển các nền tảng mạng xã hội của Ban cũng như các fanpage dự án, sự kiện trực thuộc."
      },
      {
        title: "Sáng tạo nội dung (Copywriting)",
        detail: "Lên ý tưởng, viết bài, sáng tạo thông điệp viral và kịch bản thu hút trên các phương tiện truyền thông xã hội."
      },
      {
        title: "Phối hợp sản xuất",
        detail: "Làm việc chặt chẽ cùng mảng Media - Design để định hướng và cho ra đời những ấn phẩm, buổi chụp hình chất lượng."
      },
      {
        title: "Làm mẫu ảnh & Diễn xuất",
        detail: "Trực tiếp tham gia làm mẫu ảnh, diễn xuất trong các video truyền thông, clip giải trí để tạo điểm nhấn hút mắt."
      }
    ],
    skills: ["Copywriting & Storytelling", "Sáng tạo nội dung Social Media", "Tư duy truyền thông đa kênh", "Bắt trend & Diễn xuất"],
    gallery: [
      "/assets/divisions/truyen-thong/ALX_0234(1).jpeg",
      "/assets/divisions/truyen-thong/ALX_0264.jpeg",
      "/assets/divisions/truyen-thong/ALX_0232.jpeg",
      "/assets/divisions/truyen-thong/ALX_0273.jpeg",
      "/assets/divisions/truyen-thong/ALX_0242.jpeg",
      "/assets/divisions/truyen-thong/ALX_0281.jpeg"
    ]
  },
  {
    id: "media-design",
    order: "03",
    name: "Mảng Media - Design",
    role: "Thổi hồn thị giác & Nghệ thuật thị giác",
    tag: "Visual Design & Production",
    image: "/assets/divisions/media-design/ALX_0201.JPG",
    shortDesc: "Người thổi hồn vào mọi dự án, biến những ý tưởng trừu tượng thành các sản phẩm thị giác ấn tượng và lưu giữ những khoảnh khắc đáng nhớ nhất.",
    description: "Mảng Media - Design chính là người thổi hồn vào mọi dự án, biến những ý tưởng trừu tượng thành các sản phẩm thị giác ấn tượng và lưu giữ những khoảnh khắc đáng nhớ nhất. Với ống kính nghệ thuật và tư duy thiết kế đột phá, Media - Design tạo nên diện mạo cuốn hút và định hình phong cách thị giác đậm chất BVNTT.",
    tasks: [
      {
        title: "Sáng tạo Concept & Bộ nhận diện",
        detail: "Lên ý tưởng hình ảnh, xây dựng concept và bộ nhận diện độc quyền (key visual) cho các sự kiện, chương trình, cuộc thi hay giải đấu."
      },
      {
        title: "Phối hợp Truyền thông",
        detail: "Đồng hành cùng mảng Truyền thông để sản xuất các ấn phẩm visual, banner online, carousel phục vụ các nền tảng mạng xã hội."
      },
      {
        title: "Thiết kế ấn phẩm Offline",
        detail: "Đảm nhận toàn bộ khâu thiết kế các ấn phẩm in ấn, trang trí trực tiếp như backdrop sân khấu, photobooth, banner, standee, thẻ đeo, sticker..."
      },
      {
        title: "Nhiếp ảnh & Quay phim (Production)",
        detail: "Trực tiếp chụp ảnh, quay phim để ghi lại trọn vẹn những khoảnh khắc bùng nổ, cảm xúc trong các chương trình và sự kiện."
      },
      {
        title: "Hậu kỳ chuyên nghiệp",
        detail: "Dựng phim recap, chỉnh sửa video, blend màu ảnh nghệ thuật và thiết kế motion graphic để tăng tính sinh động cho các sản phẩm truyền thông."
      }
    ],
    skills: ["Graphic Design & Typography", "Photoshop / Illustrator / Figma", "Quay phim & Nhiếp ảnh sự kiện", "Premiere / After Effects"],
    gallery: [
      "/assets/divisions/media-design/ALX_0201.JPG",
      "/assets/divisions/media-design/ALX_0208.JPG"
    ]
  },
  {
    id: "doi-ngoai",
    order: "04",
    name: "Mảng Đối ngoại",
    role: "Cầu nối nguồn lực & Mở rộng mạng lưới",
    tag: "External Relations & Sponsorship",
    image: "/assets/divisions/doi-ngoai/ALX_9911.JPG",
    shortDesc: "Cầu nối vững chắc đưa Ban Văn nghệ Thể thao đảm bảo nguồn lực tài chính ổn định cho mọi chương trình.",
    description: "Mảng Đối ngoại là cầu nối vững chắc đưa Ban Văn nghệ Thể thao đảm bảo nguồn lực tài chính ổn định cho mọi chương trình. Đồng thời, Đối ngoại mở rộng mạng lưới liên kết với các doanh nghiệp, nhãn hàng lớn, cùng các trường đại học và đối tác truyền thông khắp cả nước.",
    tasks: [
      {
        title: "Kêu gọi tài trợ",
        detail: "Chủ động tìm kiếm, tiếp cận và đàm phán với các doanh nghiệp, nhà tài trợ để đồng hành cùng các chương trình, sự kiện, cuộc thi hay giải đấu."
      },
      {
        title: "Chăm sóc đối tác",
        detail: "Duy trì, giữ vững và phát triển mối quan hệ bền chặt với các nhà tài trợ, đối tác chiến lược, đảm bảo quyền lợi nhà tài trợ."
      },
      {
        title: "Quản lý tài chính",
        detail: "Lên kế hoạch thu - chi chi tiết, lập bảng dự trù tài chính cho từng hoạt động, sự kiện và cuộc thi của Ban."
      },
      {
        title: "Mở rộng mạng lưới",
        detail: "Kết nối Ban Văn nghệ Thể thao với các đơn vị Đoàn - Hội, doanh nghiệp và các trường đại học khác để xây dựng mạng lưới sinh viên vững mạnh."
      },
      {
        title: "Gắn kết nội bộ",
        detail: "Phối hợp nhịp nhàng cùng mảng Tổ chức để thực hiện các hoạt động nội bộ và tri ân thành viên của Ban."
      }
    ],
    skills: ["Đàm phán & Thuyết phục đối tác", "Soạn thảo hồ sơ tài trợ chuyên nghiệp", "Giao tiếp & Ngoại giao", "Quản lý tài chính sự kiện"],
    gallery: [
      "/assets/divisions/doi-ngoai/ALX_9911.JPG",
      "/assets/divisions/doi-ngoai/ALX_9913.JPG"
    ]
  }
];
