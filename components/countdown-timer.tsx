"use client"

import { useEffect, useState } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: Date
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  if (!mounted) {
    return (
      <div className="flex justify-center gap-4 md:gap-8">
        {["Jours", "Heures", "Minutes", "Secondes"].map((label) => (
          <div key={label} className="text-center">
            <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-3 md:p-6 min-w-[70px] md:min-w-[100px] shadow-sm">
              <span className="text-3xl md:text-5xl font-serif font-light text-primary">--</span>
            </div>
            <span className="text-xs md:text-sm text-muted-foreground mt-2 block tracking-widest uppercase">
              {label}
            </span>
          </div>
        ))}
      </div>
    )
  }

  const timeUnits = [
    { label: "Jours", value: timeLeft.days },
    { label: "Heures", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Secondes", value: timeLeft.seconds },
  ]

  return (
    <div className="flex justify-center gap-4 md:gap-8">
      {timeUnits.map(({ label, value }) => (
        <div key={label} className="text-center">
          <div className="bg-card/80 backdrop-blur-sm border border-primary/20 rounded-lg p-3 md:p-6 min-w-[70px] md:min-w-[100px] shadow-sm">
            <span className="text-3xl md:text-5xl font-serif font-light text-primary">
              {value.toString().padStart(2, "0")}
            </span>
          </div>
          <span className="text-xs md:text-sm text-muted-foreground mt-2 block tracking-widest uppercase">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}
