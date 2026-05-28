import { Link } from "react-router-dom";

const TORN_CLIP = `polygon(
  8px 0%,
  3px 12%, 14px 24%, 5px 36%, 16px 48%, 4px 60%, 13px 72%, 6px 84%, 10px 100%,
  calc(100% - 11px) 100%,
  calc(100% - 7px) 88%, calc(100% - 15px) 76%, calc(100% - 4px) 64%,
  calc(100% - 13px) 52%, calc(100% - 5px) 40%, calc(100% - 14px) 28%,
  calc(100% - 6px) 16%, calc(100% - 9px) 4%, calc(100% - 8px) 0%
)`;

const WYSIWYGTeaser = () => {
  return (
    <section className="py-28 bg-neutral-700">
      <div className="container mx-auto px-4 text-center">
        <Link to="/bubble/reality-checker" className="inline-block mb-10 transition-brightness duration-200 hover:brightness-90">
          <div
            className="relative inline-flex items-center px-10 bg-white text-black cursor-pointer"
            style={{
              clipPath: TORN_CLIP,
              paddingTop: "24px",
              paddingBottom: "12px",
              transform: "perspective(350px) rotateX(-12deg) rotate(-2deg)",
              background: "linear-gradient(to bottom, #d8d8d8 0%, #ffffff 45%, #e0e0e0 100%)",
            }}
          >
            <span
              className="tracking-[0.18em] select-none"
              style={{
                fontFamily: "'Special Elite', 'Courier New', monospace",
                fontSize: "clamp(2.5rem, 9vw, 6rem)",
                lineHeight: 1,
                textShadow: "-1px -1px 0px #ffffff, 1px 1px 2px rgba(0,0,0,0.3)",
              }}
            >
              WYSIWYG
            </span>

            {/* Stabilo — inside clip-path, stays within torn edges */}
            <span className="absolute inset-0 flex items-center pointer-events-none" aria-hidden="true">
              <span
                className="w-full block"
                style={{
                  height: "16px",
                  transform: "rotate(-5deg) translateY(-6px)",
                  background: "rgb(220, 38, 38)",
                  filter: "blur(0.8px)",
                }}
              />
            </span>
          </div>
        </Link>

        <p className="text-white/50 text-xs font-mono uppercase tracking-widest mb-3">With Privacy Rules</p>
        <p className="text-white text-2xl md:text-3xl font-semibold mb-12 max-w-2xl mx-auto leading-snug">
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
