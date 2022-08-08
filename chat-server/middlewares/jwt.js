import jwt from "jsonwebtoken";
import User from "../controllers/user.js";
import { SECRET_KEY } from "../app.js";

/* Function that will check to see if a user is in the DB and if they are, will then assign them a 
  an authentication token */
export const encode = async (req, res) => {
  try {
    const { username, password } = req.params;
    const verifiedLogin = await User.onUserLogin(username, password);
    if (verifiedLogin.success === false) {
      return res.status(401).json({ success: false, message: "Invalid login credentials" });
    }
    const payload = {
      userId: verifiedLogin.user._id,
    };
    const token = jwt.sign(payload, SECRET_KEY);
    return res.status(200).json({ success: true, userId: verifiedLogin.user._id, token });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "Problem while trying to authenticate ",
      error: error,
    });
  }
};

/* Function that will decode the userId and type from the auth token IF PROVIDED, 
 otherwise an error will be returned */
export const decode = async (req, res, next) => {
  try {
    const token = await req.headers.authorization.split("")[1];
    const decodedToken = await jwt.verify(token, SECRET_KEY);
    const user = await decodedToken;
    req.userId = user;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Could not decode authorization token",
      error: error,
    });
  }
};
