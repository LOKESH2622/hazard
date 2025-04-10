import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Eye } from "lucide-react"
import Link from "next/link"

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
]

export function ActiveAuctions() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Active Auctions</h3>
        <Link href="/auctions">
          <Button>View All Auctions</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockAuctions.map((auction) => (
          <Card key={auction.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={auction.image || "/placeholder.svg"}
                  alt={auction.name}
                  className="w-full h-48 object-cover"
                />
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
                <div>
                  <p className="text-xs text-muted-foreground">Bids</p>
                  <p className="font-medium">{auction.bidCount}</p>
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
    </div>
  )
}
