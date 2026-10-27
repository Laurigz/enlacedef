import * as React from "react"
import { Bot, MessageCircle, Send, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { whatsappUrl } from "@/lib/site"

type Message = { text: string; fromUser: boolean; whatsapp?: boolean }

const STORAGE_KEY = "enlace-chat-v5"
const NOTIF_KEY = "enlace-chat-notif"

const GREETING: Message = {
  text: "¡Hola! Soy el asistente de **Enlace**. Te paso precios, servicios y tiempos de entrega. Para algo puntual, te conecto con una persona por WhatsApp.",
  fromUser: false,
}

const QUICK_REPLIES = ["Precios", "Servicios", "Tiempos de entrega", "Hablar con una persona"]

// Respuestas por palabra clave. Para conectar un modelo de IA real, reemplazá getReply por una llamada
// a una función del servidor (nunca pongas la API key en el navegador).
function getReply(input: string): Message {
  const q = input.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "")
  // Coincide al inicio de palabra: "ia" no matchea "gracias".
  const has = (...words: string[]) => words.some((w) => new RegExp(`\\b${w}`).test(q))

  if (has("persona", "humano", "whatsapp", "llamar", "contact"))
    return { text: "Te atiende una persona del equipo por WhatsApp.", fromUser: false, whatsapp: true }
  if (has("precio", "plan", "cuesta", "costo", "valor", "tarifa"))
    return {
      text: "**Planes mensuales:** Principiante $25.000/mes y Avanzado $49.000/mes. Pagando el año te ahorrás 2 meses.\n**Branding (pago único):** Standard USD 990, Premium USD 1.890, Corporate USD 3.500.",
      fromUser: false,
    }
  if (has("tiempo", "tarda", "demora", "plazo", "cuando", "semana"))
    return {
      text: "Plazos estimados: branding **1–2 semanas**, sitio web **3–6 semanas**, proyecto integral **6–10 semanas**. En la auditoría te damos el cronograma de tu caso.",
      fromUser: false,
    }
  if (has("brand", "marca", "logo", "identidad"))
    return { text: "**Branding:** logo, paleta, tipografía y manual de marca. Detalle en la página de Branding.", fromUser: false }
  if (has("web", "pagina", "sitio", "landing", "tienda", "ecommerce"))
    return { text: "**Páginas web:** landing pages, tiendas online y sitios institucionales, pensados primero para celular.", fromUser: false }
  if (has("seo", "google", "posicion", "maps", "buscador"))
    return { text: "**Posicionamiento SEO:** optimizamos tu web y tu perfil de Google Maps para que te encuentren cuando te buscan.", fromUser: false }
  if (has("ia", "inteligencia", "chatbot", "automatiz", "bot"))
    return { text: "**Inteligencia artificial:** chatbots entrenados con tu información, automatización de tareas y análisis de datos.", fromUser: false }
  if (has("servicio", "hacen", "ofrecen"))
    return { text: "Hacemos **branding**, **páginas web**, **posicionamiento SEO** e **inteligencia artificial**. ¿Sobre cuál querés saber más?", fromUser: false }
  if (has("auditoria", "gratis", "gratuita"))
    return { text: "La auditoría es gratuita: revisamos tu web, tu perfil de Google y tus redes, y te decimos qué mejorar.", fromUser: false, whatsapp: true }
  if (has("gracias"))
    return { text: "¡De nada! Si te queda alguna duda, escribime.", fromUser: false }
  if (has("hola", "buen"))
    return { text: "¡Hola! ¿Querés saber precios, servicios o tiempos de entrega?", fromUser: false }

  return { text: "No tengo esa respuesta. Escribinos por WhatsApp y te responde una persona.", fromUser: false, whatsapp: true }
}

function loadHistory(): Message[] {
  try {
    const saved = JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]")
    return Array.isArray(saved) && saved.length ? saved : [GREETING]
  } catch {
    return [GREETING]
  }
}

// Convierte **texto** en negrita sin usar innerHTML.
function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <React.Fragment key={i}>
          {i > 0 && <br />}
          {line.split(/\*\*(.+?)\*\*/g).map((part, j) => (j % 2 ? <strong key={j}>{part}</strong> : part))}
        </React.Fragment>
      ))}
    </>
  )
}

