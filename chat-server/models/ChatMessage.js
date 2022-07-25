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

ChatMessageSchema.statics.getConversationByRoomId = async function (chatRoomId, options = {}) {
  try {
    return this.aggregate([
      // Find the chatroom matching the ID passed in
      { $match: { chatRoomId } },

      // Sort the messages in reverse order due to messages being displayed that way in a convo thread
      { $sort: { createdAt: -1 } },

      // Find each user object for each sent message and then unwind the user object to an array
      {
        $lookup: {
          from: "users",
          localField: "postedByUser",
          foreignField: "_id",
          as: "postedByUser",
        },
      },
      { $unwind: "$postedByUser" },

      // Limit the amount of messages we are getting on load
      /*       { $skip: options.page * options.limit },
      { $limit: options.limit }, */

      // Display the messages in the order they were sent
      { $sort: { createdAt: 1 } },
    ]);
  } catch (error) {
    throw error;
  }
};

ChatMessageSchema.statics.getRecentConversation = async function (chatRoomIds, options) {
  try {
    return this.aggregate([
      { $match: { chatRoomId: { $in: chatRoomIds } } },
      {
        $group: {
          _id: "$chatRoomId",
          messageId: { $last: "$_id" },
          chatRoomId: { $last: "$chatRoomId" },
          message: { $last: "$message" },
          type: { $last: "$type" },
          postedByUser: { $last: "$postedByUser" },
          createdAt: { $last: "$createdAt" },
          readByRecipients: { $last: "$readByRecipients" },
        },
      },
      { $sort: { createdAt: -1 } },

      // Do a join on the users table and return the user who made the post
      {
        $lookup: {
          from: "users",
          localField: "postedByUser",
          foreignField: "_id",
          as: "postedByUser",
        },
      },
      { $unwind: "$postedByUser" },

      // Do a join on the chatrooms table and return the room matching the ID
      {
        $lookup: {
          from: "chatrooms",
          localField: "_id",
          foreignField: "_id",
          as: "roomInfo",
        },
      },
      { $unwind: "$roomInfo" },
      { $unwind: "$roomInfo.userIds" },

      // Join the users table
      {
        $lookup: {
          from: "users",
          localField: "roomInfo.userIds",
          foreignField: "_id",
          as: "roomInfo.userProfile",
        },
      },
      { $unwind: "$readByRecipients" },

      // Join the users table
      {
        $lookup: {
          from: "users",
          localField: "readByRecipients.readByUserId",
          foreignField: "_id",
          as: "readByRecipients.readByUser",
        },
      },

      // Group the data together
      {
        $group: {
          _id: "$roomInfo._id",
          messageId: { $last: "$messageId" },
          chatRoomId: { $last: "$chatRoomId" },
          message: { $last: "$message" },
          type: { $last: "$type" },
          postedByUser: { $last: "$postedByUser" },
          readByRecipients: { $addToSet: "$readByRecipients" },
          roomInfo: { $addToSet: "$roomInfo.userProfile" },
          createdAt: { $last: "$createdAt" },
        },
      },
      // Pagination
      { $skip: options.page * options.limit },
      { $limit: options.limit },
    ]);
  } catch (error) {
    throw error;
  }
};

ChatMessageSchema.statics.markMessageRead = async function (chatRoomId, currentUserOnlineId) {
  try {
    // Use the update many function because it could be possible user has not seen multiple messages
    return this.updateMany(
      // Find all chat messages in the room matching the ID where the userID is not in the readby recipients arr
      {
        chatRoomId,
        "readByRecipients.readByUserId": { $ne: currentUserOnlineId },
      },

      // Update and add the current user to the readByRecipients array
      {
        $addToSet: {
          readByRecipients: { readByUserId: currentUserOnlineId },
        },
      },

      // Update all of the matching records
      { multi: true }
    );
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("ChatMessage", ChatMessageSchema);
