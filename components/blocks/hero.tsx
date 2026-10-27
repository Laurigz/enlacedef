import { ArrowRight, CheckCircle2, MessageCircle } from "lucide-react"
import { AUDIT_MESSAGE, whatsappUrl } from "@/lib/site"

const AUDIT_CHECKS = [
  "Tu perfil de Google Maps",
  "Velocidad y versión móvil de tu web",
  "Tus redes sociales",
  "Cómo aparecés cuando te buscan en Google",
]

export function Hero() {
  return (
    <section id="inicio" className="relative w-full overflow-hidden py-14 md:py-24 lg:py-28">
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col space-y-8 duration-700 animate-in fade-in slide-in-from-bottom-5 lg:col-span-7">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-sky-400/20 bg-white/60 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 shadow-sm backdrop-blur-md">
              Agencia digital integral
            </p>

            <h1 className="text-5xl font-black leading-[0.95] tracking-tighter text-slate-900 sm:text-6xl lg:text-7xl xl:text-8xl">
              Diseñamos{" "}
              <span className="bg-gradient-to-br from-primary via-sky-500 to-sky-400 bg-clip-text text-transparent">
                experiencias
              </span>{" "}
              que impactan
            </h1>

            <p className="max-w-xl text-lg font-medium leading-relaxed text-slate-600">
              Branding, páginas web, posicionamiento en Google e inteligencia artificial para negocios que quieren
              conseguir más clientes por internet.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row">
              <a
                href={whatsappUrl(AUDIT_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-slate-900 px-8 py-4 text-sm font-bold text-white shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] hover:bg-primary active:scale-[0.98]"
              >
                Pedir auditoría gratuita
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-300 bg-white/70 px-8 py-4 text-sm font-bold text-slate-800 shadow-sm backdrop-blur-md transition-colors hover:border-slate-400 hover:bg-white"
              >
                Ver servicios
              </a>
            </div>
          </div>

          <div className="delay-300 duration-1000 animate-in fade-in slide-in-from-bottom-10 lg:col-span-5">
            <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-white/50 p-8 shadow-2xl shadow-sky-900/10 backdrop-blur-2xl">
              <div className="pointer-events-none absolute right-0 top-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl" />
              <div className="relative z-10">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Auditoría gratuita</p>
                <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-900">Qué revisamos de tu negocio</h2>
                <ul className="mt-6 space-y-4">
                  {AUDIT_CHECKS.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm font-medium text-slate-700">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                      {item}
                    </li>
                  ))}
                </ul>
                <hr className="my-6 border-slate-200" />
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm text-slate-600">Te respondemos en menos de 24 h.</p>
                  <a
                    href={whatsappUrl(AUDIT_MESSAGE)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-[#1fb855]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Pedirla
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
