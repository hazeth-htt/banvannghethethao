export interface EventItem {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  timeframe: string;
  coverImage: string;
  description: string;
  shortDescription: string;
  highlights: string[];
  gallery: string[];
  stats?: { label: string; value: string }[];
}

export const EVENTS_DATA: EventItem[] = [
  {
    id: "chao-tan",
    slug: "chao-tan-sinh-vien-bach-khoa",
    title: "Chào tân sinh viên Bách khoa",
    subtitle: "Đại nhạc hội bùng nổ mở đầu năm học mới",
    category: "Lễ hội Âm nhạc",
    timeframe: "Tháng 10 hàng năm",
    coverImage: "/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg",
    shortDescription: "Mỗi dịp đầu năm học, sự kiện chào tân luôn là dấu mốc quan trọng, chính thức mở ra cánh cửa đưa các bạn tân sinh viên bước vào một thế giới mới tại ngôi nhà chung Bách khoa.",
    description: "Mỗi dịp đầu năm học, sự kiện chào tân luôn là dấu mốc quan trọng, chính thức mở ra cánh cửa đưa các bạn tân sinh viên bước vào một thế giới mới tại ngôi nhà chung Bách khoa. Không chỉ là một chương trình chào đón thông thường, đây là không gian hội tụ của âm nhạc, ánh sáng và những màn trình diễn bùng nổ, phản ánh trọn vẹn tinh thần năng động, nhiệt huyết và chất 'máu lửa' đặc trưng của sinh viên kỹ thuật.\n\nĐể mang đến một sân khấu chỉn chu và những khoảnh khắc đáng nhớ nhất cho ngày đầu nhập học, Ban Văn nghệ Thể thao đã miệt mài chuẩn bị, chăm chút từng chi tiết nhỏ từ khâu lên ý tưởng, tổ chức đến vận hành. Sự kiện không chỉ là lời chào mừng chính thức gửi đến các bạn tân binh, mà còn là lời khẳng định về một thanh xuân Bách khoa không khô khan, mà vô cùng rực rỡ và đầy trải nghiệm.",
    highlights: [
      "Sân khấu quy mô hơn 10.000 sinh viên tham dự",
      "Sự góp mặt của các ca sĩ, nghệ sĩ khách mời hàng đầu",
      "Tiết mục đặc sắc từ 7 CLB trực thuộc BVNTT",
      "Hiệu ứng âm thanh, ánh sáng & visual đỉnh cao",
    ],
    gallery: [
      "/assets/events/chao-tan/564597581_792333290330953_1181562350669538861_n.jpg",
      "/assets/events/chao-tan/565647031_792355210328761_4750042045286568568_n.jpg",
      "/assets/events/chao-tan/564169905_792333330330949_2167734436037803178_n.jpg",
      "/assets/events/chao-tan/570170705_797544896476459_7237356573905969307_n.jpg",
      "/assets/events/chao-tan/565898254_792355406995408_2175179391795983221_n.jpg",
      "/assets/events/chao-tan/571254293_797546623142953_5081384216400704788_n.jpg",
    ],
    stats: [
      { label: "Khán giả", value: "10,000+" },
      { label: "Nghệ sĩ & CLB", value: "50+" },
      { label: "Thời lượng", value: "5 Giờ" },
    ],
  },
  {
    id: "mr-miss",
    slug: "mr-and-miss-bach-khoa-2025",
    title: "Mr & Miss Bách khoa",
    subtitle: "Tôn vinh vẻ đẹp trí tuệ và bản lĩnh sinh viên HUST",
    category: "Cuộc thi Nhan sắc & Tài năng",
    timeframe: "Quy mô toàn trường",
    coverImage: "/assets/events/mr-miss/TRT_7014.jpg",
    shortDescription: "Được ví như 'sân khấu danh giá' bậc nhất của dân kỹ thuật, nơi hội tụ những gương mặt ưu tú vừa sắc sảo trong tư duy, vừa bứt phá trong phong thái.",
    description: "Được ví như 'sân khấu danh giá' bậc nhất của dân kỹ thuật, Mr & Miss Bách khoa là nơi hội tụ của những gương mặt ưu tú: vừa sắc sảo trong tư duy, vừa bứt phá trong phong thái và tỏa sáng trọn vẹn ở mọi góc nhìn. Cuộc thi không chỉ tìm kiếm những danh hiệu mà còn là bệ phóng để tôn vinh bản lĩnh, cá tính và vẻ đẹp toàn diện của thế hệ sinh viên Bách khoa thời đại mới.\n\nĐể mỗi vòng thi lăn bánh mượt mà và đêm chung kết vỡ oà trong ánh hào quang, Ban Văn nghệ Thể thao chính là những người hùng 'đứng sau ánh đèn' miệt mài vận hành từ khâu tổ chức, chăm chút từng chi tiết sân khấu đến việc kết nối cảm xúc, chúng mình đồng hành để đưa các thí sinh chạm tay đến đỉnh cao rực rỡ nhất.",
    highlights: [
      "Vòng sơ khảo, tài năng, trang phục dạ hội và ứng xử chuyên nghiệp",
      "Dàn ban giám khảo là các chuyên gia, hoa hậu và giảng viên uy tín",
      "Đêm chung kết hoành tráng truyền hình trực tiếp",
      "Lan tỏa hình ảnh sinh viên Bách khoa đa tài, thanh lịch",
    ],
    gallery: [
      "/assets/events/mr-miss/TRT_7014.jpg",
      "/assets/events/mr-miss/612056440_1379294523837216_7495395552591115444_n.jpg",
      "/assets/events/mr-miss/600186515_1365804605186208_43407359600057975_n.jpg",
      "/assets/events/mr-miss/TRT_6790.jpg",
      "/assets/events/mr-miss/TRT_6982.jpg",
      "/assets/events/mr-miss/VHA_7833.jpg",
    ],
    stats: [
      { label: "Thí sinh đăng ký", value: "300+" },
      { label: "Đêm Chung kết", value: "TOP 20" },
      { label: "Lượt tiếp cận", value: "500K+" },
    ],
  },
  {
    id: "bk-got-talent",
    slug: "bk-got-talent",
    title: "BK's Got Talent",
    subtitle: "Đại tiệc nghệ thuật phá vỡ định kiến khô khan",
    category: "Cuộc thi Tài năng",
    timeframe: "Mùa thi thường niên",
    coverImage: "/assets/events/bk-got-talent/484097268_1150422160057788_1295660705058046785_n.jpg",
    shortDescription: "Sân khấu chính thức để những tài năng nghệ thuật tiềm ẩn của dân kỹ thuật được thỏa sức bung xõa từ ca hát, vũ đạo đến trình diễn nghệ thuật.",
    description: "Định kiến Bách khoa chỉ toàn những công thức hay con số khô khan sẽ hoàn toàn bị phá vỡ tại BK's Got Talent. Đây là sân khấu chính thức để những tài năng nghệ thuật tiềm ẩn của dân kỹ thuật được thỏa sức bung xõa từ ca hát, vũ đạo cho đến những màn trình diễn bất ngờ và đầy cá tính.\n\nĐứng sau ánh đèn sân khấu rực rỡ và những tràng pháo tay không ngớt của khán giả chính là Ban Văn nghệ Thể thao với vai trò là ekip tổ chức để chăm chút từng chi tiết, biến những tiềm năng mộc mạc của sinh viên Bách khoa thành một đại tiệc nghệ thuật thăng hoa và đáng nhớ.",
    highlights: [
      "Đa dạng thể loại: Hát, Nhảy, Nhạc cụ, Beatbox, Ảo thuật, Kịch",
      "Ekip sản xuất sân khấu và âm thanh ánh sáng chuẩn chuyên nghiệp",
      "Bệ phóng cho các nghệ sĩ sinh viên tài năng",
    ],
    gallery: [
      "/assets/events/bk-got-talent/484097268_1150422160057788_1295660705058046785_n.jpg",
      "/assets/events/bk-got-talent/484501144_1150422193391118_3937382025129125985_n.jpg",
      "/assets/events/bk-got-talent/484364634_1150422140057790_1986125813148609171_n.jpg",
    ],
    stats: [
      { label: "Tiết mục tranh tài", value: "80+" },
      { label: "Đêm Gala", value: "GALA BÙNG NỔ" },
      { label: "Giải thưởng", value: "50M+" },
    ],
  },
  {
    id: "hust-club-day",
    slug: "hust-club-day",
    title: "HUST Club Day",
    subtitle: "Ngày hội các Câu lạc bộ toàn trường",
    category: "Ngày hội Sinh viên",
    timeframe: "Đầu năm học",
    coverImage: "/assets/events/hust-club-day/561981551_791911577039791_2935054371516643466_n.jpg",
    shortDescription: "Ngày hội lớn nhất trong năm quy tụ hàng chục câu lạc bộ và tổ đội với đa dạng màu sắc từ học thuật, thể thao đến nghệ thuật.",
    description: "Hust Club Day là ngày hội lớn nhất trong năm của sinh viên Bách khoa, quy tụ hàng chục câu lạc bộ và tổ đội với đa dạng màu sắc cá tính từ học thuật, thể thao cho đến nghệ thuật. Đây là sự kiện trọng điểm giúp các bạn tân sinh viên khám phá, trải nghiệm và tìm thấy 'ngôi nhà thứ hai' để gắn bó trong suốt chặng đường đại học.\n\nĐằng sau một ngày hội náo nhiệt, đầy năng lượng và mang đậm tinh thần Bách khoa ấy chính là tâm huyết của Ban Văn nghệ Thể thao - những người trực tiếp 'thổi hồn', kiến tạo và dựng nên không gian kết nối độc đáo để mỗi khoảnh khắc tại ngày hội trở nên đáng nhớ nhất.",
    highlights: [
      "Hơn 60 gian trại CLB & hoạt động tương tác độc đáo",
      "Sân khấu biểu diễn liên tục xuyên suốt ngày hội",
      "Không gian check-in và trải nghiệm văn hóa Bách khoa đa dạng",
    ],
    gallery: [
      "/assets/events/hust-club-day/561981551_791911577039791_2935054371516643466_n.jpg",
      "/assets/events/hust-club-day/560143028_791899343707681_6611597069057549719_n.jpg",
      "/assets/events/hust-club-day/562303051_791898387041110_6255576229222733276_n.jpg",
      "/assets/events/hust-club-day/561926996_791911070373175_2152654399528629671_n.jpg",
      "/assets/events/hust-club-day/559610461_791910737039875_8578858656096181906_n.jpg",
    ],
    stats: [
      { label: "CLB tham gia", value: "60+" },
      { label: "Lượt sinh viên", value: "15,000+" },
      { label: "Gian hàng trải nghiệm", value: "80+" },
    ],
  },
  {
    id: "bkfs",
    slug: "bkfs-giai-bong-da-nu",
    title: "BKFS — Giải bóng đá nữ",
    subtitle: "Tôn vinh bản lĩnh và nét duyên dáng trên sân cỏ",
    category: "Giải đấu Thể thao",
    timeframe: "Mùa giải hàng năm",
    coverImage: "/assets/events/bkfs/649135125_122163166808698245_7267003324474995220_n.jpg",
    shortDescription: "Sân chơi thể thao tôn vinh vẻ đẹp trí tuệ, sức bền và tinh thần chiến đấu kiên cường của những cô gái kỹ thuật.",
    description: "Hình ảnh những nữ sinh Bách khoa bản lĩnh, mạnh mẽ và không kém phần duyên dáng trên sân cỏ luôn để lại ấn tượng khó phai. BKFS (Giải bóng đá nữ) không đơn thuần là một giải đấu thể thao mà còn là sân chơi để tôn vinh vẻ đẹp trí tuệ, sức bền và tinh thần chiến đấu kiên cường của những cô gái kỹ thuật.\n\nĐể mỗi trận đấu diễn ra trọn vẹn và trở thành một sự kiện đáng nhớ, đằng sau những trận cầu kịch tính, những phút giây bùng nổ trên khán đài và sự thành công vang dội của toàn giải đấu chính là tâm huyết của tập thể Ban Văn nghệ Thể thao đồng hành từ những khâu chuẩn bị âm thầm đến việc kết nối và lan tỏa năng lượng tích cực ấy đến toàn trường.",
    highlights: [
      "Giải đấu bóng đá nữ sinh viên quy mô lớn nhất trường",
      "Những pha bóng kỹ thuật và tinh thần thi đấu fair-play tuyệt vời",
      "Cổ động viên nhiệt thành khuấy động mọi khán đài",
    ],
    gallery: [
      "/assets/events/bkfs/649135125_122163166808698245_7267003324474995220_n.jpg",
      "/assets/events/bkfs/649177098_122163167228698245_799143808575145452_n.jpg",
      "/assets/events/bkfs/649060892_122163167048698245_8151505087991783436_n.jpg",
    ],
    stats: [
      { label: "Đội bóng nữ", value: "24 Đội" },
      { label: "Trận cầu kịch tính", value: "50+ Trận" },
      { label: "Khán đài", value: "CHẬT KÍN" },
    ],
  },
  {
    id: "bk-cup",
    slug: "bk-cup-giai-bong-da-nam",
    title: "BK's Cup — Giải bóng đá nam",
    subtitle: "Chảo lửa thể thao cuồng nhiệt của sinh viên Bách khoa",
    category: "Giải đấu Thể thao",
    timeframe: "Mùa giải hàng năm",
    coverImage: "/assets/events/bk-cup/bk-cup-1.jpg",
    shortDescription: "Biểu tượng cho tinh thần đồng đội, ý chí chiến đấu và khát vọng chiến thắng của những chàng trai kỹ thuật HUST.",
    description: "Mỗi mùa BK's Cup đến là một lần khoảng sân Bách khoa biến thành 'chảo lửa' thực sự với sự góp mặt của những đội bóng máu lửa nhất. Không chỉ có những pha tranh bóng nghẹt thở, những đường chuyền sắc bén hay tiếng hô vang dội cả một góc trời, giải đấu còn là biểu tượng cho tinh thần đồng đội, ý chí chiến đấu và khát vọng chiến thắng của những chàng trai kỹ thuật.\n\nBên cạnh những mùa giải sục sôi, kết nối những trái tim cùng chung nhịp đập và biến mỗi trận đấu thành một ký ức thanh xuân đáng nhớ chính là Ban Văn nghệ Thể thao, những người 'giữ lửa' hậu trường, chăm chút để từng khoảnh khắc trên sân cỏ đều trọn vẹn và bùng nổ nhất.",
    highlights: [
      "Quy tụ hàng chục đội bóng sinh viên xuất sắc nhất các Khoa/Viện",
      "Tính cạnh tranh đỉnh cao và tinh thần màu cờ sắc áo",
      "Công tác tổ chức và trọng tài bài bản, chuyên nghiệp",
    ],
    gallery: [
      "/assets/events/bk-cup/bk-cup-1.jpg",
      "/assets/events/bk-cup/bk-cup-2.jpg",
    ],
    stats: [
      { label: "Đội bóng", value: "32+ Đội" },
      { label: "Cầu thủ tranh tài", value: "500+" },
      { label: "Khán giả theo dõi", value: "20,000+" },
    ],
  },
];
