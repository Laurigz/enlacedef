import { Reveal } from "./motion"
import { SectionLabel } from "./servicios"

const PHASES = [
  {
    title: "Descubrimiento",
    time: "Semana 1",
    text: "Entrevista, análisis de tu competencia y auditoría de lo que ya tenés. Definimos qué tiene que lograr el sitio y cómo lo vamos a medir.",
    outputs: ["Brief técnico", "Mapa del sitio", "Métricas objetivo"],
  },
  {
    title: "Arquitectura y diseño",
    time: "Semanas 2–3",
    text: "Estructura de contenido, sistema visual y prototipo navegable. Aprobás pantallas reales, no bocetos.",
    outputs: ["Prototipo", "Sistema de diseño"],
  },
  {
    title: "Desarrollo",
    time: "Semanas 3–6",
    text: "Construimos en un entorno de prueba con acceso para vos. Cada avance queda publicado y lo revisás desde tu celular.",
    outputs: ["Entorno de prueba", "CMS", "Integraciones"],
  },
  {
    title: "Lanzamiento y crecimiento",
    time: "Desde la semana 6",
    text: "Publicamos, configuramos la analítica y medimos. Con un plan mensual seguimos mejorando con datos.",
    outputs: ["Dominio y hosting", "Analítica", "Plan de mejoras"],
  },
]

export function Protocolo() {
  return (
    <section id="protocolo" aria-labelledby="protocolo-title" className="relative border-y border-white/[0.06] bg-ink-900/60">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
        <Reveal className="max-w-3xl">
          <SectionLabel index="03">Protocolo</SectionLabel>
          <h2 id="protocolo-title" className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-6xl">
            Cuatro bloques. <span className="text-white/40">Cada uno valida al siguiente.</span>
          </h2>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/55">
            Igual que en una cadena, ningún bloque se agrega sin verificar el anterior. Sabés en qué etapa está tu
            proyecto y qué recibís en cada una.
          </p>
        </Reveal>

        <ol className="relative mt-20 grid gap-10 lg:grid-cols-4 lg:gap-6">
          {/* Riel con un pulso que lo recorre */}
          <span aria-hidden="true" className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-px bg-white/10 lg:left-0 lg:top-[7px] lg:h-px lg:w-full">
            <span className="absolute left-0 top-0 hidden h-px w-24 bg-gradient-to-r from-transparent via-signal to-transparent [animation:rail_6s_linear_infinite] lg:block" />
          </span>

          {PHASES.map((p, i) => (
            <Reveal as="li" key={p.title} delay={i * 110} className="relative pl-10 lg:pl-0 lg:pt-12">
              <span
                aria-hidden="true"
                className="absolute left-0 top-1 flex h-[15px] w-[15px] items-center justify-center border border-electric bg-ink-950 lg:top-0"
              >
                <span className="h-[5px] w-[5px] bg-electric" />
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                Bloque 0{i + 1} · <span className="text-signal">{p.time}</span>
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-white">{p.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">{p.text}</p>
              <ul className="mt-5 space-y-1.5 border-t border-white/10 pt-4">
                {p.outputs.map((o) => (
                  <li key={o} className="flex items-center gap-2 font-mono text-[11px] text-white/60">
                    <span className="h-1 w-1 bg-electric" aria-hidden="true" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
