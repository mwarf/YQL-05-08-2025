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
          DEFAULT: "hsl(var(--primary))",
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
          DEFAULT: "hsl(var(--accent))",
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
        brand: {
          blue: "#0284c7",
          orange: "#f97316",
        },
      },
      borderRadius: {
        lg: "`var(--radius)`",
        md: "`calc(var(--radius) - 2px)`",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["Inter", ...fontFamily.sans],
        heading: ["Poppins", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: 0,
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: 0,
          },
        },
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography:
        '({ theme }) => ({\n        DEFAULT: {\n          css: {\n            "--tw-prose-links": theme("colors.brand.blue"), // Use brand blue for links\n            a: {\n              textDecoration: "none", // Remove underline by default\n              transition: "color 0.2s ease-in-out",\n              "&:hover": {\n                color: theme("colors.brand.orange"), // Use brand orange on hover\n              },\n            },\n            // Customize blockquotes\n            blockquote: {\n              borderLeftColor: theme("colors.brand.blue"),\n              borderLeftWidth: "4px",\n              paddingLeft: theme("spacing.4"),\n              fontStyle: "italic",\n              color: theme("colors.muted.foreground"),\n              backgroundColor: theme("colors.muted.DEFAULT / 50%"), // Semi-transparent background\n              borderRadius: theme("borderRadius.md"),\n              paddingTop: theme("spacing.2"),\n              paddingBottom: theme("spacing.2"),\n              paddingRight: theme("spacing.4"),\n              quotes: "none", // Remove default quotes if desired\n            },\n            "blockquote p:first-of-type::before": { content: "none" }, // Remove default quote marks\n            "blockquote p:last-of-type::after": { content: "none" }, // Remove default quote marks\n            // Customize headings within prose\n            h2: {\n              fontFamily: theme("fontFamily.heading").join(", "), // Use Poppins\n              fontWeight: theme("fontWeight.bold"),\n              letterSpacing: theme("letterSpacing.tight"), // Apply tight tracking\n              marginTop: theme("spacing.10"), // Adjust top margin if needed\n              marginBottom: theme("spacing.4"), // Adjust bottom margin if needed\n            },\n            h3: {\n              fontFamily: theme("fontFamily.heading").join(", "), // Use Poppins\n              fontWeight: theme("fontWeight.semibold"),\n              letterSpacing: theme("letterSpacing.tight"), // Apply tight tracking\n              marginTop: theme("spacing.8"), // Adjust top margin if needed\n              marginBottom: theme("spacing.3"), // Adjust bottom margin if needed\n            },\n            // Add more customizations here as needed...\n            // e.g., p, code blocks\n          },\n        },\n        // You can define customizations for specific prose variants like prose-lg\n        // lg: {\n        //   css: { ... }\n        // },\n        // Customize dark mode prose styles\n        invert: {\n          css: {\n            "--tw-prose-links": theme("colors.sky[400]"), // Lighter blue for dark mode links\n            a: {\n              "&:hover": {\n                color: theme("colors.orange[400]"), // Lighter orange for dark mode hover\n              },\n            },\n            // Add other dark mode overrides\n            blockquote: {\n              borderLeftColor: theme("colors.sky[400]"), // Lighter blue border for dark mode\n              color: theme("colors.slate[400]"), // Lighter text for dark mode\n              backgroundColor: theme("colors.slate[800] / 50%"), // Darker semi-transparent background\n            },\n            // Ensure headings inherit tightening in dark mode too (or override if needed)\n            // h2: { ... }, // No specific dark mode override needed for tracking\n            // h3: { ... }, // No specific dark mode override needed for tracking\n          },\n        },\n      })',
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
