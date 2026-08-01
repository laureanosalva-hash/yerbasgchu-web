"use client"

import Image from "next/image"
import { Plus, Check } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { calculateRetailPrice, formatPrice } from "@/lib/pricing"
import type { Product } from "@/lib/types"

export function ProductCard({ product }: { product: Product }) {
  const { addToCart, items } = useCart()
  const inCart = items.some((item) => item.id === product.id)

  const displayPrice =
    product.category === "yerba" && product.costPrice != null
      ? calculateRetailPrice(product.costPrice)
      : (product.price ?? 0)

  const soldOut = !product.stock

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5">
      {/* Image occupies ~78% of the card */}
      <div className="relative aspect-square w-full overflow-hidden bg-secondary">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
            soldOut ? "opacity-40 grayscale" : ""
          }`}
        />
        {soldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full border border-border bg-background/80 px-4 py-1.5 text-xs font-medium tracking-wide text-foreground backdrop-blur-sm">
              Agotado temporalmente
            </span>
          </div>
        )}
        {product.brand && !soldOut && (
          <span className="absolute left-3 top-3 rounded-full bg-background/70 px-2.5 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-sm">
            {product.brand}
          </span>
        )}
      </div>

      {/* Minimal text + action */}
      <div className="flex flex-1 flex-col gap-3 p-3 sm:p-4">
        <div className="flex flex-1 flex-col gap-0.5">
          <h3 className="text-pretty text-sm font-medium leading-tight sm:text-base">
            {product.name}
          </h3>
          <p className="text-base font-semibold text-primary sm:text-lg">
            {formatPrice(displayPrice)}
          </p>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          disabled={soldOut}
          aria-label={`Agregar ${product.name} al carrito`}
          className="inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:bg-secondary disabled:text-muted-foreground"
        >
          {soldOut ? (
            "Sin stock"
          ) : inCart ? (
            <>
              <Check className="size-4" /> Agregar más
            </>
          ) : (
            <>
              <Plus className="size-4" /> Agregar
            </>
          )}
        </button>
      </div>
    </div>
  )
}
