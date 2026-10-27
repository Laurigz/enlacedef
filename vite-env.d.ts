/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_WHATSAPP: string
  readonly VITE_WHATSAPP_LABEL: string
  readonly VITE_EMAIL: string
  readonly VITE_INSTAGRAM?: string
  readonly VITE_LINKEDIN?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
