import WYSIWYGTape from "@/components/bubble/WYSIWYGTape";
import { Link } from "react-router-dom";

const WYSIWYGTeaser = () => {
  return (
    <section className="py-24 bg-slate-100">
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

      <div className="container mx-auto px-4 max-w-4xl">
        <div className="rounded-2xl bg-neutral-800 border border-neutral-700 shadow-sm flex flex-col items-center justify-center gap-8 px-12 pt-14 pb-10">

          <WYSIWYGTape
            to="/bubble/reality-checker"
            fontSize="clamp(2rem, 6vw, 3.5rem)"
            paddingX="px-10"
            paddingTop="18px"
            paddingBottom="10px"
          />

          <div className="text-center space-y-3">
            <p className="text-white/40 text-xs font-mono uppercase tracking-widest">
              With Privacy Rules
            </p>
            <p className="text-white text-xl md:text-2xl max-w-lg mx-auto leading-snug">
              What You See Is{" "}
              <span style={{ color: "red" }}>[not actually]</span>{" "}
              What You Get.
            </p>
          </div>

          <Link
            to="/bubble/reality-checker"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-violet-500/40 text-violet-300 hover:border-violet-400 hover:text-violet-200 transition-colors font-mono text-sm"
          >
            discover the new tool : Reality Checker
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

export default WYSIWYGTeaser;
