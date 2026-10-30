import { ArrowUpRight } from "lucide-react"
import { AUDIT_MESSAGE, whatsappUrl } from "@/lib/site"

export function CtaFinal() {
  return (
    <section id="contacto" className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
      <div className="flex flex-col items-start justify-between gap-10 bg-zinc-950 p-8 text-white md:flex-row md:items-end md:p-16">
        <h2 className="max-w-3xl text-4xl font-black leading-[1.02] tracking-[-0.03em] md:text-6xl">
          ¿Cuánto te cuesta <span className="text-sky-300">no aparecer</span> en Google?
        </h2>
        <a
          href={whatsappUrl(AUDIT_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex shrink-0 items-center gap-2 bg-white px-7 py-4 text-sm font-bold text-zinc-950 transition-colors hover:bg-sky-300"
        >
          Pedir auditoría gratis
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </div>
    </section>
  )
}
