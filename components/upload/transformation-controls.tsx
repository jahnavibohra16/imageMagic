"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { Wand2, Crop as CropIcon, Layers as LayersIcon, Share2 } from "lucide-react"

interface TransformationControlsProps {
    platform: string
    setPlatform: (value: string) => void
    transformation: string
    setTransformation: (value: string) => void
    isTransforming: boolean
}

export function TransformationControls({
    platform,
    setPlatform,
    transformation,
    setTransformation,
    isTransforming
}: TransformationControlsProps) {

    return (
        <div className="space-y-6">
            <div className="space-y-2">
                <Label>Processing Mode</Label>
                <Tabs value={transformation} onValueChange={setTransformation} className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="resize" disabled={isTransforming} className="gap-2">
                            <CropIcon className="w-4 h-4" />
                            Resize
                        </TabsTrigger>
                        <TabsTrigger value="remove-bg" disabled={isTransforming} className="gap-2">
                            <LayersIcon className="w-4 h-4" />
                            Remove BG
                        </TabsTrigger>
                        <TabsTrigger value="optimize" disabled={isTransforming} className="gap-2">
                            <Wand2 className="w-4 h-4" />
                            Optimize
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            {transformation === 'resize' && (
                <div className="space-y-2">
                    <Label>Target Platform</Label>
                    <Select value={platform} onValueChange={setPlatform} disabled={isTransforming}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select platform" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="instagram-square">Instagram Square (1:1)</SelectItem>
                            <SelectItem value="instagram-portrait">Instagram Portrait (4:5)</SelectItem>
                            <SelectItem value="instagram-story">Instagram Story (9:16)</SelectItem>
                            <SelectItem value="twitter-post">Twitter Post (16:9)</SelectItem>
                            <SelectItem value="twitter-header">Twitter Header (3:1)</SelectItem>
                            <SelectItem value="linkedin-post">LinkedIn Post (1.91:1)</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            )}
        </div>
    )
}
