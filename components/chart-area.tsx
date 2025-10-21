"use client"

import { useState } from "react"
import { ChartToolbar } from "./chart-toolbar"
import { TradingViewChart } from "./tradingview-chart"
import { ChartControls } from "./chart-controls"
import type { Stock } from "@/lib/types"

interface ChartAreaProps {
  stock: Stock
}

export function ChartArea({ stock }: ChartAreaProps) {
  const [timeframe, setTimeframe] = useState("1d")
  const [chartType, setChartType] = useState("candlestick")

  return (
    <main className="flex flex-1 flex-col overflow-hidden">
      <ChartToolbar stock={stock} />
      <div className="flex-1 overflow-hidden p-4">
        <TradingViewChart stock={stock} timeframe={timeframe} chartType={chartType} />
      </div>
      <ChartControls timeframe={timeframe} onTimeframeChange={setTimeframe} />
    </main>
  )
}
