"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { doc, setDoc, serverTimestamp, updateDoc, arrayUnion } from "firebase/firestore"
import { Check, X } from "lucide-react"

import { db } from "@/lib/firebase"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface RequestDialogProps {
  isOpen: boolean
  onClose: () => void
  currentUser: {
    id: string
    name: string
    avatar?: string
  }
  requestData: {
    id: string
    user: {
      id: string
      name: string
      avatar?: string
    }
    offering: string
    seeking: string
    rating: number
    sessions: number
  }
}

export default function RequestDialog({ isOpen, onClose, currentUser, requestData }: RequestDialogProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleAccept = async () => {
    setIsLoading(true)
    try {
      // Create a match document
      const matchId = `${currentUser.id}_${requestData.user.id}_${Date.now()}`
      await setDoc(doc(db, "matches", matchId), {
        users: [currentUser.id, requestData.user.id],
        userNames: [currentUser.name, requestData.user.name],
        userAvatars: [currentUser.avatar || null, requestData.user.avatar || null],
        createdAt: serverTimestamp(),
        lastMessage: null,
        skills: {
          [currentUser.id]: requestData.seeking,
          [requestData.user.id]: requestData.offering,
        },
        status: "active",
      })

      // Update both users' documents with the match
      await updateDoc(doc(db, "users", currentUser.id), {
        matches: arrayUnion(matchId),
      })

      await updateDoc(doc(db, "users", requestData.user.id), {
        matches: arrayUnion(matchId),
      })

      // Close the dialog and refresh
      onClose()
      router.refresh()
    } catch (error) {
      console.error("Error accepting request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDecline = async () => {
    setIsLoading(true)
    try {
      // You could log the decline or implement a "declined" collection
      // For now, we'll just close the dialog
      onClose()
    } catch (error) {
      console.error("Error declining request:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Skill Exchange Request</DialogTitle>
          <DialogDescription>Someone wants to exchange skills with you!</DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="h-16 w-16">
              <AvatarImage src={requestData.user.avatar} alt={requestData.user.name} />
              <AvatarFallback>{requestData.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-medium text-lg">{requestData.user.name}</h3>
              <div className="text-sm text-muted-foreground">
                {requestData.sessions} sessions completed • {requestData.rating} ★
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">They can teach you:</h4>
              <Badge className="bg-green-50 text-green-700">{requestData.offering}</Badge>
            </div>

            <div>
              <h4 className="text-sm font-medium mb-2">They want to learn:</h4>
              <Badge className="bg-blue-50 text-blue-700">{requestData.seeking}</Badge>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-row gap-2 sm:gap-0">
          <Button variant="outline" className="flex-1" onClick={handleDecline} disabled={isLoading}>
            <X className="mr-2 h-4 w-4" />
            Decline
          </Button>
          <Button className="flex-1" onClick={handleAccept} disabled={isLoading}>
            <Check className="mr-2 h-4 w-4" />
            Accept
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

