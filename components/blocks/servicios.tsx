import { ArrowUpRight } from "lucide-react"

const services = [
  {
    title: "Branding e identidad",
    description: "Logo, paleta, tipografía y manual de marca para que te reconozcan.",
    link: "/servicio-branding.html",
  },
  {
    title: "Diseño web",
    description: "Sitios rápidos, pensados primero para celular y armados para convertir.",
    link: "/servicio-web.html",
  },
  {
    title: "Posicionamiento SEO",
    description: "Tu web y tu perfil de Google Maps para aparecer cuando te buscan.",
    link: "/servicio-posicionamiento.html",
  },
  {
    title: "Inteligencia artificial",
    description: "Chatbots y automatizaciones que responden y ahorran horas de trabajo.",
    link: "/servicio-ia.html",
  },
]

export function Servicios() {
  return (
    <section id="servicios" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <h2 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-[-0.03em] text-zinc-950 md:text-6xl">
          Cuatro servicios. Un solo equipo.
        </h2>
        <p className="max-w-sm text-zinc-600">No coordinás cinco proveedores: el diseño, la web y el Google son del mismo lado.</p>
      </div>

      <ol className="border-t border-zinc-950">
        {services.map((service, i) => (
          <li key={service.title} className="border-b border-zinc-300">
            <a href={service.link} className="group grid grid-cols-[auto_1fr_auto] items-center gap-4 py-7 transition-colors hover:text-primary md:grid-cols-[4rem_1fr_1.4fr_auto] md:gap-8">
              <span className="font-mono text-sm text-zinc-400 group-hover:text-primary">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-2xl font-black tracking-[-0.02em] text-zinc-950 transition-colors group-hover:text-primary md:text-3xl">
                {service.title}
              </span>
              <span className="col-span-3 text-sm leading-relaxed text-zinc-600 md:col-span-1">{service.description}</span>
              <ArrowUpRight className="h-6 w-6 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}
