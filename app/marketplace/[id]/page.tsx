"use client"

import { use, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MOCK_EVENTS } from "@/lib/data"
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Ticket,
  ExternalLink,
} from "lucide-react"

export default function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const event = MOCK_EVENTS.find((e) => e.id === id)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [purchased, setPurchased] = useState(false)

  if (!event) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto flex max-w-7xl flex-col items-center justify-center px-4 py-20">
          <p className="text-lg font-medium text-foreground">Event not found</p>
          <Link href="/marketplace" className="mt-4">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Button>
          </Link>
        </main>
      </div>
    )
  }

  const percentSold = Math.round((event.sold / event.supply) * 100)
  const remaining = event.supply - event.sold

  const handlePurchase = () => {
    setIsPurchasing(true)
    setTimeout(() => {
      setIsPurchasing(false)
      setPurchased(true)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-5xl px-4 py-8">
        <Link
          href="/marketplace"
          className="mb-6 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Marketplace
        </Link>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
          {/* Image */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl border border-border bg-secondary">
              <Image
                src={event.imageUrl}
                alt={event.title}
                fill
                className="object-cover"
                crossOrigin="anonymous"
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div>
              <Badge
                variant={
                  event.status === "sold-out" ? "destructive" : "default"
                }
                className="mb-3"
              >
                {event.status === "sold-out" ? "Sold Out" : event.category}
              </Badge>
              <h1 className="text-2xl font-bold text-foreground text-balance">
                {event.title}
              </h1>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <CalendarDays className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  {new Date(event.date).toLocaleDateString("en-US", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 text-primary" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 text-primary" />
                <span>{event.venue}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Users className="h-4 w-4 shrink-0 text-primary" />
                <span>
                  {remaining > 0
                    ? `${remaining} tickets remaining`
                    : "No tickets remaining"}
                </span>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-muted-foreground">
              {event.description}
            </p>

            {/* Progress */}
            <div>
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {event.sold}/{event.supply} minted
                </span>
                <span>{percentSold}%</span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${percentSold}%` }}
                />
              </div>
            </div>

            {/* Purchase Section */}
            <div className="rounded-xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Price per ticket
                </span>
                <span className="font-mono text-xl font-bold text-foreground">
                  {event.price} ETH
                </span>
              </div>

              {purchased ? (
                <div className="flex flex-col items-center gap-3 rounded-lg bg-success/10 p-4">
                  <Ticket className="h-8 w-8 text-success" />
                  <p className="text-sm font-semibold text-success">
                    Ticket Purchased Successfully!
                  </p>
                  <Link href="/wallet">
                    <Button variant="outline" size="sm" className="gap-1">
                      View in Wallet
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </Link>
                </div>
              ) : (
                <Button
                  className="w-full gap-2"
                  size="lg"
                  disabled={
                    event.status === "sold-out" ||
                    event.status === "cancelled" ||
                    isPurchasing
                  }
                  onClick={handlePurchase}
                >
                  {isPurchasing ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                      Minting...
                    </>
                  ) : event.status === "sold-out" ? (
                    "Sold Out"
                  ) : (
                    <>
                      <Ticket className="h-4 w-4" />
                      Purchase Ticket
                    </>
                  )}
                </Button>
              )}

              <p className="mt-3 text-center text-xs text-muted-foreground">
                Transaction will be processed on Ethereum Mainnet
              </p>
            </div>

            {/* Contract Info */}
            <div className="flex flex-col gap-2 text-xs text-muted-foreground">
              <div className="flex justify-between">
                <span>Contract</span>
                <span className="font-mono text-foreground">
                  0x742d...Fa88
                </span>
              </div>
              <div className="flex justify-between">
                <span>Token Standard</span>
                <span className="font-mono text-foreground">ERC-721</span>
              </div>
              <div className="flex justify-between">
                <span>Organizer</span>
                <span className="font-mono text-foreground">
                  {event.organizer}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
