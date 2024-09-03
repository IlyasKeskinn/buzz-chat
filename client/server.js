const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

global.onlineUsers = new Map();

app.prepare().then(() => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer, {
    maxHttpBufferSize: 1e8, // Increase maximum HTTP buffer size
    pingTimeout: 60000, // Set the ping timeout to 60 seconds
    transports: ["websocket", "polling"], // Allow both WebSocket and long polling transports
  });

  io.on("connection", (socket) => {
    global.chatSocket = socket;
    socket.on("add-user", (userId) => {
      onlineUsers.set(userId, socket.id);
    });

    socket.on("send-msg", (data) => {
      const { recieverUser, message, chatRoomId } = data;
      const sendUserSocket = onlineUsers.get(recieverUser);

      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", message);
      }
    });

    socket.on("mark-messages-read", async (data) => {
      const { chatRoomId, userId } = data;
      // Update the message statuses to 'read' in your database here

      // Notify the sender that the messages have been read
      const senderSocket = onlineUsers.get(userId);
      if (senderSocket) {
        socket.to(senderSocket).emit("messages-read", { chatRoomId });
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
