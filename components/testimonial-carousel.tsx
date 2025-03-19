"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialCarousel() {
  const [activeIndex, setActiveIndex] = useState(0)

  const testimonials = [
    {
      quote:
        "SkillHive completely changed how I learn new skills. In just 30 minutes, I picked up the basics of Python that would have taken me hours with online courses.",
      author: "Sarah Johnson",
      role: "Marketing Manager",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "The 'give a skill, take a skill' model creates such a positive community. I've taught guitar basics to 5 people and learned everything from Excel formulas to basic French.",
      author: "Michael Chen",
      role: "Software Engineer",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      quote:
        "As a busy parent, I never thought I'd have time to learn new skills. The 30-minute format is perfect for my schedule, and I've connected with amazing people.",
      author: "Priya Patel",
      role: "Healthcare Professional",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="relative mx-auto max-w-4xl px-4">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${activeIndex * 100}%)` }}
        >
          {testimonials.map((testimonial, index) => (
            <div key={index} className="w-full flex-shrink-0 px-4">
              <Card className="border-none shadow-lg">
                <CardContent className="pt-6">
                  <div className="relative mb-6 flex justify-center">
                    <div className="absolute -top-10 text-primary/10">
                      <Quote className="h-20 w-20" />
                    </div>
                    <Avatar className="h-20 w-20 border-4 border-background">
                      <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                      <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                  </div>
                  <blockquote className="text-center">
                    <p className="mb-4 text-lg italic text-muted-foreground">"{testimonial.quote}"</p>
                    <footer>
                      <div className="font-medium">{testimonial.author}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </footer>
                  </blockquote>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-center gap-2">
        {testimonials.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-2 w-2 rounded-full transition-colors ${
              index === activeIndex ? "bg-primary" : "bg-primary/20"
            }`}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-lg md:-left-8"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous testimonial</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-lg md:-right-8"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next testimonial</span>
      </Button>
    </div>
  )
}

