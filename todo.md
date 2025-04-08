# TODO List

This file tracks specific tasks and improvements to be implemented.

## Blog Landing Page (`/blog/[page].astro`) Improvements

- [x] **Layout/Visuals:**
    - [x] Make "Latest Post" visually distinct (e.g., full-width, larger card).
    - [x] Consider reducing grid density (e.g., `lg:grid-cols-2`).
    - [x] Review/adjust whitespace between sections.
- [x] **UX:**
    - [x] Add dedicated "Categories" list/section.
    - [ ] Explore search/filter options (client-side or backend). (Deferred)
    - [x] Enhance pagination controls (e.g., show page numbers).
- [x] **Mobile:**
    - [x] Review stacking of featured post + grid.
    - [ ] Check tap target sizes. (Deferred)

---

## Homepage (`/`) Improvements

### Visual Design & Layout [Priority]
- [ ] **Hero:** Assess visual impact/distraction of `FlickeringGrid`.
- [ ] **Hero:** Ensure sufficient text contrast against `FlickeringGrid`.
- [x] **Hero:** Verify graceful stacking of the two-column layout on smaller screens. (Verified via code review)
- [x] **Consistency:** Ensure visual style consistency (spacing, typography, color) across components (`FeaturedItemsCarousel`, `ClientLogos`, `BlogPostPreview`). (Reviewed and minor adjustments made)
- [x] **Spacing:** Review vertical rhythm/spacing between sections. (Reviewed via code review)
- [ ] **Responsiveness:** Thoroughly test layout adaptation (Hero grid, Carousel, Logos, Blog grid) on various screen sizes. (Requires manual testing)

### Performance
- [x] **Images:** Verify `loading="lazy"` on below-the-fold images (Carousel, Blog Previews). (Verified via code review - Astro default/explicitly set)
- [x] **Images:** Ensure `width`/`height` attributes match display size to prevent layout shifts. (Verified via code review)
- [ ] **JavaScript:** Profile JS bundle size and execution time. (Requires manual testing with browser dev tools)
- [x] **JavaScript:** Evaluate converting React components (`ClientLogos`, `FlickeringGrid`?) to Astro if feasible. (Evaluated - conversion likely not worth the effort currently)
- [x] **Video:** Ensure Wistia player is lazy-loaded or optimized to avoid impacting LCP. (Set `preload="metadata"`)
- [ ] **CSS:** Review `global.css` for unnecessary styles. (Requires deeper analysis)
- [x] **Fonts:** Inspect `fonts.css` for efficiency (`font-display: swap;`, self-hosting). (Converted to self-hosted with `@font-face`)

### UX (User Experience)
- [ ] **Navigation:** Test mobile menu animation smoothness. (Requires manual testing)
- [x] **Navigation:** Ensure smooth scrolling for hash links (`/#sizzle-reel`, `/#portfolio`). (Verified via code review - enabled globally)
- [x] **Interactions:** Ensure clear visual feedback for all interactive elements (Theme toggle, Mobile menu, Carousel controls, Fade-in effect). (Reviewed via code analysis - seems adequate)
- [ ] **Interactions:** Test carousel controls for intuitiveness. (Requires manual testing)
- [x] **Content:** Ensure clear content hierarchy using semantic HTML headings (H1, H2, etc.). (Reviewed and corrected blog preview headings)

### Mobile Compatibility
- [ ] **Performance:** Test `FlickeringGrid` performance on mobile.
- [ ] **Layout:** Ensure `WistiaPlayer` is fully responsive and contained.
- [ ] **Readability:** Check text readability on small screens.
- [ ] **Touch Targets:** Verify adequate touch target sizes for all interactive elements.

### Typography
- [x] **Consistency:** Review `tailwind.config.cjs` and `fonts.css` to confirm font definitions. (Done)
- [x] **Application:** Ensure consistent application of font sizes, weights, line heights.
    - [x] Apply `font-heading` (Poppins) to Hero `h1` (`HeroWithVideoContent.tsx`).
    - [x] Apply `font-heading` (Poppins) to Featured Projects `h2` (`FeaturedItemsCarousel.tsx`).
    - [x] Apply `font-heading` (Poppins) to Featured Projects item titles (`FeaturedItemsCarousel.tsx`).
    - [x] Apply `font-heading` (Poppins) to Client Logos `h2` (`ClientLogos.tsx`).
    - [x] Review/standardize heading weights (e.g., `font-bold` for `h2`s) after applying `font-heading`. (Standardized relevant H2s to font-bold)
    - [x] (Optional) Consider changing header brand text ("Coalbanks Creative") to `font-heading`. (Changed to Poppins)
- [ ] **Contrast:** Check text/background contrast in both light and dark modes.
- [ ] **Mobile Nav:** Verify link order in `MobileNav.astro` matches desktop header (About, Services, Blog, Contact).

---

## Pre-Launch SEO & Accessibility Checklist

### SEO
- [ ] Review Image Alt Text across site components (Carousel [Done], About [Done], etc.).
- [x] Implement Structured Data (Schema Markup - LocalBusiness, Service).
- [ ] Review Internal Linking Strategy (e.g., blog posts to service pages) [Started - Real Estate, Mapping].
- [x] Verify XML Sitemap Generation (`sitemap-index.xml`).
- [x] Check `robots.txt` for crawlability.
- [ ] Review Blog Post SEO (Titles/Descriptions in frontmatter).

### Accessibility
- [x] Check Semantic HTML & Heading Structure site-wide.
- [ ] Test Keyboard Navigation thoroughly.
- [ ] Verify Color Contrast Ratios (WCAG AA).
- [x] Review ARIA Roles/Attributes on custom components (if needed).
- [ ] Check Form Accessibility (labels, error messages).
- [ ] Ensure Video Accessibility (Captions for Wistia player).

---
*Add other tasks as needed.*
