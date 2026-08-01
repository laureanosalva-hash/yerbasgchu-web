import type { Product } from "./types"

// ---------------------------------------------------------------------------
// PRODUCT DATA — placeholder values. Edit freely.
// Yerbas store ONLY costPrice (retail/wholesale are calculated automatically).
// All other items store a fixed `price`.
// ---------------------------------------------------------------------------

const img = (label: string) => `/placeholder.svg?height=600&width=600&query=${encodeURIComponent(label)}`

// 1 COMBOS (fixed price)
export const combos: Product[] = [
  {
    id: "combo-baldo",
    name: "Combo Baldo",
    category: "Combo Baldo",
    price: "Consultanos ->",
    stock: true,
    description: "Mate + bombilla + 2 kg de yerba para arrancar el ritual.",
    image: "/combo baldo.jpg",
  },
  {
    id: "combo-canarias",
    name: "Combo Canarias",
    category: "Combo Canarias",
    price: 32500,
    stock: true,
    description: "Mate + bombilla + 2 kg de yerba para arrancar el ritual.",
    image: "/combo canarias.jpg",
  },
  {
    id: "combo-reiverde",
    name: "Combo Rei Verde",
    category: "Combo Rei Verde",
    price: 41900,
    stock: true,
    description: "Mate + bombilla + 2 kg de yerba para arrancar el ritual.",
    image: "/combo reiverde.jpg",
  },
  {
    id: "combo-premium",
    name: "Combo Rei Verde PREMIUM",
    category: "Combo Rei Verde premium",
    price: 41900,
    stock: true,
    description: "Mate + bombilla + 2 kg de yerba para arrancar el ritual.",
    image: "/combo premium.jpg",
  },
  {
    id: "combo-reiverde 3k",
    name: "Combo Rei Verde 3k",
    category: "Combo Rei Verde 3k",
    price: 41900,
    stock: true,
    description: "Mate + bombilla + 3 kg de yerba para arrancar el ritual.",
    image: "/combo 3k.jpg",
  },
  {
    id: "combo-reiverde 500g",
    name: "Combo Rei Verde medio kilo",
    category: "Combo Rei Verde",
    price: 41900,
    stock: true,
    description: "Mate + bombilla + 1 kg de yerba para arrancar el ritual.",
    image: "/combo 500g.jpg",
  },
]

// 2. YERBAS (store only costPrice; wholesale is by package count)
export const yerbas: Product[] = [
  {
    id: "baldo",
    name: "Baldo",
    category: "yerba",
    brand: "Baldo",
    costPrice: 8440,
    stock: true,
    image: "/baldo.jpeg",
  },
  {
    id: "canarias",
    name: "Canarias",
    category: "yerba",
    brand: "Canarias",
    costPrice: 8800,
    stock: true,
    image: "/canarias.jpeg",
  },
  {
    id: "rei-verde",
    name: "Rei Verde",
    category: "yerba",
    brand: "Rei Verde",
    costPrice: 6500,
    stock: true,
    image: "/reiverde.jpeg",
  },
  {
    id: "rei-verde-p",
    name: "Rei Verde PREMIUM",
    category: "yerba",
    brand: "Premium",
    costPrice: 8000,
    stock: true,
    image: "/premium.jpeg",
  },
  {
    id: "rei-verde-3",
    name: "Rei Verde 3kg",
    category: "yerba",
    brand: "Rei Verde 3kg",
    costPrice: 18700,
    stock: true,
    image: "/reiverde3.jpeg",
  },
    {
    id: "rei-verde 500",
    name: "Rei Verde 500g",
    category: "yerba",
    brand: "Rei Verde 500g",
    costPrice: 3600,
    stock: true,
    image: "/500g.jpg",
  },
]

// 3. MATES (fixed price)
export const mates: Product[] = [
  {
    id: "mate-hexagonal",
    name: "Mate Hexagonal con grabado + Bombilla acero inox",
    category: "mate",
    price: 10000,
    stock: true,
    image: "mate1.jpeg",
  },
  {
    id: "mate-perita",
    name: "Mate Perita con grabado + Bombilla acero inox",
    category: "mate",
    price: 10000,
    stock: true,
    image: "mate2.jpeg",
  },
  {
    id: "mate-premium",
    name: "Mate Premium + Bombilla acero inox",
    category: "mate",
    price: 16000,
    stock: true,
    image: "mate3.jpeg",
  },
]

// 4. VARIOS (fixed price)
export const varios: Product[] = [
  {
    id: "bombilla-acero",
    name: "Bombilla Acero Inoxidable",
    category: "bombilla",
    price: 4500,
    stock: true,
    image: "/bombilla.jpeg",
  },
  {
    id: "luces-materas",
    name: "Luces materas",
    category: "luces-materas",
    price: 3500,
    stock: true,
    image: "/luces.jpeg",
  },
  
]

// 5. MERCHANDISING (fixed price)
export const merchandising: Product[] = [
  {
    id: "termo-1l",
    name: "Termo 1L",
    category: "merchandising",
    price: 38500,
    stock: true,
    image: img("stainless steel thermos 1 liter premium dark background"),
  },
  {
    id: "matera",
    name: "Matera de Lona",
    category: "merchandising",
    price: 15900,
    stock: true,
    image: img("canvas mate carrying bag matera premium dark background"),
  },
  {
    id: "yerbera",
    name: "Yerbera + Azucarera",
    category: "merchandising",
    price: 9200,
    stock: false,
    image: img("yerba and sugar dispenser set premium dark background"),
  },
  {
    id: "limpia-bombilla",
    name: "Limpia Bombillas",
    category: "merchandising",
    price: 2100,
    stock: true,
    image: img("bombilla cleaning brush tool premium dark background"),
  },
]

export const allProducts: Product[] = [
  ...combos,
  ...yerbas,
  ...mates,
  ...varios,
  ...merchandising,
]
