"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CreateEventDialog } from "@/components/create-event-dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { MOCK_EVENTS, MOCK_VERIFIERS, type Verifier } from "@/lib/data"
import {
  BarChart3,
  Ticket,
  DollarSign,
  TrendingUp,
  XCircle,
  Plus,
  Pencil,
  Trash2,
  Users,
  CalendarDays,
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

// --- Add / Edit Verifier Dialog ---
function VerifierFormDialog({
  mode,
  verifier,
  onSave,
  trigger,
}: {
  mode: "add" | "edit"
  verifier?: Verifier
  onSave: (data: { name: string; email: string; assignedEventIds: string[] }) => void
  trigger: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [name, setName] = useState(verifier?.name ?? "")
  const [email, setEmail] = useState(verifier?.email ?? "")
  const [selectedEvents, setSelectedEvents] = useState<string[]>(
    verifier?.assignedEventIds ?? []
  )

  const handleToggleEvent = (eventId: string) => {
    setSelectedEvents((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({ name, email, assignedEventIds: selectedEvents })
    setOpen(false)
    if (mode === "add") {
      setName("")
      setEmail("")
      setSelectedEvents([])
    }
  }

  const handleOpenChange = (isOpen: boolean) => {
    setOpen(isOpen)
    if (isOpen && verifier) {
      setName(verifier.name)
      setEmail(verifier.email)
      setSelectedEvents(verifier.assignedEventIds)
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-foreground">
            {mode === "add" ? "Add Verifier" : "Edit Verifier"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2">
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Name</Label>
            <Input
              placeholder="Full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Email</Label>
            <Input
              type="email"
              placeholder="verifier@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <Label className="text-foreground">Assign Events</Label>
            <div className="max-h-48 overflow-y-auto rounded-lg border border-border bg-secondary/50 p-3">
              <div className="flex flex-col gap-2">
                {MOCK_EVENTS.map((event) => (
                  <label
                    key={event.id}
                    className="flex cursor-pointer items-center gap-3 rounded-md p-2 transition-colors hover:bg-background"
                  >
                    <Checkbox
                      checked={selectedEvents.includes(event.id)}
                      onCheckedChange={() => handleToggleEvent(event.id)}
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-foreground">
                        {event.title}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(event.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <Button type="submit" className="mt-2">
            {mode === "add" ? "Add Verifier" : "Save Changes"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// --- Main Page ---
export default function OrganizerPage() {
  const [events, setEvents] = useState(organizerEvents)
  const [verifiers, setVerifiers] = useState<Verifier[]>([...MOCK_VERIFIERS])

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

  const handleAddVerifier = (data: {
    name: string
    email: string
    assignedEventIds: string[]
  }) => {
    const newVerifier: Verifier = {
      id: `vrf-${Date.now()}`,
      name: data.name,
      email: data.email,
      assignedEventIds: data.assignedEventIds,
    }
    setVerifiers((prev) => [...prev, newVerifier])
  }

  const handleEditVerifier = (
    id: string,
    data: { name: string; email: string; assignedEventIds: string[] }
  ) => {
    setVerifiers((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...data } : v))
    )
  }

  const handleRemoveVerifier = (id: string) => {
    setVerifiers((prev) => prev.filter((v) => v.id !== id))
  }

  const getEventTitle = (eventId: string) => {
    return MOCK_EVENTS.find((e) => e.id === eventId)?.title ?? eventId
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
              Manage your events, track sales, and coordinate staff
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

        {/* Tabs: Events / Staff */}
        <Tabs defaultValue="events">
          <TabsList className="mb-4">
            <TabsTrigger value="events" className="gap-1.5">
              <CalendarDays className="h-4 w-4" />
              Events
            </TabsTrigger>
            <TabsTrigger value="staff" className="gap-1.5">
              <Users className="h-4 w-4" />
              Staff
            </TabsTrigger>
          </TabsList>

          {/* --- Events Tab --- */}
          <TabsContent value="events">
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
                      <TableHead className="text-muted-foreground">
                        Event
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Date
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Price
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Sold
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Status
                      </TableHead>
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
          </TabsContent>

          {/* --- Staff Tab --- */}
          <TabsContent value="staff">
            <div className="rounded-xl border border-border bg-card">
              <div className="flex items-center justify-between border-b border-border p-4">
                <div>
                  <h2 className="text-base font-semibold text-foreground">
                    Verifier Staff
                  </h2>
                  <p className="mt-0.5 text-xs text-muted-foreground">
                    Manage verifiers who scan tickets at your events
                  </p>
                </div>
                <VerifierFormDialog
                  mode="add"
                  onSave={handleAddVerifier}
                  trigger={
                    <Button size="sm" className="gap-1.5">
                      <Plus className="h-3.5 w-3.5" />
                      Add Verifier
                    </Button>
                  }
                />
              </div>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-border hover:bg-transparent">
                      <TableHead className="text-muted-foreground">
                        Name
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Email
                      </TableHead>
                      <TableHead className="text-muted-foreground">
                        Assigned Events
                      </TableHead>
                      <TableHead className="text-right text-muted-foreground">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {verifiers.length === 0 ? (
                      <TableRow className="border-border">
                        <TableCell
                          colSpan={4}
                          className="py-12 text-center text-sm text-muted-foreground"
                        >
                          No verifiers added yet. Click &quot;Add Verifier&quot;
                          to get started.
                        </TableCell>
                      </TableRow>
                    ) : (
                      verifiers.map((verifier) => (
                        <TableRow
                          key={verifier.id}
                          className="border-border hover:bg-secondary/50"
                        >
                          <TableCell className="font-medium text-foreground">
                            {verifier.name}
                          </TableCell>
                          <TableCell className="font-mono text-sm text-muted-foreground">
                            {verifier.email}
                          </TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {verifier.assignedEventIds.length === 0 ? (
                                <span className="text-xs text-muted-foreground">
                                  No events assigned
                                </span>
                              ) : (
                                verifier.assignedEventIds.map((eid) => (
                                  <Badge
                                    key={eid}
                                    variant="secondary"
                                    className="text-[10px]"
                                  >
                                    {getEventTitle(eid)}
                                  </Badge>
                                ))
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <VerifierFormDialog
                                mode="edit"
                                verifier={verifier}
                                onSave={(data) =>
                                  handleEditVerifier(verifier.id, data)
                                }
                                trigger={
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1"
                                  >
                                    <Pencil className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">
                                      Edit
                                    </span>
                                  </Button>
                                }
                              />
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="gap-1 text-destructive hover:text-destructive"
                                  >
                                    <Trash2 className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only">
                                      Remove
                                    </span>
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent className="bg-card border-border">
                                  <AlertDialogHeader>
                                    <AlertDialogTitle className="text-foreground">
                                      Remove Verifier
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to remove{" "}
                                      <span className="font-semibold text-foreground">
                                        {verifier.name}
                                      </span>{" "}
                                      from your staff? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                    <AlertDialogAction
                                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                      onClick={() =>
                                        handleRemoveVerifier(verifier.id)
                                      }
                                    >
                                      Remove
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
      <Footer />
    </div>
  )
}
