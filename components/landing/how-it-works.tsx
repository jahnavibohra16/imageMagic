"use client"

import { motion } from "framer-motion"
import { UserPlus, Upload, Settings, Download } from "lucide-react"

const steps = [
  {
    icon: <UserPlus className="w-8 h-8" />,
    title: "Create Account",
    description: "Sign up in seconds using your email to get started."
  },
  {
    icon: <Upload className="w-8 h-8" />,
    title: "Upload Image",
    description: "Drag & drop your image or select from your device."
  },
  {
    icon: <Settings className="w-8 h-8" />,
    title: "Choose Transform",
    description: "Select platform (IG, Twitter) and transformation type."
  },
  {
    icon: <Download className="w-8 h-8" />,
    title: "Download",
    description: "Get your optimized image ready for posting instantly."
  }
]

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground text-lg">
            Transforming your images is as easy as 1-2-3-4.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -z-10" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-24 h-24 rounded-full bg-background border-4 border-muted group-hover:border-indigo-500 transition-colors flex items-center justify-center mb-6 z-10 relative">
                 <div className="text-indigo-500 group-hover:scale-110 transition-transform duration-300">
                   {step.icon}
                 </div>
                 <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-sm border-2 border-background">
                   {index + 1}
                 </div>
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground text-sm">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
