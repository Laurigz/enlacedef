# Enlace Agencia Digital

Sitio de la agencia. Vite + React + Tailwind. Se publica en Vercel.

## Cambiar WhatsApp, email y redes

Todo está en `.env`. Cambiás el valor ahí y se actualiza en botones, formulario, chat y pie de página.
En Vercel también podés cargarlos en Settings → Environment Variables.

## Estructura

- `index.html` + `App.tsx`: página de inicio (React, secciones en `components/blocks/`).
- `contacto.html`, `nosotros.html`, `servicio-*.html`: páginas en HTML. La navegación, el pie y el chat
  se montan desde `static.tsx`, así son iguales en todo el sitio.
- `lib/site.ts`: datos del sitio y enlace de WhatsApp.
- `lib/enhance.ts`: formulario de contacto (abre WhatsApp con la consulta) y preguntas frecuentes.
- `portfolio.html` y `blog.html`: fuera del menú y con `noindex` hasta tener casos y artículos reales.

## Comandos

```bash
npm install
npm run dev        # servidor local
npm run build      # genera dist/
npm run typecheck  # revisa tipos
```

## Íconos de las páginas HTML

Las páginas HTML usan Material Symbols y descargan solo los íconos listados en `icon_names` del `<head>`.
Si agregás un ícono nuevo, sumalo a esa lista (en orden alfabético) en todas las páginas.
