import { Sidebar, MobileSidebar } from "@/components/layout/sidebar"
import { ModeToggle } from "@/components/mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full relative">
      <div className="hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-[80] bg-gray-900">
        <Sidebar />
      </div>
      <main className="md:pl-72 h-full">
        <div className="flex items-center justify-between p-4 border-b md:hidden">
            <MobileSidebar />
            <div className="flex items-center gap-2 font-bold text-lg">
                ImageMagic
            </div>
            <ModeToggle />
        </div>
        <div className="hidden md:flex justify-end p-4 border-b">
             <ModeToggle />
        </div>
        <div className="p-8 h-[calc(100vh-80px)] overflow-y-auto">
            {children}
        </div>
      </main>
    </div>
  )
}
