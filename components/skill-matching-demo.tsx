"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, Clock, X } from "lucide-react"

interface SkillMatchingDemoProps {
  onConnect?: () => void
}

export default function SkillMatchingDemo({ onConnect }: SkillMatchingDemoProps) {
  const [step, setStep] = useState(0)
  const [searching, setSearching] = useState(false)
  const [progress, setProgress] = useState(0)
  const [matches, setMatches] = useState<any[]>([])

  const skills = [
    { name: "Python Basics", category: "Programming" },
    { name: "Graphic Design", category: "Design" },
    { name: "Public Speaking", category: "Communication" },
    { name: "Guitar", category: "Music" },
    { name: "French Language", category: "Languages" },
    { name: "Yoga", category: "Fitness" },
    { name: "Excel Formulas", category: "Software" },
    { name: "Photography", category: "Arts" },
  ]

  const potentialMatches = [
    {
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      offering: "Python Basics",
      seeking: "Graphic Design",
      rating: 4.9,
      sessions: 12,
    },
    {
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      offering: "Graphic Design",
      seeking: "Public Speaking",
      rating: 4.7,
      sessions: 8,
    },
    {
      name: "Taylor Wong",
      avatar: "/placeholder.svg?height=40&width=40",
      offering: "Guitar",
      seeking: "Python Basics",
      rating: 4.8,
      sessions: 15,
    },
  ]

  useEffect(() => {
    if (searching) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval)
            setSearching(false)
            setMatches(potentialMatches)
            return 100
          }
          return prev + 5
        })
      }, 100)
      return () => clearInterval(interval)
    }
  }, [searching])

  const resetDemo = () => {
    setStep(0)
    setSearching(false)
    setProgress(0)
    setMatches([])
  }

  const startSearch = () => {
    setStep(1)
    setSearching(true)
    setProgress(0)
  }

  const handleConnect = () => {
    if (onConnect) {
      onConnect()
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden">
      <CardHeader className="bg-primary/5 border-b">
        <CardTitle>Skill Matching</CardTitle>
        <CardDescription>Find your perfect skill exchange partner</CardDescription>
      </CardHeader>

      {step === 0 && (
        <>
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">I can teach:</label>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(0, 4).map((skill) => (
                    <Badge key={skill.name} variant="outline" className="cursor-pointer hover:bg-primary/10">
                      {skill.name}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="cursor-pointer bg-primary/10 hover:bg-primary/20">
                    + Add Skill
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">I want to learn:</label>
                <div className="flex flex-wrap gap-2">
                  {skills.slice(4, 6).map((skill) => (
                    <Badge key={skill.name} variant="outline" className="cursor-pointer hover:bg-primary/10">
                      {skill.name}
                    </Badge>
                  ))}
                  <Badge variant="outline" className="cursor-pointer bg-primary/10 hover:bg-primary/20">
                    + Add Skill
                  </Badge>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Availability:</label>
                <div className="grid grid-cols-3 gap-2">
                  {["Today", "Tomorrow", "This Week"].map((day) => (
                    <Badge
                      key={day}
                      variant={day === "Today" ? "default" : "outline"}
                      className="cursor-pointer justify-center"
                    >
                      {day}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Session type:</label>
                <div className="grid grid-cols-2 gap-2">
                  {["Virtual", "In-person"].map((type) => (
                    <Badge
                      key={type}
                      variant={type === "Virtual" ? "default" : "outline"}
                      className="cursor-pointer justify-center"
                    >
                      {type}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 flex justify-between">
            <Button variant="outline" size="sm">
              Random Match
            </Button>
            <Button size="sm" onClick={startSearch}>
              Find Matches
            </Button>
          </CardFooter>
        </>
      )}

      {step === 1 && searching && (
        <CardContent className="py-12">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="relative h-24 w-24 rounded-full bg-primary/10 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
              <div
                className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent"
                style={{
                  transform: `rotate(${progress * 3.6}deg)`,
                  transition: "transform 0.1s linear",
                }}
              />
              <Clock className="h-10 w-10 text-primary animate-pulse" />
            </div>
            <div className="text-center">
              <h3 className="font-medium">Finding matches...</h3>
              <p className="text-sm text-muted-foreground">Searching for skill exchange partners</p>
            </div>
          </div>
        </CardContent>
      )}

      {step === 1 && !searching && (
        <>
          <CardContent className="pt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-medium">Found {matches.length} matches!</h3>
                <Badge variant="outline" className="cursor-pointer">
                  Filter
                </Badge>
              </div>

              {matches.map((match, index) => (
                <div key={index} className="flex gap-4 pb-4 border-b last:border-0">
                  <Avatar>
                    <AvatarImage src={match.avatar} alt={match.name} />
                    <AvatarFallback>{match.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{match.name}</h4>
                      <div className="flex items-center text-sm">
                        <span className="text-yellow-500">★</span> {match.rating}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">{match.sessions} sessions completed</div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                        Offers: {match.offering}
                      </Badge>
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                        Seeks: {match.seeking}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t bg-muted/20 flex justify-between">
            <Button variant="outline" size="sm" onClick={resetDemo}>
              <X className="mr-2 h-4 w-4" /> Reset
            </Button>
            <Button size="sm" onClick={handleConnect}>
              <Check className="mr-2 h-4 w-4" /> Connect
            </Button>
          </CardFooter>
        </>
      )}
    </Card>
  )
}