export function Chatbot() {
  const [open, setOpen] = React.useState(false)
  const [showNotif, setShowNotif] = React.useState(false)
  const [messages, setMessages] = React.useState<Message[]>(loadHistory)
  const [input, setInput] = React.useState("")
  const [typing, setTyping] = React.useState(false)
  const listRef = React.useRef<HTMLDivElement>(null)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const toggleRef = React.useRef<HTMLButtonElement>(null)

  React.useEffect(() => {
    try {
      if (sessionStorage.getItem(NOTIF_KEY)) return
    } catch {
      return
    }
    const t = setTimeout(() => setShowNotif(true), 6000)
    return () => clearTimeout(t)
  }, [])

  React.useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
    } catch {
      // Sin almacenamiento disponible: el chat funciona igual, sin historial.
    }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, typing])

  React.useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  function toggle() {
    setOpen((o) => !o)
    setShowNotif(false)
    try {
      sessionStorage.setItem(NOTIF_KEY, "1")
    } catch {
      // Ignorado a propósito.
    }
  }

  function close() {
    setOpen(false)
    toggleRef.current?.focus()
  }

  function send(text: string) {
    const clean = text.trim()
    if (!clean || typing) return
    setMessages((m) => [...m, { text: clean, fromUser: true }])
    setInput("")
    setTyping(true)
    setTimeout(() => {
      setMessages((m) => [...m, getReply(clean)])
      setTyping(false)
    }, 600)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end sm:bottom-6 sm:right-6">
      {open && (
        <div
          role="dialog"
          aria-label="Asistente de Enlace"
          onKeyDown={(e) => e.key === "Escape" && close()}
          className="mb-4 flex h-[min(560px,calc(100dvh-7rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 sm:w-[380px]"
        >
          <div className="flex items-center justify-between bg-primary px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/20 bg-white/10">
                <Bot className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <p className="font-bold leading-tight">Asistente de Enlace</p>
                <p className="text-xs text-white/80">Respuestas automáticas</p>
              </div>
            </div>
            <button type="button" onClick={close} aria-label="Cerrar chat" className="rounded-lg p-2 hover:bg-white/10">
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          <div ref={listRef} aria-live="polite" className="flex flex-1 flex-col gap-3 overflow-y-auto bg-slate-50 p-4">
            {messages.map((m, i) => (
              <div key={i} className={cn("flex flex-col gap-2", m.fromUser ? "items-end" : "items-start")}>
                <div
                  className={cn(
                    "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-3 text-sm leading-relaxed",
                    m.fromUser
                      ? "rounded-tr-sm bg-primary text-white"
                      : "rounded-tl-sm border border-slate-100 bg-white text-slate-700 shadow-sm",
                  )}
                >
                  <RichText text={m.text} />
                </div>
                {m.whatsapp && (
                  <a
                    href={whatsappUrl("Hola, vengo del chat de la web.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-bold text-white hover:bg-[#1fb855]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Abrir WhatsApp
                  </a>
                )}
              </div>
            ))}
            {typing && (
              <div className="flex gap-1 self-start rounded-2xl rounded-tl-sm border border-slate-100 bg-white px-4 py-3" aria-label="Escribiendo">
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                    style={{ animationDelay: `${d * 0.15}s` }}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="border-t border-slate-100 bg-white p-3">
            <div className="hide-scrollbar mb-2 flex gap-2 overflow-x-auto">
              {QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  type="button"
                  onClick={() => send(q)}
                  className="shrink-0 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-primary hover:text-primary"
                >
                  {q}
                </button>
              ))}
            </div>
            <form
              className="relative"
              onSubmit={(e) => {
                e.preventDefault()
                send(input)
              }}
            >
              <label htmlFor="chat-input" className="sr-only">Escribí tu pregunta</label>
              <input
                id="chat-input"
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Escribí tu pregunta…"
                autoComplete="off"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-4 pr-12 text-sm text-slate-800 outline-none focus:border-primary"
              />
              <button
                type="submit"
                aria-label="Enviar"
                className="absolute right-1.5 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl bg-primary text-white"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="relative">
        {showNotif && !open && (
          <div className="absolute bottom-full right-0 mb-3 whitespace-nowrap rounded-lg border border-slate-100 bg-white px-4 py-2 text-sm font-bold text-primary shadow-lg animate-in fade-in slide-in-from-bottom-2">
            ¿Tenés alguna duda?
          </div>
        )}
        <button
          ref={toggleRef}
          type="button"
          onClick={toggle}
          aria-label={open ? "Cerrar chat" : "Abrir chat con el asistente"}
          aria-expanded={open}
          className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg shadow-primary/40 transition-transform hover:scale-105"
        >
          {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Bot className="h-7 w-7" aria-hidden="true" />}
        </button>
      </div>
    </div>
  )
}
