import WYSIWYGTape from "@/components/bubble/WYSIWYGTape";
import { Link } from "react-router-dom";

const WYSIWYGTeaser = () => {
  return (
    <section className="py-28 bg-neutral-700">
      <div className="container mx-auto px-4 text-center">

        <div className="mb-10">
          <WYSIWYGTape to="/bubble/reality-checker" />
        </div>

        <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-3">With Privacy Rules</p>
        <p className="text-white text-2xl md:text-3xl mb-12 max-w-2xl mx-auto leading-snug">
          What You See Is <span style={{ color: "red" }}>[not actually]</span> What You Get.
        </p>

        <Link
          to="/bubble/reality-checker"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-violet-500/40 text-violet-300 hover:border-violet-400 hover:text-violet-200 transition-colors font-mono text-sm"
        >
          Discover Reality Checker →
        </Link>
      </div>
    </section>
  );
};

export default WYSIWYGTeaser;
