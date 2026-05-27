import { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Eye, GitBranch, Activity, CheckCircle2, AlertCircle, GitMerge, Braces } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { subscribeToNewsletter } from "@/lib/newsletter";

const REALITY_ROWS = [
  { field: "password_hash",      bubble: "Not accessible", reality: "Exposed in payload" },
  { field: "bank_iban",          bubble: "Private",        reality: "Present in API response" },
  { field: "salary",             bubble: "Role: HR only",  reality: "Loaded in repeating group" },
  { field: "health_condition",   bubble: "Admin only",     reality: "Returned for all roles" },
  { field: "stripe_customer_id", bubble: "Hidden",         reality: "Sent to all sessions" },
  { field: "date_of_birth",      bubble: "Restricted",     reality: "Accessible via relation" },
  { field: "admin_token",        bubble: "Private",        reality: "In every page load" },
  { field: "internal_notes",     bubble: "Admin only",     reality: "Returned for all roles" },
];

type Severity = "critical" | "high" | "medium";
const TAB_MEMBERS = [
  { initials: "SC", name: "Sarah Chen",   bg: "bg-purple-100",  fg: "text-purple-600"  },
  { initials: "MD", name: "Marc Dubois",  bg: "bg-emerald-100", fg: "text-emerald-600" },
  { initials: "JM", name: "Julie Martin", bg: "bg-orange-100",  fg: "text-orange-600"  },
  { initials: "AT", name: "Alex Torres",  bg: "bg-blue-100",    fg: "text-blue-600"    },
  { initials: "NK", name: "Nina Kovač",   bg: "bg-pink-100",    fg: "text-pink-600"    },
];
const FAKE_VALUES: Record<string, string> = {
  password_hash:      '"$2b$10$xK9mNp..."',
  bank_iban:          '"DE89370400440532013000"',
  salary:             "87500",
  health_condition:   '"type_2_diabetes"',
  stripe_customer_id: '"cus_Nx4kP9mQ2..."',
  date_of_birth:      '"1988-03-14"',
  admin_token:        '"eyJhbGci.e30..."',
  internal_notes:     '"Performance review pending"',
  salary_gross:       "87500",
  salary_net:         "68420",
  social_security_nr: '"1 88 03 75 108 023 47"',
  tax_rate:           "0.245",
  bonus_amount:       "4200",
  tax_id:             '"FR76401080100001"',
  contract_pdf_url:   '"https://s3.../ctr_2024.pdf"',
  diagnosis_code:     '"E11.9"',
  disability_status:  '"partial_50pct"',
  medication:         '"metformin 500mg"',
  treatment_notes:    '"Follow-up Q3 2026"',
  insurance_id:       '"AXA-2024-00847261"',
};

const TAB_DATA: Record<string, {
  label: string;
  monitor: string;
  clientFields: string[];
  columns: string[];
  rows: string[][];
  leaked: { field: string; severity: Severity }[];
}> = {
  team: {
    label: "Team",
    monitor: "User · Get Team Members",
    clientFields: ["bank_iban"],
    columns: ["Name", "Email", "Department", "Role", "Status"],
    rows: [
      ["Sarah Chen",   "s.chen@co.io",   "Engineering", "Senior Dev",   "Active"],
      ["Marc Dubois",  "m.dubois@co.io", "Finance",     "CFO",          "Active"],
      ["Julie Martin", "j.martin@co.io", "HR",          "HR Manager",   "On leave"],
      ["Alex Torres",  "a.torres@co.io", "Sales",       "Account Exec", "Active"],
      ["Nina Kovač",   "n.kovac@co.io",  "Engineering", "Lead Dev",     "Active"],
    ],
    leaked: [
      { field: "password_hash",      severity: "critical" },
      { field: "bank_iban",          severity: "critical" },
      { field: "salary",             severity: "high"     },
      { field: "health_condition",   severity: "high"     },
      { field: "stripe_customer_id", severity: "high"     },
      { field: "date_of_birth",      severity: "medium"   },
      { field: "admin_token",        severity: "critical" },
      { field: "internal_notes",     severity: "medium"   },
    ],
  },
  payroll: {
    label: "Payroll",
    monitor: "PayrollEntry · Get Payroll",
    clientFields: ["bank_iban", "tax_id"],
    columns: ["Name", "Period", "Contract", "Hours", "Status"],
    rows: [
      ["Sarah Chen",   "Apr 2026", "Full-time",  "160h", "Processed"],
      ["Marc Dubois",  "Apr 2026", "Full-time",  "160h", "Processed"],
      ["Julie Martin", "Apr 2026", "Full-time",  "80h",  "Pending"],
      ["Alex Torres",  "Apr 2026", "Commission", "—",    "Processed"],
      ["Nina Kovač",   "Apr 2026", "Full-time",  "160h", "Processed"],
    ],
    leaked: [
      { field: "salary_gross",       severity: "critical" },
      { field: "salary_net",         severity: "critical" },
      { field: "bank_iban",          severity: "critical" },
      { field: "social_security_nr", severity: "critical" },
      { field: "tax_rate",           severity: "high"     },
      { field: "bonus_amount",       severity: "high"     },
      { field: "tax_id",             severity: "high"     },
      { field: "contract_pdf_url",   severity: "medium"   },
    ],
  },
  medical: {
    label: "Medical",
    monitor: "User · Get Medical Records",
    clientFields: [],
    columns: ["Name", "Coverage", "Provider", "Renewal", "Status"],
    rows: [
      ["Sarah Chen",   "Full",  "AXA Health", "Jan 2027", "Active"],
      ["Marc Dubois",  "Full",  "AXA Health", "Mar 2027", "Active"],
      ["Julie Martin", "Basic", "Allianz",    "Jun 2026", "Active"],
      ["Alex Torres",  "Full",  "AXA Health", "Sep 2026", "Active"],
      ["Nina Kovač",   "Basic", "Allianz",    "Feb 2027", "Active"],
    ],
    leaked: [
      { field: "health_condition",  severity: "critical" },
      { field: "diagnosis_code",    severity: "critical" },
      { field: "disability_status", severity: "critical" },
      { field: "medication",        severity: "critical" },
      { field: "treatment_notes",   severity: "high"     },
      { field: "insurance_id",      severity: "high"     },
      { field: "date_of_birth",     severity: "medium"   },
    ],
  },
};

