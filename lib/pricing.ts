import { RETAIL_MULTIPLIER, WHOLESALE_MULTIPLIER } from "./config"

/**
 * Round a price to the nearest hundred (commercial rounding).
 * 15638 -> 15600
 * 16742 -> 16700
 */
export function roundCommercialPrice(value: number): number {
  return Math.floor(value / 100) * 100
}

/** Retail price = costPrice * 1.1256, rounded to nearest hundred. */
export function calculateRetailPrice(costPrice: number): number {
  return roundCommercialPrice(costPrice * RETAIL_MULTIPLIER)
}

/** Wholesale price = costPrice * 1.0474, rounded to nearest hundred. */
export function calculateWholesalePrice(costPrice: number): number {
  return roundCommercialPrice(costPrice * WHOLESALE_MULTIPLIER)
}

/** Format a number as Argentine pesos, e.g. 88400 -> "$88.400". */
export function formatPrice(value: number): string {
  return `$${Math.round(value).toLocaleString("es-AR")}`
}
