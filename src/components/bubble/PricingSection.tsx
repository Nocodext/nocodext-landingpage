import { useEffect, useState } from "react";
import { Check, ArrowRight, ChevronDown, ChevronUp, Sparkles, FlaskConical } from "lucide-react";
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

const individualFeatures: { title: string; desc: string; soon?: boolean; labs?: boolean }[] = [
  { title: "Data Browser", desc: "navigate your Bubble schema at a glance" },
  { title: "ERD", desc: "visual map of your data model and relationships" },
  { title: "⌘ Command Palette + Bookmarks", desc: "jump anywhere — pages, workflows, elements, datatypes, API endpoints" },
  { title: "API Connector + Postman", desc: "import cURL to build queries faster, test your API calls" },
  { title: "Page elements Revealer", desc: "see all elements on your page preview" },
  { title: "Workflow Branches", desc: "visual map of your workflow logic and conditions", soon: true },
  { title: "Option-sets bulk import", desc: "load your option sets from a file, not one by one", labs: true },
  { title: "Fake-but-realistic data generator", desc: "seed your empty app with believable data to design and test faster", labs: true },
];

const agencyFeatures = [
  { title: "One workspace per client project", desc: "automatically, no setup" },
  { title: "Cross-project Command Palette", desc: "jump across all your client apps instantly" },
  { title: "Client-ready ERD export", desc: "share your data model as PDF, DBML, or Notion page" },
  { title: "Dependency graph", desc: "know what breaks before you change it" },
  { title: "Client annotations on live preview", desc: "your client marks up the real app, you fix, no email thread" },
  { title: "Canvas annotations", desc: "leave notes directly on the canvas, visible to your whole team" },
  { title: "Auto-generated documentation", desc: "turn your schema into readable client deliverables" },
  { title: "App health check", desc: "deliver clean, know what you're leaving behind" },
];

const AGENCY_FEATURES_PREVIEW = 5;

const faqs = [
  {
    q: "What happens after the trial?",
    a: "Premium features lock. Your data stays intact. Subscribe anytime to get back in.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Cancel before your next renewal, from your customer portal. One click, no forms, no questions.",
  },
  {
    q: "Does it work on all Bubble apps?",
    a: "Yes — any app you open in the Bubble editor.",
  },
];

const SoonBadge = ({ label = "soon" }: { label?: string }) => (
  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-sm shadow-purple-500/40 animate-pulse rotate-[-2deg]">
    <Sparkles className="w-3 h-3" />
    {label}
  </span>
);

const LabsBadge = () => (
  <span className="inline-flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded border border-dashed border-amber-400/70 text-amber-400 rotate-[2deg] font-mono tracking-tight">
    <FlaskConical className="w-3 h-3" />
    labs
  </span>
);

const inputClass =
  "flex-1 px-4 py-2.5 rounded-lg border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-nocodext/30 disabled:opacity-50";

