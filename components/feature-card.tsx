import { Card, CardContent, CardHeader } from "@/components/ui/card"
import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-card/60 backdrop-blur-sm border-purple-500/20 overflow-hidden group relative">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/0 to-blue-500/0 opacity-0 group-hover:opacity-10 transition-opacity duration-300" />

      <CardHeader className="pb-2">
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-br from-purple-500/20 to-blue-500/20 p-3 rounded-lg text-purple-500">
            {icon}
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
