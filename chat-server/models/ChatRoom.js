import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

export const CHAT_ROOM_TYPES = {
  CONSUMER_TO_CONSUMER: "consumer_to_consumer",
  CONSUMER_TO_SUPPORT: "consumer_to_support",
};

const chatRoomSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: () => uuidv4().replace(/\-/g, ""),
    },
    groupName: String,
    userIds: Array,
    type: String,
    chatInitiator: String,
  },
  {
    timestamps: true,
    collection: "chatrooms",
  }
);

chatRoomSchema.statics.initiateChat = async function (_id, groupName, userIds, type, chatInitiator) {
  try {
    const availableRoom = await this.findOne({
      _id,
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: "Retrieving old chat messages. ",
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      };
    }

    const newRoom = await this.create({ _id, groupName, userIds, type, chatInitiator });
    return {
      isNew: true,
      message: "Creating new room named " + groupName,
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
  } catch (error) {
    throw error;
  }
};

chatRoomSchema.statics.getChatRoomById = async function (roomId) {
  try {
    const room = await this.findOne({ _id: roomId });
    return room;
  } catch (error) {
    throw error;
  }
};

chatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
  try {
    const rooms = await this.find({ userIds: { $all: [userId] } });
    return rooms;
  } catch (error) {
    throw error;
  }
};

chatRoomSchema.statics.addUserToChatroom = async function (roomId, userId) {
  try {
    const room = await this.findOne({ _id: roomId });
    const userIds = room.userIds;
    if (room && userIds.includes(userId)) {
      return { success: false, message: "User already in room. " };
    }
    const newUserIds = [...userIds, userId];
    const addUserToRoom = await this.updateOne(room, { $set: { userIds: newUserIds } });
    return { success: true, message: "User has been added to the room. ", userWasAdded: addUserToRoom };
  } catch (error) {
    throw error;
  }
};

export default mongoose.model("ChatRoom", chatRoomSchema);
