"use server"

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
  const scriptUrl = process.env.GOOGLE_SHEETS_SCRIPT_URL

  if (!scriptUrl) {
    console.error("GOOGLE_SHEETS_SCRIPT_URL is not configured")
    return { success: false, error: "Configuration manquante. Veuillez contacter les mariés." }
  }

  try {
    // Send each guest as a separate row to Google Sheets
    const timestamp = new Date().toISOString()
    const submissionId = crypto.randomUUID()

    for (const guest of data.guests) {
      const rowData = {
        submissionId,
        timestamp,
        totalGuests: data.totalGuests,
        fullName: guest.fullName,
        email: guest.email,
        mealChoice: guest.mealChoice === "osso_bucco" ? "Osso Bucco" : "Gnocchis au Pesto",
        dietaryRestrictions: guest.dietaryRestrictions || "",
      }

      const response = await fetch(scriptUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rowData),
      })

      if (!response.ok) {
        throw new Error(`Failed to submit to Google Sheets: ${response.status}`)
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting to Google Sheets:", error)
    return { success: false, error: "Erreur lors de la soumission. Veuillez réessayer." }
  }
}
