"use client"

import {
  Search,
  Plus,
  Calendar,
  Settings2,
  TrendingUp,
  Trash2,
  Undo2,
  Redo2,
  ZoomIn,
  Camera,
  Maximize2,
  Square,
} from "lucide-react"
import { Button } from "./ui/button"
import { Separator } from "./ui/separator"
import type { Stock } from "@/lib/types"

interface ChartToolbarProps {
  stock: Stock
}

export function ChartToolbar({ stock }: ChartToolbarProps) {
  return (
    <div className="border-b border-border bg-card">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          {/* <Button variant="ghost" size="icon" className="h-8 w-8">
            <Search className="h-4 w-4" />
          </Button> */}
          <div className="flex items-center gap-2 rounded-md border border-border bg-background px-3 py-1.5">
            <span className="text-sm font-medium">{stock.symbol}</span>
          </div>
          {/* <Button variant="ghost" size="icon" className="h-8 w-8">
            <Plus className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Calendar className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            <TrendingUp className="mr-1 h-3 w-3" />
            Indicators
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Square className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Undo2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Redo2 className="h-4 w-4" />
          </Button> */}


                  <span className="text-xs text-muted-foreground">{stock.symbol} • 1D • INDICES</span>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <span className="text-xs">O {stock.price.toFixed(2)}</span>
        <span className="text-xs">H {(stock.price + 0.3).toFixed(2)}</span>
        <span className="text-xs">L {(stock.price - 0.4).toFixed(2)}</span>
        <span className="text-xs">C {stock.price.toFixed(2)}</span>
        <span className={`text-xs font-medium ${stock.change >= 0 ? "text-success" : "text-destructive"}`}>
          {stock.change >= 0 ? "+" : ""}
          {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}
          {stock.changePercent.toFixed(2)}%)
        </span>
        </div>

        {/* <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Square className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" className="h-8 text-xs">
            Save
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Camera className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div> */}
      </div>

      {/* <div className="flex items-center gap-1 px-4 py-2">
        <span className="text-xs text-muted-foreground">{stock.symbol} • 1D • INDICES</span>
        <Separator orientation="vertical" className="mx-2 h-4" />
        <span className="text-xs">O {stock.price.toFixed(2)}</span>
        <span className="text-xs">H {(stock.price + 0.3).toFixed(2)}</span>
        <span className="text-xs">L {(stock.price - 0.4).toFixed(2)}</span>
        <span className="text-xs">C {stock.price.toFixed(2)}</span>
        <span className={`text-xs font-medium ${stock.change >= 0 ? "text-success" : "text-destructive"}`}>
          {stock.change >= 0 ? "+" : ""}
          {stock.change.toFixed(2)} ({stock.changePercent >= 0 ? "+" : ""}
          {stock.changePercent.toFixed(2)}%)
        </span>
      </div> */}
    </div>
  )
}
