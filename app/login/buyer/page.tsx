"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/lib/auth-context"
import { MetaMaskIcon, WalletConnectIcon, CoinbaseIcon } from "@/components/wallet-icons"
import { Ticket, Mail, Lock, Wallet, ArrowLeft, Eye, EyeOff, ShoppingBag } from "lucide-react"

export default function BuyerLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const { login } = useAuth()
  const router = useRouter()

  const handleEmailLogin = (e: React.FormEvent) => {
    e.preventDefault()
    login("buyer", {
      name: email.split("@")[0],
      email,
      walletAddress: "0xUser...1234",
    })
    router.push("/marketplace")
  }

  const handleWalletConnect = () => {
    setIsConnecting(true)
    setTimeout(() => {
      login("buyer", {
        name: "Wallet User",
        email: "wallet@user.eth",
        walletAddress: "0xUser...1234",
      })
      setIsConnecting(false)
      router.push("/marketplace")
    }, 1500)
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Left side - Email/Password */}
      <div className="flex flex-1 flex-col justify-center px-6 py-12 md:px-12 lg:px-20">
        <Link
          href="/login"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors self-start"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Role Selection
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <div className="mb-8 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
              <Ticket className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="font-mono text-xl font-bold text-foreground">
              TicketChain
            </span>
            <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground">
              <ShoppingBag className="h-3 w-3" />
              Buyer
            </span>
          </div>

          <h1 className="mb-2 text-2xl font-bold text-foreground">
            Welcome back
          </h1>
          <p className="mb-8 text-sm text-muted-foreground">
            Sign in to browse events and manage your NFT tickets
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
