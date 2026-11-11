import * as React from "react"
import { AnimatePresence, LayoutGroup, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ProjectMockup, type IconName, type MockVariant } from "./ProjectMockup"
import { ArrowRight, Reveal, SectionHeading } from "./ui"

type Category = "tienda" | "reservas" | "servicios"

type Project = {
  name: string
  url: string
  blurb: string
  tagline: string
  metric: string
  category: Category
  variant: MockVariant
  icon: IconName
  card: string // card background
  accent: string
  tint: string
  /** Grid span classes, only applied in the "Todos" view */
  span?: string
}

const PROJECTS: Project[] = [
  {
    name: "La Miga",
    url: "lamiga.mx",
    blurb: "Panadería de barrio que ahora recibe pedidos programados y cobra en línea.",
    tagline: "Pan de masa madre, directo a tu puerta",
    metric: "+38% pedidos online",
    category: "tienda",
    variant: "shop",
    icon: "bread",
    card: "bg-sun-light",
    accent: "#FF8A3D",
    tint: "#FFF0C2",
    span: "md:col-span-2",
  },
  {
    name: "Raíz Yoga",
    url: "raizyoga.com",
    blurb: "Agenda de clases con pagos y recordatorios automáticos.",
    tagline: "Respira. Reserva. Fluye.",
    metric: "120 reservas al mes",
    category: "reservas",
    variant: "booking",
    icon: "sun",
    card: "bg-mint-light",
    accent: "#2ED3A0",
    tint: "#CDF6E6",
  },
  {
    name: "Pedalea",
    url: "pedalea.bike",
    blurb: "Turnos de taller y alquiler de bicis por hora, sin llamadas.",
    tagline: "Tu bici como nueva en 48 h",
    metric: "2x turnos de taller",
    category: "reservas",
    variant: "booking",
    icon: "bike",
    card: "bg-sky-light",
    accent: "#4CB8FF",
    tint: "#D9EFFF",
  },
  {
    name: "Café Lunar",
    url: "cafelunar.co",
    blurb: "Cafetería de especialidad que vende su café en grano a todo el país.",
    tagline: "Café de especialidad, también de noche",
    metric: "+52% venta en grano",
    category: "tienda",
    variant: "shop",
    icon: "moon",
    card: "bg-lilac-light",
    accent: "#9B7BFF",
    tint: "#E9E1FF",
  },
  {
    name: "Patitas Club",
    url: "patitasclub.mx",
    blurb: "Paseadores de perros con cotizador por zona y formulario inteligente.",
    tagline: "Paseos felices, dueños tranquilos",
    metric: "−70% mensajes de WhatsApp",
    category: "servicios",
    variant: "landing",
    icon: "paw",
    card: "bg-bubble-light",
    accent: "#FF7EB6",
    tint: "#FFE0EE",
  },
  {
    name: "Huerta Viva",
    url: "huertaviva.mx",
    blurb: "Suscripción semanal de cajas orgánicas con cobro recurrente.",
    tagline: "Verduras de temporada, cada viernes",
    metric: "340 cajas por semana",
    category: "tienda",
    variant: "shop",
    icon: "sprout",
    card: "bg-coral-light",
    accent: "#43B66A",
    tint: "#DDF3E2",
  },
  {
    name: "Sofía Marín Nutrición",
    url: "sofiamarin.com",
    blurb: "Marca personal con recetas, blog y agenda de consultas en línea.",
    tagline: "Come rico, vive liviano",
    metric: "3x consultas agendadas",
    category: "servicios",
    variant: "landing",
    icon: "apple",
    card: "bg-cream-deep",
    accent: "#FF5B3A",
    tint: "#FFE1D8",
    span: "lg:col-span-2",
  },
]

const FILTERS: { id: "todos" | Category; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "tienda", label: "Tiendas online" },
  { id: "reservas", label: "Reservas" },
  { id: "servicios", label: "Servicios" },
]

const CATEGORY_LABEL: Record<Category, string> = {
  tienda: "Tienda online",
  reservas: "Reservas",
  servicios: "Servicios",
}

export function Projects() {
  const [filter, setFilter] = React.useState<(typeof FILTERS)[number]["id"]>("todos")
  const visible = filter === "todos" ? PROJECTS : PROJECTS.filter((p) => p.category === filter)

  return (
    <section id="portafolio" aria-labelledby="projects-title" className="relative py-20 sm:py-28">
      <div className="container">
        <SectionHeading
          id="projects-title"
          eyebrow="Proyectos"
          eyebrowDot="bg-sun"
          title={
            <>
              Negocios reales, <span className="text-coral">webs que venden</span>
            </>
          }
          intro="Cada proyecto empieza con una charla y termina con números que el cliente puede ver. Estos son algunos favoritos."
        />

        <Reveal className="mt-10 flex justify-center">
          <LayoutGroup id="filters">
            <div role="group" aria-label="Filtrar proyectos" className="flex flex-wrap justify-center gap-1 rounded-[1.6rem] border-2 border-ink bg-white p-1.5 shadow-pop-sm sm:gap-2 sm:rounded-full">
              {FILTERS.map((f) => {
                const active = filter === f.id
                const count = f.id === "todos" ? PROJECTS.length : PROJECTS.filter((p) => p.category === f.id).length
                return (
                  <button
                    key={f.id}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFilter(f.id)}
                    className={cn(
                      "relative rounded-full px-4 py-2 font-display text-[15px] font-medium transition-colors duration-200",
                      active ? "text-cream" : "text-ink hover:bg-sun-light",
                    )}
                  >
                    {active && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 rounded-full bg-ink"
                        transition={{ type: "spring", stiffness: 420, damping: 30 }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      {f.label}
                      <span
                        className={cn(
                          "grid h-5 min-w-5 place-items-center rounded-full px-1 text-[11px] font-bold",
                          active ? "bg-sun text-ink" : "bg-ink/10 text-ink",
                        )}
                      >
                        {count}
                      </span>
                    </span>
                  </button>
                )
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        <motion.ul layout className="mt-12 grid grid-flow-dense gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((p) => (
              <motion.li
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 26 }}
                className={cn(filter === "todos" && p.span)}
              >
                <ProjectCard project={p} wide={filter === "todos" && !!p.span} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        <Reveal className="mt-14 flex justify-center">
          <a href="/portfolio" className="btn btn-dark btn-lg group">
            Ver todos los proyectos
            <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

function ProjectCard({ project: p, wide }: { project: Project; wide: boolean }) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-4xl border-2 border-ink p-4 shadow-pop transition-[transform,box-shadow] duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] hover:-translate-y-1.5 hover:-rotate-[0.5deg] hover:shadow-pop-lg sm:p-5",
        p.card,
      )}
    >
      <ProjectMockup
        url={p.url}
        tagline={p.tagline}
        accent={p.accent}
        tint={p.tint}
        icon={p.icon}
        variant={p.variant}
        wide={wide}
      />
      <div className="mt-5 flex flex-1 flex-col px-1">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl font-semibold leading-tight">{p.name}</h3>
          <span className="mt-0.5 shrink-0 rounded-full border-2 border-ink bg-white px-2.5 py-0.5 font-display text-xs font-medium">
            {CATEGORY_LABEL[p.category]}
          </span>
        </div>
        <p className="mt-2 text-[15px] leading-relaxed text-ink-soft">{p.blurb}</p>
        <p className="mt-auto pt-4">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-ink px-3 py-1 font-display text-sm font-medium text-cream">
            <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
              <path d="M4 16l6-6 4 4 6-7" fill="none" stroke="#5CF2C9" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {p.metric}
          </span>
        </p>
      </div>
    </article>
  )
}
