import { cn } from "@/lib/utils"

export type IconName = "bread" | "sun" | "bike" | "moon" | "paw" | "sprout" | "apple"
export type MockVariant = "shop" | "booking" | "landing"

const INK = "#1F1A3D"

export function ProjectIcon({ name, fill, className }: { name: IconName; fill: string; className?: string }) {
  const common = { fill, stroke: INK, strokeWidth: 3, strokeLinejoin: "round" as const, strokeLinecap: "round" as const }
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {name === "bread" && (
        <>
          <path d="M8 31C8 19 15 12 24 12s16 7 16 19v5a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-5Z" {...common} />
          <path d="M18 21l-3 6M25.5 19.5l-3 6.5M33 21l-3 6" {...common} fill="none" />
        </>
      )}
      {name === "sun" && (
        <>
          <path d="M10 32a14 14 0 0 1 28 0Z" {...common} />
          <path d="M24 9v4M11 15l3 3M37 15l-3 3M5 38h38" {...common} fill="none" />
        </>
      )}
      {name === "bike" && (
        <>
          <circle cx="13" cy="31" r="8" {...common} fill="#fff" />
          <circle cx="35" cy="31" r="8" {...common} fill="#fff" />
          <path d="M13 31l8-12h10l4 12M21 19l6 12h-14M19 14h5M29 14h4l-2 5" {...common} fill="none" />
        </>
      )}
      {name === "moon" && <path d="M29 7a17 17 0 1 0 12 27A14 14 0 0 1 29 7Z" {...common} />}
      {name === "paw" && (
        <>
          <ellipse cx="24" cy="31" rx="10" ry="8" {...common} />
          <circle cx="12" cy="20" r="4" {...common} />
          <circle cx="19.5" cy="13" r="4" {...common} />
          <circle cx="28.5" cy="13" r="4" {...common} />
          <circle cx="36" cy="20" r="4" {...common} />
        </>
      )}
      {name === "sprout" && (
        <>
          <path d="M24 42V24" {...common} fill="none" />
          <path d="M24 27C14 27 9 20 9 12c9 0 15 5 15 15Z" {...common} />
          <path d="M24 23c0-9 6-15 15-15 0 9-6 15-15 15Z" {...common} />
        </>
      )}
      {name === "apple" && (
        <>
          <path d="M24 17c-6-6-16-3-15 8 1 10 8 16 15 13 7 3 14-3 15-13 1-11-9-14-15-8Z" {...common} />
          <path d="M24 17c0-6 3-9 8-10" {...common} fill="none" />
        </>
      )}
    </svg>
  )
}

function Lines({ widths, className }: { widths: string[]; className?: string }) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} aria-hidden="true">
      {widths.map((w, i) => (
        <span key={i} className="h-1.5 rounded-full bg-ink/15" style={{ width: w }} />
      ))}
    </div>
  )
}

/**
 * Mini, hand-built website preview. Pure CSS — no screenshots, no stock images.
 */
