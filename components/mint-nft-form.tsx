"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Upload } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export function MintNFTForm() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [preview, setPreview] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value
    setImageUrl(url)
    setPreview(url)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate minting process
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "NFT Minted Successfully",
        description: `Your NFT "${name}" has been minted on the Monad blockchain.`,
      })

      // Reset form
      setName("")
      setDescription("")
      setImageUrl("")
      setPreview("")
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">NFT Name</Label>
            <Input
              id="name"
              placeholder="Enter a name for your NFT"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Describe your NFT"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              required
              className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <Input
              id="imageUrl"
              placeholder="Enter image URL"
              value={imageUrl}
              onChange={handleImageChange}
              required
              className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <Card className="w-full aspect-square flex items-center justify-center overflow-hidden border-purple-500/20">
            {preview ? (
              <img
                src={preview || "/placeholder.svg"}
                alt="NFT Preview"
                className="w-full h-full object-cover"
                onError={() => setPreview("")}
              />
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
                <Upload className="h-12 w-12 mb-2" />
                <p>Enter an image URL to preview your NFT</p>
              </div>
            )}
          </Card>
        </div>
      </div>

      <Button
        type="submit"
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Minting..." : "Mint NFT"}
      </Button>
    </form>
  )
}
