import fs from "fs";
import path from "path";

const SITE_URL = "https://nocodext-landingpage.lovable.app";
const DIST_DIR = path.resolve(process.cwd(), "dist");

const routes = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/bubble", priority: "1.0", changefreq: "weekly" },
  { path: "/pinnpm", priority: "0.9", changefreq: "weekly" },
  { path: "/watools", priority: "0.9", changefreq: "weekly" },
  { path: "/airtable", priority: "0.9", changefreq: "weekly" },
  { path: "/linkedin", priority: "0.9", changefreq: "weekly" },
  { path: "/unstream", priority: "0.9", changefreq: "weekly" },
  { path: "/newsletter-confirmation", priority: "0.3", changefreq: "monthly" },
  { path: "/bubble/newsletter-confirmed", priority: "0.3", changefreq: "monthly" },
];

function generateSitemap() {
  const urls = routes
    .map(
      (route) => `  <url>
    <loc>${SITE_URL}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`
    )
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

function injectJsonLd() {
  const jsonLdConfig = {
    "/": {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Nocodext for Bubble",
      description: "Chrome extension to supercharge your Bubble.io editor. Reveal hidden elements, navigate APIs, and streamline your no-code workflow.",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome OS, Windows, macOS, Linux",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        ratingCount: "1",
      },
    },
    "/bubble": {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Nocodext for Bubble",
      description: "Chrome extension to supercharge your Bubble.io editor. Reveal hidden elements, navigate APIs, and streamline your no-code workflow.",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome OS, Windows, macOS, Linux",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    "/pinnpm": {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "PinNpm",
      description: "Find, trust and organize open-source NPM packages with confidence.",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome OS, Windows, macOS, Linux",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    "/watools": {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Watools",
      description: "WhatsApp automation and productivity tools.",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome OS, Windows, macOS, Linux",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    "/airtable": {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Nocodext for Airtable",
      description: "Browser extensions to enhance your Airtable experience.",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome OS, Windows, macOS, Linux",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    "/linkedin": {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "LinkedIn Widgets by Nocodext",
      description: "Augment LinkedIn with missing widgets and CRM integrations.",
      applicationCategory: "BrowserApplication",
      operatingSystem: "Chrome OS, Windows, macOS, Linux",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
    "/unstream": {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Unstream.fm",
      description: "100% local, privacy-first audio format converter. No cloud.",
      applicationCategory: "MultimediaApplication",
      operatingSystem: "Windows, macOS, Linux",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  };

  for (const [route, data] of Object.entries(jsonLdConfig)) {
    const dirPath = path.join(DIST_DIR, route === "/" ? "" : route);
    const filePath = path.join(dirPath, "index.html");

    if (!fs.existsSync(filePath)) continue;

    let html = fs.readFileSync(filePath, "utf-8");
    const scriptTag = `<script type="application/ld+json">${JSON.stringify(data)}</script>`;

    // Inject before closing </body>
    if (!html.includes("application/ld+json")) {
      html = html.replace("</body>", `${scriptTag}</body>`);
      fs.writeFileSync(filePath, html, "utf-8");
      console.log(`Injected JSON-LD into ${route}`);
    }
  }
}

function main() {
  generateSitemap();
  generateRobots();
  injectJsonLd();
}

main();
