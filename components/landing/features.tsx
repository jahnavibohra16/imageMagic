"use client"

import { motion } from "framer-motion"
import { Crop, Image as ImageIcon, Layers, Zap, Shield, Smartphone } from "lucide-react"

const features = [
  {
    icon: <Crop className="w-6 h-6 text-indigo-500" />,
    title: "Smart Resizing",
    description: "Automatically resize images for Instagram Stories, Twitter posts, and LinkedIn headers with one click."
  },
  {
    icon: <Layers className="w-6 h-6 text-purple-500" />,
    title: "Background Removal",
    description: "Remove backgrounds instantly using advanced AI technology powered by Cloudinary."
  },
  {
    icon: <Zap className="w-6 h-6 text-yellow-500" />,
    title: "Instant Optimization",
    description: "Compress images without losing quality for faster loading times and better SEO."
  },
  {
    icon: <ImageIcon className="w-6 h-6 text-pink-500" />,
    title: "Format Conversion",
    description: "Convert images between JPG, PNG, WEBP and more formats seamlessly."
  },
  {
    icon: <Shield className="w-6 h-6 text-green-500" />,
    title: "Secure Storage",
    description: "Your images are stored securely with enterprise-grade encryption and privacy controls."
  },
  {
    icon: <Smartphone className="w-6 h-6 text-blue-500" />,
    title: "Mobile First",
    description: "Fully responsive design allowing you to transform images on the go from any device."
  }
]

export function Features() {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground text-lg">
            Powerful tools to make your social media content stand out, packaged in a beautiful interface.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-6 rounded-2xl bg-card border border-border/50 hover:border-indigo-500/50 transition-colors shadow-sm"
            >
              <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4 border border-border">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
