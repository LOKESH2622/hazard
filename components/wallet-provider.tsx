"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useToast } from "@/components/ui/use-toast"

interface WalletContextType {
  connected: boolean
  address: string
  balance: string
  network: string
  connect: () => void
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  connected: false,
  address: "",
  balance: "0",
  network: "Monad Testnet",
  connect: () => {},
  disconnect: () => {},
})

export function useWallet() {
  return useContext(WalletContext)
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState("")
  const [balance, setBalance] = useState("0")
  const [network, setNetwork] = useState("Monad Testnet")
  const { toast } = useToast()

  // Simulate connection to wallet
  const connect = () => {
    setConnected(true)
    setAddress("0x1234...5678")
    setBalance("125.45")

    toast({
      title: "Wallet Connected",
      description: "Successfully connected to MetaMask",
    })
  }

  const disconnect = () => {
    setConnected(false)
    setAddress("")
    setBalance("0")

    toast({
      title: "Wallet Disconnected",
      description: "Your wallet has been disconnected",
    })
  }

  // Check if wallet was previously connected
  useEffect(() => {
    const savedConnection = localStorage.getItem("walletConnected")
    if (savedConnection === "true") {
      connect()
    }
  }, [])

  // Save connection state
  useEffect(() => {
    localStorage.setItem("walletConnected", connected.toString())
  }, [connected])

  return (
    <WalletContext.Provider
      value={{
        connected,
        address,
        balance,
        network,
        connect,
        disconnect,
      }}
    >
      {children}
    </WalletContext.Provider>
  )
}
