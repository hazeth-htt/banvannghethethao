import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { EventsSection } from "./components/EventsSection";
import { ValuesMarquee } from "./components/ValuesMarquee";
import { OrganizationTimeline } from "./components/OrganizationTimeline";
import { RecruitmentSection } from "./components/RecruitmentSection";
import { NewsSection } from "./components/NewsSection";
import { RecruitmentFormPage } from "./components/RecruitmentFormPage";
import { AdminPage } from "./components/AdminPage";
import { Footer } from "./components/Footer";
import { ContactModal } from "./components/ContactModal";
import { EventDetailPage } from "./components/EventDetailPage";
import { AllEventsPage } from "./components/AllEventsPage";
import { AllNewsPage } from "./components/AllNewsPage";
import { GalleryPage } from "./components/GalleryPage";
import { MouseGradient } from "./components/MouseGradient";
import { WelcomeModal } from "./components/WelcomeModal";
import { fetchContentFromDatabase } from "./services/contentService";
import { initAnalyticsTracking } from "./services/analyticsService";

const getSlugFromPath = () => {
  const pathname = window.location.pathname;
  if (pathname === "/events" || pathname === "/events/") return null;
  if (pathname.startsWith("/events/")) {
    const slug = pathname.replace("/events/", "").replace(/\/$/, "");
    if (slug) return slug;
  }
  const hash = window.location.hash;
  if (hash === "#events" || hash === "#events/") return null;
  if (hash.startsWith("#events/") && hash !== "#events/") {
    const slug = hash.replace("#events/", "").replace(/\/$/, "");
    if (slug) return slug;
  }
  return null;
};

const checkIsEventsPage = () => {
  const p = window.location.pathname;
  const h = window.location.hash;
  return p === "/events" || p === "/events/" || h === "#events-all" || h === "#events-page";
};

const checkIsNewsPage = () => {
  const p = window.location.pathname;
  const h = window.location.hash;
  return p === "/news" || p === "/news/" || p === "/tin-tuc" || h === "#news-all" || h === "#news-page";
};

const checkIsGalleryPage = () => {
  const p = window.location.pathname;
  const h = window.location.hash;
  return (
    p === "/gallery" ||
    p === "/gallery/" ||
    p === "/khoanh-khac" ||
    p === "/moments" ||
    h === "#gallery" ||
    h === "#moments"
  );
};

