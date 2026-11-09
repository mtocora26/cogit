import * as React from "react"

export interface RobotSVGProps {
  direction?: number // 0: norte, 1: este, 2: sur, 3: oeste
  size?: number
  mood?: "happy" | "sad" | "neutral"
  animate?: boolean
}

export default function RobotSVG({ direction = 0, size = 48, mood = "neutral", animate = true }: RobotSVGProps) {
  // Rotar el robot según la dirección
  const rotation = direction * 90
  // Animación de rebote
  const bounce = animate ? {
    animation: "robot-bounce 1.2s infinite cubic-bezier(.4,1.6,.6,1)",
  } : {}
  // Ojos animados (parpadeo)
  const [blink, setBlink] = React.useState(false)
  React.useEffect(() => {
    if (!animate) return
    const t = setInterval(() => setBlink((b) => !b), 2200)
    return () => clearInterval(t)
  }, [animate])
  // Boca según mood
  let mouth
  if (mood === "happy") {
    mouth = <path d="M22 21 Q24 25 26 21" stroke="#111827" strokeWidth="2" fill="none" />
  } else if (mood === "sad") {
    mouth = <path d="M22 23 Q24 19 26 23" stroke="#111827" strokeWidth="2" fill="none" />
  } else {
    mouth = <rect x="21" y="20" width="6" height="2" rx="1" fill="#111827" />
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: `rotate(${rotation}deg)`, ...bounce }}
    >
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="2" floodColor="#818cf8" floodOpacity="0.7" />
        </filter>
        <radialGradient id="shadow-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38d9a9" stopOpacity="0.4" />
          <stop offset="60%" stopColor="#818cf8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#000" stopOpacity="0" />
        </radialGradient>
        <style>{`
          @keyframes robot-bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-8px); }
          }
          @keyframes shadow-pulse {
            0%, 100% { opacity: 0.7; }
            50% { opacity: 1; }
          }
        `}</style>
      </defs>
      {/* Sombra animada y sutil debajo del robot */}
      <ellipse
        cx="24"
        cy="44"
        rx="10"
        ry="3.5"
        fill="url(#shadow-gradient)"
        style={{
          animation: 'shadow-pulse 1.2s infinite cubic-bezier(.4,1.6,.6,1)',
          opacity: 0.7
        }}
      />
      {/* Cuerpo */}
      <rect x="12" y="18" width="24" height="18" rx="6" fill="#6EE7B7" stroke="#111827" strokeWidth="2" filter="url(#glow)" />
      {/* Cabeza */}
      <rect x="16" y="8" width="16" height="12" rx="5" fill="#FDE68A" stroke="#111827" strokeWidth="2" />
      {/* Ojos (parpadeo animado) */}
      {blink ? (
        <>
          <rect x="18.5" y="14" width="3" height="1.5" rx="0.7" fill="#111827" />
          <rect x="26.5" y="14" width="3" height="1.5" rx="0.7" fill="#111827" />
        </>
      ) : (
        <>
          <circle cx="20" cy="14" r="2" fill="#111827" />
          <circle cx="28" cy="14" r="2" fill="#111827" />
        </>
      )}
      {/* Antena */}
      <rect x="23" y="2" width="2" height="8" rx="1" fill="#818CF8" />
      <circle cx="24" cy="2.5" r="1.5" fill="#818CF8" filter="url(#glow)" />
      {/* Ruedas */}
      <rect x="12" y="36" width="6" height="6" rx="3" fill="#A5B4FC" stroke="#111827" strokeWidth="1.5" />
      <rect x="30" y="36" width="6" height="6" rx="3" fill="#A5B4FC" stroke="#111827" strokeWidth="1.5" />
      {/* Boca animada según mood */}
      {mouth}
      {/* Detalles extra */}
      <rect x="18" y="28" width="12" height="2" rx="1" fill="#818CF8" opacity="0.3" />
      <rect x="20" y="32" width="8" height="2" rx="1" fill="#818CF8" opacity="0.2" />
    </svg>
  )
}
