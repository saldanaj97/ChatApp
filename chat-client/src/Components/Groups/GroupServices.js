import axios from "axios";

/* Constants that will be used when making API calls */
const BASE_URL = "http://localhost:3000";
const CONFIG = {
  withCredentials: true,
};

export const fetchUserGroups = async () => {
  let roomsFromResponse = [];

  // Request to get the groups the user is part of for the groups panel
  await axios
    .get(`${BASE_URL}/room/user-messages/`, CONFIG)
    .then((response) => {
      response.data.roomIds.map((room) => {
        const newRoom = { id: room._id, groupName: room.groupName, lastMessageReceived: { user: "", contents: "" } };
        return (roomsFromResponse = [newRoom, ...roomsFromResponse]);
      });
    })
    .catch((error) => {
      console.log("Auth error when retreiving users groups", error);
    });
  return roomsFromResponse;
};

export const createNewGroup = async (chatrooms, setRooms, onClose, groupName, userId) => {
  await axios
    .post(`${BASE_URL}/room/initiate`, { groupName: groupName, userIds: [userId], type: "consumer_to_consumer" }, CONFIG)
    .then((response) => {
      const newRoom = { id: response.data.chatRoom.chatRoomId, groupName: groupName, lastMessageReceived: { user: "", contents: "" } };
      const updatedRooms = [newRoom, ...chatrooms];
      setRooms(updatedRooms);
      onClose();
    })
    .catch((error) => {
      console.log(error);
    });
};
