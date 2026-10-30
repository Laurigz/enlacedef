import { useState } from "react"
import { cn } from "@/lib/utils"
import { formatARS, whatsappUrl } from "@/lib/site"

export interface PricingFeature {
  name: string
  description: string
}

export interface PricingTier {
  name: string
  price: { monthly: number; yearly: number }
  description: string
  features: PricingFeature[]
  cta: string
  highlight?: boolean
  badge?: string
  icon?: React.ReactNode
}

interface PricingSectionProps {
  tiers: PricingTier[]
  className?: string
}

function PricingSection({ tiers, className }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false)

  // Filas = todas las funciones de todos los planes, en orden de aparición.
  const rows = Array.from(new Map(tiers.flatMap((t) => t.features).map((f) => [f.name, f])).values())
  const includes = (tier: PricingTier, name: string) => tier.features.some((f) => f.name === name)

  return (
    <section id="precios" className={cn("mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8", className)}>
      <div className="mb-12 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Planes mensuales</p>
          <h2 className="max-w-2xl text-4xl font-black leading-[1.05] tracking-[-0.03em] text-zinc-950 md:text-6xl">
            Qué incluye cada plan.
          </h2>
          <p className="mt-4 max-w-xl text-zinc-600">Precios en pesos. Pagando el año te ahorrás 2 meses.</p>
        </div>

        <div role="group" aria-label="Período de facturación" className="inline-flex border border-zinc-950 p-1">
          {[
            { label: "Mensual", yearly: false },
            { label: "Anual", yearly: true },
          ].map((period) => (
            <button
              key={period.label}
              type="button"
              aria-pressed={isYearly === period.yearly}
              onClick={() => setIsYearly(period.yearly)}
              className={cn(
                "px-6 py-2.5 text-sm font-bold transition-colors",
                isYearly === period.yearly ? "bg-zinc-950 text-white" : "text-zinc-600 hover:text-zinc-950",
              )}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <table className="w-full min-w-[560px] border-collapse text-left">
          <caption className="sr-only">Comparación de planes mensuales</caption>
          <thead>
            <tr className="border-t-2 border-zinc-950 align-bottom">
              <th scope="col" className="w-[40%] py-6 pr-4 text-sm font-medium text-zinc-500">
                Incluye
              </th>
              {tiers.map((tier) => {
                const price = isYearly ? tier.price.yearly : tier.price.monthly
                return (
                  <th key={tier.name} scope="col" className="py-6 pl-4 align-bottom">
                    {tier.badge && (
                      <span className="mb-3 inline-block bg-primary px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-white">
                        {tier.badge}
                      </span>
                    )}
                    <span className="block text-xl font-black text-zinc-950">{tier.name}</span>
                    <span className="mt-2 block text-3xl font-black tracking-[-0.03em] text-zinc-950 md:text-4xl">
                      {formatARS(price)}
                    </span>
                    <span className="block text-sm text-zinc-500">/{isYearly ? "año" : "mes"}</span>
                    <span className="mt-3 block text-sm font-normal leading-snug text-zinc-600">{tier.description}</span>
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name} className="border-t border-zinc-300">
                <th scope="row" className="py-5 pr-4 align-top font-normal">
                  <span className="block text-sm font-bold text-zinc-950">{row.name}</span>
                  <span className="mt-1 block text-sm leading-snug text-zinc-500">{row.description}</span>
                </th>
                {tiers.map((tier) => (
                  <td key={tier.name} className="py-5 pl-4 align-top text-center">
                    {includes(tier, row.name) ? (
                      <span className="text-lg font-black text-primary" aria-label="Incluido">✓</span>
                    ) : (
                      <span className="text-lg text-zinc-300" aria-label="No incluido">—</span>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-zinc-950">
              <td className="py-6" />
              {tiers.map((tier) => (
                <td key={tier.name} className="py-6 pl-4">
                  <a
                    href={whatsappUrl(`Hola, me interesa el plan ${tier.name} (${isYearly ? "anual" : "mensual"}).`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      "block px-4 py-4 text-center text-sm font-bold transition-colors",
                      tier.highlight ? "bg-zinc-950 text-white hover:bg-primary" : "border border-zinc-950 text-zinc-950 hover:bg-zinc-950 hover:text-white",
                    )}
                  >
                    {tier.cta}
                  </a>
                </td>
              ))}
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  )
}

export { PricingSection }
