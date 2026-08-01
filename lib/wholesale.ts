import { WHOLESALE_THRESHOLD_PACKAGES } from "./config"
import { calculateRetailPrice, calculateWholesalePrice, formatPrice } from "./pricing"
import type { CartItem } from "./types"

/** Combined number of YERBA packages. Other categories do not count. */
export function getYerbaPackages(items: CartItem[]): number {
  return items
    .filter((item) => item.category === "yerba")
    .reduce((sum, item) => sum + item.quantity, 0)
}

/** Wholesale is active once combined yerba packages reach the threshold. */
export function isWholesaleActive(items: CartItem[]): boolean {
  return getYerbaPackages(items) >= WHOLESALE_THRESHOLD_PACKAGES
}

/**
 * Effective unit price for a cart item.
 * - Yerbas: retail or wholesale (from costPrice) depending on active state.
 * - Everything else: its fixed price.
 */
export function getUnitPrice(item: CartItem, wholesaleActive: boolean): number {
  if (item.category === "yerba" && item.costPrice != null) {
    return wholesaleActive
      ? calculateWholesalePrice(item.costPrice)
      : calculateRetailPrice(item.costPrice)
  }
  return item.price ?? 0
}

/** Cart total using effective prices. */
export function getCartTotal(items: CartItem[]): number {
  const wholesaleActive = isWholesaleActive(items)
  return items.reduce(
    (sum, item) => sum + getUnitPrice(item, wholesaleActive) * item.quantity,
    0,
  )
}

/**
 * Savings (retail - wholesale) across the yerbas currently in the cart.
 * - When wholesale is active, this is the amount actually saved.
 * - When not active, this is the amount that WOULD be saved on the current
 *   yerbas once the wholesale threshold is reached ("potential" savings).
 */
export function getYerbaSavings(items: CartItem[]): number {
  return items
    .filter((item) => item.category === "yerba" && item.costPrice != null)
    .reduce((sum, item) => {
      const retail = calculateRetailPrice(item.costPrice as number)
      const wholesale = calculateWholesalePrice(item.costPrice as number)
      return sum + (retail - wholesale) * item.quantity
    }, 0)
}

/** Total savings vs. retail when wholesale is active (0 otherwise). */
export function getWholesaleSavings(items: CartItem[]): number {
  return isWholesaleActive(items) ? getYerbaSavings(items) : 0
}

export type WholesaleTier = "far" | "close" | "active"

export interface WholesaleStatus {
  tier: WholesaleTier
  packages: number
  remainingPackages: number
  threshold: number
  active: boolean
  /** Savings shown to the user (potential when not active, actual when active). */
  savings: number
  /** Ordered lines to display in the cart. */
  messages: string[]
}

/** "1 paquete" / "3 paquetes" */
function packagesLabel(n: number): string {
  return `${n} ${n === 1 ? "paquete" : "paquetes"}`
}

/** Tiered wholesale messaging driven by combined yerba packages. */
export function getWholesaleStatus(items: CartItem[]): WholesaleStatus {
  const packages = getYerbaPackages(items)
  const remainingPackages = Math.max(0, WHOLESALE_THRESHOLD_PACKAGES - packages)
  const savings = getYerbaSavings(items)

  if (packages >= WHOLESALE_THRESHOLD_PACKAGES) {
    const messages = ["🎉 Precio mayorista aplicado."]
    if (savings > 0) messages.push(`💰 Ahorrás ${formatPrice(savings)} en este pedido.`)
    return {
      tier: "active",
      packages,
      remainingPackages: 0,
      threshold: WHOLESALE_THRESHOLD_PACKAGES,
      active: true,
      savings,
      messages,
    }
  }

  const remainingLine = `⚡ Te faltan ${packagesLabel(remainingPackages)} para acceder al precio mayorista.`
  const savingsLine =
    savings > 0
      ? `💰 Ahorrarías aproximadamente ${formatPrice(savings)} si alcanzaras el mayorista.`
      : null

  if (packages >= 8) {
    const messages = ["🔥 Estás muy cerca del descuento mayorista.", remainingLine]
    if (savingsLine) messages.push(savingsLine)
    return {
      tier: "close",
      packages,
      remainingPackages,
      threshold: WHOLESALE_THRESHOLD_PACKAGES,
      active: false,
      savings,
      messages,
    }
  }

  const messages = ["🎯 Mayorista desde 10 paquetes combinando cualquier yerba.", remainingLine]
  if (savingsLine) messages.push(savingsLine)
  return {
    tier: "far",
    packages,
    remainingPackages,
    threshold: WHOLESALE_THRESHOLD_PACKAGES,
    active: false,
    savings,
    messages,
  }
}
