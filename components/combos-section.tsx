"use client"

import Image from "next/image"
import { combos } from "@/lib/products"
import { MessageCircle } from "lucide-react"
import { WHATSAPP_NUMBER } from "@/lib/config"

export function CombosSection() {
  

  return (
    <section id="combos" className="scroll-mt-20 py-12 sm:py-16">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Combos</h2>
        <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
          Sets armados para arrancar o regalar el ritual del mate.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-3">
        {combos.map((combo) => {
          const soldOut = !combo.stock
          return (
            <div
              key={combo.id}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-secondary">
                <Image
                  src={combo.image || "/placeholder.svg"}
                  alt={combo.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    soldOut ? "opacity-40 grayscale" : ""
                  }`}
                />
                {soldOut && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium backdrop-blur-sm">
                      Agotado temporalmente
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold">{combo.name}</h3>
                  <p className="mt-1 text-pretty text-sm leading-relaxed text-muted-foreground">
                    {combo.description}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-xl font-semibold text-primary">
                    →
                  </span>
                  
                  <button
                    type="button"
                    onClick={() => {
                      const mensaje = encodeURIComponent(`Hola YerbasGchu 👋\n\nMe interesa el "${combo.name}".\n¿Podrían decirme el precio y la disponibilidad?`)
                      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`,"_blank")
                    }}
                    disabled={soldOut}
                    className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground">
                      <MessageCircle className="size-4" />
                      {soldOut ? "Sin stock" : "Consultar"}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
