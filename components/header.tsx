"use client"

import { useState } from "react"
import { ShoppingBag, Menu, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

const NAV_LINKS = [
//  { href: "#combos", label: "Combos" },
  { href: "#yerbas", label: "Yerbas" },
  { href: "#mates", label: "Mates" },
  { href: "#bombillas", label: "Bombillas" },
  { href: "#merchandising", label: "Merchandising" },
  { href: "#nosotros", label: "Nosotros" },
  { href: "#contacto", label: "Contacto" },
]

export function Header() {
  const { totalItems, setIsOpen } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 sm:px-6">
        
        <a href="#top" className="text-lg font-bold tracking-tight">
          Yerbas<span className="text-primary">Gchu</span>
        </a>

        <nav className="hidden items-center gap-6 lg:flex" aria-label="Principal">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            aria-label="Abrir carrito"
            className="relative inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary"
          >
            <ShoppingBag className="size-5" />
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 inline-flex min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-semibold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            className="inline-flex size-10 items-center justify-center rounded-full text-foreground transition-colors hover:bg-secondary lg:hidden"
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {menuOpen && (
        <nav
          className="border-t border-border bg-background lg:hidden"
          aria-label="Principal móvil"
        >
          <ul className="mx-auto flex max-w-[1200px] flex-col px-4 py-2 sm:px-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="block rounded-lg px-2 py-3 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
