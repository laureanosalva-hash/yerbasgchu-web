"use client"

import Image from "next/image"
import { Minus, Plus, Trash2, X, ShoppingBag } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { formatPrice } from "@/lib/pricing"
import { getUnitPrice } from "@/lib/wholesale"
import { buildWhatsAppUrl } from "@/lib/whatsapp"
import { WholesaleBanner } from "./wholesale-banner"

export function CartPanel() {
  const {
    items,
    isOpen,
    setIsOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
    wholesaleActive,
    savings,
    wholesaleStatus,
  } = useCart()

  const hasYerbas = items.some((item) => item.category === "yerba")

  const handleCheckout = () => {
    const url = buildWhatsAppUrl(items)
    // Open in a new tab when embedded in an iframe, otherwise same tab.
    if (typeof window !== "undefined" && window.self !== window.top) {
      window.open(url, "_blank", "noopener,noreferrer")
    } else {
      window.location.href = url
    }
  }

  return (
    <>
      {/* Floating cart button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Abrir carrito"
        className="fixed bottom-5 right-5 z-40 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3.5 font-medium text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:scale-105 active:scale-95"
      >
        <ShoppingBag className="size-5" />
        {totalItems > 0 && <span className="text-sm">{totalItems}</span>}
      </button>

      {/* Overlay */}
      <div
        onClick={() => setIsOpen(false)}
        aria-hidden={!isOpen}
        className={`fixed inset-0 z-50 bg-background/70 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      {/* Slide-over */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Carrito"
        className={`fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-border bg-card shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between border-b border-border p-4">
          <h2 className="text-lg font-semibold">Tu pedido</h2>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Cerrar carrito"
            className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="size-5" />
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center">
            <ShoppingBag className="size-10 text-muted-foreground" />
            <p className="text-muted-foreground">Tu carrito está vacío.</p>
          </div>
        ) : (
          <>
            <div className="flex-1 space-y-4 overflow-y-auto p-4">
              {hasYerbas && <WholesaleBanner status={wholesaleStatus} />}

              <ul className="space-y-3">
                {items.map((item) => {
                  const unit = getUnitPrice(item, wholesaleActive)
                  return (
                    <li
                      key={item.id}
                      className="flex gap-3 rounded-2xl border border-border bg-background/40 p-2.5"
                    >
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-xl bg-secondary">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>

                      <div className="flex flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-medium leading-tight">{item.name}</p>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label={`Quitar ${item.name}`}
                            className="text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-border">
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              aria-label="Restar"
                              className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Minus className="size-3.5" />
                            </button>
                            <span className="w-6 text-center text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              aria-label="Sumar"
                              className="inline-flex size-7 items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                            >
                              <Plus className="size-3.5" />
                            </button>
                          </div>
                          <span className="text-sm font-semibold">
                            {formatPrice(unit * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>

              <button
                type="button"
                onClick={clearCart}
                className="text-xs text-muted-foreground underline-offset-2 transition-colors hover:text-foreground hover:underline"
              >
                Vaciar carrito
              </button>
            </div>

            <footer className="space-y-3 border-t border-border p-4">
              {wholesaleActive && savings > 0 && (
                <div className="flex items-center justify-between text-sm text-primary">
                  <span>Ahorro mayorista</span>
                  <span className="font-semibold">-{formatPrice(savings)}</span>
                </div>
              )}
              <div className="flex items-center justify-between">
                <span className="text-base">Total estimado</span>
                <span className="text-xl font-semibold">{formatPrice(totalPrice)}</span>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3.5 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                Enviar pedido por WhatsApp
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Coordinás el pago y la entrega directamente por chat.
              </p>
            </footer>
          </>
        )}
      </aside>
    </>
  )
}
