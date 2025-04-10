"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Gauge } from "lucide-react"

export function GasTracker() {
  const [gasPrice, setGasPrice] = useState("12")

  // Simulate gas price updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Random gas price between 8 and 20
      const newPrice = (Math.floor(Math.random() * 12) + 8).toString()
      setGasPrice(newPrice)
    }, 30000) // Update every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Badge variant="outline" className="w-full justify-center">
      <Gauge className="mr-1 h-3 w-3" />
      Gas: {gasPrice} Gwei
    </Badge>
  )
}
