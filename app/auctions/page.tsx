import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AuctionGrid } from "@/components/auction-grid"
import { AIActivityFeed } from "@/components/ai-activity-feed"
import { Leaderboard } from "@/components/leaderboard"
import { Plus } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Auctions | MonadAuction",
  description: "Browse and bid on IPL-style player auctions",
}

export default function AuctionsPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DashboardHeader
          title="IPL Auction Arena"
          description="Browse and bid on player auctions with AI bidding agents"
          className="mb-0"
        />

        <Link href="/auctions/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Auction
          </Button>
        </Link>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Auctions</TabsTrigger>
          <TabsTrigger value="my-bids">My Bids</TabsTrigger>
          <TabsTrigger value="ai-bidding">AI Bidding</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <AuctionGrid />
        </TabsContent>

        <TabsContent value="my-bids" className="mt-6">
          <AuctionGrid filter="my-bids" />
        </TabsContent>

        <TabsContent value="ai-bidding" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <AuctionGrid filter="ai-active" />
            </div>

            <div className="space-y-6">
              <AIActivityFeed expanded />
              <Leaderboard />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
