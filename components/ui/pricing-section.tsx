import { useState } from "react"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ArrowRightIcon, CheckIcon } from "@radix-ui/react-icons"
import { cn } from "@/lib/utils"
import { formatARS, whatsappUrl } from "@/lib/site"

interface Feature {
  name: string
  description: string
}

export interface PricingTier {
  name: string
  price: {
    monthly: number
    yearly: number
  }
  description: string
  features: Feature[]
  cta: string
  highlight?: boolean
  badge?: string
  icon: React.ReactNode
}

interface PricingSectionProps {
  tiers: PricingTier[]
  className?: string
}

function PricingSection({ tiers, className }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(false)

  return (
    <section id="precios" className={cn("relative overflow-hidden px-4 py-16 md:py-24 lg:py-28", className)}>
      <div className="mx-auto w-full max-w-5xl">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <h2 className="text-3xl font-black tracking-tight text-zinc-900 md:text-4xl">Planes mensuales</h2>
          <p className="max-w-xl text-zinc-600">
            Precios en pesos argentinos. Pagando el año completo te ahorrás 2 meses.
          </p>
          <div
            role="group"
            aria-label="Período de facturación"
            className="inline-flex items-center rounded-full border border-zinc-200 bg-white p-1.5 shadow-sm"
          >
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
                  "rounded-full px-8 py-2.5 text-sm font-medium transition-all duration-300",
                  isYearly === period.yearly
                    ? "bg-zinc-900 text-white shadow-lg"
                    : "text-zinc-600 hover:text-zinc-900",
                )}
              >
                {period.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {tiers.map((tier) => {
            const price = isYearly ? tier.price.yearly : tier.price.monthly
            const saving = tier.price.monthly * 12 - tier.price.yearly
            return (
              <div
                key={tier.name}
                className={cn(
                  "relative flex flex-col rounded-3xl border backdrop-blur-sm transition-all duration-300",
                  tier.highlight
                    ? "border-zinc-400/50 bg-gradient-to-b from-white to-zinc-50 shadow-xl"
                    : "border-zinc-200 bg-white shadow-md",
                )}
              >
                {tier.badge && (
                  <div className="absolute -top-4 left-6">
                    <Badge className="border-none bg-zinc-900 px-4 py-1.5 text-sm font-medium text-white shadow-lg hover:bg-zinc-900">
                      {tier.badge}
                    </Badge>
                  </div>
                )}

                <div className="flex-1 p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="rounded-xl bg-zinc-100 p-3 text-zinc-700">{tier.icon}</div>
                    <h3 className="text-xl font-semibold text-zinc-900">{tier.name}</h3>
                  </div>

                  <div className="mb-6">
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold text-zinc-900">{formatARS(price)}</span>
                      <span className="text-sm text-zinc-500">/{isYearly ? "año" : "mes"}</span>
                    </div>
                    <p className="mt-1 h-5 text-sm font-medium text-emerald-700">
                      {isYearly && saving > 0 ? `Te ahorrás ${formatARS(saving)}` : ""}
                    </p>
                    <p className="mt-2 text-sm text-zinc-600">{tier.description}</p>
                  </div>

                  <ul className="space-y-4">
                    {tier.features.map((feature) => (
                      <li key={feature.name} className="flex gap-4">
                        <CheckIcon className="mt-1 h-4 w-4 shrink-0 text-emerald-600" aria-hidden="true" />
                        <div>
                          <div className="text-sm font-medium text-zinc-900">{feature.name}</div>
                          <div className="text-sm text-zinc-600">{feature.description}</div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-auto p-8 pt-0">
                  <a
                    href={whatsappUrl(
                      `Hola, me interesa el plan ${tier.name} (${isYearly ? "anual" : "mensual"}).`,
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cn(
                      buttonVariants(),
                      "h-12 w-full gap-2 rounded-xl text-sm font-semibold transition-all duration-300",
                      tier.highlight
                        ? "bg-zinc-900 text-white hover:bg-primary"
                        : "border border-zinc-200 bg-white text-zinc-900 shadow-sm hover:border-zinc-300 hover:bg-zinc-50",
                    )}
                  >
                    {tier.cta}
                    <ArrowRightIcon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { PricingSection }
