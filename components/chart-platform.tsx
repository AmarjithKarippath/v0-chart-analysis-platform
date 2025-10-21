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
  {
    symbol: "LSEG",
    name: "London Stock Exchange Group",
    price: 10245.0,
    change: 45.0,
    changePercent: 0.44,
    index: "LSE",
  },
  { symbol: "REL", name: "RELX PLC", price: 3567.0, change: 12.5, changePercent: 0.35, index: "LSE" },
  { symbol: "NG.", name: "National Grid", price: 1034.5, change: -5.2, changePercent: -0.5, index: "LSE" },
  { symbol: "BARC", name: "Barclays", price: 234.6, change: 2.8, changePercent: 1.21, index: "LSE" },
  { symbol: "LLOY", name: "Lloyds Banking Group", price: 58.4, change: 0.6, changePercent: 1.04, index: "LSE" },
  { symbol: "VOD", name: "Vodafone Group", price: 73.2, change: -0.8, changePercent: -1.08, index: "LSE" },
  { symbol: "GLEN", name: "Glencore", price: 412.5, change: -8.5, changePercent: -2.02, index: "LSE" },
  { symbol: "AAL", name: "Anglo American", price: 2145.0, change: -32.0, changePercent: -1.47, index: "LSE" },
  { symbol: "PRU", name: "Prudential", price: 745.0, change: 8.5, changePercent: 1.15, index: "LSE" },
  { symbol: "BT.A", name: "BT Group", price: 142.5, change: -1.5, changePercent: -1.04, index: "LSE" },
  { symbol: "STAN", name: "Standard Chartered", price: 856.4, change: 12.4, changePercent: 1.47, index: "LSE" },
  { symbol: "LGEN", name: "Legal & General", price: 245.8, change: 3.2, changePercent: 1.32, index: "LSE" },
  { symbol: "AV.", name: "Aviva", price: 512.5, change: 6.5, changePercent: 1.28, index: "LSE" },
  { symbol: "CRH", name: "CRH PLC", price: 6234.0, change: 45.0, changePercent: 0.73, index: "LSE" },
  { symbol: "IMB", name: "Imperial Brands", price: 2145.0, change: 18.5, changePercent: 0.87, index: "LSE" },
  { symbol: "CPG", name: "Compass Group", price: 2456.0, change: 22.0, changePercent: 0.9, index: "LSE" },
  { symbol: "EXPN", name: "Experian", price: 3678.0, change: 28.5, changePercent: 0.78, index: "LSE" },
  { symbol: "ANTO", name: "Antofagasta", price: 1834.0, change: -24.5, changePercent: -1.32, index: "LSE" },
  { symbol: "NWG", name: "NatWest Group", price: 345.6, change: 4.2, changePercent: 1.23, index: "LSE" },
  { symbol: "FERG", name: "Ferguson", price: 18456.0, change: 125.0, changePercent: 0.68, index: "LSE" },
  { symbol: "SMDS", name: "Smith & Nephew", price: 1123.0, change: -8.5, changePercent: -0.75, index: "LSE" },
  { symbol: "SGRO", name: "Segro", price: 945.0, change: 12.5, changePercent: 1.34, index: "LSE" },
  { symbol: "LAND", name: "Land Securities", price: 678.5, change: 8.5, changePercent: 1.27, index: "LSE" },
  { symbol: "BNZL", name: "Bunzl", price: 3456.0, change: 18.0, changePercent: 0.52, index: "LSE" },
  { symbol: "CRDA", name: "Croda International", price: 4234.0, change: -32.0, changePercent: -0.75, index: "LSE" },
  { symbol: "MNDI", name: "Mondi", price: 1567.0, change: 12.5, changePercent: 0.8, index: "LSE" },
  { symbol: "PSON", name: "Pearson", price: 1034.0, change: 8.5, changePercent: 0.83, index: "LSE" },
  { symbol: "RKT", name: "Reckitt Benckiser", price: 4567.0, change: -28.5, changePercent: -0.62, index: "LSE" },
  { symbol: "SBRY", name: "Sainsbury's", price: 267.5, change: 3.5, changePercent: 1.33, index: "LSE" },
  { symbol: "SSE", name: "SSE PLC", price: 1834.0, change: 15.5, changePercent: 0.85, index: "LSE" },
  { symbol: "SVT", name: "Severn Trent", price: 2678.0, change: 22.0, changePercent: 0.83, index: "LSE" },
  { symbol: "TSCO", name: "Tesco", price: 345.6, change: 4.2, changePercent: 1.23, index: "LSE" },
  { symbol: "WTB", name: "Whitbread", price: 3234.0, change: 28.5, changePercent: 0.89, index: "LSE" },
  { symbol: "BRBY", name: "Burberry Group", price: 1234.0, change: -18.5, changePercent: -1.48, index: "LSE" },
  { symbol: "CCH", name: "Coca-Cola HBC", price: 2567.0, change: 18.5, changePercent: 0.73, index: "LSE" },
  { symbol: "CNA", name: "Centrica", price: 134.5, change: 2.5, changePercent: 1.89, index: "LSE" },
  { symbol: "DCC", name: "DCC PLC", price: 5678.0, change: 42.0, changePercent: 0.75, index: "LSE" },
  { symbol: "FRES", name: "Fresnillo", price: 645.0, change: -12.5, changePercent: -1.9, index: "LSE" },
  { symbol: "HLMA", name: "Halma", price: 2456.0, change: 18.5, changePercent: 0.76, index: "LSE" },
  { symbol: "IHG", name: "InterContinental Hotels", price: 8234.0, change: 65.0, changePercent: 0.8, index: "LSE" },
  { symbol: "INF", name: "Informa", price: 867.5, change: 8.5, changePercent: 0.99, index: "LSE" },
  { symbol: "ITV", name: "ITV PLC", price: 78.4, change: -1.2, changePercent: -1.51, index: "LSE" },
  { symbol: "JD.", name: "JD Sports Fashion", price: 145.6, change: 2.8, changePercent: 1.96, index: "LSE" },
  { symbol: "KGF", name: "Kingfisher", price: 267.5, change: 3.5, changePercent: 1.33, index: "LSE" },
  { symbol: "MNG", name: "M&G PLC", price: 212.5, change: 2.5, changePercent: 1.19, index: "LSE" },
  { symbol: "MRO", name: "Melrose Industries", price: 567.5, change: 8.5, changePercent: 1.52, index: "LSE" },
  { symbol: "NXT", name: "Next PLC", price: 9234.0, change: 78.5, changePercent: 0.86, index: "LSE" },
  { symbol: "OCDO", name: "Ocado Group", price: 456.5, change: -8.5, changePercent: -1.83, index: "LSE" },
  { symbol: "PHNX", name: "Phoenix Group", price: 567.5, change: 6.5, changePercent: 1.16, index: "LSE" },
  { symbol: "PSN", name: "Persimmon", price: 1456.0, change: 18.5, changePercent: 1.29, index: "LSE" },
  { symbol: "RR.", name: "Rolls-Royce Holdings", price: 456.5, change: 12.5, changePercent: 2.81, index: "LSE" },
  { symbol: "RTO", name: "Rentokil Initial", price: 456.5, change: -5.5, changePercent: -1.19, index: "LSE" },
  { symbol: "SDR", name: "Schroders", price: 456.5, change: 5.5, changePercent: 1.22, index: "LSE" },
  { symbol: "SGE", name: "Sage Group", price: 1234.0, change: 12.5, changePercent: 1.02, index: "LSE" },
  { symbol: "SMIN", name: "Smiths Group", price: 1678.0, change: 15.5, changePercent: 0.93, index: "LSE" },
  { symbol: "SPX", name: "Spirax-Sarco Engineering", price: 10234.0, change: 85.0, changePercent: 0.84, index: "LSE" },
  { symbol: "STJ", name: "St. James's Place", price: 867.5, change: 8.5, changePercent: 0.99, index: "LSE" },
  { symbol: "TW.", name: "Taylor Wimpey", price: 145.6, change: 2.2, changePercent: 1.53, index: "LSE" },
  { symbol: "UU.", name: "United Utilities", price: 1067.5, change: 12.5, changePercent: 1.18, index: "LSE" },
  { symbol: "WEIR", name: "Weir Group", price: 2034.0, change: 18.5, changePercent: 0.92, index: "LSE" },
  { symbol: "WPP", name: "WPP PLC", price: 867.5, change: -8.5, changePercent: -0.97, index: "LSE" },
  { symbol: "BA.", name: "BAE Systems", price: 1234.0, change: 15.5, changePercent: 1.27, index: "LSE" },
  { symbol: "BDEV", name: "Barratt Developments", price: 456.5, change: 6.5, changePercent: 1.44, index: "LSE" },
  { symbol: "BLND", name: "British Land", price: 456.5, change: 5.5, changePercent: 1.22, index: "LSE" },
  { symbol: "CCL", name: "Carnival PLC", price: 1234.0, change: 18.5, changePercent: 1.52, index: "LSE" },
  { symbol: "EDV", name: "Endeavour Mining", price: 1834.0, change: -18.5, changePercent: -1.0, index: "LSE" },
  { symbol: "ENT", name: "Entain", price: 1234.0, change: 12.5, changePercent: 1.02, index: "LSE" },
  { symbol: "FLTR", name: "Flutter Entertainment", price: 16234.0, change: 145.0, changePercent: 0.9, index: "LSE" },
  { symbol: "FRAS", name: "Frasers Group", price: 867.5, change: 12.5, changePercent: 1.46, index: "LSE" },
  { symbol: "HIK", name: "Hikma Pharmaceuticals", price: 1834.0, change: 15.5, changePercent: 0.85, index: "LSE" },
  { symbol: "HWDN", name: "Howden Joinery", price: 867.5, change: 8.5, changePercent: 0.99, index: "LSE" },
  { symbol: "III", name: "3i Group", price: 3234.0, change: 28.5, changePercent: 0.89, index: "LSE" },
  { symbol: "IMI", name: "IMI PLC", price: 1678.0, change: 15.5, changePercent: 0.93, index: "LSE" },
  { symbol: "ITRK", name: "Intertek Group", price: 4567.0, change: 38.5, changePercent: 0.85, index: "LSE" },
  { symbol: "JET", name: "Just Eat Takeaway.com", price: 1234.0, change: -18.5, changePercent: -1.48, index: "LSE" },
  { symbol: "JMAT", name: "Johnson Matthey", price: 1834.0, change: 15.5, changePercent: 0.85, index: "LSE" },
  { symbol: "MGGT", name: "Meggitt", price: 867.5, change: 8.5, changePercent: 0.99, index: "LSE" },
  { symbol: "AUTO", name: "Auto Trader Group", price: 867.5, change: 12.5, changePercent: 1.46, index: "LSE" },
  { symbol: "AHT", name: "Ashtead Group", price: 5678.0, change: 48.5, changePercent: 0.86, index: "LSE" },
  { symbol: "BNKR", name: "Banker Investment Trust", price: 1234.0, change: 12.5, changePercent: 1.02, index: "LSE" },
  { symbol: "BKGH", name: "Berkeley Group Holdings", price: 4567.0, change: 38.5, changePercent: 0.85, index: "LSE" },
  { symbol: "BEZ", name: "Beazley", price: 678.5, change: 8.5, changePercent: 1.27, index: "LSE" },
  { symbol: "CTEC", name: "Convatec Group", price: 234.5, change: 3.5, changePercent: 1.52, index: "LSE" },
  { symbol: "DARK", name: "Darktrace", price: 456.5, change: -8.5, changePercent: -1.83, index: "LSE" },
  { symbol: "DPLM", name: "Diploma", price: 3456.0, change: 28.5, changePercent: 0.83, index: "LSE" },
  { symbol: "EZJ", name: "easyJet", price: 567.5, change: 8.5, changePercent: 1.52, index: "LSE" },
  { symbol: "FCIT", name: "F&C Investment Trust", price: 1034.0, change: 12.5, changePercent: 1.22, index: "LSE" },
  { symbol: "JLEN", name: "JLEN Environmental Assets", price: 123.5, change: 1.5, changePercent: 1.23, index: "LSE" },
]

export default function ChartPlatform() {
  const [selectedStock, setSelectedStock] = useState<Stock>(
    initialStocks.find((stock) => stock.symbol === "AZN") || initialStocks[0],
  )
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
