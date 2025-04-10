import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Eye, Users } from "lucide-react"
import Link from "next/link"

const mockAuctions = [
  {
    id: "auction-1",
    name: "Virat Kohli",
    role: "Batsman",
    team: "RCB",
    stats: "Avg: 53.5 | SR: 136.9",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "2.5 MONAD",
    bidCount: 7,
    timeRemaining: "2h 15m",
    hasAI: true,
    yourBid: false,
  },
  {
    id: "auction-2",
    name: "MS Dhoni",
    role: "Wicket Keeper",
    team: "CSK",
    stats: "Avg: 38.2 | SR: 135.2",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "3.8 MONAD",
    bidCount: 12,
    timeRemaining: "5h 30m",
    hasAI: true,
    yourBid: true,
  },
  {
    id: "auction-3",
    name: "Rohit Sharma",
    role: "Batsman",
    team: "MI",
    stats: "Avg: 45.3 | SR: 138.7",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "2.2 MONAD",
    bidCount: 5,
    timeRemaining: "1d 4h",
    hasAI: false,
    yourBid: false,
  },
  {
    id: "auction-4",
    name: "Jasprit Bumrah",
    role: "Bowler",
    team: "MI",
    stats: "Wkts: 130 | Econ: 7.4",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "1.9 MONAD",
    bidCount: 8,
    timeRemaining: "8h 45m",
    hasAI: true,
    yourBid: false,
  },
  {
    id: "auction-5",
    name: "KL Rahul",
    role: "Batsman",
    team: "LSG",
    stats: "Avg: 47.8 | SR: 134.5",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "1.5 MONAD",
    bidCount: 3,
    timeRemaining: "2d 6h",
    hasAI: false,
    yourBid: true,
  },
  {
    id: "auction-6",
    name: "Hardik Pandya",
    role: "All-rounder",
    team: "GT",
    stats: "Avg: 32.4 | SR: 147.6 | Wkts: 65",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "2.8 MONAD",
    bidCount: 10,
    timeRemaining: "12h 20m",
    hasAI: true,
    yourBid: false,
  },
]

interface AuctionGridProps {
  filter?: "all" | "my-bids" | "ai-active"
}

export function AuctionGrid({ filter = "all" }: AuctionGridProps) {
  let filteredAuctions = [...mockAuctions]

  if (filter === "my-bids") {
    filteredAuctions = filteredAuctions.filter((auction) => auction.yourBid)
  } else if (filter === "ai-active") {
    filteredAuctions = filteredAuctions.filter((auction) => auction.hasAI)
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredAuctions.map((auction) => (
        <Card key={auction.id} className="overflow-hidden group bg-card/60 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="p-0">
            <div className="relative">
              <img
                src={auction.image || "/placeholder.svg"}
                alt={auction.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute top-4 right-4 flex flex-col gap-2 items-end">
                {auction.hasAI && (
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 backdrop-blur-sm">
                    <Bot className="mr-1 h-3 w-3" />
                    AI Active
                  </Badge>
                )}

                {auction.yourBid && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 backdrop-blur-sm">
                    Your Bid
                  </Badge>
                )}

                <Badge variant="outline" className="bg-black/50 text-white border-white/20 backdrop-blur-sm">
                  {auction.timeRemaining} left
                </Badge>
              </div>

              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-xl font-bold text-white">{auction.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-sm">
                    {auction.role}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30 backdrop-blur-sm">
                    {auction.team}
                  </Badge>
                </div>
                <p className="text-xs text-white/80 mt-2">{auction.stats}</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Current Bid</p>
                <p className="text-lg font-bold text-purple-400">{auction.currentBid}</p>
              </div>

              <div className="flex items-center gap-1">
                <Users className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{auction.bidCount} bids</p>
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-between p-4 pt-0">
            <Button variant="outline" size="sm" className="group-hover:border-purple-500/50">
              <Eye className="h-4 w-4 mr-2" />
              Watch Live
            </Button>
            <Link href={`/auctions/${auction.id}`}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Place Bid
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