const WaitlistForm = ({ id, buttonLabel = "Notify me" }: { id: string; buttonLabel?: string }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<{ type: "success" | "error"; msg: string }>({
    type: "success",
    msg: "",
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) {
      setModal({ type: "error", msg: "Enter a valid email address." });
      setOpen(true);
      return;
    }
    setLoading(true);
    try {
      const res = await subscribeToNewsletter({ email, product: "bubble_reality_checker" });
      if (!res.success) throw new Error(res.error || "Failed");
      setModal({
        type: "success",
        msg: "You're on the list. We'll email you when Reality Checker ships.",
      });
      setOpen(true);
      setEmail("");
    } catch (err) {
      setModal({ type: "error", msg: "Something went wrong. Try again later." });
      setOpen(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form id={id} onSubmit={submit} className="flex flex-col sm:flex-row gap-3 w-full max-w-xl">
        <Input
          type="email"
          placeholder="you@company.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="flex-1 h-12 bg-white/5 border-white/10 text-white placeholder:text-white/40 focus-visible:ring-violet-500/60 shadow-none"
        />
        <Button
          type="submit"
          disabled={loading}
          className="h-12 px-6 bg-violet-600 hover:bg-violet-500 text-white font-medium shadow-[0_0_30px_-8px_rgba(139,92,246,0.6)]"
        >
          {loading ? "Sending..." : buttonLabel}
        </Button>
      </form>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {modal.type === "success" ? (
                <><CheckCircle2 className="h-5 w-5 text-green-600" /> You're on the list</>
              ) : (
                <><AlertCircle className="h-5 w-5 text-red-600" /> Error</>
              )}
            </DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground py-2">{modal.msg}</p>
          <div className="flex justify-end">
            <Button onClick={() => setOpen(false)}>OK</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const drw = {
  meta:    "text-[8.5px] font-mono text-white/45",
  header:  "text-[8.5px] font-mono text-white/45 uppercase tracking-wider",
  field:   "font-mono text-[10px] text-white/85",
  bright:  "font-mono text-[10px] text-white",
  label:   "text-[8px] font-mono text-white/60 uppercase tracking-wider",
} as const;

const BubbleRealityChecker = () => {
  const [highlight, setHighlight] = useState(false);
  const [activeTab, setActiveTab] = useState<keyof typeof TAB_DATA>("team");
  const [tabInteracted, setTabInteracted] = useState(false);
  const [selectedDatatype, setSelectedDatatype] = useState<"user" | "client">("user");
  const [gotoArrow, setGotoArrow] = useState(false);
  const [gotoY, setGotoY] = useState<number>(0);
  const browserContentRef = useRef<HTMLDivElement>(null);

  const handleGoto = (e: React.MouseEvent<HTMLDivElement>) => {
    const row = e.currentTarget;
    const container = browserContentRef.current;
    if (container) {
      const rowRect = row.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();
      setGotoY(rowRect.top - containerRect.top + rowRect.height / 2);
    }
    setSelectedDatatype("client");
    setGotoArrow(true);
    setTimeout(() => setGotoArrow(false), 1400);
  };

  const handleTabChange = (key: keyof typeof TAB_DATA) => {
    setActiveTab(key);
    setTabInteracted(true);
  };

  useEffect(() => { setSelectedDatatype("user"); }, [activeTab]);
  useEffect(() => {
    const t = setTimeout(() => setHighlight(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white font-sans antialiased relative overflow-hidden">
      <Helmet>
        <title>Reality Checker — See what Bubble really sends | Nocodext</title>
        <meta
          name="description"
          content="A runtime privacy layer for Bubble apps. See exactly what fields your app delivers to the browser — not what Bubble says it does."
        />
      </Helmet>

      {/* Ambient violet glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full bg-violet-600/10 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-600/10 blur-3xl" />

      {/* HERO */}
      <section className="relative max-w-5xl mx-auto px-6 pt-36 md:pt-44 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-mono text-violet-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          In development — join the waitlist
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
          See what Bubble <span className="text-violet-400">really</span> sends<br />
          to the browser.
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          You write your rules with best effort.<br />
          Bubble looks away and lets your app leak.<br />
          <span className="text-white">Reality Checker won't.</span>
        </p>

        <div className="flex justify-center">
          <WaitlistForm id="hero-form" />
        </div>
        <p className="mt-4 text-xs text-white/40 font-mono">
          No admin access required. Works directly in your browser.
        </p>
      </section>

      {/* PROBLEM */}
      <section className="relative max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16">
          The gap no one talks about
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            {
              icon: Eye,
              title: "Hidden ≠ Protected",
              body: "You hide a field in the UI. Bubble still sends it in the JSON payload. It's in memory. It's readable.",
            },
            {
              icon: ShieldAlert,
              title: "Written ≠ Working",
              body: 'Your privacy rule says "Admin only." One nullable condition, one concurrent rule — and Everyone can query it. Bubble won\'t warn you.',
            },
            {
              icon: GitBranch,
              title: "Dev ≠ Live",
              body: "3 fields exposed in production that aren't in your dev environment. You'd never know without looking.",
            },
            {
              icon: GitMerge,
              title: "Path ≠ Permission",
              body: "You restricted bank_iban on User. But bank_iban lives on Client. Bubble applies rules per type — not per expression path. You locked the wrong type, and Bubble won't tell you.",
            },
          ].map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-white/[0.02] p-6 hover:border-violet-500/30 transition-colors"
            >
              <Icon className="h-5 w-5 text-violet-400 mb-4" strokeWidth={1.5} />
              <h3 className="font-semibold text-white mb-2">{title}</h3>
              <p className="text-sm text-white/60 leading-relaxed">{body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BROWSER MOCKUP */}
      <section className="relative max-w-7xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            Reality Checker in action
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm">
            Docked to your browser while you build — monitoring what the API actually delivers, in real time.
          </p>
        </div>

        {/* Single browser window */}
        <div className="rounded-xl overflow-hidden border border-white/10 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.8)]">

          {/* Chrome toolbar — unique */}
          <div className="bg-[#dee1e6] px-3 py-1.5 flex items-center gap-2 border-b border-black/10 shrink-0">
            <div className="flex gap-1.5 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex items-end ml-1 gap-0.5 text-[9px]">
              <div className="px-3 py-1 bg-white/40 text-black/30 rounded-t-md border-t border-x border-black/5">My App — Home</div>
              <div className="px-3 py-1 bg-white/50 text-black/40 rounded-t-md border-t border-x border-black/5">Dashboard — Editor</div>
              <div className="px-3 py-1 bg-white text-black/60 rounded-t-md border-t border-x border-black/5 font-medium shadow-sm">Dashboard — version-test</div>
            </div>
            <div className="flex-1 bg-white/60 rounded-full px-3 py-0.5 text-[9px] text-black/25 font-mono truncate border border-black/5 ml-1">
              my-saas-app.bubbleapps.io/version-test/dashboard
            </div>
          </div>

          {/* Browser content: light bg hosting the two cards */}
          <div ref={browserContentRef} className="bg-[#e8e8ea] p-3 flex gap-0 h-[520px] relative">
            <style>{`
              @keyframes rtl-travel {
                0%   { transform: translateY(-50%) translateX(0);      opacity: 0; }
                10%  { opacity: 1; }
                68%  { opacity: 1; }
                88%  { opacity: 0.5; }
                100% { transform: translateY(-50%) translateX(-560px); opacity: 0; }
              }
              @keyframes rtl-chevron {
                0%,100% { opacity: 0.3; } 50% { opacity: 1; }
              }
              .drw-scroll::-webkit-scrollbar { width: 4px; }
              .drw-scroll::-webkit-scrollbar-track { background: #000; border-radius: 2px; }
              .drw-scroll::-webkit-scrollbar-thumb { background: #4ade80; border-radius: 2px; }
              @keyframes red-warning-glow {
                0%, 100% { box-shadow: 0 0 18px -4px rgba(239,68,68,0.2), 0 0 0 1px rgba(239,68,68,0.12); }
                50%       { box-shadow: 0 0 40px -2px rgba(239,68,68,0.55), 0 0 0 1px rgba(239,68,68,0.4); }
              }
              .rc-warning-panel { animation: red-warning-glow 2.2s ease-in-out infinite; }
              @keyframes dash-march {
                to { stroke-dashoffset: -22; }
              }
              .ldr-path { animation: dash-march 1.8s linear infinite; }
            `}</style>
            {gotoArrow && (
              <div
                className="absolute pointer-events-none z-30 flex items-center gap-1"
                style={{ top: gotoY, right: 296, animation: "rtl-travel 1.8s cubic-bezier(0.4,0,0.2,1) forwards" }}
              >
                {[0, 1, 2].map((i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 14 14" fill="none"
                    style={{ animation: `rtl-chevron 0.6s ease-in-out ${i * 100}ms infinite` }}>
                    <path d="M9 2L4 7L9 12" stroke="rgba(139,92,246,0.95)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ))}
              </div>
            )}

            {/* LEFT CARD — Bubble Privacy Rules (fidèle au screenshot) */}
            <div className="flex-[2] rounded-l-lg border border-black/10 overflow-hidden flex flex-col min-w-0 bg-white shadow-sm">

              {/* Bubble top bar */}
              <div className="bg-white border-b border-gray-200 px-2 py-1 flex items-center gap-2 shrink-0">
                <div className="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center shrink-0">
                  <span className="text-[9px] font-bold text-gray-600">b</span>
                </div>
                <span className="text-[8px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">Web ∨</span>
                <span className="text-[8px] text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">index ∨</span>
                <div className="flex-1" />
                <span className="text-[7px] text-orange-500 border border-orange-200 bg-orange-50 rounded px-1.5 py-0.5">⚠ 72 issues</span>
                <div className="px-2 py-0.5 bg-[#1994ec] text-white text-[8px] font-medium rounded flex items-center gap-1">▶ Deploy</div>
              </div>

              {/* Left icon rail + main content */}
              <div className="flex flex-1 overflow-hidden">
                {/* Icon rail */}
                <div className="w-7 bg-white border-r border-gray-100 flex flex-col items-center pt-2 gap-2 shrink-0">
                  {["✏️","🔗","⊞","◉","{}","☆","⚙","📊","▦"].map((ic, i) => (
                    <div key={i} className={`w-5 h-5 flex items-center justify-center text-[9px] rounded ${i === 3 ? "bg-blue-50 text-blue-500" : "text-gray-300"}`}>{ic}</div>
                  ))}
                </div>

                {/* Main area */}
                <div className="flex flex-col flex-1 overflow-hidden">
                  {/* Sub-tabs: Data types / Privacy / App data / Option sets / File manager */}
                  <div className="flex border-b border-gray-200 text-[8px] shrink-0 bg-white">
                    {["Data types","Privacy","App data","Option sets","File manager"].map((tab) => (
                      <div key={tab} className={`px-2.5 py-1.5 cursor-pointer whitespace-nowrap ${tab === "Privacy" ? "text-[#1994ec] border-b-2 border-[#1994ec] font-medium" : "text-gray-400"}`}>{tab}</div>
                    ))}
                  </div>

                  {/* Privacy content */}
                  <div className="flex flex-1 overflow-hidden">
                    {/* Left: data types list */}
                    <div className="w-36 border-r border-gray-200 flex flex-col overflow-hidden shrink-0">
                      <div className="px-2 py-1.5 border-b border-gray-100 text-[8.5px] font-medium text-gray-600">Privacy</div>
                      <div className="px-2 py-1 border-b border-gray-100 shrink-0">
                        <div className="border border-gray-200 rounded px-1.5 py-0.5 text-[7.5px] text-gray-300">Data types</div>
                      </div>
                      <div className="flex-1 overflow-hidden text-[9px]">
                        {[
                          { name: "Client",   label: "Publicly visible" },
                          { name: "Contract", label: "Privacy rules applied" },
                          { name: "Invoice",  label: "Privacy rules applied" },
                          { name: "Project",  label: "Privacy rules applied" },
                          { name: "User",     label: "Privacy rules applied" },
                        ].map(({ name, label }) => {
                          const isClient = name === "Client" && selectedDatatype === "client";
                          const isUser   = name === "User"   && selectedDatatype === "user";
                          return (
                            <div key={name} className={`relative flex items-center gap-1 px-2 py-1 border-b border-gray-50 transition-colors duration-300 ${isClient ? "bg-orange-50" : isUser ? "bg-blue-50" : ""}`}>
                              {isClient && <span className="absolute left-0.5 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-orange-400 animate-ping" />}
                              <span className={`pl-1 shrink-0 ${isClient ? "text-orange-600 font-medium" : isUser ? "text-[#1994ec] font-medium" : "text-gray-600"}`}>{name}</span>
                              <span className={`text-[7.5px] truncate min-w-0 ${isClient ? "text-orange-400" : isUser ? "text-[#1994ec]" : name === "Client" ? "text-orange-400" : "text-gray-300"}`}>{label}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Right: Privacy rules panel — reactive */}
                    <div className="flex-1 overflow-hidden flex flex-col bg-[#fafafa] transition-all duration-300">
                      {selectedDatatype === "user" ? (
                        <>
                          <div className="px-3 py-1.5 border-b border-gray-100 text-[11px] text-gray-500 shrink-0">Privacy rules for type <strong>User</strong></div>
                          <div className="flex-1 overflow-hidden p-2 space-y-2">
                            <div className="bg-white border border-gray-200 rounded">
                              <div className="flex items-center justify-between px-2 py-1 border-b border-gray-100">
                                <span className="text-[11px] font-medium text-gray-500">Name</span>
                                <span className="text-[11px] text-gray-600">User's own data</span>
                              </div>
                              <div className="flex items-center gap-1 px-2 py-1 border-b border-gray-100">
                                <span className="text-[11px] text-gray-500">When</span>
                                <span className="text-[11px] text-[#1994ec] font-medium">This User is Current User</span>
                              </div>
                              <div className="px-2 py-1">
                                <div className="grid grid-cols-3 text-[10px] text-gray-400 mb-1 border-b border-gray-100 pb-0.5">
                                  <div>Field</div><div className="text-center">View ✓</div><div className="text-center">Auto-bind</div>
                                </div>
                                {["email","salary","bank_iban","phone","last name"].map((f) => (
                                  <div key={f} className="grid grid-cols-3 text-[10px] py-0.5">
                                    <div className="text-gray-600">{f}</div>
                                    <div className="flex justify-center"><div className="w-3 h-3 border border-[#1994ec] rounded-sm bg-[#1994ec]/10 flex items-center justify-center"><span className="text-[7px] text-[#1994ec]">✓</span></div></div>
                                    <div className="flex justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm" /></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div className="bg-white border border-gray-200 rounded">
                              <div className="px-2 py-1 border-b border-gray-100">
                                <span className="text-[11px] text-gray-500">Everyone else <span className="text-gray-400">(default)</span></span>
                              </div>
                              <div className="px-2 py-1">
                                <div className="grid grid-cols-3 text-[10px] text-gray-400 mb-1 border-b border-gray-100 pb-0.5">
                                  <div>Field</div><div className="text-center">View 0</div><div className="text-center">Auto-bind</div>
                                </div>
                                {["email","salary","bank_iban","phone","last name"].map((f) => (
                                  <div key={f} className="grid grid-cols-3 text-[10px] py-0.5">
                                    <div className="text-gray-600">{f}</div>
                                    <div className="flex justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm" /></div>
                                    <div className="flex justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm" /></div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="px-3 py-1.5 border-b border-orange-100 bg-orange-50/60 text-[11px] text-orange-700 shrink-0 flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-400 shrink-0" />
                            Privacy rules for type <strong>Client</strong>
                          </div>
                          <div className="flex-1 overflow-hidden p-2 space-y-2">
                            <div className="bg-orange-50 border border-orange-200 rounded px-2 py-1.5">
                              <p className="text-[11px] text-orange-700 font-medium">No rules configured</p>
                              <p className="text-[9.5px] text-orange-500 mt-0.5">This type is publicly visible. All fields are accessible by default.</p>
                            </div>
                            <div className="bg-white border border-gray-200 rounded">
                              <div className="px-2 py-1 border-b border-gray-100">
                                <span className="text-[11px] text-gray-500">Everyone else <span className="text-orange-400 font-medium">(all fields open)</span></span>
                              </div>
                              <div className="px-2 py-1">
                                <div className="grid grid-cols-3 text-[10px] text-gray-400 mb-1 border-b border-gray-100 pb-0.5">
                                  <div>Field</div><div className="text-center">View ✓</div><div className="text-center">Auto-bind</div>
                                </div>
                                {["name","bank_iban","tax_id","contract_pdf","address"].map((f) => {
                                  const sensitive = ["bank_iban","tax_id","contract_pdf"].includes(f);
                                  return (
                                    <div key={f} className="grid grid-cols-3 text-[10px] py-0.5">
                                      <div className={sensitive ? "text-orange-600 font-medium" : "text-gray-600"}>{f}</div>
                                      <div className="flex justify-center"><div className={`w-3 h-3 border rounded-sm flex items-center justify-center ${sensitive ? "border-orange-400 bg-orange-50" : "border-[#1994ec] bg-[#1994ec]/10"}`}><span className={`text-[7px] ${sensitive ? "text-orange-500" : "text-[#1994ec]"}`}>✓</span></div></div>
                                      <div className="flex justify-center"><div className="w-3 h-3 border border-gray-200 rounded-sm" /></div>
                                    </div>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* SEPARATOR — resizable handle */}
            <div className="w-4 flex flex-col items-center justify-center shrink-0 relative cursor-col-resize">
              <div className="absolute inset-y-0 left-1/2 w-px bg-black/10" />
              <div className="relative z-10 w-4 h-10 bg-white border border-black/10 rounded-full flex flex-col items-center justify-center gap-0.5 shadow-sm">
                <div className="w-px h-3 bg-black/20 rounded-full" />
                <div className="w-px h-3 bg-black/20 rounded-full" />
              </div>
            </div>

            {/* RIGHT CARD — version-test + floating RC drawer */}
            <div className="flex-[3] rounded-r-lg border border-white/10 overflow-hidden relative min-w-0 bg-[#f8f9fa]">
              {/* App content — fake-realistic Bubble HR dashboard */}
              <div className="absolute inset-0 overflow-hidden flex flex-col">

                {/* App navbar */}
                <div className="bg-white border-b border-gray-200 px-3 py-1.5 flex items-center gap-2 shrink-0">
                  <div className="w-5 h-5 rounded bg-indigo-600 flex items-center justify-center shrink-0">
                    <span className="text-[7px] font-bold text-white">H</span>
                  </div>
                  <span className="text-[8px] font-semibold text-gray-700">HireDesk</span>
                  <div className="ml-auto w-5 h-5 rounded-full bg-indigo-100 flex items-center justify-center shrink-0">
                    <span className="text-[7px] font-semibold text-indigo-600">A</span>
                  </div>
                </div>

                {/* Sub-tabs */}
                <div className="flex border-b border-gray-200 bg-white shrink-0 px-2 pt-5 gap-1">
                  {(Object.keys(TAB_DATA) as (keyof typeof TAB_DATA)[]).map((key) => {
                    const isActive = activeTab === key;
                    const showHint = !tabInteracted && !isActive;
                    return (
                      <button
                        key={key}
                        onClick={() => handleTabChange(key)}
                        className={`relative cursor-pointer px-3 py-1 text-[9px] font-medium rounded-t transition-all border-b-2 ${
                          isActive
                            ? "text-indigo-600 border-indigo-600 bg-white"
                            : "text-gray-500 border-transparent hover:text-gray-700"
                        }`}
                      >
                        {showHint && (
                          <span className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 animate-bounce">
                            <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
                              <path d="M1.5 1.5L6.5 7L11.5 1.5" stroke="rgba(99,102,246,0.9)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <svg width="13" height="9" viewBox="0 0 13 9" fill="none">
                              <path d="M1.5 1.5L6.5 7L11.5 1.5" stroke="rgba(99,102,246,0.45)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </span>
                        )}
                        {TAB_DATA[key].label}
                      </button>
                    );
                  })}
                </div>

                {/* Table */}
                <div className="flex-1 overflow-hidden pr-[292px]">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200">
                        {TAB_DATA[activeTab].columns.map((col) => (
                          <th key={col} className="px-2 py-1.5 text-left text-[9px] font-semibold text-gray-400 uppercase tracking-wide whitespace-nowrap">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TAB_DATA[activeTab].rows.map((cells, ri) => {
                        const m = TAB_MEMBERS[ri];
                        return (
                          <tr key={ri} className="border-b border-gray-100 hover:bg-white/70 transition-colors">
                            <td className="px-2 py-2">
                              <div className="flex items-center gap-1.5">
                                <div className={`w-6 h-6 rounded-full ${m.bg} flex items-center justify-center shrink-0`}>
                                  <span className={`text-[8px] font-semibold ${m.fg}`}>{m.initials}</span>
                                </div>
                                <span className="text-[11px] text-gray-700 font-medium whitespace-nowrap">{cells[0]}</span>
                              </div>
                            </td>
                            {cells.slice(1).map((cell, ci) => (
                              <td key={ci} className="px-2 py-2 text-[10px] text-gray-500 whitespace-nowrap">{cell}</td>
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Reality Checker drawer — flush right edge */}
              <div className="absolute top-5 right-0 bottom-3 w-72 bg-[#0c0c18] rounded-tl-xl border-l border-t border-b border-violet-500/40 shadow-[0_8px_40px_rgba(0,0,0,0.6)] flex flex-col overflow-visible">
                {/* BrandingBadge */}
                <div style={{
                  position: "absolute",
                  top: -12,
                  left: "50%",
                  transform: "translateX(-50%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "white",
                  border: "1px solid rgba(99,102,241,0.28)",
                  borderRadius: 4,
                  padding: "3px 8px",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.10)",
                  zIndex: 10,
                  whiteSpace: "nowrap",
                }}>
                  <img src="/nocodext-logo-small.png" alt="nocodext" style={{ height: 10, width: "auto", display: "block" }} />
                </div>

                {/* Drawer header */}
                <div className="px-3 pt-4 pb-2 border-b border-white/5 shrink-0 overflow-hidden rounded-tl-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-white/80 font-mono">Reality Checker</span>
                    <div className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                      <span className="text-[9px] text-green-400 font-mono">Live</span>
                    </div>
                  </div>
                  <div className={`${drw.meta} mt-0.5 truncate`}>Monitoring · {TAB_DATA[activeTab].monitor}</div>
                </div>

                {/* Column headers */}
                <div className={`grid grid-cols-2 px-3 py-1.5 border-b border-white/5 ${drw.header} shrink-0`}>
                  <div>Field</div>
                  <div>Status</div>
                </div>

                {/* Rows */}
                <div className="flex-1 overflow-hidden">
                  {TAB_DATA[activeTab].leaked.map((row, i) => {
                    const isClientField = TAB_DATA[activeTab].clientFields.includes(row.field);
                    const severityColor = row.severity === "critical"
                      ? "text-red-300 bg-red-500/10 border-red-500/20"
                      : row.severity === "high"
                      ? "text-orange-300 bg-orange-500/10 border-orange-500/20"
                      : "text-yellow-300 bg-yellow-500/10 border-yellow-500/20";
                    const dotColor = row.severity === "critical" ? "bg-red-400" : row.severity === "high" ? "bg-orange-400" : "bg-yellow-400";
                    return (
                      <div
                        key={`${activeTab}-${row.field}`}
                        onClick={isClientField ? handleGoto : undefined}
                        className={`flex items-center px-3 py-1.5 border-b border-white/[0.04] transition-all duration-500 ${isClientField ? "cursor-pointer hover:bg-violet-500/10 bg-violet-500/5" : ""} ${highlight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}`}
                        style={{ transitionDelay: `${i * 120 + 300}ms` }}
                      >
                        <div className={`${isClientField ? drw.bright : drw.field} truncate flex-1 pr-1`}>{row.field}</div>
                        <div className={`shrink-0 transition-all duration-300 ${highlight ? "opacity-100" : "opacity-0"}`} style={{ transitionDelay: `${i * 120 + 420}ms` }}>
                          {isClientField ? (
                            <span className="inline-flex items-center gap-0.5 text-[9px] text-violet-400 font-mono whitespace-nowrap">
                              goto Privacy rule
                            </span>
                          ) : (
                            <span className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[8.5px] border whitespace-nowrap ${severityColor}`}>
                              <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor}`} />
                              Exposed
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* JSON payload excerpt */}
                <div className="mx-2 mb-1.5 rounded-lg bg-black/50 border border-white/[0.07] overflow-hidden shrink-0">
                  <div className="px-2 py-1 border-b border-white/[0.06] flex items-center gap-1.5">
                    <Braces className="w-3 h-3 text-violet-400 shrink-0" strokeWidth={2} />
                    <span className={drw.label}>Payload excerpt</span>
                  </div>
                  <div className="drw-scroll px-2 py-1.5 font-mono text-[8.5px] leading-relaxed max-h-24 overflow-y-auto overflow-x-hidden">
                    <div className="text-white/50 whitespace-nowrap">{"{"}</div>
                    {TAB_DATA[activeTab].leaked.map(({ field }, i, arr) => (
                      <div key={field} className="pl-2 whitespace-nowrap">
                        <span className="text-red-300">"{field}"</span>
                        <span className="text-white/50">: </span>
                        <span className="text-yellow-200">{FAKE_VALUES[field] ?? '"..."'}{i < arr.length - 1 ? "," : ""}</span>
                      </div>
                    ))}
                    <div className="text-white/50 whitespace-nowrap">{"}"}</div>
                  </div>
                </div>

                {/* Footer */}
                <div className="px-3 py-2 border-t border-white/5 flex items-center justify-between shrink-0">
                  <span className={drw.meta}>{TAB_DATA[activeTab].leaked.length} fields flagged</span>
                  <span className="text-[9px] text-red-400 font-mono font-medium">⚠ Review</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* RELATIONAL PATH MOCKUP */}
      <section className="relative max-w-5xl mx-auto px-6 py-20 border-t border-white/5">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-3">
            The chain you didn't see coming
          </h2>
          <p className="text-white/50 max-w-xl mx-auto text-sm">
            You locked <span className="text-white/70">User</span>. But <span className="text-white/70">bank_iban</span> lives on <span className="text-white/70">Client</span>. Bubble applies rules per type — the rule you wrote never covered the type that matters.
          </p>
        </div>

        <div className="relative grid md:grid-cols-2 gap-6 items-start">

          {/* LEFT — Bubble Property Editor mockup */}
          <div className="rounded-xl overflow-hidden" style={{ background: "#F2F7FF", padding: "24px 20px", fontFamily: "Inter, system-ui, sans-serif" }}>
          <div className="rounded-xl overflow-hidden shadow-xl" style={{ background: "#f3f4f6", border: "1px solid #d1d5db" }}>
            {/* Title bar */}
            <div style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb", padding: "7px 10px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                <div style={{ width: 18, height: 18, background: "#4f46e5", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontSize: 10, fontWeight: 700, lineHeight: 1 }}>T</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 600, color: "#111827" }}>Text — IBAN display</span>
                <span style={{ fontSize: 7.5, background: "#ede9fe", color: "#7c3aed", borderRadius: 3, padding: "1px 5px", fontWeight: 700, letterSpacing: "0.03em" }}>BETA</span>
              </div>
              <span style={{ color: "#9ca3af", fontSize: 16, lineHeight: 1, cursor: "pointer" }}>···</span>
            </div>

            {/* Tab bar */}
            <div style={{ background: "#ffffff", borderBottom: "1px solid #e5e7eb", display: "flex" }}>
              {[
                { label: "Visual", active: true },
                { label: "Interaction", active: false },
                { label: "Conditional", active: false, badge: 1 },
              ].map(({ label, active, badge }) => (
                <div key={label} style={{
                  padding: "6px 12px",
                  fontSize: 10,
                  fontWeight: active ? 600 : 400,
                  color: active ? "#2563eb" : "#6b7280",
                  borderBottom: active ? "2px solid #2563eb" : "2px solid transparent",
                  cursor: "pointer",
                  display: "flex", alignItems: "center", gap: 4,
                }}>
                  {label}
                  {badge != null && <span style={{ background: "#dbeafe", color: "#1d4ed8", borderRadius: 8, padding: "0 4px", fontSize: 7, fontWeight: 700 }}>{badge}</span>}
                </div>
              ))}
            </div>

            {/* Content section */}
            <div style={{ borderBottom: "1px solid #e5e7eb" }}>
              <div style={{ padding: "5px 10px", display: "flex", alignItems: "center", gap: 5, background: "#f9fafb", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ color: "#6b7280", fontSize: 8 }}>▼</span>
                <span style={{ fontSize: 8.5, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>Content</span>
              </div>

              <div style={{ padding: "8px 10px 10px" }}>
                <div style={{ fontSize: 9, color: "#6b7280", marginBottom: 5, fontWeight: 500 }}>Text</div>

                {/* .text-composer mockup */}
                <div style={{
                  background: "#ffffff",
                  border: "1.5px solid #2563eb",
                  borderRadius: 5,
                  padding: "8px 10px",
                  minHeight: 58,
                  display: "flex",
                  flexWrap: "wrap",
                  alignItems: "flex-start",
                  gap: 3,
                  boxShadow: "0 0 0 3px rgba(37,99,235,0.08)",
                }}>
                  {[
                    { label: "Current User",    bg: "#dbeafe", text: "#1e40af", border: "#93c5fd" },
                    { label: "'s Project",      bg: "#ede9fe", text: "#5b21b6", border: "#c4b5fd" },
                    { label: "'s Client",       bg: "#f0fdf4", text: "#166534", border: "#86efac" },
                    { label: "'s company_name", bg: "#f0fdf4", text: "#166534", border: "#86efac" },
                  ].map(({ label, bg, text, border }, i) => (
                    <span key={i} style={{
                      display: "inline-flex", alignItems: "center",
                      background: bg, color: text, border: `1px solid ${border}`,
                      borderRadius: 4, padding: "2px 7px",
                      fontSize: 10, fontWeight: 500, whiteSpace: "nowrap",
                      lineHeight: 1.5,
                    }}>
                      {label}
                    </span>
                  ))}
                </div>

                <div style={{ marginTop: 4, fontSize: 8, color: "#9ca3af", display: "flex", alignItems: "center", gap: 3 }}>
                  <span style={{ fontWeight: 600 }}>Aa</span>
                  <span>Insert dynamic data</span>
                </div>
              </div>
            </div>

            {/* Configure section */}
            <div style={{ borderBottom: "1px solid #e5e7eb", pointerEvents: "none", userSelect: "none" }}>
              <div style={{ padding: "5px 10px", display: "flex", alignItems: "center", gap: 5, background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ color: "#9ca3af", fontSize: 8 }}>▼</span>
                <span style={{ fontSize: 8.5, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>Configure</span>
              </div>
              <div style={{ padding: "6px 10px", background: "#fff", display: "flex", flexDirection: "column", gap: 6 }}>
                {/* Multiline row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 9.5, color: "#6b7280" }}>Multiline</span>
                  <div style={{ width: 28, height: 15, background: "#e5e7eb", borderRadius: 8, position: "relative" }}>
                    <div style={{ width: 11, height: 11, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: 2, boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                  </div>
                </div>
                {/* Max length row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                  <span style={{ fontSize: 9.5, color: "#6b7280", whiteSpace: "nowrap" }}>Max characters</span>
                  <div style={{ flex: 1, height: 22, background: "#f9fafb", border: "1px solid #e5e7eb", borderRadius: 4 }} />
                </div>
                {/* Truncate row */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 9.5, color: "#6b7280" }}>Truncate text</span>
                  <div style={{ width: 28, height: 15, background: "#e5e7eb", borderRadius: 8, position: "relative" }}>
                    <div style={{ width: 11, height: 11, background: "#fff", borderRadius: "50%", position: "absolute", top: 2, left: 2, boxShadow: "0 1px 2px rgba(0,0,0,0.15)" }} />
                  </div>
                </div>
              </div>
            </div>

            {/* Size section */}
            <div style={{ borderBottom: "1px solid #e5e7eb", pointerEvents: "none", userSelect: "none" }}>
              <div style={{ padding: "5px 10px", display: "flex", alignItems: "center", gap: 5, background: "#f3f4f6", borderBottom: "1px solid #e5e7eb" }}>
                <span style={{ color: "#9ca3af", fontSize: 8 }}>▼</span>
                <span style={{ fontSize: 8.5, fontWeight: 700, color: "#374151", textTransform: "uppercase", letterSpacing: "0.06em" }}>Size</span>
              </div>
              <div style={{ padding: "6px 10px", background: "#fff", display: "flex", flexDirection: "column", gap: 6 }}>
                {/* Width row */}
                {[{ label: "Width" }, { label: "Height" }].map(({ label }) => (
                  <div key={label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
                    <span style={{ fontSize: 9.5, color: "#6b7280", width: 36 }}>{label}</span>
                    <div style={{ display: "flex", flex: 1, border: "1px solid #e5e7eb", borderRadius: 5, overflow: "hidden" }}>
                      {["Fixed", "Fit", "Fill"].map((opt, i) => (
                        <div key={opt} style={{
                          flex: 1, textAlign: "center", fontSize: 8.5, padding: "3px 0",
                          background: opt === "Fit" ? "#eff6ff" : "#fff",
                          color: opt === "Fit" ? "#2563eb" : "#9ca3af",
                          fontWeight: opt === "Fit" ? 600 : 400,
                          borderRight: i < 2 ? "1px solid #e5e7eb" : "none",
                        }}>{opt}</div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Caption */}
            <div style={{ padding: "6px 10px", background: "#f9fafb", borderTop: "1px solid #e5e7eb" }}>
              <span style={{ fontSize: 8, color: "#9ca3af" }}>
                Bubble property editor · <span style={{ color: "#d97706", fontWeight: 600 }}>3 undeclared types in chain</span>
              </span>
            </div>
          </div>
          </div>

          {/* RIGHT — What RC sees in the payload */}
          <div className="rc-warning-panel rounded-xl border border-red-500/40 bg-[#16162a] overflow-hidden">
            {/* RC header */}
            <div className="px-4 py-2.5 border-b border-white/8 flex items-center justify-between" style={{ background: "#1c1c35" }}>
              <div className="flex items-center gap-2">
                <img src="/nocodext-logo-small.png" alt="nocodext" style={{ height: 12, width: "auto" }} />
                <span className="text-[10px] font-mono font-semibold text-white/80">Reality Checker</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                <span className="text-[8px] text-green-400 font-mono">Live</span>
              </div>
            </div>

            <div className="p-5 space-y-4">
              <div className="text-[10px] text-white/35 font-mono">API response intercepted · /api/1.1/wf/load-project</div>

              {/* What was requested */}
              <div>
                <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider mb-2">Requested field</div>
                <div className="flex items-center justify-between gap-2 px-3 py-2 rounded bg-green-500/5 border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-white/30">Client →</span>
                    <span className="text-[13px] font-mono font-semibold text-green-300">company_name</span>
                  </div>
                  <span className="text-[9px] font-mono text-green-400/80 px-2 py-0.5 rounded border border-green-500/20 bg-green-500/10 whitespace-nowrap">✓ as expected</span>
                </div>
              </div>

              {/* Silent leak alert */}
              <div className="flex items-start gap-3 px-3 py-3 rounded-lg bg-red-500/10 border border-red-500/25">
                <span className="text-red-400 text-[14px] shrink-0 mt-0.5">⚠</span>
                <div>
                  <div className="text-[11px] font-mono text-red-300 font-semibold leading-snug">Client object loaded in full</div>
                  <div className="text-[9.5px] font-mono text-white/40 mt-1">No privacy rule on this type — full object exposed</div>
                </div>
              </div>

              {/* Silently exposed fields */}
              <div>
                <div className="text-[9px] text-white/40 font-mono uppercase tracking-wider mb-2">Silently in payload</div>
                <div className="space-y-1.5">
                  {/* bank_iban — hero row */}
                  <div className="flex items-center justify-between gap-2 px-3 py-3 rounded-lg bg-red-500/12 border border-red-500/35 shadow-[0_0_20px_-4px_rgba(239,68,68,0.35)]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="text-[10px] font-mono text-white/35 shrink-0">Client →</span>
                      <span className="text-[15px] font-mono font-bold text-red-200 tracking-tight">bank_iban</span>
                    </div>
                    <span className="text-[9px] font-mono text-red-300 bg-red-500/15 border border-red-500/35 px-2 py-0.5 rounded whitespace-nowrap shrink-0 font-semibold">● Critical</span>
                  </div>
                  {/* other fields */}
                  {[
                    { field: "tax_id",       severity: "high"   },
                    { field: "contract_pdf", severity: "medium" },
                    { field: "health_id",    severity: "high"   },
                  ].map(({ field, severity }) => (
                    <div key={field} className="flex items-center justify-between gap-2 px-3 py-2 rounded bg-white/[0.04] border border-white/8">
                      <div className="flex items-center gap-2 min-w-0">
                        <span className="text-[10px] font-mono text-white/25 shrink-0">Client →</span>
                        <span className="text-[12px] font-mono text-white/60 truncate">{field}</span>
                      </div>
                      <span className={`text-[9px] font-mono px-2 py-0.5 rounded border whitespace-nowrap shrink-0 ${
                        severity === "high"   ? "text-orange-300 bg-orange-500/10 border-orange-500/20" :
                                               "text-yellow-300 bg-yellow-500/10 border-yellow-500/20"
                      }`}>
                        {severity === "high" ? "● High" : "● Medium"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-white/8 flex items-center justify-between">
                <span className="text-[9.5px] text-white/25 font-mono">Client · 4 unintended fields</span>
                <span className="text-[9.5px] text-violet-400 font-mono font-medium">→ add rule on Client</span>
              </div>
            </div>
          </div>

          {/* Leader line — RC warning → bottom of 's Client chip (big curve below)
               max-w-5xl layout: ~976px total, cols ~476px each, gap 24px
               Start : left edge of RC warning block ≈ (512, 185)
               End   : bottom of 's Client chip       ≈ (245, 163)
               Curve : dips to y≈330 for a wide U-arc */}
          <svg
            className="absolute inset-0 w-full pointer-events-none overflow-visible hidden md:block"
            style={{ zIndex: 20, height: "120%" }}
            aria-hidden="true"
          >
            {/* Dot at source (RC panel) */}
            <circle cx="512" cy="185" r="4" fill="rgba(239,68,68,0.75)" />
            {/* Dashed animated body — stops exactly at arrowhead base (y=181) */}
            <path
              className="ldr-path"
              d="M 512 185 L 512 218 Q 512 232 497 232 L 235 232 Q 220 232 220 218 L 220 181"
              fill="none"
              stroke="rgba(239,68,68,0.7)"
              strokeWidth="4"
              strokeDasharray="14 8"
              strokeLinecap="butt"
            />
            {/* Arrowhead as standalone polygon — tip at y=168, base at y=183 */}
            <polygon
              points="220,168 210,184 230,184"
              fill="rgba(239,68,68,0.85)"
            />
          </svg>

        </div>
      </section>

      {/* DEMO TABLE */}
      <section className="relative max-w-5xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-12">
          Reality vs. what Bubble tells you
        </h2>

        <div className="rounded-xl border border-white/10 bg-black/40 overflow-hidden font-mono text-sm shadow-2xl">
          <div className="grid grid-cols-3 px-5 py-3 border-b border-white/10 bg-white/[0.03] text-white/40 text-xs uppercase tracking-wider">
            <div>Field</div>
            <div>Bubble thinks</div>
            <div>Reality</div>
          </div>
          {REALITY_ROWS.map((row, i) => (
            <div
              key={row.field}
              className={`grid grid-cols-3 px-5 py-4 border-b border-white/5 last:border-0 transition-colors duration-700 ${
                highlight ? "bg-red-500/[0.04]" : ""
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div className="text-white/80">{row.field}</div>
              <div className="text-white/40">{row.bubble}</div>
              <div className="flex items-center">
                <span
                  className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-red-300 bg-red-500/10 border border-red-500/20 transition-all duration-700 ${
                    highlight ? "opacity-100" : "opacity-0"
                  }`}
                  style={{ transitionDelay: `${i * 120 + 200}ms` }}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                  {row.reality}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-white/50 mt-8 italic">
          These aren't edge cases. They're the default.
        </p>
      </section>

      {/* HOW IT WORKS */}
      <section className="relative max-w-5xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16">
          A runtime layer, not a config checker
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-7">
            <div className="text-xs font-mono text-white/40 uppercase tracking-wider mb-4">
              Others check your config
            </div>
            <ul className="space-y-3 text-white/60">
              <li className="flex gap-3"><span className="text-white/30">—</span> Reads your declared privacy rules</li>
              <li className="flex gap-3"><span className="text-white/30">—</span> Scans your data type setup</li>
              <li className="flex gap-3"><span className="text-white/30">—</span> Assumes rules work as intended</li>
            </ul>
          </div>

          <div className="rounded-xl border border-violet-500/40 bg-gradient-to-br from-violet-600/10 to-indigo-600/5 p-7 shadow-[0_0_40px_-15px_rgba(139,92,246,0.6)]">
            <div className="text-xs font-mono text-violet-300 uppercase tracking-wider mb-4 flex items-center gap-2">
              <Activity className="h-3.5 w-3.5" /> Nocodext intercepts reality
            </div>
            <ul className="space-y-3 text-white/85">
              <li className="flex gap-3"><span className="text-violet-400">→</span> Monitors actual API responses in real time</li>
              <li className="flex gap-3"><span className="text-violet-400">→</span> Captures every field delivered to the browser</li>
              <li className="flex gap-3"><span className="text-violet-400">→</span> Flags what's present vs. what should be</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-white/40 font-mono mt-8 max-w-xl mx-auto">
          No access to your Bubble editor required. No collaborator invite. Just install the extension and open your app.
        </p>
      </section>

      {/* WHY IT MATTERS */}
      <section className="relative max-w-3xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
          This isn't a productivity feature.
        </h2>
        <div className="space-y-5 text-white/65 text-lg leading-relaxed">
          <p>
            Privacy rules are the right tool. The problem is that Bubble gives you no feedback loop — you configure a rule, you assume it holds, and you ship. No mirror, no verification, no warning when a condition is nullable or a nested relation leaks through.
          </p>
          <p>
            Reality Checker is that mirror. The ground truth of what a real user's browser receives — with their real session, their real cookies, under real conditions. Not what you configured. What actually happened.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative max-w-4xl mx-auto px-6 py-20">
        <div className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.04] to-white/[0.01] p-10 md:p-14 text-center shadow-2xl">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-4">
            Be the first to know when it ships.
          </h2>
          <p className="text-white/60 mb-8 max-w-xl mx-auto">
            We're building Reality Checker for Nocodext. Enter your email and we'll notify you at launch — no spam, one email.
          </p>
          <div className="flex justify-center">
            <WaitlistForm id="final-form" buttonLabel="Join waitlist" />
          </div>
          <p className="mt-5 text-xs text-white/40 font-mono">
            Already a Nocodext user? You'll get priority access.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 border-t border-white/5 mt-10">
        <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm">
          <span className="font-mono text-white/70">nocodext</span>
          <Link to="/bubble" className="text-white/50 hover:text-white inline-flex items-center gap-1.5">
            <ArrowLeft className="h-3.5 w-3.5" /> nocodext.com
          </Link>
          <span className="text-white/40 font-mono text-xs">© Nocodext</span>
        </div>
      </footer>
    </div>
  );
};

export default BubbleRealityChecker;
