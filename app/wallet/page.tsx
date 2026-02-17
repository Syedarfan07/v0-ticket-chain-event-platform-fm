"use client"

import { useState } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { MOCK_TICKETS } from "@/lib/data"
import type { Ticket } from "@/lib/data"
import {
  QrCode,
  Tag,
  CalendarDays,
  MapPin,
  CheckCircle2,
  XCircle,
} from "lucide-react"

function QRCodeSVG({ data }: { data: string }) {
  // Generate a deterministic QR-like grid from the data string
  const seed = data.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0)
  const size = 21
  const cells: boolean[][] = []
  for (let r = 0; r < size; r++) {
    cells[r] = []
    for (let c = 0; c < size; c++) {
      // Finder patterns (top-left, top-right, bottom-left)
      const inFinderTL = r < 7 && c < 7
      const inFinderTR = r < 7 && c >= size - 7
      const inFinderBL = r >= size - 7 && c < 7
      if (inFinderTL || inFinderTR || inFinderBL) {
        const lr = inFinderTL ? r : inFinderTR ? r : r - (size - 7)
        const lc = inFinderTL ? c : inFinderTR ? c - (size - 7) : c
        const border =
          lr === 0 || lr === 6 || lc === 0 || lc === 6
        const inner = lr >= 2 && lr <= 4 && lc >= 2 && lc <= 4
        cells[r][c] = border || inner
      } else {
        cells[r][c] = ((seed * (r + 1) * (c + 1) + r * 37 + c * 53) % 5) < 2
      }
    }
  }

  const cellSize = 8
  const svgSize = size * cellSize

  return (
    <svg
      width={svgSize}
      height={svgSize}
      viewBox={`0 0 ${svgSize} ${svgSize}`}
      className="mx-auto"
    >
      <rect width={svgSize} height={svgSize} fill="white" />
      {cells.map((row, r) =>
        row.map(
          (cell, c) =>
            cell && (
              <rect
                key={`${r}-${c}`}
                x={c * cellSize}
                y={r * cellSize}
                width={cellSize}
                height={cellSize}
                fill="black"
              />
            )
        )
      )}
    </svg>
  )
}

