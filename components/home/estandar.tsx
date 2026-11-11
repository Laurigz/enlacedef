import { Reveal } from "./motion"
import { SectionLabel } from "./servicios"

const SPEC = [
  {
    k: "Rendimiento",
    v: "Core Web Vitals en verde. Imágenes AVIF y WebP, carga diferida, fuentes optimizadas y renderizado en el servidor cuando hace falta.",
  },
  {
    k: "Accesibilidad",
    v: "WCAG 2.2 nivel AA: contraste, navegación con teclado, textos alternativos y formularios con etiquetas reales.",
  },
  {
    k: "SEO técnico",
    v: "Metadatos, datos estructurados, sitemap y URLs limpias desde el primer día. Perfil de Google Maps conectado al sitio.",
    href: "/servicio-posicionamiento.html",
  },
  {
    k: "Medición",
    v: "Analítica y eventos de conversión configurados: sabés cuántas consultas trae el sitio y desde dónde.",
  },
  {
    k: "Infraestructura",
    v: "Hosting en red de borde, HTTPS, copias de seguridad y despliegues sin cortes.",
  },
  {
    k: "Propiedad",
    v: "El código, el dominio y los accesos quedan a tu nombre. Si un día cambiás de proveedor, te llevás todo.",
  },
]

export function Estandar() {
  return (
    <section aria-labelledby="estandar-title" className="mx-auto max-w-7xl px-5 py-24 sm:px-8 md:py-36">
      <div className="grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
          <SectionLabel index="04">Estándar</SectionLabel>
          <h2 id="estandar-title" className="mt-6 text-4xl font-semibold leading-[1.02] tracking-[-0.04em] text-white md:text-5xl">
            Lo que viene incluido, siempre.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-white/55">
            No son extras que se cotizan aparte. Es la especificación mínima de cualquier sitio que sale de Enlace.
          </p>
        </Reveal>

        <dl className="border-t border-white/10 lg:col-span-7 lg:col-start-6">
          {SPEC.map((s, i) => (
            <Reveal key={s.k} delay={i * 60} className="group grid gap-2 border-b border-white/10 py-7 sm:grid-cols-[180px_1fr] sm:gap-8">
              <dt className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.16em] text-white/45 transition-colors group-hover:text-signal">
                <span className="text-electric">{String(i + 1).padStart(2, "0")}</span>
                {s.k}
              </dt>
              <dd className="text-[15px] leading-relaxed text-white/75">
                {s.v}
                {s.href && (
                  <a href={s.href} className="ml-2 whitespace-nowrap text-electric underline-offset-4 hover:underline">
                    Ver servicio
                  </a>
                )}
              </dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  )
}
