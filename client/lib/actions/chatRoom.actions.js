"use server";
import { connectToDatabase } from "../database";
import ChatRoom from "../database/models/chatRoom.model";
import { getSession } from "../lib";
import mongoose from "mongoose";

export async function check_create_room(id) {
  await connectToDatabase();
  try {
    const currentUser = await getSession();
    const currentUserId = currentUser.user._id;

    if (currentUserId === id) {
      throw new Error("You can't text yourself!");
    }

    const existingChatRoom = await ChatRoom.findOne({
      participants: {
        $all: [currentUserId, id],
      },
    }).populate("participants");
    if (existingChatRoom) {
      return JSON.parse(JSON.stringify(existingChatRoom));
    }

    const newChatRoom = await ChatRoom.create({
      participants: [currentUserId, id],
    });

    return JSON.parse(JSON.stringify(newChatRoom));
  } catch (error) {
    throw new Error(error);
  }
}
