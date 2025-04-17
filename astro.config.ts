// @ts-check
// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind"; // Import the tailwind integration
import sitemap from "@astrojs/sitemap"; // Import the sitemap integration
import cloudflare from "@astrojs/cloudflare"; // Import the Cloudflare adapter
import icon from "astro-icon"; // Uncomment astro-icon import

// https://astro.build/config
export default defineConfig({
  site: "https://lethbridgedrone.com", // Set production domain
  output: "server", // Required for Cloudflare adapter
  adapter: cloudflare(), // Add the Cloudflare adapter
  integrations: [
    react(),
    tailwind(), // Add the tailwind integration
    sitemap(), // Add the sitemap integration
    icon({
      // Uncomment and configure astro-icon integration
      include: {
        // Include the icon pack used in SocialShare.astro
        mdi: ["*"], // Include all icons from Material Design Icons
      },
    }),
  ],
  // Explicitly set image service to compile for Cloudflare compatibility
  image: {
    service: {
      entrypoint: "astro/assets/services/compile",
    },
  },
  vite: {
    // Remove the tailwindcss plugin from here
    plugins: [],
  },
  // Add redirects for pagination
  redirects: {
    "/blog": "/blog/1", // Redirect base blog path to the first page
  },
});
