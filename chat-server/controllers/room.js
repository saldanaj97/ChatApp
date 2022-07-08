import validateUserReqBody from "./ValidationHelper/index.js";
import ChatRoomModel, { CHAT_ROOM_TYPES } from "../models/ChatRoom.js";

/* Function to initaite a chatroom */
const initiate = async (req, res) => {
  try {
    // Validate the req body
    const validation = validateUserReqBody((types) => ({
      payload: req.body,
      checks: {
        userIds: {
          type: types.array,
          options: { unique: true, empty: false, stringOnly: true },
        },
        type: { type: types.enum, options: { enum: CHAT_ROOM_TYPES } },
      },
    }));

    // If the req is not valid return an error
    if (!validation.success) return res.status(400).json({ ...validation });

    // If the req has been validated, get the list of users in a room and assign the current authenticated user as the chat initiator
    const { userIds, type } = req.body;
    const { userId: chatInitiator } = req;

    // Add the initiator to the group of all users in a room
    const allUserIds = [...userIds, chatInitiator];

    // Initiate the chatroom
    const chatRoom = await ChatRoomModel.initiateChat(allUserIds, type, chatInitiator);
    return res.status(200).json({ success: true, chatRoom });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};
const postMessage = async (req, res) => {};
const getRecentConversation = async (req, res) => {};
const getConversationByRoomId = async (req, res) => {};
const markConversationReadByRoomId = async (req, res) => {};

export default {
  initiate,
  postMessage,
  getRecentConversation,
  getConversationByRoomId,
  markConversationReadByRoomId,
};