export function ProjectMockup({
  url,
  tagline,
  accent,
  tint,
  icon,
  variant,
  wide,
}: {
  url: string
  tagline: string
  accent: string
  tint: string
  icon: IconName
  variant: MockVariant
  wide?: boolean
}) {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-[22px] border-2 border-ink bg-white transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:scale-[1.015]"
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b-2 border-ink bg-cream px-3 py-2">
        <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-ink bg-coral" />
        <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-ink bg-sun" />
        <span className="h-2.5 w-2.5 rounded-full border-[1.5px] border-ink bg-mint" />
        <span className="ml-2 truncate rounded-full bg-white px-3 py-0.5 text-[11px] font-semibold text-ink-soft ring-1 ring-ink/15">
          {url}
        </span>
      </div>

      {/* Page */}
      <div className="relative h-[200px] px-4 pb-4 pt-3 sm:h-[220px]">
        {/* mini nav */}
        <div className="mb-3 flex items-center justify-between">
          <span className="flex items-center gap-1.5">
            <span className="h-3.5 w-3.5 rounded-md" style={{ background: accent }} />
            <span className="h-1.5 w-10 rounded-full bg-ink/70" />
          </span>
          <span className="flex gap-1.5">
            <span className="h-1.5 w-6 rounded-full bg-ink/15" />
            <span className="h-1.5 w-6 rounded-full bg-ink/15" />
            <span className="h-1.5 w-6 rounded-full bg-ink/15" />
          </span>
        </div>

        {variant === "landing" ? (
          <div className="flex h-[calc(100%-1.75rem)] flex-col items-center justify-center text-center">
            <ProjectIcon
              name={icon}
              fill={accent}
              className="mb-2 h-12 w-12 transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-12 group-hover:scale-110"
            />
            <p className="max-w-[16rem] font-display text-[17px] font-semibold leading-tight text-ink">{tagline}</p>
            <span className="mt-2.5 rounded-full px-3 py-1 text-[10px] font-bold text-ink" style={{ background: accent }}>
              Agenda ahora
            </span>
            <div className={cn("mt-4 grid w-full gap-2", wide ? "grid-cols-4" : "grid-cols-3")}>
              {Array.from({ length: wide ? 4 : 3 }).map((_, i) => (
                <div key={i} className="flex flex-col items-center gap-1.5 rounded-xl p-2" style={{ background: tint }}>
                  <span className="h-4 w-4 rounded-full border-[1.5px] border-ink bg-white" />
                  <span className="h-1.5 w-3/4 rounded-full bg-ink/20" />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex h-[calc(100%-1.75rem)] flex-col gap-3">
            <div className="flex flex-1 gap-3">
              <div className="flex flex-1 flex-col justify-center">
                <p className="font-display text-[17px] font-semibold leading-tight text-ink">{tagline}</p>
                <Lines widths={["90%", "70%"]} className="mt-2.5" />
                <span className="mt-3 w-fit rounded-full px-3 py-1 text-[10px] font-bold text-ink" style={{ background: accent }}>
                  {variant === "shop" ? "Comprar" : "Reservar"}
                </span>
              </div>

              {variant === "shop" ? (
                <div
                  className={cn("grid shrink-0 place-items-center rounded-2xl border-[1.5px] border-ink", wide ? "w-[42%]" : "w-[38%]")}
                  style={{ background: tint }}
                >
                  <ProjectIcon
                    name={icon}
                    fill={accent}
                    className="h-16 w-16 transition-transform duration-500 ease-[cubic-bezier(.34,1.56,.64,1)] group-hover:-rotate-12 group-hover:scale-110"
                  />
                </div>
              ) : (
                <div className="w-[44%] shrink-0 rounded-2xl border-[1.5px] border-ink p-2" style={{ background: tint }}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="h-1.5 w-8 rounded-full bg-ink/60" />
                    <ProjectIcon name={icon} fill={accent} className="h-5 w-5" />
                  </div>
                  <div className="grid grid-cols-7 gap-[3px]">
                    {Array.from({ length: 21 }).map((_, i) => {
                      const on = [3, 9, 10, 16].includes(i)
                      return (
                        <span
                          key={i}
                          className={cn("aspect-square rounded-[3px]", on ? "border border-ink" : "bg-white/80")}
                          style={on ? { background: accent } : undefined}
                        />
                      )
                    })}
                  </div>
                </div>
              )}
            </div>

            {variant === "shop" && (
              <div className={cn("grid gap-2", wide ? "grid-cols-4" : "grid-cols-3")}>
                {Array.from({ length: wide ? 4 : 3 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-1.5 rounded-xl p-1.5" style={{ background: tint }}>
                    <span className="h-5 w-5 shrink-0 rounded-lg border-[1.5px] border-ink bg-white" />
                    <span className="flex flex-1 flex-col gap-1">
                      <span className="h-1.5 w-full rounded-full bg-ink/25" />
                      <span className="h-1.5 w-1/2 rounded-full" style={{ background: accent }} />
                    </span>
                  </div>
                ))}
              </div>
            )}
            {variant === "booking" && (
              <div className="flex gap-2">
                {["9:00", "11:30", "18:00", "19:30"].slice(0, wide ? 4 : 3).map((t, i) => (
                  <span
                    key={t}
                    className={cn(
                      "rounded-full border-[1.5px] px-2.5 py-1 text-[10px] font-bold",
                      i === 1 ? "border-ink text-ink" : "border-ink/20 text-ink-soft",
                    )}
                    style={i === 1 ? { background: accent } : undefined}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
