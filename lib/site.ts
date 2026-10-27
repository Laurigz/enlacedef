// Datos del sitio. Los valores vienen de .env para cambiarlos en un solo lugar.
export const SITE = {
  name: "Enlace",
  whatsapp: import.meta.env.VITE_WHATSAPP,
  whatsappLabel: import.meta.env.VITE_WHATSAPP_LABEL,
  email: import.meta.env.VITE_EMAIL,
  instagram: import.meta.env.VITE_INSTAGRAM || "",
  linkedin: import.meta.env.VITE_LINKEDIN || "",
}

export function whatsappUrl(message?: string) {
  const base = `https://wa.me/${SITE.whatsapp}`
  return message ? `${base}?text=${encodeURIComponent(message)}` : base
}

export const AUDIT_MESSAGE = "Hola, quiero pedir la auditoría gratuita de mi presencia digital."

export const SERVICES = [
  { label: "Branding", description: "Logo, paleta y manual de marca", href: "/servicio-branding.html" },
  { label: "Páginas web", description: "Sitios rápidos y fáciles de usar", href: "/servicio-web.html" },
  { label: "Posicionamiento SEO", description: "Aparecer en Google y Maps", href: "/servicio-posicionamiento.html" },
  { label: "Inteligencia artificial", description: "Chatbots y automatización", href: "/servicio-ia.html" },
]

export function formatARS(value: number) {
  return "$" + value.toLocaleString("es-AR")
}
