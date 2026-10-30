import { ArrowUpRight } from "lucide-react"
import { AUDIT_MESSAGE, whatsappUrl } from "@/lib/site"

const AUDIT_CHECKS = [
  "Tu perfil de Google Maps",
  "Velocidad y versión móvil de tu web",
  "Tus redes sociales",
  "Cómo aparecés cuando te buscan en Google",
]

export function Hero() {
  return (
    <section id="inicio" className="mx-auto max-w-7xl px-4 pb-20 pt-16 sm:px-6 md:pt-28 lg:px-8">
      <p className="mb-8 text-xs font-semibold uppercase tracking-[0.2em] text-primary">Agencia digital integral</p>

      <h1 className="max-w-5xl text-[3.25rem] font-black leading-[0.95] tracking-[-0.04em] text-zinc-950 sm:text-7xl lg:text-[7.5rem]">
        Diseñamos negocios que se <span className="text-primary">ven</span> y <span className="text-primary">venden</span>.
      </h1>

      <div className="mt-12 grid grid-cols-1 gap-12 border-t border-zinc-300 pt-10 lg:grid-cols-12">
        <p className="text-lg leading-relaxed text-zinc-600 lg:col-span-5 lg:col-start-1">
          Branding, páginas web, posicionamiento en Google e inteligencia artificial. Todo con un mismo equipo.
        </p>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Auditoría gratuita</p>
          <ul className="mt-4 divide-y divide-zinc-200 border-y border-zinc-200">
            {AUDIT_CHECKS.map((item, i) => (
              <li key={item} className="flex items-center gap-4 py-3.5 text-sm font-medium text-zinc-800">
                <span className="w-6 font-mono text-xs text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
            <a
              href={whatsappUrl(AUDIT_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center justify-center gap-2 bg-primary px-7 py-4 text-sm font-bold text-white transition-colors hover:bg-zinc-950"
            >
              Pedir auditoría por WhatsApp
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
            </a>
            <a href="#servicios" className="text-sm font-bold text-zinc-950 underline decoration-zinc-300 underline-offset-8 hover:decoration-primary">
              Ver servicios
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
