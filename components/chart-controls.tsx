"use client"

import { Button } from "./ui/button"
import { Calendar, Percent } from "lucide-react"

interface ChartControlsProps {
  timeframe: string
  onTimeframeChange: (timeframe: string) => void
}

export function ChartControls({ timeframe, onTimeframeChange }: ChartControlsProps) {
  const timeframes = ["1d", "5d", "1m", "3m", "6m", "1yr", "5yr", "All"]

  return (
    <div className="flex items-center justify-between border-t border-border bg-card px-4 py-2">
      <div className="flex items-center gap-1">
        {timeframes.map((tf) => (
          <Button
            key={tf}
            variant={timeframe === tf ? "default" : "ghost"}
            size="sm"
            className="h-7 text-xs"
            onClick={() => onTimeframeChange(tf)}
          >
            {tf}
          </Button>
        ))}
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Calendar className="h-3 w-3" />
        </Button>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>16:58:34 UTC+5:30</span>
        <Button variant="ghost" size="icon" className="h-7 w-7">
          <Percent className="h-3 w-3" />
        </Button>
        <Button variant="ghost" size="sm" className="h-7 text-xs">
          log
        </Button>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">
          auto
        </Button>
      </div>
    </div>
  )
}
