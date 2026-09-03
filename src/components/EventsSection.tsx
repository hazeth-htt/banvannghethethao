import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { EVENTS_DATA, EventItem } from "../data/events";
import { EventCard } from "./EventCard";
import { EventModal } from "./EventModal";
import { AllEventsModal } from "./AllEventsModal";
import { FadeUp } from "./animations/FadeUp";

interface EventsSectionProps {
  onNavigateToEvent?: (slug: string) => void;
}

export const EventsSection = ({ onNavigateToEvent }: EventsSectionProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const indexRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);
  const [selected, setSelected] = useState<EventItem | null>(null);
  const [showAllEvents, setShowAllEvents] = useState(false);

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const cards = container.querySelectorAll("article");
    if (cards[index]) {
      const card = cards[index] as HTMLElement;
      const containerWidth = container.clientWidth;
      const cardLeft = card.offsetLeft;
      const cardWidth = card.clientWidth;
      const targetScroll = cardLeft - (containerWidth - cardWidth) / 2;
      container.scrollTo({
        left: Math.max(0, targetScroll),
        behavior: "smooth",
      });
      indexRef.current = index;
    }
  };

  // Autoplay: auto advances to the next slide every 4.5s unless hovered/modal open
  useEffect(() => {
    if (isHovered || showAllEvents || selected !== null) return;
    const timer = setInterval(() => {
      const next = (indexRef.current + 1) % EVENTS_DATA.length;
      scrollToIndex(next);
    }, 4500);
    return () => clearInterval(timer);
  }, [isHovered, showAllEvents, selected]);

  // Sync index during touch swipe or manual scroll
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const container = scrollRef.current;
    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    const cards = container.querySelectorAll("article");
    let closestIndex = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
      const cardEl = card as HTMLElement;
      const cardCenter = cardEl.offsetLeft + cardEl.clientWidth / 2;
      const diff = Math.abs(containerCenter - cardCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIndex = idx;
      }
    });
    indexRef.current = closestIndex;
  };

  return (
    <section id="events" className="section-snap relative w-full py-20 md:py-28 bg-[#07040d] overflow-hidden">
      {/* Top divider */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 mb-14 md:mb-18">
        <div className="divider-h mb-12 md:mb-14" />

        {/* Centered section header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <FadeUp>
            <div className="space-y-3">
              <h2 className="font-display font-extrabold text-bvntt-cream text-3xl sm:text-5xl md:text-6xl uppercase tracking-normal leading-tight">
                SỰ KIỆN <span className="text-bvntt-lilac">NỔI BẬT</span>
              </h2>
              <p className="text-sm sm:text-base text-bvntt-muted font-normal max-w-xl mx-auto leading-relaxed pt-1">
                Những hoạt động tạo nên màu sắc và tinh thần của Ban Văn nghệ Thể thao.
              </p>
            </div>
          </FadeUp>
        </div>
      </div>

      {/* Auto-scrolling carousel track */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onTouchStart={() => setIsHovered(true)}
        onTouchEnd={() => {
          setTimeout(() => setIsHovered(false), 4000);
        }}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory scroll-pl-6 sm:scroll-pl-8 md:scroll-pl-12 cursor-grab active:cursor-grabbing px-6 sm:px-8 md:px-12 py-2"
      >
        {EVENTS_DATA.map((ev, i) => (
          <EventCard key={ev.id} event={ev} index={i} onSelect={setSelected} />
        ))}
      </div>

      {/* ── Slide indicators & Navigation Controls ── */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 mt-6 flex items-center justify-between">
        {/* Indicators */}
        <div className="flex items-center gap-1.5 mx-auto">
          {EVENTS_DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollToIndex(i)}
              aria-label={`Chuyển đến sự kiện ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                indexRef.current === i ? "w-8 bg-bvntt-lilac" : "w-1.5 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>

      {/* ── "Xem tất cả" CTA button ── */}
      <div className="max-w-screen-2xl mx-auto px-6 md:px-10 lg:px-16 mt-8 md:mt-12 flex items-center justify-center">
        <button
          onClick={() => setShowAllEvents(true)}
          className="inline-flex items-center gap-2.5 text-xs font-semibold tracking-[0.12em] uppercase text-bvntt-cream border border-bvntt-border-md bg-white/[0.04] px-7 py-3 hover:border-bvntt-lilac hover:text-bvntt-lilac hover:bg-bvntt-lilac/10 transition-all duration-300 backdrop-blur-sm cursor-pointer"
        >
          <span>Xem tất cả sự kiện</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Single Event Detail Modal */}
      <EventModal
        event={selected}
        onClose={() => setSelected(null)}
        onViewDetail={onNavigateToEvent}
      />

      {/* All Events Directory Modal */}
      <AllEventsModal
        isOpen={showAllEvents}
        onClose={() => setShowAllEvents(false)}
        onSelectEvent={(ev) => {
          setSelected(ev);
        }}
        onViewDetail={onNavigateToEvent}
      />
    </section>
  );
};
