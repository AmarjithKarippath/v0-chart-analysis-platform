export interface Stock {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  index: string
}

export interface CandlestickData {
  timestamp: number
  open: number
  high: number
  low: number
  close: number
  volume: number
}

export interface Watchlist {
  id: string
  name: string
  stocks: Stock[]
}
