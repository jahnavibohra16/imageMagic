"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { createClient } from "@/utils/supabase/client"
import { useEffect, useState } from "react"
import { LayoutDashboard } from "lucide-react"

export function AuthButtons() {
    const [user, setUser] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const supabase = createClient()

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            setLoading(false)
        }
        checkUser()
    }, [supabase])

    if (loading) return null

    if (user) {
        return (
            <Link href="/dashboard">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0 gap-2">
                    <LayoutDashboard className="w-4 h-4" />
                    Dashboard
                </Button>
            </Link>
        )
    }

    return (
        <div className="flex gap-2">
            <Link href="/login">
                <Button variant="ghost">Log In</Button>
            </Link>
            <Link href="/signup">
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white border-0">
                    Get Started
                </Button>
            </Link>
        </div>
    )
}
