// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind"; // Import the tailwind integration
// import tailwindcss from "@tailwindcss/vite"; // Remove Vite plugin import
import icon from "astro-icon"; // Uncomment astro-icon import

// https://astro.build/config
export default defineConfig({
  site: process.env.CI
    ? "https://astro-shadcn-ui-template.vercel.app"
    : "http://localhost:4322", // Updated port based on dev server output
  integrations: [
    react(),
    tailwind(), // Add the tailwind integration
    icon({
      // Uncomment and configure astro-icon integration
      include: {
        // Include the icon pack used in SocialShare.astro
        mdi: ["*"], // Include all icons from Material Design Icons
      },
    }),
  ],
  vite: {
    // Remove the tailwindcss plugin from here
    plugins: [],
  },
  // Add redirects for pagination
  redirects: {
    "/blog": "/blog/1", // Redirect base blog path to the first page
  },
});
