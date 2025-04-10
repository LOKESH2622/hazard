import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardStats } from "@/components/dashboard-stats"
import { NFTCollection } from "@/components/nft-collection"
import { ActiveAutomations } from "@/components/active-automations"
import { AuctionQuickLinks } from "@/components/auction-quick-links"
import { AIActivityFeed } from "@/components/ai-activity-feed"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export const metadata: Metadata = {
  title: "Dashboard | MonadAuction",
  description: "Your MonadAuction dashboard",
}

export default function DashboardPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <DashboardHeader title="Dashboard" description="Overview of your NFTs, automations, and auctions" />

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="nfts" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="nfts">My NFTs</TabsTrigger>
              <TabsTrigger value="automations">Automations</TabsTrigger>
              <TabsTrigger value="auctions">My Auctions</TabsTrigger>
            </TabsList>

            <TabsContent value="nfts" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My NFT Collection</CardTitle>
                  <CardDescription>Manage your NFTs minted on the Monad blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  <NFTCollection limit={4} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automations" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Active Automations</CardTitle>
                  <CardDescription>Your scheduled transactions and automated minting</CardDescription>
                </CardHeader>
                <CardContent>
                  <ActiveAutomations limit={3} />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="auctions" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Auction Activity</CardTitle>
                  <CardDescription>Auctions you've created or bid on</CardDescription>
                </CardHeader>
                <CardContent>
                  <AuctionQuickLinks />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card className="h-full">
            <CardHeader>
              <CardTitle>AI Agent Activity</CardTitle>
              <CardDescription>Recent AI bidding activity</CardDescription>
            </CardHeader>
            <CardContent>
              <AIActivityFeed />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
