"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, X, ArrowRight, Cpu, Globe, Eye, Search, Palette, LineChart, FileText } from "lucide-react"
import MegaMenu, { MegaMenuItem } from "@/components/ui/mega-menu"

const LOGO_SVG = (
  <img 
    className="h-12 w-auto object-contain mix-blend-multiply drop-shadow-sm" 
    src="/logo-enlace.png" 
    alt="Enlace Agencia Digital Logo" 
  />
)

const NAV_LINKS = [
  { href: "#servicios", label: "Servicios", dropdown: true },
  { href: "portfolio.html", label: "Portafolio" },
  { href: "#precios", label: "Precios" },
  { href: "nosotros.html", label: "Nosotros" },
  { href: "blog.html", label: "Blog", dropdown: true },
  { href: "contacto.html", label: "Contacto" },
]

const NAV_ITEMS: MegaMenuItem[] = [
  {
    id: 1,
    label: "Servicios",
    subMenus: [
      {
        title: "Identidad",
        items: [
          {
            label: "Branding",
            description: "Construimos marcas",
            icon: Palette,
            link: "servicio-branding.html",
          },
          {
            label: "Diseño Visual",
            description: "Interfaces y UX",
            icon: Eye,
            link: "servicio-branding.html",
          },
        ],
      },
      {
        title: "Web & IA",
        items: [
          {
            label: "Páginas Web",
            description: "Desarrollo a medida",
            icon: Globe,
            link: "servicio-web.html",
          },
          {
            label: "Inteligencia Artificial",
            description: "Automatización",
            icon: Cpu,
            link: "servicio-ia.html",
          },
        ],
      },
      {
        title: "Crecimiento",
        items: [
          {
            label: "Posicionamiento SEO",
            description: "Llega a los primeros lugares",
            icon: Search,
            link: "servicio-posicionamiento.html",
          },
          {
            label: "Estrategia Digital",
            description: "Marketing y datos",
            icon: LineChart,
            link: "servicio-posicionamiento.html",
          },
        ],
      },
    ],
  },
  { id: 2, label: "Portafolio", link: "portfolio.html" },
  { id: 3, label: "Precios", link: "index.html#precios" },
  { id: 4, label: "Nosotros", link: "nosotros.html" },
  {
    id: 5,
    label: "Blog",
    subMenus: [
      {
        title: "Últimas entradas",
        items: [
          {
            label: "El Futuro de la IA en 2024",
            description: "Cómo la IA transformará los negocios",
            icon: FileText,
            link: "blog.html",
          },
        ],
      },
    ],
  },
  { id: 6, label: "Contacto", link: "contacto.html" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = React.useState(false)
  const [activeDropdown, setActiveDropdown] = React.useState<string | null>(null)

  return (
    <nav className="sticky top-0 z-[50] w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 transition-opacity hover:opacity-90">
          {LOGO_SVG}
        </a>

        {/* Desktop Navigation */}
        <div className="hidden items-center md:flex">
          <MegaMenu items={NAV_ITEMS} />
        </div>

        {/* CTA */}
        <div className="hidden items-center gap-4 md:flex">
          <a
            href="https://wa.me/+"
            className="rounded-full bg-zinc-900 px-6 py-2.5 text-sm font-bold text-white transition-all hover:bg-primary hover:shadow-lg dark:bg-zinc-50 dark:text-zinc-900"
          >
            Hablemos
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="rounded-md p-2 text-zinc-600 hover:bg-zinc-100 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-zinc-200 bg-white p-4 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
          <div className="flex flex-col gap-2">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="rounded-lg px-4 py-3 text-base font-medium text-zinc-900 hover:bg-zinc-100 dark:text-zinc-50 dark:hover:bg-zinc-800"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://wa.me/+"
              className="mt-4 rounded-xl bg-primary py-4 text-center text-base font-bold text-white"
              onClick={() => setIsOpen(false)}
            >
              Hablemos por WhatsApp
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

