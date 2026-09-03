# CREATE A CINEMATIC WEBSITE FOR BAN VĂN NGHỆ THỂ THAO — HUST

Create a modern, cinematic, highly visual website for **Ban Văn nghệ Thể thao — Đoàn Đại học Bách khoa Hà Nội**.

The website should feel like a combination of:

* HUST student culture
* Performing arts
* Sports
* Events
* Youth energy
* Creative community
* Editorial / cinematic visual design

The visual direction should be inspired by the previously described **Prisma creative studio style**: dark background, oversized typography, cinematic imagery/video, subtle grain/noise textures, smooth Framer Motion animations, horizontal scrolling content, editorial layouts and strong visual hierarchy.

However, do NOT make the website feel like a generic creative agency. It should clearly communicate **a university student organization, its activities, events, specialized divisions and clubs**.

The website must feel youthful, energetic, premium and creative rather than corporate.

---

# TECH STACK

Use:

* React 18
* Vite
* TypeScript
* Tailwind CSS 3
* Framer Motion
* lucide-react

Use functional React components and TypeScript throughout.

Create reusable components rather than putting the entire website inside `App.tsx`.

Suggested structure:

```text
src/
├── components/
│   ├── Navbar.tsx
│   ├── Hero.tsx
│   ├── Marquee.tsx
│   ├── EventsSection.tsx
│   ├── EventCard.tsx
│   ├── OrganizationTimeline.tsx
│   ├── OrganizationNode.tsx
│   ├── RecruitmentSection.tsx
│   ├── Footer.tsx
│   └── animations/
│       ├── WordsPullUp.tsx
│       ├── FadeUp.tsx
│       └── Reveal.tsx
│
├── data/
│   ├── events.ts
│   ├── divisions.ts
│   └── clubs.ts
│
├── App.tsx
├── index.css
└── ...
```

Do not add unnecessary libraries or functionality.

Do not add sections that are not specified in this prompt.

---

# ASSETS

Logo:

`Logo Ban@4x.png`

Hero central graphic:

`Witch_2@4x.png`

The event information and specialized division information will be provided through the project folders:

* `Sự kiện`
* `4 mảng`

Use the provided assets and information from these folders instead of creating placeholder content when the information is available.

The hero background video will be added later.

For now, implement the hero video area so that the actual video can easily be inserted later.

Do not invent a replacement video.

---

# DESIGN DIRECTION

## Overall aesthetic

The website should have a:

**Dark × Cinematic × Youthful × Editorial × Event-driven**

visual language.

Think:

```text
HUST
+
Student Culture
+
Performance
+
Sports
+
Festival
+
Creative Studio
```

The design should feel immersive when scrolling.

Avoid:

* generic corporate university websites
* overly formal government-style layouts
* excessive rounded SaaS cards
* generic AI aesthetics
* excessive gradients
* excessive glassmorphism
* chat/AI-style interfaces
* overly colorful random UI

The website should prioritize strong typography, imagery, motion and composition.

---

# COLOR SYSTEM

The primary color palette should be extracted from the provided Figma design:

`https://www.figma.com/design/IryviEcCr1kmZHUh49tfQA/Untitled?node-id=28-2&m=dev`

Use the Figma color system as the source of truth.

Do not arbitrarily introduce a completely different color palette.

The overall page should still maintain a dark foundation similar to the Prisma reference.

Suggested hierarchy:

* Global background → near black
* Primary text → warm/light tone from Figma
* Secondary text → muted gray
* Accent → Figma primary accent color
* Cards → slightly lighter dark surfaces
* Borders → subtle low-opacity light borders

Keep the palette restrained and premium.

---

# TYPOGRAPHY

Use typography with a strong editorial hierarchy.

The main website typography should be clean and modern.

Use very large display typography for:

* Hero
* Major section titles
* Important numbers
* Recruitment section

Use tight letter spacing for large headings.

Example style:

```text
font-medium
leading-[0.85]
tracking-[-0.06em]
```

Do not make every piece of text oversized.

Maintain a strong contrast between:

* Display typography
* Section headings
* Supporting text
* Metadata
* Navigation

---

# GLOBAL ANIMATION SYSTEM

Use Framer Motion throughout the website.

Animations should feel:

* smooth
* cinematic
* slightly slow
* intentional
* premium

Use the following easing when appropriate:

```text
[0.16, 1, 0.3, 1]
```

and:

```text
[0.22, 1, 0.36, 1]
```

Avoid excessive bouncing or playful animations.

---

# CUSTOM NOISE TEXTURE

Create a subtle film-grain/noise effect similar to the Prisma reference.

Create:

```css
.noise-overlay
```

