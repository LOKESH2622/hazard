"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"

export function AutomatedMintingForm() {
  const [amount, setAmount] = useState(0.01)
  const [interval, setInterval] = useState(3600) // 1 hour in seconds
  const [useTemplate, setUseTemplate] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

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
    setIsSubmitting(true)

    // Simulate setup process
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Automated Minting Setup",
        description: `Your NFT will be minted every ${formatInterval(interval)} with ${amount} MONAD.`,
      })
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="amount">Amount per mint (MONAD)</Label>
          <Input
            id="amount"
            type="number"
            min="0.001"
            step="0.001"
            value={amount}
            onChange={(e) => setAmount(Number.parseFloat(e.target.value))}
            required
            className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30"
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <Label htmlFor="interval">Interval between mints</Label>
            <span className="text-sm text-purple-400">{formatInterval(interval)}</span>
          </div>
          <Slider
            id="interval"
            min={300}
            max={604800}
            step={300}
            value={[interval]}
            onValueChange={(value) => setInterval(value[0])}
            className="[&>span]:bg-purple-500"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>5 minutes</span>
            <span>1 hour</span>
            <span>1 day</span>
            <span>1 week</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-4">
          <Switch id="useTemplate" checked={useTemplate} onCheckedChange={setUseTemplate} />
          <Label htmlFor="useTemplate">Use NFT template for automated minting</Label>
        </div>

        {useTemplate && (
          <div className="space-y-2 pt-2">
            <Label htmlFor="templateName">Template Name</Label>
            <Input
              id="templateName"
              placeholder="Enter a name for your NFT template"
              required={useTemplate}
              className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30"
            />
          </div>
        )}
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Setting up..." : "Setup Automated Minting"}
      </Button>
    </form>
  )
}
