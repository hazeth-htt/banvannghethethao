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
  image?: string;
  gallery?: string[];
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
    image: "/assets/clubs/dop/488831840_1140952874494858_4747025389889342128_n.jpg",
    gallery: [
    "/assets/clubs/dop/488831840_1140952874494858_4747025389889342128_n.jpg",
    "/assets/clubs/dop/565123741_792292540335028_2297486625010095500_n.jpg",
    "/assets/clubs/dop/660479700_1431139442142865_3038517156482335145_n.jpg",
    "/assets/clubs/dop/687037024_1452747716648704_3740070193926402797_n.jpg"
],
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
    image: "/assets/clubs/gleebk/565123741_792292540335028_2297486625010095500_n.jpg",
    gallery: [
    "/assets/clubs/gleebk/565123741_792292540335028_2297486625010095500_n.jpg",
    "/assets/clubs/gleebk/571811436_1385038383623583_1915918929973790816_n.jpg",
    "/assets/clubs/gleebk/573466215_1385038633623558_8973192817336277568_n.jpg",
    "/assets/clubs/gleebk/574349876_1385038646956890_6542066200435487605_n.jpg",
    "/assets/clubs/gleebk/605539795_1435517701908984_2297741962109830443_n.jpg",
    "/assets/clubs/gleebk/606413671_1434977481963006_6114174275565301016_n.jpg",
    "/assets/clubs/gleebk/661343971_1523435543117199_6447227339362667915_n.jpg",
    "/assets/clubs/gleebk/661833729_1523435466450540_7844269130868944514_n.jpg",
    "/assets/clubs/gleebk/665534996_1523434926450594_6382311017292357555_n.jpg"
],
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
    image: "/assets/clubs/emcee/501345471_1244093354387200_2508804932147191552_n.jpg",
    gallery: [
    "/assets/clubs/emcee/501345471_1244093354387200_2508804932147191552_n.jpg",
    "/assets/clubs/emcee/581028420_1398609962268871_5073858447068893063_n.jpg",
    "/assets/clubs/emcee/713824539_1576895624440303_6356811856293780906_n.jpg",
    "/assets/clubs/emcee/716574357_1576901127773086_7443417717495427394_n.jpg"
],
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
    image: "/assets/clubs/beu/488599220_1176432517604979_5784973671130769278_n.jpg",
    gallery: [
    "/assets/clubs/beu/488599220_1176432517604979_5784973671130769278_n.jpg",
    "/assets/clubs/beu/494604541_1198217632093134_7882479257144022163_n.jpg",
    "/assets/clubs/beu/575004128_1349500010298228_5834910146408153445_n.jpg",
    "/assets/clubs/beu/576136744_1349500373631525_2013623263425295719_n.jpg",
    "/assets/clubs/beu/576392063_1349500446964851_4391470027039026053_n.jpg",
    "/assets/clubs/beu/615318434_1404276548153907_5856219665646788570_n.jpg"
],
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
    image: "/assets/clubs/das/481057710_622470890534685_8903379858928558770_n.jpg",
    gallery: [
    "/assets/clubs/das/481057710_622470890534685_8903379858928558770_n.jpg",
    "/assets/clubs/das/482012579_626242030157571_7855993094673895275_n.jpg",
    "/assets/clubs/das/482018879_626241840157590_875486650428913296_n.jpg",
    "/assets/clubs/das/482083728_626241936824247_6363197352682744272_n.jpg",
    "/assets/clubs/das/482220588_623136387134802_4808865393754252313_n.jpg",
    "/assets/clubs/das/482221776_626241613490946_4764112353316622032_n.jpg",
    "/assets/clubs/das/508125226_698467442935029_7077066970876325762_n.jpg",
    "/assets/clubs/das/508390808_698467319601708_365696664268457272_n.jpg",
    "/assets/clubs/das/508559427_698467139601726_5212024376886846596_n.jpg"
],
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
    image: "/assets/clubs/hbc/606577393_1307993474462078_5405297341541154780_n.jpg",
    gallery: [
    "/assets/clubs/hbc/606577393_1307993474462078_5405297341541154780_n.jpg",
    "/assets/clubs/hbc/607730941_1309432940984798_8669853166026119208_n.jpg",
    "/assets/clubs/hbc/671657206_1392070159387742_55094093942609307_n.jpg",
    "/assets/clubs/hbc/702232120_1417678710160220_8108132086788184566_n.jpg",
    "/assets/clubs/hbc/707180512_1425633192698105_865181236668160214_n.jpg",
    "/assets/clubs/hbc/707270436_1425262012735223_4945212861771724176_n.jpg"
],
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
    image: "/assets/clubs/hro/758288797_1644446891016332_4728149698236469161_n.jpg",
    gallery: [
    "/assets/clubs/hro/758288797_1644446891016332_4728149698236469161_n.jpg",
    "/assets/clubs/hro/758377314_1645481684246186_3632481355397792767_n.jpg",
    "/assets/clubs/hro/758444633_1644446701016351_5250818158986118021_n.jpg",
    "/assets/clubs/hro/758617369_1646330877494600_6995824756631576713_n.jpg",
    "/assets/clubs/hro/760242113_1647375734056781_5171270516780102484_n.jpg",
    "/assets/clubs/hro/760366368_1647375657390122_9127808508071524714_n.jpg",
    "/assets/clubs/hro/775523763_1493970679197689_1144607988088273058_n.jpg"
],
    shortDesc: "Hội tụ những cú đánh uy lực và sự phối hợp nhịp nhàng, mang tinh thần bóng chày bùng nổ vào từng trận đấu.",
    description: "Khoác lên mình tinh thần thể thao năng động và đầy cá tính, HRO - Câu lạc bộ Bóng chày là nơi hội tụ của những cú đánh uy lực cùng sự phối hợp nhịp nhàng đậm chất đồng đội. Bên cạnh những giờ luyện tập bền bỉ trên sân để nâng cao thể lực và chiến thuật, nơi đây còn quy tụ một tập thể đầy lửa nhiệt huyết, luôn sẵn sàng khuấy động và mang tinh thần thể thao bùng nổ của sinh viên Bách Khoa vào từng trận đấu.",
    highlights: [
      "Luyện tập bền bỉ nâng cao thể lực và chiến thuật bóng chày",
      "Hội tụ những cú đánh uy lực cùng phối hợp nhịp nhàng đồng đội",
      "Khuấy động tinh thần thể thao năng động, cá tính tại Bách Khoa",
    ],
  },
];
