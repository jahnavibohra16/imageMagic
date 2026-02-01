import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Image as ImageIcon, Zap, History } from "lucide-react"
import Link from "next/link"

export default async function DashboardPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect("/login")
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back, {user.user_metadata.first_name || "User"}! Here's what you can do.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/dashboard/upload">
            <Card className="hover:border-indigo-500/50 transition-colors cursor-pointer group h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Transform Image
                </CardTitle>
                <Zap className="h-4 w-4 text-muted-foreground group-hover:text-indigo-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">New Project</div>
                <p className="text-xs text-muted-foreground mt-2">
                Resize, crop or remove background from a new image.
                </p>
                 <div className="mt-4 flex items-center text-sm text-indigo-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    Start Now <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </CardContent>
            </Card>
        </Link>

        <Link href="/dashboard/history">
            <Card className="hover:border-pink-500/50 transition-colors cursor-pointer group h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                Recent Transformations
                </CardTitle>
                <History className="h-4 w-4 text-muted-foreground group-hover:text-pink-500" />
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold">View History</div>
                <p className="text-xs text-muted-foreground mt-2">
                Access your previously transformed images.
                </p>
                 <div className="mt-4 flex items-center text-sm text-pink-500 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                </div>
            </CardContent>
            </Card>
        </Link>
      </div>
    </div>
  )
}
