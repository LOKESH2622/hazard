import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { PlayCircle, Trash2 } from "lucide-react"
import Link from "next/link"

const mockAutomations = [
  {
    id: "auto-1",
    type: "Transaction",
    recipient: "0xabcd...1234",
    amount: "0.05 MONAD",
    interval: "24 hours",
    lastExecution: "2 hours ago",
    nextExecution: "22 hours",
    status: "active",
  },
  {
    id: "auto-2",
    type: "NFT Minting",
    recipient: "Self",
    amount: "0.01 MONAD",
    interval: "48 hours",
    lastExecution: "47 hours ago",
    nextExecution: "1 hour",
    status: "ready",
  },
  {
    id: "auto-3",
    type: "Transaction",
    recipient: "0xefgh...5678",
    amount: "0.1 MONAD",
    interval: "7 days",
    lastExecution: "2 days ago",
    nextExecution: "5 days",
    status: "active",
  },
  {
    id: "auto-4",
    type: "Auction Bid",
    recipient: "Auction #1234",
    amount: "0.2 MONAD",
    interval: "6 hours",
    lastExecution: "5 hours ago",
    nextExecution: "1 hour",
    status: "ready",
  },
]

interface ActiveAutomationsProps {
  limit?: number
}

export function ActiveAutomations({ limit }: ActiveAutomationsProps) {
  const displayAutomations = limit ? mockAutomations.slice(0, limit) : mockAutomations

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Active Automations</h3>
        {limit && (
          <Link href="/automate">
            <Button variant="outline" size="sm">
              View All
            </Button>
          </Link>
        )}
      </div>

      <div className="rounded-md border border-border/50 overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Next Execution</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {displayAutomations.map((automation) => (
              <TableRow key={automation.id}>
                <TableCell>{automation.type}</TableCell>
                <TableCell className="font-mono">{automation.recipient}</TableCell>
                <TableCell>{automation.amount}</TableCell>
                <TableCell>{automation.nextExecution}</TableCell>
                <TableCell>
                  <Badge
                    variant={automation.status === "ready" ? "default" : "outline"}
                    className={
                      automation.status === "ready" ? "bg-green-500/20 text-green-400 border-green-500/30" : ""
                    }
                  >
                    {automation.status === "ready" ? "Ready" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      size="sm"
                      variant={automation.status === "ready" ? "default" : "outline"}
                      disabled={automation.status !== "ready"}
                      className={
                        automation.status === "ready"
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                          : ""
                      }
                    >
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
