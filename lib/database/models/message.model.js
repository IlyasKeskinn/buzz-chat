import mongoose from "mongoose";
const { Schema, model, models } = mongoose;

const messageSchema = new Schema(
  {
    sender: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    chatRoom: {
      type: Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    messageType: {
      type: String,
      default: "text",
    },
    recipientStatuses: [
      {
        userId: {
          type: Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        status: {
          type: String,
          enum: ["sent", "delivered", "read"],
          default: "sent",
        },
      },
    ],
    message: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Message = models.Message || model("Message", messageSchema);

export default Message;
