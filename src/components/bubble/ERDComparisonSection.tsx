import {
  Wrench, Users, Shield, MousePointer, PanelLeft,
  Network, FileOutput, GitBranch, AlertCircle, Tag,
  XCircle, CheckCircle2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const COL = { gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr) minmax(0,1fr)" };

const rows: { label: string; icon: LucideIcon; them: string; us: string }[] = [
  {
    label: "Setup required",
    icon: Wrench,
    them: 'Requires enabling "password protected" on your Bubble app just to get started.',
    us: "Nothing to configure. Open your editor — it's already there.",
  },
  {
    label: "Impact on live users",
    icon: Users,
    them: "Enabling password protection locks your entire app. Real users get locked out while you use it.",
    us: "Works exclusively in the editor. Your live app and users are completely unaffected.",
  },
  {
    label: "What it accesses",
    icon: Shield,
    them: "Authenticates against your live Bubble app to read the schema. Your data is in the loop.",
    us: "Reads the editor DOM only. No live app access, no data exposure, no network calls to your app.",
  },
  {
    label: "Interaction",
    icon: MousePointer,
    them: "Read-only. You look at the diagram. That's it.",
    us: "Two-way. Navigate, select, explore — the ERD is a live interface, not a static poster.",
  },
  {
    label: "Display modes",
    icon: PanelLeft,
    them: "One fixed view. No way to focus, split, or compare parts of your schema.",
    us: "Multi split modes — isolate what you need, compare relations side by side.",
  },
  {
    label: "Layout",
    icon: Network,
    them: "Manual. You drag and arrange nodes yourself every time.",
    us: "Auto-layout — nodes arrange themselves, smartly. ELK-powered graph engine.",
  },
  {
    label: "Export format",
    icon: FileOutput,
    them: "PNG or PDF. Flat, static, frozen. Useless for tooling or version control.",
    us: "DBML + SQL — living artifacts. Import into DBDiagram, Prisma, or any standard tool.",
  },
  {
    label: "Version control",
    icon: GitBranch,
    them: "A PNG tells git nothing. Your schema history is invisible.",
    us: "Diff your schema like code. Every change is trackable, reviewable, reversible.",
  },
  {
    label: "Product quality",
    icon: AlertCircle,
    them: "Their FAQ contains copy-pasted boilerplate from a Tailwind UI template — including references to MIT license and CSS frameworks. Unrelated to the product.",
    us: "—",
  },
  {
    label: "Price",
    icon: Tag,
    them: "€8 / month. For a read-only diagram you have to unlock with a workaround.",
    us: "Included in Nocodext. No extra plan, no paywall, no setup.",
  },
];

const BadTooltip = ({ text }: { text: string }) => (
  <TooltipPrimitive.Root delayDuration={100}>
    <TooltipPrimitive.Trigger asChild>
      <button className="flex items-center justify-center w-full cursor-default group">
        <XCircle
          size={28}
          className="text-red-300 group-hover:text-red-500 transition-colors duration-150"
          strokeWidth={1.75}
        />
      </button>
    </TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        side="top"
        sideOffset={10}
        className="z-50 max-w-xs rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-lg font-inter leading-relaxed animate-in fade-in-0 zoom-in-95"
      >
        {text}
        <TooltipPrimitive.Arrow
          width={14}
          height={8}
          className="fill-red-200"
        />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
);

const GoodTooltip = ({ text }: { text: string }) => {
  if (text === "—") return (
    <div className="flex items-center justify-center w-full">
      <CheckCircle2 size={28} className="text-emerald-300" strokeWidth={1.75} />
    </div>
  );
  return (
    <TooltipPrimitive.Root delayDuration={100}>
      <TooltipPrimitive.Trigger asChild>
        <button className="flex items-center justify-center w-full cursor-default group">
          <CheckCircle2
            size={28}
            className="text-emerald-300 group-hover:text-emerald-500 transition-colors duration-150"
            strokeWidth={1.75}
          />
        </button>
      </TooltipPrimitive.Trigger>
      <TooltipPrimitive.Portal>
        <TooltipPrimitive.Content
          side="top"
          sideOffset={10}
          className="z-50 max-w-xs rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800 shadow-lg font-inter leading-relaxed animate-in fade-in-0 zoom-in-95"
        >
          {text}
          <TooltipPrimitive.Arrow
            width={14}
            height={8}
            className="fill-emerald-200"
          />
        </TooltipPrimitive.Content>
      </TooltipPrimitive.Portal>
    </TooltipPrimitive.Root>
  );
};

const ERDComparisonSection = () => {
  return (
    <TooltipPrimitive.Provider>
      <section className="py-24 bg-slate-100">
        <div className="container mx-auto px-4 max-w-4xl">

          {/* Header */}
          <div className="mb-14 text-center">
            <p className="text-zinc-400 text-sm uppercase tracking-widest mb-4 font-inter">
              ERD : data visualization
            </p>
            <h2 className="text-3xl md:text-4xl font-bold font-inter leading-tight mb-6 text-gray-900">
              There is one alternative.<br />
              <span className="text-zinc-400">Not the same game.</span>
            </h2>
            <p className="text-gray-400 text-sm font-inter mt-4">
              Hover each icon for details.
            </p>
          </div>

          {/* Table */}
          <div className="rounded-2xl overflow-hidden border border-gray-200 bg-white shadow-sm">
            {/* Header */}
            <div className="grid bg-gray-100 px-6 py-4 text-sm font-semibold uppercase tracking-wider font-inter" style={COL}>
              <div></div>
              <div className="text-center text-gray-400">
                <a href="https://bubvisch.com" target="_blank" rel="noopener noreferrer"
                  className="hover:text-gray-600 transition-colors">
                  BubVisch
                </a>
              </div>
              <div className="text-center text-emerald-600">Nocodext ERD</div>
            </div>

            {/* Rows */}
            {rows.map((row, i) => (
              <div
                key={i}
                className={`grid px-6 py-4 items-center gap-4 border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                style={COL}
              >
                <div className="flex items-center gap-3 text-gray-600 text-sm font-medium font-inter">
                  <row.icon size={16} className="text-gray-400 shrink-0" />
                  {row.label}
                </div>
                <BadTooltip text={row.them} />
                <GoodTooltip text={row.us} />
              </div>
            ))}
          </div>

          {/* Closing line */}
          <p className="mt-10 text-center text-gray-400 text-sm font-inter">
            We work with what the editor gets itself. No credentials, no API, no side effects.
          </p>
        </div>
      </section>
    </TooltipPrimitive.Provider>
  );
};

export default ERDComparisonSection;