using an inline SVG `feTurbulence` data URI.

Use it over major cinematic sections.

The noise should be subtle and should never interfere with text readability.

---

# NAVBAR

Create an absolutely positioned navbar near the top of the page.

Desktop structure:

```text
[LOGO] [BAN VĂN NGHỆ THỂ THAO / ĐOÀN ĐHBKHN]

                    Trang chủ
                    Sự kiện
                    Mảng chuyên môn
                    Tuyển thành viên 2026

                                      [Liên hệ ngay]
```

However, the exact layout should adapt responsively.

## Logo

Use:

`Logo Ban@4x.png`

Keep the logo visually prominent but not oversized.

## Organization name

Display:

**Ban Văn nghệ Thể thao**

with smaller secondary text:

**Đoàn Đại học Bách khoa Hà Nội**

## Navigation

Items:

* Trang chủ
* Sự kiện
* Mảng chuyên môn
* Tuyển thành viên 2026

Navigation should scroll to the corresponding section where possible.

## CTA

Button:

**Liên hệ ngay**

When clicked, redirect to the official Facebook page of Ban Văn nghệ Thể thao.

The Facebook URL should be configurable rather than hardcoded throughout the codebase.

---

# SECTION 01 — HERO

Create a full viewport hero:

```text
min-height: 100vh
```

Use an inset composition similar to the Prisma reference.

The hero should have:

```text
padding: 16px
```

and larger padding on desktop.

Create a large rounded container:

```text
rounded-2xl
md:rounded-[2rem]
overflow-hidden
```

## Background

The background will eventually contain an event video.

For now:

* create the full video background layer
* use `object-cover`
* `autoPlay`
* `loop`
* `muted`
* `playsInline`

The video source should be easy to replace later.

Do not use an unrelated stock video.

## Overlays

Layer the hero:

```text
VIDEO
↓
NOISE
↓
DARK GRADIENT
↓
CONTENT
```

Use a dark gradient to guarantee text readability.

---

# HERO CENTRAL GRAPHIC

Place:

`Witch_2@4x.png`

as the primary visual element in the center of the hero.

The graphic should feel like a visual centerpiece rather than a normal image.

Use responsive sizing.

Example:

```text
mobile:
w-[65vw]

tablet:
w-[50vw]

desktop:
w-[35vw]
```

Do not distort the image.

Maintain its original aspect ratio.

---

# HERO CTA

Place a CTA underneath the central Witch graphic:

**Đăng ký ngay**

This should be the main action of the hero.

Use a strong pill-shaped button inspired by the Prisma CTA.

Example:

```text
rounded-full
```

The button should contain:

```text
Đăng ký ngay    →
```

Use `ArrowRight` from lucide-react.

Hover interaction:

* slightly increase gap
* arrow moves to the right
* button scales subtly

Use Framer Motion for the interaction.

The CTA should navigate to the recruitment/form page.

---

# HERO TYPOGRAPHY

The hero should contain a large typographic statement integrated into the composition.

Use typography inspired by the Prisma reference, but adapt the wording to the Ban Văn nghệ Thể thao identity.

Possible primary display:

**VĂN NGHỆ
THỂ THAO**

or another appropriate large typographic treatment based on the available visual space.

Prioritize the Witch graphic and event imagery.

Do not overcrowd the hero.

---

# SECTION 02 — HORIZONTAL MARQUEE

Immediately after the hero, create a compact horizontal scrolling marquee.

This section should be visually lightweight.

It should not feel like a normal navigation bar.

Use continuous horizontal movement.

Content:

```text
Ban Văn nghệ Thể thao
/
Mảng Tổ chức
/
Mảng Truyền thông
/
Mảng Media-Design
/
Mảng Đối ngoại
/
7 Câu lạc bộ trực thuộc
/
D.O.P
/
GleeBK
/
BeU
/
D.A.S
/
Emcee
/
HRO
/
HBC
```

The marquee should continuously move horizontally.

Use duplicated content to create a seamless infinite loop.

Animation should be slow and elegant.

The user should still be able to read the content.

On mobile, maintain a compact height.

---

# SECTION 03 — EVENTS

Create the main **Sự kiện** section.

Use the information and assets inside the:

`Sự kiện`

folder.

Do not invent event information when real information is available.

## Section heading

Use a large editorial heading:

**Sự kiện**

Add a small supporting label such as:

**Những hoạt động tạo nên màu sắc của Ban**

Keep this concise and visually secondary.

---

# EVENT CAROUSEL / HORIZONTAL SCROLL

Events should appear as large horizontal cards.

Desktop:

