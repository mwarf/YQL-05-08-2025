// tailwind.config.cjs
const { fontFamily } = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // Or 'media' based on preference
  content: [
    "./src/pages/**/*.{astro,md,mdx}",
    "./src/components/**/*.{astro,tsx}",
    "./src/layouts/**/*.{astro,md,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))", // We'll define --primary later
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // We'll define --accent later
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // Add our brand colors directly (optional, but can be useful)
        brand: {
          blue: "#0284c7", // sky-600
          orange: "#f97316", // orange-500
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans], // Set Inter as default sans-serif
        heading: ["Poppins", ...fontFamily.sans], // Add Poppins for headings
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      // Add typography customizations
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-links": theme("colors.brand.blue"), // Use brand blue for links
            a: {
              textDecoration: "none", // Remove underline by default
              transition: "color 0.2s ease-in-out",
              "&:hover": {
                color: theme("colors.brand.orange"), // Use brand orange on hover
              },
            },
            // Customize blockquotes
            blockquote: {
              borderLeftColor: theme("colors.brand.blue"),
              borderLeftWidth: "4px",
              paddingLeft: theme("spacing.4"),
              fontStyle: "italic",
              color: theme("colors.muted.foreground"),
              backgroundColor: theme("colors.muted.DEFAULT / 50%"), // Semi-transparent background
              borderRadius: theme("borderRadius.md"),
              paddingTop: theme("spacing.2"),
              paddingBottom: theme("spacing.2"),
              paddingRight: theme("spacing.4"),
              quotes: "none", // Remove default quotes if desired
            },
            "blockquote p:first-of-type::before": { content: "none" }, // Remove default quote marks
            "blockquote p:last-of-type::after": { content: "none" }, // Remove default quote marks
            // Customize headings within prose
            h2: {
              fontFamily: theme("fontFamily.heading").join(", "), // Use Poppins
              fontWeight: theme("fontWeight.bold"),
              letterSpacing: theme("letterSpacing.tight"), // Apply tight tracking
              marginTop: theme("spacing.10"), // Adjust top margin if needed
              marginBottom: theme("spacing.4"), // Adjust bottom margin if needed
            },
            h3: {
              fontFamily: theme("fontFamily.heading").join(", "), // Use Poppins
              fontWeight: theme("fontWeight.semibold"),
              letterSpacing: theme("letterSpacing.tight"), // Apply tight tracking
              marginTop: theme("spacing.8"), // Adjust top margin if needed
              marginBottom: theme("spacing.3"), // Adjust bottom margin if needed
            },
            // Add more customizations here as needed...
            // e.g., p, code blocks
          },
        },
        // You can define customizations for specific prose variants like prose-lg
        // lg: {
        //   css: { ... }
        // },
        // Customize dark mode prose styles
        invert: {
          css: {
            "--tw-prose-links": theme("colors.sky[400]"), // Lighter blue for dark mode links
            a: {
              "&:hover": {
                color: theme("colors.orange[400]"), // Lighter orange for dark mode hover
              },
            },
            // Add other dark mode overrides
            blockquote: {
              borderLeftColor: theme("colors.sky[400]"), // Lighter blue border for dark mode
              color: theme("colors.slate[400]"), // Lighter text for dark mode
              backgroundColor: theme("colors.slate[800] / 50%"), // Darker semi-transparent background
            },
            // Ensure headings inherit tightening in dark mode too (or override if needed)
            // h2: { ... }, // No specific dark mode override needed for tracking
            // h3: { ... }, // No specific dark mode override needed for tracking
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
