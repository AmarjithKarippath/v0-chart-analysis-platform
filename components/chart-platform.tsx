"use client"

import { useState } from "react"
import { Header } from "./header"
import { Watchlist } from "./watchlist"
import { ChartArea } from "./chart-area"
import type { Stock, Watchlist as WatchlistType } from "@/lib/types"

const initialStocks: Stock[] = [
  { symbol: "FTSE 100", name: "FTSE 100 Index", price: 8245.5, change: 12.3, changePercent: 0.15, index: "INDEX" },
  { symbol: "SHEL", name: "Shell PLC", price: 2847.5, change: -15.2, changePercent: -0.53, index: "LSE" },
  { symbol: "AZN", name: "AstraZeneca", price: 11650.0, change: 85.5, changePercent: 0.74, index: "LSE" },
  { symbol: "HSBA", name: "HSBC Holdings", price: 745.8, change: 3.2, changePercent: 0.43, index: "LSE" },
  { symbol: "BP.", name: "BP PLC", price: 456.3, change: -2.1, changePercent: -0.46, index: "LSE" },
  { symbol: "ULVR", name: "Unilever", price: 4685.0, change: 22.5, changePercent: 0.48, index: "LSE" },
  { symbol: "GSK", name: "GSK PLC", price: 1542.5, change: -8.0, changePercent: -0.52, index: "LSE" },
  { symbol: "DGE", name: "Diageo", price: 2634.0, change: 12.0, changePercent: 0.46, index: "LSE" },
  { symbol: "RIO", name: "Rio Tinto", price: 5234.0, change: -18.5, changePercent: -0.35, index: "LSE" },
  { symbol: "BATS", name: "British American Tobacco", price: 2756.0, change: 15.5, changePercent: 0.57, index: "LSE" },
]

export default function ChartPlatform() {
  const [selectedStock, setSelectedStock] = useState<Stock>(initialStocks[0])
  const [watchlists, setWatchlists] = useState<WatchlistType[]>([
    { id: "default", name: "Default", stocks: initialStocks },
  ])
  const [activeWatchlistId, setActiveWatchlistId] = useState<string>("default")

  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId) || watchlists[0]

  const handleCreateWatchlist = (name: string) => {
    const newWatchlist: WatchlistType = {
      id: `watchlist-${Date.now()}`,
      name,
      stocks: [],
    }
    setWatchlists([...watchlists, newWatchlist])
    setActiveWatchlistId(newWatchlist.id)
  }

  const handleDeleteWatchlist = (id: string) => {
    if (watchlists.length === 1) return // Don't delete the last watchlist
    const filtered = watchlists.filter((w) => w.id !== id)
    setWatchlists(filtered)
    if (activeWatchlistId === id) {
      setActiveWatchlistId(filtered[0].id)
    }
  }

  const handleRenameWatchlist = (id: string, newName: string) => {
    setWatchlists(watchlists.map((w) => (w.id === id ? { ...w, name: newName } : w)))
  }

  const handleAddStockToWatchlist = (stock: Stock, targetWatchlistId: string) => {
    setWatchlists(
      watchlists.map((w) => {
        if (w.id === targetWatchlistId) {
          // Check if stock already exists in the watchlist
          const stockExists = w.stocks.some((s) => s.symbol === stock.symbol)
          if (!stockExists) {
            return { ...w, stocks: [...w.stocks, stock] }
          }
        }
        return w
      }),
    )
  }

  return (
    <div className="flex h-screen flex-col bg-background">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Watchlist
          watchlists={watchlists}
          activeWatchlistId={activeWatchlistId}
          selectedStock={selectedStock}
          onSelectStock={setSelectedStock}
          onSelectWatchlist={setActiveWatchlistId}
          onCreateWatchlist={handleCreateWatchlist}
          onDeleteWatchlist={handleDeleteWatchlist}
          onRenameWatchlist={handleRenameWatchlist}
          onAddStockToWatchlist={handleAddStockToWatchlist}
        />
        <ChartArea stock={selectedStock} />
      </div>
    </div>
  )
}
