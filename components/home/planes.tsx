import * as React from "react"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { formatARS, whatsappUrl } from "@/lib/site"
import { Reveal, trackPointer } from "./motion"
import { SectionLabel } from "./servicios"

const TIERS = [
  {
    name: "Principiante",
    monthly: 25000,
    yearly: 250000,
    pitch: "Presencia local para micro negocios que recién empiezan en internet.",
    features: ["Perfil de Google Maps optimizado", "WhatsApp Business configurado", "Logotipo y paleta de colores"],
    cta: "Quiero impulsar mi local",
  },
  {
    name: "Avanzado",
    monthly: 49000,
    yearly: 490000,
    pitch: "Sitio propio para negocios que necesitan vender y ser encontrados.",
    features: ["Landing o sitio de hasta 5 secciones", "Branding y sistema visual", "Redes integradas al sitio", "SEO técnico básico"],
    cta: "Quiero mi sitio web",
    featured: true,
  },
]

export function Planes() {
  const [yearly, setYearly] = React.useState(false)

  return (
    <section id="precios" aria-labelledby="planes-title" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <Reveal>
          <SectionLabel index="05">Planes</SectionLabel>
          <h2 id="planes-title" className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
            Para empezar hoy.
          </h2>
          <p className="mt-4 max-w-md text-white/55">
            Planes mensuales en pesos. Los proyectos a medida se cotizan aparte.
          </p>
        </Reveal>
        <div role="group" aria-label="Período de facturación" className="inline-flex self-start rounded-full border border-white/15 p-1 md:self-auto">
          {[
            { label: "Mensual", value: false },
            { label: "Anual · 2 meses de regalo", value: true },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              aria-pressed={yearly === o.value}
              onClick={() => setYearly(o.value)}
              className={cn(
                "rounded-full px-5 py-2.5 text-sm transition-colors",
                yearly === o.value ? "bg-white text-ink-950" : "text-white/60 hover:text-white",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-14 grid gap-4 md:grid-cols-2">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 120}>
            <article
              onPointerMove={(e) => trackPointer(e)}
              className={cn(
                "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-8 md:p-10",
                t.featured ? "border-electric/50 bg-gradient-to-b from-electric/[0.12] to-ink-900" : "border-white/[0.08] bg-ink-900",
              )}
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(480px circle at var(--x,50%) var(--y,50%), rgba(79,124,255,0.12), transparent 45%)" }}
              />
              <div className="relative flex items-center justify-between">
                <h3 className="text-xl font-semibold text-white">{t.name}</h3>
                {t.featured && (
                  <span className="rounded-full bg-signal px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-ink-950">
                    Recomendado
                  </span>
                )}
              </div>
              <p className="relative mt-2 text-sm text-white/55">{t.pitch}</p>
              <p className="relative mt-8 flex items-baseline gap-2">
                <span className="text-5xl font-semibold tracking-[-0.04em] text-white">{formatARS(yearly ? t.yearly : t.monthly)}</span>
                <span className="font-mono text-xs text-white/45">/{yearly ? "año" : "mes"}</span>
              </p>
              <ul className="relative mt-8 space-y-3 border-t border-white/10 pt-6">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={whatsappUrl(`Hola, me interesa el plan ${t.name} (${yearly ? "anual" : "mensual"}).`)}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "relative mt-10 flex h-12 items-center justify-center rounded-full text-sm font-medium transition-colors",
                  t.featured ? "bg-white text-ink-950 hover:bg-signal" : "border border-white/15 text-white hover:border-white/40",
                )}
              >
                {t.cta}
              </a>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
