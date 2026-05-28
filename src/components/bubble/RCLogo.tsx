interface RCLogoProps {
  size?: number;
  className?: string;
}

const RCLogo = ({ size = 80, className = "" }: RCLogoProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <defs>
      <radialGradient id="shieldGrad" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stopColor="#2a1660" />
        <stop offset="100%" stopColor="#0d0825" />
      </radialGradient>
      <filter id="crackGlow" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="1.8" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* Shield body */}
    <path
      d="M 40 6 L 72 18 L 72 45 Q 72 67 40 80 Q 8 67 8 45 L 8 18 Z"
      fill="url(#shieldGrad)"
      stroke="#7c3aed"
      strokeWidth="2"
      strokeLinejoin="round"
    />

    {/* Crack — glow layer */}
    <path
      d="M 29 17 L 39 31 L 31 41 L 47 61 L 41 72"
      stroke="rgba(220,38,38,0.35)"
      strokeWidth="5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Crack — sharp layer */}
    <path
      d="M 29 17 L 39 31 L 31 41 L 47 61 L 41 72"
      stroke="rgb(220,38,38)"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      filter="url(#crackGlow)"
    />

    {/* Magnifying glass handle */}
    <line
      x1="82"
      y1="80"
      x2="97"
      y2="96"
      stroke="#5b21b6"
      strokeWidth="5.5"
      strokeLinecap="round"
    />

    {/* Magnifying glass — lens ring */}
    <circle cx="67" cy="65" r="21" fill="#0d0825" stroke="#7c3aed" strokeWidth="2.5" />

    {/* Lens inner */}
    <circle cx="67" cy="65" r="14" fill="rgba(124,58,237,0.07)" stroke="rgba(124,58,237,0.22)" strokeWidth="1" />

    {/* Data lines inside lens — audit readout */}
    <line x1="59" y1="60" x2="75" y2="60" stroke="rgba(124,58,237,0.75)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="59" y1="65" x2="71" y2="65" stroke="rgb(220,38,38)" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="59" y1="70" x2="66" y2="70" stroke="rgba(124,58,237,0.45)" strokeWidth="1.5" strokeLinecap="round" />

    {/* Red dot — anomaly found */}
    <circle cx="75" cy="65" r="2.5" fill="rgb(220,38,38)" opacity="0.9" />
  </svg>
);

export default RCLogo;
