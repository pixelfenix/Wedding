"use server"

export type GuestInfo = {
  fullName: string
  email: string
  mealChoice: "osso_bucco" | "gnocchis_pesto"
  dietaryRestrictions: string
  otherComments: string
}

export type RSVPSubmission = {
  totalGuests: number
  guests: GuestInfo[]
}

export async function submitRSVP(data: RSVPSubmission) {
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL

  if (!scriptUrl) {
    console.error("GOOGLE_SHEETS_SCRIPT_URL is not configured")
    return { success: false, error: "Configuration manquante. Veuillez contacter les mariés." }
  }

  try {
    // Send all guests to Google Sheets
    const payload = {
      guests: data.guests.map(guest => ({
        fullName: guest.fullName,
        email: guest.email,
        mealChoice: guest.mealChoice,
        dietaryRestrictions: guest.dietaryRestrictions || "",
        otherComments: guest.otherComments || "",
      }))
    }

    console.log("[v0] Sending to Google Sheets:", JSON.stringify(payload))
    console.log("[v0] Script URL:", scriptUrl)

    const response = await fetch(scriptUrl, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    console.log("[v0] Response status:", response.status, response.type)

    // With no-cors mode, we can't read the response, but the request should go through
    return { success: true }
  } catch (error) {
    console.error("[v0] Error submitting to Google Sheets:", error)
    return { success: false, error: "Erreur lors de la soumission. Veuillez réessayer." }
  }
}
