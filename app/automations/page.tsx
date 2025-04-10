import { AutomationsList } from "@/components/automations-list"
import { CreateAutomationForm } from "@/components/create-automation-form"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlayCircle } from "lucide-react"

export default function AutomationsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Automations</h1>
      <p className="text-muted-foreground">Manage your automated transactions and NFT minting.</p>

      <div className="flex justify-end">
        <Button>
          <PlayCircle className="mr-2 h-4 w-4" />
          Execute Ready Transactions
        </Button>
      </div>

      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active">Active Automations</TabsTrigger>
          <TabsTrigger value="create">Create Automation</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Automations</CardTitle>
              <CardDescription>View and manage your scheduled transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <AutomationsList />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="create" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Create a New Automation</CardTitle>
              <CardDescription>Schedule recurring transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <CreateAutomationForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
