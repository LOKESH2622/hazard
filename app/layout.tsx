import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MainSidebar } from "@/components/main-sidebar"
import { WalletProvider } from "@/components/wallet-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MonadAuction - Decentralized Auction Platform",
  description: "A decentralized auction platform built on the Monad blockchain",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <WalletProvider>
            <SidebarProvider>
              <div className="relative min-h-screen">
                <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />
                <div className="absolute inset-0 bg-gradient-to-br from-background/10 via-purple-500/5 to-blue-500/10 -z-10" />
                <MainSidebar />
                <div className="flex flex-col min-h-screen lg:pl-64">{children}</div>
                <Toaster />
              </div>
            </SidebarProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}


import './globals.css'