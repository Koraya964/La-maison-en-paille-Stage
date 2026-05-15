export function PatternPaille({ id }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="32"
          height="32"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="16"
            x2="32"
            y2="16"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="1"
          />
          <line
            x1="16"
            y1="0"
            x2="16"
            y2="32"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <circle cx="16" cy="16" r="1.5" fill="rgba(255,255,255,0.06)" />
          <circle cx="0" cy="0" r="1" fill="rgba(255,255,255,0.04)" />
          <circle cx="32" cy="32" r="1" fill="rgba(255,255,255,0.04)" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function PatternFeu({ id }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M20 0 L40 40 L0 40 Z"
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth="0.8"
          />
          <path
            d="M0 0 L20 40 L40 0"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <path
            d="M20 10 L30 30 L10 30 Z"
            fill="none"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

export function PatternSolaire({ id }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern
          id={id}
          x="0"
          y="0"
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
        >
          <line
            x1="0"
            y1="40"
            x2="40"
            y2="0"
            stroke="rgba(255,255,255,0.07)"
            strokeWidth="0.8"
          />
          <line
            x1="-10"
            y1="40"
            x2="30"
            y2="0"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <line
            x1="10"
            y1="40"
            x2="50"
            y2="0"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <circle
            cx="20"
            cy="20"
            r="2"
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="0.5"
          />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

const PATTERNS = {
  paille: PatternPaille,
  feu: PatternFeu,
  solaire: PatternSolaire,
};

export function Pattern({ type, id }) {
  const Component = PATTERNS[type];
  return Component ? <Component id={id} /> : null;
}
