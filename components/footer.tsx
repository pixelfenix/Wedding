"use client"

import { Heart } from "lucide-react"

export function Footer() {
  return (
    <footer className="py-12 px-4 border-t border-border/50">
      <div className="max-w-4xl mx-auto text-center">
        <p className="font-serif text-3xl mb-4">Julien & Tiffany</p>
        <p className="text-muted-foreground text-sm mb-4">29 Mai 2027</p>
        <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
          <span>Fait avec</span>
          <Heart className="w-3 h-3 text-primary fill-primary" />
          <span>pour notre jour spécial</span>
        </div>
      </div>
    </footer>
  )
}
