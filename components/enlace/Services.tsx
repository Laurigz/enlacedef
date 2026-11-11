import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Reveal, SectionHeading } from "./ui"

const INK = "#1F1A3D"
const s = { stroke: INK, strokeWidth: 3, strokeLinecap: "round" as const, strokeLinejoin: "round" as const }

const ICONS = {
  design: (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <rect x="5" y="9" width="38" height="28" rx="6" fill="#fff" {...s} />
      <path d="M5 17h38" {...s} />
      <circle cx="11" cy="13" r="1.4" fill={INK} />
      <circle cx="16" cy="13" r="1.4" fill={INK} />
      <rect x="11" y="22" width="12" height="9" rx="2.5" fill="#FFC93C" {...s} />
      <path d="M28 24h9M28 29h6" {...s} />
      <path d="M33 33l4 10 2-4 4-2-10-4Z" fill="#FF7EB6" {...s} />
    </svg>
  ),
  shop: (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <path d="M9 16h30l-2.5 24a3 3 0 0 1-3 2.7h-19a3 3 0 0 1-3-2.7L9 16Z" fill="#fff" {...s} />
      <path d="M17 20v-6a7 7 0 0 1 14 0v6" fill="none" {...s} />
      <path d="M19 31l4 4 7-8" fill="none" {...s} stroke="#2ED3A0" strokeWidth={3.5} />
    </svg>
  ),
  seo: (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <circle cx="21" cy="21" r="13" fill="#fff" {...s} />
      <path d="M31 31l10 10" {...s} strokeWidth={5} />
      <path d="M14 25l5-5 3 3 6-7" fill="none" {...s} stroke="#4CB8FF" strokeWidth={3.5} />
    </svg>
  ),
  care: (
    <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
      <path
        d="M24 41S7 31.5 7 19.5C7 13.7 11.3 9 16.6 9c3.4 0 5.9 1.8 7.4 4.4C25.5 10.8 28 9 31.4 9 36.7 9 41 13.7 41 19.5 41 31.5 24 41 24 41Z"
        fill="#fff"
        {...s}
      />
      <path d="M15 23h5l2-4 4 8 2-4h5" fill="none" {...s} stroke="#9B7BFF" strokeWidth={3.2} />
    </svg>
  ),
}

const SERVICES = [
  {
    icon: ICONS.design,
    title: "Diseño web a medida",
    text: "Una web que se parece a tu marca, no a una plantilla.",
    points: ["Diseño 100% original", "Textos que convierten", "Perfecta en celular"],
    tag: "3 a 4 semanas",
    card: "bg-coral-light",
    tile: "bg-coral",
  },
  {
    icon: ICONS.shop,
    title: "Tiendas online",
    text: "Vende las 24 horas con pagos, envíos e inventario en un solo panel.",
    points: ["Mercado Pago y Stripe", "Envíos automáticos", "Panel fácil de usar"],
    tag: "4 a 6 semanas",
    card: "bg-mint-light",
    tile: "bg-mint",
  },
  {
    icon: ICONS.seo,
    title: "SEO y velocidad",
    text: "Que te encuentren en Google y que nadie espere a que cargue.",
    points: ["Carga en menos de 1 s", "SEO local y en Maps", "Analítica desde el día 1"],
    tag: "Incluido siempre",
    card: "bg-sky-light",
    tile: "bg-sky",
  },
  {
    icon: ICONS.care,
    title: "Cuidado mensual",
    text: "Cambios, actualizaciones y soporte por WhatsApp. Tú te enfocas en vender.",
    points: ["Respuesta en 24 h hábiles", "Respaldos diarios", "Reporte de resultados"],
    tag: "Plan mensual",
    card: "bg-lilac-light",
    tile: "bg-lilac",
  },
]

const STEPS = [
  {
    n: "1",
    title: "Charlamos 30 minutos",
    text: "Nos cuentas de tu negocio y tus metas. En 24 h tienes una propuesta con precio cerrado.",
    color: "bg-sun",
  },
  {
    n: "2",
    title: "Diseñamos contigo",
    text: "Ves avances cada semana y opinas en cada paso. Nada de sorpresas al final.",
    color: "bg-bubble",
  },
  {
    n: "3",
    title: "Lanzamos y crecemos",
    text: "Publicamos, te enseñamos a usarla y medimos resultados juntos.",
    color: "bg-mint",
  },
]

