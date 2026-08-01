import { ChevronDown } from "lucide-react"

export function Hero() {
  return (
    <section className="relative flex flex-col items-center justify-center py-8 text-center">
      <span className="mb-15 rounded-full border border-border bg-card px-5 py-1.5 text-xs font-medium text-muted-foreground">
        Pedidos por WhatsApp · Sin cuentas ni pagos online
      </span>
      <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
        Disfruta el ritual del mate.
      </h1>
      <p className="mt-4 max-w-xl text-balance text-base leading-relaxed text-muted-foreground sm:text-lg">
        ⚡ Combina Baldo, Canarias y Rei Verde para acceder al precio mayorista.
      </p>

      <a
        href="#yerbas"
        aria-label="Ver productos"
        className="mt-25 flex flex-col items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
      >
        <span className="text-xs uppercase tracking-widest">Explorar</span>
        <ChevronDown className="size-5 animate-scroll-bounce" />
      </a>
    </section>
  )
}
