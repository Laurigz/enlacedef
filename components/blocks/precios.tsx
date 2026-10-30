import { Store, Rocket } from "lucide-react"
import { PricingSection, type PricingTier } from "@/components/ui/pricing-section"

const tiers: PricingTier[] = [
  {
    name: "Principiante",
    price: { monthly: 25000, yearly: 250000 },
    description: "Para micro negocios que recién empiezan en internet.",
    icon: <Store className="h-7 w-7" aria-hidden="true" />,
    cta: "Quiero impulsar mi local",
    features: [
      { name: "Google Maps", description: "Optimización de tu perfil en Google Maps." },
      { name: "WhatsApp Business", description: "Configuración del perfil de WhatsApp Business." },
      { name: "Diseño gráfico básico", description: "Logotipo y paleta de colores." },
    ],
  },
  {
    name: "Avanzado",
    price: { monthly: 49000, yearly: 490000 },
    description: "Para negocios que necesitan una web propia.",
    highlight: true,
    badge: "Recomendado",
    icon: <Rocket className="h-7 w-7" aria-hidden="true" />,
    cta: "Quiero mi sitio web",
    features: [
      { name: "Diseño web", description: "Landing page o sitio de hasta 5 secciones." },
      { name: "Branding", description: "Identidad y ecosistema visual." },
      { name: "Redes sociales", description: "Integración de tus redes con el sitio." },
      { name: "SEO básico", description: "Para que te encuentren en Google." },
    ],
  },
]

export function Precios() {
  return <PricingSection tiers={tiers} />
}
