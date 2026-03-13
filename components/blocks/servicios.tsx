"use client"

import * as React from "react"
import { Layout, Rocket, Brain, Search, Palette, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"

const services = [
  {
    title: "Branding & Identidad",
    description: "Creamos marcas con alma que conectan emocionalmente con su audiencia.",
    icon: Palette,
    color: "bg-orange-500",
    link: "servicio-branding.html"
  },
  {
    title: "Diseño Web Premium",
    description: "Sitios web rápidos, intuitivos y optimizados para convertir visitantes en clientes.",
    icon: Layout,
    color: "bg-blue-600",
    link: "servicio-web.html"
  },
  {
    title: "Soluciones de IA",
    description: "Integramos inteligencia artificial para automatizar procesos y mejorar la eficiencia.",
    icon: Brain,
    color: "bg-purple-600",
    link: "servicio-ia.html"
  },
  {
    title: "Posicionamiento SEO",
    description: "Aumentamos tu visibilidad en Google para que tus clientes te encuentren primero.",
    icon: Search,
    color: "bg-emerald-500",
    link: "servicio-posicionamiento.html"
  },
  {
    title: "Estrategia Digital",
    description: "Consultoría estratégica para escalar tu modelo de negocio en el mundo digital.",
    icon: Rocket,
    color: "bg-red-500",
    link: "servicio-posicionamiento.html"
  },
  {
    title: "Gestión de RRSS",
    description: "Creamos contenido que genera conversación y fideliza a tu comunidad.",
    icon: MessageSquare,
    color: "bg-sky-500",
    link: "contacto.html"
  }
]

export function Servicios() {
  return (
    <section id="servicios" className="py-24 bg-slate-50 dark:bg-zinc-900/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 sm:text-4xl lg:text-5xl dark:text-zinc-50">
            Servicios que Impulsan tu <span className="text-primary italic">Crecimiento</span>
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Combinamos creatividad y tecnología para ofrecer soluciones digitales integrales de alto impacto.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <a
              key={service.title}
              href={service.link}
              className="group relative flex flex-col p-8 bg-white rounded-3xl border border-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2 dark:bg-zinc-900 dark:border-zinc-800"
            >
              <div className={cn(
                "h-12 w-12 rounded-2xl flex items-center justify-center mb-6 text-white shadow-lg",
                service.color
              )}>
                <service.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4 dark:text-zinc-50 group-hover:text-primary transition-colors">
                {service.title}
              </h3>
              <p className="text-slate-600 leading-relaxed dark:text-zinc-400">
                {service.description}
              </p>
              <div className="mt-6 flex items-center text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0">
                Saber más <Rocket className="ml-2 h-4 w-4" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
