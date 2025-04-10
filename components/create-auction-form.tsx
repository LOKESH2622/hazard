"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

const mockNFTs = [
  { id: "1", name: "Cosmic Voyager #42", image: "/placeholder.svg?height=200&width=200" },
  { id: "2", name: "Digital Dreamscape #7", image: "/placeholder.svg?height=200&width=200" },
  { id: "3", name: "Quantum Artifact #13", image: "/placeholder.svg?height=200&width=200" },
  { id: "4", name: "Neural Network #29", image: "/placeholder.svg?height=200&width=200" },
]

export function CreateAuctionForm() {
  const [selectedNFT, setSelectedNFT] = useState("")
  const [startingPrice, setStartingPrice] = useState(1)
  const [reservePrice, setReservePrice] = useState(0)
  const [duration, setDuration] = useState("86400") // 1 day in seconds
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const selectedNFTData = mockNFTs.find((nft) => nft.id === selectedNFT)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate auction creation
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Auction Created",
        description: `Your NFT "${selectedNFTData?.name}" is now listed for auction.`,
      })
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nft">Select NFT</Label>
            <Select value={selectedNFT} onValueChange={setSelectedNFT}>
              <SelectTrigger className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30">
                <SelectValue placeholder="Select an NFT to auction" />
              </SelectTrigger>
              <SelectContent>
                {mockNFTs.map((nft) => (
                  <SelectItem key={nft.id} value={nft.id}>
                    {nft.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="startingPrice">Starting Price (MONAD)</Label>
            <Input
              id="startingPrice"
              type="number"
              min="0.001"
              step="0.001"
              value={startingPrice}
              onChange={(e) => setStartingPrice(Number.parseFloat(e.target.value))}
              required
              className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="reservePrice">Reserve Price (MONAD, optional)</Label>
            <Input
              id="reservePrice"
              type="number"
              min="0"
              step="0.001"
              value={reservePrice}
              onChange={(e) => setReservePrice(Number.parseFloat(e.target.value))}
              className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="duration">Auction Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30">
                <SelectValue placeholder="Select duration" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3600">1 hour</SelectItem>
                <SelectItem value="21600">6 hours</SelectItem>
                <SelectItem value="43200">12 hours</SelectItem>
                <SelectItem value="86400">1 day</SelectItem>
                <SelectItem value="259200">3 days</SelectItem>
                <SelectItem value="604800">7 days</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Card className="w-full aspect-square flex items-center justify-center overflow-hidden border-purple-500/20">
            {selectedNFTData ? (
              <div className="w-full h-full relative">
                <img
                  src={selectedNFTData.image || "/placeholder.svg"}
                  alt={selectedNFTData.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-2">
                  <p className="text-white text-center">{selectedNFTData.name}</p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <p>Select an NFT to preview</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        disabled={isSubmitting || !selectedNFT}
      >
        {isSubmitting ? "Creating..." : "Create Auction"}
      </Button>
    </form>
  )
}
