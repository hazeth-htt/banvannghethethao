import { motion } from "framer-motion";

const items = [
  "BAN VĂN NGHỆ THỂ THAO",
  "✦",
  "MẢNG TỔ CHỨC",
  "✦",
  "MẢNG TRUYỀN THÔNG",
  "✦",
  "MẢNG MEDIA — DESIGN",
  "✦",
  "MẢNG ĐỐI NGOẠI",
  "✦",
  "7 CÂU LẠC BỘ TRỰC THUỘC",
  "✦",
  "D.O.P",
  "✦",
  "GLEEBK",
  "✦",
  "BEU",
  "✦",
  "D.A.S",
  "✦",
  "EMCEE",
  "✦",
  "H.R.O",
  "✦",
  "H.B.C",
  "✦",
];

export const Marquee = () => (
  <section className="relative w-full overflow-hidden border-y border-white/[0.07] bg-[#07040d] py-4 md:py-5 select-none">
    {/* Fade masks */}
    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-[#07040d] to-transparent z-10 pointer-events-none" />
    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-[#07040d] to-transparent z-10 pointer-events-none" />

    <div className="flex w-max">
      <motion.div
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 42, ease: "linear", repeat: Infinity }}
        className="flex items-center gap-10 md:gap-14 flex-shrink-0"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className={`flex-shrink-0 font-display text-xl sm:text-2xl md:text-3xl tracking-[0.06em] uppercase whitespace-nowrap ${
              item === "✦"
                ? "text-bvntt-lilac text-sm sm:text-base"
                : "text-white/40 hover:text-bvntt-cream transition-colors duration-200"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  </section>
);
