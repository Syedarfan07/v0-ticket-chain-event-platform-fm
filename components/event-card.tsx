import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CalendarDays, MapPin } from "lucide-react"
import type { Event } from "@/lib/data"

export function EventCard({ event }: { event: Event }) {
  const percentSold = Math.round((event.sold / event.supply) * 100)

  return (
    <Link href={`/marketplace/${event.id}`}>
      <Card className="group overflow-hidden border-border bg-card transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
        <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent z-10" />
          <div className="absolute bottom-3 left-3 z-20 flex items-center gap-2">
            <Badge
              variant={event.status === "sold-out" ? "destructive" : "default"}
              className="text-xs"
            >
              {event.status === "sold-out" ? "Sold Out" : event.category}
            </Badge>
          </div>
          <div className="absolute bottom-3 right-3 z-20">
            <span className="font-mono text-sm font-bold text-foreground">
              {event.price} ETH
            </span>
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CalendarDays className="h-3.5 w-3.5 shrink-0" />
              <span>
                {new Date(event.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MapPin className="h-3.5 w-3.5 shrink-0" />
              <span className="line-clamp-1">{event.venue}</span>
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
              <span>
                {event.sold}/{event.supply} sold
              </span>
              <span>{percentSold}%</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${percentSold}%` }}
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}


