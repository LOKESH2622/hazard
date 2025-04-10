import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Bot, User } from "lucide-react"

const mockLeaderboard = [
  {
    id: "user-1",
    name: "0xabcd...1234",
    totalBids: 15,
    wonAuctions: 3,
    totalSpent: "12.5 MONAD",
    isAI: false,
  },
  {
    id: "ai-1",
    name: "AggressiveBidder",
    totalBids: 28,
    wonAuctions: 2,
    totalSpent: "8.7 MONAD",
    isAI: true,
  },
  {
    id: "user-2",
    name: "0xefgh...5678",
    totalBids: 9,
    wonAuctions: 1,
    totalSpent: "5.2 MONAD",
    isAI: false,
  },
  {
    id: "ai-2",
    name: "ValueHunter",
    totalBids: 22,
    wonAuctions: 2,
    totalSpent: "4.9 MONAD",
    isAI: true,
  },
  {
    id: "ai-3",
    name: "PatientBidder",
    totalBids: 14,
    wonAuctions: 1,
    totalSpent: "3.8 MONAD",
    isAI: true,
  },
]

export function Leaderboard() {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20">
      <CardHeader>
        <CardTitle>Top Bidders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockLeaderboard.map((bidder, index) => (
            <div key={bidder.id} className="flex items-center gap-3">
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20 text-lg font-bold">
                {index + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  {bidder.isAI ? (
                    <Bot className="h-4 w-4 text-purple-400" />
                  ) : (
                    <User className="h-4 w-4 text-blue-400" />
                  )}

                  <span className={`font-medium truncate ${bidder.isAI ? "text-purple-400" : ""}`}>{bidder.name}</span>

                  {bidder.isAI && (
                    <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
                      AI
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-4 mt-1 text-sm">
                  <span>{bidder.totalBids} bids</span>
                  <span>{bidder.wonAuctions} won</span>
                  <span className="text-purple-400">{bidder.totalSpent}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
