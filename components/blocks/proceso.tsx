const steps = [
  {
    title: "Auditoría",
    description: "Revisamos tu web, tu perfil de Google y tus redes. Te decimos qué funciona y qué no.",
  },
  {
    title: "Estrategia",
    description: "Definimos objetivos, prioridades y cómo vamos a medir si el trabajo da resultado.",
  },
  {
    title: "Diseño y desarrollo",
    description: "Creamos tu marca, tu sitio o tu automatización. Ves avances y opinás en cada etapa.",
  },
  {
    title: "Lanzamiento y seguimiento",
    description: "Publicamos, medimos y ajustamos. Con un plan mensual seguimos mejorando después.",
  },
]

export function Proceso() {
  return (
    <section id="proceso" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <div className="mb-16 space-y-4 text-center">
        <h2 className="text-4xl font-black tracking-tighter text-slate-900 md:text-5xl">
          Más que una agencia, somos tu <span className="italic text-primary">equipo digital.</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg font-medium text-slate-600">
          No hacemos plantillas. Trabajamos en cuatro pasos claros, con vos en cada decisión.
        </p>
      </div>

      <ol className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="rounded-3xl border border-slate-100 bg-white p-8 shadow-sm">
            <span className="text-5xl font-black text-primary/20">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="mt-4 text-xl font-bold text-slate-900">{step.title}</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
