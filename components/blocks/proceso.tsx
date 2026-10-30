const steps = [
  { title: "Auditoría", description: "Revisamos tu web, tu perfil de Google y tus redes. Te decimos qué funciona." },
  { title: "Estrategia", description: "Definimos objetivos, prioridades y cómo vamos a medir el resultado." },
  { title: "Diseño y desarrollo", description: "Creamos tu marca, sitio o automatización. Ves avances en cada etapa." },
  { title: "Lanzamiento", description: "Publicamos, medimos y ajustamos. Con plan mensual seguimos después." },
]

export function Proceso() {
  return (
    <section id="proceso" className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
      <p className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">Cómo trabajamos</p>
      <ol className="grid grid-cols-1 gap-x-8 gap-y-12 md:grid-cols-4">
        {steps.map((step, i) => (
          <li key={step.title} className="border-t-2 border-zinc-950 pt-6">
            <span className="font-mono text-sm text-primary">0{i + 1}</span>
            <h3 className="mt-6 text-2xl font-black tracking-[-0.02em] text-zinc-950">{step.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600">{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}
