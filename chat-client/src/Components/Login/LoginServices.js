import axios from "axios";

/* Constants that will be used when making API calls */
const BASE_URL = "http://localhost:3000";
const CONFIG = {
  withCredentials: true,
};

/* Function to log a user in */
export const logUserIn = async (name, password, setUserId) => {
  const { success, userId } = await axios.post(`${BASE_URL}/login/${name}/${password}`, CONFIG).then((response) => response.data);
  setUserId(userId);
  return success;
};

/* Function to retrieve the most recent conversation */
export const getRecentConvo = async (setRoomId) => {
  const { _id } = await axios.get(`${BASE_URL}/room/`, CONFIG).then((response) => {
    if (response.data.conversation.length > 0) {
      return response.data.conversation[0];
    }
  });
  setRoomId(_id);
  return _id;
};
