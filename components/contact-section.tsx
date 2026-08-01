import { MessageCircle, Camera, Mail } from "lucide-react"
import { CONTACT_EMAIL, INSTAGRAM_HANDLE, INSTAGRAM_URL, WHATSAPP_NUMBER } from "@/lib/config"

const CONTACTS = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: "Escribinos",
    href: `https://wa.me/${WHATSAPP_NUMBER}`,
  },
  {
    icon: Camera,
    label: "Instagram",
    value: `@${INSTAGRAM_HANDLE}`,
    href: INSTAGRAM_URL,
  },
  {
    icon: Mail,
    label: "Email",
    value: CONTACT_EMAIL,
    href: `mailto:${CONTACT_EMAIL}`,
  },
]

export function ContactSection() {
  return (
    <section id="contacto" className="scroll-mt-20 py-12 sm:py-16">
      <div className="mb-6 sm:mb-8 text-center">
        <h2 className="text-balance text-2xl font-semibold tracking-tight sm:text-3xl">Contacto</h2>
        <p className="mt-1.5 text-sm text-muted-foreground sm:text-base">
          Estamos para ayudarte a armar tu pedido.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {CONTACTS.map(({ icon: Icon, label, value, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
          >
            <span className="inline-flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
              <Icon className="size-5" />
            </span>
            <span className="text-sm font-medium">{label}</span>
            <span className="text-sm text-muted-foreground">{value}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
