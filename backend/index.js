import express from "express";
import http from "http";
import { Server } from "socket.io";
import StatsD from "node-statsd";

const app = express();
const server = http.createServer(app);

// Initialize StatsD client
const statsdClient = new StatsD({
  host: "localhost",   // or use 'graphite' if running via Docker Compose in same network
  port: 8125
});

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (msg) => {
    io.emit("message", msg);

    // Emit metric to StatsD for messages sent
    statsdClient.increment("chatapp.messages.sent");
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");

    // Optional: track user disconnects
    statsdClient.increment("chatapp.users.disconnected");
  });
});

app.get("/", (req, res) => {
  res.send("Chat server running!");
});

server.listen(5000, () => {
  console.log("Server listening on port 5000");
});