function TicketCard({
  ticket,
  onShowQR,
  onResell,
}: {
  ticket: Ticket
  onShowQR: (t: Ticket) => void
  onResell: (t: Ticket) => void
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/50">
      <div className="relative aspect-[16/10] overflow-hidden bg-secondary">
        <Image
          src={ticket.imageUrl}
          alt={ticket.eventTitle}
          fill
          className="object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <Badge
            variant={ticket.isUsed ? "secondary" : "default"}
            className="text-xs"
          >
            {ticket.isUsed ? "Used" : "Valid"}
          </Badge>
          {ticket.isListedForResale && (
            <Badge variant="outline" className="border-primary/50 text-xs text-primary">
              Listed for Sale
            </Badge>
          )}
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="font-mono text-xs font-bold text-foreground">
            Token {ticket.tokenId}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="mb-2 text-base font-semibold text-foreground">
          {ticket.eventTitle}
        </h3>
        <div className="mb-4 flex flex-col gap-1.5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            <span>
              {new Date(ticket.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">{ticket.venue}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {!ticket.isUsed && (
            <Button
              size="sm"
              className="flex-1 gap-1.5"
              onClick={() => onShowQR(ticket)}
            >
              <QrCode className="h-3.5 w-3.5" />
              Show QR
            </Button>
          )}
          {!ticket.isUsed && !ticket.isListedForResale && (
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-1.5"
              onClick={() => onResell(ticket)}
            >
              <Tag className="h-3.5 w-3.5" />
              Resell
            </Button>
          )}
          {ticket.isUsed && (
            <div className="flex flex-1 items-center justify-center gap-1.5 rounded-md bg-secondary py-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Already Used
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default function WalletPage() {
  const [tickets] = useState(MOCK_TICKETS)
  const [qrTicket, setQrTicket] = useState<Ticket | null>(null)
  const [resellTicket, setResellTicket] = useState<Ticket | null>(null)
  const [resalePrice, setResalePrice] = useState("")
  const [isListing, setIsListing] = useState(false)
  const [listed, setListed] = useState(false)

  const handleList = () => {
    setIsListing(true)
    setTimeout(() => {
      setIsListing(false)
      setListed(true)
      setTimeout(() => {
        setResellTicket(null)
        setResalePrice("")
        setListed(false)
      }, 1500)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            My Wallet
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your NFT ticket collection
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
            <div className="h-2 w-2 rounded-full bg-success" />
            <span className="font-mono text-xs text-muted-foreground">
              Connected: 0xUser...1234
            </span>
          </div>
        </div>

        {tickets.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                ticket={ticket}
                onShowQR={setQrTicket}
                onResell={setResellTicket}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <QrCode className="mb-4 h-12 w-12 text-muted-foreground/30" />
            <p className="text-base font-medium text-foreground">
              No tickets yet
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Purchase tickets from the marketplace
            </p>
          </div>
        )}
      </main>
      <Footer />

      {/* QR Code Dialog */}
      <Dialog open={!!qrTicket} onOpenChange={() => setQrTicket(null)}>
        <DialogContent className="max-w-sm bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">Entry QR Code</DialogTitle>
          </DialogHeader>
          {qrTicket && (
            <div className="flex flex-col items-center gap-4">
              <div className="rounded-xl border border-border bg-foreground p-4">
                <QRCodeSVG
                  data={`ticketchain://${qrTicket.id}/${qrTicket.tokenId}`}
                />
              </div>
              <div className="text-center">
                <p className="text-sm font-semibold text-foreground">
                  {qrTicket.eventTitle}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  Token {qrTicket.tokenId}
                </p>
              </div>
              <div className="w-full rounded-lg bg-secondary p-3">
                <div className="flex flex-col gap-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Date</span>
                    <span className="font-mono text-foreground">
                      {new Date(qrTicket.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Venue</span>
                    <span className="text-foreground">{qrTicket.venue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Status</span>
                    <span className="text-success font-medium">Valid</span>
                  </div>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                Present this QR code at the venue entrance for verification
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Resell Dialog */}
      <Dialog open={!!resellTicket} onOpenChange={() => { setResellTicket(null); setResalePrice(""); setListed(false) }}>
        <DialogContent className="max-w-sm bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">
              List Ticket for Resale
            </DialogTitle>
          </DialogHeader>
          {resellTicket && (
            <div className="flex flex-col gap-4">
              <div className="rounded-lg bg-secondary p-3">
                <p className="text-sm font-semibold text-foreground">
                  {resellTicket.eventTitle}
                </p>
                <p className="mt-1 font-mono text-xs text-muted-foreground">
                  Token {resellTicket.tokenId}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Original price: {resellTicket.purchasePrice} ETH
                </p>
              </div>

              {listed ? (
                <div className="flex flex-col items-center gap-2 rounded-lg bg-success/10 p-4">
                  <CheckCircle2 className="h-8 w-8 text-success" />
                  <p className="text-sm font-semibold text-success">
                    Listed Successfully!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex flex-col gap-2">
                    <Label className="text-foreground">Resale Price (ETH)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      placeholder="0.20"
                      value={resalePrice}
                      onChange={(e) => setResalePrice(e.target.value)}
                    />
                  </div>
                  <Button
                    className="w-full gap-2"
                    onClick={handleList}
                    disabled={!resalePrice || isListing}
                  >
                    {isListing ? (
                      <>
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                        Listing...
                      </>
                    ) : (
                      <>
                        <Tag className="h-4 w-4" />
                        List for {resalePrice || "---"} ETH
                      </>
                    )}
                  </Button>
                </>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
