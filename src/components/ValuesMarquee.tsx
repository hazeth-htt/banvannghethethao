import { motion } from "framer-motion";

export const ValuesMarquee = () => {
  return (
    <section className="relative w-full py-10 sm:py-14 md:py-18 overflow-hidden select-none border-y border-white/[0.06] bg-[#07040d]">
      {/* Subtle ambient light */}
      <div className="absolute inset-0 bg-gradient-to-r from-bvntt-purple/[0.03] via-transparent to-bvntt-purple/[0.03] pointer-events-none" />

      {/* Gradient fade masks at edges */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#07040d] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#07040d] to-transparent z-10 pointer-events-none" />

      <div className="flex w-max">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, ease: "linear", repeat: Infinity }}
          className="flex items-center gap-8 sm:gap-12 md:gap-16 flex-shrink-0"
        >
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-6 sm:gap-10 md:gap-14 font-display font-black tracking-tighter text-[11vw] sm:text-[8vw] md:text-[6vw] lg:text-[5.5rem] text-white/[0.06] hover:text-white/[0.14] transition-colors duration-500 uppercase cursor-default whitespace-nowrap leading-none"
            >
              <span>TRÁCH NHIỆM</span>
              <span className="text-white/[0.04] select-none">-</span>
              <span>ĐAM MÊ</span>
              <span className="text-white/[0.04] select-none">-</span>
              <span>TỈ MẨN</span>
              <span className="text-white/[0.04] select-none">-</span>
              <span>SÁNG TẠO</span>
              <span className="text-white/[0.04] select-none">-</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
