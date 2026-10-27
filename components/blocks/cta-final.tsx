import { MessageCircle } from "lucide-react"
import { AUDIT_MESSAGE, whatsappUrl } from "@/lib/site"

export function CtaFinal() {
  return (
    <section id="contacto" className="px-4 pt-16 md:pt-24">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-10 text-center">
        <div className="space-y-4">
          <h2 className="text-4xl font-black leading-[1.1] tracking-tighter text-slate-900 md:text-6xl">
            Dejá de perder ventas por culpa del <span className="italic text-primary">caos digital.</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
            Analizamos tu presencia actual y te decimos qué mejorar para convertir visitas en clientes. Sin costo.
          </p>
        </div>

        <a
          href={whatsappUrl(AUDIT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-16 items-center justify-center gap-3 rounded-2xl bg-primary px-8 text-lg font-bold text-white shadow-2xl shadow-primary/30 transition-all hover:scale-[1.03] active:scale-[0.98] sm:px-10 sm:text-xl"
        >
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
          Pedir auditoría gratuita
        </a>
      </div>
    </section>
  )
}
