import { useState } from "react";
import { Check } from "lucide-react";

const PADDLE_MONTHLY_LINK = "[PADDLE_MONTHLY_LINK]";
const PADDLE_ANNUAL_LINK = "[PADDLE_ANNUAL_LINK]";

const features = [
  { title: "Data Browser", desc: "navigate your Bubble schema at a glance" },
  { title: "ERD", desc: "visual map of your data model and relationships" },
  { title: "⌘ Command Palette", desc: "jump anywhere in your app instantly" },
  { title: "API Connector + Postman", desc: "import cURL to build queries faster, test your API calls" },
  { title: "Page elements Revealer", desc: "see all elements on your page preview" },
  { title: "Full Bookmarks", desc: "pages, workflows, elements, datatypes, API endpoints" },
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
    <section id="pricing" className="py-20 md:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
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
            className="relative inline-flex h-7 w-14 items-center rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 transition-colors"
          >
            <span
              className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
                annual ? "translate-x-8" : "translate-x-1"
              }`}
            />
          </button>
          <span className={`text-sm font-medium transition-colors flex items-center gap-2 ${annual ? "text-foreground" : "text-muted-foreground"}`}>
            Annual
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white">
              2 months free
            </span>
          </span>
        </div>

        {/* Card */}
        <div className="max-w-md mx-auto">
          <div className="relative rounded-2xl p-[2px] bg-gradient-to-br from-indigo-500 to-violet-500 shadow-xl shadow-indigo-500/10">
            <div className="rounded-2xl bg-white p-8 md:p-10">
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">Premium</h3>
                <p className="text-sm text-muted-foreground">Everything Bubble forgot to build.</p>
              </div>

              <div className="mb-8 flex items-baseline gap-2">
                <span className="text-5xl font-bold bg-gradient-to-r from-indigo-500 to-violet-500 bg-clip-text text-transparent">
                  {price}
                </span>
                <span className="text-muted-foreground">{period}</span>
              </div>

              <ul className="space-y-3 mb-8">
                {features.map((f) => (
                  <li key={f.title} className="flex gap-3">
                    <Check className="w-5 h-5 flex-shrink-0 text-indigo-500 mt-0.5" />
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
                className="block w-full text-center px-6 py-3 rounded-lg bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-medium transition-opacity hover:opacity-90"
              >
                Start your free trial
              </a>

              <p className="text-xs text-muted-foreground text-center mt-3">
                14 days free. Then €15/month (or €150/year). No surprises.
              </p>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-2xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-8">Questions</h3>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <div key={faq.q} className="border-b border-gray-200 pb-6 last:border-0">
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
