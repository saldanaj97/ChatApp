import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

const MESSAGE_TYPES = {
  TYPE_TEXT: "text",
};

const readByRecipientSchema = new mongoose.Schema(
  {
    _id: false,
    readByUserId: String,
    readAt: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: false }
);

const ChatMessageSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    chatRoomId: String,
    message: mongoose.Schema.Types.Mixed,
    type: {
      type: String,
      default: () => MESSAGE_TYPES.TYPE_TEXT,
    },
    postedByUser: String,
    readByRecipients: [readByRecipientSchema],
  },
  { timestamps: true, collection: "chatmessages" }
);

ChatMessageSchema.statics.createPostInChatRoom = async function (chatRoomId, message, postedByUser) {
  try {
    const post = await this.create({
      chatRoomId,
      message,
      postedByUser,
      readByRecipients: { readByUserId: postedByUser },
    });

    const aggregate = await this.aggregate([
      // Get the document where _id is equal to the new post id
      { $match: { _id: post._id } },

      // Do a join with the users table and replace the current postedbyuser with the users obj for more info
      {
        $lookup: {
          from: "users",
          localField: "postedByUser",
          foreignField: "_id",
          as: "postedByUser",
        },
      },
      // Make the postedbyuser obj an arr
      { $unwind: "$postedByUser" },

      // Do a join on chatrooms table and get the chatroom whose _id is equal to the chatroom id
      {
        $lookup: {
          from: "chatrooms",
          localField: "chatRoomId",
          foreignField: "_id",
          as: "chatRoomInfo",
        },
      },
      { $unwind: "$chatRoomInfo" },
      { $unwind: "$chatRoomInfo.userIds" },

      // Do a join on users table and return a user obj whose in the userIds arr
      {
        $lookup: {
          from: "users",
          localField: "chatRoomInfo.userIds",
          foreignField: "_id",
          as: "chatRoomInfo.userProfile",
        },
      },
      { $unwind: "$chatRoomInfo.userProfile" },

      // Group the data together
      {
        $group: {
          _id: "$chatRoomInfo._id",
          postId: { $last: "$_id" },
          chatRoomId: { $last: "$chatRoomInfo._id" },
          message: { $last: "$message" },
          type: { $last: "$type" },
          postedByUser: { $last: "$postedByUser" },
          readByRecipients: { $last: "$readByRecipients" },
          chatRoomInfo: { $addToSet: "$chatRoomInfo.userProfile" },
          createdAt: { $last: "$createdAt" },
          updatedAt: { $last: "$updatedAt" },
        },
      },
    ]);
    return aggregate[0];
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("ChatMessage", ChatMessageSchema);
