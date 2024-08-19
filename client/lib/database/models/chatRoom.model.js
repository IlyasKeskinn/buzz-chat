import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const chatRoomSchema = new Schema(
  {
    participants: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    isGroupChat: {
      type: Boolean,
      default: false,
    },
    charRoomName: {
      type: String,
      required: function () {
        this.isGroupChat;
      },
    },
  },
  { timestamps: true }
);

const ChatRoom = models.ChatRoom || model("ChatRoom", chatRoomSchema);

export default ChatRoom;
