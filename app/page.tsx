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
      <div id="story">
        <OurStory />
      </div>
      <WeddingDetails />
      <RSVPForm />
      <Footer />
    </main>
  )
}
