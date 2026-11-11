import * as React from "react"
import { ArrowUpRight, Mail } from "lucide-react"
import { SITE, whatsappUrl } from "@/lib/site"
import { MagneticLink, Reveal } from "./motion"
import { SectionLabel } from "./servicios"

const GROUPS = [
  {
    id: "tipo",
    legend: "¿Qué querés construir?",
    options: ["Sitio web", "Tienda online", "Plataforma a medida", "Marca + sitio", "Automatización con IA"],
  },
  { id: "etapa", legend: "¿En qué etapa está tu negocio?", options: ["Es una idea", "Ya está funcionando", "Necesito rediseñar"] },
  { id: "plazo", legend: "¿Para cuándo lo necesitás?", options: ["Lo antes posible", "En 1–2 meses", "Sin apuro"] },
] as const

type Answers = Record<(typeof GROUPS)[number]["id"], string>

export function Cotizar() {
  const [answers, setAnswers] = React.useState<Answers>({ tipo: "Sitio web", etapa: "Ya está funcionando", plazo: "En 1–2 meses" })
  const [name, setName] = React.useState("")

  const message = [
    `Hola${name.trim() ? `, soy ${name.trim()}` : ""}. Quiero cotizar un proyecto.`,
    `Proyecto: ${answers.tipo}`,
    `Etapa: ${answers.etapa}`,
    `Plazo: ${answers.plazo}`,
  ].join("\n")

  return (
    <section id="cotizar" aria-labelledby="cotizar-title" className="relative isolate overflow-hidden border-t border-white/[0.06]">
      <div aria-hidden="true" className="absolute -left-40 bottom-0 -z-10 h-[520px] w-[520px] rounded-full bg-electric/15 blur-[140px]" />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 md:py-36 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionLabel index="06">Cotizar</SectionLabel>
          <h2 id="cotizar-title" className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
            Contanos qué querés construir.
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
            Elegí tres opciones y armamos el mensaje por vos. Lo enviás por WhatsApp y te respondemos en menos de 24
            horas hábiles.
          </p>
          <a href={`mailto:${SITE.email}`} className="mt-8 inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white">
            <Mail className="h-4 w-4" aria-hidden="true" />
            ¿Preferís email? {SITE.email}
          </a>
        </Reveal>

        <Reveal delay={120} className="lg:col-span-7">
          <form
            onSubmit={(e) => e.preventDefault()}
            className="rounded-2xl border border-white/[0.08] bg-ink-900/80 p-6 backdrop-blur-sm md:p-9"
          >
            {GROUPS.map((g) => (
              <fieldset key={g.id} className="mb-7">
                <legend className="mb-3 text-sm font-medium text-white">{g.legend}</legend>
                <div className="flex flex-wrap gap-2">
                  {g.options.map((opt) => (
                    <label key={opt} className="cursor-pointer">
                      <input
                        type="radio"
                        name={g.id}
                        value={opt}
                        checked={answers[g.id] === opt}
                        onChange={() => setAnswers((a) => ({ ...a, [g.id]: opt }))}
                        className="peer sr-only"
                      />
                      <span className="inline-flex rounded-full border border-white/12 px-4 py-2 text-sm text-white/65 transition-all duration-200 hover:border-white/35 hover:text-white peer-checked:border-electric peer-checked:bg-electric/15 peer-checked:text-white peer-focus-visible:ring-2 peer-focus-visible:ring-electric peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-ink-900">
                        {opt}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}

            <label htmlFor="cotizar-nombre" className="mb-3 block text-sm font-medium text-white">
              Tu nombre <span className="text-white/40">(opcional)</span>
            </label>
            <input
              id="cotizar-nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Cómo te llamás"
              className="h-12 w-full rounded-xl border border-white/12 bg-ink-950/60 px-4 text-sm text-white outline-none transition-colors placeholder:text-white/30 focus:border-electric"
            />

            {/* Vista previa del mensaje: lo que va a llegar por WhatsApp */}
            <div className="mt-7 rounded-xl border border-white/[0.06] bg-ink-950 p-4">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/35">Mensaje que se envía</p>
              <pre aria-live="polite" className="whitespace-pre-wrap font-mono text-[12px] leading-6 text-signal/90">
                {message}
              </pre>
            </div>

            <MagneticLink
              href={whatsappUrl(message)}
              target="_blank"
              rel="noopener noreferrer"
              strength={0.15}
              className="mt-7 h-14 w-full text-base"
            >
              Cotizar proyecto
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </MagneticLink>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
