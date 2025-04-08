# Knowledge Transfer: lethbridgedrone.com

This document provides an overview of the `lethbridgedrone.com` project for new developers.

## 1. Project Goal

The primary goal of this website is to serve as a professional landing page for Coalbanks Creative's drone videography and photography services in Lethbridge. It aims to showcase capabilities, feature a portfolio, and provide a clear contact method for potential clients.

See `ROADMAP.md` for detailed feature planning and status.

## 2. Tech Stack

*   **Framework:** [Astro](https://astro.build/) (v5.6.1)
*   **UI Components:** [React](https://react.dev/) (v18.3.1) used via `@astrojs/react` integration.
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.0.17) with [Shadcn UI](https://ui.shadcn.com/) conventions (using CSS variables defined in `src/styles/global.css`).
    *   Configuration: `tailwind.config.cjs`
    *   Custom Fonts: Inter (default sans), Poppins (heading) - see `src/styles/fonts.css`.
*   **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) (Adapter: `@astrojs/cloudflare`)
*   **Package Manager:** [pnpm](https://pnpm.io/) (v10.7.0)
*   **Language:** TypeScript
*   **Formatting/Linting:** [Biome](https://biomejs.dev/) (v1.9.4) - use `pnpm format`

## 3. Project Structure

*   `src/pages/index.astro`: The main landing page component containing all sections.
*   `src/components/`: Reusable Astro/React components (Header, Footer, UI elements based on Shadcn).
*   `src/layouts/BaseLayout.astro`: Main page layout including SEO head.
*   `src/styles/`: Global CSS, font definitions.
*   `public/`: Static assets served directly.
    *   `public/images/logos/`: Contains client/project logos used in the portfolio (moved here from `src/` due to SVG handling issues).
*   `functions/`: Cloudflare Pages Functions.
    *   `functions/api/submit.ts`: Handles contact form submissions.
*   `astro.config.ts`: Astro configuration file (integrations, Vite settings).
*   `tailwind.config.cjs`: Tailwind CSS configuration.
*   `package.json`: Project dependencies and scripts.
*   `.nvmrc`: Specifies the required Node.js version (`22.14.0`).
*   `ROADMAP.md`: Tracks project features and progress.

## 4. Setup & Running

1.  **Node.js:** Ensure you are using Node.js version `22.14.0`. If using `nvm`, run `nvm use` in the project root.
2.  **Install Dependencies:** Run `pnpm install`.
3.  **Environment Variables:** For the contact form to work, create a `.dev.vars` file in the project root (this is used by Cloudflare's local dev tool, `wrangler`) and add your Resend API key:
    ```
    RESEND_API_KEY=your_resend_api_key_here
    ```
    *Note: You also need to configure this variable in the Cloudflare Pages deployment settings.*
4.  **Run Development Server:** Run `pnpm dev`. The site should be available at `http://localhost:4322`.

## 5. Key Features & Implementation Notes

*   **Single Page Layout:** All content resides within `src/pages/index.astro`.
*   **Portfolio Section:** Displays items defined in the `portfolioItems` array in `index.astro`. Uses standard `<img>` tags referencing logos in `public/images/logos/`.
*   **Contact Form:**
    *   Submits data via POST to `/api/submit`.
    *   Handled by the Cloudflare Function `functions/api/submit.ts`.
    *   Uses the Resend service to email submissions to `michael@coalbanks.com`. Requires a verified sending domain (`noreply@lethbridgedrone.com`) in Resend and the `RESEND_API_KEY` environment variable.
    *   Basic client-side JavaScript in `index.astro` handles form submission feedback (success/error messages).
*   **Styling:** Primarily uses Tailwind utility classes. Shadcn UI components (`src/components/ui/`) provide structure and base styling, customized via `src/styles/global.css` (CSS variables) and `tailwind.config.cjs`.
*   **SVG Handling:** As noted in `ROADMAP.md`, attempts to use Astro's standard `import` mechanism for SVGs in `src/` caused persistent TypeScript errors. The current working solution is to place SVGs in `public/` and reference them directly in `<img>` tags.
*   **TypeScript Error Debugging (Blog Feature):** While implementing the blog feature (Apr 5, 2025), persistent and misleading TypeScript errors (e.g., `Type 'boolean' is not assignable to type 'string'`, `astro/jsx-runtime` not found) appeared, primarily pointing to `src/pages/index.astro`. Debugging the component tree did not reveal a code-level cause. The issue is suspected to be related to development server or TS server caching, or potentially dependencies. Recommended fix: Restart Astro dev server and VS Code TS server; reinstall dependencies if needed.
*   **Tailwind CSS Configuration (Apr 5, 2025):** Encountered build errors related to PostCSS and Tailwind after attempting to fix TypeScript issues.
    *   **Issue 1:** Using `tailwindcss` (v4.x) directly as a Vite plugin in `astro.config.ts` conflicted with the `@astrojs/react` integration.
    *   **Issue 2:** Installing `@astrojs/tailwind` (v6.0.2) caused conflicts because it expected `tailwindcss` v3.x, but v4.0.17 was installed.
    *   **Issue 3:** `src/styles/global.css` used `@import "tailwindcss";` which is incorrect for Tailwind v3 with `postcss-import`.
    *   **Resolution:**
        1.  Installed the official `@astrojs/tailwind` integration (`pnpm install @astrojs/tailwind`).
        2.  Updated `astro.config.ts` to use `tailwind()` integration and removed the `tailwindcss` Vite plugin.
        3.  Downgraded `tailwindcss` to a compatible v3 version (`pnpm uninstall tailwindcss && pnpm install tailwindcss@^3.4.10`). Version 3.4.17 was installed.
        4.  Updated `src/styles/global.css` to use `@tailwind base; @tailwind components; @tailwind utilities;` instead of `@import "tailwindcss";`.
    *   **Note:** The persistent TypeScript errors were likely symptoms of these underlying configuration conflicts.
*   **Index Page Component Integration (Apr 7, 2025):** Resolved several errors in `src/pages/index.astro` related to component usage:
    *   **Missing Imports:** Components like `FlickeringGrid` and `ClientLogos` were used without being imported. Added the necessary named imports (e.g., `import { FlickeringGrid } from '@/components/ui/flickering-grid';`).
    *   **Prop Type Mismatch:** The `FeaturedItemsCarousel` component expected its `items` prop to be an array of objects conforming to the `GalleryItem` type, which requires an `optimizedAttrs` property. The initial data provided `imageSrc` instead.
    *   **Astro Image Optimization:** Used the `getImage` utility from `astro:assets` to process imported images and generate the required `imgAttrs` object (including `src` and `srcset`) for each item passed to `FeaturedItemsCarousel`. Corrected usage in the component to access `srcset` directly.
    *   **Typography Consistency (Apr 8, 2025):** Applied `font-heading` (Poppins) consistently to major headings (`h1`, `h2`) and titles (e.g., carousel items) across homepage components. Standardized heading weights (`font-bold`). Changed header brand text ("Coalbanks Creative") to use `font-heading` as well.
    *   **Header Navigation (Apr 8, 2025):** Removed "Reel" and "Portfolio" links. Reordered remaining links to: About, Services, Blog, Contact.

## 6. Development Workflow

*   **Formatting:** Run `pnpm format` to format code using Biome. This is often integrated into IDEs on save.
*   **Branching:** (Assumed standard Git flow - e.g., feature branches off `main`/`master`).
*   **Deployment:** Pushing to the configured branch (likely `main`) should trigger automatic deployments on Cloudflare Pages.

---
*This document should be kept up-to-date as the project evolves.*
