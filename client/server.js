const { createServer } = require("node:http");
const next = require("next");
const { Server } = require("socket.io");

const dev = process.env.NODE_ENV !== "production";

const hostname = "localhost";

const port = 3000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

global.onlineUsers = new Map();
global.activeChatRooms = new Map();

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
    // When a user joins the chatroom
    socket.on("join", ({ chatRoomId, userId }) => {
      socket.join(chatRoomId);

      // If the chatRoom does not exist yet, initialize it with a new Set for users
      if (!activeChatRooms.has(chatRoomId)) {
        activeChatRooms.set(chatRoomId, new Set());
      }

      // Get the current users in the room and add the new user
      const usersInRoom = activeChatRooms.get(chatRoomId);
      usersInRoom.add(userId);

      // Broadcast updated room info to all clients
      io.emit("active-chatRooms", {
        activeChatRooms: Array.from(activeChatRooms.keys()).map((roomId) => ({
          roomId,
          users: Array.from(activeChatRooms.get(roomId)), // All users in this room
        })),
      });
    });

    //When a user leaves the chatroom
    socket.on("leave", ({ chatRoomId, userId }) => {
      socket.leave(chatRoomId);

      // Get the users in the room and remove the user who left
      const usersInRoom = activeChatRooms.get(chatRoomId);
      if (usersInRoom) {
        usersInRoom.delete(userId); // Remove the user from the room

        // If no users are left in the room, remove the room entirely
        if (usersInRoom.size === 0) {
          activeChatRooms.delete(chatRoomId);
        }
      }
      // Broadcast updated room info to all clients
      io.emit("active-chatRooms", {
        activeChatRooms: Array.from(activeChatRooms.keys()).map((roomId) => ({
          roomId,
          users: Array.from(activeChatRooms.get(roomId)), // All users in this room
        })),
      });
    });

    socket.on("mark-messages-read", async (data) => {
      const { chatRoomId, userId } = data;

      const senderSocket = onlineUsers.get(userId);
      if (senderSocket) {
        socket.to(senderSocket).emit("messages-read", { chatRoomId });
      }
    });
    socket.on("disconnect", () => {
      // Find the user by socket ID and remove them from onlineUsers
      let disconnectedUserId;
      onlineUsers.forEach((value, key) => {
        if (value === socket.id) {
          disconnectedUserId = key;
          onlineUsers.delete(key); // Remove the user from the map
        }
      });

      if (disconnectedUserId) {
        // Loop through all chat rooms to remove the user from each room they were part of
        activeChatRooms.forEach((usersInRoom, chatRoomId) => {
          if (usersInRoom.has(disconnectedUserId)) {
            usersInRoom.delete(disconnectedUserId); // Remove user from the room

            // If the room is empty, delete the room
            if (usersInRoom.size === 0) {
              activeChatRooms.delete(chatRoomId);
            }
          }
        });

        // Emit updated room info to all clients after the user has been removed
        io.emit("active-chatRooms", {
          activeChatRooms: Array.from(activeChatRooms.keys()).map((roomId) => ({
            roomId,
            users: Array.from(activeChatRooms.get(roomId)), // All users in this room
          })),
        });
      }

      // Emit the updated online users list to all clients
      io.emit("online-users", {
        onlineUsers: Array.from(onlineUsers.keys()),
      });
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
