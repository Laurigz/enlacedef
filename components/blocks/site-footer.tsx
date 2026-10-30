import { Instagram, Linkedin, Mail, MessageCircle } from "lucide-react"
import { SERVICES, SITE, whatsappUrl } from "@/lib/site"

const linkClass = "text-sm font-medium text-slate-600 transition-colors hover:text-primary"

export function SiteFooter() {
  const socials = [
    { href: SITE.instagram, label: "Instagram", icon: Instagram },
    { href: SITE.linkedin, label: "LinkedIn", icon: Linkedin },
  ].filter((s) => s.href)

  return (
    <div className="mx-auto max-w-7xl px-4 pb-10 pt-16 sm:px-6 lg:px-8">
      <div className="grid gap-10 border-t-2 border-zinc-950 pt-10 md:grid-cols-[1.5fr_1fr_1fr_1.2fr]">
        <div>
          <a href="/" className="inline-block">
            <img src="/logo-enlace.png" alt="Enlace, ir al inicio" width={64} height={40} className="h-10 w-auto" />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-600">
            Agencia digital: branding, páginas web, posicionamiento SEO e inteligencia artificial para negocios.
          </p>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Servicios</p>
          <ul className="space-y-2">
            {SERVICES.map((s) => (
              <li key={s.href}>
                <a href={s.href} className={linkClass}>{s.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Agencia</p>
          <ul className="space-y-2">
            <li><a href="/#precios" className={linkClass}>Precios</a></li>
            <li><a href="/nosotros.html" className={linkClass}>Nosotros</a></li>
            <li><a href="/contacto.html" className={linkClass}>Contacto</a></li>
          </ul>
        </div>

        <div>
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-500">Contacto</p>
          <ul className="space-y-2">
            <li>
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" className={`${linkClass} inline-flex items-center gap-2`}>
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                {SITE.whatsappLabel}
              </a>
            </li>
            <li>
              <a href={`mailto:${SITE.email}`} className={`${linkClass} inline-flex items-center gap-2 break-all`}>
                <Mail className="h-4 w-4 shrink-0" aria-hidden="true" />
                {SITE.email}
              </a>
            </li>
          </ul>
          {socials.length > 0 && (
            <div className="mt-4 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-slate-500 transition-colors hover:text-primary"
                >
                  <s.icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="mt-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.name} Agencia Digital. Todos los derechos reservados.
      </p>
    </div>
  )
}
