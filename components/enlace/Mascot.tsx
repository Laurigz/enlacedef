import * as React from "react"
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion"

/**
 * Nodo — Enlace's mascot.
 * A small hovering robot whose head, visor and eyes follow the cursor with
 * layered springs (head < visor < eyes) so it reads as a real head turn.
 * Blinks on its own, looks around when idle, waves hello, and reacts on click.
 */

const MESSAGES = [
  "¡Hola! Soy Nodo. Hazme clic.",
  "¿Tienes una idea? Yo la enlazo.",
  "Webs hechas a mano. Cero plantillas.",
  "Cargo en menos de 1 segundo. Lo juro.",
  "Tu web lista en 3 a 6 semanas.",
  "Cotizar es gratis. Y respondo rápido.",
]

const clamp = (v: number, min = -1, max = 1) => Math.min(max, Math.max(min, v))
const rand = (min: number, max: number) => min + Math.random() * (max - min)

// Transform origins in SVG viewBox coordinates (stable, unaffected by children moving).
// Framer Motion writes transform-origin from originX/originY, so express them as
// fractions of the 420×470 viewBox with transform-box: view-box.
const VB_W = 420
const VB_H = 470
const origin = (x: number, y: number) =>
  ({ transformBox: "view-box", originX: x / VB_W, originY: y / VB_H }) as const

type Particle = { id: number; x: number; rot: number; color: string; kind: "heart" | "spark" }

