import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Reveal, trackPointer } from "./motion"

export function SectionLabel({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
      <span className="text-electric">{index}</span>
      <span className="h-px w-8 bg-white/20" aria-hidden="true" />
      {children}
    </p>
  )
}

// ---------- Visuales de cada servicio (SVG/CSS, sin fotos) ----------

function WaterfallVisual() {
  const rows = [
    { label: "documento", w: 18, o: 0 },
    { label: "estilos", w: 14, o: 10 },
    { label: "fuentes", w: 16, o: 14 },
    { label: "script", w: 22, o: 16 },
    { label: "imagen.avif", w: 28, o: 20 },
  ]
  return (
    <div aria-hidden="true" className="relative mt-8 rounded-xl border border-white/[0.06] bg-ink-950/60 p-4 font-mono text-[10px] text-white/40">
      <div className="mb-3 flex justify-between uppercase tracking-[0.16em]">
        <span>Cascada de carga</span>
        <span className="text-signal">LCP</span>
      </div>
      <div className="relative space-y-2">
        {rows.map((r, i) => (
          <div key={r.label} className="grid grid-cols-[88px_1fr] items-center gap-3">
            <span className="truncate">{r.label}</span>
            <span className="relative h-2">
              <span
                className="absolute inset-y-0 rounded-full bg-electric/70 transition-all duration-700 ease-out group-hover:bg-electric"
                style={{ left: `${r.o}%`, width: `${r.w}%`, transitionDelay: `${i * 60}ms` }}
              />
            </span>
          </div>
        ))}
        <span className="absolute inset-y-0 w-px bg-signal/70" style={{ left: "calc(100px + (100% - 100px) * 0.48)" }} />
      </div>
    </div>
  )
}

