"use server";
import { connectToDatabase } from "../database";
import ChatRoom from "../database/models/chatRoom.model";
import User from "../database/models/user.model";
import { getSession } from "../lib";

export async function check_create_room(id) {
  await connectToDatabase();
  try {
    const currentUser = await getSession();
    const currentUserId = currentUser.user._id;

    if (currentUserId === id) {
      throw new Error("You can't text yourself!");
    }

    const currentUserData = await User.findById(currentUserId);
    const targetUserData = await User.findById(id);

    const isBlockedByTargetUser =
      targetUserData.blockedUsers.includes(currentUserId);
    const isTargetUserBlocked = currentUserData.blockedUsers.includes(id);

    let chatRoom = await ChatRoom.findOne({
      participants: {
        $all: [currentUserId, id],
      },
    }).populate("participants");

    if (!chatRoom) {
      chatRoom = await ChatRoom.create({
        participants: [currentUserData, targetUserData],
      });
    }

    if (isBlockedByTargetUser || isTargetUserBlocked) {
      const data = {
        chatRoom: JSON.parse(JSON.stringify(chatRoom)),
        blocked: true,
      };

      return JSON.parse(JSON.stringify(data));
    }

    const data = {
      chatRoom: JSON.parse(JSON.stringify(chatRoom)),
      blocked: false,
    };
    return JSON.parse(JSON.stringify(data));
  } catch (error) {
    throw new Error(error);
  }
}
