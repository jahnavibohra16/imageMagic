"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { AuthButtons } from "@/components/layout/auth-buttons"
import { motion } from "framer-motion"
import { Zap } from "lucide-react"

export function Navbar() {
  const pathname = usePathname()
  const isAuthPage = pathname === "/login" || pathname === "/signup"
  const isDashboard = pathname.startsWith("/dashboard")

  if (isDashboard) return null

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
             <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight">ImageMagic</span>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          {!isAuthPage && <AuthButtons />}
        </div>
      </div>
    </motion.header>
  )
}