function FlowVisual() {
  const steps = ["Catálogo", "Carrito", "Pago", "Envío"]
  return (
    <div aria-hidden="true" className="mt-8 flex items-center font-mono text-[10px] uppercase tracking-[0.14em] text-white/55">
      {steps.map((s, i) => (
        <React.Fragment key={s}>
          <span
            className={cn(
              "rounded-md border px-2.5 py-2 transition-colors duration-500",
              i === 2 ? "border-signal/50 text-signal" : "border-white/10 group-hover:border-electric/40",
            )}
          >
            {s}
          </span>
          {i < steps.length - 1 && (
            <span className="relative h-px flex-1 bg-white/15">
              <span className="absolute -top-[2px] left-0 h-[5px] w-[5px] rounded-full bg-electric opacity-0 group-hover:animate-[travel_1.4s_ease-in-out_infinite] group-hover:opacity-100" />
            </span>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

function BrandVisual() {
  const swatches = ["#05060a", "#4f7cff", "#5ef2c6", "#e8ebf2"]
  return (
    <div aria-hidden="true" className="mt-8 flex items-end justify-between gap-4">
      <span className="text-7xl font-semibold leading-none tracking-[-0.06em] text-white transition-transform duration-700 group-hover:-translate-y-1">
        Aa
      </span>
      <div className="flex gap-1.5">
        {swatches.map((c, i) => (
          <span
            key={c}
            className="h-14 w-6 rounded-sm border border-white/10 transition-transform duration-500 group-hover:-translate-y-2"
            style={{ backgroundColor: c, transitionDelay: `${i * 70}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

function TerminalVisual() {
  const lines = [
    { p: "→", t: "consulta entrante desde /cotizar" },
    { p: "→", t: "clasificada: tienda online · 1–2 meses" },
    { p: "→", t: "respuesta con propuesta base enviada" },
    { p: "✓", t: "llamada agendada en el calendario", ok: true },
  ]
  return (
    <div aria-hidden="true" className="mt-8 rounded-xl border border-white/[0.06] bg-ink-950/60 p-4 font-mono text-[11px] leading-6 text-white/50">
      {lines.map((l, i) => (
        <p
          key={l.t}
          className="translate-x-0 transition-all duration-500 group-hover:translate-x-1"
          style={{ transitionDelay: `${i * 80}ms` }}
        >
          <span className={l.ok ? "text-signal" : "text-electric"}>{l.p}</span> {l.t}
        </p>
      ))}
      <p className="mt-1 h-4 w-2 animate-pulse bg-white/60" />
    </div>
  )
}

const SERVICES = [
  {
    title: "Sitios de alto rendimiento",
    description:
      "Landing pages y sitios institucionales que cargan en menos de un segundo y llevan cada visita a una acción concreta: escribirte, reservar o comprar.",
    deliverables: ["Arquitectura de contenido", "UI a medida", "CMS editable", "SEO técnico"],
    href: "/servicio-web.html",
    visual: <WaterfallVisual />,
    span: "lg:col-span-7",
  },
  {
    title: "Tiendas y plataformas",
    description: "E-commerce y productos web con pagos, reservas o paneles. Integrados con Mercado Pago y tus herramientas.",
    deliverables: ["Checkout", "Suscripciones", "Paneles"],
    href: "/servicio-web.html",
    visual: <FlowVisual />,
    span: "lg:col-span-5",
  },
  {
    title: "Sistemas de marca",
    description: "Identidad visual pensada para pantallas: logo, tipografía, color y componentes que se reutilizan en todo.",
    deliverables: ["Logo", "Paleta", "Sistema de diseño"],
    href: "/servicio-branding.html",
    visual: <BrandVisual />,
    span: "lg:col-span-5",
  },
  {
    title: "Automatización e IA",
    description:
      "Chatbots entrenados con tu información y flujos que responden consultas, califican clientes y agendan, sin sumar personal.",
    deliverables: ["Chatbots", "Flujos automáticos", "Integraciones"],
    href: "/servicio-ia.html",
    visual: <TerminalVisual />,
    span: "lg:col-span-7",
  },
]

export function Servicios() {
  return (
    <section id="servicios" aria-labelledby="servicios-title" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-7">
          <SectionLabel index="01">Servicios</SectionLabel>
          <h2 id="servicios-title" className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
            Un sitio es infraestructura comercial.{" "}
            <span className="text-white/40">Lo construimos así.</span>
          </h2>
        </Reveal>
        <Reveal delay={120} className="self-end lg:col-span-4 lg:col-start-9">
          <p className="text-base leading-relaxed text-white/55">
            Estrategia, diseño y desarrollo en un mismo equipo. Sin plantillas compradas ni cadenas de proveedores: una
            sola responsabilidad de punta a punta.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-4 lg:grid-cols-12">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={i * 90} className={s.span}>
            <article
              onPointerMove={(e) => trackPointer(e)}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-ink-900 p-7 transition-colors duration-500 hover:border-white/20 md:p-9"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(520px circle at var(--x, 50%) var(--y, 50%), rgba(79,124,255,0.13), transparent 45%)",
                }}
              />
              <div className="flex items-start justify-between gap-6">
                <span className="font-mono text-xs text-white/35">0{i + 1}</span>
                <a
                  href={s.href}
                  aria-label={`Ver detalle de ${s.title}`}
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 after:absolute after:inset-0 after:z-10 after:rounded-2xl hover:border-white/40 hover:text-white group-hover:rotate-45 group-hover:border-electric group-hover:bg-electric group-hover:text-white"
                >
                  <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </a>
              </div>
              <h3 className="relative mt-10 text-2xl font-semibold tracking-[-0.03em] text-white md:text-3xl">{s.title}</h3>
              <p className="relative mt-3 max-w-lg text-[15px] leading-relaxed text-white/55">{s.description}</p>
              <ul className="relative mt-6 flex flex-wrap gap-2">
                {s.deliverables.map((d) => (
                  <li key={d} className="rounded-full border border-white/10 px-3 py-1 font-mono text-[11px] text-white/55">
                    {d}
                  </li>
                ))}
              </ul>
              <div className="relative mt-auto">{s.visual}</div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
