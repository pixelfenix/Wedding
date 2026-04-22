"use server"

import { createClient } from "@/lib/supabase/server"

export type GuestInfo = {
  fullName: string
  email: string
  mealChoice: "osso_bucco" | "gnocchis_pesto"
  dietaryRestrictions: string
}

export type RSVPSubmission = {
  totalGuests: number
  guests: GuestInfo[]
}

export async function submitRSVP(data: RSVPSubmission) {
  const supabase = await createClient()

  // Create the submission record
  const { data: submission, error: submissionError } = await supabase
    .from("rsvp_submissions")
    .insert({
      total_guests: data.totalGuests,
    })
    .select("id")
    .single()

  if (submissionError || !submission) {
    console.error("Error creating submission:", submissionError)
    return { success: false, error: "Erreur lors de la soumission. Veuillez réessayer." }
  }

  // Insert all guests
  const guestsToInsert = data.guests.map((guest) => ({
    submission_id: submission.id,
    full_name: guest.fullName,
    email: guest.email,
    meal_choice: guest.mealChoice,
    dietary_restrictions: guest.dietaryRestrictions || null,
  }))

  const { error: guestsError } = await supabase
    .from("rsvp_guests")
    .insert(guestsToInsert)

  if (guestsError) {
    console.error("Error inserting guests:", guestsError)
    return { success: false, error: "Erreur lors de l'enregistrement des invités. Veuillez réessayer." }
  }

  return { success: true }
}
