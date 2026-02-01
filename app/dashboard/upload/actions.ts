"use server"

import { createClient } from "@/utils/supabase/server"
import { v2 as cloudinary } from "cloudinary"
import { revalidatePath } from "next/cache"

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error("Cloudinary config missing")
}

export async function processImage(data: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: 'Unauthorized' }
    }

    const file = data.get('file') as File
    const transformation = data.get('transformation') as string
    const platform = data.get('platform') as string

    if (!file) return { error: 'No file provided' }

    try {
        // Convert file to buffer
        const arrayBuffer = await file.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)
        const base64String = `data:${file.type};base64,${buffer.toString('base64')}`

        // Upload to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(base64String, {
            folder: `imagemagic/${user.id}`,
            public_id: `${Date.now()}_original`
        })

        let transformedUrl = uploadResult.secure_url
        let transformationOptions = ""

        // Apply transformations locally to generate URL (or using eager transforms if needed)
        // For simplicity, we construct the URL manipulation here as Cloudinary allows on-the-fly transformations
        // Note: This URL generation logic below is a simplification. 
        // In a real app, you might use cloudinary.url() function.
        
        if (transformation === 'remove-bg') {
             // For background removal, we might need to use the 'e_background_removal' effect or signed upload.
             // Using helper:
             transformedUrl = cloudinary.url(uploadResult.public_id, {
                 effect: "background_removal"
             })
        } else if (transformation === 'optimize') {
             transformedUrl = cloudinary.url(uploadResult.public_id, {
                 fetch_format: "auto",
                 quality: "auto"
             })
        } else if (transformation === 'resize') {
            const platformSpecs: Record<string, any> = {
                'instagram-square': { aspectRatio: "1:1", width: 1080, crop: "fill" },
                'instagram-portrait': { aspectRatio: "4:5", width: 1080, crop: "fill" },
                'instagram-story': { aspectRatio: "9:16", width: 1080, crop: "fill" },
                'twitter-post': { aspectRatio: "16:9", width: 1200, crop: "fill" },
                'twitter-header': { aspectRatio: "3:1", width: 1500, crop: "fill" },
                'linkedin-post': { aspectRatio: "1.91:1", width: 1200, crop: "fill" },
            }
            const specs = platformSpecs[platform]
            if (specs) {
                transformedUrl = cloudinary.url(uploadResult.public_id, {
                    ...specs
                })
            }
        }

        // Save to Database
        const { error: dbError } = await supabase.from('images').insert({
            user_id: user.id,
            original_image_url: uploadResult.secure_url,
            transformed_image_url: transformedUrl,
            transformation_type: transformation,
            platform: platform || 'none'
        })

        if (dbError) {
             console.error("DB Error:", dbError)
             return { error: `Database error: ${dbError.message}` }
        }

        revalidatePath('/dashboard/history')
        return { success: true, url: transformedUrl }

    } catch (error) {
        console.error("Processing Error:", error)
        return { error: error instanceof Error ? error.message : 'Failed to process image' }
    }
}
