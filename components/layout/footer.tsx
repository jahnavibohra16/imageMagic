export function Footer() {
  return (
    <footer className="bg-muted/50 border-t py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
             <span className="font-bold text-xl tracking-tight">ImageMagic</span>
             <p className="mt-4 text-muted-foreground max-w-sm">
               The ultimate tool for social media image transformation. Crop, resize, and optimize for Instagram, Twitter, and LinkedIn in seconds.
             </p>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Features</li>
              <li>Pricing</li>
              <li>API</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>Cookie Policy</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} ImageMagic. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
