"use client"

import { CountdownTimer } from "./countdown-timer"
import { Heart } from "lucide-react"

export function HeroSection() {
  // Set wedding date to May 29, 2027
  const weddingDate = new Date("2027-05-29T16:00:00")

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-20">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 border border-primary/10 rounded-full" />
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-primary/10 rounded-full" />
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-primary/10 rounded-full" />
      </div>

      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Pre-heading */}
        <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-6">
          Nous allons nous marier
        </p>

        {/* Names */}
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-light tracking-wide mb-4">
          <span className="block md:inline">Julien</span>
          <span className="inline-flex items-center justify-center mx-4">
            <Heart className="w-6 h-6 md:w-8 md:h-8 text-primary fill-primary/20" />
          </span>
          <span className="block md:inline">Tiffany</span>
        </h1>

        {/* Date and location */}
        <div className="mt-8 mb-16 space-y-2">
          <p className="text-lg md:text-xl font-light tracking-wide text-foreground/80">
            29 Mai 2027
          </p>
          <p className="text-sm md:text-base text-muted-foreground tracking-wide">
            La Distinction, Joliette, Québec
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-12">
          <p className="text-sm tracking-[0.2em] uppercase text-muted-foreground mb-8">
            Compte à rebours vers notre jour spécial
          </p>
          <CountdownTimer targetDate={weddingDate} />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-primary/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  )
}
