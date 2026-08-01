export type Category = "combo" | "yerba" | "mate" | "bombilla" | "merchandising"

export interface Product {
  id: string
  name: string
  category: Category
  image: string
  /** false -> shows "Agotado temporalmente" overlay and disables add-to-cart */
  stock: boolean

  // --- Yerbas: store ONLY the cost. Retail/wholesale are derived. ---
  // Wholesale is based on package count (quantity), not weight.
  costPrice?: number
  brand?: string

  // --- Everything else (combos, mates, bombillas, merch): fixed price. ---
  price?: number
  description?: string
}

export interface CartItem extends Product {
  quantity: number
}
