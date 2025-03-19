import { CheckCircle2, Clock, MessageSquare, UserPlus } from "lucide-react"

export default function HowItWorks() {
  const steps = [
    {
      icon: <UserPlus className="h-10 w-10 text-primary" />,
      title: "Create Your Profile",
      description: "Sign up and list the skills you can teach and those you want to learn.",
    },
    {
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
      title: "Get Matched",
      description: "Our system instantly connects you with compatible skill partners.",
    },
    {
      icon: <Clock className="h-10 w-10 text-primary" />,
      title: "Schedule a 30-Min Session",
      description: "Pick a time that works for both of you for your micro-learning session.",
    },
    {
      icon: <CheckCircle2 className="h-10 w-10 text-primary" />,
      title: "Exchange Skills",
      description: "Teach what you know, learn what you don't, and grow together.",
    },
  ]

  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute left-[39px] top-0 h-full w-0.5 bg-muted md:left-1/2 md:-translate-x-1/2" />

      <div className="space-y-12 md:space-y-24 ">
        {steps.map((step, index) => (
          <div key={index} className="relative grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* Step number */}
            <div className="absolute left-10 top-0 z-10 flex h-20 w-20 -translate-x-1/2 items-center justify-center rounded-full bg-background text-5xl font-bold shadow-lg md:left-1/2">
              {index + 1}
            </div>

            {/* Content */}
            <div className={`md:text-right ${index % 2 === 0 ? "md:order-first mr-20" : "md:order-last mr-24"}`}>
              <div className="flex flex-row md:flex-row-reverse gap-4 items-center mb-2">
                <div className="hidden md:block">{step.icon}</div>
                <h3 className="text-xl font-bold">{step.title}</h3>
                <div className="md:hidden">{step.icon}</div>
              </div>
              <p className="text-muted-foreground">{step.description}</p>
            </div>

            {/* Empty column for layout */}
            <div className={index % 2 === 0 ? "md:order-last" : "md:order-first"} />
          </div>
        ))}
      </div>
    </div>
  )
}

