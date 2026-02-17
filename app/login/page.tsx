"use client"

import Link from "next/link"
import { Ticket, ShoppingBag, LayoutDashboard, ScanLine, ArrowLeft } from "lucide-react"

const ROLES = [
  {
    key: "buyer",
    label: "Buyer",
    href: "/login/buyer",
    icon: ShoppingBag,
    tagline: "Purchase & collect NFT tickets",
    description: "Browse events, buy tickets as NFTs, and manage your collection in your personal wallet.",
  },
  {
    key: "organizer",
    label: "Organizer",
    href: "/login/organizer",
    icon: LayoutDashboard,
    tagline: "Create events & manage sales",
    description: "Deploy ticket smart contracts, track sales analytics, and manage your event staff.",
  },
  {
    key: "verifier",
    label: "Verifier",
    href: "/login/verifier",
    icon: ScanLine,
    tagline: "Scan & validate tickets at venues",
    description: "Verify NFT tickets on-chain at event entrances and track scan history in real time.",
  },
] as const

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Ticket className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-mono text-lg font-bold tracking-tight text-foreground">
              TicketChain
            </span>
          </Link>
        </div>
      </header>

      <main className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 self-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-foreground md:text-4xl text-balance">
            Sign in to TicketChain
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground text-pretty max-w-md mx-auto">
            Choose your role to continue. Each role has its own dashboard and set of tools.
          </p>
        </div>

        <div className="grid w-full max-w-4xl grid-cols-1 gap-4 md:grid-cols-3">
          {ROLES.map((role) => {
            const Icon = role.icon
            return (
              <Link
                key={role.key}
                href={role.href}
                className="group flex flex-col items-center rounded-xl border border-border bg-card p-8 text-center transition-all hover:border-primary/50 hover:bg-card/80 hover:shadow-lg hover:shadow-primary/5"
              >
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary transition-colors group-hover:border-primary/30 group-hover:bg-primary/10">
                  <Icon className="h-8 w-8 text-muted-foreground transition-colors group-hover:text-primary" />
                </div>
                <h2 className="mb-1 text-lg font-bold text-foreground">
                  {role.label}
                </h2>
                <p className="mb-3 text-sm font-medium text-primary">
                  {role.tagline}
                </p>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {role.description}
                </p>
              </Link>
            )
          })}
        </div>
      </main>
    </div>
  )
}
