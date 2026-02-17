"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Ticket, Camera, ScanLine, ArrowLeft, CheckCircle2, XCircle, RotateCcw } from "lucide-react"

type ScanResult = "idle" | "scanning" | "granted" | "denied"

export default function VerifyPage() {
  const [scanState, setScanState] = useState<ScanResult>("idle")
  const [cameraActive, setCameraActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

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

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
    }
    setCameraActive(false)
  }

  const simulateScan = (result: "granted" | "denied") => {
    stopCamera()
    setScanState(result)
  }

  const resetScan = () => {
    setScanState("idle")
    stopCamera()
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md">
        <div className="flex h-14 items-center justify-between px-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit
          </Link>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary">
              <Ticket className="h-3.5 w-3.5 text-primary-foreground" />
            </div>
            <span className="font-mono text-sm font-bold text-foreground">
              Verifier Mode
            </span>
          </div>
          <div className="w-12" />
        </div>
      </header>

      {/* Main content */}
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
                Point your camera at the attendee&apos;s QR code to verify
                their ticket on the blockchain.
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
            {/* Camera viewfinder */}
            <div className="relative aspect-square w-full max-w-[320px] overflow-hidden rounded-2xl border-2 border-primary bg-black">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="h-full w-full object-cover"
              />
              {/* Scanning overlay */}
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Corner brackets */}
                <div className="relative h-48 w-48">
                  <div className="absolute left-0 top-0 h-8 w-8 border-l-2 border-t-2 border-primary" />
                  <div className="absolute right-0 top-0 h-8 w-8 border-r-2 border-t-2 border-primary" />
                  <div className="absolute bottom-0 left-0 h-8 w-8 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-0 right-0 h-8 w-8 border-b-2 border-r-2 border-primary" />
                </div>
                {/* Scan line animation */}
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

            {/* Simulate buttons for demo */}
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
                    ETH Global Hackathon
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

      {/* Scan line animation keyframes */}
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
