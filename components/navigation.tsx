"use client"

import { DarkModeToggle } from "./dark-mode-toggle"
import { Heart, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setMenuOpen(false)
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

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <DarkModeToggle />
          </div>
          <button
            type="button"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary md:hidden"
          >
            {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <div className="md:hidden">
            <DarkModeToggle />
          </div>
        </div>
      </nav>
      {menuOpen && (
        <div className="border-t border-border/50 bg-background/95 px-4 py-4 shadow-sm backdrop-blur-md md:hidden">
          <div className="mx-auto flex max-w-6xl flex-col gap-1">
            {[
              ["story", "Notre Histoire"],
              ["details", "Détails"],
              ["rsvp", "RSVP"],
            ].map(([id, label]) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className="rounded-md px-3 py-3 text-left text-sm tracking-wide text-muted-foreground transition-colors hover:bg-primary/5 hover:text-primary"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
