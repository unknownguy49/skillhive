"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Flame, Star, Trophy, Users } from "lucide-react"

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState("overview")

  const upcomingSessions = [
    {
      id: 1,
      type: "teaching",
      skill: "Graphic Design",
      with: "Alex Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Today",
      time: "3:00 PM",
    },
    {
      id: 2,
      type: "learning",
      skill: "Python Basics",
      with: "Jamie Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      date: "Tomorrow",
      time: "5:30 PM",
    },
  ]

  const skillsLearned = [
    { name: "Python Basics", sessions: 3, level: "Beginner" },
    { name: "Public Speaking", sessions: 2, level: "Beginner" },
    { name: "Guitar", sessions: 1, level: "Beginner" },
  ]

  const skillsTaught = [
    { name: "Graphic Design", sessions: 5, level: "Intermediate" },
    { name: "Photography", sessions: 3, level: "Intermediate" },
  ]

  const achievements = [
    {
      icon: <Flame className="h-5 w-5 text-orange-500" />,
      name: "5-Day Streak",
      description: "Learn or teach for 5 days in a row",
    },
    {
      icon: <Users className="h-5 w-5 text-blue-500" />,
      name: "Community Builder",
      description: "Connect with 10 different users",
    },
    {
      icon: <Star className="h-5 w-5 text-yellow-500" />,
      name: "5-Star Teacher",
      description: "Receive 5 five-star ratings",
    },
  ]

  return (
    <Card className="border shadow-xl">
      <CardHeader className="border-b bg-muted/30">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Your Dashboard</CardTitle>
            <CardDescription>Track your learning journey</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium">Level 3</span>
            </div>
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Your Stats</h3>
                <div className="grid grid-cols-3 gap-2">
                  <Card className="bg-muted/30">
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl font-bold">8</div>
                      <div className="text-xs text-muted-foreground">Skills Learned</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl font-bold">12</div>
                      <div className="text-xs text-muted-foreground">Sessions Completed</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-muted/30">
                    <CardContent className="p-3 text-center">
                      <div className="text-2xl font-bold">5</div>
                      <div className="text-xs text-muted-foreground">Day Streak</div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Upcoming Sessions</h3>
                <div className="space-y-2">
                  {upcomingSessions.map((session) => (
                    <Card key={session.id} className="bg-muted/30">
                      <CardContent className="p-3">
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={session.avatar} alt={session.with} />
                            <AvatarFallback>{session.with.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <Badge
                                variant={session.type === "teaching" ? "default" : "secondary"}
                                className="text-xs"
                              >
                                {session.type === "teaching" ? "Teaching" : "Learning"}
                              </Badge>
                              <span className="text-sm font-medium">{session.skill}</span>
                            </div>
                            <div className="text-xs text-muted-foreground">with {session.with}</div>
                          </div>
                          <div className="text-right text-xs">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              <span>{session.date}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              <span>{session.time}</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="skills" className="p-4">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Skills Learned</h3>
                <div className="space-y-2">
                  {skillsLearned.map((skill) => (
                    <Card key={skill.name} className="bg-muted/30">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{skill.name}</div>
                            <div className="text-xs text-muted-foreground">{skill.sessions} sessions completed</div>
                          </div>
                          <Badge variant="outline">{skill.level}</Badge>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                          <div className="h-1.5 rounded-full bg-primary" style={{ width: `${skill.sessions * 20}%` }} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Skills Taught</h3>
                <div className="space-y-2">
                  {skillsTaught.map((skill) => (
                    <Card key={skill.name} className="bg-muted/30">
                      <CardContent className="p-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{skill.name}</div>
                            <div className="text-xs text-muted-foreground">{skill.sessions} sessions completed</div>
                          </div>
                          <Badge variant="outline">{skill.level}</Badge>
                        </div>
                        <div className="mt-2 h-1.5 w-full rounded-full bg-muted">
                          <div className="h-1.5 rounded-full bg-primary" style={{ width: `${skill.sessions * 20}%` }} />
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="p-4">
            <div className="grid gap-3">
              {achievements.map((achievement) => (
                <Card key={achievement.name} className="bg-muted/30">
                  <CardContent className="p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        {achievement.icon}
                      </div>
                      <div>
                        <div className="font-medium">{achievement.name}</div>
                        <div className="text-xs text-muted-foreground">{achievement.description}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              <Card className="border-dashed border-muted bg-muted/10">
                <CardContent className="flex items-center justify-center p-6">
                  <div className="text-center text-muted-foreground">
                    <div className="mb-1 text-sm font-medium">More achievements to unlock</div>
                    <div className="text-xs">Keep learning and teaching to earn more badges</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

