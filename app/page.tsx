import { Button } from "@/components/ui/button"
import { WalletConnect } from "@/components/wallet-connect"
import { ArrowRight, Coins, Gavel, ImageIcon } from "lucide-react"
import Link from "next/link"
import { FeatureCard } from "@/components/feature-card"
import { HeroAnimation } from "@/components/hero-animation"
import { AuctionPreview } from "@/components/auction-preview"

export default function Home() {
  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/0 to-background z-10" />
        <div className="absolute inset-0 -z-10">
          <HeroAnimation />
        </div>

        <div className="container relative z-20 pt-20 pb-32 md:pt-32 md:pb-40 max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center space-y-8">
            <div className="inline-block animate-pulse bg-gradient-to-r from-purple-500 to-blue-500 rounded-full px-3 py-1 text-sm font-medium mb-4">
              Built on Monad Blockchain
            </div>

            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Welcome to{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-blue-500">
                MonadAuction
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-3xl">
              The next generation decentralized auction platform with NFT minting, automated transactions, and IPL-style
              player auctions with AI bidding agents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <WalletConnect size="lg" />
              <Link href="/auctions">
                <Button size="lg" variant="outline" className="group">
                  Explore Auctions
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background/60 backdrop-blur-sm">
        <div className="container max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Platform Features</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<ImageIcon className="h-10 w-10" />}
              title="Mint NFTs"
              description="Create unique digital assets on the Monad blockchain with just a few clicks. Set up automated minting for recurring NFT creation."
            />

            <FeatureCard
              icon={<Coins className="h-10 w-10" />}
              title="Automate Transactions"
              description="Schedule recurring transactions with customizable intervals. Perfect for regular payments, subscriptions, or DeFi strategies."
            />

            <FeatureCard
              icon={<Gavel className="h-10 w-10" />}
              title="IPL-Style Auctions"
              description="Participate in exciting IPL-style player auctions with real-time bidding. Compete against AI agents with unique bidding strategies."
            />
          </div>
        </div>
      </section>

      {/* Live Auctions Preview */}
      <section className="py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold">Live Auctions</h2>
            <Link href="/auctions">
              <Button variant="outline">View All</Button>
            </Link>
          </div>

          <AuctionPreview />
        </div>
      </section>
    </main>
  )
}
