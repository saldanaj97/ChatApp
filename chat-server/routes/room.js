import express from "express";

/* Controllers */
import room from "../controllers/room.js";

const router = express.Router();

router
  .get("/", room.getRecentConversation)
  .get("/user-messages", room.getUsersConversations)
  .get("/:roomId", room.getConversationByRoomId)
  .get("/:roomId/roomname", room.getRoomNameById)
  .post("/add-user", room.addUserToConversation)
  .post("/initiate", room.initiate)
  .post("/:roomId/message", room.postMessage)
  .put("/:roomId/mark-read", room.markConversationReadByRoomId);

export default router;
