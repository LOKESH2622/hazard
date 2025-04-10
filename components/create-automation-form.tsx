"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function CreateAutomationForm() {
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState(0.1)
  const [interval, setInterval] = useState(86400) // 1 day in seconds
  const [type, setType] = useState("transaction")

  const formatInterval = (seconds: number) => {
    if (seconds < 3600) {
      return `${Math.floor(seconds / 60)} minutes`
    } else if (seconds < 86400) {
      return `${Math.floor(seconds / 3600)} hours`
    } else {
      return `${Math.floor(seconds / 86400)} days`
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate setup process
    alert(`Setting up automated ${type}: ${amount} MONAD to ${recipient} every ${formatInterval(interval)}`)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="type">Automation Type</Label>
          <Select value={type} onValueChange={setType}>
            <SelectTrigger>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transaction">Regular Transaction</SelectItem>
              <SelectItem value="nft-minting">NFT Minting</SelectItem>
              <SelectItem value="bid">Auction Bid</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="recipient">Recipient Address</Label>
          <Input
            id="recipient"
            placeholder="Enter Ethereum address"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="amount">Amount (MONAD)</Label>
          <Input
            id="amount"
            type="number"
            min="0.001"
            step="0.001"
            value={amount}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
            required
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="interval">Interval</Label>
            <span className="text-sm text-muted-foreground">{formatInterval(interval)}</span>
          </div>
          <Slider
            id="interval"
            min={300}
            max={2592000}
            step={300}
            value={[interval]}
            onValueChange={(value) => setInterval(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 min</span>
            <span>1 day</span>
            <span>1 week</span>
            <span>30 days</span>
          </div>
        </div>
      </div>

      <Button type="submit" className="w-full">
        Schedule Automation
      </Button>
    </form>
  )
}
