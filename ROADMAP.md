# ROADMAP: lethbridgedrone.com Landing Page

This document outlines the development plan for the lethbridgedrone.com website, serving as a portfolio and lead capture tool for Coalbanks Creative's drone videography services.

 **Goal:** Create a professional, engaging landing page showcasing drone capabilities, featuring a sizzle reel, portfolio examples, and a clear way for potential clients to inquire.

 ---

+## Current Status (As of April 8, 2025)
+
+*   **Core Functionality:** Most core features (Hero, Sizzle Reel embed, Portfolio Carousel, Services/About text, Contact Form w/ Resend) are implemented.
+*   **Styling:** Basic branding, Tailwind styling, and responsiveness (including mobile nav) are in place. Typography consistency improved.
+*   **Recent Fixes:**
+    *   Resolved issues with featured project carousel image optimization using Astro Assets (`srcset` usage).
+    *   Improved typography consistency (applied `font-heading` to headings/titles, standardized weights, updated header brand font).
+    *   Updated header navigation links (removed Reel/Portfolio, reordered).
+*   **Next Steps:** Focus on pre-launch checks (Phase 4) and final deployment (Phase 5). Blog implementation is a future enhancement.
+
+---

## Phase 1: Foundation & Setup

*   [x] **Confirm Tech Stack:** Astro, TypeScript, TailwindCSS (Based on existing project files).
*   [x] **Define Basic Layout:** Header, Footer, Main content sections. (Placeholders added in `src/pages/index.astro`)
    *   *Decision:* Single-page scroll or multi-section layout? **Selected: Single-page scroll**
*   [x] **Navigation:** Implement basic navigation (if needed for single-page scroll). (Updated `src/components/Header.astro`)
*   [x] **SEO Foundation:** Configure `src/components/HeadSEO.astro` with initial metadata (title, description). (Updated in `src/pages/index.astro`)
*   [x] **Theme Setup:** Basic light/dark mode toggle (`src/components/ThemeToggle.astro` exists).

## Phase 2: Core Content & Features

*   [x] **Hero Section:** (Added to `src/pages/index.astro`)
    *   [x] Compelling headline related to drone videography in Lethbridge.
    *   [x] Brief introductory text about Coalbanks Creative's drone services.
    *   [x] Primary Call-to-Action (CTA) button (e.g., "Get a Quote", "View Portfolio").
*   [x] **Sizzle Reel Section:** (Added to `src/pages/index.astro`)
    *   [x] Embed main sizzle reel video.
    *   *Decision:* Where is the video hosted (YouTube, Vimeo, other)? Need embed code or URL. **Selected: YouTube**
*   [x] **Portfolio Showcase:** (Grid implemented in `src/pages/index.astro`)
    *   [x] Design layout (e.g., grid, carousel). **Selected: Grid**
    *   [x] Integrate portfolio items with client logos (from /public) and video links.
    *   *Dependency:* Consider replacing client logos with actual project thumbnail images/videos later.
*   [x] **Services / About Section:** (Added to `src/pages/index.astro`)
    *   [x] Briefly outline key drone services offered.
    *   [x] Add text to build authority/trust (e.g., experience, unique selling points).
*   [x] **Lead Capture Form:**
    *   [x] Create form fields (e.g., Name, Email, Message, Service Interest). (Basic structure added in `src/pages/index.astro`)
    *   [x] Implement form submission logic. (Created Cloudflare Function `functions/api/submit.ts` using Resend; updated form attributes)
    *   *Decision:* How to handle submissions? (e.g., Cloudflare Pages Functions, third-party service like Formspree, Basin). **Selected: Cloudflare Pages Functions w/ Resend**

## Phase 3: Styling & Polish

*   [x] **Branding:** Apply Coalbanks Creative branding (colors, fonts if specific). (Applied Sky Blue/Orange colors, Poppins/Inter fonts. Updated header brand font.)
 *   [x] **TailwindCSS Implementation:** Style all components consistently. (Applied section backgrounds, button/hover colors, adjusted card spacing. Improved typography consistency.)
 *   [x] **Responsiveness:** Ensure optimal viewing on desktop, tablet, and mobile. (Added interactive mobile menu, standardized padding)
 *   [x] **Performance Optimization:** Optimize images (using Astro Assets for carousel) and video loading (Wistia embed). *Further optimization possible post-launch.*
 *   [ ] **Micro-interactions:** Add subtle animations/transitions (optional). (Fade-in skipped due to technical issues)

 ## Phase 4: Deployment & Testing

 *   [ ] **Deployment Setup:** Verify Cloudflare Pages settings (Git repo connection, branch: `main`, build command: `pnpm run build`, output directory: `dist`).
 *   [x] **Local Build Check:** Ran `pnpm run build` locally, completed successfully.
 *   [ ] **Functionality Testing:** Test navigation, video playback, form submission (especially Resend function).

