"use client"
import { Button, type ButtonProps } from "@/components/ui/button"
import { Wallet, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useWallet } from "@/components/wallet-provider"
import { cn } from "@/lib/utils"

interface WalletConnectProps extends ButtonProps {
  showAddress?: boolean
}

export function WalletConnect({ showAddress = false, className, size, ...props }: WalletConnectProps) {
  const { connected, address, connect, disconnect } = useWallet()

  if (!connected) {
    return (
      <Button
        onClick={connect}
        className={cn(
          "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700",
          className,
        )}
        size={size}
        {...props}
      >
        <Wallet className="mr-2 h-4 w-4" />
        Connect Wallet
      </Button>
    )
  }

  if (showAddress) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className={cn("flex items-center gap-2", className)} size={size} {...props}>
            <Wallet className="h-4 w-4" />
            {address}
            <ChevronDown className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Wallet</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(address || "")}>Copy Address</DropdownMenuItem>
          <DropdownMenuItem>View on Explorer</DropdownMenuItem>
          <DropdownMenuItem>Switch Network</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={disconnect} className="text-red-500">
            Disconnect
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <Button
      variant="outline"
      className={cn("bg-green-500/10 text-green-400 border-green-500/30 hover:bg-green-500/20", className)}
      size={size}
      {...props}
    >
      <Wallet className="mr-2 h-4 w-4" />
      Connected
    </Button>
  )
}
