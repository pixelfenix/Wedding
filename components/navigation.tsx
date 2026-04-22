"use client"

import { DarkModeToggle } from "./dark-mode-toggle"
import { Heart } from "lucide-react"

export function Navigation() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="flex items-center gap-2 font-serif text-xl tracking-wide hover:text-primary transition-colors"
        >
          J <Heart className="w-4 h-4 text-primary fill-primary/20" /> T
        </button>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={() => scrollToSection("story")}
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Notre Histoire
          </button>
          <button
            onClick={() => scrollToSection("details")}
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            Détails
          </button>
          <button
            onClick={() => scrollToSection("rsvp")}
            className="text-sm tracking-wide text-muted-foreground hover:text-foreground transition-colors"
          >
            RSVP
          </button>
        </div>

        {/* Dark mode toggle */}
        <DarkModeToggle />
      </nav>
    </header>
  )
}
