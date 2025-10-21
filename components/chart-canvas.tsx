"use client"

import { useEffect, useRef, useState } from "react"
import type { Stock } from "@/lib/types"
import { generateCandlestickData } from "@/lib/chart-data"
import { Crosshair, TrendingUp, Square, Type, Smile, Ruler, Clock, Magnet, Lock, Eye, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

interface ChartCanvasProps {
  stock: Stock
  timeframe: string
  chartType: string
}

export function ChartCanvas({ stock, timeframe }: ChartCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [chartData] = useState(() => generateCandlestickData(stock.price, 150))

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const dpr = window.devicePixelRatio || 1
    const rect = canvas.getBoundingClientRect()

    canvas.width = rect.width * dpr
    canvas.height = rect.height * dpr

    ctx.scale(dpr, dpr)
    canvas.style.width = rect.width + "px"
    canvas.style.height = rect.height + "px"

    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height)

    // Draw grid
    ctx.strokeStyle = "rgba(128, 128, 128, 0.1)"
    ctx.lineWidth = 1

    for (let i = 0; i < 10; i++) {
      const y = (rect.height / 10) * i
      ctx.beginPath()
      ctx.moveTo(0, y)
      ctx.lineTo(rect.width, y)
      ctx.stroke()
    }

    // Calculate chart dimensions
    const padding = { top: 20, right: 60, bottom: 40, left: 10 }
    const chartWidth = rect.width - padding.left - padding.right
    const chartHeight = rect.height - padding.top - padding.bottom
    const candleWidth = chartWidth / chartData.length

    // Find min and max prices
    const prices = chartData.flatMap((d) => [d.high, d.low])
    const minPrice = Math.min(...prices)
    const maxPrice = Math.max(...prices)
    const priceRange = maxPrice - minPrice

    // Draw candlesticks
    chartData.forEach((candle, i) => {
      const x = padding.left + i * candleWidth + candleWidth / 2
      const openY = padding.top + ((maxPrice - candle.open) / priceRange) * chartHeight
      const closeY = padding.top + ((maxPrice - candle.close) / priceRange) * chartHeight
      const highY = padding.top + ((maxPrice - candle.high) / priceRange) * chartHeight
      const lowY = padding.top + ((maxPrice - candle.low) / priceRange) * chartHeight

      const isGreen = candle.close >= candle.open
      ctx.strokeStyle = isGreen ? "#10b981" : "#ef4444"
      ctx.fillStyle = isGreen ? "#10b981" : "#ef4444"

      // Draw wick
      ctx.beginPath()
      ctx.moveTo(x, highY)
      ctx.lineTo(x, lowY)
      ctx.stroke()

      // Draw body
      const bodyTop = Math.min(openY, closeY)
      const bodyHeight = Math.abs(closeY - openY)
      const bodyWidth = Math.max(candleWidth * 0.6, 1)

      if (bodyHeight < 1) {
        ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, 1)
      } else {
        ctx.fillRect(x - bodyWidth / 2, bodyTop, bodyWidth, bodyHeight)
      }
    })

    // Draw volume bars
    const volumeHeight = 60
    const volumeTop = rect.height - padding.bottom + 10
    const maxVolume = Math.max(...chartData.map((d) => d.volume))

    chartData.forEach((candle, i) => {
      const x = padding.left + i * candleWidth + candleWidth / 2
      const barHeight = (candle.volume / maxVolume) * volumeHeight
      const isGreen = candle.close >= candle.open

      ctx.fillStyle = isGreen ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"
      ctx.fillRect(x - candleWidth * 0.3, volumeTop + volumeHeight - barHeight, candleWidth * 0.6, barHeight)
    })

    // Draw price labels on right axis
    ctx.fillStyle = "#666"
    ctx.font = "11px sans-serif"
    ctx.textAlign = "left"

    for (let i = 0; i <= 5; i++) {
      const price = maxPrice - (priceRange / 5) * i
      const y = padding.top + (chartHeight / 5) * i
      ctx.fillText(price.toFixed(2), rect.width - padding.right + 5, y + 4)
    }

    // Draw current price line
    const currentPriceY = padding.top + ((maxPrice - stock.price) / priceRange) * chartHeight
    ctx.strokeStyle = stock.change >= 0 ? "#10b981" : "#ef4444"
    ctx.lineWidth = 1
    ctx.setLineDash([5, 5])
    ctx.beginPath()
    ctx.moveTo(padding.left, currentPriceY)
    ctx.lineTo(rect.width - padding.right, currentPriceY)
    ctx.stroke()
    ctx.setLineDash([])

    // Draw current price label
    ctx.fillStyle = stock.change >= 0 ? "#10b981" : "#ef4444"
    ctx.fillRect(rect.width - padding.right, currentPriceY - 10, padding.right - 5, 20)
    ctx.fillStyle = "#fff"
    ctx.textAlign = "center"
    ctx.fillText(stock.price.toFixed(2), rect.width - padding.right / 2, currentPriceY + 4)
  }, [stock, chartData, timeframe])

  return (
    <div className="relative h-full w-full">
      <div className="absolute left-0 top-0 z-10 flex flex-col gap-1 p-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Crosshair className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <TrendingUp className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Square className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Type className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Smile className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Ruler className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Clock className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Magnet className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Lock className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Eye className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8 bg-card hover:bg-accent">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>

      <div className="absolute left-16 top-4 z-10 rounded-md bg-card/80 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-primary">11.30</span>
            <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
              BUY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-destructive">11.30</span>
            <span className="rounded bg-destructive px-1.5 py-0.5 text-[10px] font-medium text-destructive-foreground">
              SELL
            </span>
          </div>
        </div>
        <div className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
          <span>Volume</span>
          <span className="font-medium">0</span>
        </div>
      </div>

      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
