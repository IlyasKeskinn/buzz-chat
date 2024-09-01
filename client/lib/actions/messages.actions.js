"use server";
import { connectToDatabase } from "../database";
import ChatRoom from "../database/models/chatRoom.model";
import Message from "../database/models/message.model";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { firebaseStorage } from "@/utils/FirebaseConfig";
import { dataURLtoBlob } from "../helpers/dataURLtoBlob";
import User from "../database/models/user.model";
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

    const chatRoom = await ChatRoom.findById(chatRoomId).populate(
      "participants"
    );

    if (!chatRoom) {
      throw new Error("Chat room not found!");
    }

    // Check if the sender is blocked by any participant or if the sender has blocked any participant
    for (let participant of chatRoom.participants) {
      if (
        participant._id.toString() !== senderId &&
        participant.blockedUsers.includes(senderId)
      ) {
        throw new Error("Message cannot be sent due to blocking rules.");
      }
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

export async function sendImageMessage(data) {
  const { senderId, chatRoomId, image } = data;
  let uploadedImage = "";

  try {
    await connectToDatabase();
    if (!senderId) {
      throw new Error("User is required");
    }

    if (!image) {
      throw new Error("Image required!");
    }

    if (!chatRoomId) {
      throw new Error("ChatRoomId is required");
    }

    const chatRoom = await ChatRoom.findById(chatRoomId).populate(
      "participants"
    );

    if (!chatRoom) {
      throw new Error("Chat is required");
    }

    // Check if the sender is blocked by any participant or if the sender has blocked any participant
    for (let participant of chatRoom.participants) {
      if (
        participant._id.toString() !== senderId &&
        participant.blockedUsers.includes(senderId)
      ) {
        throw new Error("Message cannot be sent due to blocking rules.");
      }
    }
    const receiverUsers = chatRoom.participants.filter(
      (member) => member._id.toString() !== senderId
    );

    const recipientStatuses = receiverUsers.map((recieverUser) => {
      const isOnline = global.onlineUsers.has(recieverUser._id.toString());
      return {
        userId: recieverUser._id,
        status: isOnline ? "delivered" : "sent",
      };
    });

    const randomNumber = Math.floor(Math.random() * 100000);
    if (image) {
      const storageRef = ref(
        firebaseStorage,
        `/photos/${chatRoomId}.${randomNumber}.jpg`
      );
      const blob = dataURLtoBlob(image);

      const snapshot = await uploadBytesResumable(storageRef, blob);
      const downloadURL = await getDownloadURL(storageRef);
      uploadedImage = downloadURL;
    }

    const newMessage = await Message.create({
      sender: senderId,
      chatRoom: chatRoomId,
      message: uploadedImage,
      messageType: "image",
      recipientStatuses,
    });

    return JSON.parse(JSON.stringify(newMessage));
  } catch (error) {
    throw new Error(error);
  }
}

export async function sendAudioMessage(data) {
  const { senderId, chatRoomId, audioURL } = data;

  try {
    await connectToDatabase();

    if (!senderId || !chatRoomId) {
      throw new Error("Sender or chatroom is required");
    }

    if (!audioURL) {
      throw new Error("Voice not found!");
    }

    const chatRoom = await ChatRoom.findById(chatRoomId).populate(
      "participants"
    );

    // Check if the sender is blocked by any participant or if the sender has blocked any participant
    for (let participant of chatRoom.participants) {
      if (
        participant._id.toString() !== senderId &&
        participant.blockedUsers.includes(senderId)
      ) {
        throw new Error("Message cannot be sent due to blocking rules.");
      }
    }

    const receiverUsers = chatRoom.participants.filter(
      (member) => member._id.toString() !== senderId
    );

    const recipientStatuses = receiverUsers.map((recieverUser) => {
      const isOnline = global.onlineUsers.has(recieverUser._id.toString());
      return {
        userId: recieverUser._id,
        status: isOnline ? "delivered" : "sent",
      };
    });

    const newMessage = await Message.create({
      sender: senderId,
      chatRoom: chatRoomId,
      recipientStatuses,
      messageType: "voice",
      message: audioURL,
    });

    return JSON.parse(JSON.stringify(newMessage));
  } catch (error) {
    console.log(error);
  }
}

export async function getMessages(chatRoomId, fetchingUserId) {
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

    for (const message of messages) {
      let updated = false;
      message.recipientStatuses.forEach((recipient) => {
        if (
          recipient.userId.equals(fetchingUserId) &&
          recipient.status !== "read"
        ) {
          recipient.status = "read";
          updated = true;
        }
      });
      if (updated) await message.save();
    }

    return JSON.parse(JSON.stringify(messages));
  } catch (error) {
    throw new Error(error);
  }
}

export async function updateMessageStatusToDelivered(userId) {
  try {
    await connectToDatabase();

    const matchingMessages = await Message.find({
      "recipientStatuses.userId": userId,
    });

    if (matchingMessages.length <= 0) {
      console.log("No messages found for updating.");
      return;
    }

    for (const message of matchingMessages) {
      let updated = false;

      message.recipientStatuses.forEach((recipient) => {
        if (recipient.userId.equals(userId) && recipient.status === "sent") {
          (recipient.status = "delivered"), (updated = true);
        }
      });
      if (updated) await message.save();
    }
    console.log(`${matchingMessages.length} messages updated to delivered.`);
  } catch (error) {
    console.error("Error updating messages:", error);
  }
}
