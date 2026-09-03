export interface ClubItem {
  id: string;
  name: string;
  fullName: string;
  category: "dance" | "music" | "theater" | "mc" | "rock" | "sports";
  categoryLabel: string;
  shortDesc: string;
  description: string;
  highlights: string[];
  color: string;
  tag: string;
}

export const CLUBS_DATA: ClubItem[] = [
  {
    id: "dop",
    name: "D.O.P",
    fullName: "Dancers of Polytech",
    category: "dance",
    categoryLabel: "Vũ đạo & Street Dance",
    color: "#D6B9FF",
    tag: "Choreography / Hip-hop / Kpop Cover",
    shortDesc: "Câu lạc bộ Vũ đạo hàng đầu Bách khoa với những bước nhảy mạnh mẽ, bùng nổ và đầy kỹ thuật trên mọi sân khấu lớn nhỏ.",
    description: "D.O.P (Dancers of Polytech) quy tụ những bạn trẻ đam mê vũ đạo với đa dạng thể loại từ Hip-hop, Urban Choreography, Breaking đến Kpop Cover. D.O.P luôn là tâm điểm khuấy động không khí trong mọi đại nhạc hội và giành nhiều giải thưởng cao tại các giải đấu vũ đạo sinh viên toàn quốc.",
    highlights: ["Biểu diễn chính tại Chào Tân & BK Got Talent", "Tham gia các giải đấu Dance Showcase toàn quốc", "Lớp training vũ đạo bài bản cho thành viên mới"]
  },
  {
    id: "gleebk",
    name: "GleeBK",
    fullName: "Glee Bách Khoa",
    category: "music",
    categoryLabel: "Âm nhạc & Band / Vocal",
    color: "#6A00FF",
    tag: "Vocal / Acoustic / Band",
    shortDesc: "Ngôi nhà của những giọng ca cảm xúc, các nhạc công tài năng và những bản hòa âm say đắm lòng người.",
    description: "GleeBK là câu lạc bộ âm nhạc nơi những trái tim yêu hát và chơi nhạc cụ hòa nhịp. Từ những bản ballad nhẹ nhàng, pop acoustic đến những màn mashup hòa thanh hoành tráng, GleeBK luôn mang lại những giai điệu thanh xuân ngọt ngào và đầy cảm hứng cho sinh viên HUST.",
    highlights: ["Các minishow âm nhạc định kỳ được yêu thích", "Phụ trách dàn dựng hợp xướng & band nhạc sự kiện", "Sản xuất các sản phẩm âm nhạc, cover viral"]
  },
  {
    id: "beu",
    name: "BeU",
    fullName: "BeU Dance Club",
    category: "dance",
    categoryLabel: "Nghệ thuật & Nhảy hiện đại",
    color: "#FF9D15",
    tag: "Modern Dance / Flashmob / Art Performance",
    shortDesc: "Tỏa sáng với phong cách tự tin, sáng tạo và những bài nhảy nghệ thuật tràn đầy năng lượng tươi mới.",
    description: "BeU là nơi lan tỏa tinh thần 'Be Yourself' - sống đúng với cá tính và đam mê. Câu lạc bộ nổi tiếng với các bài nhảy hiện đại, flashmob quy mô lớn và các tiết mục nhảy đương đại sâu lắng, mang dấu ấn nghệ thuật riêng biệt.",
    highlights: ["Biên đạo các tiết mục mở màn hoành tráng", "Tổ chức các sự kiện flashmob kết nối cộng đồng", "Môi trường năng động, truyền cảm hứng sống tích cực"]
  },
  {
    id: "das",
    name: "D.A.S",
    fullName: "Dramatic Art Squad",
    category: "theater",
    categoryLabel: "Kịch nghệ & Diễn xuất",
    color: "#D6B9FF",
    tag: "Drama / Acting / Stage Play",
    shortDesc: "Nơi thăng hoa cảm xúc sân khấu với những vở kịch sâu sắc, hài hước và giàu tính nhân văn của sinh viên Bách khoa.",
    description: "D.A.S mang kịch nghệ đến gần hơn với đời sống sinh viên. Từ hài kịch, kịch tâm lý xã hội đến kịch đương đại, các thành viên D.A.S luôn chứng minh rằng sinh viên kỹ thuật không hề khô khan mà sở hữu tâm hồn nghệ thuật vô cùng phong phú và sắc sảo.",
    highlights: ["Sản xuất các vở kịch sân khấu thường niên", "Diễn xuất trong các tiểu phẩm sự kiện & truyền thông", "Rèn luyện khả năng biểu cảm, đài từ và làm chủ sân khấu"]
  },
  {
    id: "emcee",
    name: "Emcee",
    fullName: "HUST MC Club",
    category: "mc",
    categoryLabel: "Người dẫn chương trình & Host",
    color: "#EDFF00",
    tag: "Host / Public Speaking / Voice Talent",
    shortDesc: "Những gương mặt tự tin, giọng nói truyền cảm và phong thái bản lĩnh làm chủ mọi sân khấu lớn nhỏ.",
    description: "CLB MC Bách khoa (Emcee) là cái nôi đào tạo và quy tụ những người dẫn chương trình tài năng, duyên dáng và linh hoạt. Thành viên Emcee đảm nhiệm vai trò host cho hầu hết các sự kiện chính quy, đại nhạc hội và hội thảo của Đại học Bách khoa Hà Nội.",
    highlights: ["Dẫn dắt các sự kiện quy mô từ hàng trăm đến hàng vạn người", "Workshop kỹ năng nói trước công chúng & xử lý sân khấu", "Xây dựng phong thái đĩnh đạc, bản lĩnh và chuyên nghiệp"]
  },
  {
    id: "hro",
    name: "HRO",
    fullName: "HUST Rock Organization",
    category: "rock",
    categoryLabel: "Rock & Heavy Band",
    color: "#FF3366",
    tag: "Rock / Metal / Live Bands",
    shortDesc: "Cháy hết mình cùng ngọn lửa Rock cuồng nhiệt, tiếng guitar điện xé toạc màn đêm và những đêm diễn rực lửa.",
    description: "HRO là mái nhà chung của các tín đồ Rock tại Bách khoa. Với những đêm Rockshow bùng nổ, HRO mang đến chất 'nhiệt' hoang dại, mạnh mẽ và không thỏa hiệp, khẳng định vị thế của một trong những cộng đồng Rock sinh viên lâu đời và chất nhất Hà Nội.",
    highlights: ["Tổ chức các Rock Night thường niên chật kín khán giả", "Quy tụ các ban nhạc rock sinh viên tài năng", "Giao lưu cùng các Rock band huyền thoại Việt Nam"]
  },
  {
    id: "hbc",
    name: "HBC",
    fullName: "HUST Basketball Club",
    category: "sports",
    categoryLabel: "Thể thao & Bóng rổ",
    color: "#00E5FF",
    tag: "Basketball / Athletics / Sports Spirit",
    shortDesc: "Đại diện cho tinh thần thể thao kiên cường, tốc độ và sức mạnh của những 'chiến binh' bóng rổ Bách khoa.",
    description: "HBC là câu lạc bộ bóng rổ quy tụ những tài năng thể thao hàng đầu của trường. Câu lạc bộ thường xuyên đại diện HUST tham gia và đạt thành tích cao tại các giải bóng rổ sinh viên Hà Nội, đồng thời tổ chức các giải đấu nội bộ sôi nổi nhằm phát triển phong trào rèn luyện thể chất.",
    highlights: ["Đội tuyển thi đấu tại các giải sinh viên toàn quốc", "Tổ chức các giải bóng rổ 3x3 và 5x5 toàn trường", "Lan tỏa lối sống năng động, khỏe khoắn và tinh thần đồng đội"]
  }
];
