import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MintNFTForm } from "@/components/mint-nft-form"
import { AutomatedMintingForm } from "@/components/automated-minting-form"
import { NFTCollection } from "@/components/nft-collection"

export const metadata: Metadata = {
  title: "Mint NFTs | MonadAuction",
  description: "Mint new NFTs on the Monad blockchain",
}

export default function MintPage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <DashboardHeader title="Mint NFTs" description="Create unique digital assets on the Monad blockchain" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="standard">Standard Minting</TabsTrigger>
              <TabsTrigger value="automated">Automated Minting</TabsTrigger>
            </TabsList>

            <TabsContent value="standard" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Mint a New NFT</CardTitle>
                  <CardDescription>Create a unique NFT on the Monad blockchain</CardDescription>
                </CardHeader>
                <CardContent>
                  <MintNFTForm />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automated" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Setup Automated Minting</CardTitle>
                  <CardDescription>Configure recurring NFT minting at specified intervals</CardDescription>
                </CardHeader>
                <CardContent>
                  <AutomatedMintingForm />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Recently Minted</CardTitle>
              <CardDescription>Your latest NFTs</CardDescription>
            </CardHeader>
            <CardContent>
              <NFTCollection limit={3} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
