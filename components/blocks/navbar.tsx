import * as React from "react"
import { Menu, X, Cpu, Globe, Search, Palette } from "lucide-react"
import MegaMenu, { MegaMenuItem } from "@/components/ui/mega-menu"
import { cn } from "@/lib/utils"
import { SERVICES, whatsappUrl } from "@/lib/site"

const SERVICE_ICONS = [Palette, Globe, Search, Cpu]
const services = SERVICES.map((s, i) => ({ ...s, icon: SERVICE_ICONS[i] }))

const NAV_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: "Servicios",
    subMenus: [
      {
        title: "Identidad y web",
        items: services.slice(0, 2).map((s) => ({ label: s.label, description: s.description, icon: s.icon, link: s.href })),
      },
      {
        title: "Crecimiento",
        items: services.slice(2).map((s) => ({ label: s.label, description: s.description, icon: s.icon, link: s.href })),
      },
    ],
  },
  { id: 2, label: "Precios", link: "/#precios" },
  { id: 3, label: "Nosotros", link: "/nosotros.html" },
  { id: 4, label: "Contacto", link: "/contacto.html" },
]

const MOBILE_LINKS = [
  { href: "/#precios", label: "Precios" },
  { href: "/nosotros.html", label: "Nosotros" },
  { href: "/contacto.html", label: "Contacto" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  // Vercel sirve /contacto y /contacto.html: se compara sin la extensión.
  const path = window.location.pathname.replace(/\/index\.html$/, "/").replace(/\.html$/, "")
  const isCurrent = (href: string) => path === href.replace(/\.html$/, "")

  React.useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false)
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [isOpen])

  return (
    <nav aria-label="Principal" className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
      <a href="/" className="flex items-center transition-opacity hover:opacity-80">
        <img src="/logo-enlace.png" alt="Enlace, ir al inicio" width={64} height={40} className="h-9 w-auto" />
      </a>

      <div className="hidden md:flex">
        <MegaMenu items={NAV_ITEMS} activePath={path} />
      </div>

      <a
        href={whatsappUrl("Hola, quiero hablar sobre un proyecto.")}
        target="_blank"
        rel="noopener noreferrer"
        className="hidden rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-colors hover:bg-primary md:inline-flex"
      >
        Hablemos por WhatsApp
      </a>

      <button
        type="button"
        className="rounded-md p-2 text-zinc-700 hover:bg-zinc-100 md:hidden"
        aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={isOpen}
        aria-controls="menu-movil"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
      </button>

      {isOpen && (
        <div
          id="menu-movil"
          className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto border-b border-zinc-200 bg-white p-4 shadow-lg md:hidden"
        >
          <p className="px-4 pb-1 pt-2 text-[11px] font-bold uppercase tracking-widest text-zinc-500">Servicios</p>
          <ul className="mb-2 border-b border-zinc-100 pb-2">
            {services.map((s) => (
              <li key={s.href}>
                <a
                  href={s.href}
                  aria-current={isCurrent(s.href) ? "page" : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100",
                    isCurrent(s.href) && "text-primary",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  <s.icon className="h-4 w-4 text-zinc-400" aria-hidden="true" />
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
          <ul>
            {MOBILE_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isCurrent(link.href) ? "page" : undefined}
                  className={cn(
                    "block rounded-lg px-4 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100",
                    isCurrent(link.href) && "text-primary",
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={whatsappUrl("Hola, quiero hablar sobre un proyecto.")}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-xl bg-primary py-4 text-center text-base font-bold text-white"
            onClick={() => setIsOpen(false)}
          >
            Hablemos por WhatsApp
          </a>
        </div>
      )}
    </nav>
  )
}
