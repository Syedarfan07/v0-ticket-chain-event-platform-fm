import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Shield, Zap, Globe } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-24 md:pb-32 md:pt-36">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <div className="h-2 w-2 rounded-full bg-success animate-pulse" />
            <span className="font-mono text-xs text-muted-foreground">
              Live on Ethereum Mainnet
            </span>
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight tracking-tight text-foreground md:text-6xl lg:text-7xl text-balance">
            The Future of
            <span className="text-primary"> Event Ticketing</span>
          </h1>
          <p className="mb-10 text-base leading-relaxed text-muted-foreground md:text-lg text-pretty">
            TicketChain connects Organizers, Buyers, and Verifiers on a
            decentralized platform. Every ticket is an NFT -- verifiable,
            tradeable, and impossible to counterfeit.
          </p>
          <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/marketplace">
              <Button size="lg" className="w-full sm:w-auto gap-2">
                Explore Marketplace
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/organizer">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                Create Event
              </Button>
            </Link>
          </div>
        </div>

        <div className="mx-auto mt-20 grid max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {[
            {
              icon: Shield,
              title: "Fraud-Proof",
              desc: "Every ticket is a unique NFT on the blockchain, eliminating counterfeits entirely.",
            },
            {
              icon: Zap,
              title: "Instant Transfers",
              desc: "Buy, sell, or transfer tickets peer-to-peer with zero intermediaries.",
            },
            {
              icon: Globe,
              title: "Global Access",
              desc: "Attend events worldwide with a single wallet. No borders, no barriers.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="group rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50"
            >
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <item.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="mb-2 text-sm font-semibold text-foreground">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
