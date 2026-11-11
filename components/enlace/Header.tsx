import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { ArrowRight, Logo } from "./ui"

export const QUOTE_HREF = "/contacto"

const NAV = [
  { label: "Proyectos", href: "#portafolio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo trabajamos", href: "#proceso" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Blog", href: "/blog" },
]

export function Header() {
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile menu with Escape and when resizing up to desktop
  React.useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false)
    const onResize = () => window.innerWidth >= 1024 && setOpen(false)
    window.addEventListener("keydown", onKey)
    window.addEventListener("resize", onResize)
    return () => {
      window.removeEventListener("keydown", onKey)
      window.removeEventListener("resize", onResize)
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5 sm:pt-4">
      <div
        className={cn(
          "mx-auto flex max-w-[1240px] items-center justify-between gap-4 rounded-full border-2 py-2 pl-4 pr-2 transition-all duration-300 sm:pl-5",
          scrolled || open
            ? "border-ink bg-white/90 shadow-pop backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <a href="/" className="group rounded-full" aria-label="Enlace, ir al inicio">
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="group relative inline-flex rounded-full px-4 py-2 font-display text-[16px] font-medium text-ink transition-colors hover:bg-sun-light"
                >
                  <span className="transition-transform duration-200 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-translate-y-0.5">
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a href={QUOTE_HREF} className="btn btn-primary btn-md group hidden sm:inline-flex">
            Cotizar proyecto
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
          </a>

          <button
            type="button"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border-2 border-ink bg-white shadow-pop-sm transition-transform active:translate-x-0.5 active:translate-y-0.5 active:shadow-none lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((o) => !o)}
          >
            <span className="sr-only">Menú</span>
            <span aria-hidden="true" className="relative block h-3.5 w-5">
              <span
                className={cn(
                  "absolute left-0 top-0 h-[2.5px] w-5 rounded-full bg-ink transition-all duration-300",
                  open && "top-1/2 -translate-y-1/2 rotate-45",
                )}
              />
              <span
                className={cn(
                  "absolute bottom-0 left-0 h-[2.5px] w-5 rounded-full bg-ink transition-all duration-300",
                  open && "bottom-1/2 translate-y-1/2 -rotate-45",
                )}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Menú móvil"
            initial={{ opacity: 0, y: -12, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="mx-auto mt-3 max-w-[1240px] origin-top rounded-4xl border-2 border-ink bg-white p-3 shadow-pop lg:hidden"
          >
            <ul className="flex flex-col">
              {NAV.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-xl font-medium text-ink hover:bg-sun-light"
                  >
                    {item.label}
                    <ArrowRight className="h-4 w-4 opacity-50" />
                  </a>
                </motion.li>
              ))}
            </ul>
            <a href={QUOTE_HREF} className="btn btn-primary btn-lg mt-2 w-full">
              Cotizar proyecto
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
