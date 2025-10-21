"use client"

import { useEffect, useRef } from "react"
import { createChart, ColorType, CandlestickSeries, type IChartApi, type ISeriesApi } from "lightweight-charts"
import type { Stock } from "@/lib/types"
import { generateCandlestickData } from "@/lib/chart-data"

interface TradingViewChartProps {
  stock: Stock
  timeframe: string
  chartType: string
}

export function TradingViewChart({ stock, timeframe }: TradingViewChartProps) {
  const chartContainerRef = useRef<HTMLDivElement>(null)
  const chartRef = useRef<IChartApi | null>(null)
  const candlestickSeriesRef = useRef<ISeriesApi<"Candlestick"> | null>(null)
  const earliestTimeRef = useRef<number>(0)
  const isLoadingRef = useRef<boolean>(false)
  const allDataRef = useRef<any[]>([])
  const isInitializedRef = useRef<boolean>(false)

  useEffect(() => {
    if (!chartContainerRef.current) return

    isInitializedRef.current = false

    // Create chart
    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#9ca3af",
      },
      grid: {
        vertLines: { color: "rgba(255, 255, 255, 0.1)" },
        horzLines: { color: "rgba(255, 255, 255, 0.1)" },
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

    // Generate and set initial data
    const chartData = generateCandlestickData(stock.price, 130)
    const candleData = chartData.map((candle, index) => ({
      time: (Date.now() / 1000 - (chartData.length - index) * 3600) as any,
      open: candle.open,
      high: candle.high,
      low: candle.low,
      close: candle.close,
    }))

    allDataRef.current = candleData
    earliestTimeRef.current = candleData[0].time

    candlestickSeries.setData(candleData)

    setTimeout(() => {
      chart.timeScale().fitContent()
      isInitializedRef.current = true
    }, 100)

    const handleVisibleLogicalRangeChange = (logicalRange: any) => {
      if (!logicalRange || isLoadingRef.current || !isInitializedRef.current) return

      // Check if user is scrolling near the left edge
      const barsInfo = candlestickSeries.barsInLogicalRange(logicalRange)
      if (barsInfo !== null && barsInfo.barsBefore < 50) {
        loadMoreHistoricalData()
      }
    }

    chart.timeScale().subscribeVisibleLogicalRangeChange(handleVisibleLogicalRangeChange)

    const loadMoreHistoricalData = () => {
      if (isLoadingRef.current) return
      isLoadingRef.current = true

      // Generate 100 more historical candles
      const moreData = generateCandlestickData(stock.price, 100)
      const newCandleData = moreData.map((candle, index) => ({
        time: (earliestTimeRef.current - (100 - index) * 3600) as any,
        open: candle.open,
        high: candle.high,
        low: candle.low,
        close: candle.close,
      }))

      // Update earliest time
      earliestTimeRef.current = newCandleData[0].time

      // Prepend new data to existing data
      allDataRef.current = [...newCandleData, ...allDataRef.current]

      candlestickSeries.setData(allDataRef.current)

      // Reset loading flag after a short delay
      setTimeout(() => {
        isLoadingRef.current = false
      }, 500)
    }

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
      {/* TradingView chart container */}
      <div ref={chartContainerRef} className="h-full w-full" />
    </div>
  )
}
