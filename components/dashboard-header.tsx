import type { HTMLAttributes } from "react"
import { cn } from "@/lib/utils"
import { WalletConnect } from "@/components/wallet-connect"

interface DashboardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  title: string
  description?: string
  showWallet?: boolean
}

export function DashboardHeader({ title, description, showWallet = false, className, ...props }: DashboardHeaderProps) {
  return (
    <div
      className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6", className)}
      {...props}
    >
      <div>
        <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
      </div>

      {showWallet && <WalletConnect showAddress />}
    </div>
  )
}
