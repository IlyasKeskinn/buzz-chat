"use server";
import { connectToDatabase } from "../database";
import ChatRoom from "../database/models/chatRoom.model";
import Message from "../database/models/message.model";

export async function createMessage(data) {
  const { senderId, text, chatRoomId } = data;

  try {
    await connectToDatabase();

    if (!senderId) {
      throw new Error("Must be sender user!");
    }
    if (!chatRoomId) {
      throw new Error("Must be room!");
    }

    if (!text) {
      throw new Error("Message is required!");
    }

    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) {
      throw new Error("Chat room not found!");
    }

    const receiverUsers = chatRoom.participants.filter(
      (member) => member._id.toString() !== senderId
    );

    const recipientStatuses = receiverUsers.map((receiver) => {
      const isOnline = global.onlineUsers.has(receiver._id.toString());
      return {
        userId: receiver._id,
        status: isOnline ? "delivered" : "sent",
      };
    });

    const newMessage = await Message.create({
      sender: senderId,
      chatRoom: chatRoomId,
      message: text,
      recipientStatuses,
    });

    return JSON.parse(JSON.stringify(newMessage));
  } catch (error) {
    throw new Error(error);
  }
}

export async function getMessages(chatRoomId) {
  try {
    await connectToDatabase();

    if (!chatRoomId) {
      throw new Error("Must be room!");
    }
    const chatRoom = await ChatRoom.findById(chatRoomId);

    if (!chatRoom) {
      throw new Error("Chat room not found!");
    }

    const messages = await Message.find({ chatRoom: chatRoom._id });

    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    throw new Error(error);
  }
}
