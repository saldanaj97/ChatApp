import express from "express";

/* Controllers */
import user from "../controllers/user.js";

const router = express.Router();

// prettier-ignore
router
.get("/", user.onGetAllUsers)
.get("/:id", user.onGetUserById)
.post('/usernames', user.onGetAllUsersByIds)
.post("/retrieve-id", user.onRetrieveUserId)
.post("/", user.onCreateUser)
.post("/add-friend", user.onAddFriend)
.delete("/:id", user.onDeleteUserById);

export default router;
