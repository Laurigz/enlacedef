import { Navbar } from "@/components/blocks/navbar"
import { Hero } from "@/components/blocks/hero"
import { SolucionesIA } from "@/components/blocks/soluciones-ia"
import { Servicios } from "@/components/blocks/servicios"
import { Proceso } from "@/components/blocks/proceso"
import { Precios } from "@/components/blocks/precios"
import { CtaFinal } from "@/components/blocks/cta-final"
import { SiteFooter } from "@/components/blocks/site-footer"
import { Chatbot } from "@/components/blocks/chatbot"

export default function App() {
  return (
    <div className="min-h-screen font-sans text-slate-900 selection:bg-primary/20 selection:text-primary">
      <header className="site-header">
        <Navbar />
      </header>
      <main>
        <Hero />
        <SolucionesIA />
        <Servicios />
        <Proceso />
        <Precios />
        <CtaFinal />
      </main>
      <footer>
        <SiteFooter />
      </footer>
      <Chatbot />
    </div>
  )
}
