import * as React from "react"
import { ArrowUpRight, Menu, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { MagneticLink } from "./motion"

export const HOME_LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#proyectos", label: "Proyectos" },
  { href: "#protocolo", label: "Protocolo" },
  { href: "#precios", label: "Planes" },
  { href: "/contacto.html", label: "Contacto" },
]

export function HomeHeader() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = ""
    }
  }, [open])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[65] transition-[background-color,border-color,backdrop-filter] duration-500",
        scrolled || open
          ? "border-b border-white/[0.08] bg-ink-950/75 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav aria-label="Principal" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#inicio" className="flex items-center gap-3" aria-label="Enlace, volver al inicio">
          <img src="/logo-enlace.png" alt="" width={58} height={36} className="h-8 w-auto brightness-0 invert" />
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.22em] text-white/50 sm:inline">Enlace / Estudio</span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {HOME_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative rounded-full px-4 py-2 text-sm text-white/65 transition-colors hover:text-white focus-visible:text-white"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <MagneticLink href="#cotizar" strength={0.2} className="hidden h-11 px-5 text-sm sm:inline-flex">
            Cotizar proyecto
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticLink>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="menu-inicio"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white lg:hidden"
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="menu-inicio" className="h-[calc(100dvh-72px)] overflow-y-auto border-t border-white/[0.08] bg-ink-950 px-5 pb-10 pt-6 lg:hidden">
          <ul className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {HOME_LINKS.map((link, i) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline justify-between py-5 text-3xl font-medium tracking-[-0.03em] text-white"
                >
                  {link.label}
                  <span className="font-mono text-xs text-white/35">0{i + 1}</span>
                </a>
              </li>
            ))}
          </ul>
          <MagneticLink href="#cotizar" onClick={() => setOpen(false)} className="mt-8 h-14 w-full text-base">
            Cotizar proyecto
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </MagneticLink>
        </div>
      )}
    </header>
  )
}
