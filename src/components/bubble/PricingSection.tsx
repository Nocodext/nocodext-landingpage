import { useEffect, useState } from "react";
import { ArrowRight, Check } from "lucide-react";

const PADDLE_TOKEN = "live_ff2b7db556e904af9910b776705";
const PADDLE_MONTHLY_PRICE_ID = "pri_01kr8tk1n61y1493fmrvnv4pnc";
const PADDLE_ANNUAL_PRICE_ID = "pri_01kr8tnx0wmvw9b7fgmqva9eqy";
const AGENCY_WAITLIST_LINK = "[AGENCY_WAITLIST_LINK]";

declare global {
  interface Window {
    Paddle?: {
      Setup: (opts: { token: string }) => void;
      Checkout: {
        open: (opts: { items: { priceId: string; quantity: number }[] }) => void;
      };
    };
  }
}

const individualFeatures = [
  { title: "Data Browser", desc: "navigate your Bubble schema at a glance" },
  { title: "ERD", desc: "visual map of your data model and relationships" },
  { title: "⌘ Command Palette", desc: "jump anywhere in your app instantly" },
  { title: "API Connector + Postman", desc: "import cURL to build queries faster, test your API calls" },
  { title: "Page elements Revealer", desc: "see all elements on your page preview" },
  { title: "Full Bookmarks", desc: "pages, workflows, elements, datatypes, API endpoints" },
];

const agencyFeatures = [
  "One workspace per client project, automatically",
  "Cross-project Command Palette — jump across all your client apps instantly",
  "Canvas annotations — leave notes directly on the canvas, visible to your whole team",
  "Client-ready ERD export — share your data model as PDF, DBML, or Notion site page",
  "Dependency graph — know what breaks before you change it",
  "Auto-generated documentation — turn your schema into readable client deliverables",
  "Annotation layer on preview — give client feedback without leaving Bubble",
  "App health check — deliver clean, know what you're leaving behind",
];

const faqs = [
  {
    q: "What happens after the trial?",
    a: "Premium features lock. Your data stays intact. Subscribe anytime to get back in.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. From your customer portal, one click. No forms, no questions.",
  },
  {
    q: "Does it work on all Bubble apps?",
    a: "Yes — any app you open in the Bubble editor.",
  },
];

const PricingSection = () => {
  const [annual, setAnnual] = useState(false);

  const price = annual ? "€150" : "€15";
  const period = annual ? "/year" : "/month";
  const link = annual ? PADDLE_ANNUAL_LINK : PADDLE_MONTHLY_LINK;

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nocodext to-nocodext-light bg-clip-text text-transparent">
            Simple, honest pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Try it. If you can't live without it, keep it.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>
            Monthly
          </span>
          <button
            onClick={() => setAnnual(!annual)}
            role="switch"
            aria-checked={annual}
            aria-label="Toggle annual billing"
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-gradient-to-r from-nocodext to-nocodext-light transition-colors"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                annual ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors flex items-center gap-2 ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-nocodext to-nocodext-light text-white">
              2 months free
            </span>
          </span>
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-6 items-center">
          {/* Individual */}
          <div className="w-full max-w-lg relative rounded-2xl p-[2px] bg-gradient-to-br from-nocodext to-nocodext-light shadow-xl shadow-nocodext/10">
            <div className="rounded-2xl bg-card p-8 md:p-10 h-full">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2 text-card-foreground">Individual</h3>
                <p className="text-sm text-muted-foreground">For freelancers and solo Bubble builders.</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-nocodext to-nocodext-light bg-clip-text text-transparent">
                  {price}
                </span>
                <span className="text-muted-foreground">{period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {individualFeatures.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 text-nocodext mt-0.5" />
                    <div>
                      <span className="font-medium text-foreground">{f.title}</span>
                      <span className="text-muted-foreground"> — {f.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>

              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-nocodext to-nocodext-light text-white font-medium transition-opacity hover:opacity-90"
              >
                Start your free trial
              </a>

              <p className="text-xs text-muted-foreground text-center mt-3">
                14 days free. Then €15/month (or €150/year). No surprises.
              </p>
            </div>
          </div>

          {/* Agency */}
          <div className="w-full max-w-3xl relative rounded-2xl border border-border bg-muted/40 p-8 md:p-10">
            <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
              Coming soon
            </span>
            <div className="mb-6 pt-2">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Agency</h3>
              <p className="text-sm text-muted-foreground">For teams building multiple Bubble projects.</p>
            </div>

            <ul className="space-y-2 mb-6">
              {agencyFeatures.map((item, i) => (
                <li key={i} className="flex gap-3 items-start">
                  <ArrowRight className="w-4 h-4 flex-shrink-0 text-muted-foreground/50 mt-1" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-sm text-muted-foreground italic mb-8">
              No pricing yet. Early access for agencies building on Bubble.
            </p>

            <a
              href={AGENCY_WAITLIST_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center px-6 py-3 rounded-lg border border-border bg-background text-foreground font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              Join the waitlist
            </a>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8 text-foreground">Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-border pb-6 last:border-0">
                <h4 className="font-semibold text-foreground mb-2">{faq.q}</h4>
                <p className="text-muted-foreground text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
