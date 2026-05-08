import fs from "fs";
import path from "path";

const SITE_URL = "https://nocodext-landingpage.lovable.app";
const DEFAULT_IMAGE = `${SITE_URL}/favicon.ico`;
const DIST_DIR = path.resolve(process.cwd(), "dist");

// Per-route SEO config
const seoConfig = {
  "/": {
    title: "Nocodext for Bubble - Chrome Extension to optimize your productivity",
    description:
      "Supercharge your Bubble.io editor with Nocodext. Reveal hidden elements, navigate APIs, and streamline your no-code workflow.",
  },
  "/bubble": {
    title: "Nocodext for Bubble - Chrome Extension to optimize your productivity",
    description:
      "Supercharge your Bubble.io editor with Nocodext. Reveal hidden elements, navigate APIs, and streamline your no-code workflow.",
  },
  "/pinnpm": {
    title: "PinNpm - Find, Trust & Organize Open-Source Packages",
    description:
      "PinNpm helps developers discover, evaluate, and organize NPM packages with confidence. Action-oriented tools for open-source discovery.",
  },
  "/watools": {
    title: "Watools - WhatsApp Automation & Productivity Tools",
    description:
      "Boost your WhatsApp productivity with Watools. Automate messages, organize contacts, and streamline your communication workflow.",
  },
  "/airtable": {
    title: "Nocodext for Airtable - Browser Extensions",
    description:
      "Enhance your Airtable experience with powerful browser extensions. Bookmark, colorize, and navigate your bases effortlessly.",
  },
  "/linkedin": {
    title: "LinkedIn Widgets by Nocodext - Missing Features",
    description:
      "Augment LinkedIn with missing widgets that will never be in their official roadmap. Get people badges, push to CRM, and more.",
  },
  "/unstream": {
    title: "Unstream.fm - 100% Local Audio Conversion",
    description:
      "Convert audio files locally with Unstream.fm. 100% offline, privacy-first audio format converter. No cloud, no data sent anywhere.",
  },
  "/pinnpm/newsletter-confirmed": {
    title: "Newsletter Confirmed - PinNpm",
    description: "Your PinNpm newsletter subscription has been confirmed.",
    noindex: true,
  },
  "/bubble/newsletter-confirmed": {
    title: "Newsletter Confirmed - Bubble by Nocodext",
    description: "Your Bubble extension newsletter subscription has been confirmed.",
    noindex: true,
  },
};

// JSON-LD per route
const jsonLdConfig = {
  "/": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nocodext for Bubble",
    description:
      "Chrome extension to supercharge your Bubble.io editor. Reveal hidden elements, navigate APIs, and streamline your no-code workflow.",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome OS, Windows, macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  "/bubble": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nocodext for Bubble",
    description:
      "Chrome extension to supercharge your Bubble.io editor.",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome OS, Windows, macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  "/pinnpm": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "PinNpm",
    description:
      "Find, trust and organize open-source NPM packages with confidence.",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome OS, Windows, macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  "/watools": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Watools",
    description: "WhatsApp automation and productivity tools.",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome OS, Windows, macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  "/airtable": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nocodext for Airtable",
    description: "Browser extensions to enhance your Airtable experience.",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome OS, Windows, macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  "/linkedin": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LinkedIn Widgets by Nocodext",
    description: "Augment LinkedIn with missing widgets and CRM integrations.",
    applicationCategory: "BrowserApplication",
    operatingSystem: "Chrome OS, Windows, macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
  "/unstream": {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Unstream.fm",
    description: "100% local, privacy-first audio format converter. No cloud.",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Windows, macOS, Linux",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  },
};

const routes = Object.keys(seoConfig);

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function buildMetaBlock(route, cfg) {
  const canonical = `${SITE_URL}${route === "/" ? "" : route}`;
  const title = escapeHtml(cfg.title);
  const desc = escapeHtml(cfg.description);
  const img = escapeHtml(DEFAULT_IMAGE);
  const ld = jsonLdConfig[route];
  const ldScript = ld
    ? `<script type="application/ld+json">${JSON.stringify(ld)}</script>`
    : "";

  return `<!-- SEO -->
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${canonical}" />
    <meta property="og:image" content="${img}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${title}" />
    <meta name="twitter:description" content="${desc}" />
    <meta name="twitter:image" content="${img}" />
    ${cfg.noindex ? '<meta name="robots" content="noindex, nofollow" />' : ""}
    ${ldScript}
  `;
}

function injectIntoHtml(html, metaBlock) {
  // Remove existing <title> and conflicting meta tags
  let out = html
    .replace(/<title>[\s\S]*?<\/title>/i, "")
    .replace(/<meta\s+name="description"[^>]*>/gi, "")
    .replace(/<link\s+rel="canonical"[^>]*>/gi, "")
    .replace(/<meta\s+property="og:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+name="twitter:[^"]+"[^>]*>/gi, "")
    .replace(/<meta\s+name="robots"[^>]*>/gi, "");
  return out.replace("</head>", `${metaBlock}</head>`);
}

function generatePerRouteHtml() {
  const indexPath = path.join(DIST_DIR, "index.html");
  if (!fs.existsSync(indexPath)) {
    console.error("dist/index.html not found — skipping SEO generation");
    return;
  }
  const baseHtml = fs.readFileSync(indexPath, "utf-8");

  for (const route of routes) {
    const cfg = seoConfig[route];
    const meta = buildMetaBlock(route, cfg);
    const html = injectIntoHtml(baseHtml, meta);

    if (route === "/") {
      fs.writeFileSync(indexPath, html, "utf-8");
    } else {
      const dir = path.join(DIST_DIR, route);
      fs.mkdirSync(dir, { recursive: true });
      fs.writeFileSync(path.join(dir, "index.html"), html, "utf-8");
    }
    console.log(`Generated ${route}`);
  }
}

function generateSitemap() {
  const urls = routes
    .filter((r) => !seoConfig[r].noindex)
    .map((r) => {
      const loc = `${SITE_URL}${r === "/" ? "" : r}`;
      return `  <url>\n    <loc>${loc}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>${r === "/" ? "1.0" : "0.8"}</priority>\n  </url>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
  fs.writeFileSync(path.join(DIST_DIR, "sitemap.xml"), xml, "utf-8");
  console.log("Generated sitemap.xml");
}

function generateRobots() {
  const content = `User-agent: *
Allow: /
Disallow: /bubble-invite
Disallow: /reset-password

Sitemap: ${SITE_URL}/sitemap.xml
`;
  fs.writeFileSync(path.join(DIST_DIR, "robots.txt"), content, "utf-8");
  console.log("Generated robots.txt");
}

function generate404() {
  // Cloudflare Pages serves /404.html on unmatched paths.
  // Copying index.html lets React Router handle SPA routes (e.g. /bubble-invite).
  const indexPath = path.join(DIST_DIR, "index.html");
  if (fs.existsSync(indexPath)) {
    fs.copyFileSync(indexPath, path.join(DIST_DIR, "404.html"));
    console.log("Generated 404.html (SPA fallback)");
  }
}

generatePerRouteHtml();
generateSitemap();
generateRobots();
generate404();
