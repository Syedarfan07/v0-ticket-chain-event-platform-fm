"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Ticket, Mail, Lock, Wallet, ArrowLeft, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    window.location.href = "/marketplace"
  }

  const handleWalletConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      setIsConnecting(false)
      window.location.href = "/marketplace"
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Email/Password */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 md:px-12 lg:px-20">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Ticket className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="font-mono text-xl font-bold text-foreground">
              TicketChain
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Sign in with your email or connect your wallet
          </p>

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
                  placeholder="you@example.com"
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

            <Button type="submit" className="mt-2 w-full">
              Sign In
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {"Don't have an account? "}
            <button className="text-primary hover:underline">
              Create one
            </button>
          </p>
        </div>
      </div>

      {/* Separator */}
      <div className="hidden items-center lg:flex">
        <div className="flex h-[60%] flex-col items-center gap-4">
          <Separator orientation="vertical" className="flex-1" />
          <span className="rounded-full border border-border bg-secondary px-3 py-1 text-xs text-muted-foreground">
            OR
          </span>
          <Separator orientation="vertical" className="flex-1" />
        </div>
      </div>

      {/* Right side - Wallet Connect */}
      <div className="hidden flex-1 flex-col items-center justify-center bg-card/50 px-6 py-12 md:px-12 lg:flex lg:px-20">
        <div className="mx-auto w-full max-w-sm text-center">
          <div className="mb-8 inline-flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-secondary">
            <Wallet className="h-10 w-10 text-primary" />
          </div>
          <h2 className="mb-3 text-xl font-bold text-foreground">
            Connect Your Wallet
          </h2>
          <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
            Use your Web3 wallet for decentralized authentication. Your keys,
            your identity.
          </p>

          <Button
            size="lg"
            className="w-full gap-2"
            onClick={handleWalletConnect}
            disabled={isConnecting}
          >
            {isConnecting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                Connecting...
              </>
            ) : (
              <>
                <MetaMaskIcon />
                Connect MetaMask
              </>
            )}
          </Button>

          <div className="mt-6 flex flex-col gap-2">
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleWalletConnect}
              disabled={isConnecting}
            >
              <WalletConnectIcon />
              WalletConnect
            </Button>
            <Button
              variant="outline"
              className="w-full gap-2"
              onClick={handleWalletConnect}
              disabled={isConnecting}
            >
              <CoinbaseIcon />
              Coinbase Wallet
            </Button>
          </div>

          <p className="mt-8 text-xs leading-relaxed text-muted-foreground">
            By connecting, you agree to the Terms of Service and
            acknowledge the Privacy Policy.
          </p>
        </div>
      </div>

      {/* Mobile wallet section */}
      <div className="fixed inset-x-0 bottom-0 border-t border-border bg-card p-4 lg:hidden">
        <Button
          className="w-full gap-2"
          onClick={handleWalletConnect}
          disabled={isConnecting}
        >
          <Wallet className="h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet Instead"}
        </Button>
      </div>
    </div>
  )
}

function MetaMaskIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M21.3 2L13.1 8.2l1.5-3.6L21.3 2z"
        fill="#E17726"
        stroke="#E17726"
        strokeWidth="0.25"
      />
      <path
        d="M2.7 2l8.1 6.3-1.4-3.7L2.7 2zM18.4 17.2l-2.2 3.3 4.6 1.3 1.3-4.5-3.7-.1zM1.9 17.3l1.3 4.5 4.6-1.3-2.2-3.3-3.7.1z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
      />
      <path
        d="M7.5 10.5L6.3 12.3l4.6.2-.2-4.9-3.2 2.9zM16.5 10.5l-3.2-3-.1 5 4.6-.2-1.3-1.8zM7.8 20.5l2.8-1.3-2.4-1.9-.4 3.2zM13.4 19.2l2.8 1.3-.4-3.2-2.4 1.9z"
        fill="#E27625"
        stroke="#E27625"
        strokeWidth="0.25"
      />
    </svg>
  )
}

function WalletConnectIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M6.1 8.5c3.3-3.2 8.5-3.2 11.8 0l.4.4a.4.4 0 010 .6l-1.3 1.3a.2.2 0 01-.3 0l-.5-.5a6.2 6.2 0 00-8.4 0l-.6.5a.2.2 0 01-.3 0L5.6 9.5a.4.4 0 010-.6l.5-.4z"
        fill="#3B99FC"
      />
      <path
        d="M20 11l1.2 1.2a.4.4 0 010 .6l-5.4 5.3a.4.4 0 01-.6 0l-3.8-3.8a.1.1 0 00-.2 0L7.4 18a.4.4 0 01-.6 0L1.4 12.8a.4.4 0 010-.6L2.6 11a.4.4 0 01.6 0l3.8 3.8a.1.1 0 00.2 0L11 11a.4.4 0 01.6 0l3.8 3.8a.1.1 0 00.2 0L19.4 11a.4.4 0 01.6 0z"
        fill="#3B99FC"
      />
    </svg>
  )
}

function CoinbaseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <rect width="24" height="24" rx="6" fill="#0052FF" />
      <path
        d="M12 4a8 8 0 100 16 8 8 0 000-16zm-2 5h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4a1 1 0 011-1z"
        fill="white"
      />
    </svg>
  )
}
