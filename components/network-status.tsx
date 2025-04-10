"use client"

import { useWallet } from "@/components/wallet-provider"
import { Badge } from "@/components/ui/badge"
import { Wifi } from "lucide-react"

export function NetworkStatus() {
  const { connected, network } = useWallet()

  if (!connected) {
    return (
      <Badge variant="outline" className="w-full justify-center text-muted-foreground">
        <Wifi className="mr-1 h-3 w-3" />
        Not Connected
      </Badge>
    )
  }

  return (
    <Badge variant="outline" className="w-full justify-center bg-green-500/10 text-green-400 border-green-500/30">
      <Wifi className="mr-1 h-3 w-3" />
      {network}
    </Badge>
  )
}
