import axios from "axios";

const CONFIG = {
  withCredentials: true,
};

/* API call to get the name of the chatroom we are in when logging in */
export const fetchCurrentGroupName = async (roomId) => {
  const { groupName } = await axios.get(`/room/${roomId}/roomname`, CONFIG).then((response) => response.data.room);
  return groupName;
};
