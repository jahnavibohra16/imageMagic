import { createClient } from "@/utils/supabase/server"
import { formatDistanceToNow } from "date-fns"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Download, ExternalLink, Calendar, Layers } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export default async function HistoryPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null

  const { data: images, error } = await supabase
    .from('images')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    return <div>Error loading history</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">History</h2>
        <p className="text-muted-foreground">View your recent transformations.</p>
      </div>

      {!images || images.length === 0 ? (
          <div className="text-center py-20 bg-muted/20 rounded-xl border border-dashed text-muted-foreground">
              <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p className="text-lg font-medium">No transformations yet</p>
              <p className="mb-6">Upload an image to get started.</p>
              <Link href="/dashboard/upload">
                  <Button variant="outline">Create New</Button>
              </Link>
          </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {images.map((image) => (
                <Card key={image.id} className="overflow-hidden group">
                    <div className="relative aspect-square bg-muted/50 border-b">
                        <Image 
                            src={image.transformed_image_url || image.original_image_url} 
                            alt="Transformation" 
                            fill 
                            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
                            unoptimized
                        />
                    </div>
                    <CardHeader className="p-4 space-y-2">
                        <div className="flex items-center justify-between">
                            <Badge variant="outline" className="capitalize">
                                {image.transformation_type || "Original"}
                            </Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {formatDistanceToNow(new Date(image.created_at), { addSuffix: true })}
                            </span>
                        </div>
                        {image.platform && image.platform !== 'none' && (
                             <div className="text-xs font-medium text-muted-foreground capitalize">
                                Platform: {image.platform.replace('-', ' ')}
                            </div>
                        )}
                    </CardHeader>
                    <CardFooter className="p-4 pt-0 gap-2">
                        <Button variant="secondary" size="sm" className="w-full" asChild>
                            <a href={image.transformed_image_url || image.original_image_url} download target="_blank">
                                <Download className="w-4 h-4 mr-2" />
                                Download
                            </a>
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
      )}
    </div>
  )
}
