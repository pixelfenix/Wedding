import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { OurStory } from "@/components/our-story"
import { WeddingDetails } from "@/components/wedding-details"
import { RSVPForm } from "@/components/rsvp-form"
import { Footer } from "@/components/footer"

export default function WeddingPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <section className="border-y border-primary/10 bg-primary/[0.035] px-6 py-14 text-center md:py-16" aria-label="Message de bienvenue">
        <div className="mx-auto max-w-2xl">
          <div className="mb-5 flex items-center justify-center gap-3 text-primary/55" aria-hidden="true">
            <span className="h-px w-10 bg-current" />
            <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
            <span className="h-px w-10 bg-current" />
          </div>
          <p className="font-serif text-2xl leading-relaxed text-foreground md:text-3xl">
            Nous avons hâte de partager cette journée remplie d&apos;amour avec vous.
          </p>
          <p className="mt-4 text-xs font-medium uppercase tracking-[0.22em] text-primary/80">
            Célébrons ensemble
          </p>
        </div>
      </section>
      <div id="story">
        <OurStory />
      </div>
      <div className="flex items-center justify-center gap-3 py-8 text-primary/45" aria-hidden="true">
        <span className="h-px w-16 bg-current" />
        <span className="h-2 w-2 rounded-full border border-current" />
        <span className="h-px w-16 bg-current" />
      </div>
      <WeddingDetails />
      <div className="flex items-center justify-center gap-3 py-8 text-primary/45" aria-hidden="true">
        <span className="h-px w-16 bg-current" />
        <span className="h-2 w-2 rounded-full border border-current" />
        <span className="h-px w-16 bg-current" />
      </div>
      <RSVPForm />
      <Footer />
    </main>
  )
}
