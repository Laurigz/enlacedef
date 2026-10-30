import * as React from "react"
import { ArrowUpRight } from "lucide-react"
import { cn } from "@/lib/utils"

const accordionItems = [
  { id: 1, title: "Asistente de voz", imageUrl: "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=75&w=800&auto=format&fit=crop" },
  { id: 2, title: "Imágenes con IA", imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=75&w=800&auto=format&fit=crop" },
  { id: 3, title: "Chatbot con tus datos", imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=75&w=800&auto=format&fit=crop" },
  { id: 4, title: "Agentes de IA", imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=75&w=800&auto=format&fit=crop" },
  { id: 5, title: "Visión artificial", imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=75&w=800&auto=format&fit=crop" },
]

type Item = (typeof accordionItems)[number]

function AccordionItem({ item, isActive, onActivate }: { item: Item; isActive: boolean; onActivate: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={item.title}
      className={cn(
        "relative h-[320px] shrink-0 overflow-hidden transition-all duration-700 ease-in-out md:h-[440px]",
        isActive ? "w-[220px] sm:w-[260px] md:w-[360px]" : "w-[52px] md:w-[56px]",
      )}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
    >
      <img src={item.imageUrl} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover grayscale-[40%]" />
      <span className="absolute inset-0 bg-zinc-950/50" />
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-base font-bold text-white transition-all duration-300 ease-in-out md:text-lg",
          isActive ? "bottom-6 rotate-0" : "bottom-24 rotate-90",
        )}
      >
        {item.title}
      </span>
    </button>
  )
}

export function SolucionesIA() {
  // En celular arranca en la primera tarjeta para que se vea entera; en pantallas grandes, en la del medio.
  const [activeIndex, setActiveIndex] = React.useState(() =>
    window.matchMedia("(min-width: 768px)").matches ? 2 : 0,
  )

  return (
    <section id="soluciones-ia" className="mx-auto w-full max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 items-center gap-12 border-t-2 border-zinc-950 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Inteligencia artificial</p>
          <h2 className="text-4xl font-black leading-[1.05] tracking-[-0.03em] text-zinc-950 md:text-5xl">
            IA aplicada a <span className="text-primary">tu negocio</span>, sin complicaciones.
          </h2>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-zinc-600">
            Asistentes de voz, chatbots con tu información y visión artificial. Vos elegís, nosotros lo armamos.
          </p>
          <a href="/servicio-ia.html" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-zinc-950 underline decoration-zinc-300 underline-offset-8 hover:decoration-primary">
            Ver soluciones de IA
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>

        <div className="hide-scrollbar w-full overflow-x-auto lg:col-span-7">
          <div className="mx-auto flex w-max items-center gap-2 md:gap-3">
            {accordionItems.map((item, index) => (
              <AccordionItem key={item.id} item={item} isActive={index === activeIndex} onActivate={() => setActiveIndex(index)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
