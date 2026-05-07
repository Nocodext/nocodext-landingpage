import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const prerender = require("vite-plugin-prerender");

const SITE_URL = "https://nocodext-landingpage.lovable.app";
const DEFAULT_IMAGE = "https://nocodext-landingpage.lovable.app/favicon.ico";

const seoConfig: Record<string, { title: string; description: string; noindex?: boolean }> = {
  "/": {
    title: "Nocodext for Bubble - Chrome Extension to optimize your productivity",
    description: "Supercharge your Bubble.io editor with Nocodext. Reveal hidden elements, navigate APIs, and streamline your no-code workflow.",
  },
  "/bubble": {
    title: "Nocodext for Bubble - Chrome Extension to optimize your productivity",
    description: "Supercharge your Bubble.io editor with Nocodext. Reveal hidden elements, navigate APIs, and streamline your no-code workflow.",
  },
  "/pinnpm": {
    title: "PinNpm - Find, Trust & Organize Open-Source Packages",
    description: "PinNpm helps developers discover, evaluate, and organize NPM packages with confidence. Action-oriented tools for open-source discovery.",
  },
  "/watools": {
    title: "Watools - WhatsApp Automation & Productivity Tools",
    description: "Boost your WhatsApp productivity with Watools. Automate messages, organize contacts, and streamline your communication workflow.",
  },
  "/airtable": {
    title: "Nocodext for Airtable - Browser Extensions",
    description: "Enhance your Airtable experience with powerful browser extensions. Bookmark, colorize, and navigate your bases effortlessly.",
  },
  "/linkedin": {
    title: "LinkedIn Widgets by Nocodext - Missing Features",
    description: "Augment LinkedIn with missing widgets that will never be in their official roadmap. Get people badges, push to CRM, and more.",
  },
  "/unstream": {
    title: "Unstream.fm - 100% Local Audio Conversion",
    description: "Convert audio files locally with Unstream.fm. 100% offline, privacy-first audio format converter. No cloud, no data sent anywhere.",
  },
  "/newsletter-confirmation": {
    title: "Newsletter Confirmed - PinNpm",
    description: "Your PinNpm newsletter subscription has been confirmed. Stay tuned for updates.",
  },
  "/bubble/newsletter-confirmed": {
    title: "Newsletter Confirmed - Bubble by Nocodext",
    description: "Your Bubble extension newsletter subscription has been confirmed.",
  },
};

const injectMetaTags = (route: string, html: string): string => {
  const config = seoConfig[route];
  if (!config) return html;

  const canonical = `${SITE_URL}${route}`;
  const metaTags = `
    <title>${config.title}</title>
    <meta name="description" content="${config.description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${config.title}" />
    <meta property="og:description" content="${config.description}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${DEFAULT_IMAGE}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${config.title}" />
    <meta name="twitter:description" content="${config.description}" />
    <meta name="twitter:image" content="${DEFAULT_IMAGE}" />
    ${config.noindex ? '<meta name="robots" content="noindex, nofollow" />' : ''}
  `;

  return html.replace("</head>", `${metaTags}</head>`);
};

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === "production" &&
      prerender({
        staticDir: path.join(__dirname, "dist"),
        routes: [
          "/",
          "/bubble",
          "/pinnpm",
          "/watools",
          "/airtable",
          "/linkedin",
          "/unstream",
          "/newsletter-confirmation",
          "/bubble/newsletter-confirmed",
        ],
        renderer: new prerender.PuppeteerRenderer({
          renderAfterTime: 15000,
        }),
        postProcess: (renderedRoute: any) => {
          renderedRoute.html = injectMetaTags(
            renderedRoute.originalRoute,
            renderedRoute.html
          );
          return renderedRoute;
        },
      }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