```text
┌────────────┐ ┌────────────┐ ┌────────────┐
│   EVENT 1  │ │   EVENT 2  │ │   EVENT 3  │
│            │ │            │ │            │
└────────────┘ └────────────┘ └────────────┘
```

Allow horizontal scrolling.

Do not force all event cards into a conventional 4-column grid.

The section should feel editorial and dynamic.

---

# EVENT CARD

Each card should contain:

* event image
* event name
* optional date
* optional category
* subtle interaction indicator

Event title should be clearly visible on the card.

On hover:

* image subtly scales
* overlay changes
* card content moves slightly
* arrow indicator appears/moves

Use Framer Motion.

---

# EVENT CLICK INTERACTION

When the user clicks an event card:

Open a modal / expanded information panel containing basic event information.

The modal should include:

* Event name
* Date
* Short description
* Main visual
* Basic information

Include:

**Xem chi tiết →**

When clicked, navigate to the dedicated event detail page.

The event detail page can initially use a dynamic route such as:

```text
/events/:slug
```

Create the architecture so that event data can be expanded later.

---

# SECTION 04 — ORGANIZATION STRUCTURE

Create a section:

**Cơ cấu Ban Văn nghệ Thể thao**

Use information from:

`4 mảng`

folder.

The main visual structure should be a **vertical timeline**.

This should be one of the most visually distinctive sections of the website.

---

# ORGANIZATION TIMELINE

Structure:

```text
Ban Văn nghệ Thể thao
          │
          ↓
    Mảng Tổ chức
          │
          ↓
 Mảng Truyền thông
          │
          ↓
 Mảng Media-Design
          │
          ↓
    Mảng Đối ngoại
          │
          ↓
  7 Câu lạc bộ trực thuộc
```

Use a vertical line running through the section.

Each organization should appear as a node/card attached to the timeline.

---

# TIMELINE ANIMATION

As the user scrolls:

* timeline line progressively reveals
* nodes appear sequentially
* cards fade/slide into position

Use Framer Motion and `useInView`.

Each node should have a slight delay from the previous node.

The animation should feel like the organizational structure is being "built" as the user scrolls.

---

# ORGANIZATION NODE

Each node should contain:

* name
* category/number
* small visual indicator
* short description if available

Example:

```text
01
MẢNG TỔ CHỨC
```

or:

```text
01 — Mảng Tổ chức
```

Use the actual information from the provided files.

---

# ORGANIZATION POPUP

When the user clicks an organization box:

Open a modal / popup.

The popup should contain:

* Name
* Basic description
* Role/function
* Relevant information
* Image/logo if available

CTA:

**Xem chi tiết →**

The popup should animate using:

```text
opacity: 0 → 1
scale: 0.96 → 1
```

with a smooth easing curve.

Clicking outside the popup or the close button should dismiss it.

---

# CLUBS

The 7 clubs should be displayed after the four specialized divisions.

Clubs:

```text
D.O.P
GleeBK
BeU
D.A.S
Emcee
HRO
HBC
```

Use the actual club assets/information from the provided folder whenever available.

Visually differentiate:

```text
Ban
↓
4 chuyên môn
↓
7 CLB
```

so users immediately understand the hierarchy.

---

# SECTION 05 — RECRUITMENT 2026

Create a strong recruitment section:

**Tuyển thành viên 2026**

This should feel like a major CTA section rather than a normal information block.

Use large typography and strong visual hierarchy.

---

# RECRUITMENT TIMELINE

Display the recruitment milestones:

```text
01/09
Mở đơn

16/09
Đóng đơn

19/09
Phỏng vấn
```

Present them as a visual horizontal timeline on desktop and vertical timeline on mobile.

Use large numbers for the dates.

Example:

```text
01/09
───────
MỞ ĐƠN
```

The current stage should be visually emphasized.

---

# RECRUITMENT CTA

Primary CTA:

**Đăng ký ngay**

Clicking this button should navigate to the recruitment form.

The form URL should be stored as a configurable constant.

Do not hardcode it in multiple components.

The CTA should have a strong hover animation.

---

# FOOTER

Create a minimal but visually strong footer.

Include:

**Ban Văn nghệ Thể thao
Đoàn Đại học Bách khoa Hà Nội**

Navigation:

* Trang chủ
* Sự kiện
* Mảng chuyên môn
* Tuyển thành viên 2026

Contact:

* Facebook
* Email if available

Add a final visual statement / large typography.

Example:

**SEE YOU ON STAGE.**

or another appropriate closing statement.

Keep the footer dark and editorial.

---

# RESPONSIVE DESIGN

The website must work properly across:

* Mobile
* Tablet
* Desktop
* Large desktop

Use Tailwind responsive breakpoints:

```text
sm
md
lg
xl
2xl
```

