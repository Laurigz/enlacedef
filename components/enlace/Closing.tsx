import { motion } from "framer-motion"
import { QUOTE_HREF } from "./Header"
import { ArrowRight, Logo, Reveal, Sparkle } from "./ui"

const WHATSAPP = "https://wa.me/525512345678"

export function CtaBand() {
  return (
    <section id="contacto" aria-labelledby="cta-title" className="py-20 sm:py-28">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-5xl border-2 border-ink bg-coral px-6 py-14 text-center shadow-pop-lg sm:px-12 sm:py-20">
            {/* Decorations */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute -left-20 -top-20 h-36 w-36 rounded-full border-2 border-ink bg-sun sm:-left-16 sm:-top-16 sm:h-56 sm:w-56" />
              <div className="absolute -bottom-28 -right-20 h-40 w-40 rounded-[42%_58%_48%_52%] border-2 border-ink bg-bubble sm:-bottom-20 sm:-right-10 sm:h-64 sm:w-64" />
              <motion.div
                className="absolute right-5 top-5 sm:right-[12%] sm:top-[14%]"
                animate={{ rotate: 360 }}
                transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
              >
                <Sparkle className="h-7 w-7 sm:h-10 sm:w-10" color="#FFF7EC" />
              </motion.div>
              <Sparkle className="absolute bottom-[18%] left-[10%] hidden h-8 w-8 md:block" color="#9B7BFF" />
            </div>

            <div className="relative mx-auto max-w-2xl">
              <h2 id="cta-title" className="font-display text-[clamp(2.2rem,5.4vw,4rem)] font-semibold leading-[1.02] tracking-tight text-ink text-balance">
                ¿Tienes una idea? Hagámosla web.
              </h2>
              <p className="mx-auto mt-5 max-w-lg text-lg font-semibold leading-relaxed text-ink/80">
                Cuéntanos de tu negocio. En 24 h hábiles te enviamos una propuesta con precio cerrado y fechas claras.
              </p>
              <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
                <a href={QUOTE_HREF} className="btn btn-dark btn-lg group w-full sm:w-auto">
                  Cotizar proyecto
                  <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
                </a>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="btn btn-light btn-lg w-full sm:w-auto">
                  <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                    <path
                      d="M4 20l1.3-3.9A8 8 0 1 1 8 18.8L4 20Z"
                      fill="#2ED3A0"
                      stroke="#1F1A3D"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Escríbenos por WhatsApp
                  <span className="sr-only">(se abre en una pestaña nueva)</span>
                </a>
              </div>
              <p className="mt-6 text-sm font-semibold text-ink/75">Sin compromiso · Respuesta en 24 h hábiles</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

const FOOTER_LINKS = [
  {
    title: "Explora",
    links: [
      { label: "Proyectos", href: "#portafolio" },
      { label: "Servicios", href: "#servicios" },
      { label: "Cómo trabajamos", href: "#proceso" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Páginas web", href: "/servicio-web" },
      { label: "Branding", href: "/servicio-branding" },
      { label: "Posicionamiento SEO", href: "/servicio-posicionamiento" },
      { label: "Inteligencia artificial", href: "/servicio-ia" },
    ],
  },
  {
    title: "Hablemos",
    links: [
      { label: "Cotizar proyecto", href: QUOTE_HREF },
      { label: "Nosotros", href: "/nosotros" },
      { label: "Instagram", href: "https://instagram.com/enlaceagencia", external: true },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/enlace-agencia", external: true },
    ],
  },
]

export function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-ink text-cream">
      <div className="container grid gap-12 py-16 md:grid-cols-[1.3fr_2fr]">
        <div className="max-w-xs">
          <a href="/" className="group inline-flex rounded-full" aria-label="Enlace, ir al inicio">
            <Logo tone="cream" />
          </a>
          <p className="mt-5 leading-relaxed text-cream/75">
            Webs con chispa para emprendedores con ganas. Diseñadas y construidas por personas, cuidadas por Nodo.
          </p>
        </div>
        <nav aria-label="Pie de página" className="grid grid-cols-2 gap-8 sm:grid-cols-3">
          {FOOTER_LINKS.map((col) => (
            <div key={col.title}>
              <h2 className="font-display text-sm font-semibold uppercase tracking-[0.14em] text-sun">{col.title}</h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      {...("external" in l && l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="inline-block rounded-md text-cream/85 transition-[color,transform] duration-200 hover:translate-x-1 hover:text-white"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
      <div className="border-t border-cream/15">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-sm text-cream/70 sm:flex-row">
          <p>© {new Date().getFullYear()} Enlace. Hecho con cariño y mucho café.</p>
          <a href="#inicio" className="rounded-full font-semibold text-cream/85 hover:text-white">
            Volver arriba ↑
          </a>
        </div>
      </div>
    </footer>
  )
}
