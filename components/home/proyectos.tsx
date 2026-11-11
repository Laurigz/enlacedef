import * as React from "react"
import { cn } from "@/lib/utils"
import { Reveal, resetPointer, trackPointer } from "./motion"
import { SectionLabel } from "./servicios"

// ---------- Portadas: cada proyecto tiene su propia dirección de arte, hecha con SVG/CSS ----------

function CoverNomade() {
  return (
    <div className="absolute inset-0 bg-[#1b100b]">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none">
        {[34, 56, 78, 100, 122, 144, 166].map((r, i) => (
          <circle key={r} cx="300" cy="90" r={r} stroke="#e2703a" strokeOpacity={0.55 - i * 0.06} strokeWidth="1" />
        ))}
        <circle cx="300" cy="90" r="22" fill="#e2703a" fillOpacity="0.9" />
      </svg>
      <div className="absolute left-[8%] top-[24%] font-serif text-[clamp(3rem,7vw,5.5rem)] italic leading-none tracking-[-0.03em] text-[#f3e3d3]">
        nómade
      </div>
      <div className="absolute left-[8%] top-[46%] hidden gap-2 font-mono sm:flex text-[10px] uppercase tracking-[0.14em] text-[#f3e3d3]/70">
        <span className="rounded-full border border-[#f3e3d3]/25 px-3 py-1.5">Suscripción · cada 15 días</span>
        <span className="rounded-full bg-[#e2703a] px-3 py-1.5 text-[#1b100b]">Molienda: espresso</span>
      </div>
    </div>
  )
}

function CoverKora() {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie"]
  return (
    <div className="absolute inset-0 bg-[#0d2620]">
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(239,233,218,0.08) 1px, transparent 1px), linear-gradient(to bottom, rgba(239,233,218,0.08) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="absolute -right-[4%] top-[2%] font-serif text-[clamp(12rem,26vw,20rem)] leading-none text-transparent [-webkit-text-stroke:1px_rgba(239,233,218,0.35)]">
        K
      </div>
      <div className="absolute left-[8%] top-[16%] w-[58%] min-w-[230px] rounded-xl border border-[#efe9da]/15 bg-[#0a1f1a]/80 p-4 backdrop-blur-sm">
        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#efe9da]/50">Consulta inicial · 45 min</p>
        <div className="mt-3 grid grid-cols-5 gap-1.5">
          {days.map((d, i) => (
            <div key={d} className="space-y-1.5">
              <p className="text-center font-mono text-[9px] uppercase text-[#efe9da]/45">{d}</p>
              {[0, 1, 2].map((s) => (
                <div
                  key={s}
                  className={cn(
                    "h-5 rounded-[4px] border",
                    i === 1 && s === 1 ? "border-[#c9b37e] bg-[#c9b37e]" : "border-[#efe9da]/12",
                  )}
                />
              ))}
            </div>
          ))}
        </div>
        <p className="mt-3 font-mono text-[10px] text-[#c9b37e]">Martes 14:30 · seña confirmada</p>
      </div>
    </div>
  )
}

