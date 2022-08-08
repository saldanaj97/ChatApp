import validateUserReqBody from "./ValidationHelper/index.js";
import ChatRoomModel, { CHAT_ROOM_TYPES } from "../models/ChatRoom.js";
import ChatMessageModel from "../models/ChatMessage.js";
import UserModel from "../models/User.js";

/* Function to initaite a chatroom */
const initiate = async (req, res) => {
  try {
    // Validate the req body
    const validation = validateUserReqBody((types) => ({
      payload: req.body,
      checks: {
        groupName: { type: types.string },
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
    const chatInitiator = userIds[0];

    // Get the ID for the new room (if provided ) other wise a default value will be provided
    const { _id } = req.body;
    const { groupName } = req.body;

    // Initiate the chatroom
    const chatRoom = await ChatRoomModel.initiateChat(_id, groupName, userIds, type, chatInitiator);
    return res.status(200).json({ success: true, chatRoom });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function for when a user decides to send a message to a room */
const postMessage = async (req, res) => {
  try {
    // Get the room ID the message will be sent to
    const { roomId } = req.params;

    // Validate the req
    const validation = validateUserReqBody((types) => ({
      payload: req.body,
      checks: {
        messageText: { type: types.string },
      },
    }));
    if (!validation.success) return res.status(200).json({ validation });

    // Once the req has been validated we grab the message text from the req
    const messagePayload = {
      messageText: req.body.messageText,
    };

    // Get the id of the user logged in
    const currentLoggedUser = req.userId;

    // Broadcast the message to the room ID
    const post = await ChatMessageModel.createPostInChatRoom(roomId, messagePayload, currentLoggedUser);
    global.io.sockets.in(roomId).emit("new message", { message: post });
    return res.status(200).json({ success: true, post });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function that retrieves a users most recent conversaion */
const getRecentConversation = async (req, res) => {
  try {
    const currentLoggedUser = req.userId;
    const options = {
      page: parseInt(req.query.page) || 0,
      limit: parseInt(req.query.limit) || 10,
    };
    const rooms = await ChatRoomModel.getChatRoomsByUserId(currentLoggedUser);
    const roomIds = rooms.map((room) => room._id);
    const recentConversation = await ChatMessageModel.getRecentConversation(roomIds, options, currentLoggedUser);
    return res.status(200).json({ success: true, conversation: recentConversation });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function that will get all messages from a particular room ID*/
const getConversationByRoomId = async (req, res) => {
  try {
    // Check if the room that we are trying to reach exists, if not return a message notifying of non existent room
    const { roomId } = req.params;
    const room = await ChatRoomModel.getChatRoomById(roomId);
    if (!room) return res.status(400).json({ success: false, message: "No room exists with the provided ID" });

    // Get all the users in the room
    const users = await UserModel.getUserByIds(room.userIds);
    ChatRoomModel.getChatRoomById = async function (roomId) {
      try {
        const room = await this.findOne({ _id: roomId });
        return room;
      } catch (error) {
        throw error;
      }
    };
    const options = {
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
    };

    // Get the conversation now that the room has been confirmed to exist
    const conversation = await ChatMessageModel.getConversationByRoomId(roomId, options);
    return res.status(200).json({
      success: true,
      conversation,
      users,
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function that will get all of a users messages */
const getUsersConversations = async (req, res) => {
  console.log({ req });
  try {
    const currentLoggedUser = req.userId;
    const rooms = await ChatRoomModel.getChatRoomsByUserId(currentLoggedUser);
    const roomIds = rooms.map((room) => room);
    return res.status(200).json({ success: true, roomIds });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function to mark a conversation as read once a user views a room */
const markConversationReadByRoomId = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoomModel.getChatRoomById(roomId);
    if (!room) {
      return res.status(400).json({
        success: false,
        message: "No room exists with this Id",
      });
    }

    const currentUserLoggedIn = req.userId;
    const result = await ChatMessageModel.markMessageRead(roomId, currentUserLoggedIn);
    return res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, error });
  }
};

/* Function that will take in userID and roomId and will add the user to the chatroom */
const addUserToConversation = async (req, res) => {
  try {
    const { roomId, userId } = req.body;
    const addedToRoom = await ChatRoomModel.addUserToChatroom(roomId, userId);
    if (!addedToRoom.success) {
      return res.status(200).json({ success: false, message: addedToRoom.message });
    }
    return res.status(200).json({ success: true, addedToRoom });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

/* Function that will take in a room ID and return the name of the group */
const getRoomNameById = async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await ChatRoomModel.getChatRoomById(roomId);
    if (!room) return res.status(400).json({ success: false, message: "No room exists with the provided ID" });
    return res.status(200).json({ success: true, room });
  } catch (error) {
    return res.status(500).json({ success: false, error: error });
  }
};

export default {
  initiate,
  postMessage,
  getRecentConversation,
  getConversationByRoomId,
  getUsersConversations,
  markConversationReadByRoomId,
  addUserToConversation,
  getRoomNameById,
};
