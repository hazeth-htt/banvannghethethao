export interface ClubItem {
  id: string;
  name: string;
  fullName: string;
  category: "dance" | "music" | "theater" | "mc" | "sports";
  categoryLabel: string;
  shortDesc: string;
  description: string;
  highlights: string[];
  color: string;
  tag: string;
  recruitmentUrl?: string;
}

export const CLUBS_DATA: ClubItem[] = [
  {
    id: "dop",
    name: "D.O.P",
    fullName: "Câu lạc bộ Nhảy D.O.P",
    category: "dance",
    categoryLabel: "Câu lạc bộ Nhảy",
    color: "#D6B9FF",
    tag: "Choreography / Street Dance / Kpop Cover",
    recruitmentUrl: "https://docs.google.com/forms/d/e/1FAIpQLScTecYj-JC1fh9MpdtZIYdRSEkH1u4VKqmZ3G_IQ8_f7t7sFg/viewform?fbzx=7414989199287447880",
    shortDesc: "Ngôi nhà chung của những bạn trẻ mang niềm đam mê nhiệt huyết với vũ đạo, tỏa sáng và gắn kết tuổi trẻ qua từng bước nhảy.",
    description: "Câu lạc bộ Nhảy D.O.P trực thuộc Ban Văn Nghệ Thể Thao - Đoàn Thanh niên Đại học Bách khoa Hà Nội là ngôi nhà chung của những bạn trẻ mang niềm đam mê nhiệt huyết với vũ đạo. Không chỉ là nơi tập luyện, nâng cao kỹ năng qua các thể loại đa dạng, D.O.P còn là tập thể năng động luôn hết mình góp mặt trong các sự kiện, chương trình lớn của Nhà trường. Đây chính là môi trường lý tưởng để sinh viên Bách Khoa thỏa sức thể hiện cá tính, sự tự tin và gắn kết tuổi trẻ qua từng bước nhảy.",
    highlights: [
      "Góp mặt trong các sự kiện, chương trình lớn của Nhà trường",
      "Môi trường tập luyện, nâng cao kỹ năng vũ đạo đa dạng",
      "Thỏa sức thể hiện cá tính, sự tự tin và gắn kết tuổi trẻ",
    ],
  },
  {
    id: "gleebk",
    name: "GleeBK",
    fullName: "Câu lạc bộ Âm nhạc GleeBK",
    category: "music",
    categoryLabel: "Câu lạc bộ Âm nhạc",
    color: "#6A00FF",
    tag: "Vocal / Acoustic / Band / Harmonies",
    recruitmentUrl: "https://docs.google.com/forms/d/e/1FAIpQLScm9odnM1ONY_QPywPoOuNTKGAM40YjxsWRyUJLKRImD6HjCw/viewform",
    shortDesc: "Nơi thắp sáng niềm đam mê ca hát và nghệ thuật, mang những giai điệu trẻ trung làm bừng sáng các sân khấu Bách Khoa.",
    description: "Là ngôi nhà của những tâm hồn đồng điệu với âm nhạc, câu lạc bộ Âm nhạc GleeBK trực thuộc Ban Văn Nghệ Thể Thao - Đoàn Thanh niên Đại học Bách khoa Hà Nội là nơi thắp sáng niềm đam mê ca hát và nghệ thuật của các bạn sinh viên. Đến với GleeBK, các thành viên không chỉ cùng nhau luyện thanh, hòa giọng mà còn mang những giai điệu trẻ trung, tươi mới làm bừng sáng các sân khấu và sự kiện lớn của Nhà trường. Đây chính là mảnh ghép tuyệt vời để tuổi trẻ Bách Khoa cất cao tiếng hát, sống trọn đam mê và sẻ chia những khoảnh khắc đáng nhớ.",
    highlights: [
      "Luyện thanh, hòa giọng và biểu diễn tại các sự kiện lớn của Trường",
      "Mảnh ghép gắn kết những tâm hồn đồng điệu với âm nhạc",
      "Sân khấu để tuổi trẻ Bách Khoa cất cao tiếng hát và sống trọn đam mê",
    ],
  },
  {
    id: "emcee",
    name: "EMCEE",
    fullName: "Câu lạc bộ MC EMCEE",
    category: "mc",
    categoryLabel: "Câu lạc bộ MC",
    color: "#EDFF00",
    tag: "Host / Public Speaking / Stage Mastery",
    recruitmentUrl: "https://docs.google.com/forms/d/e/1FAIpQLScopBWXCUhpxIMAZxTD6WI_i2ON0ZcrzRuHpoptZYrahtwRsw/viewform",
    shortDesc: "Điểm đến lý tưởng cho những ai say mê nghệ thuật cầm mic, rèn luyện sự tự tin và làm chủ sân khấu Bách Khoa.",
    description: "Sở hữu chiếc micro quyền năng và nhiệt huyết tuổi trẻ, câu lạc bộ EMCEE chính là điểm đến lý tưởng cho những ai say mê nghệ thuật cầm mic. Không chỉ là nơi rèn luyện sự tự tin, kỹ năng giao tiếp và làm chủ sân khấu, EMCEE còn là tập thể năng động luôn mang đến sự chuyên nghiệp và tươi mới cho các sự kiện của Nhà trường.",
    highlights: [
      "Rèn luyện sự tự tin, kỹ năng giao tiếp và làm chủ sân khấu",
      "Đảm nhiệm vai trò MC dẫn dắt các sự kiện của Nhà trường",
      "Tập thể năng động, chuyên nghiệp và giàu nhiệt huyết",
    ],
  },
  {
    id: "beu",
    name: "BeU",
    fullName: "Câu lạc bộ Múa BeU",
    category: "dance",
    categoryLabel: "Câu lạc bộ Múa",
    color: "#FF9D15",
    tag: "Traditional & Modern Dance / Expression",
    recruitmentUrl: "https://docs.google.com/forms/d/e/1FAIpQLScRl7KrOUQwVpbcsgYIwQgSwYAo_Mhp2wvSYMIY3lX58StdPg/viewform",
    shortDesc: "Nơi thăng hoa của những chuyển động uyển chuyển và cảm xúc với nghệ thuật múa truyền thống lẫn hiện đại.",
    description: "Là nơi thăng hoa của những chuyển động uyển chuyển và cảm xúc, BeU - Câu lạc bộ Múa quy tụ những bạn trẻ mang tình yêu đặc biệt với nghệ thuật múa truyền thống lẫn hiện đại. Vượt qua khuôn khổ của một phòng tập để mài giũa kỹ năng và sự dẻo dai, BeU còn là một tập thể đong đầy nhiệt huyết, sẵn sàng thắp lửa qua những bước múa thăng hoa và ghi dấu ấn sâu đậm trong từng sự kiện của Nhà trường.",
    highlights: [
      "Mài giũa kỹ năng, sự dẻo dai và cảm xúc nghệ thuật múa",
      "Bước múa thăng hoa, ghi dấu ấn sâu đậm trong các sự kiện",
      "Gắn kết tình yêu nghệ thuật múa truyền thống lẫn hiện đại",
    ],
  },
  {
    id: "das",
    name: "D.A.S",
    fullName: "Câu lạc bộ Kịch D.A.S",
    category: "theater",
    categoryLabel: "Câu lạc bộ Kịch",
    color: "#D6B9FF",
    tag: "Drama / Acting / Stage Expression",
    recruitmentUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdxooFXmvITYzMD4yzp9NBa02VOE7hEPOhOwiJOveMau7Espw/viewform",
    shortDesc: "Không gian để sinh viên tự do thả mình vào nghệ thuật diễn xuất, mang lại góc nhìn chân thực và sâu lắng.",
    description: "D.A.S - Câu lạc bộ Kịch không chỉ là nơi tập hợp những gương mặt yêu nghệ thuật diễn xuất, mà còn là không gian để sinh viên tự do thả mình vào vô vàn mảnh đời và cảm xúc khác nhau. Bằng sự sáng tạo và nhiệt huyết trên từng sàn diễn, D.A.S mang đến những góc nhìn chân thực, sâu lắng và thổi một làn gió hoàn toàn mới vào đời sống tinh thần của sinh viên Bách Khoa.",
    highlights: [
      "Sáng tạo và nhiệt huyết trên từng sàn diễn kịch sinh viên",
      "Thổi làn gió mới vào đời sống tinh thần sinh viên Bách Khoa",
      "Rèn luyện kỹ năng diễn xuất, hóa thân và biểu cảm chân thực",
    ],
  },
  {
    id: "hbc",
    name: "HBC",
    fullName: "Câu lạc bộ Bóng rổ HBC",
    category: "sports",
    categoryLabel: "CLB Bóng rổ",
    color: "#00E5FF",
    tag: "Basketball / Athletics / Team Spirit",
    recruitmentUrl: "https://forms.gle/tMRYKxrFySi7RWCF6",
    shortDesc: "Nơi quy tụ tình yêu trái bóng cam, rèn luyện thể lực và cháy hết mình trên các giải đấu của Nhà trường.",
    description: "HBC - CLB Bóng rổ là nơi quy tụ những sinh viên mang tình yêu trái bóng cam và tinh thần thể thao bùng nổ. Không chỉ là sân chơi rèn luyện sức khỏe, sự dẻo dai và kỹ thuật qua từng trận đấu, HBC còn là một tập thể gắn kết, luôn cháy hết mình với nhiệt huyết tuổi trẻ trên các giải đấu của nhà trường.",
    highlights: [
      "Rèn luyện sức khỏe, sự dẻo dai và kỹ thuật bóng rổ",
      "Cháy hết mình với nhiệt huyết tuổi trẻ trên các giải đấu",
      "Tập thể thể thao gắn kết và lan tỏa tinh thần đồng đội",
    ],
  },
  {
    id: "hro",
    name: "HRO",
    fullName: "Câu lạc bộ Bóng chày HRO",
    category: "sports",
    categoryLabel: "Câu lạc bộ Bóng chày",
    color: "#FF3366",
    tag: "Baseball / Teamwork / Dynamic Energy",
    recruitmentUrl: "https://docs.google.com/forms/d/e/1FAIpQLSex1vSKgLOPmcXRAvi65w51PhyF3q3KC0T9_dJ2iBYglY_vpw/viewform",
    shortDesc: "Hội tụ những cú đánh uy lực và sự phối hợp nhịp nhàng, mang tinh thần bóng chày bùng nổ vào từng trận đấu.",
    description: "Khoác lên mình tinh thần thể thao năng động và đầy cá tính, HRO - Câu lạc bộ Bóng chày là nơi hội tụ của những cú đánh uy lực cùng sự phối hợp nhịp nhàng đậm chất đồng đội. Bên cạnh những giờ luyện tập bền bỉ trên sân để nâng cao thể lực và chiến thuật, nơi đây còn quy tụ một tập thể đầy lửa nhiệt huyết, luôn sẵn sàng khuấy động và mang tinh thần thể thao bùng nổ của sinh viên Bách Khoa vào từng trận đấu.",
    highlights: [
      "Luyện tập bền bỉ nâng cao thể lực và chiến thuật bóng chày",
      "Hội tụ những cú đánh uy lực cùng phối hợp nhịp nhàng đồng đội",
      "Khuấy động tinh thần thể thao năng động, cá tính tại Bách Khoa",
    ],
  },
];
