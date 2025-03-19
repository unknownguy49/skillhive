"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Clock, Globe, MessageSquare, Sparkles, Users } from "lucide-react"
import Link from "next/link"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import SkillMatchingDemo from "@/components/skill-matching-demo"
import FeatureCard from "@/components/feature-card"
import HowItWorks from "@/components/how-it-works"
import TestimonialCarousel from "@/components/testimonial-carousel"
import DashboardPreview from "@/components/dashboard-preview"
import AuthDialog from "@/components/auth/auth-dialog"
import ChatDialog from "@/components/chat/chat-dialog"
import RequestDialog from "@/components/skill-request/request-dialog"

export default function Home() {
  const [authDialogOpen, setAuthDialogOpen] = useState(false)
  const [authDialogTab, setAuthDialogTab] = useState<"login" | "signup">("login")
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [chatDialogOpen, setChatDialogOpen] = useState(false)
  const [requestDialogOpen, setRequestDialogOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<any>(null)

  // Mock data for demo purposes
  const mockMatch = {
    id: "match123",
    currentUser: {
      id: "user1",
      name: "You",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    otherUser: {
      id: "user2",
      name: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      offering: "Python Basics",
      seeking: "Graphic Design",
    },
  }

  const mockRequest = {
    id: "request123",
    user: {
      id: "user3",
      name: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    offering: "Graphic Design",
    seeking: "Public Speaking",
    rating: 4.7,
    sessions: 8,
  }

  // Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleLogin = () => {
    setAuthDialogTab("login")
    setAuthDialogOpen(true)
  }

  const handleSignUp = () => {
    setAuthDialogTab("signup")
    setAuthDialogOpen(true)
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const handleOpenChat = () => {
    if (!user) {
      handleLogin()
      return
    }
    setSelectedMatch(mockMatch)
    setChatDialogOpen(true)
  }

  const handleOpenRequest = () => {
    if (!user) {
      handleLogin()
      return
    }
    setRequestDialogOpen(true)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">SkillHive</span>
          </div>
          <nav className="hidden md:flex items-center gap-10">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              Features
            </Link>
            <Link href="#how-it-works" className="text-sm font-medium hover:text-primary">
              How It Works
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            {!loading &&
              (user ? (
                <div className="flex items-center gap-4">
                  <Button variant="ghost" size="sm" onClick={handleOpenChat}>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Messages
                  </Button>
                  <Button variant="outline" size="sm" onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="outline" size="sm" onClick={handleLogin}>
                    Log In
                  </Button>
                  <Button size="sm" onClick={handleSignUp}>
                    Sign Up
                  </Button>
                </>
              ))}
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="container flex flex-col items-center text-center">
            <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-6">
              Introducing SkillHive
            </div>
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl mb-6">
              Micro-Time Skill Sharing with <span className="text-primary">Community Impact</span>
            </h1>
            <p className="max-w-[700px] text-muted-foreground md:text-xl mb-8">
              Learn new skills in just 30 minutes. Teach what you know. Connect with real people.
              <br className="hidden sm:inline" /> Give a skill, take a skill.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button size="lg" className="gap-2" onClick={handleOpenRequest}>
                Find a Skill <ArrowRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="gap-2" onClick={user ? handleOpenRequest : handleSignUp}>
                Offer Your Expertise
              </Button>
            </div>
          </div>

          {/* Background decoration */}
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-primary/20 blur-3xl" />
        </section>

        {/* Stats Section */}
        <section className="border-y bg-muted/40">
          <div className="container py-12">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">5,000+</span>
                <span className="text-sm text-muted-foreground">Active Users</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">12,000+</span>
                <span className="text-sm text-muted-foreground">Skills Shared</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">30 min</span>
                <span className="text-sm text-muted-foreground">Average Session</span>
              </div>
              <div className="flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-primary">4.8/5</span>
                <span className="text-sm text-muted-foreground">User Satisfaction</span>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
                Why Choose <span className="text-primary">SkillHive</span>
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our unique approach to skill sharing makes learning accessible, engaging, and community-driven.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                icon={<Clock className="h-10 w-10 text-primary" />}
                title="30-Minute Micro-Sessions"
                description="Perfect for busy schedules. Learn or teach a skill in just half an hour."
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Give a Skill, Take a Skill"
                description="Our unique exchange system ensures everyone contributes and benefits."
              />
              <FeatureCard
                icon={<MessageSquare className="h-10 w-10 text-primary" />}
                title="Instant Matching"
                description="No waiting for days. Find someone available now to learn from or teach."
              />
              <FeatureCard
                icon={<Globe className="h-10 w-10 text-primary" />}
                title="Community Skill Map"
                description="Discover skills available near you or within your university/workplace."
              />
              <FeatureCard
                icon={<Sparkles className="h-10 w-10 text-primary" />}
                title="Random Skill Challenge"
                description="Get matched with someone to learn a completely new unexpected skill!"
              />
              <FeatureCard
                icon={<Users className="h-10 w-10 text-primary" />}
                title="Public & Private Learning"
                description="Join open group sessions or schedule private 1-on-1 learning experiences."
              />
            </div>
          </div>
        </section>

        {/* Skill Matching Demo Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                  Instant Skill Matching
                </h2>
                <p className="text-muted-foreground md:text-xl mb-8">
                  Our intelligent matching system connects you with the perfect skill partner in seconds. Whether you
                  want to learn something specific or are open to random skill challenges, we've got you covered.
                </p>
                <ul className="space-y-4">
                  {[
                    "Post what you can teach and what you want to learn",
                    "Get matched with compatible users instantly",
                    "Schedule a 30-minute session at your convenience",
                    "Exchange skills and grow together",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 gap-2" onClick={handleOpenRequest}>
                  Try Matching Now <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="lg:order-last">
                <SkillMatchingDemo onConnect={handleOpenChat} />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">How SkillHive Works</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Our simple 4-step process gets you learning and teaching in no time.
              </p>
            </div>

            <HowItWorks />
          </div>
        </section>

        {/* Dashboard Preview Section */}
        <section className="py-20 bg-muted/30">
          <div className="container">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 items-center">
              <div className="order-2 lg:order-1">
                <DashboardPreview />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
                  Track Your Learning Journey
                </h2>
                <p className="text-muted-foreground md:text-xl mb-8">
                  Our intuitive dashboard helps you monitor your progress, manage upcoming sessions, and showcase your
                  growing skill portfolio.
                </p>
                <ul className="space-y-4">
                  {[
                    "View skills learned and skills taught",
                    "Earn badges and maintain learning streaks",
                    "Schedule and manage upcoming sessions",
                    "Connect with your skill-sharing network",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="rounded-full bg-primary/10 p-1 mt-1">
                        <svg
                          className="h-3 w-3 text-primary"
                          fill="none"
                          height="24"
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="3"
                          viewBox="0 0 24 24"
                          width="24"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <Button className="mt-8 gap-2" onClick={user ? () => {} : handleSignUp}>
                  Create Your Dashboard <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">What Our Users Say</h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Join thousands of satisfied users who are expanding their skills through our platform.
              </p>
            </div>

            <TestimonialCarousel />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-6">
              Ready to Start Your Skill-Sharing Journey?
            </h2>
            <p className="mx-auto max-w-[700px] text-primary-foreground/80 md:text-xl mb-8">
              Join SkillHive today and become part of a community that values knowledge exchange and personal growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="gap-2" onClick={user ? handleOpenRequest : handleSignUp}>
                Sign Up Now <ArrowRight className="h-4 w-4" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="bg-transparent text-primary-foreground border-primary-foreground/20 hover:bg-primary-foreground/10"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 md:py-16">
        <div className="container grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">SkillHive</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4 max-w-[300px]">
              Micro-time skill sharing platform connecting people through knowledge exchange.
            </p>
            <div className="flex gap-4">
              {["twitter", "facebook", "instagram", "linkedin"].map((social) => (
                <Link
                  key={social}
                  href={`#${social}`}
                  className="rounded-full bg-muted p-2 text-muted-foreground hover:text-primary"
                >
                  <span className="sr-only">{social}</span>
                  <div className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-medium mb-4">Platform</h3>
            <ul className="space-y-2 text-sm">
              {["Features", "How It Works", "Pricing", "FAQ"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-medium mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              {["Terms", "Privacy", "Cookies", "Licenses"].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-muted-foreground hover:text-foreground">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="container mt-12 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SkillHive. All rights reserved.
        </div>
      </footer>

      {/* Auth Dialog */}
      <AuthDialog isOpen={authDialogOpen} onClose={() => setAuthDialogOpen(false)} defaultTab={authDialogTab} />

      {/* Chat Dialog */}
      {selectedMatch && (
        <ChatDialog
          isOpen={chatDialogOpen}
          onClose={() => setChatDialogOpen(false)}
          matchId={selectedMatch.id}
          currentUser={selectedMatch.currentUser}
          otherUser={selectedMatch.otherUser}
        />
      )}

      {/* Request Dialog */}
      <RequestDialog
        isOpen={requestDialogOpen}
        onClose={() => setRequestDialogOpen(false)}
        currentUser={user ? { id: user.uid, name: user.displayName, avatar: user.photoURL } : mockMatch.currentUser}
        requestData={mockRequest}
      />
    </div>
  )
}

