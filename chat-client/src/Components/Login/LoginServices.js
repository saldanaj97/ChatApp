import axios from "axios";

/* Function to log a user in */
export const logUserIn = async (name, password, setUserId) => {
  const { success, userId } = await axios.post(`/login/${name}/${password}`).then((response) => response.data);
  setUserId(userId);
  return success;
};

/* Function to retrieve the most recent conversation */
export const getRecentConvo = async (setRoomId) => {
  const { _id } = await axios.get("/room").then((response) => {
    if (response.data.conversation.length > 0) {
      return response.data.conversation[0];
    }
  });
  setRoomId(_id);
  return _id;
};
