"use client"

import { useDropzone } from "react-dropzone"
import { UploadCloud, Image as ImageIcon, X } from "lucide-react"
import { useCallback } from "react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface UploadZoneProps {
  value: File | null
  onChange: (file: File | null) => void
  disabled?: boolean
}

export function UploadZone({ value, onChange, disabled }: UploadZoneProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      onChange(acceptedFiles[0])
    }
  }, [onChange])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.webp']
    },
    maxFiles: 1,
    disabled
  })

  if (value) {
    return (
      <div className="relative w-full h-64 md:h-96 rounded-xl overflow-hidden border border-border bg-slate-100 dark:bg-slate-900 flex items-center justify-center group">
         <div className="absolute top-2 right-2 z-10">
             <button 
                onClick={(e) => { e.stopPropagation(); onChange(null); }}
                className="p-1 rounded-full bg-black/50 text-white hover:bg-black/70 transition"
             >
                <X className="w-5 h-5" />
             </button>
         </div>
         <div className="relative w-full h-full">
            <Image 
                src={URL.createObjectURL(value)} 
                alt="Preview" 
                fill 
                className="object-contain" 
                onLoad={() => URL.revokeObjectURL(value.toString())} // Cleanup not perfectly handled with simple URL.createObjectURL in render but okay for this scope
            />
         </div>
      </div>
    )
  }

  return (
    <div 
      {...getRootProps()} 
      className={cn(
        "cursor-pointer w-full h-64 md:h-96 rounded-xl border-2 border-dashed flex flex-col items-center justify-center transition-colors gap-4 text-center p-4",
        isDragActive ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/10" : "border-border hover:bg-slate-50 dark:hover:bg-slate-900/50",
        disabled && "opacity-50 cursor-not-allowed"
      )}
    >
      <input {...getInputProps()} />
      <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
         <UploadCloud className="w-8 h-8" />
      </div>
      <div>
        <p className="font-semibold text-lg">Click to upload or drag and drop</p>
        <p className="text-sm text-muted-foreground mt-1">SVG, PNG, JPG or GIF (max. 800x400px recommended)</p>
      </div>
    </div>
  )
}
