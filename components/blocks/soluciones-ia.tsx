import * as React from "react"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

const accordionItems = [
  {
    id: 1,
    title: "Asistente de voz",
    imageUrl: "https://images.unsplash.com/photo-1628258334105-2a0b3d6efee1?q=75&w=800&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Imágenes con IA",
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=75&w=800&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Chatbot con tus datos",
    imageUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=75&w=800&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Agentes de IA",
    imageUrl: "https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=75&w=800&auto=format&fit=crop",
  },
  {
    id: 5,
    title: "Visión artificial",
    imageUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?q=75&w=800&auto=format&fit=crop",
  },
]

type Item = (typeof accordionItems)[number]

function AccordionItem({ item, isActive, onActivate }: { item: Item; isActive: boolean; onActivate: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={isActive}
      aria-label={item.title}
      className={cn(
        "relative h-[320px] shrink-0 overflow-hidden rounded-2xl transition-all duration-700 ease-in-out md:h-[450px]",
        isActive ? "w-[220px] sm:w-[260px] md:w-[340px]" : "w-[52px] md:w-[56px]",
      )}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onClick={onActivate}
    >
      <img
        src={item.imageUrl}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <span className="absolute inset-0 bg-black/45" />
      <span
        aria-hidden="true"
        className={cn(
          "absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-base font-semibold text-white transition-all duration-300 ease-in-out md:text-lg",
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
    <section id="soluciones-ia" className="relative z-20 mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-[2.5rem] border border-white/60 bg-white/60 p-6 shadow-2xl backdrop-blur-xl md:p-12">
        <div className="flex flex-col items-center justify-between gap-12 lg:flex-row">
          <div className="w-full text-center lg:w-5/12 lg:text-left">
            <h2 className="text-4xl font-black leading-[1.1] tracking-tighter text-slate-900 md:text-5xl">
              Soluciones de IA <br />
              <span className="text-primary">a tu medida</span>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-slate-600 lg:mx-0">
              Sumá inteligencia artificial a tu negocio sin complicaciones técnicas: asistentes de voz, chatbots que
              responden con tu propia información y visión artificial.
            </p>
            <div className="mt-8 flex justify-center lg:justify-start">
              <a
                href="/servicio-ia.html"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-8 py-4 font-bold text-white shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:bg-primary"
              >
                Ver soluciones de IA
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* w-max + mx-auto: centrado si entra, y si no entra se puede deslizar desde el primer ítem. */}
          <div className="hide-scrollbar w-full overflow-x-auto py-4 lg:w-7/12">
            <div className="mx-auto flex w-max items-center gap-2 md:gap-3">
              {accordionItems.map((item, index) => (
                <AccordionItem
                  key={item.id}
                  item={item}
                  isActive={index === activeIndex}
                  onActivate={() => setActiveIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
