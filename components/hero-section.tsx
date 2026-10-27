"use client"

import { CountdownTimer } from "./countdown-timer"
import { Flower2, Heart } from "lucide-react"

export function HeroSection() {
  // Set wedding date to May 29, 2027
  const weddingDate = new Date("2027-05-29T16:00:00")

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-12 md:py-16">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 border border-primary/10 rounded-full" />
        <div className="absolute top-40 right-20 w-24 h-24 border border-primary/10 rounded-full" />
        <div className="absolute bottom-40 left-20 w-16 h-16 border border-primary/10 rounded-full" />
        <div className="absolute bottom-20 right-10 w-40 h-40 border border-primary/10 rounded-full" />
        <div className="absolute -left-8 top-1/4 text-primary/10 rotate-[-18deg]" aria-hidden="true">
          <Flower2 className="h-36 w-36" strokeWidth={0.8} />
        </div>
        <div className="absolute -right-10 bottom-1/4 text-primary/10 rotate-[22deg]" aria-hidden="true">
          <Flower2 className="h-44 w-44" strokeWidth={0.8} />
        </div>
        <div className="absolute left-1/4 bottom-10 text-primary/5" aria-hidden="true">
          <Flower2 className="h-20 w-20" strokeWidth={0.8} />
        </div>
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
        <div className="mt-5 mb-10 space-y-2">
          <p className="font-serif text-2xl md:text-3xl font-medium tracking-[0.08em] text-primary">
            29 Mai 2027
          </p>
          <p className="text-sm md:text-base font-medium tracking-[0.18em] uppercase text-foreground/75">
            La Distinction · Joliette, Québec
          </p>
        </div>

        {/* Countdown */}
        <div className="mt-8">
          <p className="text-xs md:text-sm tracking-[0.2em] uppercase text-muted-foreground mb-5">
            Compte à rebours vers notre jour spécial
          </p>
          <CountdownTimer targetDate={weddingDate} />
        </div>

      </div>

    </section>
  )
}
