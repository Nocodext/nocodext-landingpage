import { useEffect, useState } from "react";
import { Check, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";
import { subscribeToNewsletter } from "@/lib/newsletter";

const PADDLE_TOKEN = "live_ff2b7db556e904af9910b776705";
const PADDLE_MONTHLY_PRICE_ID = "pri_01kr8tk1n61y1493fmrvnv4pnc";
const PADDLE_ANNUAL_PRICE_ID = "pri_01kr8tnx0wmvw9b7fgmqva9eqy";

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
  { title: "Auto workspaces", desc: "one per client project" },
  { title: "Cross-project palette", desc: "jump across all client apps" },
  { title: "ERD export", desc: "PDF, DBML or Notion page" },
  { title: "Dependency graph", desc: "know what breaks" },
  { title: "Client annotations", desc: "markup on live preview" },
  { title: "Canvas notes", desc: "shared with your team" },
  { title: "Auto documentation", desc: "client-ready deliverables" },
  { title: "App health check", desc: "ship clean" },
];

const AGENCY_FEATURES_PREVIEW = 4;

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

const inputClass = "flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-nocodext/30 disabled:opacity-50";

const PricingSection = () => {
  const [paddleReady, setPaddleReady] = useState(false);
  const [agencyEmail, setAgencyEmail] = useState("");
  const [agencyName, setAgencyName] = useState("");
  const [bubbleProjects, setBubbleProjects] = useState("");
  const [agencySubmitting, setAgencySubmitting] = useState(false);
  const [agencyDone, setAgencyDone] = useState(false);
  const [agencyError, setAgencyError] = useState<string | null>(null);
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [sawFullFeatures, setSawFullFeatures] = useState(false);

  const handleSeeMore = () => {
    setFeaturesExpanded(true);
    setSawFullFeatures(true);
  };

  const handleAgencyWaitlist = async (e: React.FormEvent) => {
    e.preventDefault();
    setAgencySubmitting(true);
    setAgencyError(null);
    const result = await subscribeToNewsletter({
      email: agencyEmail,
      product: "bubble_for_agencies",
      agencyName,
      bubbleProjects,
      sawFullFeatures,
    });
    setAgencySubmitting(false);
    if (result.success) {
      setAgencyDone(true);
    } else {
      setAgencyError(result.error ?? "Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    if (document.getElementById("paddle-js")) {
      window.Paddle?.Setup({ token: PADDLE_TOKEN });
      setPaddleReady(true);
      return;
    }
    const script = document.createElement("script");
    script.id = "paddle-js";
    script.src = "https://cdn.paddle.com/paddle/v2/paddle.js";
    script.async = true;
    script.onload = () => {
      window.Paddle?.Setup({ token: PADDLE_TOKEN });
      setPaddleReady(true);
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!paddleReady) return;
    if (window.location.hash === "#pay") {
      window.Paddle!.Checkout.open({ items: [{ priceId: PADDLE_MONTHLY_PRICE_ID, quantity: 1 }] });
    }
  }, [paddleReady]);

  const openCheckout = (priceId: string) => {
    if (!window.Paddle) return;
    window.Paddle.Checkout.open({ items: [{ priceId, quantity: 1 }] });
  };

  const visibleFeatures = featuresExpanded ? agencyFeatures : agencyFeatures.slice(0, AGENCY_FEATURES_PREVIEW);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nocodext to-nocodext-light bg-clip-text text-transparent">
            Simple, honest pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Try it. If you can't live without it, keep it.
          </p>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-6 items-stretch">

          {/* Individual */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-nocodext to-nocodext-light shadow-xl shadow-nocodext/10">
            <div className="rounded-2xl bg-card p-8 h-full flex flex-col">
              <div className="mb-4">
                <h3 className="text-2xl font-bold mb-1 text-card-foreground">Individual</h3>
                <p className="text-sm text-muted-foreground">For freelancers and solo Bubble builders.</p>
              </div>

              <ul className="space-y-3 mb-8 flex-1">
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

              {/* Annual CTA — highlighted */}
              <div className="mb-3">
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-4xl font-bold bg-gradient-to-r from-nocodext to-nocodext-light bg-clip-text text-transparent">€150</span>
                  <span className="text-muted-foreground text-sm">/year</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-nocodext to-nocodext-light text-white ml-1">2 months free</span>
                </div>
                <button
                  type="button"
                  onClick={() => openCheckout(PADDLE_ANNUAL_PRICE_ID)}
                  className="block w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-nocodext to-nocodext-light text-white font-medium transition-opacity hover:opacity-90"
                >
                  Start your free trial — Annual
                </button>
              </div>

              {/* Monthly CTA — secondary */}
              <div>
                <div className="flex items-baseline gap-2 mb-2">
                  <span className="text-2xl font-semibold text-muted-foreground">€15</span>
                  <span className="text-muted-foreground text-sm">/month</span>
                </div>
                <button
                  type="button"
                  onClick={() => openCheckout(PADDLE_MONTHLY_PRICE_ID)}
                  className="block w-full text-center px-6 py-2.5 rounded-lg border border-border text-foreground text-sm font-medium transition-colors hover:bg-accent"
                >
                  Start your free trial — Monthly
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center mt-3">
                14 days free. No surprises.
              </p>
            </div>
          </div>

          {/* Agency */}
          <div className="relative rounded-2xl border border-border bg-muted/40 p-8 flex flex-col">
            <span className="absolute top-4 right-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
              Coming soon
            </span>
            <div className="mb-6 pt-2">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Agency</h3>
              <p className="text-sm text-muted-foreground">For teams building multiple Bubble projects.</p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 mb-2">
              {visibleFeatures.map((f) => (
                <li key={f.title} className="flex gap-2 items-start">
                  <Check className="w-4 h-4 flex-shrink-0 text-nocodext mt-0.5" />
                  <div className="text-sm leading-snug">
                    <span className="font-medium text-foreground">{f.title}</span>
                    <span className="text-muted-foreground"> — {f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            {!featuresExpanded && (
              <button
                type="button"
                onClick={handleSeeMore}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5 mt-1"
              >
                <ChevronDown className="w-3.5 h-3.5" />
                See {agencyFeatures.length - AGENCY_FEATURES_PREVIEW} more features
              </button>
            )}
            {featuresExpanded && (
              <button
                type="button"
                onClick={() => setFeaturesExpanded(false)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors mb-5 mt-1"
              >
                <ChevronUp className="w-3.5 h-3.5" />
                Show less
              </button>
            )}

            <p className="text-sm text-muted-foreground italic mb-4 mt-auto pt-6">
              No pricing yet. Early access for agencies building on Bubble.
            </p>

            {agencyDone ? (
              <p className="text-sm text-center text-nocodext font-medium py-3">
                You're on the list. We'll be in touch.
              </p>
            ) : (
              <form onSubmit={handleAgencyWaitlist} className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="Agency name"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    disabled={agencySubmitting}
                    className={inputClass}
                  />
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={agencyEmail}
                    onChange={(e) => setAgencyEmail(e.target.value)}
                    disabled={agencySubmitting}
                    className={inputClass}
                  />
                  <select
                    required
                    value={bubbleProjects}
                    onChange={(e) => setBubbleProjects(e.target.value)}
                    disabled={agencySubmitting}
                    className={inputClass}
                  >
                    <option value="">Active Bubble projects...</option>
                    <option value="1-3">1–3 projects</option>
                    <option value="4-10">4–10 projects</option>
                    <option value="10+">10+ projects</option>
                  </select>
                </div>
                <button
                  type="submit"
                  disabled={agencySubmitting}
                  className="w-1/2 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-nocodext to-nocodext-light text-white text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {agencySubmitting ? "..." : <>Join the waitlist <ArrowRight className="w-4 h-4" /></>}
                </button>
              </form>
            )}
            {agencyError && (
              <p className="text-xs text-red-500 mt-2">{agencyError}</p>
            )}
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
