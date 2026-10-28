import React from "react"

interface NexoraLogoProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  className?: string
  withGlow?: boolean
}

export function NexoraLogo({
  size = 36,
  className = "",
  withGlow = false,
  ...props
}: NexoraLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      {...props}
    >
      <defs>
        {/* Modern Electric Purple to Vivid Violet Gradient */}
        <linearGradient id="nexoraBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="45%" stopColor="#8B5CF6" />
          <stop offset="100%" stopColor="#6D28D9" />
        </linearGradient>

        {/* N Monogram Gradient with Specular Light */}
        <linearGradient id="nexoraN" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#F5EDFF" />
          <stop offset="100%" stopColor="#E0C8FE" />
        </linearGradient>

        {/* Specular Ambient Glow Top Highlight */}
        <linearGradient id="nexoraGloss" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
        </linearGradient>

        {/* Subtle Ambient Glow Drop Shadow */}
        <filter id="nexoraGlow" x="-25%" y="-25%" width="150%" height="150%">
          <feDropShadow dx="0" dy="4" stdDeviation="6" floodColor="#8B5CF6" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Rounded Modern Squircle Tile */}
      <rect
        width="64"
        height="64"
        rx="18"
        fill="url(#nexoraBg)"
        filter={withGlow ? "url(#nexoraGlow)" : undefined}
      />

      {/* Top Glass Specular Arc */}
      <rect
        x="1.5"
        y="1.5"
        width="61"
        height="30"
        rx="16.5"
        fill="url(#nexoraGloss)"
      />

      {/* Inner Border Rim */}
      <rect
        x="0.75"
        y="0.75"
        width="62.5"
        height="62.5"
        rx="17.25"
        stroke="white"
        strokeOpacity="0.25"
        strokeWidth="1.5"
      />

      {/* High-Impact Geometric N Monogram */}
      <path
        d="M20 45.5V18.5L44 45.5V18.5"
        stroke="url(#nexoraN)"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
