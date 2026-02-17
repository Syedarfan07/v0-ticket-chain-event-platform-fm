"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export type UserRole = "buyer" | "organizer" | "verifier"

export interface AuthUser {
  name: string
  email: string
  walletAddress?: string
  verifierId?: string
}

interface AuthState {
  role: UserRole | null
  user: AuthUser | null
}

interface AuthContextValue extends AuthState {
  login: (role: UserRole, user: AuthUser) => void
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<AuthState>({ role: null, user: null })

  const login = useCallback((role: UserRole, user: AuthUser) => {
    setAuth({ role, user })
  }, [])

  const logout = useCallback(() => {
    setAuth({ role: null, user: null })
  }, [])

  return (
    <AuthContext.Provider
      value={{
        ...auth,
        login,
        logout,
        isAuthenticated: auth.role !== null,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
