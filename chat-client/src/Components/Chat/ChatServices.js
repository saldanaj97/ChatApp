import axios from "axios";
import Cookies from "universal-cookie";

/* Constants that will be used when making API calls */
const cookies = new Cookies();
const token = cookies.get("TOKEN");
const BASE_URL = "https://saldanaj97-chattyio.herokuapp.com";
const CONFIG = {
  withCredentials: true,
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

/* API call to get the name and users that of the chatroom we are in */
export const fetchGroupInfo = async (roomId) => {
  const { groupName, userIds } = await axios.get(`https://saldanaj97-chattyio.herokuapp.com/room/${roomId}/roomname`, CONFIG).then((response) => response.data.room);
  return { groupName: groupName, userIds: new Set(userIds) };
};

/* API call to get the usernames, firstnames/lastnames from each user in a group */
export const fetchUsersInGroup = async (userIds) => {
  const { users } = await axios.post(`https://saldanaj97-chattyio.herokuapp.com/users/usernames`, { userIds: [...userIds] }, CONFIG).then((response) => response.data);
  return users;
};

/* API call to send the message the user has entered */
export const sendMessageInGroup = async (roomId, message) => {
  const response = await axios.post(`https://saldanaj97-chattyio.herokuapp.com/room/${roomId}/message`, { messageText: message }, CONFIG);
  return response;
};

/* API call to get all the messages in a group the user is a part of */
export const retrieveGroupMessages = async (roomId) => {
  const response = await axios.get(`https://saldanaj97-chattyio.herokuapp.com/room/${roomId}`, CONFIG).then((response) => response.data);
  return response;
};
