"use client"

import { motion } from "framer-motion"

const stack = [
  "Next.js 15",
  "TypeScript",
  "Tailwind CSS",
  "shadcn/ui",
  "Framer Motion",
  "Supabase",
  "Cloudinary"
]

export function TechStack() {
  return (
    <section className="py-12 border-t bg-muted/20">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm font-medium text-muted-foreground mb-8">
          POWERED BY MODERN TECH STACK
        </p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-12">
          {stack.map((item, index) => (
             <motion.div
                key={index}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-lg font-semibold text-foreground/80 hover:text-indigo-500 transition-colors cursor-default"
             >
               {item}
             </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
