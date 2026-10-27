import { ArrowRight, Layout, Rocket, Brain, Search, Palette, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "Branding e identidad",
    description: "Logo, paleta, tipografía y manual de marca para que te reconozcan y te recuerden.",
    icon: Palette,
    color: "bg-orange-500",
    link: "/servicio-branding.html",
  },
  {
    title: "Diseño web",
    description: "Sitios rápidos, pensados primero para celular y armados para convertir visitas en consultas.",
    icon: Layout,
    color: "bg-blue-600",
    link: "/servicio-web.html",
  },
  {
    title: "Soluciones de IA",
    description: "Chatbots y automatizaciones que responden consultas y ahorran horas de trabajo manual.",
    icon: Brain,
    color: "bg-purple-600",
    link: "/servicio-ia.html",
  },
  {
    title: "Posicionamiento SEO",
    description: "Optimizamos tu web y tu perfil de Google Maps para que te encuentren cuando te buscan.",
    icon: Search,
    color: "bg-emerald-600",
    link: "/servicio-posicionamiento.html",
  },
  {
    title: "Estrategia digital",
    description: "Definimos objetivos, canales y métricas para que cada peso invertido tenga un propósito.",
    icon: Rocket,
    color: "bg-red-500",
    link: "/servicio-posicionamiento.html",
  },
  {
    title: "Gestión de redes",
    description: "Contenido para Instagram y otras redes que genera conversación con tu comunidad.",
    icon: MessageSquare,
    color: "bg-sky-500",
    link: "/contacto.html",
  },
]

export function Servicios() {
  return (
    <section id="servicios" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Servicios que impulsan tu <span className="italic text-primary">crecimiento</span>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Creatividad y tecnología en un mismo equipo, para que no tengas que coordinar cinco proveedores.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {services.map((service) => (
            <a
              key={service.title}
              href={service.link}
              className="group relative flex flex-col rounded-3xl border border-slate-200 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10"
            >
              <span
                className={cn(
                  "mb-6 flex h-12 w-12 items-center justify-center rounded-2xl text-white shadow-lg",
                  service.color,
                )}
              >
                <service.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mb-3 text-xl font-bold text-slate-900 transition-colors group-hover:text-primary">
                {service.title}
              </h3>
              <p className="leading-relaxed text-slate-600">{service.description}</p>
              <span className="mt-6 flex items-center text-sm font-bold text-primary">
                Saber más
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