function CoverVertice() {
  return (
    <div className="absolute inset-0 bg-[#0b0b0b]">
      <div
        className="absolute inset-0 opacity-[0.12]"
        style={{ backgroundImage: "repeating-linear-gradient(135deg, #d4ff3a 0 1px, transparent 1px 18px)" }}
      />
      <div className="absolute left-[6%] top-[16%] text-[clamp(6rem,14vw,10rem)] font-black uppercase leading-[0.8] tracking-[-0.06em] text-[#d4ff3a]">
        V/
      </div>
      <div className="absolute right-[7%] top-[18%] w-[44%] min-w-[170px] space-y-2">
        {[
          { c: "HIIT", h: "07:00", s: "3 lugares" },
          { c: "Fuerza", h: "08:30", s: "Completo", full: true },
          { c: "Movilidad", h: "19:00", s: "8 lugares" },
        ].map((r) => (
          <div
            key={r.c}
            className={cn(
              "flex items-center justify-between rounded-md border px-3 py-2 font-mono text-[10px] uppercase tracking-[0.1em]",
              r.full ? "border-white/10 text-white/35 line-through" : "border-[#d4ff3a]/40 text-[#d4ff3a]",
            )}
          >
            <span>{r.c}</span>
            <span>{r.h}</span>
            <span>{r.s}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function CoverLumen() {
  return (
    <div className="absolute inset-0 bg-gradient-to-br from-[#c7d1ff] via-[#dfe4ff] to-[#f3f4fb]">
      <svg viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none">
        <g stroke="#1b2048" strokeWidth="2.5">
          <circle cx="150" cy="128" r="54" />
          <circle cx="262" cy="128" r="54" />
          <path d="M204 124 q2 -10 4 0" />
          <path d="M96 118 L64 104" />
          <path d="M316 118 L348 104" />
        </g>

      </svg>
      <p className="absolute left-[8%] top-[20%] font-mono text-[10px] uppercase tracking-[0.16em] text-[#1b2048]/70">
        Rostro detectado · ajuste 98%
      </p>
      <p className="absolute right-[8%] top-[10%] text-2xl font-semibold tracking-[-0.04em] text-[#1b2048]">lumen</p>
    </div>
  )
}

function CoverFluxo() {
  const nodes: [number, number][] = [
    [60, 210], [170, 120], [300, 190], [430, 90], [560, 170], [690, 80], [800, 150],
  ]
  return (
    <div className="absolute inset-0 bg-[#0a1430]">
      <svg viewBox="0 0 900 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" fill="none">
        <g stroke="#3b5bdb" strokeOpacity="0.35" strokeWidth="1">
          {Array.from({ length: 12 }).map((_, i) => (
            <path key={i} d={`M0 ${30 + i * 24} C 220 ${10 + i * 26}, 560 ${60 + i * 20}, 900 ${20 + i * 25}`} />
          ))}
        </g>
        <path
          d={`M${nodes.map(([x, y]) => `${x} ${y}`).join(" L")}`}
          stroke="#ff7a1a"
          strokeWidth="2"
          strokeDasharray="6 6"
          className="[animation:dash_14s_linear_infinite]"
        />
        {nodes.map(([x, y], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r="9" fill="#0a1430" stroke="#ff7a1a" strokeWidth="1.5" />
            <circle cx={x} cy={y} r="3" fill="#ff7a1a" />
          </g>
        ))}
      </svg>
      <div className="absolute right-[5%] top-[12%] hidden w-64 rounded-xl border border-white/10 bg-[#0d1a3d]/90 p-4 font-mono text-[10px] uppercase tracking-[0.12em] text-white/55 md:block">
        <p className="text-white/35">Cotización instantánea</p>
        <p className="mt-2 flex justify-between text-white">
          <span>CABA → Rosario</span>
          <span className="text-[#ff7a1a]">48 h</span>
        </p>
        <p className="mt-1 flex justify-between">
          <span>Pallets</span>
          <span>4</span>
        </p>
      </div>
    </div>
  )
}

const PROJECTS = [
  {
    name: "Nómade Café",
    category: "E-commerce · Suscripciones",
    year: "2026",
    summary: "Tienda de café de especialidad con suscripción recurrente y checkout en dos pasos.",
    specs: [
      ["Rol", "Marca, UX/UI, desarrollo"],
      ["Stack", "Next.js · Shopify · Mercado Pago"],
      ["Clave", "Suscripción con pausa y cambio de molienda"],
      ["Plazo", "7 semanas"],
    ],
    cover: <CoverNomade />,
    layout: "lg:col-span-7",
    dark: true,
  },
  {
    name: "Kora Abogados",
    category: "Sitio institucional · Turnos",
    year: "2026",
    summary: "Sitio para un estudio jurídico con agenda de consultas y seña online.",
    specs: [
      ["Rol", "Estrategia, UI, desarrollo"],
      ["Stack", "Astro · Sanity · Cal.com"],
      ["Clave", "Turnos con pago anticipado"],
      ["Plazo", "4 semanas"],
    ],
    cover: <CoverKora />,
    layout: "lg:col-span-5",
    dark: true,
  },
  {
    name: "Vértice Training",
    category: "Plataforma · Reservas",
    year: "2025",
    summary: "App web para reservar clases, administrar cupos y cobrar abonos mensuales.",
    specs: [
      ["Rol", "Producto, UI, desarrollo"],
      ["Stack", "React · Supabase · Mercado Pago"],
      ["Clave", "Lista de espera automática"],
      ["Plazo", "9 semanas"],
    ],
    cover: <CoverVertice />,
    layout: "lg:col-span-5",
    dark: true,
  },
  {
    name: "Lumen Óptica",
    category: "E-commerce · IA",
    year: "2025",
    summary: "Catálogo de anteojos con probador virtual que detecta el rostro desde la cámara.",
    specs: [
      ["Rol", "UX/UI, desarrollo, IA"],
      ["Stack", "Next.js · MediaPipe · Tiendanube"],
      ["Clave", "Probador en el navegador, sin instalar nada"],
      ["Plazo", "8 semanas"],
    ],
    cover: <CoverLumen />,
    layout: "lg:col-span-7",
    dark: false,
  },
  {
    name: "Fluxo Logística",
    category: "B2B · Cotizador",
    year: "2026",
    summary: "Sitio para una operadora logística con cotizador de envíos y seguimiento en vivo.",
    specs: [
      ["Rol", "Estrategia, UI, desarrollo"],
      ["Stack", "Next.js · Node · Google Maps"],
      ["Clave", "Cotización en el momento, sin llamadas"],
      ["Plazo", "6 semanas"],
    ],
    cover: <CoverFluxo />,
    layout: "lg:col-span-12",
    dark: true,
  },
]

function ProjectCard({ project, index }: { project: (typeof PROJECTS)[number]; index: number }) {
  const titleId = `proyecto-${index}`
  return (
    <article
      tabIndex={0}
      aria-labelledby={titleId}
      onPointerMove={(e) => trackPointer(e, 7)}
      onPointerLeave={resetPointer}
      className="group relative flex h-full min-h-[480px] flex-col justify-end overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900 outline-none transition-[transform,border-color,box-shadow] duration-500 ease-out [transform:perspective(1400px)_rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:border-white/25 hover:shadow-[0_40px_120px_-40px_rgba(79,124,255,0.55)] focus-visible:border-electric md:min-h-[540px]"
    >
      {/* Portada con parallax interno */}
      <div
        aria-hidden="true"
        className="absolute inset-[-12px] transition-transform [transition-duration:1100ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05] group-focus-visible:scale-[1.05]"
        style={{ translate: "calc(var(--px, 0) * -12px) calc(var(--py, 0) * -12px)" }}
      >
        {project.cover}
      </div>

      {/* Lectura del texto y spotlight */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 h-[62%] bg-gradient-to-t from-ink-950 via-ink-950/75 to-transparent transition-[height] duration-700 group-hover:h-[78%]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 mix-blend-screen transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: "radial-gradient(420px circle at var(--x, 50%) var(--y, 50%), rgba(94,242,198,0.16), transparent 50%)" }}
      />

      {/* Barra superior técnica */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-3 whitespace-nowrap p-5 font-mono text-[10px] uppercase tracking-[0.18em] md:p-7">
        <span className={cn("rounded-full px-2.5 py-1 backdrop-blur-md", project.dark ? "bg-black/40 text-white/75" : "bg-white/60 text-[#1b2048]")}>
          {String(index + 1).padStart(2, "0")} · {project.year}
        </span>
        <span
          className={cn(
            "truncate rounded-full px-2.5 py-1 backdrop-blur-md transition-colors duration-300",
            project.dark ? "bg-black/40 text-white/75" : "bg-white/60 text-[#1b2048]",
            "group-hover:bg-signal group-hover:text-ink-950",
          )}
        >
          {project.category}
        </span>
      </div>

      {/* Contenido */}
      <div className="relative p-5 md:p-7">
        <h3 id={titleId} className="text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-white/65">{project.summary}</p>

        <dl
          className={cn(
            "mt-5 grid grid-cols-2 gap-x-6 gap-y-3 overflow-hidden border-t border-white/15 pt-4 transition-all duration-500 ease-out sm:grid-cols-4",
            "[@media(hover:hover)]:max-h-0 [@media(hover:hover)]:border-transparent [@media(hover:hover)]:pt-0 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:translate-y-3",
            "[@media(hover:hover)]:group-hover:max-h-56 [@media(hover:hover)]:group-hover:border-white/15 [@media(hover:hover)]:group-hover:pt-4 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-hover:translate-y-0",
            "[@media(hover:hover)]:group-focus-visible:max-h-56 [@media(hover:hover)]:group-focus-visible:border-white/15 [@media(hover:hover)]:group-focus-visible:pt-4 [@media(hover:hover)]:group-focus-visible:opacity-100 [@media(hover:hover)]:group-focus-visible:translate-y-0",
          )}
        >
          {project.specs.map(([k, v], i) => (
            <div key={k} className="transition-all duration-500" style={{ transitionDelay: `${80 + i * 50}ms` }}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-signal">{k}</dt>
              <dd className="mt-1 text-[13px] leading-snug text-white/85">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  )
}

export function Proyectos() {
  return (
    <section id="proyectos" aria-labelledby="proyectos-title" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <SectionLabel index="02">Proyectos</SectionLabel>
          <h2 id="proyectos-title" className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
            Trabajo seleccionado.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p className="max-w-sm text-base leading-relaxed text-white/55">
            Cada proyecto arranca con un problema de negocio y termina en un producto que se puede medir. Pasá el
            cursor para ver el detalle técnico.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.name} delay={(i % 2) * 120} className={p.layout}>
            <ProjectCard project={p} index={i} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
