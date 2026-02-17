"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"
import { MOCK_VERIFIERS } from "@/lib/data"
import { Ticket, Mail, Lock, ArrowLeft, Eye, EyeOff, ScanLine, Shield } from "lucide-react"

export default function VerifierLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Match against mock verifiers by email, or default to the first one
    const matchedVerifier = MOCK_VERIFIERS.find((v) => v.email === email) || MOCK_VERIFIERS[0]
    login("verifier", {
      name: matchedVerifier.name,
      email: matchedVerifier.email,
      verifierId: matchedVerifier.id,
    })
    router.push("/verify")
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-12">
      <Link
        href="/login"
        className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Role Selection
      </Link>

      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center justify-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Ticket className="h-4.5 w-4.5 text-primary-foreground" />
          </div>
          <span className="font-mono text-xl font-bold text-foreground">
            TicketChain
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
            <ScanLine className="h-3 w-3" />
            Verifier
          </span>
        </div>

        <div className="rounded-xl border border-border bg-card p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border border-border bg-secondary">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">
              Verifier Sign In
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in with your staff credentials to access assigned events
            </p>
          </div>

          <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <Label htmlFor="email" className="text-sm text-foreground">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="alex@ticketchain.io"
                  className="pl-10"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="password" className="text-sm text-foreground">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <Button type="submit" className="mt-2 w-full gap-2">
              <ScanLine className="h-4 w-4" />
              Sign In as Verifier
            </Button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          Verifier accounts are created by event organizers. Contact your organizer if you need access.
        </p>
      </div>
    </div>
  )
}
