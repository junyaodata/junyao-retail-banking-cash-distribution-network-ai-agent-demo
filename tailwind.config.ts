import type { Config } from "tailwindcss"

// This app is light-only: there is no theme toggle, so no `darkMode` strategy
// and no `dark:` variants anywhere in the tree.
//
// Tonality -- "Night Ops Console". This product's whole premise is that the
// number a bank reports about its own ATM network and the number that is
// actually true are two different numbers, and the gap between them only
// shows up if someone is watching closely. That is a monitoring-desk job, not
// a storefront, so the app reads like the screen a distribution-operations
// analyst would actually have open at 2am: an ink-navy surface instead of a
// bright page, teal for "this is the system, this is normal," and signal
// amber held in reserve for the one number in a room that is not what it
// claims to be. Numbers get tabular figures throughout because the product is
// built on comparing two of them side by side.
const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      /* The palette. Components name these instead of repeating a hex or a raw
       * Tailwind step, so a rebrand is this block and nothing else.
       *
       * Only the colours a rebrand actually changes live here. The neutral
       * scale stays as Tailwind's own `slate-*`: it is a vocabulary every React
       * developer already reads, and it survives a rebrand unchanged.
       *
       * Every value below is the exact hex of the Tailwind step it replaced, so
       * introducing these names changed no pixel. */
      colors: {
        /** Bright ink. Wordmark's steady half, headings, primary text on the
         *  dark surface -- this app has no separate "dark mode primary". */
        primary: {
          DEFAULT: "#E7ECF5",
          foreground: "#0B1220",
        },
        /** The action colour: links, the send button, focus rings, hover edges.
         *  Teal reads as "the system, working normally" -- a NOC's steady-state
         *  green cousin, chosen over green because green is already spoken for
         *  as the data-viz "good" status colour and must not be diluted. */
        brand: {
          DEFAULT: "#2DD4BF",
          dark: "#14B8A6", // hover / active on a filled teal surface
          light: "#5EEAD4", // focus rings, hover borders on dark surfaces
          soft: "#99F6E4", // faint tints, subtle fills
          foreground: "#0B1220",
        },
        /** Signal amber. The one colour reserved for "this is not what it
         *  claims to be": wordmark's second half, the true-vs-reported gap,
         *  active nav, rules. Spent sparingly on purpose. */
        accent: {
          DEFAULT: "#F5A623",
          foreground: "#0B1220",
        },
        /** Page and card backgrounds -- an ink navy, not a tinted grey, so it
         *  reads as a console surface rather than "dark mode of a white page". */
        background: "#0B1220",
        foreground: "#E7ECF5",
        surface: "#111A2E",
        border: "#1E293B",
        muted: {
          DEFAULT: "#16213A",
          foreground: "#8B93A7",
        },

        // shadcn/ui primitives. Kept whole because `components/ui/*` and any
        // component added with the shadcn CLI expect these exact names.
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        // IBM Plex Sans: designed for enterprise systems software, which is
        // the register this app wants -- engineered and precise rather than
        // a marketing-site geometric sans.
        display: ["var(--font-plex-sans)", "sans-serif"],
        heading: ["var(--font-plex-sans)", "sans-serif"],
        // Inter carries body copy: deliberately distinct from the display
        // face rather than two weights of the same one.
        body: ["var(--font-inter)", "sans-serif"],
        inter: ["var(--font-inter)", "sans-serif"],
        // Numeric readouts only -- the reported/true figures, table and chart
        // values -- never prose or UI chrome labels.
        mono: ["var(--font-plex-mono)", "monospace"],
      },
      /* Radius is a size ladder, and each step names a role:
       *
       *   rounded-full   pill        nav CTA, tech-stack tags
       *   rounded-2xl    panel       home CTA, agent welcome card, the modal
       *   rounded-xl     card        capability card, kickstart button, bubbles
       *   rounded-lg     block       code block, table, chart, avatars, buttons
       *   rounded-md/sm  inline      chart tooltip, legend swatches
       *
       * Nothing is extended here: these are Tailwind's own steps. There used to
       * be a shadcn override (`lg: var(--radius)` and two more derived from it)
       * which lifted `lg` from 8px to 12px -- the same value Tailwind already
       * gives `xl`. Two class names for one value is why the ladder read as
       * arbitrary in the components: half of the tree could pick either and
       * still look right. It also coupled our own scale to a variable set for
       * shadcn, so changing `--radius` would have split the design silently.
       * Nothing needed it: every shadcn `rounded-md` in `components/ui/*` is
       * overridden at its call site.
       */
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
