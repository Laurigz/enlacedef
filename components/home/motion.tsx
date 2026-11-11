import * as React from "react"
import { cn } from "@/lib/utils"

const prefersReducedMotion = () =>
  typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches

// Aparición al entrar en pantalla. Un solo IntersectionObserver por elemento, se desconecta al revelarse.
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className,
  children,
  ...props
}: {
  as?: React.ElementType
  delay?: number
  className?: string
  children: React.ReactNode
} & React.HTMLAttributes<HTMLElement>) {
  const ref = React.useRef<HTMLElement>(null)
  const [shown, setShown] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (prefersReducedMotion()) {
      setShown(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          io.disconnect()
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={cn(
        "transition-[opacity,transform,filter] [transition-duration:900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]",
        shown ? "translate-y-0 opacity-100 blur-0" : "translate-y-6 opacity-0 blur-[2px]",
        className,
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

// Botón/enlace magnético: se desplaza hacia el cursor y proyecta un brillo que lo sigue.
export const MagneticLink = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { strength?: number; variant?: "primary" | "ghost" }
>(({ strength = 0.3, variant = "primary", className, children, onPointerMove, onPointerLeave, ...props }, forwardedRef) => {
  const innerRef = React.useRef<HTMLAnchorElement>(null)
  React.useImperativeHandle(forwardedRef, () => innerRef.current as HTMLAnchorElement)

  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    onPointerMove?.(e)
    const el = innerRef.current
    if (!el || e.pointerType !== "mouse" || prefersReducedMotion()) return
    const r = el.getBoundingClientRect()
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    el.style.setProperty("--mx", `${x}px`)
    el.style.setProperty("--my", `${y}px`)
    el.style.transform = `translate(${(x - r.width / 2) * strength}px, ${(y - r.height / 2) * strength}px)`
  }
  const leave = (e: React.PointerEvent<HTMLAnchorElement>) => {
    onPointerLeave?.(e)
    if (innerRef.current) innerRef.current.style.transform = ""
  }

  return (
    <a
      ref={innerRef}
      onPointerMove={move}
      onPointerLeave={leave}
      className={cn(
        "group/mag relative isolate inline-flex items-center justify-center gap-3 overflow-hidden rounded-full font-medium transition-[transform,box-shadow,background-color,color] duration-300 ease-out will-change-transform",
        variant === "primary"
          ? "bg-electric text-white shadow-[0_0_0_1px_rgba(255,255,255,0.12)_inset,0_10px_40px_-10px_rgba(79,124,255,0.7)] hover:shadow-[0_0_0_1px_rgba(255,255,255,0.25)_inset,0_14px_60px_-8px_rgba(79,124,255,0.95)]"
          : "border border-white/15 text-white hover:border-white/40 hover:bg-white/[0.04]",
        className,
      )}
      {...props}
    >
      {variant === "primary" && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover/mag:opacity-100"
          style={{
            background:
              "radial-gradient(120px circle at var(--mx, 50%) var(--my, 50%), rgba(94,242,198,0.55), transparent 70%)",
          }}
        />
      )}
      {children}
    </a>
  )
})
MagneticLink.displayName = "MagneticLink"

// Guarda la posición del cursor como variables CSS (--x, --y, --rx, --ry) para spotlights e inclinaciones.
export function trackPointer(e: React.PointerEvent<HTMLElement>, tilt = 0) {
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const px = (e.clientX - r.left) / r.width
  const py = (e.clientY - r.top) / r.height
  el.style.setProperty("--x", `${px * 100}%`)
  el.style.setProperty("--y", `${py * 100}%`)
  if (tilt && e.pointerType === "mouse" && !prefersReducedMotion()) {
    el.style.setProperty("--rx", `${(0.5 - py) * tilt}deg`)
    el.style.setProperty("--ry", `${(px - 0.5) * tilt}deg`)
    el.style.setProperty("--px", `${(px - 0.5) * 2}`)
    el.style.setProperty("--py", `${(py - 0.5) * 2}`)
  }
}

export function resetPointer(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  el.style.setProperty("--rx", "0deg")
  el.style.setProperty("--ry", "0deg")
  el.style.setProperty("--px", "0")
  el.style.setProperty("--py", "0")
}
