import { Link } from "react-router-dom";

const TORN_CLIP = `polygon(
  8px 0%,
  3px 12%, 14px 24%, 5px 36%, 16px 48%, 4px 60%, 13px 72%, 6px 84%, 10px 100%,
  calc(100% - 11px) 100%,
  calc(100% - 7px) 88%, calc(100% - 15px) 76%, calc(100% - 4px) 64%,
  calc(100% - 13px) 52%, calc(100% - 5px) 40%, calc(100% - 14px) 28%,
  calc(100% - 6px) 16%, calc(100% - 9px) 4%, calc(100% - 8px) 0%
)`;

interface WYSIWYGTapeProps {
  fontSize?: string;
  paddingX?: string;
  paddingTop?: string;
  paddingBottom?: string;
  rotate?: string;
  to?: string;
}

const WYSIWYGTape = ({
  fontSize = "clamp(2.5rem, 9vw, 6rem)",
  paddingX = "px-14",
  paddingTop = "24px",
  paddingBottom = "12px",
  rotate = "perspective(350px) rotateX(-12deg) rotate(-2deg)",
  to,
}: WYSIWYGTapeProps) => {
  const ptNum = parseInt(paddingTop);
  const pbNum = parseInt(paddingBottom);
  // Both scale automatically from the padding values
  const stabHeight = Math.round((ptNum + pbNum) * 0.33);
  const stabOffsetY = -(ptNum - pbNum) / 2;
  const tape = (
    <div
      className={`relative inline-flex items-center ${paddingX} cursor-pointer`}
      style={{
        clipPath: TORN_CLIP,
        paddingTop,
        paddingBottom,
        transform: rotate,
        background: "linear-gradient(to bottom, #d8d8d8 0%, #ffffff 45%, #e0e0e0 100%)",
      }}
    >
      <span
        className="tracking-[0.18em] select-none text-black"
        style={{
          fontFamily: "'Special Elite', 'Courier New', monospace",
          fontSize,
          lineHeight: 1,
          textShadow: "-1px -1px 0px #ffffff, 1px 1px 2px rgba(0,0,0,0.3)",
        }}
      >
        WYSIWYG
      </span>

      <span className="absolute inset-0 flex items-center pointer-events-none" aria-hidden="true">
        <span
          className="w-full block"
          style={{
            height: `${stabHeight}px`,
            transform: `rotate(-5deg) translateY(${stabOffsetY}px)`,
            background: "rgb(220, 38, 38)",
            filter: "blur(0.8px)",
          }}
        />
      </span>
    </div>
  );

  if (to) {
    return (
      <Link to={to} className="inline-block hover:brightness-90 transition-all duration-200">
        {tape}
      </Link>
    );
  }

  return <div className="inline-block">{tape}</div>;
};

export default WYSIWYGTape;
