import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Marquee } from "./components/Marquee";
import { EventsSection } from "./components/EventsSection";
import { OrganizationTimeline } from "./components/OrganizationTimeline";
import { RecruitmentSection } from "./components/RecruitmentSection";
import { RecruitmentFormPage } from "./components/RecruitmentFormPage";
import { AdminPage } from "./components/AdminPage";
import { Footer } from "./components/Footer";
import { ContactModal } from "./components/ContactModal";
import { EventDetailPage } from "./components/EventDetailPage";
import { MouseGradient } from "./components/MouseGradient";
import { WelcomeModal } from "./components/WelcomeModal";

const getSlugFromPath = () => {
  const pathname = window.location.pathname;
  if (pathname.startsWith("/events/")) {
    const slug = pathname.replace("/events/", "").replace(/\/$/, "");
    if (slug) return slug;
  }
  const hash = window.location.hash;
  if (hash.startsWith("#events/")) {
    const slug = hash.replace("#events/", "").replace(/\/$/, "");
    if (slug) return slug;
  }
  return null;
};

export function App() {
  const [welcomeOpen, setWelcomeOpen] = useState(true);
  const [contactOpen, setContactOpen] = useState(false);
  const [activeEventSlug, setActiveEventSlug] = useState<string | null>(() => getSlugFromPath());
  const [showFormPage, setShowFormPage] = useState(() => window.location.pathname === "/form" || window.location.hash === "#form");
  const [showAdminPage, setShowAdminPage] = useState(() => window.location.pathname === "/admin" || window.location.hash === "#admin");

  useEffect(() => {
    const handleLocationChange = () => {
      setActiveEventSlug(getSlugFromPath());
      setShowFormPage(window.location.pathname === "/form" || window.location.hash === "#form");
      setShowAdminPage(window.location.pathname === "/admin" || window.location.hash === "#admin");
    };
    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("hashchange", handleLocationChange);
    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("hashchange", handleLocationChange);
    };
  }, []);



  const navigateToEvent = (slug: string) => {
    window.history.pushState({}, "", `/events/${slug}`);
    setActiveEventSlug(slug);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const navigateHome = () => {
    window.history.pushState({}, "", "/#events");
    setActiveEventSlug(null);
    setShowFormPage(false);
    setTimeout(() => {
      const elem = document.querySelector("#events");
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  const handleOpenFormPage = () => {
    window.history.pushState({}, "", "/form");
    setShowFormPage(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
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
        onBack={navigateHome}
        onNavigateToSlug={navigateToEvent}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-[#07040d] text-white selection:bg-bvntt-lilac selection:text-black overflow-x-clip">
      {/* Ambient Cursor-following Violet Glow */}
      <MouseGradient />

      {/* Global Navbar */}
      <Navbar onOpenContact={() => setContactOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative flex flex-col">
        {/* Section 01: Hero with Video Area & Witch Artwork */}
        <Hero onRegisterClick={handleScrollToRecruitment} />

        {/* Section 02: Horizontal Marquee */}
        <Marquee />

        {/* Section 03: Events Horizontal Showcase */}
        <EventsSection onNavigateToEvent={navigateToEvent} />

        {/* Section 04: Organization Vertical Timeline & Clubs */}
        <OrganizationTimeline onRegisterClick={handleScrollToRecruitment} />

        {/* Section 05: Recruitment 2026 Section */}
        <RecruitmentSection onOpenFormModal={handleOpenFormPage} />
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

