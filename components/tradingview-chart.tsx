"use client"

import { useEffect, useRef } from "react"
import {
  createChart,
  ColorType,
  CandlestickSeries,
  HistogramSeries,
  type IChartApi,
  type ISeriesApi,
} from "lightweight-charts"
import type { Stock } from "@/lib/types"
import { generateCandlestickData } from "@/lib/chart-data"
import { Crosshair, TrendingUp, Square, Type, Smile, Ruler, Clock, Magnet, Lock, Eye, Trash2 } from "lucide-react"
import { Button } from "./ui/button"

interface TradingViewChartProps {
  stock: Stock
  timeframe: string
  chartType: string
}

export function TradingViewChart({ stock, timeframe }: TradingViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const volumeSeriesRef = useRef<ISeriesApi<"Histogram"> | null>(null)

  useEffect(() => {
    if (!chartContainerRef.current) return

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#9ca3af",
      },
      grid: {
        vertLines: { color: "rgba(128, 128, 128, 0.1)" },
        horzLines: { color: "rgba(128, 128, 128, 0.1)" },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientHeight,
      rightPriceScale: {
        borderColor: "rgba(128, 128, 128, 0.2)",
      },
      timeScale: {
        borderColor: "rgba(128, 128, 128, 0.2)",
        timeVisible: true,
        secondsVisible: false,
      },
      crosshair: {
        mode: 1,
        vertLine: {
          color: "rgba(128, 128, 128, 0.5)",
          width: 1,
          style: 3,
        },
        horzLine: {
          color: "rgba(128, 128, 128, 0.5)",
          width: 1,
          style: 3,
        },
      },
    })

    chartRef.current = chart

    // Add candlestick series
    const candlestickSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#10b981",
      downColor: "#ef4444",
      borderUpColor: "#10b981",
      borderDownColor: "#ef4444",
      wickUpColor: "#10b981",
      wickDownColor: "#ef4444",
    })

    candlestickSeriesRef.current = candlestickSeries

    // Add volume series
    const volumeSeries = chart.addSeries(HistogramSeries, {
      color: "#26a69a",
      priceFormat: {
        type: "volume",
      },
      priceScaleId: "",
    })

    volumeSeriesRef.current = volumeSeries

    chart.priceScale("").applyOptions({
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    })

    // Generate and set data
    const chartData = generateCandlestickData(stock.price, 150)
    const candleData = chartData.map((candle, index) => ({
      time: (Date.now() / 1000 - (chartData.length - index) * 3600) as any,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }))

    const volumeData = chartData.map((candle, index) => ({
      time: (Date.now() / 1000 - (chartData.length - index) * 3600) as any,
      value: candle.volume,
      color: candle.close >= candle.open ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)",
    }))

    candlestickSeries.setData(candleData)
    volumeSeries.setData(volumeData)

    // Fit content
    chart.timeScale().fitContent()

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
          height: chartContainerRef.current.clientHeight,
        })
      }
    }

    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [stock, timeframe])

  return (
    <div className="relative h-full w-full">
      {/* Drawing tools sidebar */}
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

      {/* Price info overlay */}
      <div className="absolute left-16 top-4 z-10 rounded-md bg-card/80 px-3 py-2 backdrop-blur-sm">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="font-medium text-primary">{stock.price.toFixed(2)}</span>
            <span className="rounded bg-primary px-1.5 py-0.5 text-[10px] font-medium text-primary-foreground">
              BUY
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium text-destructive">{stock.price.toFixed(2)}</span>
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

      {/* TradingView chart container */}
      <div ref={chartContainerRef} className="h-full w-full" />
    </div>
  )
}
