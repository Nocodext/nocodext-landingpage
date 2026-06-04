import { Link } from "react-router-dom";
import WYSIWYGTape from "@/components/bubble/WYSIWYGTape";

const WYSIWYGTeaserCard = () => {
  return (
    <section className="flex-1 flex flex-col py-24 bg-slate-100">
      <style>{`
        @keyframes chevrons-slide {
          0%   { transform: translateX(-8px); opacity: 0; }
          30%  { opacity: 1; }
          70%  { opacity: 1; }
          100% { transform: translateX(8px); opacity: 0; }
        }
        .chv { display: inline-block; animation: chevrons-slide 1.4s ease-in-out infinite; }
        .chv:nth-child(2) { animation-delay: 0.18s; }
        .chv:nth-child(3) { animation-delay: 0.36s; }
      `}</style>

      <div className="container mx-auto px-4 max-w-4xl flex-1 flex flex-col">

        {/* Header — mirrors ERDComparisonSection */}
        <div className="mb-14 text-center">
          <p className="text-zinc-400 text-sm uppercase tracking-widest mb-4 font-inter">
            Security & Privacy
          </p>
          <h2 className="text-3xl md:text-4xl font-bold font-inter leading-tight mb-6 text-gray-900">
            What Bubble shows you.<br />
            <span className="text-zinc-400">And what it actually sends.</span>
          </h2>
        </div>

        {/* Dark card — same frame as the comparison table, teaser only */}
        <div className="rounded-2xl border border-neutral-700 bg-neutral-800 shadow-sm flex flex-col items-center justify-center gap-10 flex-1 px-12 py-16">
          <WYSIWYGTape
            to="/bubble/reality-checker"
            fontSize="clamp(2rem, 6vw, 4rem)"
            paddingX="px-12"
            paddingTop="20px"
            paddingBottom="12px"
          />

          <p className="text-white/40 text-sm font-mono tracking-widest uppercase">
            With Privacy Rules
          </p>

          <Link
            to="/bubble/reality-checker"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-violet-500/40 text-violet-300 hover:border-violet-400 hover:text-violet-200 transition-colors font-mono text-sm"
          >
            discover Reality Checker
            <span className="inline-flex items-center gap-0.5 overflow-hidden text-base" aria-hidden="true">
              <span className="chv">›</span>
              <span className="chv">›</span>
              <span className="chv">›</span>
            </span>
          </Link>
        </div>

      </div>
    </section>
  );
};

export default WYSIWYGTeaserCard;
