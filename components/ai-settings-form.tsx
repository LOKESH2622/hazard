"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export function AISettingsForm() {
  const [enableAI, setEnableAI] = useState(true)
  const [agentCount, setAgentCount] = useState(3)
  const [aggressiveness, setAggressiveness] = useState(50)
  const [strategy, setStrategy] = useState("balanced")
  const { toast } = useToast()

  const handleSave = () => {
    toast({
      title: "AI Settings Saved",
      description: `${agentCount} AI agents with ${strategy} strategy will participate in your auction.`,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Switch id="enableAI" checked={enableAI} onCheckedChange={setEnableAI} />
        <Label htmlFor="enableAI">Enable AI agents to participate in auction</Label>
      </div>

      {enableAI && (
        <div className="space-y-4 pt-2">
          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="agentCount">Number of AI Agents</Label>
              <span className="text-sm text-purple-400">{agentCount}</span>
            </div>
            <Slider
              id="agentCount"
              min={1}
              max={10}
              step={1}
              value={[agentCount]}
              onValueChange={(value) => setAgentCount(value[0])}
              disabled={!enableAI}
              className="[&>span]:bg-purple-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between">
              <Label htmlFor="aggressiveness">Bidding Aggressiveness</Label>
              <span className="text-sm text-purple-400">{aggressiveness}%</span>
            </div>
            <Slider
              id="aggressiveness"
              min={0}
              max={100}
              step={5}
              value={[aggressiveness]}
              onValueChange={(value) => setAggressiveness(value[0])}
              disabled={!enableAI}
              className="[&>span]:bg-purple-500"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Conservative</span>
              <span>Balanced</span>
              <span>Aggressive</span>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="strategy">Bidding Strategy</Label>
            <Select value={strategy} onValueChange={setStrategy} disabled={!enableAI}>
              <SelectTrigger className="bg-background/50 border-purple-500/20 focus-visible:ring-purple-500/30">
                <SelectValue placeholder="Select strategy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
                <SelectItem value="value-hunter">Value Hunter</SelectItem>
                <SelectItem value="last-minute">Last Minute Sniper</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      <Button
        onClick={handleSave}
        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
      >
        Save AI Settings
      </Button>
    </div>
  )
}