+### Pre-Launch Checklist
+*   [ ] **Final Content Review:** Proofread all text, check links, verify images/videos.
+*   [ ] **Cross-Browser/Device Testing:** Test on Chrome, Firefox, Safari, Edge (Desktop, Tablet, Mobile).
+*   [ ] **Performance Audit:** Run Lighthouse/WebPageTest.
+*   [ ] **Accessibility (A11y) Check:** Use axe DevTools/WAVE.
+*   [ ] **Form Submission Test:** Send test submission via contact form, verify Resend email receipt.
+*   [ ] **Analytics Setup:** Configure Cloudflare Web Analytics or other provider.
+*   [ ] **Final SEO Check:** Review meta titles/descriptions. Check `robots.txt` (if applicable).

 ## Phase 5: Launch Steps

 *   [ ] **Final Build Verification:** Run `pnpm run build` one last time locally.
 *   [ ] **Cloudflare Configuration Check:** Final review of branch, build command, output directory.
 *   [ ] **Domain Configuration:** Ensure `lethbridgedrone.com` points to Cloudflare Pages deployment.
 *   [ ] **Trigger Deployment:** Push final commit or manually trigger deployment in Cloudflare.
 *   [ ] **Monitor Deployment:** Watch Cloudflare build logs.
 *   [ ] **Post-Launch Checks:** Verify live site functionality and analytics tracking.
 *   [ ] **Feedback & Updates:** Gather user feedback and plan future improvements.

---

*This roadmap is a living document and will be updated as the project progresses.*

---

## Future Enhancements & Features to Consider

This section lists potential features and improvements brainstormed after the initial launch. These can be prioritized and moved into active development phases as needed.

### Blog Implementation (Thought Leadership)

*   [ ] **Setup Content Collections:** Use `src/content/blog/` for Markdown posts.
*   [ ] **Define Schema (`src/content/config.ts`):** Create `blog` collection schema (`title`, `description`, `pubDate`, `category`, `featured`, `heroImage` with Unsplash URLs initially).
*   [ ] **Create Placeholder Content:** Add 4-5 sample `.md` posts in `src/content/blog/` with standard categories ("Technology", "Industry News", "Tips & Tricks"), varying `featured` status and dates, using Unsplash URLs for `heroImage`.
*   [ ] **Build Blog Listing Page (`src/pages/blog/index.astro`):**
    *   [ ] Fetch and display all posts (newest first).
    *   [ ] Show title, date, category, description, thumbnail (`heroImage`).
    *   [ ] Implement basic category filtering.
*   [ ] **Build Blog Detail Page (`src/pages/blog/[...slug].astro`):**
    *   [ ] Fetch and display full post content and metadata.
    *   [ ] Display main `heroImage`.
    *   [ ] Show 2-3 related posts (by category).
*   [ ] **Integrate Featured Posts on Homepage (`src/pages/index.astro`):**
    *   [ ] Fetch and display latest 3 `featured: true` posts in a card grid.
*   [ ] **Create `BlogPostPreview.astro` Component:** For use in listing page and homepage featured section.
*   [ ] **Create/Adapt Layout:** Use `BaseLayout.astro` or create `BlogLayout.astro`.
*   [ ] **Apply Styling:** Use existing Tailwind/Shadcn setup.
*   [ ] **Update Navigation:** Add `/blog` link to `Header.astro` and `MobileNav.astro`.
*   [ ] **Integrate SEO:** Use `HeadSEO.astro` for blog pages.
*   [ ] **Future:** Replace Unsplash URLs with locally hosted, optimized images using Astro Assets.
*   [ ] **Landing Page Improvements (`/blog/[page].astro`):**
    *   [ ] **Layout/Visuals:**
        *   [ ] Make "Latest Post" visually distinct (e.g., full-width, larger card).
        *   [ ] Consider reducing grid density (e.g., `lg:grid-cols-2`).
        *   [ ] Review/adjust whitespace between sections.
    *   [ ] **UX:**
        *   [ ] Add dedicated "Categories" list/section.
        *   [ ] Explore search/filter options (client-side or backend).
        *   [ ] Enhance pagination controls (e.g., show page numbers).
    *   [ ] **Mobile:**
        *   [ ] Review stacking of featured post + grid.
        *   [ ] Check tap target sizes.

**Content & Services:**

