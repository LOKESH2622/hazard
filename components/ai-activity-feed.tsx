"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, User } from "lucide-react"

interface ActivityItem {
  id: string
  agent: string
  action: string
  target: string
  amount: string
  time: string
  isAI: boolean
}

const initialActivities: ActivityItem[] = [
  {
    id: "act-1",
    agent: "AggressiveBidder",
    action: "placed a bid on",
    target: "Virat Kohli",
    amount: "2.5 MONAD",
    time: "2 minutes ago",
    isAI: true,
  },
  {
    id: "act-2",
    agent: "0xabcd...1234",
    action: "outbid AI on",
    target: "MS Dhoni",
    amount: "3.8 MONAD",
    time: "5 minutes ago",
    isAI: false,
  },
  {
    id: "act-3",
    agent: "ValueHunter",
    action: "placed a bid on",
    target: "Rohit Sharma",
    amount: "2.2 MONAD",
    time: "12 minutes ago",
    isAI: true,
  },
  {
    id: "act-4",
    agent: "StrategicBuyer",
    action: "increased bid on",
    target: "Jasprit Bumrah",
    amount: "1.9 MONAD",
    time: "15 minutes ago",
    isAI: true,
  },
  {
    id: "act-5",
    agent: "0xefgh...5678",
    action: "created auction for",
    target: "KL Rahul",
    amount: "1.5 MONAD",
    time: "20 minutes ago",
    isAI: false,
  },
]

interface AIActivityFeedProps {
  expanded?: boolean
}

export function AIActivityFeed({ expanded = false }: AIActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivities)

  // Simulate new AI activities
  useEffect(() => {
    if (!expanded) return

    const aiAgents = ["AggressiveBidder", "ValueHunter", "StrategicBuyer", "PatientBidder"]
    const players = ["Virat Kohli", "MS Dhoni", "Rohit Sharma", "Jasprit Bumrah", "KL Rahul", "Hardik Pandya"]
    const actions = ["placed a bid on", "increased bid on", "is watching", "entered auction for"]

    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: `act-${Date.now()}`,
        agent: aiAgents[Math.floor(Math.random() * aiAgents.length)],
        action: actions[Math.floor(Math.random() * actions.length)],
        target: players[Math.floor(Math.random() * players.length)],
        amount: `${(Math.random() * 3 + 1).toFixed(1)} MONAD`,
        time: "just now",
        isAI: true,
      }

      setActivities((prev) => [newActivity, ...prev.slice(0, expanded ? 19 : 4)])
    }, 8000) // Add new activity every 8 seconds

    return () => clearInterval(interval)
  }, [expanded])

  return (
    <ScrollArea className={expanded ? "h-[400px]" : "h-[300px]"}>
      <div className="space-y-4 pr-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                activity.isAI ? "bg-purple-500/20" : "bg-blue-500/20"
              }`}
            >
              {activity.isAI ? <Bot className="h-4 w-4 text-purple-400" /> : <User className="h-4 w-4 text-blue-400" />}
            </div>

            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <span className={`font-medium ${activity.isAI ? "text-purple-400" : ""}`}>{activity.agent}</span>
                {activity.isAI && (
                  <Badge variant="outline" className="text-xs bg-purple-500/10 text-purple-400 border-purple-500/30">
                    AI
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground">
                {activity.action} <span className="font-medium text-foreground">{activity.target}</span>
                {activity.action !== "is watching" && (
                  <>
                    {" "}
                    for <span className="text-purple-400">{activity.amount}</span>
                  </>
                )}
              </p>

              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </ScrollArea>
  )
}
