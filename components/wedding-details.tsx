"use client"

import { MapPin, Clock, Shirt, Heart } from "lucide-react"

const details = [
  {
    icon: Clock,
    title: "Programme",
    items: [
      "16h00 - Cérémonie",
      "17h00 - Cocktail",
      "18h30 - Réception & Dîner",
      "21h00 - Soirée Dansante",
    ],
  },
  {
    icon: MapPin,
    title: "Lieu",
    items: [
      "La Distinction",
      "1505 Bd Base-de-Roc",
      "Joliette, QC J6E 0L1",
    ],
  },
  {
    icon: Shirt,
    title: "Tenue",
    items: [
      "Tenue de soirée",
      "Vert sauge encouragé",
      "mais non obligatoire",
    ],
  },
]

export function WeddingDetails() {
  return (
    <section className="py-24 px-4" id="details">
      <div className="max-w-5xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Tout ce que vous devez savoir
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Informations Pratiques
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-primary/30" />
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <div className="h-px w-12 bg-primary/30" />
          </div>
        </div>

        {/* Details grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {details.map((detail) => {
            const Icon = detail.icon
            return (
              <div
                key={detail.title}
                className="bg-card border border-border/50 rounded-lg p-8 text-center shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-serif text-2xl font-light mb-4">{detail.title}</h3>
                <div className="space-y-2">
                  {detail.items.map((item, index) => (
                    <p key={index} className="text-muted-foreground text-sm leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