export function Services() {
  return (
    <section id="servicios" aria-labelledby="services-title" className="relative overflow-hidden border-y-2 border-ink bg-white py-20 sm:py-28">
      <div aria-hidden="true" className="dot-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:linear-gradient(to_bottom,black,transparent_45%)]" />

      <div className="container relative">
        <SectionHeading
          id="services-title"
          eyebrow="Servicios"
          eyebrowDot="bg-mint"
          title={
            <>
              Todo lo que tu negocio necesita para <span className="text-coral">brillar en línea</span>
            </>
          }
          intro="Un solo equipo para diseñar, construir y cuidar tu web. Sin intermediarios y sin letra chica."
        />

        <ul className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {SERVICES.map((sv, i) => (
            <Reveal as="li" key={sv.title} delay={i * 0.08}>
              <article
                className={cn(
                  "group flex h-full flex-col rounded-4xl border-2 border-ink p-6 shadow-pop transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-2 hover:shadow-pop-lg",
                  sv.card,
                )}
              >
                <div
                  className={cn(
                    "grid h-16 w-16 -rotate-6 place-items-center rounded-2xl border-2 border-ink shadow-pop-sm transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:rotate-6 group-hover:scale-110",
                    sv.tile,
                  )}
                >
                  {sv.icon}
                </div>
                <h3 className="mt-6 font-display text-2xl font-semibold leading-tight">{sv.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{sv.text}</p>
                <ul className="mt-5 flex flex-col gap-2.5">
                  {sv.points.map((pt) => (
                    <li key={pt} className="flex items-center gap-2.5 text-[15px] font-semibold">
                      <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 border-ink bg-white" aria-hidden="true">
                        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5">
                          <path d="M2 6.5 5 9l5-6" fill="none" stroke={INK} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {pt}
                    </li>
                  ))}
                </ul>
                <p className="mt-auto pt-7">
                  <span className="chip text-[13px]">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                      <circle cx="12" cy="12" r="9" fill="none" stroke={INK} strokeWidth="2.4" />
                      <path d="M12 7v5l3 2" fill="none" stroke={INK} strokeWidth="2.4" strokeLinecap="round" />
                    </svg>
                    {sv.tag}
                  </span>
                </p>
              </article>
            </Reveal>
          ))}
        </ul>

        {/* Process */}
        <div id="proceso" className="mt-24 scroll-mt-28 sm:mt-32">
          <SectionHeading
            eyebrow="Cómo trabajamos"
            eyebrowDot="bg-bubble"
            title="Tres pasos y tu web está en el aire"
          />

          <div className="relative mt-14">
            {/* Dashed "link" connecting the steps */}
            <svg
              aria-hidden="true"
              viewBox="0 0 1000 80"
              preserveAspectRatio="none"
              className="absolute left-[12%] right-[12%] top-6 hidden h-20 w-[76%] md:block"
            >
              <motion.path
                d="M0 40 C 160 -10, 330 90, 500 40 S 840 -10, 1000 40"
                fill="none"
                stroke={INK}
                strokeWidth="3"
                strokeDasharray="10 12"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true, margin: "-20%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
              />
            </svg>

            <ol className="relative grid gap-10 md:grid-cols-3 md:gap-8">
              {STEPS.map((st, i) => (
                <Reveal as="li" key={st.n} delay={0.15 + i * 0.15} className="flex flex-col items-center text-center">
                  <span
                    className={cn(
                      "grid h-20 w-20 place-items-center rounded-full border-2 border-ink font-display text-4xl font-semibold shadow-pop transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1 hover:rotate-6",
                      st.color,
                    )}
                    aria-hidden="true"
                  >
                    {st.n}
                  </span>
                  <h3 className="mt-6 font-display text-2xl font-semibold">
                    <span className="sr-only">Paso {st.n}: </span>
                    {st.title}
                  </h3>
                  <p className="mt-2 max-w-xs text-[15px] leading-relaxed text-ink-soft">{st.text}</p>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