---

# MOBILE BEHAVIOR

On mobile:

## Navbar

Convert the desktop navigation into a compact mobile navigation.

Do not allow the navbar to overflow horizontally.

## Hero

Prioritize:

```text
Witch graphic
↓
Đăng ký ngay
```

Keep the composition visually centered.

## Marquee

Keep it compact and continuously scrolling.

## Events

Use horizontal scrolling cards.

## Organization

Timeline becomes vertical and full width.

## Recruitment

Timeline becomes vertical.

All text should remain readable without excessive scaling.

---

# SCROLL EXPERIENCE

The entire website should feel like one continuous visual journey.

Recommended progression:

```text
HERO
  ↓
MARQUEE
  ↓
EVENTS
  ↓
ORGANIZATION
  ↓
RECRUITMENT
  ↓
FOOTER
```

Use generous vertical spacing between sections.

Avoid making every section look like an isolated card.

The background should remain visually cohesive.

---

# MICRO INTERACTIONS

Use subtle interactions:

### Buttons

* arrow movement
* slight scale
* gap expansion

### Event cards

* image zoom
* overlay transition
* arrow reveal

### Organization nodes

* border/accent transition
* slight translation
* popup reveal

### Navigation

* smooth hover transitions
* active section indication where appropriate

Do not over-animate the interface.

---

# PERFORMANCE

Optimize the implementation for a real production website.

Requirements:

* Avoid unnecessary dependencies.
* Use lazy loading where appropriate.
* Do not load large assets unnecessarily before they are needed.
* Videos must be muted and inline.
* Images should use appropriate sizing and `object-cover` / `object-contain` depending on their role.
* Avoid layout shifts.
* Do not create unnecessary re-renders.
* Do not add a heavy animation library beyond Framer Motion.

The future hero video should not block initial page rendering.

---

# ACCESSIBILITY

Ensure:

* Images have meaningful `alt` attributes.
* Buttons are actual `<button>` elements.
* Links are actual `<a>` elements where appropriate.
* Modal dialogs can be closed with a clear close button.
* Keyboard users can navigate interactive elements.
* Text remains sufficiently readable against backgrounds.
* Avoid relying only on color to communicate information.

---

# IMPLEMENTATION RULES

Strictly follow these rules:

1. Use React + TypeScript.
2. Use Tailwind CSS for layout and styling.
3. Use Framer Motion for requested animations.
4. Use lucide-react for interface icons.
5. Keep components reusable.
6. Store event/organization data separately from UI components.
7. Do not duplicate event data inside components.
8. Keep external URLs configurable.
9. Use the provided assets.
10. Do not replace provided assets with generic placeholders when they are available.
11. Do not invent factual information about the organization.
12. Do not add sections that are not requested.
13. Do not introduce an AI/chatbot visual style.
14. Do not use excessive glassmorphism.
15. Do not use excessive gradients.
16. Do not create unnecessary dependencies.
17. Avoid horizontal overflow.
18. Ensure the site works on mobile.
19. Ensure there are no console errors.
20. Keep the visual language consistent across all sections.

---

# IMPORTANT DESIGN PRINCIPLE

The website should NOT look like a generic "university organization website".

It should feel like:

**A creative digital home for the people, events and culture behind Ban Văn nghệ Thể thao.**

The first impression should communicate:

```text
ENERGY
CREATIVITY
COMMUNITY
PERFORMANCE
SPORT
HUST
```

Use cinematic composition, oversized typography, event imagery, motion and editorial spacing to achieve this.

Prioritize visual impact while keeping the interface usable.

---

# FINAL ACCEPTANCE CRITERIA

Before considering the implementation complete, verify:

* Hero occupies the viewport.
* Hero has a replaceable video background.
* `Witch_2@4x.png` is correctly positioned in the hero.
* "Đăng ký ngay" CTA works.
* Navbar is responsive.
* "Liên hệ ngay" opens the configured Facebook destination.
* Marquee scrolls continuously and seamlessly.
* Events are horizontally scrollable.
* Event cards open an information popup.
* "Xem chi tiết" can navigate to an event detail route.
* Organization structure is represented as a vertical timeline.
* Four specialized divisions are displayed.
* Seven clubs are displayed.
* Organization nodes open information popups.
* Recruitment timeline contains:

  * 01/09 — Mở đơn
  * 16/09 — Đóng đơn
  * 19/09 — Phỏng vấn
* Recruitment CTA works.
* Footer is implemented.
* Animations use Framer Motion.
* The website has no horizontal overflow.
* The website is responsive.
* No console errors.
* No unnecessary sections or features have been added.
* The visual result feels cinematic, youthful and premium.
