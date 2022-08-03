import axios from "axios";

/* Constants that will be used when making API calls */
const BASE_URL = "http://localhost:3000";
const CONFIG = {
  withCredentials: true,
};

/* API call to get the name of the chatroom we are in when logging in */
export const fetchCurrentGroupName = async (roomId) => {
  const { groupName } = await axios.get(`${BASE_URL}/room/${roomId}/roomname`, CONFIG).then((response) => response.data.room);
  return groupName;
};

/* API call to send the message the user has entered */
export const sendMessageInGroup = async (roomId, message) => {
  const response = await axios.post(`${BASE_URL}/room/${roomId}/message`, { messageText: message }, CONFIG);
  return response;
};

/* API call to get all the messages in a group the user is a part of */
export const retrieveGroupMessages = async (roomId) => {
  const { conversation } = await axios.get(`${BASE_URL}/room/${roomId}`, CONFIG).then((response) => response.data);
  return conversation;
};
