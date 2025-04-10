import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

const mockAuctions = [
  {
    id: "auction-1",
    name: "Virat Kohli",
    image: "/placeholder.svg?height=100&width=100",
    currentBid: "2.5 MONAD",
    timeRemaining: "2h 15m",
    yourBid: true,
  },
  {
    id: "auction-2",
    name: "MS Dhoni",
    image: "/placeholder.svg?height=100&width=100",
    currentBid: "3.8 MONAD",
    timeRemaining: "5h 30m",
    yourBid: false,
  },
  {
    id: "auction-3",
    name: "Rohit Sharma",
    image: "/placeholder.svg?height=100&width=100",
    currentBid: "2.2 MONAD",
    timeRemaining: "1d 4h",
    yourBid: true,
  },
]

export function AuctionQuickLinks() {
  return (
    <div className="space-y-4">
      {mockAuctions.map((auction) => (
        <Card key={auction.id} className="bg-card/60 backdrop-blur-sm border-purple-500/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-4">
              <img
                src={auction.image || "/placeholder.svg"}
                alt={auction.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-purple-500/30"
              />

              <div className="flex-1 min-w-0">
                <h4 className="font-medium truncate">{auction.name}</h4>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-sm text-purple-400">{auction.currentBid}</span>
                  <Badge variant="outline" className="text-xs bg-blue-500/10 text-blue-400 border-blue-500/30">
                    {auction.timeRemaining} left
                  </Badge>
                  {auction.yourBid && (
                    <Badge className="text-xs bg-green-500/20 text-green-400 border-green-500/30">Your Bid</Badge>
                  )}
                </div>
              </div>

              <Link href={`/auctions/${auction.id}`}>
                <Button size="sm" variant="outline" className="group">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      ))}

      <div className="flex justify-center">
        <Link href="/auctions">
          <Button variant="outline" className="w-full group">
            View All Auctions
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
