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
    "Content-type": "application/json",
  },
};

/* Function to log a user in */
export const logUserIn = async (name, password) => {
  const response = await axios
    .post(`https://saldanaj97-chattyio.herokuapp.com/login/${name}/${password}`, CONFIG)
    .then((response) => {
      return { success: true, userId: response.data.userId, token: response.data.token };
    })
    .catch((error) => {
      return { success: false, userId: "" };
    });
  return response;
};

/* Function to retrieve the most recent conversation */
export const getRecentConvo = () => {
  const response = axios
    .get(`https://saldanaj97-chattyio.herokuapp.com/room`, CONFIG)
    .then((response) => {
      if (response.data.conversation.length > 0) {
        return response.data.conversation[0];
      }
      return { _id: "" };
    })
    .catch((error) => console.log(error));
  return { _id: "" };
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
