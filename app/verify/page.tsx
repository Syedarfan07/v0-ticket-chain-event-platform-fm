"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
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
import { useAuth } from "@/lib/auth-context"
import {
  MOCK_EVENTS,
  MOCK_VERIFIERS,
  MOCK_SCAN_RECORDS,
  type Event,
} from "@/lib/data"
import {
  ScanLine,
  Camera,
  CheckCircle2,
  XCircle,
  RotateCcw,
  MapPin,
  CalendarDays,
  Clock,
  X,
  AlertTriangle,
} from "lucide-react"

type ScanResult = "idle" | "scanning" | "granted" | "denied"

function ScannerOverlay({
  event,
  onClose,
}: {
  event: Event
  onClose: () => void
}) {
  const [scanState, setScanState] = useState<ScanResult>("idle")
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }, [])

  const startCamera = async () => {
    setCameraActive(true)
    setScanState("scanning")
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
    } catch {
      // Camera not available, continue with simulated scanning
    }
  }

  const simulateScan = (result: "granted" | "denied") => {
    stopCamera()
    setScanState(result)
  }

  const resetScan = () => {
    setScanState("idle")
    stopCamera()
  }

  const handleClose = () => {
    stopCamera()
    onClose()
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [stopCamera])

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      {/* Scanner Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <Button
            variant="ghost"
            size="sm"
            className="gap-1.5 text-muted-foreground hover:text-foreground"
            onClick={handleClose}
          >
            <X className="h-4 w-4" />
            Exit Scanner
          </Button>
          <div className="flex flex-col items-center">
            <span className="text-sm font-semibold text-foreground">
              {event.title}
            </span>
            <span className="text-[10px] text-muted-foreground">
              {event.venue}
            </span>
          </div>
          <div className="w-24" />
        </div>
      </header>

      {/* Scanner Body */}
      <main className="flex flex-1 flex-col items-center justify-center px-4 py-8">
        {/* Idle state */}
        {scanState === "idle" && (
          <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-border bg-secondary">
              <ScanLine className="h-12 w-12 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Scan Tickets
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {"Point your camera at the attendee's QR code to verify their ticket on the blockchain."}
              </p>
            </div>
            <Button size="lg" className="w-full gap-2" onClick={startCamera}>
              <Camera className="h-5 w-5" />
              Start Scanning
            </Button>
          </div>
        )}

        {/* Scanning state */}
        {scanState === "scanning" && (
          <div className="flex w-full max-w-sm flex-col items-center gap-6">
            <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border-2 border-primary bg-card">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative h-48 w-48">
                  <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-primary" />
                  <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-primary" />
                  <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-primary" />
                </div>
                <div className="absolute left-[calc(50%-96px)] top-[calc(50%-96px)] h-48 w-48 overflow-hidden">
                  <div className="h-0.5 w-full animate-[scan_2s_ease-in-out_infinite] bg-primary shadow-[0_0_8px_2px] shadow-primary/50" />
                </div>
              </div>
              {!cameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-secondary">
                  <Camera className="h-16 w-16 text-muted-foreground/30" />
                </div>
              )}
            </div>

            <p className="text-sm text-muted-foreground">
              Align QR code within the frame
            </p>

            <div className="flex w-full flex-col gap-2">
              <Button
                className="w-full gap-2"
                variant="outline"
                onClick={() => simulateScan("granted")}
              >
                <CheckCircle2 className="h-4 w-4 text-success" />
                Simulate: Valid Ticket
              </Button>
              <Button
                className="w-full gap-2"
                variant="outline"
                onClick={() => simulateScan("denied")}
              >
                <XCircle className="h-4 w-4 text-destructive" />
                Simulate: Invalid Ticket
              </Button>
            </div>

            <Button variant="ghost" size="sm" onClick={resetScan}>
              Cancel
            </Button>
          </div>
        )}

        {/* Access Granted */}
        {scanState === "granted" && (
          <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-success/10 ring-4 ring-success/20">
              <CheckCircle2 className="h-16 w-16 text-success" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-success">
                Access Granted
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Ticket verified on-chain. NFT is valid.
              </p>
            </div>
            <div className="w-full rounded-xl border border-success/20 bg-success/5 p-4">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Event</span>
                  <span className="font-medium text-foreground">
                    {event.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Token</span>
                  <span className="font-mono text-foreground">#4521</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Owner</span>
                  <span className="font-mono text-foreground">
                    0xUser...1234
                  </span>
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full gap-2" onClick={resetScan}>
              <RotateCcw className="h-4 w-4" />
              Scan Next Ticket
            </Button>
          </div>
        )}

        {/* Access Denied */}
        {scanState === "denied" && (
          <div className="flex w-full max-w-sm flex-col items-center gap-6 text-center">
            <div className="flex h-32 w-32 items-center justify-center rounded-full bg-destructive/10 ring-4 ring-destructive/20">
              <XCircle className="h-16 w-16 text-destructive" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-destructive">
                Access Denied
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                This ticket has already been used or is invalid.
              </p>
            </div>
            <div className="w-full rounded-xl border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex flex-col gap-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Reason</span>
                  <span className="font-medium text-destructive">
                    Already Scanned
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Scanned At</span>
                  <span className="font-mono text-foreground">
                    {new Date().toLocaleTimeString()}
                  </span>
                </div>
              </div>
            </div>
            <Button size="lg" className="w-full gap-2" onClick={resetScan}>
              <RotateCcw className="h-4 w-4" />
              Scan Next Ticket
            </Button>
          </div>
        )}
      </main>

      {/* Scan line animation */}
      <style jsx global>{`
        @keyframes scan {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(192px);
          }
        }
      `}</style>
    </div>
  )
}