export function App() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeEventSlug, setActiveEventSlug] = useState<string | null>(() => getSlugFromPath());
  const [showFormPage, setShowFormPage] = useState(
    () => window.location.pathname === "/form" || window.location.hash === "#form"
  );
  const [showAdminPage, setShowAdminPage] = useState(
    () => window.location.pathname === "/admin" || window.location.hash === "#admin"
  );
  const [showEventsPage, setShowEventsPage] = useState(() => checkIsEventsPage());
  const [showNewsPage, setShowNewsPage] = useState(() => checkIsNewsPage());
  const [showGalleryPage, setShowGalleryPage] = useState(() => checkIsGalleryPage());

  useEffect(() => {
    // Luôn đảm bảo cuộn về đầu trang khi load/reload lại web nếu ở route đặc biệt
    const isSpecialRoute =
      window.location.pathname.startsWith("/events") ||
      window.location.pathname === "/news" ||
      window.location.pathname === "/gallery" ||
      window.location.pathname === "/form" ||
      window.location.pathname === "/admin" ||
      window.location.hash.startsWith("#events") ||
      window.location.hash === "#news-all" ||
      window.location.hash === "#gallery" ||
      window.location.hash === "#form" ||
      window.location.hash === "#admin";

    if (!isSpecialRoute) {
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }

    // Tự động tải nội dung mới nhất từ Neon Database về
    fetchContentFromDatabase();

    // Khởi tạo theo dõi Web Analytics
    const cleanupAnalytics = initAnalyticsTracking();

    const handleLocationChange = () => {
      setActiveEventSlug(getSlugFromPath());
      setShowFormPage(window.location.pathname === "/form" || window.location.hash === "#form");
      setShowAdminPage(window.location.pathname === "/admin" || window.location.hash === "#admin");
      setShowEventsPage(checkIsEventsPage());
      setShowNewsPage(checkIsNewsPage());
      setShowGalleryPage(checkIsGalleryPage());
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      cleanupAnalytics();
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);

  const navigateToEvent = (slug: string) => {
    window.history.pushState({}, "", `/events/${slug}`);
    setActiveEventSlug(slug);
    setShowEventsPage(false);
    setShowNewsPage(false);
    setShowGalleryPage(false);
    setShowFormPage(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAllEvents = () => {
    window.history.pushState({}, "", "/events");
    setShowEventsPage(true);
    setShowNewsPage(false);
    setShowGalleryPage(false);
    setShowFormPage(false);
    setShowAdminPage(false);
    setActiveEventSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToAllNews = () => {
    window.history.pushState({}, "", "/news");
    setShowNewsPage(true);
    setShowEventsPage(false);
    setShowGalleryPage(false);
    setShowFormPage(false);
    setShowAdminPage(false);
    setActiveEventSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateToGallery = () => {
    window.history.pushState({}, "", "/gallery");
    setShowGalleryPage(true);
    setShowEventsPage(false);
    setShowNewsPage(false);
    setShowFormPage(false);
    setShowAdminPage(false);
    setActiveEventSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateHome = (targetHash?: string) => {
    const url = targetHash ? `/${targetHash}` : "/";
    window.history.pushState({}, "", url);
    setActiveEventSlug(null);
    setShowFormPage(false);
    setShowAdminPage(false);
    setShowEventsPage(false);
    setShowNewsPage(false);
    setShowGalleryPage(false);

    if (targetHash) {
      setTimeout(() => {
        const elem = document.querySelector(targetHash);
        if (elem) {
          elem.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 60);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleOpenFormPage = () => {
    window.history.pushState({}, "", "/form");
    setShowFormPage(true);
    setShowEventsPage(false);
    setShowNewsPage(false);
    setShowGalleryPage(false);
    setActiveEventSlug(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavigateToPage = (path: string) => {
    if (path === "/news") {
      navigateToAllNews();
    } else if (path === "/gallery") {
      navigateToGallery();
    } else if (path === "/events") {
      navigateToAllEvents();
    } else if (path === "/form") {
      handleOpenFormPage();
    } else if (path === "/admin") {
      window.history.pushState({}, "", "/admin");
      setShowAdminPage(true);
    } else if (path === "/" || path === "") {
      navigateHome();
    } else if (path.startsWith("#")) {
      navigateHome(path);
    }
  };

  const handleScrollToRecruitment = () => {
    const elem = document.querySelector("#recruitment");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Admin route: /admin
  if (showAdminPage) {
    return <AdminPage />;
  }

  // Form page route: /form
  if (showFormPage) {
    return (
      <RecruitmentFormPage
        onBack={() => {
          window.history.pushState({}, "", "/");
          setShowFormPage(false);
          window.scrollTo({ top: 0 });
        }}
      />
    );
  }

  // Dedicated Event Detail Route: /events/:slug
  if (activeEventSlug) {
    return (
      <EventDetailPage
        slug={activeEventSlug}
        onBack={() => {
          if (showEventsPage) {
            navigateToAllEvents();
          } else {
            navigateHome("#events");
          }
        }}
        onNavigateToSlug={navigateToEvent}
      />
    );
  }

  // Dedicated All Events Directory Route: /events
  if (showEventsPage) {
    return (
      <AllEventsPage
        onBack={() => navigateHome("#events")}
        onNavigateToEvent={navigateToEvent}
        onNavigateToHomeSection={navigateHome}
        onNavigateToPage={handleNavigateToPage}
      />
    );
  }

  // Dedicated All News Directory Route: /news
  if (showNewsPage) {
    return (
      <AllNewsPage
        onBack={() => navigateHome("#news")}
        onNavigateToHomeSection={navigateHome}
        onNavigateToPage={handleNavigateToPage}
      />
    );
  }

  // Dedicated Moments & Gallery Route: /gallery
  if (showGalleryPage) {
    return (
      <GalleryPage
        onBack={() => navigateHome()}
        onNavigateToHomeSection={navigateHome}
        onNavigateToPage={handleNavigateToPage}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#07040d] text-white selection:bg-bvntt-lilac selection:text-black overflow-x-clip">
      {/* Ambient Cursor-following Violet Glow */}
      <MouseGradient />

      {/* Global Navbar */}
      <Navbar
        onOpenContact={() => setContactOpen(true)}
        onNavigateToHomeSection={navigateHome}
        onNavigateToPage={handleNavigateToPage}
      />

      {/* Main Content Sections */}
      <main className="relative flex flex-col">
        {/* Section 01: Hero with Video Area & Witch Artwork */}
        <Hero onRegisterClick={handleScrollToRecruitment} />

        {/* Section 02: Horizontal Marquee */}
        <Marquee />

        {/* Section 03: Events Horizontal Showcase */}
        <EventsSection
          onNavigateToEvent={navigateToEvent}
          onNavigateToAllEvents={navigateToAllEvents}
        />

        {/* Section 03.5: Values Marquee (Trách nhiệm - Đam mê - Tỉ mẩn - Sáng tạo) */}
        <ValuesMarquee />

        {/* Section 04: Organization Vertical Timeline & Clubs */}
        <OrganizationTimeline onRegisterClick={handleScrollToRecruitment} />

        {/* Section 05: Recruitment 2026 Section */}
        <RecruitmentSection onOpenFormModal={handleOpenFormPage} />

        {/* Section 06: News & Events Section */}
        <NewsSection onNavigateToAllNews={navigateToAllNews} />
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Contact Quick Modal */}
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* Welcome Entry Popup Modal */}
      <WelcomeModal
        isOpen={welcomeOpen}
        onClose={() => setWelcomeOpen(false)}
        onLearnMore={() => {
          setWelcomeOpen(false);
          const elem = document.querySelector("#organization") || document.querySelector("#events");
          elem?.scrollIntoView({ behavior: "smooth" });
        }}
        onRegisterNow={() => {
          setWelcomeOpen(false);
          handleOpenFormPage();
        }}
      />
    </div>
  );
}

export default App;
