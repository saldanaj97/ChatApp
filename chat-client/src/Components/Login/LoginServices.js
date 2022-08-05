import axios from "axios";

/* Constants that will be used when making API calls */
const BASE_URL = "https://saldanaj97-chattyio.herokuapp.com";
const CONFIG = {
  withCredentials: true,
};

/* Function to log a user in */
export const logUserIn = async (name, password) => {
  const response = await axios
    .post(`${BASE_URL}/login/${name}/${password}`, CONFIG)
    .then((response) => {
      return { success: true, userId: response.data };
    })
    .catch((error) => {
      return { success: false, userId: "" };
    });
  return response;
};

/* Function to retrieve the most recent conversation */
export const getRecentConvo = async () => {
  const response = await axios.get(`${BASE_URL}/room`, CONFIG).then((response) => {
    if (response.data.conversation.length > 0) {
      return response.data.conversation[0];
    }
    return { _id: "" };
  });
  return response;
};

/* API call to sign a user up  */
export const signUserUp = async (newUserInfo) => {
  const { user } = await axios
    .post(`${BASE_URL}/users`, newUserInfo)
    .then((response) => response.data)
    .catch((error) => {
      return { success: false, user: "" };
    });
  return { success: true, user };
};
