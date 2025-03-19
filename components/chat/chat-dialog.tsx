"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { type Socket, io } from "socket.io-client"
import { Send, X, Video, Calendar, Clock } from "lucide-react"
import { formatDistanceToNow } from "date-fns"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"

interface Message {
  id: string
  sender: string
  senderId: string
  content: string
  timestamp: Date
}

interface ChatDialogProps {
  isOpen: boolean
  onClose: () => void
  matchId: string
  currentUser: {
    id: string
    name: string
    avatar?: string
  }
  otherUser: {
    id: string
    name: string
    avatar?: string
    offering: string
    seeking: string
  }
}

export default function ChatDialog({ isOpen, onClose, matchId, currentUser, otherUser }: ChatDialogProps) {
  const router = useRouter()
  const [socket, setSocket] = useState<Socket | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [isConnected, setIsConnected] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState("chat")
  const [selectedDate, setSelectedDate] = useState<string>("")
  const [selectedTime, setSelectedTime] = useState<string>("")

  // Connect to Socket.IO server
  useEffect(() => {
    if (!isOpen) return

    const socketInstance = io(process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:3001", {
      query: {
        matchId,
        userId: currentUser.id,
      },
    })

    socketInstance.on("connect", () => {
      setIsConnected(true)
      console.log("Connected to Socket.IO server")
    })

    socketInstance.on("disconnect", () => {
      setIsConnected(false)
      console.log("Disconnected from Socket.IO server")
    })

    socketInstance.on("message", (message: Message) => {
      setMessages((prev) => [...prev, message])
    })

    socketInstance.on("previous-messages", (previousMessages: Message[]) => {
      setMessages(previousMessages)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [isOpen, matchId, currentUser.id])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() || !socket) return

    const message = {
      id: Date.now().toString(),
      sender: currentUser.name,
      senderId: currentUser.id,
      content: newMessage,
      timestamp: new Date(),
    }

    socket.emit("send-message", message)
    setNewMessage("")
  }

  const handleScheduleSession = () => {
    if (!selectedDate || !selectedTime || !socket) return

    const message = {
      id: Date.now().toString(),
      sender: currentUser.name,
      senderId: currentUser.id,
      content: `📅 I'd like to schedule a session on ${selectedDate} at ${selectedTime}`,
      timestamp: new Date(),
    }

    socket.emit("send-message", message)
    socket.emit("schedule-session", {
      matchId,
      date: selectedDate,
      time: selectedTime,
      requesterId: currentUser.id,
    })

    setActiveTab("chat")
  }

  const availableDates = [
    new Date(Date.now() + 86400000).toISOString().split("T")[0], // Tomorrow
    new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0], // Day after tomorrow
    new Date(Date.now() + 86400000 * 3).toISOString().split("T")[0], // 3 days from now
  ]

  const availableTimes = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
    "08:00 PM",
  ]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[500px] h-[600px] flex flex-col p-0">
        <DialogHeader className="p-4 border-b">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <DialogTitle>{otherUser.name}</DialogTitle>
                <div className="flex gap-2 mt-1">
                  <Badge variant="outline" className="bg-green-50 text-green-700 text-xs">
                    Offers: {otherUser.offering}
                  </Badge>
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 text-xs">
                    Seeks: {otherUser.seeking}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" onClick={() => setActiveTab("schedule")}>
                <Calendar className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <Video className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsContent value="chat" className="flex-1 flex flex-col data-[state=active]:flex-1 m-0 p-0">
            <div className="flex-1 overflow-y-auto p-4">
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-muted-foreground">
                  <p>No messages yet</p>
                  <p className="text-sm">Start the conversation by sending a message</p>
                </div>
              ) : (
                messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex mb-4 ${message.senderId === currentUser.id ? "justify-end" : "justify-start"}`}
                  >
                    {message.senderId !== currentUser.id && (
                      <Avatar className="mr-2 h-8 w-8">
                        <AvatarImage src={otherUser.avatar} alt={otherUser.name} />
                        <AvatarFallback>{otherUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.senderId === currentUser.id ? "bg-primary text-primary-foreground" : "bg-muted"
                      }`}
                    >
                      <div>{message.content}</div>
                      <div
                        className={`text-xs mt-1 ${
                          message.senderId === currentUser.id ? "text-primary-foreground/70" : "text-muted-foreground"
                        }`}
                      >
                        {formatDistanceToNow(new Date(message.timestamp), { addSuffix: true })}
                      </div>
                    </div>
                    {message.senderId === currentUser.id && (
                      <Avatar className="ml-2 h-8 w-8">
                        <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                        <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <DialogFooter className="p-4 border-t">
              <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                <Input
                  placeholder={isConnected ? "Type a message..." : "Connecting..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  disabled={!isConnected}
                  className="flex-1"
                />
                <Button type="submit" size="icon" disabled={!isConnected || !newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </DialogFooter>
          </TabsContent>

          <TabsContent value="schedule" className="flex-1 data-[state=active]:flex-1 m-0 p-4">
            <div className="space-y-4">
              <h3 className="font-medium">Schedule a 30-minute session</h3>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Date</label>
                <div className="grid grid-cols-3 gap-2">
                  {availableDates.map((date) => (
                    <Button
                      key={date}
                      variant={selectedDate === date ? "default" : "outline"}
                      className="justify-center"
                      onClick={() => setSelectedDate(date)}
                    >
                      {new Date(date).toLocaleDateString(undefined, { month: "short", day: "numeric" })}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Select Time</label>
                <div className="grid grid-cols-4 gap-2">
                  {availableTimes.map((time) => (
                    <Button
                      key={time}
                      variant={selectedTime === time ? "default" : "outline"}
                      className="justify-center text-xs"
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </Button>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <Button className="w-full" onClick={handleScheduleSession} disabled={!selectedDate || !selectedTime}>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule Session
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}