const PricingSection = () => {
  const [annual, setAnnual] = useState(false);
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
    const hash = window.location.hash;
    if (hash === "#pay") {
      window.Paddle!.Checkout.open({ items: [{ priceId: PADDLE_MONTHLY_PRICE_ID, quantity: 1 }] });
    } else if (hash === "#pay-annual") {
      window.Paddle!.Checkout.open({ items: [{ priceId: PADDLE_ANNUAL_PRICE_ID, quantity: 1 }] });
    }
  }, [paddleReady]);

  const visibleFeatures = featuresExpanded ? agencyFeatures : agencyFeatures.slice(0, AGENCY_FEATURES_PREVIEW);

  return (
    <section id="pricing" className="py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-nocodext to-nocodext-light bg-clip-text text-transparent">
            Simple, honest pricing
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">Try it. If you can't live without it, keep it.</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Individual */}
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-nocodext to-nocodext-light shadow-xl shadow-nocodext/10">
            <div className="rounded-2xl bg-card p-8 h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-1 text-card-foreground">Individual</h3>
                <p className="text-sm text-muted-foreground">For freelancers and solo Bubble builders.</p>
              </div>

              <ul className="space-y-3 mb-6 flex-1">
                {individualFeatures
                  .filter((f) => !f.labs)
                  .map((f) => (
                    <li key={f.title} className="flex gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-nocodext" />
                      <div>
                        <span className="font-medium text-foreground">{f.title}</span>
                        <span className="text-muted-foreground"> — {f.desc}</span>
                        {f.soon && (
                          <span className="ml-2">
                            <SoonBadge />
                          </span>
                        )}
                      </div>
                    </li>
                  ))}

                <li className="pt-1">
                  <div className="flex items-center gap-2 border-t border-orange-400/30 pt-3">
                    <FlaskConical className="w-3.5 h-3.5 text-orange-500" />
                    <span className="text-xs font-bold text-orange-500 uppercase tracking-widest font-mono">Experiments</span>
                    <span className="text-xs text-muted-foreground italic">— no commitment</span>
                  </div>
                </li>

                {individualFeatures
                  .filter((f) => f.labs)
                  .map((f) => (
                    <li key={f.title} className="flex gap-3">
                      <Check className="w-5 h-5 flex-shrink-0 mt-0.5 text-orange-500" />
                      <div>
                        <span className="font-medium text-foreground">{f.title}</span>
                        <span className="text-muted-foreground"> — {f.desc}</span>
                      </div>
                    </li>
                  ))}
              </ul>

              {/* Billing toggle */}
              <div className="flex items-center justify-center gap-3 mb-3">
                <span className={`text-sm font-medium transition-colors ${!annual ? "text-foreground" : "text-muted-foreground"}`}>Monthly</span>
                <button
                  onClick={() => setAnnual(!annual)}
                  role="switch"
                  aria-checked={annual}
                  aria-label="Toggle annual billing"
                  className="relative inline-flex h-6 w-12 items-center rounded-full bg-gradient-to-r from-nocodext to-nocodext-light transition-colors"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform ${annual ? "translate-x-7" : "translate-x-1"}`}
                  />
                </button>
                <span className={`text-sm font-medium transition-colors ${annual ? "text-foreground" : "text-muted-foreground"}`}>Annual</span>
              </div>

              <div className="mb-6 flex items-baseline justify-center gap-3 flex-wrap">
                <span className="text-5xl font-bold bg-gradient-to-r from-nocodext to-nocodext-light bg-clip-text text-transparent">
                  {annual ? "149€" : "15€"}
                </span>
                <span className="text-muted-foreground">{annual ? "/year" : "/month"}</span>
                {annual && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-nocodext to-nocodext-light text-white">
                    2 months free
                  </span>
                )}
              </div>

              <a
                href={annual ? "https://nocodext.com/bubble/#pay-annual" : "https://nocodext.com/bubble/#pay"}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-nocodext-dark to-nocodext-light text-white font-medium transition-opacity hover:opacity-90"
              >
                Start your free trial
              </a>
              <p className="text-xs text-muted-foreground text-center mt-3">14 days free. Then {annual ? "149€/year" : "15€/month"}. No surprises.</p>
            </div>
          </div>

          {/* Agency */}
          <div className="relative rounded-2xl border border-border bg-muted/40 p-8 flex flex-col">
            <span className="absolute top-4 right-4">
              <SoonBadge label="coming soon" />
            </span>
            <div className="mb-6 pt-2">
              <h3 className="text-2xl font-bold mb-2 text-foreground">Agency</h3>
              <p className="text-sm text-muted-foreground">For teams building multiple Bubble projects.</p>
            </div>

            <ul className="space-y-3 flex-1">
              {visibleFeatures.map((f) => (
                <li key={f.title} className="flex gap-3">
                  <Check className="w-5 h-5 flex-shrink-0 text-nocodext mt-0.5" />
                  <div>
                    <span className="font-medium text-foreground">{f.title}</span>
                    <span className="text-muted-foreground"> — {f.desc}</span>
                  </div>
                </li>
              ))}
            </ul>

            {!featuresExpanded ? (
              <button
                type="button"
                onClick={handleSeeMore}
                className="flex items-center gap-1.5 text-sm font-semibold text-nocodext hover:text-nocodext/80 transition-colors mt-4 mb-5"
              >
                <ChevronDown className="w-4 h-4" />
                See {agencyFeatures.length - AGENCY_FEATURES_PREVIEW} more features
              </button>
            ) : (
              <button
                type="button"
                onClick={() => setFeaturesExpanded(false)}
                className="flex items-center gap-1.5 text-sm font-semibold text-nocodext hover:text-nocodext/80 transition-colors mt-4 mb-5"
              >
                <ChevronUp className="w-4 h-4" />
                Show less
              </button>
            )}

            <p className="text-sm text-muted-foreground italic mb-4">No pricing yet. Early access for agencies building on Bubble.</p>

            {agencyDone ? (
              <p className="text-sm text-center text-nocodext font-medium py-3">You're on the list. We'll be in touch.</p>
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
                </div>
                <div className="flex gap-2">
                  <select
                    required
                    value={bubbleProjects}
                    onChange={(e) => setBubbleProjects(e.target.value)}
                    disabled={agencySubmitting}
                    className={inputClass}
                  >
                    <option value="">Active projects...</option>
                    <option value="1-3">1–3 projects</option>
                    <option value="4-10">4–10 projects</option>
                    <option value="10+">10+ projects</option>
                  </select>
                  <button
                    type="submit"
                    disabled={agencySubmitting}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-nocodext-dark to-nocodext-light text-white text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50 shrink-0"
                  >
                    {agencySubmitting ? (
                      "..."
                    ) : (
                      <>
                        Join the waitlist <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
            {agencyError && <p className="text-xs text-red-500 mt-2">{agencyError}</p>}
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
