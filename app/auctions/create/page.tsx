import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CreateAuctionForm } from "@/components/create-auction-form"
import { AISettingsForm } from "@/components/ai-settings-form"

export const metadata: Metadata = {
  title: "Create Auction | MonadAuction",
  description: "Create a new auction on the Monad blockchain",
}

export default function CreateAuctionPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <DashboardHeader title="Create Auction" description="List an NFT for auction with optional AI bidding" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Auction Details</CardTitle>
              <CardDescription>Configure your auction settings</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateAuctionForm />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>AI Bidding Settings</CardTitle>
              <CardDescription>Configure AI agent participation</CardDescription>
            </CardHeader>
            <CardContent>
              <AISettingsForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