export function Mascot({ className }: { className?: string }) {
  const ref = React.useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // Raw pointer direction, normalized to -1..1
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  // Layered springs: the head is heavier than the eyes.
  const head = { stiffness: 90, damping: 15, mass: 0.9 }
  const eyes = { stiffness: 220, damping: 20, mass: 0.4 }
  const hx = useSpring(mx, head)
  const hy = useSpring(my, head)
  const ex = useSpring(mx, eyes)
  const ey = useSpring(my, eyes)
  // Antenna lags behind for a little secondary motion
  const ax = useSpring(mx, { stiffness: 50, damping: 6, mass: 1 })

  const headX = useTransform(hx, [-1, 1], [-14, 14])
  const headY = useTransform(hy, [-1, 1], [-10, 8])
  const headRotate = useTransform(hx, [-1, 1], [-9, 9])
  const visorX = useTransform(hx, [-1, 1], [-10, 10])
  const visorY = useTransform(hy, [-1, 1], [-6, 7])
  const earX = useTransform(hx, [-1, 1], [5, -5])
  const eyesX = useTransform(ex, [-1, 1], [-14, 14])
  const eyesY = useTransform(ey, [-1, 1], [-10, 10])
  const bodyRotate = useTransform(hx, [-1, 1], [-3.5, 3.5])
  const antennaRotate = useTransform([ax, hx] as MotionValue<number>[], ([a, h]: number[]) => (h - a) * 28)

  const [blink, setBlink] = React.useState(false)
  const [happy, setHappy] = React.useState(false)
  const [waving, setWaving] = React.useState(false)
  const [hovered, setHovered] = React.useState(false)
  const [msg, setMsg] = React.useState(0)
  const [particles, setParticles] = React.useState<Particle[]>([])

  // Follow the pointer anywhere on the page
  React.useEffect(() => {
    let lastMove = 0
    const onMove = (e: PointerEvent) => {
      const el = ref.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height * 0.36
      mx.set(clamp((e.clientX - cx) / (Math.max(window.innerWidth, 720) * 0.42)))
      my.set(clamp((e.clientY - cy) / (Math.max(window.innerHeight, 560) * 0.45)))
      lastMove = performance.now()
    }
    const onLeave = () => {
      mx.set(0)
      my.set(0)
    }
    window.addEventListener("pointermove", onMove, { passive: true })
    document.documentElement.addEventListener("pointerleave", onLeave)

    // When nobody moves (or on touch screens) Nodo looks around on its own.
    const idle = window.setInterval(() => {
      if (reduced) return
      if (performance.now() - lastMove > 3500) {
        mx.set(rand(-0.75, 0.75))
        my.set(rand(-0.45, 0.55))
      }
    }, 2300)

    return () => {
      window.removeEventListener("pointermove", onMove)
      document.documentElement.removeEventListener("pointerleave", onLeave)
      window.clearInterval(idle)
    }
  }, [mx, my, reduced])

  // Natural blinking, with the occasional double blink
  React.useEffect(() => {
    let t: number
    const once = (cb?: () => void) => {
      setBlink(true)
      window.setTimeout(() => {
        setBlink(false)
        cb?.()
      }, 130)
    }
    const loop = () => {
      t = window.setTimeout(() => {
        if (Math.random() < 0.25) once(() => window.setTimeout(() => once(), 120))
        else once()
        loop()
      }, rand(2200, 5200))
    }
    loop()
    return () => window.clearTimeout(t)
  }, [])

  // Say hi once after the page loads
  React.useEffect(() => {
    if (reduced) return
    const a = window.setTimeout(() => setWaving(true), 900)
    const b = window.setTimeout(() => setWaving(false), 3000)
    return () => {
      window.clearTimeout(a)
      window.clearTimeout(b)
    }
  }, [reduced])

  const happyTimer = React.useRef<number>()
  const onPoke = () => {
    setMsg((m) => (m + 1) % MESSAGES.length)
    setHappy(true)
    setWaving(true)
    window.clearTimeout(happyTimer.current)
    happyTimer.current = window.setTimeout(() => {
      setHappy(false)
      setWaving(false)
    }, 1600)

    if (!reduced) {
      const colors = ["#FF5B3A", "#FF7EB6", "#FFC93C", "#9B7BFF", "#2ED3A0"]
      const burst: Particle[] = Array.from({ length: 6 }, (_, i) => ({
        id: Date.now() + i,
        x: rand(-130, 130),
        rot: rand(-40, 40),
        color: colors[i % colors.length],
        kind: i % 2 ? "heart" : "spark",
      }))
      setParticles((p) => [...p, ...burst])
      window.setTimeout(() => setParticles((p) => p.filter((q) => !burst.includes(q))), 1300)
    }
  }

  const eyeScale = happy ? 1 : hovered ? 1.14 : 1

  return (
    <div className={className}>
      {/* Speech bubble */}
      <div className="pointer-events-none relative z-20 flex h-[4.5rem] items-end justify-center sm:justify-start sm:pl-[10%]">
          <AnimatePresence mode="wait">
            <motion.p
              key={msg}
              role="status"
              aria-live="polite"
              initial={{ opacity: 0, y: 8, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 380, damping: 22 }}
              className="relative max-w-[17rem] rounded-2xl border-2 border-ink bg-white px-4 py-2.5 font-display text-[15px] font-medium leading-snug text-ink shadow-pop-sm"
            >
              {MESSAGES[msg]}
              <span
                aria-hidden="true"
                className="absolute -bottom-[9px] left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-b-2 border-r-2 border-ink bg-white sm:left-auto sm:right-8 sm:translate-x-0"
              />
            </motion.p>
          </AnimatePresence>
      </div>

      <div ref={ref} className="relative mx-auto -mt-3 aspect-[420/470] w-full">

        {/* Click burst */}
        <div className="pointer-events-none absolute left-1/2 top-[30%] z-20" aria-hidden="true">
          <AnimatePresence>
            {particles.map((p) => (
              <motion.span
                key={p.id}
                className="absolute"
                initial={{ opacity: 0, x: 0, y: 0, scale: 0.4, rotate: 0 }}
                animate={{ opacity: [0, 1, 1, 0], x: p.x, y: rand(-170, -110), scale: 1, rotate: p.rot }}
                transition={{ duration: 1.1, ease: "easeOut" }}
              >
                {p.kind === "heart" ? (
                  <svg viewBox="0 0 24 24" className="h-7 w-7">
                    <path
                      d="M12 21s-7.5-4.6-9.6-9.2C.9 8.4 3 4.5 6.7 4.5c2.2 0 3.6 1.3 4.3 2.6.7-1.3 2.1-2.6 4.3-2.6 3.7 0 5.8 3.9 4.3 7.3C19.5 16.4 12 21 12 21z"
                      fill={p.color}
                      stroke="#1F1A3D"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 40 40" className="h-6 w-6">
                    <path
                      d="M20 2C22 13 27 18 38 20 27 22 22 27 20 38 18 27 13 22 2 20 13 18 18 13 20 2Z"
                      fill={p.color}
                      stroke="#1F1A3D"
                      strokeWidth="3"
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </motion.span>
            ))}
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={onPoke}
          onPointerEnter={() => setHovered(true)}
          onPointerLeave={() => setHovered(false)}
          aria-label="Saludar a Nodo, la mascota de Enlace"
          className="group absolute inset-0 block h-full w-full cursor-pointer rounded-[40%] [-webkit-tap-highlight-color:transparent]"
        >
          <svg viewBox="0 0 420 470" className="h-full w-full overflow-visible" role="img" aria-hidden="true">
            <defs>
              <linearGradient id="nodo-visor" x1="0" y1="0" x2="0.4" y2="1">
                <stop offset="0" stopColor="#2E2766" />
                <stop offset="1" stopColor="#1F1A3D" />
              </linearGradient>
              <linearGradient id="nodo-shell" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#EFE9FF" />
              </linearGradient>
              <filter id="nodo-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" />
              </filter>
            </defs>

            {/* Ground shadow breathes with the float */}
            <motion.ellipse
              cx="210"
              cy="452"
              rx="92"
              ry="13"
              fill="#1F1A3D"
              style={origin(210, 452)}
              animate={reduced ? undefined : { scaleX: [1, 0.82, 1], opacity: [0.16, 0.09, 0.16] }}
              initial={{ opacity: 0.16 }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            />

            <motion.g
              animate={reduced ? undefined : { y: [0, -14, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
            >
              {/* Hover jet */}
              <motion.g
                style={origin(210, 396)}
                animate={reduced ? undefined : { scaleY: [1, 1.3, 0.9, 1.2, 1], scaleX: [1, 0.92, 1.05, 0.95, 1] }}
                transition={{ duration: 0.7, repeat: Infinity, ease: "easeInOut" }}
              >
                <path d="M184 394 Q210 452 236 394 Z" fill="#FFC93C" stroke="#1F1A3D" strokeWidth="5" strokeLinejoin="round" />
                <path d="M198 396 Q210 428 222 396 Z" fill="#FF5B3A" />
              </motion.g>

              <motion.g style={{ rotate: bodyRotate, ...origin(210, 400) }}>
                {/* Left arm (resting) */}
                <motion.g
                  style={origin(152, 318)}
                  initial={{ rotate: -34 }}
                  animate={{ rotate: happy ? -60 : -34 }}
                  transition={{ type: "spring", stiffness: 200, damping: 12 }}
                >
                  <rect x="104" y="305" width="54" height="26" rx="13" fill="#FFFFFF" stroke="#1F1A3D" strokeWidth="6" />
                  <circle cx="104" cy="318" r="15" fill="#9B7BFF" stroke="#1F1A3D" strokeWidth="6" />
                </motion.g>

                {/* Right arm (waves) */}
                <motion.g
                  style={origin(268, 318)}
                  initial={{ rotate: 34 }}
                  animate={waving ? { rotate: [34, -72, -38, -72, -38, -72, 34] } : { rotate: 34 }}
                  transition={waving ? { duration: 1.9, ease: "easeInOut" } : { type: "spring", stiffness: 160, damping: 14 }}
                >
                  <rect x="262" y="305" width="54" height="26" rx="13" fill="#FFFFFF" stroke="#1F1A3D" strokeWidth="6" />
                  <circle cx="316" cy="318" r="15" fill="#9B7BFF" stroke="#1F1A3D" strokeWidth="6" />
                </motion.g>

                {/* Body */}
                <rect x="140" y="278" width="140" height="120" rx="56" fill="url(#nodo-shell)" stroke="#1F1A3D" strokeWidth="6" />
                <path d="M162 300 Q170 290 184 287" fill="none" stroke="#FFFFFF" strokeWidth="7" strokeLinecap="round" />

                {/* Belly badge: a tiny chain link, Enlace's mark */}
                <rect x="176" y="306" width="68" height="48" rx="20" fill="#FFE1D8" stroke="#1F1A3D" strokeWidth="5" />
                <motion.g
                  style={origin(210, 330)}
                  animate={reduced ? undefined : { scale: [1, 1.12, 1] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                >
                  <rect x="186" y="322" width="28" height="17" rx="8.5" fill="none" stroke="#1F1A3D" strokeWidth="5" />
                  <rect x="206" y="322" width="28" height="17" rx="8.5" fill="none" stroke="#FF5B3A" strokeWidth="5" />
                </motion.g>

                {/* Neck */}
                <rect x="190" y="256" width="40" height="30" rx="10" fill="#9B7BFF" stroke="#1F1A3D" strokeWidth="6" />

                {/* Head */}
                <motion.g style={{ x: headX, y: headY, rotate: headRotate, ...origin(210, 268) }}>
                  {/* Antenna */}
                  <motion.g style={{ rotate: antennaRotate, ...origin(210, 84) }}>
                    <path d="M210 84 V46" stroke="#1F1A3D" strokeWidth="6" strokeLinecap="round" />
                    <motion.circle
                      cx="210"
                      cy="34"
                      r="15"
                      fill="#FFC93C"
                      stroke="#1F1A3D"
                      strokeWidth="6"
                      animate={happy ? { fill: ["#FFC93C", "#FF7EB6", "#2ED3A0", "#FFC93C"] } : { fill: "#FFC93C" }}
                      transition={{ duration: 0.9 }}
                    />
                    <circle cx="205" cy="29" r="4" fill="#FFFFFF" />
                  </motion.g>

                  {/* Ears */}
                  <motion.g style={{ x: earX }}>
                    <circle cx="96" cy="176" r="25" fill="#FF5B3A" stroke="#1F1A3D" strokeWidth="6" />
                    <circle cx="324" cy="176" r="25" fill="#FF5B3A" stroke="#1F1A3D" strokeWidth="6" />
                  </motion.g>

                  {/* Shell */}
                  <rect x="96" y="78" width="228" height="190" rx="80" fill="url(#nodo-shell)" stroke="#1F1A3D" strokeWidth="6" />
                  <path d="M128 112 Q140 96 162 92" fill="none" stroke="#FFFFFF" strokeWidth="8" strokeLinecap="round" />

                  {/* Visor (moves a little more than the head = fake 3D turn) */}
                  <motion.g style={{ x: visorX, y: visorY }}>
                    <rect x="122" y="106" width="176" height="124" rx="54" fill="url(#nodo-visor)" stroke="#1F1A3D" strokeWidth="6" />
                    <path d="M144 134 Q152 120 172 116" fill="none" stroke="#FFFFFF" strokeOpacity="0.28" strokeWidth="7" strokeLinecap="round" />

                    {/* Cheeks */}
                    <motion.g animate={{ opacity: happy || hovered ? 1 : 0.75 }}>
                      <ellipse cx="151" cy="198" rx="12" ry="7" fill="#FF7EB6" />
                      <ellipse cx="269" cy="198" rx="12" ry="7" fill="#FF7EB6" />
                    </motion.g>

                    {/* Eyes */}
                    <motion.g style={{ x: eyesX, y: eyesY }}>
                      <motion.g
                        style={origin(210, 162)}
                        animate={{ scaleY: blink && !happy ? 0.08 : 1, scale: eyeScale }}
                        transition={{ duration: blink ? 0.07 : 0.18 }}
                      >
                        {happy ? (
                          <g fill="none" stroke="#5CF2C9" strokeWidth="9" strokeLinecap="round">
                            <path d="M164 168 Q178 146 192 168" />
                            <path d="M228 168 Q242 146 256 168" />
                          </g>
                        ) : (
                          <>
                            <g filter="url(#nodo-glow)" opacity="0.7">
                              <rect x="165" y="142" width="26" height="40" rx="13" fill="#5CF2C9" />
                              <rect x="229" y="142" width="26" height="40" rx="13" fill="#5CF2C9" />
                            </g>
                            <rect x="165" y="142" width="26" height="40" rx="13" fill="#5CF2C9" />
                            <rect x="229" y="142" width="26" height="40" rx="13" fill="#5CF2C9" />
                            <circle cx="184" cy="152" r="5" fill="#FFFFFF" />
                            <circle cx="248" cy="152" r="5" fill="#FFFFFF" />
                          </>
                        )}
                      </motion.g>

                      {/* Mouth */}
                      {happy ? (
                        <path d="M192 194 Q210 222 228 194 Z" fill="#5CF2C9" stroke="#5CF2C9" strokeWidth="4" strokeLinejoin="round" />
                      ) : (
                        <path d="M196 198 Q210 209 224 198" fill="none" stroke="#5CF2C9" strokeWidth="6" strokeLinecap="round" />
                      )}
                    </motion.g>
                  </motion.g>
                </motion.g>
              </motion.g>
            </motion.g>
          </svg>
        </button>
      </div>
    </div>
  )
}
