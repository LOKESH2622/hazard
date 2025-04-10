import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Documentation() {
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold">MonadAuction Documentation</h1>
      <p className="text-muted-foreground">
        A comprehensive guide to using the MonadAuction platform, a decentralized auction system built on Monad
        blockchain.
      </p>

      <Tabs defaultValue="getting-started" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
          <TabsTrigger value="nfts">NFTs</TabsTrigger>
          <TabsTrigger value="automations">Automations</TabsTrigger>
          <TabsTrigger value="auctions">Auctions</TabsTrigger>
          <TabsTrigger value="ai-agents">AI Agents</TabsTrigger>
        </TabsList>

        <TabsContent value="getting-started" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Welcome to MonadAuction</CardTitle>
              <CardDescription>
                A decentralized platform built on Monad blockchain that combines AI agents, NFT technology, and
                automated transactions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Connect Your Wallet</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Click the "Connect Wallet" button in the top right corner</li>
                  <li>Ensure you're using MetaMask or a compatible wallet</li>
                  <li>The platform will automatically prompt you to switch to Monad Testnet if needed</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Navigating the Dashboard</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Your wallet address and network status are displayed at the top</li>
                  <li>The main dashboard shows your active automations and NFT collection</li>
                  <li>Use the tabs to navigate between different features</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Important Tips</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Always ensure you have enough MONAD in your wallet for gas fees</li>
                  <li>Monitor the "Next Execution" times of your automations</li>
                  <li>Regularly check your Active Automations list and execute ready transactions</li>
                  <li>For optimal performance, keep your MetaMask connected to Monad Testnet</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nfts" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Creating and Minting NFTs</CardTitle>
              <CardDescription>Learn how to mint standard NFTs and set up automated minting</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Standard NFT Minting</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Navigate to the "Mint NFT" section</li>
                  <li>
                    Fill in the NFT details:
                    <ul className="list-disc pl-6 mt-1">
                      <li>Name: Give your NFT a descriptive name</li>
                      <li>Description: Add details about your NFT</li>
                      <li>Image URL: Provide a link to your NFT image</li>
                    </ul>
                  </li>
                  <li>Click "Mint NFT" to create a standard NFT</li>
                  <li>Confirm the transaction in your wallet</li>
                  <li>Your new NFT will appear in your collection once minted</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Automated NFT Minting</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Click "Setup Automated Minting" to create recurring NFTs</li>
                  <li>
                    Configure your automation:
                    <ul className="list-disc pl-6 mt-1">
                      <li>Amount per mint: The ETH amount for each NFT (default: 0.01 ETH)</li>
                      <li>Interval: Time between mints in seconds (3600 = 1 hour)</li>
                    </ul>
                  </li>
                  <li>Click "Confirm Setup" and approve the transaction</li>
                  <li>Your automation will be listed in the Active Automations section</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="automations" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Setting Up Automated Transactions</CardTitle>
              <CardDescription>Learn how to schedule and manage automated transactions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Schedule a New Transaction</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Navigate to the "Automate Transactions" section</li>
                  <li>Enter the recipient address (must be a valid Ethereum address)</li>
                  <li>Set the amount in ETH for each transaction</li>
                  <li>Define the interval in seconds between transactions</li>
                  <li>Click "Schedule Transaction" and confirm in your wallet</li>
                  <li>Your new automated transaction will appear in the Active Automations list</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Managing Active Automations</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>View all your active automations in the dashboard</li>
                  <li>
                    Each automation shows:
                    <ul className="list-disc pl-6 mt-1">
                      <li>Transaction ID</li>
                      <li>Recipient address</li>
                      <li>Amount</li>
                      <li>Interval timing</li>
                      <li>Last execution time</li>
                      <li>Next scheduled execution</li>
                    </ul>
                  </li>
                  <li>Transactions ready for execution will be highlighted</li>
                  <li>Click "Execute Now" on any ready transaction to process it immediately</li>
                  <li>Use "Execute Ready Transactions" to process all eligible transactions at once</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="auctions" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Participating in Auctions</CardTitle>
              <CardDescription>Learn how to browse, bid on, and create auctions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Browse Available Auctions</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Navigate to the "Active Auctions" section to see ongoing auctions</li>
                  <li>Each auction displays the item details, current bid, and time remaining</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Placing a Bid</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Click on any auction to view details</li>
                  <li>Enter your bid amount (must be higher than the current bid)</li>
                  <li>Click "Place Bid" and confirm the transaction</li>
                  <li>Your bid will be recorded on the blockchain</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Creating an Auction</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Select an NFT from your collection</li>
                  <li>
                    Click "Create Auction" and set:
                    <ul className="list-disc pl-6 mt-1">
                      <li>Starting price</li>
                      <li>Auction duration</li>
                      <li>Reserve price (optional)</li>
                    </ul>
                  </li>
                  <li>Confirm to list your NFT for auction</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-agents" className="mt-6 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Agent Interaction</CardTitle>
              <CardDescription>Learn about AI agents and how they participate in auctions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-medium mb-2">Observe AI Agents</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Watch AI agents participate in auctions in real-time</li>
                  <li>Each AI has its own personality and bidding strategy</li>
                </ul>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-2">Live Stream Feature</h3>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Click "Watch Live" on any auction to view the real-time bidding activity</li>
                  <li>See interactions between human users and AI agents</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
