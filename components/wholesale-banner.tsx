"use client"

import type { WholesaleStatus } from "@/lib/wholesale"

export function WholesaleBanner({ status }: { status: WholesaleStatus }) {
  const progress = Math.min(100, (status.packages / status.threshold) * 100)

  const tone =
    status.tier === "active"
      ? "border-primary/50 bg-primary/10"
      : status.tier === "close"
        ? "border-primary/30 bg-primary/5"
        : "border-border bg-secondary/50"

  return (
    <div className={`rounded-2xl border p-4 ${tone}`}>
      <div className="space-y-1.5">
        {status.messages.map((msg) => (
          <p key={msg} className="text-sm leading-snug">
            {msg}
          </p>
        ))}
      </div>

      <div className="mt-3">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-background">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-1.5 text-right text-xs text-muted-foreground">
          {status.packages} / {status.threshold} paquetes de yerba
        </p>
      </div>
    </div>
  )
}
