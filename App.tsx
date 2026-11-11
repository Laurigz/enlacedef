import { HomeHeader } from "@/components/home/header"
import { Hero } from "@/components/home/hero"
import { Servicios } from "@/components/home/servicios"
import { Proyectos } from "@/components/home/proyectos"
import { Protocolo } from "@/components/home/protocolo"
import { Estandar } from "@/components/home/estandar"
import { Planes } from "@/components/home/planes"
import { Cotizar } from "@/components/home/cotizar"
import { HomeFooter } from "@/components/home/footer"
import { Chatbot } from "@/components/blocks/chatbot"

export default function App() {
  return (
    <div className="min-h-screen bg-ink-950 font-geist text-white antialiased selection:bg-electric/40 selection:text-white">
      <a
        href="#contenido"
        className="sr-only z-[70] rounded-full bg-white px-4 py-2 text-sm text-ink-950 focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Saltar al contenido
      </a>
      <HomeHeader />
      <main id="contenido">
        <Hero />
        <Servicios />
        <Proyectos />
        <Protocolo />
        <Estandar />
        <Planes />
        <Cotizar />
      </main>
      <HomeFooter />
      <Chatbot />
    </div>
  )
}
