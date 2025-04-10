import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye, Users } from "lucide-react"

const mockAuctions = [
  {
    id: "auction-1",
    name: "Cosmic Voyager #42",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: "2.5 MONAD",
    bidCount: 7,
    timeRemaining: "2h 15m",
    hasAI: true,
  },
  {
    id: "auction-2",
    name: "Digital Dreamscape #7",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: "1.8 MONAD",
    bidCount: 4,
    timeRemaining: "5h 30m",
    hasAI: true,
  },
  {
    id: "auction-3",
    name: "Quantum Artifact #13",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: "3.2 MONAD",
    bidCount: 12,
    timeRemaining: "1d 4h",
    hasAI: false,
  },
  {
    id: "auction-4",
    name: "Neural Network #29",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: "1.5 MONAD",
    bidCount: 3,
    timeRemaining: "3d 12h",
    hasAI: true,
  },
  {
    id: "auction-5",
    name: "Blockchain Pioneer #8",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: "4.2 MONAD",
    bidCount: 15,
    timeRemaining: "6h 45m",
    hasAI: true,
  },
  {
    id: "auction-6",
    name: "Crypto Punk #103",
    image: "/placeholder.svg?height=200&width=200",
    currentBid: "5.7 MONAD",
    bidCount: 21,
    timeRemaining: "12h 20m",
    hasAI: false,
  },
]

export function AuctionsList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {mockAuctions.map((auction) => (
        <Card key={auction.id} className="overflow-hidden">
          <CardHeader className="p-0">
            <div className="relative">
              <img src={auction.image || "/placeholder.svg"} alt={auction.name} className="w-full h-48 object-cover" />
              <div className="absolute top-2 right-2">
                {auction.hasAI && <Badge className="bg-purple-600">AI Active</Badge>}
              </div>
              <div className="absolute bottom-2 right-2">
                <Badge variant="outline" className="bg-black/50 backdrop-blur-sm">
                  {auction.timeRemaining} left
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <h3 className="font-medium">{auction.name}</h3>
            <div className="flex justify-between mt-2">
              <div>
                <p className="text-xs text-muted-foreground">Current Bid</p>
                <p className="font-medium">{auction.currentBid}</p>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-3 w-3" />
                <p className="font-medium">{auction.bidCount} bids</p>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between p-4 pt-0">
            <Button variant="outline" size="sm">
              <Eye className="h-4 w-4 mr-2" />
              Watch Live
            </Button>
            <Button size="sm">Place Bid</Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
