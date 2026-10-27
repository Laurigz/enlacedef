import * as React from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

export type MegaMenuItem = {
  id: number
  label: string
  subMenus?: {
    title: string
    items: {
      label: string
      description: string
      icon: React.ElementType
      link: string
    }[]
  }[]
  link?: string
}

export interface MegaMenuProps extends React.HTMLAttributes<HTMLUListElement> {
  items: MegaMenuItem[]
  activePath?: string
}

const itemClass =
  "relative z-10 flex cursor-pointer items-center justify-center gap-1 rounded-full px-4 py-1.5 text-sm font-medium transition-colors duration-300 text-zinc-600 hover:text-zinc-900"

type Pill = { left: number; width: number; visible: boolean }

const MegaMenu = React.forwardRef<HTMLUListElement, MegaMenuProps>(
  ({ items, activePath, className, ...props }, ref) => {
    const [openMenu, setOpenMenu] = React.useState<number | null>(null)
    const [pill, setPill] = React.useState<Pill>({ left: 0, width: 0, visible: false })

    // Fondo gris que se desliza hasta el ítem bajo el cursor.
    const movePill = (e: React.SyntheticEvent<HTMLElement>) => {
      const el = e.currentTarget
      setPill({ left: el.offsetLeft, width: el.offsetWidth, visible: true })
    }
    const hidePill = () => setPill((p) => ({ ...p, visible: false }))

    return (
      <ul
        ref={ref}
        className={cn("relative flex items-center", className)}
        onMouseLeave={hidePill}
        {...props}
      >
        <li
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-y-0 left-0 rounded-full bg-zinc-100 transition-[transform,width,opacity] duration-300 ease-out",
            pill.visible ? "opacity-100" : "opacity-0",
          )}
          style={{ transform: `translateX(${pill.left}px)`, width: pill.width }}
        />

        {items.map((navItem) => {
          if (!navItem.subMenus) {
            const isActive = activePath === navItem.link?.replace(/\.html$/, "")
            return (
              <li key={navItem.id} className="relative" onMouseEnter={movePill}>
                <a
                  href={navItem.link}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(itemClass, isActive && "font-semibold text-zinc-900")}
                >
                  {navItem.label}
                </a>
              </li>
            )
          }

          const panelId = `mega-menu-${navItem.id}`
          return (
            <li
              key={navItem.id}
              className="relative"
              onMouseEnter={(e) => {
                movePill(e)
                setOpenMenu(navItem.id)
              }}
              onMouseLeave={() => setOpenMenu(null)}
              onBlur={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setOpenMenu(null)
              }}
              onKeyDown={(e) => {
                if (e.key === "Escape" && openMenu === navItem.id) {
                  setOpenMenu(null)
                  e.currentTarget.querySelector("button")?.focus()
                }
              }}
            >
              <button
                type="button"
                aria-expanded={openMenu === navItem.id}
                aria-controls={panelId}
                className={itemClass}
                onClick={() => setOpenMenu(openMenu === navItem.id ? null : navItem.id)}
              >
                {navItem.label}
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "h-4 w-4 transition-transform duration-300",
                    openMenu === navItem.id && "rotate-180",
                  )}
                />
              </button>

              {openMenu === navItem.id && (
                <div id={panelId} className="absolute left-1/2 top-full z-10 -translate-x-1/2 pt-3">
                  <div className="w-max rounded-[14px] border border-zinc-200 bg-white p-5 shadow-xl duration-200 animate-in fade-in slide-in-from-top-2">
                    <div className="flex gap-8">
                      {navItem.subMenus.map((sub) => (
                        <div key={sub.title}>
                          <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
                            {sub.title}
                          </p>
                          <ul className="space-y-4">
                            {sub.items.map((item) => {
                              const Icon = item.icon
                              return (
                                <li key={item.label}>
                                  <a href={item.link} className="group flex items-start gap-3">
                                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg border border-zinc-200 text-zinc-600 transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:text-primary">
                                      <Icon className="h-4 w-4" aria-hidden="true" />
                                    </span>
                                    <span className="leading-tight">
                                      <span className="block text-sm font-semibold text-zinc-900 transition-colors duration-300 group-hover:text-primary">
                                        {item.label}
                                      </span>
                                      <span className="mt-0.5 block text-xs text-zinc-500">{item.description}</span>
                                    </span>
                                  </a>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    )
  },
)

MegaMenu.displayName = "MegaMenu"

export default MegaMenu
