import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Coins, ImageIcon, Gavel, Clock } from "lucide-react"
import { useWallet } from "@/components/wallet-provider"

export function DashboardStats() {
  const { balance } = useWallet()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Balance</CardTitle>
          <Coins className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{balance} MONAD</div>
          <p className="text-xs text-muted-foreground">≈ $2,509.00 USD</p>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-sm border-blue-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">NFTs Owned</CardTitle>
          <ImageIcon className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">7</div>
          <p className="text-xs text-muted-foreground">3 listed for auction</p>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Active Auctions</CardTitle>
          <Gavel className="h-4 w-4 text-purple-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">4</div>
          <p className="text-xs text-muted-foreground">2 with active bids</p>
        </CardContent>
      </Card>

      <Card className="bg-card/60 backdrop-blur-sm border-blue-500/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Automations</CardTitle>
          <Clock className="h-4 w-4 text-blue-500" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3</div>
          <p className="text-xs text-muted-foreground">1 ready for execution</p>
        </CardContent>
      </Card>
    </div>
  )
}
