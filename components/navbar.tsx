"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useAuth, type UserRole } from "@/lib/auth-context"
import {
  Menu,
  X,
  Ticket,
  LayoutDashboard,
  ShoppingBag,
  Wallet,
  ScanLine,
  LogOut,
  User,
  Home,
} from "lucide-react"

interface NavLink {
  href: string
  label: string
  icon?: React.ElementType
}

const ALL_LINKS: NavLink[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
  { href: "/organizer", label: "Organizer", icon: LayoutDashboard },
  { href: "/wallet", label: "My Wallet", icon: Wallet },
  { href: "/verify", label: "Verify", icon: ScanLine },
]

function getLinksForRole(role: UserRole | null): NavLink[] {
  if (!role) return ALL_LINKS
  switch (role) {
    case "buyer":
      return [
        { href: "/", label: "Home", icon: Home },
        { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
        { href: "/wallet", label: "My Wallet", icon: Wallet },
      ]
    case "organizer":
      return [
        { href: "/", label: "Home", icon: Home },
        { href: "/marketplace", label: "Marketplace", icon: ShoppingBag },
        { href: "/organizer", label: "Dashboard", icon: LayoutDashboard },
      ]
    case "verifier":
      return [
        { href: "/", label: "Home", icon: Home },
        { href: "/verify", label: "Dashboard", icon: ScanLine },
      ]
  }
}

export function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [mobileOpen, setMobileOpen] = useState(false)
  const { role, user, isAuthenticated, logout } = useAuth()

  const links = getLinksForRole(role)

  const handleLogout = () => {
    logout()
    setMobileOpen(false)
    router.push("/")
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Ticket className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="font-mono text-lg font-bold tracking-tight text-foreground">
            TicketChain
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-secondary text-foreground"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated && user ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-1.5">
                <User className="h-3.5 w-3.5 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  {user.name}
                </span>
                {role && (
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                    {role}
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground hover:text-foreground" onClick={handleLogout}>
                <LogOut className="h-3.5 w-3.5" />
                Log Out
              </Button>
            </div>
          ) : (
            <>
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/login">
                <Button size="sm">Connect Wallet</Button>
              </Link>
            </>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          {mobileOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {mobileOpen && (
        <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
          <nav className="flex flex-col gap-1 pt-2">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                    pathname === link.href
                      ? "bg-secondary text-foreground"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <div className="mt-3 flex flex-col gap-2">
            {isAuthenticated && user ? (
              <>
                <div className="flex items-center gap-2 rounded-md px-3 py-2 text-sm">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium text-foreground">{user.name}</span>
                  {role && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary">
                      {role}
                    </span>
                  )}
                </div>
                <Button variant="outline" className="w-full gap-2" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" />
                  Log Out
                </Button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">
                    Sign In
                  </Button>
                </Link>
                <Link href="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Connect Wallet</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
