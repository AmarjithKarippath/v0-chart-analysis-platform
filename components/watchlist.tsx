"use client"

import { useState } from "react"
import { Search, Plus, MoreVertical, Trash2, Edit2, FolderPlus } from "lucide-react"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Stock, Watchlist as WatchlistType } from "@/lib/types"

interface WatchlistProps {
  watchlists: WatchlistType[]
  activeWatchlistId: string
  selectedStock: Stock
  onSelectStock: (stock: Stock) => void
  onSelectWatchlist: (id: string) => void
  onCreateWatchlist: (name: string) => void
  onDeleteWatchlist: (id: string) => void
  onRenameWatchlist: (id: string, newName: string) => void
  onAddStockToWatchlist: (stock: Stock, targetWatchlistId: string) => void
}

export function Watchlist({
  watchlists,
  activeWatchlistId,
  selectedStock,
  onSelectStock,
  onSelectWatchlist,
  onCreateWatchlist,
  onDeleteWatchlist,
  onRenameWatchlist,
  onAddStockToWatchlist,
}: WatchlistProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [newWatchlistName, setNewWatchlistName] = useState("")
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false)
  const [renameWatchlistId, setRenameWatchlistId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState("")

  const activeWatchlist = watchlists.find((w) => w.id === activeWatchlistId) || watchlists[0]
  const totalStocks = activeWatchlist.stocks.length

  const handleCreateWatchlist = () => {
    if (newWatchlistName.trim()) {
      onCreateWatchlist(newWatchlistName.trim())
      setNewWatchlistName("")
      setIsCreateDialogOpen(false)
    }
  }

  const handleRenameClick = (watchlist: WatchlistType) => {
    setRenameWatchlistId(watchlist.id)
    setRenameValue(watchlist.name)
    setIsRenameDialogOpen(true)
  }

  const handleRenameConfirm = () => {
    if (renameWatchlistId && renameValue.trim()) {
      onRenameWatchlist(renameWatchlistId, renameValue.trim())
      setIsRenameDialogOpen(false)
      setRenameWatchlistId(null)
      setRenameValue("")
    }
  }

  return (
    <aside className="w-64 border-r border-border bg-card">
      <div className="flex h-full flex-col">
        <div className="border-b border-border p-3">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search eg: shel, bp, ftse 100, etc" className="h-9 pl-8 text-xs" />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-border px-3 py-2">
          <span className="text-xs text-muted-foreground">Main ({totalStocks} / 250)</span>
          <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-7 text-xs text-primary">
                <Plus className="mr-1 h-3 w-3" />
                New group
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Create New Watchlist</DialogTitle>
                <DialogDescription>Enter a name for your new watchlist group.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <Input
                  placeholder="Watchlist name"
                  value={newWatchlistName}
                  onChange={(e) => setNewWatchlistName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleCreateWatchlist()
                    }
                  }}
                />
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleCreateWatchlist}>Create</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border-b border-border">
          {watchlists.map((watchlist) => (
            <div
              key={watchlist.id}
              className={cn(
                "flex items-center justify-between px-3 py-2 cursor-pointer hover:bg-accent transition-colors",
                activeWatchlistId === watchlist.id && "bg-accent",
              )}
              onClick={() => onSelectWatchlist(watchlist.id)}
            >
              <span className="text-xs font-medium">
                {watchlist.name} ({watchlist.stocks.length})
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <MoreVertical className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleRenameClick(watchlist)}>
                    <Edit2 className="mr-2 h-3 w-3" />
                    Rename
                  </DropdownMenuItem>
                  {watchlists.length > 1 && (
                    <DropdownMenuItem onClick={() => onDeleteWatchlist(watchlist.id)} className="text-destructive">
                      <Trash2 className="mr-2 h-3 w-3" />
                      Delete
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>

        <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Rename Watchlist</DialogTitle>
              <DialogDescription>Enter a new name for your watchlist.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                placeholder="Watchlist name"
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleRenameConfirm()
                  }
                }}
              />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleRenameConfirm}>Rename</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <div className="flex-1 overflow-y-auto">
          {activeWatchlist.stocks.map((stock) => (
            <div
              key={stock.symbol}
              className={cn(
                "flex w-full items-center justify-between border-b border-border transition-colors hover:bg-accent group",
                selectedStock.symbol === stock.symbol && "bg-accent",
              )}
            >
              <button
                onClick={() => onSelectStock(stock)}
                className="flex flex-1 items-center justify-between px-3 py-3 text-left"
              >
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{stock.symbol}</span>
                  <span className="text-xs text-muted-foreground">{stock.index}</span>
                </div>
                <div className="flex flex-col items-end gap-0.5">
                  <span className={cn("text-xs font-medium", stock.change >= 0 ? "text-success" : "text-destructive")}>
                    {stock.change >= 0 ? "+" : ""}
                    {stock.change.toFixed(2)}
                  </span>
                  <span className={cn("text-xs", stock.change >= 0 ? "text-success" : "text-destructive")}>
                    {stock.changePercent >= 0 ? "+" : ""}
                    {stock.changePercent.toFixed(2)}%
                  </span>
                  <span className="text-xs font-semibold">{stock.price.toFixed(2)}</span>
                </div>
              </button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 mr-2 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {watchlists
                    .filter((w) => w.id !== activeWatchlistId)
                    .map((watchlist) => (
                      <DropdownMenuItem key={watchlist.id} onClick={() => onAddStockToWatchlist(stock, watchlist.id)}>
                        <FolderPlus className="mr-2 h-3 w-3" />
                        Add to {watchlist.name}
                      </DropdownMenuItem>
                    ))}
                  {watchlists.filter((w) => w.id !== activeWatchlistId).length === 0 && (
                    <DropdownMenuItem disabled>
                      <span className="text-xs text-muted-foreground">No other watchlists</span>
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
