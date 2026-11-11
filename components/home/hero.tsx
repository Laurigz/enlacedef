import * as React from "react"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { MagneticLink } from "./motion"

// three.js pesa ~150 KB: se descarga aparte, después de pintar el texto del hero.
const HeroScene = React.lazy(() => import("./hero-scene"))

const SPECS = [
  { k: "Core Web Vitals", v: "en verde, medidos en producción" },
  { k: "TypeScript", v: "de punta a punta" },
  { k: "WCAG 2.2 AA", v: "accesible por defecto" },
  { k: "El código es tuyo", v: "repositorio y accesos a tu nombre" },
]

// Respaldo estático mientras carga WebGL (o si el navegador no lo soporta).
function SceneFallback({ hidden }: { hidden: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 600 420"
      className={cn("absolute inset-0 h-full w-full transition-opacity duration-1000", hidden && "opacity-0")}
      fill="none"
    >
      <g stroke="#4f7cff" strokeOpacity="0.55" strokeWidth="1.2">
        <path d="M110 300 L230 230 L330 205 L440 150 L520 110" strokeOpacity="0.35" />
        <rect x="88" y="278" width="44" height="44" transform="rotate(18 110 300)" />
        <rect x="205" y="205" width="50" height="50" transform="rotate(-12 230 230)" />
        <rect x="305" y="180" width="50" height="50" transform="rotate(30 330 205)" />
        <rect x="415" y="125" width="50" height="50" transform="rotate(8 440 150)" />
        <rect x="500" y="90" width="40" height="40" transform="rotate(-22 520 110)" />
      </g>
    </svg>
  )
}

export function Hero() {
  const [ready, setReady] = React.useState(false)
  const onReady = React.useCallback(() => setReady(true), [])

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      {/* Retícula técnica de fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-30 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_40%,black,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div
        aria-hidden="true"
        className="absolute -right-40 top-10 -z-20 h-[640px] w-[640px] rounded-full bg-electric/20 blur-[140px] md:right-0"
      />

      {/* Escena 3D: arriba en celular, a la derecha en escritorio */}
      <div
        className={cn(
          "absolute inset-x-0 top-[64px] -z-10 h-[400px]",
          "[mask-image:linear-gradient(to_bottom,black_60%,transparent)]",
          "md:inset-y-0 md:left-auto md:right-0 md:top-0 md:h-auto md:w-[64%]",
          "md:[mask-image:linear-gradient(to_right,transparent,black_28%)]",
        )}
      >
        <SceneFallback hidden={ready} />
        <div className={cn("h-full w-full transition-opacity duration-1000", ready ? "opacity-100" : "opacity-0")}>
          <React.Suspense fallback={null}>
            <HeroScene onReady={onReady} />
          </React.Suspense>
        </div>
      </div>

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-[340px] sm:px-8 md:justify-center md:pb-12 md:pt-32">
        <div className="max-w-3xl">
          <p className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
            <span className="flex items-center gap-2 text-signal">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-signal" />
              </span>
              Agenda abierta
            </span>
            <span>Diseño e ingeniería web</span>
          </p>

          <h1
            id="hero-title"
            className="mt-6 text-[2.75rem] font-semibold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl xl:text-[5rem]"
          >
            Diseñamos como producto.
            <br />
            <span className="text-white/40">
              Construimos como <span className="text-white">software.</span>
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-relaxed text-white/60 md:text-lg">
            Enlace diseña y desarrolla sitios de alto rendimiento para emprendedores: arquitectura que escala,
            interfaces que convierten y código que no vas a tener que rehacer el año que viene.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <MagneticLink href="#cotizar" className="h-14 pl-7 pr-2 text-base">
              Cotizar proyecto
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-ink-950 transition-transform duration-300 group-hover/mag:rotate-45">
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </span>
            </MagneticLink>
            <MagneticLink href="#proyectos" variant="ghost" strength={0.15} className="h-14 px-7 text-base">
              Ver proyectos
              <ArrowDownRight className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
          </div>
        </div>

        <dl className="mt-14 grid grid-cols-2 border-t border-white/10 md:mt-16 md:grid-cols-4">
          {SPECS.map((s, i) => (
            <div
              key={s.k}
              className={cn(
                "border-white/10 py-5 pr-4",
                i % 2 === 1 && "border-l pl-4 md:pl-6",
                i >= 2 && "border-t md:border-t-0",
                i === 2 && "md:border-l md:pl-6",
              )}
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/40">0{i + 1}</dt>
              <dd className="mt-2 text-sm text-white">
                {s.k}
                <span className="block text-white/45">{s.v}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
