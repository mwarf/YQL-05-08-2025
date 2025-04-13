# lethbridgedrone.com

This is the landing page project for Coalbanks Creative's drone videography and photography services, built with Astro, React, Tailwind CSS, and Shadcn UI conventions.

## Getting Started

1.  **Node.js:** Ensure you are using Node.js version `22.14.0` (check `.nvmrc`). If using `nvm`, run `nvm use`.
2.  **Install Dependencies:** Run `pnpm install`.
3.  **Environment Variables:** For the contact form to work locally, create a `.dev.vars` file in the project root and add your Resend API key:
    ```
    RESEND_API_KEY=your_resend_api_key_here
    ```
    *(This key also needs to be configured in Cloudflare Pages deployment settings).*
4.  **Run Development Server:** Run `pnpm dev`. The site should be available at `http://localhost:4322`.

## Features

- **Framework:** [Astro](https://astro.build) v5.6.1
- **UI Components:** [React](https://react.dev) v18.3.1 (via `@astrojs/react`)
- **Styling:** [Tailwind CSS](https://tailwindcss.com) v3.4.x (via `@astrojs/tailwind`)
- **Component Primitives:** [Shadcn UI](https://ui.shadcn.com) conventions (components in `src/components/ui/`)
- **Key Sections:**
    - Hero section with video background (`HeroWithVideoContent.tsx`, `WistiaPlayer.astro`)
    - Featured Projects Carousel (`FeaturedItemsCarousel.tsx`)
    - Client Logos Carousel (`ClientLogos.tsx`)
    - Featured Blog Posts section (pulling from `src/content/blog/`)
    - Contact Form (submits to Cloudflare Function `functions/api/submit.ts` using Resend)
- **Theme Toggle:** Light/dark mode support.
- **Deployment:** Cloudflare Pages.
- **Formatting:** Biome (`pnpm format`).

## Adding Shadcn UI Components

Shadcn UI is a collection of re-usable components that can be easily integrated into your applications. It is not a component library, but rather a set of components that you can copy and paste into your projects.

To add a new component to your application, please refer to the [configuration guide](https://ui.shadcn.com/docs/installation/astro#thats-it).

> [!NOTE]
> In Astro, an [island](https://docs.astro.build/en/concepts/islands/) refers to any interactive UI component on the page. To add an interactive component like [Accordion](https://ui.shadcn.com/docs/components/accordion), [Dialog](https://ui.shadcn.com/docs/components/dialog) and more you have a couple of solutions available: [Add a Shadcn UI Component - Space Madness](https://spacemadness.dev/docs/add-a-shadcn-ui-component) or [shadcn-ui/ui#2890](https://github.com/AREA44/astro-shadcn-ui-template/issues/66).

> [!TIP]
> When integrating components, especially those handling images or complex data structures, pay close attention to the expected prop types defined in the component's TypeScript interface. For image optimization, leverage Astro's built-in utilities like `getImage` from `astro:assets` to generate the necessary attributes if the component requires them (e.g., an `optimizedAttrs` prop instead of a simple `imageSrc`).

For detailed documentation on using Shadcn UI, please visit the [full documentation](https://ui.shadcn.com/docs).

Shadcn UI is primarily built for the React framework. If you are unfamiliar with framework components in Astro, we recommend reading the [framework components guide](https://docs.astro.build/en/core-concepts/framework-components/) to get started.

Feel free to explore the various components and enhance your application with Shadcn UI!

## Content Guidelines

### Blog Voice and Tone (Established April 12, 2025)

Future blog posts should adhere to the following voice and tone guidelines to maintain consistency:

*   **Friendly & Conversational:** Write as if you're having a helpful chat with a local business owner or potential client. Avoid overly formal language.
*   **Approachable:** Make complex topics easy to understand. Be welcoming and encouraging.
*   **Knowledgeable & Trustworthy:** Demonstrate expertise in drone technology and its applications, but explain concepts clearly. Build trust through accurate information and helpful advice.
*   **Slightly Witty (Use with Care!):** Inject personality and occasional light humour where appropriate, but maintain professionalism. Don't overdo it.
*   **Locally Focused:** Connect the content to Lethbridge and Southern Alberta whenever relevant (mentioning local landmarks, industries, conditions, etc.).
*   **Minimize Jargon:** Explain technical terms simply or find relatable analogies. Avoid overly technical or corporate-speak.
*   **Benefit-Oriented:** Focus on how the information or service helps the reader/client achieve their goals (save time/money, improve results, enhance safety, etc.).

## License

Licensed under the [MIT License](LICENSE).
