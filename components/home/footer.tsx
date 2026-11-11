import { SERVICES, SITE, whatsappUrl } from "@/lib/site"
import { HOME_LINKS } from "./header"

const linkClass = "text-sm text-white/55 transition-colors hover:text-white"

export function HomeFooter() {
  const socials = [
    { href: SITE.instagram, label: "Instagram" },
    { href: SITE.linkedin, label: "LinkedIn" },
  ].filter((s) => s.href)

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <img src="/logo-enlace.png" alt="Enlace" width={64} height={40} className="h-9 w-auto brightness-0 invert" />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/50">
              Estudio de diseño e ingeniería web para emprendedores.
            </p>
          </div>
          <nav aria-label="Servicios" className="md:col-span-3 md:col-start-6">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">Servicios</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.href}>
                  <a href={s.href} className={linkClass}>{s.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <nav aria-label="Secciones" className="md:col-span-2">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">Estudio</p>
            <ul className="space-y-2.5">
              {[...HOME_LINKS, { href: "/nosotros.html", label: "Nosotros" }].map((l) => (
                <li key={l.href}>
                  <a href={l.href} className={linkClass}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="md:col-span-2">
            <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.18em] text-white/35">Contacto</p>
            <ul className="space-y-2.5">
              <li>
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  {SITE.whatsappLabel}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className={`${linkClass} break-all`}>{SITE.email}</a>
              </li>
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.href} target="_blank" rel="noopener noreferrer" className={linkClass}>{s.label}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="mt-20 select-none bg-gradient-to-b from-white/[0.2] to-transparent bg-clip-text text-center text-[24vw] font-semibold leading-[0.75] tracking-[-0.07em] text-transparent md:text-[19vw] xl:text-[15rem]"
        >
          enlace
        </p>
        <div className="flex flex-col justify-between gap-2 border-t border-white/[0.06] py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-white/35 sm:flex-row">
          <p>© {new Date().getFullYear()} Enlace Estudio Digital</p>
          <p>Hecho a mano en Argentina</p>
        </div>
      </div>
    </footer>
  )
}
