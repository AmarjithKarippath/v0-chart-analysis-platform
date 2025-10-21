"use client"

import { TrendingUp, ShoppingCart, Briefcase, Target, Award, Wallet } from "lucide-react"
import { Button } from "./ui/button"

export function Header() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-card px-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
            <TrendingUp className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-sm font-medium text-muted-foreground">FTSE 100</span>
          <span className="text-sm font-semibold">8,245.50</span>
          <span className="text-xs text-success">12.30 (0.15%)</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">FTSE 250</span>
          <span className="text-sm font-semibold">20,834.67</span>
          <span className="text-xs text-destructive">-8.45 (-0.04%)</span>
        </div>
      </div>

      {/* <nav className="flex items-center gap-1">
        <Button variant="ghost" size="sm" className="text-sm">
          Dashboard
        </Button>
        <Button variant="ghost" size="sm" className="text-sm">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Orders
        </Button>
        <Button variant="ghost" size="sm" className="text-sm">
          <Briefcase className="mr-2 h-4 w-4" />
          Holdings
        </Button>
        <Button variant="ghost" size="sm" className="text-sm">
          <Target className="mr-2 h-4 w-4" />
          Positions
        </Button>
        <Button variant="ghost" size="sm" className="text-sm">
          <Award className="mr-2 h-4 w-4" />
          Bids
        </Button>
        <Button variant="ghost" size="sm" className="text-sm">
          <Wallet className="mr-2 h-4 w-4" />
          Funds
        </Button>
      </nav> */}

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-4 w-4" />
        </Button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted text-xs font-medium">MZ</div>
      </div>
    </header>
  )
}
