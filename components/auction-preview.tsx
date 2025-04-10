import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, Eye } from "lucide-react"
import Link from "next/link"

const mockAuctions = [
  {
    id: "auction-1",
    name: "Virat Kohli",
    role: "Batsman",
    team: "RCB",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "2.5 MONAD",
    bidCount: 7,
    timeRemaining: "2h 15m",
    hasAI: true,
  },
  {
    id: "auction-2",
    name: "MS Dhoni",
    role: "Wicket Keeper",
    team: "CSK",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "3.8 MONAD",
    bidCount: 12,
    timeRemaining: "5h 30m",
    hasAI: true,
  },
  {
    id: "auction-3",
    name: "Rohit Sharma",
    role: "Batsman",
    team: "MI",
    image: "/placeholder.svg?height=300&width=300",
    currentBid: "2.2 MONAD",
    bidCount: 5,
    timeRemaining: "1d 4h",
    hasAI: false,
  },
]

export function AuctionPreview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {mockAuctions.map((auction) => (
        <Card key={auction.id} className="overflow-hidden group bg-card/60 backdrop-blur-sm border-purple-500/20">
          <CardHeader className="p-0">
            <div className="relative">
              <img
                src={auction.image || "/placeholder.svg"}
                alt={auction.name}
                className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              <div className="absolute top-4 right-4 flex gap-2">
                {auction.hasAI && (
                  <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30 backdrop-blur-sm">
                    <Bot className="mr-1 h-3 w-3" />
                    AI Active
                  </Badge>
                )}
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
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-muted-foreground">Current Bid</p>
                <p className="text-lg font-bold text-purple-400">{auction.currentBid}</p>
              </div>

              <div>
                <p className="text-xs text-muted-foreground">Time Remaining</p>
                <p className="text-sm font-medium">{auction.timeRemaining}</p>
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
