import Link from "next/link"
import { Button } from "@/components/ui/button"
import { EventCard } from "@/components/event-card"
import { MOCK_EVENTS } from "@/lib/data"
import { ArrowRight } from "lucide-react"

export function FeaturedEvents() {
  const featured = MOCK_EVENTS.filter((e) => e.status === "active").slice(0, 3)

  return (
    <section className="border-t border-border bg-background py-16 md:py-24">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-10 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground md:text-3xl">
              Featured Events
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Discover trending events in the Web3 space
            </p>
          </div>
          <Link href="/marketplace" className="hidden sm:block">
            <Button variant="ghost" size="sm" className="gap-1 text-primary">
              View All
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>

        <div className="mt-8 text-center sm:hidden">
          <Link href="/marketplace">
            <Button variant="outline" className="gap-1">
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
