import { WHATSAPP_NUMBER } from "./config"
import { formatPrice } from "./pricing"
import type { CartItem, Category } from "./types"
import { getCartTotal, isWholesaleActive } from "./wholesale"

const GROUP_ORDER: { category: Category; label: string }[] = [
  { category: "combo", label: "COMBOS" },
  { category: "yerba", label: "YERBAS" },
  { category: "mate", label: "MATES" },
  { category: "bombilla", label: "BOMBILLAS" },
  { category: "merchandising", label: "MERCHANDISING" },
]

/** Build the plain-text WhatsApp order message. */
export function buildWhatsAppMessage(items: CartItem[]): string {
  const lines: string[] = ["Hola YerbasGchu.", "", "Quiero realizar el siguiente pedido:", ""]

  const wholesaleActive = isWholesaleActive(items)

  for (const { category, label } of GROUP_ORDER) {
    const group = items.filter((item) => item.category === category)
    if (group.length === 0) continue

    lines.push(label)
    for (const item of group) {
      lines.push(`• ${item.name} x${item.quantity}`)
    }

    if (category === "yerba" && wholesaleActive) {
      lines.push("")
      lines.push("🎉 Precio mayorista aplicado")
    }
    lines.push("")
  }

  lines.push("TOTAL ESTIMADO")
  lines.push(formatPrice(getCartTotal(items)))
  lines.push("")
  lines.push("Nombre:")
  lines.push("")
  lines.push("Ciudad:")
  lines.push("")
  lines.push("Gracias.")

  return lines.join("\n")
}

/** Full wa.me URL with the encoded order message. */
export function buildWhatsAppUrl(items: CartItem[]): string {
  const text = encodeURIComponent(buildWhatsAppMessage(items))
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`
}
