"use client"

import { MapPin, Clock, Shirt, Heart } from "lucide-react"

const details = [
  {
    icon: Clock,
    title: "Programme",
    items: [
      "15h30 - Arrivée des invités",
      "16h00 - Début de cérémonie",
      "17h00 - Photos",
      "17h10 - Cocktail et canapés",
      "18h20 - Festin",
      "18h30 - Toasts et discours",
      "21h30 - Coupe du gâteau",
      "22h00 - Première danse",
      "22h30 - C'est la fête !",
      "3h00 - Fin de soirée",
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
    title: "Code vestimentaire",
    items: [
      "Tenue de soirée dans",
      "les tons pastels",
    ],
    pastelHearts: true,
  },
]

export function WeddingDetails() {
  return (
    <section className="border-t border-primary/10 bg-primary/[0.02] px-4 py-20 md:py-24" id="details">
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
                className="bg-card border border-primary/15 rounded-md p-7 text-center shadow-sm shadow-primary/5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-md hover:shadow-primary/10"
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
                  {detail.pastelHearts && (
                    <div className="mt-5 flex items-center justify-center gap-2" aria-label="Couleurs pastel suggérées">
                      {[
                        "text-[#d9c2f5]",
                        "text-[#f7b7bd]",
                        "text-[#9ed9f5]",
                        "text-[#b9e7a9]",
                      ].map((color) => (
                        <Heart
                          key={color}
                          aria-hidden="true"
                          className={`h-7 w-7 fill-current ${color}`}
                          strokeWidth={0}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
