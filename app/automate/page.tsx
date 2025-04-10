import type { Metadata } from "next"
import { DashboardHeader } from "@/components/dashboard-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AutomationForm } from "@/components/automation-form"
import { ActiveAutomations } from "@/components/active-automations"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

export const metadata: Metadata = {
  title: "Automate Transactions | MonadAuction",
  description: "Schedule recurring transactions on the Monad blockchain",
}

export default function AutomatePage() {
  return (
    <div className="flex-1 space-y-6 p-6 md:p-8">
      <DashboardHeader
        title="Automated Transactions"
        description="Schedule recurring transactions on the Monad blockchain"
      />

      <div className="flex justify-end">
        <Button>
          <PlayCircle className="mr-2 h-4 w-4" />
          Execute Ready Transactions
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Active Automations</CardTitle>
              <CardDescription>Your scheduled transactions and automated minting</CardDescription>
            </CardHeader>
            <CardContent>
              <ActiveAutomations />
            </CardContent>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Create Automation</CardTitle>
              <CardDescription>Schedule a new recurring transaction</CardDescription>
            </CardHeader>
            <CardContent>
              <AutomationForm />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
