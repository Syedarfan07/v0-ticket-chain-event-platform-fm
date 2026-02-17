import { Ticket } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
            <Ticket className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
          <span className="font-mono text-sm font-bold text-foreground">
            TicketChain
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          Built on Ethereum. Powered by smart contracts. No intermediaries.
        </p>
        <p className="font-mono text-xs text-muted-foreground">
          &copy; 2026 TicketChain
        </p>
      </div>
    </footer>
  )
}
