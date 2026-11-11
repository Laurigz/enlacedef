import { MotionConfig } from "framer-motion"
import { Header } from "@/components/enlace/Header"
import { Hero } from "@/components/enlace/Hero"
import { Marquee } from "@/components/enlace/Marquee"
import { Projects } from "@/components/enlace/Projects"
import { Services } from "@/components/enlace/Services"
import { CtaBand, Footer } from "@/components/enlace/Closing"

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <a
        href="#contenido"
        className="btn btn-dark btn-md fixed left-4 top-4 z-[60] -translate-y-24 focus:translate-y-0"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido" className="overflow-x-clip">
        <Hero />
        <Marquee />
        <Projects />
        <Services />
        <CtaBand />
      </main>
      <Footer />
    </MotionConfig>
  )
}
