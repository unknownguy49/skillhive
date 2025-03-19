import { createServer } from "http"
import { Server } from "socket.io"
import express from "express"
import cors from "cors"

const app = express()
app.use(cors())

const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
})

// Store active connections
const activeConnections = new Map()

// Store messages by matchId
const messagesByMatch = new Map()

io.on("connection", (socket) => {
  const { matchId, userId } = socket.handshake.query

  if (!matchId || !userId) {
    socket.disconnect()
    return
  }

  console.log(`User ${userId} connected to match ${matchId}`)

  // Store connection
  if (!activeConnections.has(matchId)) {
    activeConnections.set(matchId, new Set())
  }
  activeConnections.get(matchId).add(socket.id)

  // Join room for this match
  socket.join(matchId)

  // Send previous messages
  if (messagesByMatch.has(matchId)) {
    socket.emit("previous-messages", messagesByMatch.get(matchId))
  } else {
    messagesByMatch.set(matchId, [])
  }

  // Handle new messages
  socket.on("send-message", (message) => {
    console.log(`New message in match ${matchId}: ${message.content}`)

    // Store message
    const messages = messagesByMatch.get(matchId)
    messages.push(message)
    messagesByMatch.set(matchId, messages)

    // Broadcast to all clients in the match
    io.to(matchId).emit("message", message)
  })

  // Handle session scheduling
  socket.on("schedule-session", (sessionData) => {
    console.log(`Session scheduled for match ${matchId}: ${sessionData.date} at ${sessionData.time}`)

    // Here you would typically store this in a database
    // For now, we'll just broadcast it to all clients in the match
    io.to(matchId).emit("session-scheduled", sessionData)
  })

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log(`User ${userId} disconnected from match ${matchId}`)

    // Remove from active connections
    if (activeConnections.has(matchId)) {
      activeConnections.get(matchId).delete(socket.id)
      if (activeConnections.get(matchId).size === 0) {
        activeConnections.delete(matchId)
      }
    }
  })
})

const PORT = process.env.PORT || 3001

httpServer.listen(PORT, () => {
  console.log(`Socket.IO server running on port ${PORT}`)
})

export default httpServer

