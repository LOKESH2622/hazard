import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Gavel, ExternalLink } from "lucide-react"
import Link from "next/link"

const mockNFTs = [
  {
    id: "1",
    name: "Cosmic Voyager #42",
    image: "/placeholder.svg?height=200&width=200",
    price: "2.5 MONAD",
  },
  {
    id: "2",
    name: "Digital Dreamscape #7",
    image: "/placeholder.svg?height=200&width=200",
    price: "1.8 MONAD",
  },
  {
    id: "3",
    name: "Quantum Artifact #13",
    image: "/placeholder.svg?height=200&width=200",
    price: "3.2 MONAD",
  },
  {
    id: "4",
    name: "Neural Network #29",
    image: "/placeholder.svg?height=200&width=200",
    price: "1.5 MONAD",
  },
  {
    id: "5",
    name: "Blockchain Pioneer #8",
    image: "/placeholder.svg?height=200&width=200",
    price: "4.2 MONAD",
  },
  {
    id: "6",
    name: "Crypto Punk #103",
    image: "/placeholder.svg?height=200&width=200",
    price: "5.7 MONAD",
  },
]

interface NFTCollectionProps {
  limit?: number
}

export function NFTCollection({ limit }: NFTCollectionProps) {
  const displayNFTs = limit ? mockNFTs.slice(0, limit) : mockNFTs

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Your NFTs</h3>
        {limit && (
          <Link href="/mint">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayNFTs.map((nft) => (
          <Card key={nft.id} className="overflow-hidden group bg-card/60 backdrop-blur-sm border-purple-500/20">
            <CardHeader className="p-0">
              <div className="relative overflow-hidden">
                <img
                  src={nft.image || "/placeholder.svg"}
                  alt={nft.name}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <h3 className="font-medium truncate">{nft.name}</h3>
              <p className="text-sm font-medium text-purple-400 mt-1">{nft.price}</p>
            </CardContent>
            <CardFooter className="flex justify-between p-4 pt-0">
              <Button variant="outline" size="sm" className="group-hover:border-purple-500/50">
                <ExternalLink className="h-4 w-4 mr-2" />
                View
              </Button>
              <Button
                size="sm"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                <Gavel className="h-4 w-4 mr-2" />
                Auction
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
