"use client"

import { Heart, MapPin, Sparkles, Gem } from "lucide-react"

const storyEvents = [
  {
    date: "Octobre 2019",
    title: "Première Rencontre",
    description: "Nous nous sommes rencontrés sur Final Fantasy XIV au sein d'une guilde Québécoise.",
    icon: Heart,
  },
  {
    date: "Novembre 2019",
    title: "Premier Rendez-vous",
    description: "Après plusieurs sessions de chats vocaux, Julien visite Tiffany à son lieu de travail et le sourire de celle-ci le conquit. S'en suit plusieurs sorties au restaurant pour discuter de tout et de rien.",
    icon: Sparkles,
  },
  {
    date: "Février 2020",
    title: "Emménagement Ensemble",
    description: "La relation est officialisée et Tiffany déménage avec Julien peu avant le confinement.",
    icon: MapPin,
  },
  {
    date: "Août 2025",
    title: "La Demande",
    description: "Julien amène Tiffany au Festifleurs à Coteau-du-Lac pour cueillir un bouquet ensemble. Dans un décor enchanteur entouré de magnifiques fleurs, Julien s'est mis à genoux pour la grande demande. Tiffany a dit oui recevant des applaudissements des passants enjoués.",
    icon: Gem,
  },
]

export function OurStory() {
  return (
    <section className="py-24 px-4 bg-secondary/30" id="story">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-20">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Comment tout a commencé
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            Notre Histoire
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-primary/30" />
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <div className="h-px w-12 bg-primary/30" />
          </div>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/20 -translate-x-1/2 hidden md:block" />
          
          <div className="space-y-12 md:space-y-24">
            {storyEvents.map((event, index) => {
              const Icon = event.icon
              const isEven = index % 2 === 0

              return (
                <div
                  key={event.date}
                  className={`relative flex flex-col md:flex-row items-center gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${isEven ? "md:text-right" : "md:text-left"}`}>
                    <div
                      className={`bg-card p-6 md:p-8 rounded-lg shadow-sm border border-border/50 ${
                        isEven ? "md:mr-8" : "md:ml-8"
                      }`}
                    >
                      <span className="text-sm tracking-widest uppercase text-primary font-medium">
                        {event.date}
                      </span>
                      <h3 className="font-serif text-2xl md:text-3xl font-light mt-2 mb-4">
                        {event.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {event.description}
                      </p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 border-2 border-primary/30 order-first md:order-none">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Empty space for alignment */}
                  <div className="flex-1 hidden md:block" />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