// --- Main Verifier Dashboard ---
export default function VerifyPage() {
  const { user, isAuthenticated, role } = useAuth()
  const [scanningEvent, setScanningEvent] = useState<Event | null>(null)

  // Find the verifier matching the logged-in user
  const currentVerifier =
    isAuthenticated && role === "verifier" && user?.verifierId
      ? MOCK_VERIFIERS.find((v) => v.id === user.verifierId) ?? MOCK_VERIFIERS[0]
      : MOCK_VERIFIERS[0]

  // Get assigned events
  const assignedEvents = MOCK_EVENTS.filter((e) =>
    currentVerifier.assignedEventIds.includes(e.id)
  )

  // Get scan records for assigned events
  const scanRecords = MOCK_SCAN_RECORDS.filter((r) =>
    currentVerifier.assignedEventIds.includes(r.eventId)
  )

  if (scanningEvent) {
    return (
      <ScannerOverlay
        event={scanningEvent}
        onClose={() => setScanningEvent(null)}
      />
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground md:text-3xl">
            Verifier Dashboard
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Welcome back,{" "}
            <span className="font-medium text-foreground">
              {currentVerifier.name}
            </span>
            . You have{" "}
            <span className="font-medium text-foreground">
              {assignedEvents.length}
            </span>{" "}
            assigned event{assignedEvents.length !== 1 ? "s" : ""}.
          </p>
        </div>

        {/* Assigned Events Grid */}
        <div className="mb-10">
          <h2 className="mb-4 text-base font-semibold text-foreground">
            Assigned Events
          </h2>
          {assignedEvents.length === 0 ? (
            <div className="flex flex-col items-center rounded-xl border border-border bg-card py-16 text-center">
              <AlertTriangle className="mb-3 h-10 w-10 text-muted-foreground" />
              <p className="text-sm font-medium text-foreground">
                No events assigned
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Contact your organizer to get assigned to an event.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {assignedEvents.map((event) => {
                const eventScans = MOCK_SCAN_RECORDS.filter(
                  (r) => r.eventId === event.id
                )
                const validScans = eventScans.filter(
                  (r) => r.status === "valid"
                ).length

                return (
                  <div
                    key={event.id}
                    className="flex flex-col rounded-xl border border-border bg-card p-5"
                  >
                    <div className="mb-4 flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-sm font-semibold text-foreground text-balance">
                          {event.title}
                        </h3>
                        <div className="mt-2 flex flex-col gap-1">
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <MapPin className="h-3 w-3 shrink-0" />
                            {event.venue}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <CalendarDays className="h-3 w-3 shrink-0" />
                            {new Date(event.date).toLocaleDateString("en-US", {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            })}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3 shrink-0" />
                            {event.time}
                          </div>
                        </div>
                      </div>
                      <Badge
                        variant={
                          event.liveStatus === "live"
                            ? "default"
                            : event.liveStatus === "ended"
                              ? "secondary"
                              : "outline"
                        }
                        className="text-[10px] shrink-0"
                      >
                        {event.liveStatus === "live"
                          ? "Live"
                          : event.liveStatus === "ended"
                            ? "Ended"
                            : "Upcoming"}
                      </Badge>
                    </div>

                    {/* Quick stats */}
                    <div className="mb-4 flex gap-4 rounded-lg border border-border bg-secondary/50 px-3 py-2">
                      <div className="flex flex-col">
                        <span className="font-mono text-base font-bold text-foreground">
                          {eventScans.length}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Total Scans
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-base font-bold text-success">
                          {validScans}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Valid
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-mono text-base font-bold text-foreground">
                          {event.sold}/{event.supply}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          Tickets Sold
                        </span>
                      </div>
                    </div>

                    <Button
                      className="mt-auto gap-2"
                      onClick={() => setScanningEvent(event)}
                    >
                      <ScanLine className="h-4 w-4" />
                      Start Scanning
                    </Button>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        {/* Scan History */}
        <div className="rounded-xl border border-border bg-card">
          <div className="border-b border-border p-4">
            <h2 className="text-base font-semibold text-foreground">
              Scan History
            </h2>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Recent ticket scans across your assigned events
            </p>
          </div>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead className="text-muted-foreground">
                    Attendee
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Event
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Token ID
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Time
                  </TableHead>
                  <TableHead className="text-muted-foreground">
                    Status
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scanRecords.length === 0 ? (
                  <TableRow className="border-border">
                    <TableCell
                      colSpan={5}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No scan records yet. Start scanning tickets at your
                      assigned events.
                    </TableCell>
                  </TableRow>
                ) : (
                  scanRecords.map((record) => {
                    const event = MOCK_EVENTS.find(
                      (e) => e.id === record.eventId
                    )
                    return (
                      <TableRow
                        key={record.id}
                        className="border-border hover:bg-secondary/50"
                      >
                        <TableCell className="font-medium text-foreground">
                          {record.attendeeName}
                        </TableCell>
                        <TableCell className="text-sm text-muted-foreground">
                          {event?.title ?? record.eventId}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-foreground">
                          {record.tokenId}
                        </TableCell>
                        <TableCell className="font-mono text-sm text-muted-foreground">
                          {new Date(record.timestamp).toLocaleTimeString(
                            "en-US",
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                            }
                          )}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              record.status === "valid"
                                ? "default"
                                : record.status === "already-used"
                                  ? "secondary"
                                  : "destructive"
                            }
                            className="text-xs"
                          >
                            {record.status === "valid"
                              ? "Valid"
                              : record.status === "already-used"
                                ? "Already Used"
                                : "Invalid"}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
