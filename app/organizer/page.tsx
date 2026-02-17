"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MOCK_EVENTS } from "@/lib/data"
import {
  BarChart3,
  Ticket,
  DollarSign,
  TrendingUp,
  XCircle,
} from "lucide-react"

const organizerEvents = MOCK_EVENTS.filter(
  (e) => e.organizer === "0x1234...abcd" || e.organizer === "0x5678...efgh"
)

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType
  label: string
  value: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
        <Icon className="h-4.5 w-4.5 text-primary" />
      </div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-2xl font-bold text-foreground">
        {value}
      </p>
    </div>
  )
}

export default function OrganizerPage() {
  const [events, setEvents] = useState(organizerEvents)

  const totalSold = events.reduce((acc, e) => acc + e.sold, 0)
  const totalRevenue = events.reduce((acc, e) => acc + e.sold * e.price, 0)
  const totalSupply = events.reduce((acc, e) => acc + e.supply, 0)

  const handleCancel = (id: string) => {
    setEvents((prev) =>
      prev.map((e) =>
        e.id === id ? { ...e, status: "cancelled" as const } : e
      )
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">
              Organizer Dashboard
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage your events and track sales
            </p>
          </div>
          <CreateEventDialog />
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={Ticket}
            label="Total Events"
            value={String(events.length)}
          />
          <StatCard
            icon={BarChart3}
            label="Tickets Sold"
            value={totalSold.toLocaleString()}
          />
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`${totalRevenue.toFixed(2)} ETH`}
          />
          <StatCard
            icon={TrendingUp}
            label="Avg. Fill Rate"
            value={`${Math.round((totalSold / totalSupply) * 100)}%`}
          />
        </div>

        {/* Events Table */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="text-base font-semibold text-foreground">
              Your Events
            </h2>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">Event</TableHead>
                  <TableHead className="text-muted-foreground">Date</TableHead>
                  <TableHead className="text-muted-foreground">Price</TableHead>
                  <TableHead className="text-muted-foreground">Sold</TableHead>
                  <TableHead className="text-muted-foreground">Status</TableHead>
                  <TableHead className="text-right text-muted-foreground">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {events.map((event) => (
                  <TableRow
                    key={event.id}
                    className="border-border hover:bg-secondary/50"
                  >
                    <TableCell className="font-medium text-foreground">
                      {event.title}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </TableCell>
                    <TableCell className="font-mono text-sm text-foreground">
                      {event.price} ETH
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm">
                          {event.sold}/{event.supply}
                        </span>
                        <div className="hidden h-1.5 w-16 overflow-hidden rounded-full bg-secondary sm:block">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{
                              width: `${(event.sold / event.supply) * 100}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          event.status === "active"
                            ? "default"
                            : event.status === "sold-out"
                              ? "secondary"
                              : "destructive"
                        }
                        className="text-xs"
                      >
                        {event.status === "active"
                          ? "Active"
                          : event.status === "sold-out"
                            ? "Sold Out"
                            : "Cancelled"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {event.status === "active" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="gap-1 text-destructive hover:text-destructive"
                          onClick={() => handleCancel(event.id)}
                        >
                          <XCircle className="h-3.5 w-3.5" />
                          Cancel
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