*   [ ] **Portfolio/Gallery:** Create dedicated pages or sections showcasing past projects with high-quality images and videos. Could be categorized by service type (e.g., Real Estate, Inspection, Events).
*   [ ] **Detailed Service Pages:** Expand on the services offered, providing more specifics on capabilities, equipment used, deliverables, and pricing tiers (if applicable).
*   [ ] **Case Studies:** In-depth examples of successful projects, highlighting challenges and solutions.
*   [ ] **Testimonials/Client Logos:** Build trust by showcasing positive feedback from past clients.
*   [ ] **Blog/News Section:** Share industry insights, project updates, drone technology news, or tips related to drone usage. Good for SEO and engagement.
*   [ ] **FAQ Page:** Address common questions about services, pricing, regulations, etc.

**User Experience & Functionality:**

*   [ ] **Online Booking/Quote Request Form:** Allow users to request quotes or book services directly through the site (might require more complex backend or integration).
*   [ ] **Interactive Map:** Showcase service area or past project locations.
*   [ ] **Video Integration:** Embed high-resolution video showcases directly on pages.
*   [ ] **Accessibility Audit & Improvements (A11y):** Ensure the site is usable by people with disabilities (WCAG compliance).
*   [ ] **Performance Optimization:** Further optimize images (e.g., AVIF/WebP), review Core Web Vitals, and potentially implement advanced Astro performance features.

**Technical & SEO:**

*   [ ] **Advanced SEO:** Implement structured data (Schema.org) for services, portfolio items, etc. Conduct keyword research and optimize content further.
*   [ ] **Analytics Integration:** Set up Cloudflare Web Analytics or another provider (like Plausible/Fathom/Google Analytics) to track traffic and user behavior.
*   [ ] **Sitemap Generation:** Ensure an up-to-date `sitemap.xml` is generated and submitted to search engines. (Astro likely handles this, but worth verifying).
*   [ ] **Security Headers:** Implement stricter Content Security Policy (CSP) and other security-related HTTP headers via Cloudflare.
*   [ ] **Progressive Web App (PWA) Features:** Add offline capabilities or installability if relevant for users.

**Contact & Lead Management:**

*   [ ] **CRM Integration:** Connect the contact form submissions directly to a Customer Relationship Management (CRM) system.
*   [ ] **CAPTCHA/Anti-Spam:** Add protection to the contact form (e.g., Cloudflare Turnstile, hCaptcha).


### Technical Notes / Lessons Learned

*   **SVG Handling:** Encountered issues displaying SVG logos stored in `src/images/`. While Astro's standard practice is to `import` assets from `src/`, attempts to use imported SVGs with either `<Image>` or `<img>` resulted in persistent TypeScript errors (`Type 'boolean' is not assignable to type 'string'`). The root cause of the type conflict wasn't definitively identified.
    *   **Resolution:** Moved SVG logos to `public/images/logos/` and used standard `<img>` tags with root-relative paths (e.g., `/images/logos/logo.svg`). This treats them as static assets, bypassing the problematic type errors and ensuring they display correctly.
    *   **Future Consideration:** If Astro's asset optimization for these SVGs is desired later, the TypeScript conflict when importing from `src/` needs further investigation.
*   **Tailwind CSS Configuration (Apr 5, 2025):** Resolved build errors caused by Tailwind CSS configuration conflicts. The fix involved installing `@astrojs/tailwind`, downgrading `tailwindcss` to v3.4.x, updating `astro.config.ts` to use the integration, and correcting `@import` to `@tailwind` directives in `src/styles/global.css`. See `knowledgetransfer.md` for full details.
*   **Persistent TypeScript Errors (Blog Implementation):** During the blog feature development (Apr 5, 2025), encountered persistent TypeScript errors (e.g., `Type 'boolean' is not assignable to type 'string'`, `astro/jsx-runtime` not found) primarily pointing to `src/pages/index.astro`, but seemingly unrelated to the code at the indicated lines. Extensive debugging of the component tree (`BaseLayout`, `HeadSEO`, `Header`, `Footer`, `MobileNav`, `ThemeToggle`, `Button`) did not reveal a clear code-level cause. These errors were likely symptoms of the Tailwind configuration issues.
    *   **Likely Cause:** Suspected caching issues within the Astro development server or VS Code TypeScript language server, or potentially a subtle dependency/configuration conflict (resolved by fixing Tailwind setup).
    *   **Recommended Resolution:** Restarting the Astro dev server and the VS Code TS server. If issues persist, reinstall dependencies (`pnpm install` / `npm install`).
*   **Carousel Image Attributes (Apr 8, 2025):** Resolved `projectImage6 is not defined` error in `FeaturedItemsCarousel.tsx`. The issue stemmed from incorrectly trying to access `item.imgAttrs.srcset.attribute` instead of using the `item.imgAttrs.srcset` string directly, which is provided by Astro's `getImage` utility.
