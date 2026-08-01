import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { CombosSection } from "@/components/combos-section"
import { ProductSection } from "@/components/product-section"
import { AboutSection } from "@/components/about-section"
import { ContactSection } from "@/components/contact-section"
import { CartPanel } from "@/components/cart-panel"
import { yerbas, mates, varios, merchandising } from "@/lib/products"

export default function HomePage() {
  return (
    <div id="top" className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 sm:px-10">
        
        <div className="flex justify-center pt-10 pb-10">
          <img src="/logo1.png" alt="YerbasGchu" className="w-40 md:w-56 h-auto" />

        </div>
        <Hero />
        <div className="mt-35"></div>
        {<CombosSection />}
        <ProductSection
          id="yerbas"
          title=""
          subtitle=""
          products={yerbas}
          banner={
            <div className="rounded-2xl border border-border bg-secondary/40 p-4 sm:p-5">
              <p className="text-sm font-medium sm:text-base">
                Ventas por mayor desde 10 paquetes.
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                Podés combinar cualquier marca para acceder al mejor precio.
              </p>
            </div>
          }
        />
        <ProductSection id="mates" title="Mates" products={mates} />
        <ProductSection id="varios" title="varios" products={varios} />
        {/*<ProductSection id="merchandising" title="Merchandising" products={merchandising} />*/}
        <AboutSection />
        <ContactSection />
      </main>

      <footer className="border-t border-border py-8 text-center text-sm text-muted-foreground">
        <p>
          Yerbas<span className="text-primary">Gchu</span> — Yerbas seleccionadas
        </p>
      </footer>

      <CartPanel />
    </div>
  )
}
