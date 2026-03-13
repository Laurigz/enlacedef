"use client"

import * as React from "react"
import { Navbar } from "@/components/blocks/navbar"
import { Hero } from "@/components/blocks/hero"
import { SolucionesIA } from "@/components/blocks/soluciones-ia"
import { Servicios } from "@/components/blocks/servicios"
import { Portfolio } from "@/components/blocks/portfolio"
import { PricingSectionDemo } from "@/components/ui/demo"
import { ContactFooter } from "@/components/blocks/contact-footer"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-primary/20 selection:text-primary dark:bg-zinc-950 dark:text-zinc-50">
      <Navbar />
      <main>
        <Hero />
        <SolucionesIA />
        <Servicios />
        <Portfolio />
        <PricingSectionDemo />
        <ContactFooter />
      </main>
      
      {/* Background patterns can be added here or in global CSS */}
      <div className="fixed inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] dark:bg-zinc-950 dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)]" />
    </div>
  )
}
