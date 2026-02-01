"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UploadZone } from "@/components/upload/upload-zone"
import { TransformationControls } from "@/components/upload/transformation-controls"
import { processImage } from "@/app/dashboard/upload/actions"
import { toast } from "sonner"
import { Download, Loader2, Sparkles, RefreshCw } from "lucide-react"
import Image from "next/image"

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [platform, setPlatform] = useState("instagram-square")
  const [transformation, setTransformation] = useState("resize")
  const [isProcessing, setIsProcessing] = useState(false)
  const [resultUrl, setResultUrl] = useState<string | null>(null)

  const handleProcess = async () => {
    if (!file) return
    setIsProcessing(true)
    
    try {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('platform', platform)
        formData.append('transformation', transformation)

        const result = await processImage(formData)

        if (result.error) {
            toast.error(result.error)
        } else if (result.url) {
            setResultUrl(result.url)
            toast.success("Image processed successfully!")
        }
    } catch (error) {
        toast.error("Something went wrong")
    } finally {
        setIsProcessing(false)
    }
  }

  const handleDownload = async () => {
      if (!resultUrl) return;
      try {
          const response = await fetch(resultUrl);
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `imagemagic-${transformation}-${Date.now()}.png`; // Simple download filename
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
      } catch (e) {
          window.open(resultUrl, '_blank');
      }
  }

  return (
    <div className="flex flex-col gap-8 h-full">
        <div>
            <h2 className="text-3xl font-bold tracking-tight">Transform Image</h2>
            <p className="text-muted-foreground">Upload and enhance your social media content.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
                 {/* Upload or Result Area */}
                 <div className="relative rounded-xl overflow-hidden border bg-background/50 min-h-[400px] flex items-center justify-center">
                    {resultUrl ? (
                         <div className="relative w-full h-[500px] bg-[url('/grid.svg')]">
                             <Image 
                                src={resultUrl} 
                                alt="Result" 
                                fill 
                                className="object-contain" // Use contain to show whole image
                                unoptimized
                             />
                         </div>
                    ) : (
                        <div className="p-6 w-full">
                            <UploadZone value={file} onChange={setFile} disabled={isProcessing} />
                        </div>
                    )}
                 </div>
                 
                 {resultUrl && (
                     <div className="flex justify-end gap-4">
                         <Button variant="outline" onClick={() => setResultUrl(null)}>
                             <RefreshCw className="mr-2 w-4 h-4" />
                             Process Another
                         </Button>
                         <Button onClick={handleDownload} className="bg-green-600 hover:bg-green-700">
                             <Download className="mr-2 w-4 h-4" />
                             Download
                         </Button>
                     </div>
                 )}
            </div>

            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Controls</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <TransformationControls 
                            platform={platform}
                            setPlatform={setPlatform}
                            transformation={transformation}
                            setTransformation={setTransformation}
                            isTransforming={isProcessing || !!resultUrl}
                        />

                        {!resultUrl && (
                            <Button 
                                size="lg" 
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600"
                                disabled={!file || isProcessing}
                                onClick={handleProcess}
                            >
                                {isProcessing ? (
                                    <>
                                        <Loader2 className="mr-2 w-4 h-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="mr-2 w-4 h-4" />
                                        Magic Transform
                                    </>
                                )}
                            </Button>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}
