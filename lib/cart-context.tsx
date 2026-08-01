"use client"

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import type { CartItem, Product } from "./types"
import {
  getCartTotal,
  getWholesaleSavings,
  getWholesaleStatus,
  getYerbaPackages,
  isWholesaleActive,
  type WholesaleStatus,
} from "./wholesale"

const STORAGE_KEY = "yerbasgchu-cart"

interface CartContextType {
  items: CartItem[]
  addToCart: (product: Product) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  // Derived
  totalItems: number
  totalPrice: number
  yerbaPackages: number
  wholesaleActive: boolean
  savings: number
  wholesaleStatus: WholesaleStatus
  // UI
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isHydrated, setIsHydrated] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        setItems(JSON.parse(saved))
      } catch {
        setItems([])
      }
    }
    setIsHydrated(true)
  }, [])

  useEffect(() => {
    if (isHydrated) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    }
  }, [items, isHydrated])

  const addToCart = (product: Product) => {
    if (!product.stock) return
    setItems((prev) => {
      const existing = prev.find((item) => item.id === product.id)
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...prev, { ...product, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeFromCart = (productId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems((prev) => prev.map((item) => (item.id === productId ? { ...item, quantity } : item)))
  }

  const clearCart = () => setItems([])

  const derived = useMemo(
    () => ({
      totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: getCartTotal(items),
      yerbaPackages: getYerbaPackages(items),
      wholesaleActive: isWholesaleActive(items),
      savings: getWholesaleSavings(items),
      wholesaleStatus: getWholesaleStatus(items),
    }),
    [items],
  )

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        isOpen,
        setIsOpen,
        ...derived,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
