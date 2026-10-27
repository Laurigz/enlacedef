// Punto de entrada de las páginas HTML estáticas: monta la navegación, el pie y el chat compartidos.
import React from "react"
import ReactDOM from "react-dom/client"
import { Navbar } from "@/components/blocks/navbar"
import { SiteFooter } from "@/components/blocks/site-footer"
import { Chatbot } from "@/components/blocks/chatbot"
import { enhancePage } from "@/lib/enhance"
import "./index.css"

function mount(el: Element | null, node: React.ReactNode) {
  if (el) ReactDOM.createRoot(el).render(<React.StrictMode>{node}</React.StrictMode>)
}

mount(document.getElementById("site-nav"), <Navbar />)
mount(document.getElementById("site-footer"), <SiteFooter />)

const chat = document.createElement("div")
document.body.appendChild(chat)
mount(chat, <Chatbot />)

enhancePage()
