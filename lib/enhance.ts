import { whatsappUrl } from "@/lib/site"

// Comportamiento de las páginas HTML estáticas (las que no son el inicio en React).
export function enhancePage() {
  // <a data-wa="mensaje"> abre WhatsApp con ese mensaje. Sin JS, el href original lleva a /contacto.html.
  document.querySelectorAll<HTMLAnchorElement>("a[data-wa]").forEach((a) => {
    a.href = whatsappUrl(a.dataset.wa || undefined)
    a.target = "_blank"
    a.rel = "noopener noreferrer"
  })

  // Preguntas frecuentes: <button data-faq aria-expanded> seguido del panel de respuesta.
  document.querySelectorAll<HTMLButtonElement>("button[data-faq]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") === "true"
      document.querySelectorAll<HTMLButtonElement>("button[data-faq][aria-expanded='true']").forEach((other) => {
        other.setAttribute("aria-expanded", "false")
        document.getElementById(other.getAttribute("aria-controls") || "")?.setAttribute("hidden", "")
      })
      if (!open) {
        btn.setAttribute("aria-expanded", "true")
        document.getElementById(btn.getAttribute("aria-controls") || "")?.removeAttribute("hidden")
      }
    })
  })

  initContactForm()
}

function initContactForm() {
  const form = document.querySelector<HTMLFormElement>("#contactForm")
  const success = document.querySelector<HTMLElement>("#cf-success")
  const retry = document.querySelector<HTMLAnchorElement>("#cf-retry")
  if (!form || !success || !retry) return

  form.addEventListener("submit", (e) => {
    e.preventDefault()
    if (!form.checkValidity()) {
      form.reportValidity()
      return
    }
    const data = new FormData(form)
    const field = (name: string) => String(data.get(name) || "").trim()
    const header = [
      `Hola, soy ${field("nombre")}.`,
      field("negocio") && `Negocio: ${field("negocio")}`,
      field("servicio") && `Me interesa: ${field("servicio")}`,
    ].filter(Boolean)
    const url = whatsappUrl(`${header.join("\n")}\n\n${field("mensaje")}`)

    retry.href = url
    form.hidden = true
    success.hidden = false
    success.focus()
    window.open(url, "_blank", "noopener")
  })

  document.querySelector("#cf-reset")?.addEventListener("click", () => {
    form.reset()
    form.hidden = false
    success.hidden = true
    form.querySelector<HTMLInputElement>("input")?.focus()
  })
}
