import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldAlert, Eye, GitBranch, Activity, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { subscribeToNewsletter } from "@/lib/newsletter";

const REALITY_ROWS = [
  { field: "email", bubble: "Hidden", reality: "Exposed in payload" },
  { field: "stripe_customer_id", bubble: "Private", reality: "Present in API response" },
  { field: "internal_notes", bubble: "Admin only", reality: "Returned for all roles" },
  { field: "salary", bubble: "Not accessible", reality: "Loaded in repeating group" },
];

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
      const res = await subscribeToNewsletter({ email, product: "bubble-reality-checker" });
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

const BubbleRealityChecker = () => {
  const [highlight, setHighlight] = useState(false);
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

      {/* Minimal page-local nav */}
      <nav className="relative z-10 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-mono text-sm tracking-tight text-white/90">
            nocodext<span className="text-violet-400">/</span>reality-checker
          </span>
          <Link
            to="/bubble"
            className="text-sm text-white/60 hover:text-white transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> nocodext.com
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-24 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-violet-500/30 bg-violet-500/10 text-xs font-mono text-violet-300 mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
          In development — join the waitlist
        </div>
        <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-[1.05] mb-6">
          See what Bubble <span className="text-violet-400">really</span> sends<br />
          to the browser.
        </h1>
        <p className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
          Your privacy rules protect what's displayed.<br />
          Not what's delivered.
        </p>

        <div className="flex justify-center">
          <WaitlistForm id="hero-form" />
        </div>
        <p className="mt-4 text-xs text-white/40 font-mono">
          No admin access required. Works directly in your browser.
        </p>
      </section>

      {/* PROBLEM */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-center mb-16">
          The gap no one talks about
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Eye,
              title: "Hidden ≠ Protected",
              body: "You hide a field in the UI. Bubble still sends it in the JSON payload. It's in memory. It's readable.",
            },
            {
              icon: ShieldAlert,
              title: "Rules ≠ Enforcement",
              body: 'Your privacy rule says "Admin only." One nullable condition, one concurrent rule — and Everyone can query it.',
            },
            {
              icon: GitBranch,
              title: "Dev ≠ Live",
              body: "3 fields exposed in production that aren't in your dev environment. You'd never know without looking.",
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

      {/* DEMO TABLE */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 border-t border-white/5">
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
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-20 border-t border-white/5">
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
      <section className="relative z-10 max-w-3xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-8">
          This isn't a productivity feature.
        </h2>
        <div className="space-y-5 text-white/65 text-lg leading-relaxed">
          <p>
            Data leaks in Bubble apps aren't bugs — they're configuration gaps. GDPR fines don't care whether you intended to expose a field. Your clients don't either.
          </p>
          <p>
            Reality Checker gives you the ground truth: exactly what a real user's browser receives, with their real session, their real cookies, under real conditions.
          </p>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 py-20">
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
