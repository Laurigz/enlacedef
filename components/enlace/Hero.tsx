import type * as React from "react"
import { motion, type Variants } from "framer-motion"
import { Mascot } from "./Mascot"
import { QUOTE_HREF } from "./Header"
import { ArrowRight, Sparkle, Squiggle } from "./ui"

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}
const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 120, damping: 16 } },
}

const AVATARS = [
  { i: "MR", c: "bg-coral" },
  { i: "LC", c: "bg-sun" },
  { i: "DA", c: "bg-mint" },
  { i: "SP", c: "bg-lilac" },
]

function Float({
  children,
  className,
  delay = 0,
  amp = 10,
  innerClassName,
}: {
  children: React.ReactNode
  className?: string
  innerClassName?: string
  delay?: number
  amp?: number
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1, y: [0, -amp, 0] }}
      transition={{
        opacity: { delay: 0.5 + delay, duration: 0.3 },
        scale: { delay: 0.5 + delay, type: "spring", stiffness: 260, damping: 14 },
        y: { delay: 0.5 + delay, duration: 4 + delay * 2, repeat: Infinity, ease: "easeInOut" },
      }}
    >
      <div className={innerClassName}>{children}</div>
    </motion.div>
  )
}

export function Hero() {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative overflow-hidden pb-14 pt-28 sm:pt-32 lg:pb-20 lg:pt-36">
      {/* Backdrop */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="dot-grid absolute inset-0 [mask-image:radial-gradient(ellipse_at_60%_40%,black,transparent_70%)]" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-bubble-light" />
        <div className="absolute -right-16 bottom-0 hidden h-56 w-56 rounded-[38%_62%_55%_45%] bg-mint-light lg:block" />
      </div>

      <div className="container grid items-center gap-8 lg:grid-cols-[1.08fr_1fr] lg:gap-6">
        {/* Copy */}
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col items-start">
          <motion.span variants={rise} className="eyebrow">
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-mint" />
            </span>
            Agencia web para emprendedores
          </motion.span>

          <motion.h1
            id="hero-title"
            variants={rise}
            className="mt-6 font-display text-[clamp(2.7rem,7vw,5.4rem)] font-semibold leading-[0.98] tracking-[-0.02em] text-balance"
          >
            Tu negocio merece una web con{" "}
            <span className="relative inline-block whitespace-nowrap text-coral">
              chispa
              <Squiggle className="absolute -bottom-3 left-0 h-4 w-full sm:-bottom-4 sm:h-5" />
              <Sparkle className="absolute -right-7 -top-4 h-8 w-8 animate-spin-slow sm:-right-9 sm:h-10 sm:w-10" />
            </span>
            .
          </motion.h1>

          <motion.p variants={rise} className="mt-8 max-w-[34rem] text-lg leading-relaxed text-ink-soft sm:text-xl">
            Diseñamos y construimos webs rápidas, claras y con personalidad. Sin tecnicismos ni vueltas: tú pones la
            idea, nosotros el enlace.
          </motion.p>

          <motion.div variants={rise} className="mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <a href={QUOTE_HREF} className="btn btn-primary btn-lg group">
              Cotizar proyecto
              <ArrowRight className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href="#portafolio" className="btn btn-light btn-lg">
              Ver proyectos
            </a>
          </motion.div>

          <motion.div variants={rise} className="mt-10 flex items-center gap-4">
            <ul className="flex -space-x-3" aria-hidden="true">
              {AVATARS.map((a, idx) => (
                <li
                  key={a.i}
                  className={`${a.c} grid h-11 w-11 place-items-center rounded-full border-2 border-ink font-display text-sm font-semibold text-ink transition-transform duration-200 hover:-translate-y-1`}
                  style={{ zIndex: AVATARS.length - idx }}
                >
                  {a.i}
                </li>
              ))}
            </ul>
            <p className="text-[15px] leading-snug text-ink-soft">
              <span className="font-display text-base font-semibold text-ink">4.9/5</span> de{" "}
              <span className="font-semibold text-ink">60+ emprendedores</span>
              <br className="hidden sm:block" /> que ya venden en línea.
            </p>
          </motion.div>
        </motion.div>

        {/* Mascot stage */}
        <div className="relative mx-auto w-full max-w-[520px] lg:max-w-none">
          <motion.div
            aria-hidden="true"
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 14 }}
            style={{ x: "-50%", y: "-50%" }}
            className="absolute left-1/2 top-[56%] aspect-square w-[78%] rounded-full border-2 border-ink bg-sun shadow-pop-lg"
          />
          <div
            aria-hidden="true"
            className="absolute left-1/2 top-[56%] aspect-square w-[96%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-ink/25"
          />
          <Sparkle className="absolute left-[4%] top-[22%] h-9 w-9" color="#9B7BFF" />
          <Sparkle className="absolute bottom-[10%] right-[6%] h-7 w-7" color="#FF7EB6" />

          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 120, damping: 14, delay: 0.15 }}
            className="relative"
          >
            <Mascot className="relative mx-auto w-[78%] max-w-[440px] sm:w-[86%]" />
          </motion.div>

          {/* Floating proof cards */}
          <Float className="absolute right-0 top-[16%] sm:right-[2%] sm:top-[20%]" innerClassName="origin-top-right scale-[0.85] sm:scale-100" delay={0.1} amp={8}>
            <div className="flex items-center gap-2.5 rounded-2xl border-2 border-ink bg-mint-light px-3 py-2 shadow-pop-sm sm:px-3.5 sm:py-2.5">
              <span className="grid h-8 w-8 place-items-center rounded-xl border-2 border-ink bg-mint" aria-hidden="true">
                <svg viewBox="0 0 24 24" className="h-4 w-4">
                  <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" fill="#1F1A3D" />
                </svg>
              </span>
              <span className="leading-tight">
                <span className="block font-display text-lg font-semibold">0.8 s</span>
                <span className="block text-xs font-semibold text-ink-soft">de carga</span>
              </span>
            </div>
          </Float>

          <Float className="absolute bottom-[4%] left-0 sm:bottom-[14%] sm:left-[1%]" innerClassName="origin-bottom-left scale-[0.85] sm:scale-100" delay={0.3} amp={12}>
            <div className="rounded-2xl border-2 border-ink bg-white px-3.5 py-3 shadow-pop-sm">
              <div className="flex items-end gap-1.5" aria-hidden="true">
                {[30, 44, 38, 60, 76].map((h, i) => (
                  <motion.span
                    key={i}
                    className="w-3 rounded-t-md border-2 border-ink bg-lilac"
                    initial={{ height: 6 }}
                    animate={{ height: h * 0.5 }}
                    transition={{ delay: 0.9 + i * 0.08, type: "spring", stiffness: 200, damping: 12 }}
                  />
                ))}
              </div>
              <p className="mt-2 leading-tight">
                <span className="font-display text-lg font-semibold">+38%</span>{" "}
                <span className="text-xs font-semibold text-ink-soft">pedidos online</span>
              </p>
            </div>
          </Float>

          <Float className="absolute bottom-[3%] right-[8%] hidden sm:block" delay={0.5} amp={7}>
            <span className="chip bg-sky-light shadow-pop-sm">
              <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                <rect x="6" y="2" width="12" height="20" rx="3" fill="none" stroke="#1F1A3D" strokeWidth="2.4" />
                <path d="M10.5 18h3" stroke="#1F1A3D" strokeWidth="2.4" strokeLinecap="round" />
              </svg>
              100% móvil
            </span>
          </Float>
        </div>
      </div>
    </section>
  )
}
