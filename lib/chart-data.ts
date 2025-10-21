import type { CandlestickData } from "./types"

export function generateCandlestickData(basePrice: number, count: number): CandlestickData[] {
  const data: CandlestickData[] = []
  let currentPrice = basePrice
  const now = Date.now()

  for (let i = 0; i < count; i++) {
    const volatility = 0.02
    const change = (Math.random() - 0.5) * basePrice * volatility

    const open = currentPrice
    const close = currentPrice + change
    const high = Math.max(open, close) + Math.random() * basePrice * 0.01
    const low = Math.min(open, close) - Math.random() * basePrice * 0.01
    const volume = Math.random() * 1000000

    data.push({
      timestamp: now - (count - i) * 60000,
      open,
      high,
      low,
      close,
      volume,
    })

    currentPrice = close
  }

  return data
}
