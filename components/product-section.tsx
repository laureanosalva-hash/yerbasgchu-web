import type { ReactNode } from "react"
import { ProductCard } from "./product-card"
import type { Product } from "@/lib/types"

interface ProductSectionProps {
  id: string
  title: string
  subtitle?: string
  products: Product[]
  /** Optional banner rendered between the header and the product grid. */
  banner?: ReactNode
}

export function ProductSection({ id, title, subtitle, products, banner }: ProductSectionProps) {
  return (
    <section id={id} className="scroll-mt-20 py-12 sm:py-16">
      <div className="mb-6 sm:mb-8">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h2>
        {subtitle && <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">{subtitle}</p>}
      </div>
      {banner && <div className="mb-6 sm:mb-8">{banner}</div>}
      {/* 2 columns on mobile, 4 on desktop */}
      <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
