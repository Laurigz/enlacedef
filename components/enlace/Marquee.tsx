import { Sparkle } from "./ui"

const ITEMS = [
  "Landing pages",
  "Tiendas online",
  "Reservas y turnos",
  "Marca personal",
  "SEO desde el día uno",
  "Webs que cargan rápido",
  "Soporte de verdad",
]
const COLORS = ["#FFC93C", "#2ED3A0", "#FF7EB6", "#4CB8FF", "#9B7BFF", "#FF5B3A", "#FFC93C"]

export function Marquee() {
  // Duplicated list so the -50% translate loops seamlessly.
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="relative z-10 -mx-4 py-6" aria-label="Lo que hacemos">
      <div className="group -rotate-[1.5deg] overflow-hidden border-y-2 border-ink bg-ink py-4 shadow-pop">
        <ul className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
          {row.map((item, i) => (
            <li
              key={i}
              aria-hidden={i >= ITEMS.length ? "true" : undefined}
              className="flex items-center gap-6 pr-6 font-display text-2xl font-medium text-cream sm:text-[28px]"
            >
              <span>{item}</span>
              <Sparkle className="h-6 w-6" color={COLORS[i % COLORS.length]} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
