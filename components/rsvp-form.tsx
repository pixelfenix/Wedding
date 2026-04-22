"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Heart, Check, Send, Minus, Plus, User } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

interface GuestInfo {
  fullName: string
  email: string
  mealChoice: string
  dietaryRestrictions: string
}

const createEmptyGuest = (): GuestInfo => ({
  fullName: "",
  email: "",
  mealChoice: "",
  dietaryRestrictions: "",
})

export function RSVPForm() {
  const [guestCount, setGuestCount] = useState(1)
  const [guests, setGuests] = useState<GuestInfo[]>([createEmptyGuest()])
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const updateGuestCount = (newCount: number) => {
    if (newCount < 1) newCount = 1
    if (newCount > 10) newCount = 10
    
    setGuestCount(newCount)
    
    if (newCount > guests.length) {
      const newGuests = [...guests]
      for (let i = guests.length; i < newCount; i++) {
        newGuests.push(createEmptyGuest())
      }
      setGuests(newGuests)
    } else if (newCount < guests.length) {
      setGuests(guests.slice(0, newCount))
    }
  }

  const updateGuest = (index: number, field: keyof GuestInfo, value: string) => {
    const newGuests = [...guests]
    newGuests[index] = { ...newGuests[index], [field]: value }
    setGuests(newGuests)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    // Validate all guests have required fields
    for (let i = 0; i < guests.length; i++) {
      if (!guests[i].fullName || !guests[i].email || !guests[i].mealChoice) {
        setError(`Veuillez remplir tous les champs obligatoires pour l'invité ${i + 1}`)
        setIsSubmitting(false)
        return
      }
    }

    try {
      const supabase = createClient()

      // Create submission record
      const { data: submission, error: submissionError } = await supabase
        .from("rsvp_submissions")
        .insert({ total_guests: guestCount })
        .select("id")
        .single()

      if (submissionError) throw submissionError

      // Create guest records
      const guestRecords = guests.map(guest => ({
        submission_id: submission.id,
        full_name: guest.fullName,
        email: guest.email,
        meal_choice: guest.mealChoice,
        dietary_restrictions: guest.dietaryRestrictions || null,
      }))

      const { error: guestsError } = await supabase
        .from("rsvp_guests")
        .insert(guestRecords)

      if (guestsError) throw guestsError

      setSubmitted(true)
    } catch (err) {
      console.error("Error submitting RSVP:", err)
      setError("Une erreur est survenue. Veuillez réessayer.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitted) {
    return (
      <section className="py-24 px-4" id="rsvp">
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 mb-8">
            <Check className="w-10 h-10 text-primary" />
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-light mb-4">
            Merci !
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Nous avons bien reçu votre réponse et avons hâte de célébrer avec vous.
            À bientôt le 29 mai 2027 !
          </p>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 px-4" id="rsvp">
      <div className="max-w-3xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Nous espérons vous voir
          </p>
          <h2 className="font-serif text-4xl md:text-5xl font-light text-foreground">
            RSVP
          </h2>
          <div className="mt-6 flex items-center justify-center gap-4">
            <div className="h-px w-12 bg-primary/30" />
            <Heart className="w-4 h-4 text-primary fill-primary/20" />
            <div className="h-px w-12 bg-primary/30" />
          </div>
          <p className="mt-8 text-muted-foreground">
            Veuillez répondre avant le 29 mars 2027
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-10">
          {error && (
            <div className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
              {error}
            </div>
          )}

          {/* Guest Count Selector */}
          <div className="bg-card border border-border/50 rounded-lg p-6">
            <Label className="text-base tracking-wide mb-4 block">
              Nombre d&apos;invités
            </Label>
            <div className="flex items-center gap-6">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => updateGuestCount(guestCount - 1)}
                disabled={guestCount <= 1}
                className="h-12 w-12"
              >
                <Minus className="w-5 h-5" />
              </Button>
              <span className="text-4xl font-serif w-16 text-center">{guestCount}</span>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => updateGuestCount(guestCount + 1)}
                disabled={guestCount >= 10}
                className="h-12 w-12"
              >
                <Plus className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Guest Forms */}
          {guests.map((guest, index) => (
            <div key={index} className="bg-card border border-border/50 rounded-lg p-6 md:p-8 space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-border/50">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                  <User className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-serif text-xl font-light">
                  Invité {index + 1}
                </h3>
              </div>

              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor={`name-${index}`} className="text-sm tracking-wide">
                  Nom Complet *
                </Label>
                <Input
                  id={`name-${index}`}
                  type="text"
                  required
                  placeholder="Prénom et nom"
                  value={guest.fullName}
                  onChange={(e) => updateGuest(index, "fullName", e.target.value)}
                  className="bg-background border-border/50 focus:border-primary/50"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor={`email-${index}`} className="text-sm tracking-wide">
                  Courriel *
                </Label>
                <Input
                  id={`email-${index}`}
                  type="email"
                  required
                  placeholder="votre@courriel.com"
                  value={guest.email}
                  onChange={(e) => updateGuest(index, "email", e.target.value)}
                  className="bg-background border-border/50 focus:border-primary/50"
                />
              </div>

              {/* Meal Choice */}
              <div className="space-y-4">
                <Label className="text-sm tracking-wide">
                  Choix de Repas *
                </Label>
                <RadioGroup
                  value={guest.mealChoice}
                  onValueChange={(value) => updateGuest(index, "mealChoice", value)}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <div className="flex items-center space-x-3 bg-background border border-border/50 rounded-lg p-4 cursor-pointer hover:border-primary/30 transition-colors flex-1">
                    <RadioGroupItem value="osso_bucco" id={`osso-${index}`} />
                    <Label htmlFor={`osso-${index}`} className="cursor-pointer font-normal">
                      Osso Bucco
                    </Label>
                  </div>
                  <div className="flex items-center space-x-3 bg-background border border-border/50 rounded-lg p-4 cursor-pointer hover:border-primary/30 transition-colors flex-1">
                    <RadioGroupItem value="gnocchis_pesto" id={`gnocchis-${index}`} />
                    <Label htmlFor={`gnocchis-${index}`} className="cursor-pointer font-normal">
                      Gnocchis au Pesto
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Dietary Restrictions */}
              <div className="space-y-2">
                <Label htmlFor={`restrictions-${index}`} className="text-sm tracking-wide">
                  Restrictions Alimentaires
                </Label>
                <Textarea
                  id={`restrictions-${index}`}
                  placeholder="Veuillez indiquer vos allergies ou restrictions alimentaires..."
                  value={guest.dietaryRestrictions}
                  onChange={(e) => updateGuest(index, "dietaryRestrictions", e.target.value)}
                  className="bg-background border-border/50 focus:border-primary/50 min-h-[100px] resize-none"
                />
              </div>
            </div>
          ))}

          {/* Submit button */}
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-14 text-base tracking-wide"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                Envoi en cours...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Send className="w-4 h-4" />
                Envoyer ma Réponse
              </span>
            )}
          </Button>
        </form>
      </div>
    </section>
  )
}
