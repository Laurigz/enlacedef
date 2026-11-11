import * as React from "react"
import { motion, type Variants } from "framer-motion"
import { cn } from "@/lib/utils"

/* ------------------------------------------------------------------ */
/* Logo: two rounded chain links that interlock — "enlace" = link.     */
/* ------------------------------------------------------------------ */
export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      <rect width="48" height="48" rx="14" fill="#FF5B3A" />
      <rect x="6" y="16" width="22" height="16" rx="8" fill="none" stroke="#1F1A3D" strokeWidth="4.5" />
      <rect x="20" y="16" width="22" height="16" rx="8" fill="none" stroke="#FFF7EC" strokeWidth="4.5" />
      {/* Re-draw a sliver of the first link on top so the two links read as interlocked */}
      <path d="M19 16 h1 a8 8 0 0 1 8 8" fill="none" stroke="#1F1A3D" strokeWidth="4.5" />
    </svg>
  )
}

export function Logo({ className, tone = "ink" }: { className?: string; tone?: "ink" | "cream" }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark className="h-9 w-9 shrink-0 transition-transform duration-300 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-12 group-hover:scale-110" />
      <span
        className={cn(
          "font-display text-[26px] font-semibold leading-none tracking-tight",
          tone === "ink" ? "text-ink" : "text-cream",
        )}
      >
        enlace
      </span>
    </span>
  )
}

/* ------------------------------------------------------------------ */
/* Scroll-reveal wrapper                                               */
/* ------------------------------------------------------------------ */
const revealVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 110, damping: 18, delay },
  }),
}

export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: "div" | "li" | "article" | "header"
}) {
  const Comp = motion[as] as typeof motion.div
  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      variants={revealVariants}
      custom={delay}
    >
      {children}
    </Comp>
  )
}

/* ------------------------------------------------------------------ */
/* Section heading                                                     */
/* ------------------------------------------------------------------ */
export function SectionHeading({
  eyebrow,
  eyebrowDot = "bg-coral",
  title,
  intro,
  id,
  align = "center",
}: {
  eyebrow: string
  eyebrowDot?: string
  title: React.ReactNode
  intro?: string
  id?: string
  align?: "center" | "left"
}) {
  return (
    <Reveal
      as="header"
      className={cn(
        "flex flex-col gap-5",
        align === "center" ? "mx-auto max-w-3xl items-center text-center" : "max-w-2xl items-start text-left",
      )}
    >
      <span className="eyebrow">
        <span className={cn("h-2.5 w-2.5 rounded-full border-2 border-ink", eyebrowDot)} aria-hidden="true" />
        {eyebrow}
      </span>
      <h2 id={id} className="font-display text-[clamp(2.1rem,4.6vw,3.5rem)] font-semibold leading-[1.04] tracking-tight text-balance">
        {title}
      </h2>
      {intro && <p className="max-w-xl text-lg leading-relaxed text-ink-soft">{intro}</p>}
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */
/* Little decorative doodles                                           */
/* ------------------------------------------------------------------ */
export function Squiggle({ className, color = "#FFC93C" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 220 24" preserveAspectRatio="none" className={className} aria-hidden="true">
      <path
        d="M4 16 C 26 4, 44 4, 62 14 S 98 24, 116 12 S 152 2, 172 12 S 204 20, 216 8"
        fill="none"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
      />
    </svg>
  )
}

export function Sparkle({ className, color = "#FFC93C" }: { className?: string; color?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <path
        d="M20 2 C 22 13, 27 18, 38 20 C 27 22, 22 27, 20 38 C 18 27, 13 22, 2 20 C 13 18, 18 13, 20 2 Z"
        fill={color}
        stroke="#1F1A3D"
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function ArrowRight({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("h-5 w-5", className)} aria-hidden="true">
      <path d="M4 12h15m-6-6 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
