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

      io.emit("online-users", {
        onlineUsers: Array.from(onlineUsers.keys()),
      });
    });

    socket.on("disconnect", () => {
      // Find the user by socket ID and remove them from onlineUsers
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          onlineUsers.delete(key); // Remove the user from the map
        }
      });

      // Emit the updated online users list to all clients
      io.emit("online-users", {
        onlineUsers: Array.from(onlineUsers.keys()),
      });
    });

    socket.on("sign-out", (id) => {
      onlineUsers.delete(id);
      socket.broadcast.emit("online-users", {
        onlineUsers: Array.from(onlineUsers.keys()),
      });
    });

    socket.on("send-msg", (data) => {
      const { recieverUser, message, chatRoomId, senderUser } = data;
      const sendUserSocket = onlineUsers.get(recieverUser._id);

      if (sendUserSocket) {
        socket.to(sendUserSocket).emit("msg-recieve", data);
      }
    });

    socket.on("mark-messages-read", async (data) => {
      const { chatRoomId, userId } = data;

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
